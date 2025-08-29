#!/usr/bin/env bash

# Install Node.js dependencies
npm install

# Install Python dependencies

echo "Installing Python dependencies..."
pip install -r ./ml-service/requirements.txt

