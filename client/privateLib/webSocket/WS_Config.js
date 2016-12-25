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

    function _createNewRoom(msg){
        var id = ID_manager.getNewIdForRoomIntro();
        var mainShowScene = global.getScene("mainShowScene");
        var rContainer = mainShowScene.getChildById("rContainer");
        var ri_new = new RoomIntroTag(id,rContainer,mainShowScene);
        ri_new._roomInfo = msg.roomInfo;
        ri_new._leaderIntro = msg.leaderIntro;
        ri_new._memberIntro = msg.memberIntro;
        global.fireEvent(listenerType.ADD_ROOM_INTRO_TAG,ri_new);
    }
    function _refreshRoom(room,msg){
        room._roomInfo = msg.roomInfo;
        room._leaderIntro = msg.leaderIntro;
        room._memberIntro = msg.memberIntro;
        global.fireEvent(listenerType.REFRESH_ROOM_INTRO_TAG,room);
    }

    return {
        WS_URL:'http://localHost:3000',
        msgHandleList:[
            {msgName:SMT.SYSTEM_INFORM,msgFunc:function(msgInfo){
                console.log(msgInfo);
            }},
            {msgName:SMT.BASIC_CONNECT_RETURN,msgFunc:function(msg){
                if(msg == "ok"){
                    global.GSM.switchToNext("mainShowBasicStruct");
                }
            }},
            {msgName:SMT.ROOM_LIST_REFRESH,msgFunc:function(msg){
                var mainShowScene = global.getScene("mainShowScene");
                var rContainer = mainShowScene.getChildById("rContainer");
                var ri = rContainer.getRoomIntroTagByServerID(msg.roomInfo.serverID);
                if(!ri){
                    _createNewRoom(msg);
                }
                else{
                    _refreshRoom(ri,msg);
                }
            }},
            {msgName:SMT.WAITING_QUEUE_REFRESH,msgFunc:function(queueInfo){
                /*queueInfo示例：
                var leaderInfo = {
                    userName:this.roomLeader.userName,
                    level:this.roomLeader.level,
                    serverID:this.roomLeader.userID
                }
                var memInfo = [
                    memInfo_i = {
                    userName:mem.userName,
                    level:mem.level,
                    serverID:mem.userID
                    }
                ];
                var yourInfo = {yourID:roomLeader.userID};
                var userType = "leader";
                */
                console.log("waitingQueueRefresh");
                global.fireEvent(listenerType.INTO_WAITING_QUEUE,queueInfo.userType);
                var mainShowScene = global.getScene("mainShowScene");
                var mContainer = mainShowScene.getChildById('mContainer');
                var memInfo = queueInfo.memInfo;
                for(var i = 0,len = memInfo.length;i<len;i++){
                    var id = ID_manager.getNewIdForMemIntro();
                    var mI = new MemIntroTag(id,mContainer,mainShowScene);
                    mI.memIntroInfo = memInfo[i];
                    global.fireEvent(listenerType.ADD_MEM_INTRO_TAG,mI);
                }
            }},
            {msgName:SMT.INTO_A_ROOM,msgFunc:function(msg){
            }},
            {msgName:SMT.CLIENT_ROOM_INFO_INITIALIZE,msgFunc:function(msg){
                for(var i = 0;i<msg.length;i++){
                    _createNewRoom(msg[i]);
                }
            }},
            {msgName:SMT.GET_OUT_THE_QUEUE,msgFunc:function(msg){
                var os2 = global.getSpriteById("outerS2");
                os2.removeAllNodes();
            }},
            {msgName:SMT.START_GAME,msgFunc:function(msg){
                global.GSM._startGameMsg = msg;
                global.GSM.switchToNext("gameStruct");
            }},
            {msgName:SMT.GET_OUT_THE_GAME,msgFunc:function(msg){
                //TODO
            }},
            {msgName:SMT.CLIENT_MSG_DISTRIBUTE,msgFunc:function(msg){
                global.fireEvent(listenerType.ADD_TEXT,msg);
            }},
            {msgName:SMT.ROOM_DELETE,msgFunc:function(msg){
            }},
            {msgName:"test",msgFunc:function(msg){
                console.log(msg);
            }}
        ]
    }
})