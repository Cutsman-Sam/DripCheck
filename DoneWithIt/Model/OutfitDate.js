const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outfitDateSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    OwnedBy: {
        type: Schema.Types.ObjectID,
        required: true
    }
});

module.exports = mongoose.model('OutfitDate',userSchema); 