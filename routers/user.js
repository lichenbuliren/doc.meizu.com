var render = require('../lib/render');
var router = require('koa-router')();
var Project = require('../models/Project');


module.exports = function(app) {
    router.get('/', function*(next) {
        console.log('get / path');
        this.body = yield render('list', {
            title: '文章列表'
        });
    }).get('/project', function*(next) {
        var project = new Project({
            _id: Math.random() * 20 + 1,
            name: 'test2',
            author: 'heaven2'
        });

        yield project.save();

        this.body = yield render('list', {
            title: 'test mongoose2'
        });
    });

    app.use(router.routes());
}