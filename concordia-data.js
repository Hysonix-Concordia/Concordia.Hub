var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://concordia:HPvoSD0zxkNWHWbvUFrGxALH7Xs4kxd89WMgdWYWOW4vFzrHNuqAzksSZ8WrtsRKmbP2fWi0xyEUklVzK9lgyQ==@concordia.documents.azure.com:10255/?ssl=true',
    databaseName = 'concordia';

var connectToDatabase = function(callback) {
     MongoClient.connect(url, function(err, client) {

        var db = client.db(databaseName);

        callback(db);
    });
};

module.exports = {
    GetSubscription: function(id, callback) {
        connectToDatabase(function(db){
            db.collection("subscription").findOne({"id": id.toString()}, function(err, result) {
                db.close();
                callback(result);
            });
        });
    }
};

