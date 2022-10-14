//imports
const dgram = require('dgram');
const mongoose = require('mongoose');

//global values
const PORT = 34000;
const HOST = '0.0.0.0';

const connectDB = require('../config/dbConn');
const User = require('../Model/User');

//connect to DB
connectDB();

//create server
const socket = dgram.createSocket("udp4");

//check that mongo connected before listen
mongoose.connection.once('open', () => {
    console.log('Connected to MongoBongo Batadase');
    
    //start listening
    socket.bind(PORT);
    console.log(`Server started on port ${PORT}`);
});

socket.once('listening', () => {
    const address = socket.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

//Handle the client data.
socket.on('message',function(msg,rinfo){

    //Log data received from the client
    console.log(`>> data received : ${msg} from ${rinfo.address}:${rinfo.port} `);
		
	//verify valid message received

    //pass message to message handler
    let serverResp = handleRequest(msg);

        //setup response
	socket.send(serverResp,0,serverResp.length,rinfo.port,rinfo.address);
    console.log(`Server responded: ${serverResp}`)
		
    //serverResp = "fail~|`0";
    if(serverResp == null) {
        console.log(`Request: "${data}" failed in messageHandler`)
    }
});    

//Handle Client connection error.
socket.on('error',function(error){
    console.error(`${socket.remoteAddress}:${socket.remotePort} Connection ${error}`);
});	



function handleRequest(data) {
    const buf = Buffer.from(data);
    var dataStr = buf.toString();
    var requestSplit = dataStr.split("~|`");
    let requestNum = parseInt(requestSplit[0]);

    if(isNaN(requestNum) || requestNum == 0) {
        return "fail~|`0"
    }

    //check if we received a valid request num
    switch (requestNum) {
        /* 
         * Check User Exists:
         * Format: 1~|`email
        */
        case 1: 
            //query database to see if user email exists
            return "success~|`1";
        /*
         * Add new User
         * Format: 2~|`email~|`displayName~|`currentDate
        */
        case 2: 
            const newUser = new User({displayName: toString(requestSplit[2]), email: toString(requestSplit[1]), accountCreationDate: toString(requestSplit[1])});
            var err = saveToMongo(newUser);
            if(err == null) {
                //success
                return "success~|`" + newUser.id + "~|`2";
            } else {
                //fail
                return "fail~|`" + "~|`2";
            }
        /*
         * Get existing user data
         * Format: 3~|`email
         */
        case 3: 

            break;
        /*
         * Update display name
         * Format: 4~|`userID~|`displayName
         */
        case 4: 

            break;
        /*
         * Update profile pic
         * Format: 5~|`userID~|`{need to figure out what to do with pics for the moment}
         */
        case 5: 

            break;
        /*
         * Remove all user data 
         * Format: 6~|`userID
         */
        case 6: 

            break;
        /*
         * Add new outfit to database under user
         * Format: 7~|`userID~|`{outfit image idk what to do so far}~|`outfitName~|`outfitDescription
         */
        case 7: 

            break;
        /*
         * Delete outfit from database
         * Format: 8~|`userID~|`outfitID
         */
        case 8: 

            break;
        /*
         * Edit outfit information in database
         * Format: 9~|`userID~|`outfitID~|`{outfit Image}~|`outfitName~|`outfitDescription
        */
        case 9: 

            break;
        /*
         * Give/receive notification token
         * Format: 10~|`userID~|`token/NULL
         */
        case 10: 

            break;
        default:
            //request number is invalid
            console.log(`MessageHandler: no request to match offered number`);
            return "fail~|`" + requestNum;
    } 
}

async function saveToMongo(entry) {
    await entry.save((err,savedUser) => {
        if (err) {return err};
        //saved\
      });
      return null;
}

