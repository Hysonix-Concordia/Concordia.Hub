var concordiaData = require('../custom_modules/concordia-data.js');

module.exports = {
    Start: function(app) {
        app.post('/register', function (req, res) {
            var request = req.body;

            res.json({});
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
        });
    }
};