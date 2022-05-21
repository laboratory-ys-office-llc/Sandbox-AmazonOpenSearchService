#! /bin/bash -x

. .env

# echo "${OPEN_SEARCH_MASTER_USER}"
# echo "${OPEN_SEARCH_MASTER_PASSWORD}"
# echo "${OPEN_SEARCH_DOMAIN_ENDPOINT}"

curl -X GET -u "${OPEN_SEARCH_MASTER_USER}:${OPEN_SEARCH_MASTER_PASSWORD}" "${OPEN_SEARCH_DOMAIN_ENDPOINT}/movies/_search?q=mars&pretty=true"

exit ${?}
