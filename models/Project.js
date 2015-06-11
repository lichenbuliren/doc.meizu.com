var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    _id: String,
    name: String,
    author: String,
    create: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    interfaces:Array
});

var Project = mongoose.model('project', ProjectSchema);

module.exports = Project;