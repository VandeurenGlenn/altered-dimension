import json from 'rollup-plugin-json'
import rm from 'rimraf'
import cp from 'cp'
import modify from 'rollup-plugin-modify'

rm.sync('www/**/**.js')

cp.sync('./node_modules/lfc-api/browser.js', './www/lfc-api.js')

export default [{
	input: ['src/shell.js'],
	output: {
		dir: './www',
    name: 'AlteredDimension',
		format: 'es',
		sourcemap: false
	},
	plugins: [
		json()
	]
}, {
	input: ['src/sections/home.js', 'src/sections/info.js', 'src/sections/contact.js', 'src/sections/about.js', 'src/sections/games.js', 'src/sections/vr.js', 'src/sections/why-vr.js', 'src/sections/events.js'],
	output: {
		dir: './www/sections',
    name: 'AlteredDimension',
		format: 'es',
		sourcemap: false
	},
	plugins: [
		json()
	]
}, {
	input: ['src/service-worker.js'],
	output: {
		dir: './www',
		format: 'cjs',
		sourcemap: false
	},
	plugins: [
		json(),
    modify({
			SW_HASH: new Date().getTime(),
      STORAGE_IMPORT: `new Promise(async (resolve, reject) => {
        if (!globalThis.LeofcoinStorage) {
          const imported = await import('./lib/level.js');
          globalThis.LeofcoinStorage = imported.default;
        }
        resolve()
      })`,
      QRCODE_IMPORT: `if (!globalThis.QRCode) {
        const imported = await import('./../lib/qrcode.js');
        globalThis.QRCode = imported.default;
      }`,
      IPFS_IMPORT: `new Promise(async (resolve, reject) => {
        if (!globalThis.Ipfs) {
          globalThis.Ipfs = require('./node_modules/ipfs/dist/index.min.js');
        }        
        resolve()
      })`,
      DISCO_ROOM_IMPORT: `
        const imported = await import('./lib/disco-room.js');
        const DiscoRoom = imported.default;`
    })
	]
}]