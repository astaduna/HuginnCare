#!/bin/bash
curl --silent 'https://devapi.huginn.care/reports/drafts' \
-X 'GET' \
-b cookie.txt \
-H 'Accept: application/json'
