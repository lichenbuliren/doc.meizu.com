// 管理员模型
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = mongoose.Promise;

var AdminSchema = new Schema({
    _id: String,
    email: String,
    name: String,
    password: String
});

var Admin = mongoose.model('admin',AdminSchema);

AdminSchema.methods.add = function() {
    var self = this,
        p = new Promise();
    self.save(function(err,data){
        if(err){
            p.reject(error);
        }else{
            p.resolve(null,data);
        }
    });

    return p;
}



module.exports = Admin;