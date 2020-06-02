#!/bin/bash

set -e
BASEDIR=$(dirname "$0")

AWS_PROFILE=thinko-dev
STATIC_FILES_PATH=${BASEDIR}/../dist/thinko-creator/browser/

# Check parameters
ENV=$1

if ! [[  "$ENV" =~ ^(tst|dev|qa|pre|pro)$ ]] ; then
    echo "help:  ./${0##*/} <tst|dev|qa|pre|pro>"
    exit 1
fi


# Get ID values from SSM
CLOUDFRONT_DISTRIBUTION_ID=$(aws --profile thinko ssm get-parameters --name "/$ENV/cloudfront/static_site_cfr_distribution_id" --query "Parameters[*].{Value:Value}" --output yaml | cut -d " " -f 3)
S3_BUCKET_NAME=$(aws --profile thinko ssm get-parameters --name "/$ENV/s3/static_site_bucket_name" --query "Parameters[*].{Value:Value}" --output yaml | cut -d " " -f 3)
S3_BUCKET="s3://${S3_BUCKET_NAME}"

# Upload static site to S3
aws --profile ${AWS_PROFILE} s3 cp ${STATIC_FILES_PATH} ${S3_BUCKET} --recursive

# Invalidate CloudFront cache
aws --profile ${AWS_PROFILE} cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths "/*"

