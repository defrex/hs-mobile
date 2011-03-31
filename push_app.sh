#!/bin/sh

cd app

git init
git add .
git commit -m "build script"

git remote add origin git@github.com:defrex/hs-mobile-build.git

git push -f origin master

#git pull origin master && git push origin master
