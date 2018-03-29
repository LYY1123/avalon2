var opn = require('opn')
var express = require("express")
var http = require('http')
var path = require('path')

var app = express();
app.use(express.static(path.resolve(__dirname,'dist')));
var server = http.createServer(app);
var port = "3002"
server.listen(port,(err) => {
  if (err) throw err
  console.log('==> 🌎 Listening on  http://localhost:' + port );
})
opn("http://localhost:" + port + "/index.html");