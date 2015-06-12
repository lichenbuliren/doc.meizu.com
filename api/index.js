// service 服务类
var request = require('koa-request');
var config = require('../config');

var Api = {
    uri: config.services,
    login: function(data) {
        return request.post(this.uri.login, {
            form: data
        });
    },

    queryProjects: function() {
        return request.get(this.uri.projects);
    }
}

module.exports = Api;