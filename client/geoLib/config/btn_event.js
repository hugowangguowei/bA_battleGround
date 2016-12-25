/**
 * Created by wangguowei on 2001/1/11.
 */
define(function (require) {
    var CMT = require('geoLib/webSocket/WS_msgDefine').CMT;
    var wsManager = require('baBasicLib/webSocket/WS_Manager');
    var wsConfig = require('geoLib/webSocket/WS_Config');
    var wsMsgDefine = require('geoLib/webSocket/WS_msgDefine');
    var WSM = null;

    /**
     * 连接服务器
     * @constructor
     */
    function BTN_E_connectToServer(){
        WSM = wsManager.getInstance(null,wsConfig,wsMsgDefine);
        WSM.connectToServer();
    }
    function BTN_E_uploadMap(mapInfo){
        var msgName = CMT.UPLOAD_MAP;
        var msgDetail = mapInfo;
        _submitMsg(msgName,msgDetail);
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
            WSM.getInstance(null,wsConfig,wsMsgDefine);
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
        BTN_E_uploadMap:BTN_E_uploadMap
    }
})



