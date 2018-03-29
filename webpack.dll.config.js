var path = require('path')
const webpack = require('webpack');


const config = {
  entry: {
    vendor : [
      "avalon2"
    ]
  },
  output: {
    path: __dirname + '/app/',
    filename: 'library/[name].js',
    library: '[name]_library',
  },
  resolve: {  
      alias: {  
          
      }  
  }, 
  plugins : [
    new webpack.DllPlugin({
    // 指定路径
      path: path.join(__dirname, '/', '[name]-manifest.json'),
    // 指定依赖库的名称
      name: '[name]_library'
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        reserved: ['mutual']
      }
    }),
    new webpack.BannerPlugin('leadBank版权所有,请勿转载'),
  ],
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use :[{
          loader : 'babel-loader'
        }],
        include: [path.resolve('src')],
        exclude :  /(node_modules|bower_components)/
        
      },
    ]
  },
}

webpack(config,function(e,s){
  if (e) throw e
  process.stdout.write(s.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
})