#!/bin/sh

APP_DIR=`pwd`"/app/"
AND_DIR=`pwd`"/app_android/"

python compile.py $@

droidgap create $APP_DIR

cd $AND_DIR
ant debug install
