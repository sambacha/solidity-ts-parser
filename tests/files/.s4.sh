#!/bin/bash

cat PWD > tmp.txt
awk 'BEGIN{ sum=0} { gsub(",","",$3); sum += $3 } END{ printf "%.2f\n", sum}' tmp.txt
 
cat *.sol > tmp.txt
python -m tokenize tmp.txt
