#!/bin/bash
echo -ne 'License Check'
echo -ne '\n'
 
git grep -L 'SPDX-License-Identifier' * \
    ':^.git*' \
    ':^build/' ':^contracts/' ':^test' ':^migrations/' \
    ':^*.sol' ':^*.d.ts' ':^*.js' ':^*.data' ':^*.cfg' ':^*.txt' \
    | grep -v 'SPDX-License-Identifier' > output.txt
 
echo
echo "Files with redundant boilerplate"
echo "________________________________ "
 
git grep -l SPDX-License-Identifier | \
    xargs grep -l 'Redistribution'
