import json from 'rollup-plugin-json'

export default [{
	input: ['src/shell.js', 'src/sections/contact.js', 'src/sections/about.js', 'src/sections/games.js', 'src/sections/vr.js'],
	output: {
		dir: './www',
    name: 'AlteredDimension',
		format: 'es',
		sourcemap: false
	},
	plugin: [
		json()
	]
}]