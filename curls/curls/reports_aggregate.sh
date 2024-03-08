#!/bin/bash
curl --silent 'https://devapi.huginn.care/reports/aggregate' \
-X 'GET' \
-b cookie.txt \
-H 'Accept: application/json'
