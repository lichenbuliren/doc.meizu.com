var uri = 'http://doc-api.meizu.com:4000';
module.exports = {
    dev: {
        db: 'apidoc',
        host: 'localhost',
        port: 27017
    },
    pro:{

    },
    services:{
        login: uri + '/login',
        projects: uri + '/projects'
    }
}