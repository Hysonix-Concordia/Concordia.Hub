var http = require('http');

var express = require('express'), 
    sio = require('socket.io')
    phoneStatus = require('./phone-utils.js');


var app = express.createServer();
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

var io = sio.listen(app);

io.on('connection', function(socket) {
    io.emit('phone-status', { 'phone-status': phoneStatus });
    console.log('client connected');
});

app.post('/', function (req, res) {
  messages = req.param('messages', { 'Messages': [] });
  
  phoneStatus.Messages = messages;
  
  io.emit('phone-status', { 'phone-status': phoneStatus });
  
  res.send('{Result: "successful"');
});


app.listen(process.env.PORT, function () {
  var addr = app.address();
  console.log('   app listening on http://' + addr.address + ':' + addr.port);
});