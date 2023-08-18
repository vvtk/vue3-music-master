(function (){
    // 0. 安装
// 1. 引包
var express = require('express')
const path = require('path')

// 2. 创建你服务器应用程序
//    也就是原来的 http.createServer
var app = express()
// 在 Express 中开放资源就是一个 API 的事儿
// 公开指定目录
// 只要这样做了，你就可以直接通过 /public/xx 的方式访问 public 目录中的所有资源了
app.use( express.static(path.join(__dirname,"../../dist")))
// 相当于 server.listen
app.listen(1024, function () {
    console.log('app is running at port 1024.')
})
})()