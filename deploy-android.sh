#!/bin/sh

ANDROID_DIR="src/native/android/"
ANDROID_WWW=$ANDROID_DIR"assets/www/"

python compile.py

rm -rf $ANDROID_WWW
mkdir $ANDROID_WWW
cp -r app/* $ANDROID_WWW

cd $ANDROID_DIR 
adb $1 uninstall com.connectsy2
ant debug install
#adb $1 install -r bin/Connectsy2.apk

