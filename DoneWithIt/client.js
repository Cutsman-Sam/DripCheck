//imports
const net = require('net'); 

//config
const PORT = 3400;


//function to send a message to the server
//returns server response
function messageServer(msg) {
    //create socket
    const client = new net.Socket();

    //connect to server on port
    client.connect(PORT,function(){
        //log connections
        console.log(`Client: Connected to server on port ${PORT}`);

        //try to send data
        console.log(`Client: Sent message: \"${msg}\" to server on port ${PORT}`);
        client.write(msg);
    });

    //Handle confirm
    client.on('data', function(data){
        console.log(`Client received from server: ${data}`);
    });

    // Handle connection close 
    client.on('close',function(){
        console.log('Cleint 1 :Connection Closed');
    });
    
    //Handle error
    client.on('error',function(error){
        console.error(`Connection Error ${error}`); 
    });

    return data;
}

export function messageServer();

 