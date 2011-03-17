#!/usr/bin/env python

from lib import js
import os
import shutil
from shutil import rmtree, copy, ignore_patterns, copytree
import fileinput
from subprocess import Popen, PIPE
import fnmatch
import json

CURPATH = os.path.abspath(os.path.dirname(__file__))

APP_LOCATION = os.path.join(CURPATH, 'app/')
JS_LOCATION = os.path.join(CURPATH, 'src/js/')
TEST_JS_LOCATION = os.path.join(CURPATH, 'tests/')
CSS_LOCATION = os.path.join(CURPATH, 'src/css/')
CLOSURE_LOCATION = os.path.join(CURPATH, 'lib/closure/')
IMG_LOCATION = os.path.join(CURPATH, 'src/img/')

TEST_HTML_TMPL = os.path.join(CURPATH, 'src/html/test.html')
TEST_ALL_HTML_TMPL = os.path.join(CURPATH, 'src/html/all_tests.html')
HTML_TMPL = os.path.join(CURPATH, 'src/html/index.html')
HTML_FILE = os.path.join(APP_LOCATION, 'index.html')
COMPILED_FILE = os.path.join(APP_LOCATION, 'compiled.js')
DEBUG_JS_LOCATION = os.path.join(APP_LOCATION, 'js/')
DEBUG_TEST_JS_LOCATION = os.path.join(APP_LOCATION, 'tests/')
DEBUG_CLOSURE_LOCATION = os.path.join(APP_LOCATION, 'closure/')
APP_CSS_LOCATION = os.path.join(APP_LOCATION, 'css/')
APP_IMG_LOCATION = os.path.join(APP_LOCATION, 'img/')

def main(args):

    print 'Removing old files...'
    if os.path.isdir(APP_LOCATION):
        rmtree(APP_LOCATION)
    os.mkdir(APP_LOCATION)

    include = ''

    print 'Copyimg images...'
    copytree(IMG_LOCATION, APP_IMG_LOCATION)

    print 'Compiling css...'
    os.mkdir(APP_CSS_LOCATION)
    for item in os.listdir(CSS_LOCATION):
        if item[0] == '_': continue
        newcss = os.path.join(APP_CSS_LOCATION, item.split('.')[0]+'.css')
        if args.debug: t = 'expanded'
        else: t = 'compressed'
        command = 'sass -t %s %s:%s' % (
                t, os.path.join(CSS_LOCATION, item), newcss)
        Popen(command, shell=True).wait()
        include += '<link rel="stylesheet" type="text/css" href="%s"/>' % (
                newcss.split(APP_LOCATION)[-1])
    #if args.test: copy(os.path.join(CURPATH, 'lib/qunit/qunit.css'), APP_CSS_LOCATION)


    print 'Compiling templates...'
    command = ('java -jar lib/SoyToJsSrcCompiler.jar'
               ' --outputPathFormat %(op_path)s/{INPUT_FILE_NAME_NO_EXT}.js'
               ' --shouldGenerateJsdoc'
               ' --shouldProvideRequireSoyNamespaces') % {
                'op_path': os.path.join(JS_LOCATION, 'tmpl')}
    for root, dirnames, filenames in os.walk(JS_LOCATION):
        for filename in fnmatch.filter(filenames, '*.soy'):
            command += ' '+os.path.join(root, filename)
    if args.v: print 'Soy Command:\n', command
    Popen(command, shell=True).wait()

    calcdeps = [os.path.join(CURPATH, 'lib/closure/bin/calcdeps.py'),
                '-p', JS_LOCATION,
                '-p', CLOSURE_LOCATION]

    calcdeps += ['-i', os.path.join(JS_LOCATION, 'init.js')]

    if args.debug and not args.compiled:
        print 'Copying debug JS...'
        if args.test:
            ignore = ignore_patterns('*.soy')
        else:
            ignore = ignore_patterns('*.soy', '*_test.js')

        copytree(JS_LOCATION, DEBUG_JS_LOCATION, ignore=ignore)
        copytree(CLOSURE_LOCATION, DEBUG_CLOSURE_LOCATION)

        calcdeps += ['-o', 'list']
        if args.v: print 'calcdeps command:\n', ' '.join(calcdeps)
        proc = Popen(calcdeps, stdout=PIPE)
        proc.wait()
        deps = proc.stdout.read().split('\n')
        if args.v: print 'calculated dependancies:\n', deps

        def get_scripts(deps, root=''):
            ret = ''
            for js in deps:
                if JS_LOCATION in js:
                    filename = 'js/'+js.split(JS_LOCATION)[-1]
                elif CLOSURE_LOCATION in js:
                    filename = 'closure/'+js.split(CLOSURE_LOCATION)[-1]
                else:
                    continue
                ret += '<script src="%s"></script>\n' % os.path.join(root, filename)
            return ret

        include += get_scripts(deps)

        if args.test:
            all_tests = []
            for root, dirnames, filenames in os.walk(JS_LOCATION):
                for filename in fnmatch.filter(filenames, '*_test.js'):
                    print filename
                    fullname = os.path.join(root, filename)
                    testdeps = [os.path.join(CURPATH, 'lib/closure/bin/calcdeps.py'),
                                '-p', JS_LOCATION,
                                '-p', CLOSURE_LOCATION,
                                '-i', fullname]
                    proc = Popen(testdeps, stdout=PIPE)
                    proc.wait()
                    testdeps_results = proc.stdout.read().split('\n')

                    rel_path = '/'.join(['..' for d in fullname.split(JS_LOCATION)[-1].split('/') if d != ''])
                    test_include = get_scripts(testdeps_results, root=rel_path)

                    with open(TEST_HTML_TMPL, 'r') as f: html = f.read()
                    html = html.replace('<!--{{ include_body }}-->', test_include)
                    to_rel = fullname.replace('.js', '.html').split(JS_LOCATION)[-1]
                    to = os.path.join(DEBUG_JS_LOCATION, to_rel)
                    with open(to, 'w') as f: f.write(html)

                    all_tests.append('js/'+to_rel)

            with open(os.path.join(APP_LOCATION, 'alltests.js'), 'w') as f:
                f.write('var _allTests = '+json.dumps(all_tests)+';')

        # if args.test:
        #     copy(os.path.join(CURPATH, 'lib/qunit/qunit.js'), APP_LOCATION)
        #     include += '<script src="qunit.js"></script>'
        #     copytree(TEST_JS_LOCATION, DEBUG_TEST_JS_LOCATION)
        #     for root, dirnames, filenames in os.walk(DEBUG_TEST_JS_LOCATION):
        #         for filename in fnmatch.filter(filenames, '*.js'):
        #             t = os.path.join(root, filename).split(APP_LOCATION)[-1]
        #             include += '<script src="%s"></script>' % t
    else:
        if args.compiled: d = 'true'
        else: d = 'false'
        calcdeps += ['-o', 'compiled',
                     '-c', os.path.join(CURPATH, 'lib/compiler.jar'),
                     '-f', '--compilation_level', '-f', 'ADVANCED_OPTIMIZATIONS',
                     '-f', '--js_output_file', '-f', COMPILED_FILE,
                     '-f', '--define="frame.PLATFORM=\'%s\'"' % args.platform,
                     '-f', '--define="frame.DEBUG=%s"' % d]
        if args.map:
            calcdeps.append('-f')
            calcdeps.append('--create_name_map_files=true')
        print 'Compiling JS...'
        if args.v: print 'calcdeps command:\n', ' '.join(calcdeps)
        Popen(' '.join(calcdeps), shell=True).wait()

        include += '<script src="%s"></script>' % COMPILED_FILE.split(APP_LOCATION)[-1]

    tmpl = HTML_TMPL if not args.test else TEST_ALL_HTML_TMPL

    with open(tmpl, 'r') as f: html = f.read()

    html = html.replace('<!--{{ include }}-->', include)

    print 'Writing HTML...'
    with open(HTML_FILE, 'w') as f:
        f.write(html)

    print 'Done.'


def parse_args():
    import argparse

    parser = argparse.ArgumentParser(description='Compile Connectsy\'s js')
    parser.add_argument('-v', '--verbose', default=False, dest='v',
                        action='store_true', help='verbose output')
    parser.add_argument('-m', '--map', default=False, dest='map',
                        action='store_true', help='Create source map from the compiler')
    parser.add_argument('-t', '--test', default=False, dest='test',
                        action='store_true', help='compile the test environment')
    parser.add_argument('-d', '--debug', default=False, dest='debug',
                        action='store_true', help='Don\'t concat or minify the js')
    parser.add_argument('-c', '--compiled', default=False, action='store_true',
                        help='Compile the JS with debug true')
    parser.add_argument('-p', '--platform', default="mobile-web",
                        help='The platform the js should be compiled for.')
    args = parser.parse_args()
    if args.test: args.debug = True

    return args


if __name__ == '__main__':
    main(parse_args())

