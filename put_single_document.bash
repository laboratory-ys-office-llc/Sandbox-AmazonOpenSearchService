#! /bin/bash -x

. .env

# echo "${OPEN_SEARCH_MASTER_USER}"
# echo "${OPEN_SEARCH_MASTER_PASSWORD}"
# echo "${OPEN_SEARCH_DOMAIN_ENDPOINT}"

curl -X PUT -u "${OPEN_SEARCH_MASTER_USER}:${OPEN_SEARCH_MASTER_PASSWORD}" "${OPEN_SEARCH_DOMAIN_ENDPOINT}/movies/_doc/1" -d '{"director": "Burton, Tim", "genre": ["Comedy","Sci-Fi"], "year": 1996, "actor": ["Jack Nicholson","Pierce Brosnan","Sarah Jessica Parker"], "title": "Mars Attacks!"}' -H 'Content-Type: application/json'

exit ${?}
