#!/bin/bash 
set -e

dropdb --if-exists aktiatestdb
createdb aktiatestdb
yarn sequelize db:migrate

jest