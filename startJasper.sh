#!/bin/bash
pm2 start ~/jasper/server.js &
DISPLAY=:0 chromium-browser --disable-web-security --no-infobars --no-sandbox --start-maximized --app=http://localhost:3000 &
