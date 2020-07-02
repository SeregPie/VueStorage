import {terser} from 'rollup-plugin-terser';
import buble from '@rollup/plugin-buble';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';

import {main} from './package.json';

let plugins = [
	resolve(),
	replace({'process.env.NODE_ENV': JSON.stringify('production')}),
	commonjs(),
	buble(),
	terser(),
];

if (process.env.ROLLUP_WATCH) {
	plugins.push(serve({
		contentBase: '',
		open: true,
	}));
}

let globals = {
	'@vue/composition-api': 'VueCompositionAPI',
};

export default {
	external: Object.keys(globals),
	input: 'src/index.js',
	plugins,
	output: {
		file: main,
		format: 'umd',
		name: 'VueStorage',
		globals,
	},
};
