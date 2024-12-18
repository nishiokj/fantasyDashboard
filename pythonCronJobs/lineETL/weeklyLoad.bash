#!/bin/bash

# Navigate to the script directory
cd "$(dirname "$0")"

echo "Starting ETL pipeline..."

# Step 1: Extract Lines
# echo -e "\n=== Running extractLines.py ==="
# python3 extractLines.py
# if [ $? -ne 0 ]; then
#     echo "extractLines.py failed"
#     exit 1
# fi

# # Step 2: Get Event IDs
# echo -e "\n=== Running getEventIds.py ==="
# python3 getEventIds.py
# if [ $? -ne 0 ]; then
#     echo "getEventIds.py failed"
#     exit 1
# fi

# Step 3: Load Lines
echo -e "\n=== Running loadLines.py ==="
python3 loadLines.py
if [ $? -ne 0 ]; then
    echo "loadLines.py failed"
    exit 1
fi

echo -e "\n=== Pipeline completed successfully ==="
