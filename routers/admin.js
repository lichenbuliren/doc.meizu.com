var render = require('../lib/render');
var session = require('koa-session');
var bodyParse = require('koa-body')();
var Admin = require('../models/Admin');
var request = require('koa-request');
var config = require('../config');
var router = require('koa-router')({
    prefix: '/admin'
});

module.exports = function(app) {

    router.get('/', checkLogin, function*(next) {
        var projects = [];
        var admin = this.session.meizuapidoc;
        this.body = yield render('/admin/index', {
            title: '文档管理系统',
            projects: projects,
            admin: this.session.meizuapidoc
        });
    }).get('/login', checkNotLogin, function*(next) {
        this.body = yield render('/admin/login', {
            title: '管理员登录'
        });
    }).post('/login', bodyParse, function*(next) {
        var data = this.request.body,
            resp,
            admin,
            captcha;

        // 验证验证码是否正确
        // 验证邮箱和密码是否正确
        // 发送http请求
        try {
            // admin = yield Admin.findOne({
            //     'email': data.email,
            //     'password': data.password
            // }).exec();
            // TODO 校验验证码
            resp = yield request.post({
                url:config.services.login,
                body:data,
                json:true
            });
            console.log(resp.body);
        } catch (err) {
            this.body = yield render('/exception.html', {
                title: '出错了！',
                message: err
            });
        }

        if (resp) {
            // TODO 登录成功，设置cookie
            // this.session.meizuapidoc = resp;
            this.redirect('/admin');
        } else {
            router.redirect('/admin/login');
        }
    });

    function* checkLogin() {
        if (!this.session.meizuapidoc) {
            console.log(this.session.meizuapidoc);
            return this.redirect('/admin/login');
        }
        yield arguments[arguments.length - 1];
    }

    function* checkNotLogin() {
        if (this.session.meizuapidoc) {
            return this.redirect('/admin');
        }
        yield arguments[arguments.length - 1];
    }

    app.use(router.routes());
}