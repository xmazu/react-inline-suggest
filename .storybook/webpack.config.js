const path = require('path');

const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

const context = path.resolve(__dirname, '../');
const absolute = (subPath) => path.resolve(context, subPath);
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('ts-loader')
  });

  config.module.rules.push({
    test: /\.scss$/,
    exclude: path.join(context, 'node_modules'),
    loader: ExtractTextPlugin.extract([
        'css-loader',
        'sass-loader'
    ])
  });

  config.plugins.push(
    new ExtractTextPlugin('react-inline-suggest.css')
  );

  config.resolve.extensions.push('.ts', '.tsx', '.scss');
  return config;
};
