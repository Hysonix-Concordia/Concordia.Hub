module.exports = {
    Start: function(app) {
        app.get('/', function (req, res) {
            res.sendfile('login.html', {root: './views'});
        });
    }
};