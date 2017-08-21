const path = require('path');
const webpack = require('webpack');
const process = require('process');
const fs = require('fs');
const chalk = require('chalk');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const context = path.resolve(__dirname, '../');
const absolute = (subPath) => path.resolve(context, subPath);

const config = {
  context,
  target: 'web',
  entry: {
    index: './src/index.ts',
  },
  devtool: 'source-map',
  output: {
    filename: 'react-inline-suggest.js',
    path: absolute('dist'),
    library: 'react-inline-suggest',
    libraryTarget: 'umd'
  },
  
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader:'source-map-loader'
      },
      {
        test: /\.scss$/,
        exclude: path.join(context, 'node_modules'),
        loader: ExtractTextPlugin.extract([
            'css-loader',
            'sass-loader'
        ])
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [absolute('src'), absolute('node_modules')]
  },
  externals: {
    'react': 'React',
    'react-dom': 'react-dom'
  },
  plugins: [
    new ForkTsCheckerPlugin({
      workers: ForkTsCheckerPlugin.TWO_CPUS_FREE,
      watch: ['src']
    }),
    new ExtractTextPlugin('react-inline-suggest.css')
  ]  
};

module.exports = config;
