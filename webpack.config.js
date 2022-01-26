import path  from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.js',
  mode: 'production',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'didauth.min.cjs',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  externals: {
    axios: 'axios',
    uuid: 'uuid',
    '@7urtle/lambda': '@7urtle/lambda'
  },
  optimization: {
    usedExports: true,
    providedExports: true,
    innerGraph: true,
    sideEffects: true,
    minimize: true
  },
  devtool: 'source-map'
};