var weather = require("./forecast-io.js");

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
        
            default:
                break;
        }
    }
};