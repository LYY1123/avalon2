const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
// var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
// var OfflinePlugin = require('offline-plugin');
const utils = require('./utils.js');

// loader 多线程编译
// var HappyPack = require('happypack')
// var os = require('os')
// const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length}); // 启动线程池;

let PUBLIC_PATH = process.env.NODE_ENV.replace(/\s/,'') == 'build' ? 'https://lyy1123.github.io/lyyglob.github.io/dist/' : '/'

let moduleConfig = {
  entry: utils.getEntries('./app/views/**/*.js'),
  output: {
    path: __dirname + '/dist/',
    filename: 'js/[name].js?hash=[hash:5]',
    publicPath : PUBLIC_PATH,
    chunkFilename: "js/chunk[id].js?hash=[hash:5]"
  },
  resolve: {  
    alias: {
        'common' : path.resolve(__dirname, 'app/common/'),
        'lib' : path.resolve(__dirname, 'app/library/'),
        'json': path.resolve(__dirname,'json'),
        'js': path.resolve(__dirname,'app/js')
    }  
  },
  // webpack4新增
  // optimization: {
  //   splitChunks: {
  //     name: "common",
  //   }
  // },
  plugins : [
    new ImageminPlugin({
      disable : process.env.NODE_ENV.replace(/\s/,'') !== 'build',
      test : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      minFileSize : 10000,
      pngquant: {
        quality: '80-90',
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons', // 将公共模块提取，生成名为`vendors`的chunk
      chunks: utils.getChunkNames, // 提取哪些模块共有的部分
      minChunks: 2 // 提取至少3个模块共有的部分
    }),
    new ExtractTextPlugin({
      filename : "css/[name].css?hash=[hash:5]",
      allChunks: true
    }),
    new webpack.DllReferencePlugin({
      manifest: require('./vendor-manifest.json')
    }),
    // 在htmlwebpack后插入一个AddAssetHtmlPlugin插件，用于将vendor插入打包后的页面
    new AddAssetHtmlPlugin({ 
      filepath: require.resolve('./app/library/vendor.js'), 
      includeSourcemap: false ,
      hash : true,
      outputPath : "./lib", //相对与d输出文件dist的相对路径
      publicPath : PUBLIC_PATH + "lib",  //HTML中引入公共第三方js的路径链接
    }),
    new copyWebpackPlugin([
      // manifest.json
      {
        from:  './app/mainfest.json'
      }
    ]),
    new webpack.BannerPlugin('leadBank版权所有,请勿转载'),
  ],
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use :[{
          loader : 'babel-loader'
        }],
        include: [path.resolve('app')],
        exclude :  /(node_modules|bower_components)/
      },
      {
        test: /\.html$/,
        use :[{
          loader : 'raw-loader'
        },{
          loader : 'html-minifier-loader'
        }],
        include: [path.resolve('app')],
        exclude :  /(node_modules|bower_components)/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use : [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name : '[name].[ext]?hash=[hash:5]',
              outputPath : 'img/'
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use : [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name : '[name].[ext]?hash=[hash:5]',
              outputPath : 'video/'
            }
        }]
        
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use : [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name : '[name].[ext]?hash=[hash:5]',
                outputPath : 'font/'
              }
          }
        ]
        
      }
    ]
  }
}

// 创建多入口，多页面
moduleConfig.plugins = moduleConfig.plugins.concat(utils.createdPages("./app/views/**/*.html"));

// 生产环境时再service-worker.js打包进去 service-worker暂时不能在开发环境时 它会和热更新冲突
// service-worker本地环境调试请使用命令npm run sk-dev
if (process.env.SK_FLAG) {
  moduleConfig.plugins.push(
    new copyWebpackPlugin([
      // serviceWorker.js
      {
        from:  './app/js/service-worker.js'
      }
    ])
  )
}
if(process.env.NODE_ENV.replace(/\s/,'') == 'build'){
  moduleConfig.plugins.push(
    new copyWebpackPlugin([
      // serviceWorker.js
      {
        from:  './app/copyFiles/service-worker.min.js'
      }
    ])
  )
}

module.exports = moduleConfig;