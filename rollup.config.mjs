import { defineConfig } from 'rollup';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
export default defineConfig({
  input: "src/main.tsx",
  output: [{file:"dist/bundler.js",format: "iife"}],
  plugins: [
    replace({preventAssignment:true,'process.env.NODE_ENV': JSON.stringify('production') }),
    nodeResolve({browser:true}),
    babel({babelHelpers:'bundled',presets:['@babel/preset-env','@babel/preset-react','@babel/preset-typescript'],plugins:[ ['babel-plugin-react-compiler',{target:'18'}]],exclude: './node_modules',extensions:['.ts','.tsx','js','jsx']}),
    commonjs(),
    typescript({tsconfig:'./tsconfig.json',outputToFilesystem:true,})
  ]
});
