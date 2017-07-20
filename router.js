var sio = require('socket.io'),
    logincontroller = require("./controllers/logincontroller.js"),
    eventcontroller = require("./controllers/eventcontroller.js"),
    dashboardcontroller = require("./controllers/dashboardcontroller.js"),
    devicecontroller = require("./controllers/devicecontroller.js");

module.exports = {
    Start: function(app) {
        var io = sio.listen(app);

        logincontroller.Start(app);
        
        eventcontroller.Start(app, io);

        dashboardcontroller.Start(app);

        devicecontroller.Start(app);
    }
};