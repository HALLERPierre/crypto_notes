import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
    entry: 'src/js/main.js',
    format: 'cjs',
    plugins: [
        resolve(),
        babel({exclude: 'node_modules/**'}),
        commonjs({
            namedExports: {
    // left-hand side can be an absolute path, a path
    // relative to the current directory, or the name
    // of a module in node_modules
            'node_modules/react-dom/index.js': [ 'ReactDOM' ]
        }})
    ],
    dest: 'public/js/app.js'
}
