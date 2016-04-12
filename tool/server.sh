#!/usr/bin/env bash

nohup supervisor --harmony -w ../i18n-server/lib/api ./tool/server/start.js & > tool/server.log 2>&1
