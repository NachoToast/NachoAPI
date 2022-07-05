// generates cryptographically-strong API keys
// default is 10 16-byte tokens
// make sure to put them in your config.json file if you want to use them

import { randomBytes } from 'crypto';
import { writeFileSync } from 'fs';
import { join } from 'path';

const numTokens = parseInt(process.argv.at(2) ?? `10`);
const tokenLength = parseInt(process.argv.at(3) ?? `16`);
console.log(`Generating ${numTokens} ${tokenLength}-byte tokens`);

function generateToken() {
    return randomBytes(tokenLength).toString(`hex`);
}

const collected: string[] = new Array(numTokens);

const spacing = Math.floor(Math.log10(numTokens));
for (let i = 0; i < numTokens; i++) {
    const individualSpacing = Math.floor(Math.log10(i + 1));
    const token = generateToken();
    console.log(`${i + 1}.${` `.repeat(spacing - individualSpacing)}`, token);
    collected[i] = token;
}

writeFileSync(join(__dirname, `generatedTokens.txt`), collected.join(`\n`), `utf-8`);
