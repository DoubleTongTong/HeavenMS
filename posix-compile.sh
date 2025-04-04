#!/bin/bash
# compilation script for posix-compliant systems

src=src
dist=dist

cores=$(echo cores/*)
cores=${cores// /:}

mkdir -p $dist

# Check if a command line argument '--debug' is passed
if [[ "$@" == *"--debug"* ]]; then
    javac_options="-g"  # Enable debug information
    echo "Debug mode enabled. Compilation will include debug information."
else
    javac_options=""    # No debug info
fi

javac $javac_options -d $dist -cp $cores -encoding UTF-8 $(find $src -name "*.java")
