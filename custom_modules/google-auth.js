var GoogleAuth = require('google-auth-library');

var auth = new GoogleAuth;
var client = new auth.OAuth2('44733995665-8fjtad14qf3tkvujk4dplsu2s3t8kkii.apps.googleusercontent.com', '', '');

module.exports = {
    Authenticate: function(id_token, callback) {
        client.verifyIdToken(id_token, '44733995665-8fjtad14qf3tkvujk4dplsu2s3t8kkii.apps.googleusercontent.com', callback);
    }
};

