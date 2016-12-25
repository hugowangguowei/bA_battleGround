//var http = require('http');
//var port = 18080;
//http.createServer(function(req, res) {
//    res.writeHead(200, {'Content-Type': 'text/html'});
//    var body = ' \
//        <html> \
//            <head> \
//                <meta charset="utf-8"> \
//                <title>What the FUCK</title> \
//            </head> \
//            <body> \
//                <h4>Welcome to Baidu App Engine!</h4> \
//                <h2>what the fuck！</h2> \
//            </body> \
//        </html> \
//    ';
//    res.write(body);
//    res.end();
//}).listen(port);

var debug = require('debug')('qx-chat');
var app = require('./app');

app.set('port',18080);
var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});

require('./main_server').listen(server);