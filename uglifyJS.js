// 代码压缩
// 某些代码需要手动压缩
var fs = require('fs');
var uglify = require('uglify-es')
var path = require("path");
var basePath = path.resolve('app');

// 压缩配置
var options = {
  compress: {
    global_defs: {
      "@alert": "console.log"
    },
    drop_console: true
  },
  warnings: true,
  ie8: true
}

// 需要压缩的js
let jsList = {
  'service-worker': "/js/service-worker.js"
}
console.log('uglify 开始压缩...')
for (var i in jsList) {
  var jsString = fs.readFileSync(basePath + jsList[i],"utf-8");
  
  console.log(i + '.js' + " -----uglify to----- " + i + '.min.js')
  fs.writeFileSync(basePath + '/copyFiles/' + i + '.min.js',uglify.minify(jsString, options).code,"utf-8")
}
console.log('uglify 压缩完成...')
