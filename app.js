var express = require('express'), 
    sio = require('socket.io');

var app = express.createServer();
app.use(express.bodyParser());

var messages = [
  { 
    'DateTime':  '5/28/2017',
    'Sender':  '555-555-5555',
    'Text': 'blah blah blah'
  },
  { 
    'DateTime':  '5/28/2017',
    'Sender':  '555-555-5555',
    'Text': 'blah blah blah'
  },
  { 
    'DateTime':  '5/28/2017',
    'Sender':  '555-555-5555',
    'Text': 'blah blah blah'
  }
];

app.get('/', function (req, res) {
  res.send(JSON.stringify(messages));
});

app.post('/', function (req, res) {
  messages = req.param('messages', []);
  res.send('{Result: "successful"');
});

app.listen(3000, function () {
  var addr = app.address();
  console.log('   app listening on http://' + addr.address + ':' + addr.port);
});

var io = sio.listen(app);