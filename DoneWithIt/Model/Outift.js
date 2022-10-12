const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outfitSchema = new Schema({
    outfitName: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    wornDates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "OutfitDate"
    }],
    imagePath: {
        type: String,
        required: true
    },
    ownedBy: {
        type: Schema.type.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('User',userSchema); 