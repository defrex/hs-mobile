#!/usr/bin/env python

import compile
import SimpleHTTPServer
import SocketServer
import pyinotify
from subprocess import Popen, PIPE
import os
import time
from multiprocessing import Process

PORT = 8080
WATCH = os.path.join(compile.CURPATH, 'src')
SERVE = compile.APP_LOCATION

args = compile.parse_args()

class OnWriteHandler(pyinotify.ProcessEvent):
    def my_init(self):
        self.compiling = True
        compile.main(args)
        self.start_serve()
        self.compiling = False

    def start_serve(self):
        self.httpd = Popen(('python', '-m', 'SimpleHTTPServer', str(PORT)),
                           stdout=PIPE, cwd=SERVE)
        print 'Resume Serving at http://0.0.0.0:%i' % PORT

    def stop_serve(self):
        self.httpd.terminate()
        self.httpd.wait()
        self.httpd = None
        print 'Server Terminated'

    def recompile(self):
        self.stop_serve()
        compile.main(args)
        self.start_serve()
        self.compiling = False

    def process_IN_MODIFY(self, event):
        print event.maskname, event.name
        name, ext = event.name.split('.')
        if (not (os.path.isfile(os.path.join(event.path, '%s.%s' % (name, 'soy')))
                and ext == 'js')) and not self.compiling:
            self.recompile()

def auto_compile():
    wm = pyinotify.WatchManager()
    notifier = pyinotify.Notifier(wm, default_proc_fun=OnWriteHandler(), timeout=10)
    wm.add_watch(WATCH, pyinotify.IN_MODIFY, rec=True, auto_add=True)
    print 'Begin watching directory: %s\nServing at http://0.0.0.0:%i' % (WATCH, PORT)
    notifier.loop()
    # notifier.process_events()
    # while True:
    #     if not compiling:
    #         while notifier.check_events():
    #             notifier.read_events()
    #         notifier.process_events()
    #     time.sleep(0.1)

if __name__ == '__main__': auto_compile()