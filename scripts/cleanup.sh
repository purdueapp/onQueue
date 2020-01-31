#!/bin/bash

 pids=$(ps -ef | grep "olao.*node_modules" | awk '{print $2}')

 for pid in $pids
 do
     echo $pid
     kill -9 $pid
 done 