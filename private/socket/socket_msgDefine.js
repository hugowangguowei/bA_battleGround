/**
 * Created by wgw on 2016/3/1.
 */

/**
 * 客户端发送信息名称
 * @constructor
 */
var CMT = {
    DISCONNECT:'disconnect',
    BASIC_CONNECT:'basicConnect',
    START_GAME:'startGame',
    JOIN_GAME:'joinGame',
    CLOSE_GAME:'closeGame',
    GAME_INPUT:'gameInput',
    DEBUG:'debug'
}
exports.CLIENT_MSG_TYPE = CMT;

/**
 * 服务端发送消息名称
 * @constructor
 */
var SMT = {
    //系统通知
    SYSTEM_INFORM : "system_inform",
    //基本连接返回值
    BASIC_CONNECT_RETURN : "basicConnectReturn",
    //游戏消息
    GAME_INFO:'gameInfo',
    //游戏同步
    GAME_SYN:'gameSyn',
    //游戏结束
    GAME_FINISH:'gameFinish',
    //测试
    TEST:'test'
}
exports.SERVER_MSG_TYPE = SMT;

/**
 * 服务器端系统通知类型
 * 发送系统通知的基本格式如下：
 * （SMT.SYSTEM_INFORM,{type:SSIT.XXX,detail:"msgLaLaLa"}）;
 * @type {{}}
 */
var SSIT ={
    //通知
    INFORM:"inform",
    //加入游戏成功
    JOIN_GAME_FAIL:"joinFail",
    //加入游戏失败
    JOIN_GAME_SUC:"joinSuc",
    //用户输入成功
    PLAYER_INPUT_FAIL:"playerInputFail",
    //用户输入失败
    PLAYER_INPUT_SUC:"playerInputSuc"
}
exports.SSIT = SSIT;