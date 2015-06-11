module.exports = function(app) {
    // 用户访问路由
    require('./user')(app);

    // 管理员路由访问
    require('./admin')(app);
}