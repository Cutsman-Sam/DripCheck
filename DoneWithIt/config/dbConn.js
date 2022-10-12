const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://admin307:chamberdrip@dripcheckapp.pqkwnvc.mongodb.net/?retryWrites=true&w=majority",{
            useUnifiedTopology: true, useNewUrlParser: true
         });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB