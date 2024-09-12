import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser'; // Use terser as default import
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts', // The entry point (TypeScript)
  output: [
    {
      file: 'dist/index.cjs.js', // CommonJS format for Node.js consumers
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js', // ES Module format for modern bundlers
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // Handle both JS and TS files
    }),
    babel({
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // Handle JSX/TSX with Babel
      babelHelpers: 'bundled', // Ensures helpers are bundled with the output
      presets: [
        '@babel/preset-react', // Preset to handle React JSX
        '@babel/preset-typescript', // Preset to handle TypeScript
      ],
    }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }), // Use TypeScript plugin to transpile
    postcss(),
    terser(), // Minify the output for production
  ],
  external: ['react', 'react-dom'], // Mark React and ReactDOM as external to avoid bundling them
};
