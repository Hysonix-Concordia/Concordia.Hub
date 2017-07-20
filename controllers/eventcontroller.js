var eventProcessor = require('../custom_modules/event-processor.js'),
    phoneStatus = require('../custom_modules/phone-utils.js');

module.exports = {
    Start: function(app, io) {
        app.post('/', function (req, res) {
            var event = req.body;

            eventProcessor.ProcessEvent(event, io);

            res.json({"Result": "successful"});
        });

        io.on('connection', function(socket) {
            io.emit('phone-status', { 'phone-status': phoneStatus });
        });
    }
};