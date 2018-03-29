const path = require('path');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devConfig = {
  devtool: '#eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module : {
  	rules : [
     {
      test: /\.js$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [path.resolve('app')],
    },
		{
			test: /\.css$/,
			use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
				fallback: "style-loader",
				use:["css-loader"]
			}))
		},
		{
			test: /\.less$/,
			use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [
					"css-loader",
					"less-loader"
				]
			}))
		}
	 ]
  }
}
baseWebpackConfig.devtool = devConfig.devtool;
baseWebpackConfig.plugins = baseWebpackConfig.plugins.concat(devConfig.plugins);
baseWebpackConfig.module.rules = baseWebpackConfig.module.rules.concat(devConfig.module.rules);

module.exports = baseWebpackConfig;
