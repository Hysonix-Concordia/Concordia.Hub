var googleAuth = require('../custom_modules/google-auth.js'),
    concordiaData = require('../custom_modules/concordia-data.js');

module.exports = {
    Start: function(app) {
        app.post('/dashboard', function (req, res) {
            var id_token = req.body["id-token"];
            var alexa_state = req.body["alexa-state"];
            var alexa_redirecturl = req.body["alexa-redirecturl"];
            googleAuth.Authenticate(id_token, function(err, login){
                if (err) {
                    res.sendfile('login.html', {root: './public'});
                    return;
                }

                var payload = login.getPayload();

                concordiaData.GetSubscription(payload.email, function(subscription) {
                    if(alexa_state && alexa_state != '') {
                        var url = decodeURIComponent(alexa_redirecturl + '#state=' + alexa_state + '&access_token=' + subscription.Item.Id.S + '&token_type=Bearer');
                        res.redirect(url);
                    }
                    else {
                        res.sendfile('dashboard.html', {root: './views'});
                    }
                });
            });
        });
    }
};