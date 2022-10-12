const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outfitDateShema = new Schema({
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('OutfitDate',userSchema); 