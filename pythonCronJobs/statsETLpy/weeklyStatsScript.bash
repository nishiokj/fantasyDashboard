#!/bin/bash

# Exit on any error
set -e

# Change to script directory
cd "$(dirname "$0")" || {
    echo "Error: Failed to change to script directory"
    exit 1
}

echo "Running weekly stats script"

# Run each Python script with error checking
python3 playerListBuilder.py || {
    echo "Error: playerListBuilder.py failed"
    exit 1
}

python3 mapIDs.py || {
    echo "Error: mapIDs.py failed"
    exit 1
}

python3 loadNFLStats.py || {
    echo "Error: loadNFLStats.py failed"
    exit 1
}

echo "Weekly stats script completed successfully"
