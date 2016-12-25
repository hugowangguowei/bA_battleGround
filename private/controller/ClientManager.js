/**
 * Created by wgw on 2016/6/17.
 */

var instance = null;

exports.getInstance = function(){
    if(!instance){
        instance = new ClientManager();
    }
    return instance;
}

function ClientManager(){
    this.clientList = {};
    this.socketList = {};
};
ClientManager.prototype.addClient = function(client){
    var c = this.clientList[client.UNI_id];
    if(c){
        var oldSocketId = c.socket.id;
        delete this.socketList[oldSocketId];
        this.socketList[client.socket.id];
        c.socket = client.socket;
        console.log("重连");
    }
    else{
        this.clientList[client.UNI_id] = client;
        this.socketList[client.socket.id] = client;
        console.log("新建");
    }
};
//获取clientList
ClientManager.prototype.getClientList = function(){
    return this.clientList;
}
//通过用户id来获取Client对象
ClientManager.prototype.getClientById = function(id){
    if(this.clientList[id])return this.clientList[id];
    return null;
};
//通过socketId来获取Client对象
ClientManager.prototype.getClientBySocketId = function(id){
    if(this.socketList[id])return this.socketList[id];
    return null;
};
