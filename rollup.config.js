import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

export default {
    entry: 'src/js/main.js',
    format: 'iife',
    sourceMap: 'inline',
    plugins: [
        resolve(),
        babel({exclude: 'node_modules/**'}),
        commonjs({
            namedExports: {
                'node_modules/react-dom/index.js': [ 'ReactDOM', 'render' ],
                'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        }}),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    dest: 'public/js/app.js'
}
