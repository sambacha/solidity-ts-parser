#!/bin/bash
wget-O CRYTIC.md https://raw.githubusercontent.com/crytic/evm-opcodes/a4fa5e4b8ec08f5e44c296e8da06a52d2f31b47a/README.md
cat CRYTIC.md | pandoc --columns=200 -t asciidoc > OPCODES.asciidoc
