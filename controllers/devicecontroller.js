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

        app.post('/device/data', function (req, res) {
            var request = req.body;
            concordiaData.SaveDeviceData(request.DeviceId, request.SensorType, request.Data, function(data, err){
                if(err) {
                    res.send("ERROR:" + JSON.stringify(err));
                }
                res.send("SUCCESSFUL");
            });
        });
    }
};