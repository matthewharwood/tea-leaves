const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    outputPath: path.join(__dirname, 'dist'),
    colors: false
  },
  devtool: "source-map",
  entry: {
    app: ['./src/app.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        enforce: 'pre',
        test: /\.ts$/,
        loader: 'tslint-loader'
      }
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin(
        [{from: 'src/public'}],
        {
          ignore: [

            // Doesn't copy any files with a txt extension
            'extends/**/*',
            'includes/**/*',
            'macros/**/*',
            '**/*.pug',
            '**/*.scss',
            '**/*.ts',
          ],
        }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};