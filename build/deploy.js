const LfcApi = require('lfc-api');
const { join } = require('path');
const { writeFile } = require('fs');
const { promisify } = require('util');


const write = promisify(writeFile);

(async () => {
  const api = await new LfcApi()
  const result = await api.ipfs.addFromFs('www', { recursive: true })
  console.log(result);
  const buildParams = {}
  for (const { path, hash } of result) {
    if (path === 'www') buildParams.dapHash = hash
  }
})()