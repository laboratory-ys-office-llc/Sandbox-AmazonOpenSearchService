#! /bin/bash -x

. .env

# echo "${OPEN_SEARCH_MASTER_USER}"
# echo "${OPEN_SEARCH_MASTER_PASSWORD}"
# echo "${OPEN_SEARCH_DOMAIN_ENDPOINT}"

curl -X POST -u "${OPEN_SEARCH_MASTER_USER}:${OPEN_SEARCH_MASTER_PASSWORD}" "${OPEN_SEARCH_DOMAIN_ENDPOINT}/_bulk" --data-binary @sample-movies.bulk -H 'Content-Type: application/json'

exit ${?}
