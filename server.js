var express = require('express'), 
    sio = require('socket.io'),
    eventProcessor = require('./event-processor.js'),
    phoneStatus = require('./phone-utils.js');


var app = express.createServer();
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

var io = sio.listen(app);

io.on('connection', function(socket) {
    io.emit('phone-status', { 'phone-status': phoneStatus });
});

app.post('/', function (req, res) {
    var event = req.body;

    eventProcessor.ProcessEvent(event, io);

    res.send('{"Result": "successful"}');
});

app.post('/sensor-data', function (req, res) {
    var request = req.body;

    var temperatureMessage = 'The current temperature in the basement is ' + 70 + ' degrees.'

    var response = {
        "version": "1.0",
        "sessionAttributes": {
            "supportedSensorTypes": {
                "temperature": true,
                "humidity": true
            }
        },
        "response": {
            "outputSpeech": {
                "type": "PlainText",
                "text": temperatureMessage
            },
            "shouldEndSession": true
        }
    };

    res.json(response);
})

app.listen(process.env.PORT || 3000, function () {
    var addr = app.address();
    console.log('   app listening on http://' + addr.address + ':' + addr.port);
});