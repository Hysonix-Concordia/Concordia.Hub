var concordiaData = require('../custom_modules/concordia-data.js');

module.exports = {
    Start: function(app) {
        app.post('/avr/alexa', function (req, res) {
            var request = req.body.request,
                session = req.body.session;

            var subscriptionId = session.user.accessToken;

            switch (request.intent.name) {
                case "GetSensorData":
                    var sensorType = request.intent.slots.Type.value;
                    var zone = request.intent.slots.Zone.value;
                    
                    concordiaData.GetDevices(subscriptionId, zone, function(data, err){
                        var zoneDevices = data.filter(function(device){
                            return device.Zone.toLowerCase() == zone;
                        });

                        zoneDevices.forEach(function(device) {
                            concordiaData.GetDeviceData(device.Id, sensorType, 1, function(data, err){
                                console.log(data[0].Data);  
                                
                                var temperatureMessage = 'The current temperature in the basement is ' + data[0].Data.Value + ' degrees.'

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
                        });
                    });
                    break;
            
                default:
                    break;
            }


            
        });
    }
};