const mongoose = require('mongoose');
var mongoSchema = mongoose.Schema;

const ContestSchema = mongoose.Schema({
    title: String,
    description: String,
    date:{ type: Date, default: Date.now() },
    image:String,
    userId: { type: mongoSchema.Types.ObjectId, ref: 'Register' },
}, {
    timestamps: true
});

module.exports = mongoose.model('Contest',ContestSchema);