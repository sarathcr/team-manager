#!/bin/bash

set -e
BASEDIR=$(dirname "$0")

AWS_PROFILE=thinko
S3_BUCKET=s3://pre-creator-front-staticsite-s3bucket-yjac1u6w51uj
STATIC_FILES_PATH=${BASEDIR}/../dist/thinko-creator/browser/
CLOUDFRONT_DISTRIBUTION_ID=E3HE3KS5ZZRW9I



# Upload static site to S3
aws --profile ${AWS_PROFILE} s3 cp ${STATIC_FILES_PATH} ${S3_BUCKET} --recursive

# Invalidate CloudFront cache
aws --profile ${AWS_PROFILE} cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths "/*"

