var AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

var connectToDatabase = function() {
    AWS.config.loadFromPath('./config.json');
    return new AWS.DynamoDB({apiVersion: '2012-10-08'});
},

createSubscription = function(email) {
    return {
        TableName: "Subscription",
        Item:{
            "Id": { S: uuidv4() },
            "Email": { S: email }
        }
    };
},

createDevice = function(subscriptionId, name) {
    return {
        TableName: "Device",
        Item:{
            "Id": { S: uuidv4() },
            "SubscriptionId": { S: subscriptionId },
            "Name": { S: name },
        }
    };
};

module.exports = {
    GetSubscription: function(email, callback) {
        var conn = connectToDatabase();

        var query = {
            TableName: 'Subscription',
            Key: { 'Email' : { S: email } },
            ProjectionExpression: 'Id'
        };

        conn.getItem(query, function(err, data) {
            if(data != null || Object.keys(data).length) {
                callback(data);
            }
            else {
                var subscription = createSubscription(email);
                conn.putItem(subscription, function(err, data) {
                    callback(data);
                });
            }
        });
    },

    RegisterDevice: function(subscriptionId, deviceName, callback) {
        var conn = connectToDatabase();

        var device = createDevice(subscriptionId, deviceName);

        conn.putItem(device, function(err, data) {
            if(err) {
                callback(err);
            }
            else {
                callback({ "DeviceId": device.Item.Id.S });
            }
        });
    }
};

