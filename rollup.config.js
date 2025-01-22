import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import image from '@rollup/plugin-image';



export default {
  input: "src/main.tsx",
  output: [
    {
      file: "dist/script.js",
      format: "umd"
    },
  ],
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    json({ compact: true, namedExports: true }),
    image(),
    resolve({
     browser: true,
     extensions: ['.ts', '.tsx'] }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' })
  ]};