#!/usr/bin/env python

from lib import js
import argparse
import os
import shutil
from shutil import rmtree, copy, ignore_patterns, copytree
import fileinput
from subprocess import Popen, PIPE
import fnmatch

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

CURPATH = os.path.abspath(os.path.dirname(__file__))

APP_LOCATION = os.path.join(CURPATH, 'app/')
JS_LOCATION = os.path.join(CURPATH, 'src/js/')
TEST_JS_LOCATION = os.path.join(CURPATH, 'tests/')
CSS_LOCATION = os.path.join(CURPATH, 'src/css/')
CLOSURE_LOCATION = os.path.join(CURPATH, 'lib/closure/')
IMG_LOCATION = os.path.join(CURPATH, 'src/img/')

if args.test: HTML_TMPL = os.path.join(CURPATH, 'src/html/test.html')
else: HTML_TMPL = os.path.join(CURPATH, 'src/html/index.html')
HTML_FILE = os.path.join(APP_LOCATION, 'index.html')
COMPILED_FILE = os.path.join(APP_LOCATION, 'compiled.js')
DEBUG_JS_LOCATION = os.path.join(APP_LOCATION, 'js/')
DEBUG_TEST_JS_LOCATION = os.path.join(APP_LOCATION, 'tests/')
DEBUG_CLOSURE_LOCATION = os.path.join(APP_LOCATION, 'closure/')
APP_CSS_LOCATION = os.path.join(APP_LOCATION, 'css/')
APP_IMG_LOCATION = os.path.join(APP_LOCATION, 'img/')

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
if args.test: copy(os.path.join(CURPATH, 'lib/qunit/qunit.css'), APP_CSS_LOCATION)


command = ('java -jar lib/SoyToJsSrcCompiler.jar'
           ' --outputPathFormat {INPUT_DIRECTORY}/{INPUT_FILE_NAME_NO_EXT}.js'
           ' --shouldGenerateJsdoc'
           ' --shouldProvideRequireSoyNamespaces')
for root, dirnames, filenames in os.walk(JS_LOCATION):
    for filename in fnmatch.filter(filenames, '*.soy'):
        command += ' '+os.path.join(root, filename)
print 'Compiling templates...'
if args.v: print 'Soy Command:\n', command
Popen(command, shell=True).wait()

calcdeps = [os.path.join(CURPATH, 'lib/closure/bin/calcdeps.py'), 
            '-i', os.path.join(JS_LOCATION, 'init.js'),
            '-p', JS_LOCATION,
            '-p', CLOSURE_LOCATION]

if args.debug and not args.compiled:
    print 'Copying debug JS...'
    copytree(JS_LOCATION, DEBUG_JS_LOCATION, ignore=ignore_patterns('*.soy'))
    copytree(CLOSURE_LOCATION, DEBUG_CLOSURE_LOCATION)
    
    calcdeps += ['-o', 'list']
    if args.v: print 'calcdeps command:\n', ' '.join(calcdeps)
    proc = Popen(calcdeps, stdout=PIPE)
    proc.wait()
    deps = proc.stdout.read()
    if args.v: print 'calculated dependancies:\n', deps
    
    for js in deps.split('\n'):
        if JS_LOCATION in js:
            filename = 'js/'+js.split(JS_LOCATION)[-1]
        elif CLOSURE_LOCATION in js:
            filename = 'closure/'+js.split(CLOSURE_LOCATION)[-1]
        else:
            continue
        include += '<script src="%s"></script>' % filename
    if args.test:
        copy(os.path.join(CURPATH, 'lib/qunit/qunit.js'), APP_LOCATION)
        include += '<script src="qunit.js"></script>'
        copytree(TEST_JS_LOCATION, DEBUG_TEST_JS_LOCATION)
        for root, dirnames, filenames in os.walk(DEBUG_TEST_JS_LOCATION):
            for filename in fnmatch.filter(filenames, '*.js'):
                t = os.path.join(root, filename).split(APP_LOCATION)[-1]
                include += '<script src="%s"></script>' % t
else:
    if args.compiled: d = 'true'
    else: d = 'false'
    calcdeps += ['-o', 'compiled',
                 '-c', os.path.join(CURPATH, 'lib/compiler.jar'),
                 '-f', '--compilation_level', '-f', 'ADVANCED_OPTIMIZATIONS',
                 '-f', '--js_output_file', '-f', COMPILED_FILE,
                 '-f', '--define="consy.PLATFORM=\'%s\'"' % args.platform,
                 '-f', '--define="consy.DEBUG=%s"' % d]
    if args.map:
        calcdeps.append('-f')
        calcdeps.append('--create_name_map_files=true')
    print 'Compiling JS...'
    if args.v: print 'calcdeps command:\n', ' '.join(calcdeps)
    Popen(' '.join(calcdeps), shell=True).wait()

    include += '<script src="%s"></script>' % COMPILED_FILE.split(APP_LOCATION)[-1]

with open(HTML_TMPL, 'r') as f:
    html = f.read()

html = html.replace('{{ include }}', include)

print 'Writing HTML...'
with open(HTML_FILE, 'w') as f:
    f.write(html)

print 'Done.'


