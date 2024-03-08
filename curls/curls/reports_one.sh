#!/bin/bash
curl --silent "https://devapi.huginn.care/reports/one/$1" \
-X 'GET' \
-b cookie.txt \
-H 'Accept: application/json'
