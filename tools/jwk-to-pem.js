#!/usr/bin/env node

const fs = require('fs');
const jwkToPem = require('jwk-to-pem');

if (process.argv.length < 3) {
    console.log(`USAGE: ${process.argv[1]} jwk.json`);
    process.exit(1);
}

console.log(jwkToPem(JSON.parse(fs.readFileSync(process.argv[2]))));
