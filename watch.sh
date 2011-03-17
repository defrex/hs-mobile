#!/bin/sh

./compile.py $@

dnotify -CDMro ./src/ -e $0 $@
