#!/bin/bash
curl --silent 'https://devapi.huginn.care/reports/all?from=01/19/2021&to=03/01/2024&clientId=1&userId=2&departmentId=1' \
-b cookie.txt \
-X 'GET' \
-H 'Accept: application/json'
