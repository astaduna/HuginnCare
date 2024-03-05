#!/bin/bash
curl -c cookie.txt -X POST devapi.huginn.care/login -d "username=<username>&password=<password>"
