/**
 * Created by wgw on 2016/2/23.
 */
define(function(require){
    'use strict';
    var SMT = require('gameLib/webSocket/WS_msgDefine').SMT;
    var SSIT = require('gameLib/webSocket/WS_msgDefine').SSIT;

    return {
        WS_URL:'http://badventure.duapp.com:80',
        //WS_URL:'localhost:18080',
        msgHandleList:[
            {msgName:SMT.SYSTEM_INFORM,msgFunc:function(msgInfo){
                /**msgInfo的标准格式如下：
                 * {type:"",detail:{obj}}
                 */
                if(!msgInfo.type){
                    console.log(msgInfo);
                    return;
                }

                switch (msgInfo.type){
                    case SSIT.INFORM:
                        _inform(msgInfo.detail);
                        break;
                    case SSIT.JOIN_GAME_SUC:
                        _joinGameSuc(msgInfo.detail);
                        break;
                    case SSIT.JOIN_GAME_FAIL:
                        _joinGameFail(msgInfo.detail);
                        break;
                    case SSIT.PLAYER_INPUT_SUC:
                        _playerInputSuc();
                        break;
                    case SSIT.PLAYER_INPUT_FAIL:
                        _playerInputFail();
                        break;
                }

                function _inform(msg){
                    alert(msg);
                }

                function _joinGameSuc(spriteInfo){
                    var id = spriteInfo.id;
                    var sprite = gm.spriteList[id];
                    if(!sprite){
                        alert("出了一点问题，你选的角色貌似不存在");
                    }else{
                        sprite.testSignal.watch = true;
                        gm.controlObj = sprite;
                    }
                }

                function _joinGameFail(detail){
                    alert("进入游戏失败，原因如下：\n" + detail);
                }

                function _playerInputSuc(){
                }

                function _playerInputFail(){

                }

            }},
            {msgName:SMT.BASIC_CONNECT_RETURN,msgFunc:function(msg){
                connectServer_suc(msg);
            }},
            {msgName:"event_msg",msgFunc:function(msg){
                gm.input(msg[0],msg[1],msg["packNum"]);
            }},
            {msgName:SMT.GAME_SYN,msgFunc:function(msg){
                console.log("receiveSyn");
                gm.getSyn(msg);
            }},
            {msgName:SMT.GAME_FINISH,msgFunc:function(msg){
                alert("游戏结束了亲");
            }},
            {msgName:SMT.TEST,msgFunc:function(msg){
                switch (msg.type){
                    case "testCampInit":
                        var info = msg.detail;
                        gm.testCampInput("serverCampInit",info);
                        break;
                    case "testCampRefresh":
                        var info = msg.detail;
                        gm.testCampInput("serverCampRefresh",info);
                        break;
                    case "time":
                        gm.testClockInput(msg.detail);
                        break;
                }
            }}
        ]
    }
})