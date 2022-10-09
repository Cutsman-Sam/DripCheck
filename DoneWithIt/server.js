//server global variables
const { appendFile } = require('fs');
const http = require('http');
const hostname = '127.0.0.1'; //default localhost
const PORT = 3000;
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

//connect to DB
connectDB();


const server = http.createServer((req, res) => {
    console.log('request made.');
    res.statusCode = 200; //successful response code

    //set header content type
    res.setHeader('Content-Type', 'text/plain');
    res.write('Yo');
    res.end('Hello World'); //    
});

server.listen(port,hostname,() => {
    console.log('Server running at http://${hostname}:${PORT}/');
});



//check that mongo connected before listen
mongoose.connection.once('open', () => {
    console.log('Connected to MongoBongo Batadase');
    app.listen(PORT, () => console.log('Server running on port ${PORT}'))
});
