var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HobbySchema = new Schema (
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
        image: {type: Image},
        posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
    }
);

module.exports = mongoose.model('Hobby', HobbySchema);