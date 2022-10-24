//imports 
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const Outift = require('./Model/Outift');
const User = require('./Model/User');


//test entry
//var retVal = requestDatabase(2,"testemail@gmail.com",`test`,"10-16-2022");

//function to send a message to the server
//returns server response
function requestDatabase() {

    //connect to DB
    connectDB();

    //check that mongo connected before listen
    try {
        mongoose.connection.once('open', () => {
            console.log('Connected to MongoBongo Batadase');
        });
    } catch(error) {
        console.log("Connection to DB failed.");
    }

    //get all arguments
    const args = Array.from(arguments);

    //switch to handle all arguments
    //check if we received a valid request num
    switch (args[0]) {
        /* 
         * Check User Exists:
         * Format: 1,email
        */
        case 1: 
            //query database to see if user email exists

            break;
        /*
         * Add new User
         * Format: 2, email, displayName, currentDate
        */
        case 2: 
            var newUser = new User({displayName: args[2], email: args[1], accountCreationDate: args[3]});
            if(!newUser.$isValid) {
                console.log(`>>>> user is invalid.`);
                return null;
            }
            if(saveToMongo(newUser)) {
                console.log(`>>>> save to mongo succeeded. Returning: ${newUser.id}`);
                return newUser.id;
            } else {
                console.log(`>>>> save to mongo failed.`);
                //fail
                return null;
            }
        /*
         * Get existing user data
         * Format: 3, email
         */
        case 3: 

            break;
        /*
         * Update display name
         * Format: 4, userID, displayName
         */
        case 4: 

            break;
        /*
         * Update profile pic
         * Format: 5, userID, {need to figure out what to do with pics for the moment}
         */
        case 5: 

            break;
        /*
         * Remove all user data 
         * Format: 6, userID
         */
        case 6: 

            break;
        /*
         * Add new outfit to database under user
         * Format: 7, userID, {outfit image idk what to do so far}, outfitName, outfitDescription
         */
        case 7: 

            break;
        /*
         * Delete outfit from database
         * Format: 8, userID, outfitID
         */
        case 8: 

            break;
        /*
         * Edit outfit information in database
         * Format: 9, userID, outfitID, {outfit Image}, outfitName, outfitDescription
        */
        case 9: 

            break;
        /*
         * Give/receive notification token
         * Format: 10, userID, token/NULL
         */
        case 10: 

            break;
        default:
            //request number is invalid
            console.log(`MessageHandler: no request to match offered number`);
            return "fail, " + requestNum;
    } 

    mongoose.connection.close();
}

async function saveToMongo(entry) {
    await entry.save(function(err,result){
        if (err) {
            console.log(err);
            return false;
        } else  {
            console.log(result);
            return true;
        }
      });
      
}


module.exports = requestDatabase;