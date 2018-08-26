#!/bin/bash

rm -rf target
mkdir -p target
cp index.js target
cp package.json target
cd target && npm i && find . | xargs zip boxomatic.zip
aws lambda update-function-code --function-name boxomatic --zip-file fileb://boxomatic.zip
