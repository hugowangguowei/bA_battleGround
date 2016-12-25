/**
 * Created by wgw on 2016/2/27.
 */
define(function(require){

    /**
     * 客户端发送信息名称
     * @constructor
     */
    function CLIENT_MSG_TYPE(){
        this.DISCONNECT = 'disconnect',
        this.BASIC_CONNECT = 'basicConnect',
        this.DEBUG = 'debug',
        this.START_GAME = 'startGame',
        this.JOIN_GAME = 'joinGame',
        this.CLOSE_GAME = 'closeGame',
        this.GAME_INPUT = 'gameInput'
    }

    /**
     * 服务端接收消息名称
     * @constructor
     */
    function SERVER_MSG_TYPE(){
        this.SYSTEM_INFORM = "system_inform";
        this.BASIC_CONNECT_RETURN = "basicConnectReturn";
        this.GAME_INFO = 'gameInfo';
        this.GAME_SYN = 'gameSyn';
        this.GAME_FINISH = 'gameFinish';
        this.TEST = 'test';
    }

    function SERVER_SYS_INFORM_TYPE(){
        //通知（作展示用）
        this.INFORM = "inform",
        //加入游戏成功
        this.JOIN_GAME_FAIL = "joinFail",
        //加入游戏失败
        this.JOIN_GAME_SUC = "joinSuc",
        //用户输入成功
        this.PLAYER_INPUT_FAIL = "playerInputFail",
        //用户输入失败
        this.PLAYER_INPUT_SUC = "playerInputSuc"
    }
    return {
        CMT:new CLIENT_MSG_TYPE(),
        SMT:new SERVER_MSG_TYPE(),
        SSIT:new SERVER_SYS_INFORM_TYPE()
    }
});