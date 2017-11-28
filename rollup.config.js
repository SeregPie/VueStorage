import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

export default {
	input: 'src/VueStorage.js',
	output: {
		file: 'VueStorage.js',
		format: 'umd',
		name: 'VueStorage',
	},
	plugins: [
		buble(),
		uglify(),
	],
};