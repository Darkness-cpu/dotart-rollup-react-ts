import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import image from '@rollup/plugin-image';



export default {
  input: "src/main.tsx",
  output: [
    {
      file: "dist/bundler.js",
      format: "umd"
    },
  ],
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    nodeResolve({ browser: true }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env','@babel/preset-react','@babel/preset-typescript'],
      extensions: ['.ts','.tsx'],
    }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' })
  ]};
