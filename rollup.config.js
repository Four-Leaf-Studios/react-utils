const resolve = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel');
const typescript = require('@rollup/plugin-typescript');

module.exports = {
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
      babelHelpers: 'bundled',
      presets: ['@babel/preset-typescript'], // Include the TypeScript preset
    }),
    typescript({ tsconfig: './tsconfig.json' }), // Use TypeScript plugin to transpile
  ],
  external: ['react', 'react-dom'], // Mark React as external to avoid bundling it
};
