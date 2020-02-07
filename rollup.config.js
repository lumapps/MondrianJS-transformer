import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';

export default {
    output: {
        format: 'esm',
    },
    plugins: [
        postcss({
            extensions: ['.css'],
        }),
        babel({
            // eslint-disable-next-line no-sync
            ...JSON.parse(require('fs').readFileSync('.babelrc', 'utf8')),
            exclude: 'node_modules/**',
            presets: ['@babel/env', '@babel/preset-react'],
        }),
        url(),
        svgr(),
    ],
};
