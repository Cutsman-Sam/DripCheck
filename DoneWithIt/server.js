//imports
const os = require('os');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitted{};

//initialize objects
const myEmitter = new Emitter();

const hostname = '127.0.0.1'; //default localhost
const PORT = process.env.PORT || 3400;

const connectDB = require('./config/dbConn');

//connect to DB
connectDB();

//check connecting to proper OS
const server = http.createServer((request, response) => {
    console.log(req.url, req.method);
    res.statusCode = 200; //successful response code
    
    //set header content type
    res.setHeader('Content-Type', 'text/plain');
    res.write('Yo');
    res.end('Hello World'); //    
});

server.listen(PORT,() => console.log('Server running at http://${hostname}:${PORT}/'));



//check that mongo connected before listen
mongoose.connection.once('open', () => {
    console.log('Connected to MongoBongo Batadase');
    app.listen(PORT, () => console.log('Server running on port ${PORT}'))
});
