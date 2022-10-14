//imports
const net = require('net'); 
const { send } = require('process');
//config
const PORT = 3400;

sendMessage(1,"jdawgs009@gmail.com");


//function to send a message to the server
//returns server response
function sendMessage() {

    const args = Array.from(arguments);
    var message = args[0] + "~|`";

    //add all arguments to message
    for (let i = 1; i < args.length; i++) {
        message = message + args[i] + "~|`";
    }
   
    //create socket
    const client = new net.Socket();

    //connect to server on port
    client.connect(PORT,function(){
        //log connections
        console.log(`Client: Connected to server on port ${PORT}`);

        //try to send data
        console.log(`Client: Sent message: \"${message}\" to server on port ${PORT}`);
        client.write(message);
    });
    
    //Handle confirm
    client.on('data', function(data){
        console.log(`Client received from server: ${data}`);
        const buf = Buffer.from(data);
        let response = handleResponse(buf.toString());
        return response; 
    });

    // Handle connection close 
    client.on('close',function(){
        console.log('Client: Connection Closed');
    });
    
    //Handle error
    client.on('error',function(error){
        console.error(`Connection ${error}`); 
    });

}

function handleResponse(data) { 
    console.log(data);
    data = toString(data);
    //split using agreed upon regex
    const messageSplit = data.split("~|`");
    let requestNum = messageSplit[messageSplit.length - 1];

    //check for wrong format fail
    if(!(isNaN(requestNum))) {
        return null;
    }
    //handle each response, there wont be any fails since that check passes
    switch (requestNum) {
        /* 
         * Check User Exists:
         * Format: {"success" || "fail"}~|`1
        */
        case 1: 

            break;
        /*
         * Add new User
         * Format: {"success" || "fail"}~|`userID~|`2
        */
        case 2: 
            break;
        /*
         * Get existing user data
         * {"success" || "fail"}~|`userID~|`{profilePic still dont know about pic stuff}~|`{outfit 1 info}~|`{outfit 2 info}
         */
        case 3: 
            
            break;
        /*
         * Update display name
         * Format: {"success" || "fail"}~|`4
         */
        case 4: 

            break;
        /*
         * Update profile pic
         * Format: {"success" || "fail"}~|`5
         */
        case 5: 

            break;
        /*
         * Remove all user data 
         * Format: {"success" || "fail"}~|`6
         */
        case 6: 
            
            break;
        /*
         * Add new outfit to database under user
         * Format: {"success" || "fail"}~|`outfitID~|`7
         */
        case 7: 

            break;
        /*
         * Delete outfit from database
         * Format: {"success" || "fail"}~|`8
         */
        case 8: 

            break;
        /*
         * Edit outfit information in database
         * Format: {"success" || "fail"}~|`outfitID~|`9
         */
        case 9: 

            break;
        /*
         * Give/receive notification token
         * Format: {"success" || "fail"}~|`token~|`10
         */
        case 10: 
            
            break;
        /*
         * only calls this if the request is invalid so < 1 or > 10
         */
        default:
            //request number is invalid
            console.log("ServerResponseHandler: request number invalid, not a valid requst number");
            return null;
    } 
}