import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

let globals = {
	'vue': 'Vue',
};

export default {
	input: 'src/VueStorage.js',
	external: Object.keys(globals),
	output: {
		file: 'VueStorage.js',
		format: 'umd',
		name: 'VueStorage',
		globals,
	},
	plugins: [
		buble(),
		uglify(),
	],
};