var https = require("https");

module.exports = {
    GetCurrentForecast: function(location, callback) {
        var options = {
            host: 'api.darksky.net',
            path: '/forecast/975a34f73712b59fd273fc75f4232002/' + location.Lat.toString() + ',' + location.Lng.toString() + '?exclude=[minutely,hourly,flags]'
        };

        var req = https.get(options, function(res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));

            // Buffer the body entirely for processing as a whole.
            var weatherChunks = [];
            res.on('data', function(chunk) {
                weatherChunks.push(chunk);
            }).on('end', function() {
                var weather = Buffer.concat(weatherChunks);
                callback(JSON.parse(weather.toString()));
            })
        });
    }
};