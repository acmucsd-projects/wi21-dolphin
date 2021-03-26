const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema (
    {
        user_name: {type: String, required: true},
        password: {type: String, required: true},
        biography: {type: String, default: "Enter your biography here"},
        isAdmin: {type: Boolean, required: true, default: false}
    }
);

module.exports = mongoose.model('User', UserSchema);

