var weather = require("./forecast-io.js"),
    AWS = require('aws-sdk');

module.exports = {
    ProcessEvent: function(event, io) {
        switch (event.Type) {
            case 'SYNC':
                weather.GetCurrentForecast(event.Data.Location, function(data){
                    event.Data.Weather = data;
                    io.emit('event', { "event": event });  
                });                       
                break;
            case 'INCOMING':
                io.emit('event', { "event": event });                
                break;
            case 'MOTIONDETECT':       
                var config = AWS.config.loadFromPath('./awsconfig.json');   
                var rekognition = new AWS.Rekognition({region: config.region});
                var request =  {
                "Image": { 
                    "Bytes": new Buffer(event.Data.Image, 'base64'),
                },
                "MaxLabels": 100,
                "MinConfidence": 10
                }
                rekognition.detectLabels(request, function(err, data){
                    console.log(err);
                    console.log(data);
                });
                break;
        
            default:
                break;
        }
    }
};