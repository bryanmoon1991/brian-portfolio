#!/bin/bash

# Define the base directory for images and the output file
IMAGES_DIR="./public/images/galleries"
OUTPUT_FILE="./src/assets/imageManifest.json"

# Start the JSON string
echo "{" > $OUTPUT_FILE

# Counter to check if we are adding the first item to avoid comma issues
FIRST=1

# Loop through each subdirectory in the IMAGES_DIR
for DIR in $IMAGES_DIR/*; do
    if [ -d "$DIR" ]; then
        # Extract the directory name
        DIRNAME=$(basename "$DIR")

        # Start the array for this directory
        if [ $FIRST -ne 1 ]; then
            echo "," >> $OUTPUT_FILE
        fi
        echo -n "  \"$DIRNAME\": [" >> $OUTPUT_FILE

        # Initialize FIRST_FILE flag
        FIRST_FILE=1

        # Loop through each file in the subdirectory
        for FILE in "$DIR"/*; do
            FILENAME=$(basename "$FILE")

            # Skip hidden files (those starting with a dot)
            if [[ "$FILENAME" =~ ^\..* ]]; then
                continue
            fi

            # Add a comma before adding the next file, except for the first
            if [ $FIRST_FILE -ne 1 ]; then
                echo -n ", " >> $OUTPUT_FILE
            fi
            # Add the file to the array
            echo -n "\"/images/$DIRNAME/$FILENAME\"" >> $OUTPUT_FILE

            FIRST_FILE=0
        done

        # Close the array for this directory
        echo "]" >> $OUTPUT_FILE
        FIRST=0
    fi
done

# Close the JSON string
echo "}" >> $OUTPUT_FILE

echo "Image manifest created at $OUTPUT_FILE"
