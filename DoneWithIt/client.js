//imports
const net = require('net'); 

//config
const PORT = 3400;

//create socket
const client = new net.Socket();

//connect to server on port
client.connect(PORT,function(){
    //log connections
    console.log(`Client 1: Connected to server on port ${PORT}`);

    //try to send data
    client.write(/*data*/);
});

//Handle incoming data
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
 