#!/usr/bin/env python

import compile
import SimpleHTTPServer
import SocketServer
import pyinotify
from subprocess import Popen, PIPE
import os
import time

PORT = 8080
WATCH = os.path.join(compile.CURPATH, 'src')
SERVE = compile.APP_LOCATION

args = compile.parse_args()

class OnWriteHandler(pyinotify.ProcessEvent):
    def my_init(self):
        compile.main(args)
        self.start_serve()

    def start_serve(self):
        self.httpd = Popen(('python', '-m', 'SimpleHTTPServer', str(PORT)),
                           stdout=PIPE, cwd=SERVE)

    def stop_serve(self):
        self.httpd.terminate()
        self.httpd.wait()
        self.httpd = None

    def process_IN_MODIFY(self, event):
        print 'change detected'
        print event.mask, event.maskname, event.name, event.wd
        name, ext = event.name.split('.')
        print name, ext
        if not (os.path.isfile(os.path.join(event.path, '%s.%s' % (name, 'soy')))
                and ext == 'js'):
            self.stop_serve()
            compile.main(args)
            self.start_serve()


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