#! /bin/bash -x

aws lambda update-function-code --function-name opensearch-api-node --zip-file fileb://function.zip && rm function.zip
