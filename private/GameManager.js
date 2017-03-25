/**
 * Created by wgw on 2016/5/22.
 */

var instance = null;
var Game = require("./Game");
var chapter_1 = require('./script/battleGround/chapter_1');

exports.getInstance = function(){
    if(instance == null){
        instance = new GameManager();
    }
    return instance;
}

function GameManager(){
    this.gameList = [];
}

GameManager.prototype = {
    startOneGame:function(client){
        var game = new Game();
        game.loadChapter(chapter_1,null,true);
        game.builderId = client.id;
        game.GM = this;
        game.addPlayer(client);
        this.gameList.push(game);
    },
    closeOneGame:function(id){
        for(var i = 0,len = this.gameList.length;i<len;i++){
            var game_i = this.gameList[i];
            if(game_i.id == id){
                game_i.stopMachine();
                this.gameList.splice(i,1);
            }
        }
        console.log("当前还有：" + this.gameList.length);
    },
    getDefaultGameID:function(){
        var game = this.gameList[0];
        if(!game)return false;
        return game.id;
    },
    getGameByID:function(id){
        for(var i = 0,len = this.gameList.length;i<len;i++){
            var game_i = this.gameList[i];
            if(game_i.id == id)
                return game_i;
        }
        return null;
    },
    getGameByPlayer:function(user){
        for(var i = 0,len = this.gameList.length;i<len;i++){
            var game_i = this.gameList[i];
            for(var p = 0;p< game_i._eventList.length;p++){
                if(user == game_i._eventList[p])
                    return game_i;
            }
        }
        return null;
    },
    //获取当前服务器中所有的游戏信息
    getServerInfo:function(){
        var gameList = [];
        for(var i = 0;i<this.gameList.length;i++){
            var game_i = this.gameList[i];
            var gameInfo = game_i.getGameInfo();
            gameList.push(gameInfo);
        }
        return gameList;
    },
    getGameList:function(){
        var gameList = [];
        for(var i = 0;i<this.gameList.length;i++){
            var game_i = this.gameList[i];
            var gameInfo = game_i.getGameInfo();
            gameList.push(gameInfo);
        }
        return gameList;
    }
}