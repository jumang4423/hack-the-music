#!/bin/bash
cd server/
yarn generate
cd ../

# wait 2 seconds
sleep 2

yarn graphql-codegen

echo "graphql-codegen both frontend and backend done"
