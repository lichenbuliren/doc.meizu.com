var render = require('../lib/render');
var bodyParse = require('koa-body')();
var Api = require('../api');
var router = require('koa-router')({
    prefix: '/admin'
});

module.exports = function(app) {

    // 管理员首页
    router.get('/', checkLogin, function*(next) {
        var admin = this.session.meizuapidoc,
            resp,
            respBody;

        // TODO 获取项目文档数据集合
        resp = yield Api.queryProjects();

        respBody = JSON.parse(resp.body);
        if (respBody.error_code == 200) {
            this.body = yield render('/admin/index', {
                title: '文档管理系统',
                projects: respBody.data || [],
                admin: admin
            });
        }else{
            this.body = respBody;
        }
    });

    // 管理员登录
    router.get('/login', checkNotLogin, function*(next) {
        this.body = yield render('/admin/login', {
            title: '管理员登录'
        });
    });

    router.post('/login', bodyParse, function*(next) {
        var data = this.request.body,
            resp;

        // 验证验证码是否正确
        // 验证邮箱和密码是否正确
        // 发送http请求
        resp = yield Api.login(data);

        // 这里记得要用JSON转化一下，
        var respBody = JSON.parse(resp.body);
        if (respBody.error_code == 200) {
            // TODO 登录成功，设置cookie
            this.session.meizuapidoc = respBody.data;
            this.redirect('/admin');
        } else {
            this.redirect('/admin/login');
        }
    });

    // 添加项目
    router.get('/project',checkLogin,function*(next){
        this.body = yield render('/admin/project/index', {
            title: '管理员登录',
            admin: this.session.meizuapidoc
        });
    });

    function* checkLogin() {
        if (!this.session.meizuapidoc) {
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