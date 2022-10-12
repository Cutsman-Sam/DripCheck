//imports
const os = require('os');
const path = require('path');
const net = require('net');
const mongoose = require('mongoose');
const logEvents = require('./logEvents');

//global values
const PORT = 3400;

const connectDB = require('./config/dbConn');

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
    console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`);

    //Handle the client data.
    sock.on('data',/*insert data handling function here*/function(data){
        //Log data received from the client
        console.log(`>> data received : ${data} `);
		
		//prepare and send a response to the client 
		let serverResp = "Hello from the server"
        //setup response
		sock.write(serverResp);
		
		//close the connection 
		sock.end()    
    });    

    //Handle when client connection is closed
    sock.on('close',function(){
        console.log(`${sock.remoteAddress}:${sock.remotePort} Connection closed`);
    });
    
	//Handle Client connection error.
    sock.on('error',function(error){
        console.error(`${sock.remoteAddress}:${sock.remotePort} Connection Error ${error}`);
    });
	
};
