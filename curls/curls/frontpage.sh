#!/bin/bash
curl --silent 'https://devapi.huginn.care/' \
-X 'GET' \
-b cookie.txt \
-H 'Accept: application/json'
