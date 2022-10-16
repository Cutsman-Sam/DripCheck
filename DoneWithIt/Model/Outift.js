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
    imagePath: {
        type: String,
        required: true
    },
    ownedBy: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Outfit',outfitSchema); 