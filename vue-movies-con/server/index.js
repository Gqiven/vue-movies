//入口文件

// 引入编写好的api
var api = require('./api'); 
// 引入文件模块
var fs = require('fs');
// 引入处理路径的模块
var path = require('path');
// 引入处理post数据的模块
var bodyParser = require('body-parser');
// 引入Express
var express = require('express');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
//app.use(express.static(path.resolve(__dirname, '../dist')));
// 因为是单页应用 所有请求都走/dist/index.html
// app.get('*', function(req, res) {
//     var html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
//     res.send(html)
// })
// 监听8088端口
app.listen(8088);
console.log('success listen…………');
