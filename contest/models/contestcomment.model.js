const mongoose = require('mongoose');
var mongoSchema = mongoose.Schema;

const contestComment = mongoose.Schema({
    comment:String,
    userId: { type: mongoSchema.Types.ObjectId, ref: 'Register' },
    contestId: { type: mongoSchema.Types.ObjectId, ref: 'Contest' },
},{
    timestamps: true
});

module.exports = mongoose.model('Contestcomments',contestComment);