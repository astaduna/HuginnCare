#!/bin/bash
curl --silent 'https://devapi.huginn.care/reports/aggregatelist' \
-X 'GET' \
-b cookie.txt \
-H 'Accept: application/json'
