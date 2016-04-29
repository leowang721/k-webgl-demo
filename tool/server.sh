#!/usr/bin/env bash

nohup supervisor --harmony -w "./server,../mockup" ./tool/server/start.js & > tool/server.log 2>&1
