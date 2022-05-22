#! /bin/bash -x

aws lambda update-function-code --function-name opensearch-lambda --zip-file fileb://lambda.zip && rm lambda.zip
