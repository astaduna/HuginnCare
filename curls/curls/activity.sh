#!/bin/bash
curl --silent 'https://devapi.huginn.care/activity' \
-X 'GET' \
-b cookie.txt \
-H 'Accept: application/json'
