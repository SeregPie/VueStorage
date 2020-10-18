import {terser} from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';

import {main} from './package.json';

let plugins = [
	nodeResolve(),
	replace({'process.env.NODE_ENV': '"production"'}),
	babel({
		babelHelpers: 'bundled',
		presets: [['@babel/preset-env', {
			targets: ['defaults', 'not IE 11'],
		}]],
	}),
	terser(),
];

if (process.env.ROLLUP_WATCH) {
	plugins.push(serve({
		contentBase: '',
		open: true,
	}));
}

let globals = {
	'vue-demi': 'VueDemi',
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
		exports: 'named',
	},
};
