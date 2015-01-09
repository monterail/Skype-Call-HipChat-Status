#!/bin/bash

set -e

dir="/Users/Shared/Library/Scripts"
plist="com.monterail.SkypeHipchat.plist"
mkdir -p "$dir"

cp SkypeHipchat.js "$dir/SkypeHipchat.js"
rm -f "$HOME/Library/LaunchAgents/$plist"
cp "$plist" "$HOME/Library/LaunchAgents/$plist"
launchctl load "$HOME/Library/LaunchAgents/$plist"

echo "Skype-HipChat integration installed successfully!"
