/**
 * Created by wgw on 2016/2/28.
 */


var CMT = require('./socket_msgDefine').CLIENT_MSG_TYPE;
var SMT = require('./socket_msgDefine').SERVER_MSG_TYPE;
var SSIT = require('./socket_msgDefine').SSIT;
var GManager = require('../GameManager');
var GM = GManager.getInstance();
var Client = require('./Client');
var CM = require('../controller/ClientManager').getInstance();

exports.clientHandle = function(){
    return [
        //断开连接
        {msgName:CMT.DISCONNECT,msgFunc:function(){
            console.log(this.id + ":disconnected");
            _disconnect(this);
            function _disconnect(_socket){
            };
        }},
        //请求连接服务器
        {msgName:CMT.BASIC_CONNECT,msgFunc:function(cd){
            var id = cd.userName;
            var client = new Client(id,this);
            CM.addClient(client);
            _basicConnect(this);
            console.log(cd.userName + " get In");
            function _basicConnect(_socket){
                var serverInfo = GM.getServerInfo();
                _socket.emit('basicConnectReturn',serverInfo);
            }
        }},
        //开始游戏
        {msgName:CMT.START_GAME,msgFunc:function(map){
            var client = CM.getClientBySocketId(this.id);
            if(client){
                GM.startOneGame(client,null,"manager");
            }
        }},
        //加入游戏
        {msgName:CMT.JOIN_GAME,msgFunc:function(gameInfo){
            console.log("joinGame");
            var client = CM.getClientBySocketId(this.id);
            if(!client)return;
            if(client.game){
                console.log("!!!!!!!!!!....this gamer is already in!!!!!!!!!");
                this.emit(SMT.SYSTEM_INFORM,{type:SSIT.INFORM,detail:"you are already in!"});
                return;
            }
            var gameID = null;
            if(!gameInfo){
                gameID = GM.getDefaultGameID();
                if(!gameID){
                    this.emit(SMT.SYSTEM_INFORM,{type:SSIT.JOIN_GAME_FAIL,detail:"~"});
                    return false;
                }
            }
            else{
                gameID = gameInfo.gameID;
            }
            var game = GM.getGameByID(gameID);
            var chara = gameInfo.charaType;
            game.addPlayer(client,chara);
        }},
        //结束游戏
        {msgName:CMT.CLOSE_GAME,msgFunc:function(gameInfo){
            console.log("closeGame");
            var client = CM.getClientBySocketId(this.id);
            if(!client)return;
            var game = client.game;
            if(!game){
                this.emit(SMT.SYSTEM_INFORM,{type:SSIT.JOIN_GAME_FAIL,detail:"fucker!"});
                return 0;
            }
            if(game.builderId == client.id){
                GM.closeOneGame(game.id);
            }
            else{
                this.emit(SMT.SYSTEM_INFORM,"接口已经超时了大兄弟！");
            }
        }},
        //游戏输入
        {msgName:CMT.GAME_INPUT,msgFunc:function(input){
            var client = CM.getClientBySocketId(this.id);
            if(!client)return;
            var game = client.game;
            if(game){
                game.playerInput(input,client);
            }
        }},
        //测试数据
        {msgName:'test',msgFunc:function(info){
            var client = CM.getClientBySocketId(this.id);
            if(!client._test_count){
                client._test_count = 0;
            }
            client._test_count ++;
            this.emit('testReturn',client._test_count);
        }},
        //调试
        {msgName:CMT.DEBUG,msgFunc:function(info) {
            var game = GM.getGameByPlayer(this);
            game.clientDebug(info);
        }}
    ];
}

