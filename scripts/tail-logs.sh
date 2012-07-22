#!/bin/sh

. config/server.sh

tail -f $ROOT_DIR/$ERR_FILE $ROOT_DIR/$OUT_FILE
