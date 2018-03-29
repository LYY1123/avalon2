const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devPort : 3000,
	// 绝对路径生成器
	resolve : (localPath, ...dir) => path.join(process.cwd(), localPath, ...dir),
	// 生成多页面入口
	getEntries : function (path) {
		const paths = glob.sync(path);
		let entries = {};
		for (let i = 0; i < paths.length; i++) {
			entries[paths[i].split('/')[3]] = [paths[i]]
		}
		return entries;
	},
	// 生成多页面HTML文件
	createdPages: function(path){
		let htmlPlugins = [];
		const paths = glob.sync(path);
		let HtmlPlugin;
		for (let i = 0; i < paths.length; i++) {
			HtmlPlugin = new HtmlWebpackPlugin({
		      filename: paths[i].split('/')[3] + '.html',
		      template: paths[i],
		      inject: true,
		      chunks : ['commons',paths[i].split('/')[3]]
		    })
		    htmlPlugins.push(HtmlPlugin)
		}
		return htmlPlugins;
	},
	// chunks 入口名数组
	getChunkNames : function(path){
		const paths = glob.sync(path);
		let entries = [];
		for (let i = 0; i < paths.length; i++) {
			entries.push([paths[i].split('/')[3]])
		}
		return entries;
	}
}