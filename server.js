var express = require('express'),
    path = require('path'),
    router = require('./router.js');


var app = express.createServer();
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

router.Start(app);

app.listen(process.env.PORT || 3000, function () {
    var addr = app.address();
    console.log('   app listening on http://' + addr.address + ':' + addr.port);
});