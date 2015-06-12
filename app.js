var path = require('path');
var koa = require('koa');
var routers = require('./routers');
var bodyParser = require('koa-body');
var logger = require('koa-logger');
var staticServer = require('koa-static');
var mongoose = require('mongoose');
var session = require('koa-session');
var config = require('./config');
var app = koa();

// 设置在logger前面，可以过滤掉静态资源的日志
app.use(staticServer(path.join(__dirname, 'public')));

app.use(logger());
app.keys = ['MEIZUAPIDOC'];
app.use(session({
    key: 'meizuapidoc',
    maxAge: 24*60*60*1000
},app));
// 自定义路由
routers(app);

app.on('error',function(err){
    console.log(err);
})

app.listen(3000);
