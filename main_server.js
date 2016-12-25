/**
 * Created by wangguowei on 2001/1/11.
 */

var io = require('socket.io')();

var xssEscape = require('xss-escape');
var clientHandle = require('./private/socket/socket_msgHandle').clientHandle();

io.on('connection',function(_socket){
    console.log(_socket.id + ":connected");

    //加载处理函数
    for(var i = 0 ; i<clientHandle.length ; i++){
        _socket.on(clientHandle[i].msgName,clientHandle[i].msgFunc);
    }
    _socket.emit('server_message','connect success');
});

exports.listen = function(_server){
    return io.listen(_server);
}