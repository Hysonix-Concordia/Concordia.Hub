var http = require('http');

var express = require('express'), 
    sio = require('socket.io')
    phoneStatus = require('./phone-utils.js');


var app = express.createServer();
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

http.createServer(function (req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello, world!');
    
}).listen(process.env.PORT || 8080);