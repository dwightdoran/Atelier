const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/client/src/index.jsx'),
  output: {
    filename: 'main.js',
    path: path.join(__dirname, '/client/dist')
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // matches .js, .ts, and .tsx files
        loader: 'babel-loader', // uses babel-loader for the specified file types (no ts-loader needed)
        exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        }
    ]
  },
  plugins: [
    new ImageminPlugin()
  ]
}
