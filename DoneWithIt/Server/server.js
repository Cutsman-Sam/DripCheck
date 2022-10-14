//imports
const net = require('net');
const mongoose = require('mongoose');

//global values
const PORT = 3400;

const connectDB = require('../config/dbConn');
const { emitWarning } = require('process');

//connect to DB
connectDB();

//create server
const server = net.createServer(onClientConnection);

//check that mongo connected before listen
mongoose.connection.once('open', () => {
    console.log('Connected to MongoBongo Batadase');
    
    //start listening
    server.listen(PORT,function() {
        console.log(`Server started on port ${PORT}`);
    });
});

//function to handle client connection
function onClientConnection(socket) {
    //log connection
    console.log(`${socket.remoteAddress}:${socket.remotePort} Connected`);

    //Handle the client data.
    socket.on('data',/*insert data handling function here*/function(data){
        //Log data received from the client
        console.log(`>> data received : ${data} `);
		
		//verify valid message received

        //pass message to message handler
        
        let serverResp = handleRequest(toString(data));

        //setup response
		socket.write(serverResp);
        console.log(`Server responded: ${serverResp}`)
		
		//close the connection 
		socket.end()  

        //serverResp = "fail~|`0";
        if(serverResp == null) {
            console.log(`Request: "${data}" failed in messageHandler`)
        }  
    });    

    //Handle when client connection is closed
    socket.on('close',function(){
        console.log(`${socket.remoteAddress}:${socket.remotePort} Connection closed`);
    });
    
	//Handle Client connection error.
    socket.on('error',function(error){
        console.error(`${socket.remoteAddress}:${socket.remotePort} Connection ${error}`);
    });
	
};

function handleRequest(data) {
    var requestSplit = data.split("~|`");
    let requestNum = requestSplit[0];
    
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
            
            break;
        /*
         * Add new User
         * Format: 2~|`email~|`displayName~|`
        */
        case 2: 

            break;
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