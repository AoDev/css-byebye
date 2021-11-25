import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser"

const config = {
    plugins: [
        typescript({
            include: '**/*.js'
        }),
        terser()
    ],
    input: 'src/css-byebye.js',
    output: {
        file: 'lib/css-byebye.js',
        format: 'cjs',
        exports: 'auto'
    },
    external: ['postcss']
}

export default config