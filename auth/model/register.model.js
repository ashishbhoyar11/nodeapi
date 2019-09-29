const mongoose = require('mongoose');
var mongoSchema = mongoose.Schema;

const RegisterSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isFriends : [{ type: mongoSchema.Types.ObjectId, ref: 'Register' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Register', RegisterSchema);