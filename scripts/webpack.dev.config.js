const path = require('path');
const webpack = require('webpack');
const process = require('process');
const fs = require('fs');
const chalk = require('chalk');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const context = path.resolve(__dirname, '../');
const absolute = (subPath) => path.resolve(context, subPath);

const config = {
  context,
  target: 'web',
  entry: {
    app: './example/index.tsx',
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].[id].[hash].js',
    path: absolute('build'),
    publicPath: '/'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss', '.css'],
    modules: [absolute('src'), absolute('node_modules')],
  },
  plugins: [
    // Provide NODE_ENV variable
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    // Fork type-check to separate process
    new ForkTsCheckerPlugin({
      workers: ForkTsCheckerPlugin.TWO_CPUS_FREE,
      watch: ['src']
    }),
    new HtmlPlugin({
      template: 'example/index.html',
      hash: false,
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'react-hot-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              silent: true,
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
};

module.exports = config;
