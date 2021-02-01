#!/bin/bash 
set -e

#createuser lanita --createdb --login
createdb --user lanita aktiadb
yarn
yarn sequelize db:migrate
yarn test