var debug = require('debug')('qx-chat');
var app = require('./app');

app.set('port',18080);
var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});

require('./main_server').listen(server);