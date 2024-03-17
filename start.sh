#!/bin/bash

cd /app/code/frontend
npm start &

cd /app/code/api
node server.js
