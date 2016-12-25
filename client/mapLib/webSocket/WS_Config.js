/**
 * Created by wgw on 2016/2/23.
 */
define(function(require){
    'use strict';

    var SMT = require('privateLib/webSocket/WS_msgDefine').SMT;
    var listenerType = require('privateLib/view/ViewConfig').listenerType;
    var ID_manager = require('privateLib/config/ID_Manager').getInstance();
    var RoomIntroTag = require('privateLib/model/RoomIntroTag');
    var MemIntroTag = require('privateLib/model/MemIntroTag');

    return {
        WS_URL:'http://localHost:3001',
        msgHandleList:[
            {msgName:SMT.SYSTEM_INFORM,msgFunc:function(msgInfo){
                console.log(msgInfo);
            }},
            {msgName:SMT.BASIC_CONNECT_RETURN,msgFunc:function(msg){
                if(msg == "ok"){
                    console.log("connected!");
                }
            }},
            {msgName:"test",msgFunc:function(msg){
                console.log(msg);
            }}
        ]
    }
})