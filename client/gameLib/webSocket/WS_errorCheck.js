/**
 * Created by wgw on 2016/6/5.
 */
/**
 * 服务器端通信debug检查
 */
define(function(require){
    //客户端消息类型
    var CMT = require("./WS_msgDefine").CMT;

    /**
     * 请求检查并展示指定的数据包数据
     * @param packName
     */
    function checkPack(packNum){
        WSM.sendMsg(CMT.DEBUG,{type:"checkPack",packNum:packNum});
    }
    return {
        checkPack: checkPack
    };
});