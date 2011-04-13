#!/bin/sh

DIR="src/native/iphone/"
WWW=$DIR"www/"

#python compile.py $@

rm -rf $WWW
mkdir $WWW
cp -r app/* $WWW

#cd $DIR 
#TODO: compile and run
