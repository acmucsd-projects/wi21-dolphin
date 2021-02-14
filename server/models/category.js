var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var CategorySchema = new Schema (
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        hobbies: [{type: Schema.Types.ObjectId, ref:'Hobby', required: true}]
    }
);

module.exports = mongoose.model('Category', CategorySchema);