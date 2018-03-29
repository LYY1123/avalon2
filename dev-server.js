var webpack = require('webpack')
var opn = require('opn')
var express = require("express")
var http = require('http')
var ip = require('ip')
var proxy = require('http-proxy-middleware')
var webpackDevMiddleware = require("webpack-dev-middleware")
var webpackHotMiddleware = require("webpack-hot-middleware")
// var Dashboard = require('webpack-dashboard');
// const DashboardPlugin = require('webpack-dashboard/plugin')
var config = require('./webpack.dev.config.js')
const utils = require('./utils.js')


var app = express();
Object.keys(config.entry).forEach(function(name){
	(config.entry)[name].push("webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&noInfo=true");
})
var compiler = webpack(config);

// 美化控制台
// compiler.apply(new DashboardPlugin(new Dashboard().setData));

var devMiddlewqreConfig = webpackDevMiddleware(compiler,{
		quiet: true,
		noInfo: true,
    	publicPath: config.output.publicPath,
    	contentBase: 'dist/',
		stats: {
		   colors: true,
		   hash: false,
		   timings: true,
		   chunks: false,
		   chunkModules: false,
		   modules: false
		},
		hot : true
})
var proxyOption = [
	// {
 //    target: 'https://github.com', 
 //    changeOrigin: true
 //  },
]

// app.use("*.json",proxy(proxyOption[0]));

app.use(devMiddlewqreConfig);

app.use(webpackHotMiddleware(compiler));

var server = http.createServer(app);
server.listen(utils.devPort,(err) => {
  if (err) throw err
  console.log('==> 🌎 Listening on  http://localhost:' + utils.devPort );
})
opn("http://localhost:" + utils.devPort + "/index.html");