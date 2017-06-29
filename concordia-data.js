var MongoClient = require('mongodb').MongoClient;

module.exports = {
    GetSubscription: function(id) {
        // Connection URL
        var url = 'mongodb://concordia:HPvoSD0zxkNWHWbvUFrGxALH7Xs4kxd89WMgdWYWOW4vFzrHNuqAzksSZ8WrtsRKmbP2fWi0xyEUklVzK9lgyQ==@concordia.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';
        // Use connect method to connect to the Server

        MongoClient.connect(url, function(err, db) {
            console.log("Connected correctly to server");

            db.listCollections().toArray(function(err, collInfos) {
                console.log(JSON.stringify(collInfos));
            });

            db.collection('subscription').find().toArray(function(e, d) {
                console.log(d.length);
                db.close();
            });
        });
    }
};

