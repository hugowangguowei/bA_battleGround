/**
 * Created by wangguowei on 2001/1/11.
 */
define(function (require) {
    var CMT = require('geoLib/webSocket/WS_msgDefine').CMT;
    var wsManager = require('geoLib/webSocket/WS_Manager');
    var wsConfig = require('geoLib/webSocket/WS_Config');
    var wsMsgDefine = require('geoLib/webSocket/WS_msgDefine');
    var WSM = null;

    /**
     * 连接服务器
     * @constructor
     */
    function BTN_E_connectToServer(){
        WSM = wsManager.getInstance(global,wsConfig,wsMsgDefine);
        WSM.connectToServer();
    }

    /**
     * 请求创建房间
     * @param roomInfo{name:XXX,memNum:XXX}
     * @constructor
     */
    function BTN_E_createNewRoom(roomInfo){
        _submitMsg(CMT.CREAT_NEW_ROOM,roomInfo);
    }

    /**
     * 点选指定房间
     * @param roomIntroTag
     * @constructor
     */
    function BTN_E_clickARoom(roomIntroTag){
        console.log(roomIntroTag);
        var mainShowScene = global.getScene("mainShowScene");
        var rContainer = mainShowScene.getChildById("rContainer");
        var roomID = roomIntroTag._roomInfo.serverID;
        rContainer._picked_RIT_ID = roomID;
    }

    /**
     * 请求进入房间
     * @constructor
     */
    function BTN_E_getIntoARoom(){
        var roomID = _getChosenRoomID();
        _submitMsg(CMT.ASK_GET_INTO_ROOM,roomID);

        function _getChosenRoomID(){
            var mainShowScene = global.getScene("mainShowScene");
            var rContainer = mainShowScene.getChildById("rContainer");
            return rContainer._picked_RIT_ID;
        }
    }

    /**
     * 请求开始游戏
     * @constructor
     */
    function BTN_E_startGame(){
        _submitMsg(CMT.START_GAME);
    }

    /**
     * roll点
     * @constructor
     */
    function BTN_E_ROLL(){
        console.log("random Roll");
        _submitMsg(CMT.ROLL);
    }

    /**
     * 玩家输入信息提交
     * @constructor
     */
    function BTN_E_clientSubmit(value){
        _submitMsg(CMT.CLIENT_SUBMIT,value);
    }

    /**
     * 向服务器提交请求
     * @param msgName
     * @param msgDetail
     * @private
     */
    function _submitMsg(msgName,msgDetail){
        var msgName = msgName||"default";
        var msgDetail = msgDetail||"";

        if(!WSM){
            WSM.getInstance(global,wsConfig,wsMsgDefine);
        }
        var socket = WSM.webSocket;
        try{
            socket.emit(msgName,msgDetail);
        }catch(e){
            throw new Error(e.name);
        }

    }

    return{
        BTN_E_connectToServer:BTN_E_connectToServer,
        BTN_E_createNewRoom : BTN_E_createNewRoom,
        BTN_E_clickARoom : BTN_E_clickARoom,
        BTN_E_getIntoARoom : BTN_E_getIntoARoom,
        BTN_E_startGame : BTN_E_startGame,
        BTN_E_ROLL : BTN_E_ROLL,
        BTN_E_clientSubmit : BTN_E_clientSubmit
    }
})



