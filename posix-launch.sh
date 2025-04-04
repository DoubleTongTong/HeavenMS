#!/bin/bash
# launch script
cores=$(echo cores/*)
cores=${cores// /:}
cp=.:dist:$cores

# Set a custom port for debugging
debug_port=1234

# Check if --debug argument is passed
if [[ "$@" == *"--debug"* ]]; then
    echo "Debug mode enabled. Starting the server in debug mode on port $debug_port..."

    # Start the Java program in debug mode and wait for jdb to attach
    java -Dfile.encoding=UTF-8 -Xmx2048m -Dwzpath=wz -cp $cp -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=$debug_port net.server.Server &

    # Prompt the user to run the jdb command externally
    echo "To start debugging, open a new terminal and run the following command:"
    echo "  jdb -attach localhost:$debug_port"

else
    echo "Normal mode. Starting the server without debugging..."
    # Start the Java program normally (no debugging)
    java -Dfile.encoding=UTF-8 -Xmx2048m -Dwzpath=wz -cp $cp net.server.Server
fi
