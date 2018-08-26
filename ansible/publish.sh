#!/bin/bash

aws s3 sync --exclude lambda/* --exclude *.swp --exclude "*~" --exclude .git --exclude *.pem . s3://INSERT-YOUR-S3-BUCKET
