var concordiaData = require('../custom_modules/concordia-data.js');

module.exports = {
    Start: function(app) {
        app.post('/device/register', function (req, res) {
            var request = req.body;
            concordiaData.RegisterDevice(request.SubscriptionId, request.DeviceName, function(data, err) {
                if(err) {
                    res.send("ERROR:" + JSON.stringify(err));
                }
                res.send("SUCCESSFUL:" + data.DeviceId);
            });
        });

        app.post('/device/sensor-data', function (req, res) {
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
        });
    }
};