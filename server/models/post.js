var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var PostSchema = new Schema(
    {
        user_name: {type: String, required: true},
        content: {type: String, required: true}
    }
);

module.exports = mongoose.model('Post', PostSchema);