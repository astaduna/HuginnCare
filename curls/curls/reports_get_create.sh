#!/bin/bash
curl --silent 'https://devapi.huginn.care/reports/create/' \
-X 'GET' \
-b cookie.txt \
-H 'Accept: application/json'
