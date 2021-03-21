const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        user_name: {type: String, required: true},
        title: {type: String, required: true},
        content: {type: String, required: true},
        hobby: {type: Schema.Types.ObjectId, ref: 'Hobby'},
        likes: [{type: Schema.Types.ObjectId, ref:'User', required: true}]
    }
);

module.exports = mongoose.model('Post', PostSchema);