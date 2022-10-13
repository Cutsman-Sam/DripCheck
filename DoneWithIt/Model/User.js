//_id is default created for any object

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    outfits: [{
        type: Array,
        ref: "Outfit"
    }]
});

module.exports = mongoose.model('User',userSchema); 