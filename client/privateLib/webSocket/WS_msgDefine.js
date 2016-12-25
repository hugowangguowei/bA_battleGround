/**
 * Created by wgw on 2016/2/27.
 */
define(function(require){

    /**
     * 客户端发送信息名称
     * @constructor
     */
    function CLIENT_MSG_TYPE(){
        this.CREAT_NEW_ROOM = 'createNewRoom';
        this.ASK_GET_INTO_ROOM = 'askGetIntoRoom';
        this.START_GAME = 'startGame';
        this.CLIENT_SUBMIT = 'clientSubmit';
        this.ROLL = 'roll';
    }

    /**
     * 服务端接收消息名称
     * @constructor
     */
    function SERVER_MSG_TYPE(){
        this.SYSTEM_INFORM = "system_inform";
        this.BASIC_CONNECT_RETURN = "basicConnectReturn";
        this.ROOM_LIST_REFRESH = 'roomListRefresh';
        this.WAITING_QUEUE_REFRESH = 'waitingQueueRefresh';
        this.INTO_A_ROOM = 'intoARoom';
        this.CLIENT_ROOM_INFO_INITIALIZE = 'clientRoomInfoInitialize';
        this.GET_OUT_THE_QUEUE = 'getOutTheQueue',
        this.GET_OUT_THE_GAME = 'getOutTheGame',
        this.START_GAME = 'startGame';
        this.CLIENT_MSG_DISTRIBUTE = 'clientMsgDistribute';
        this.ROOM_DELETE = 'roomDelete';
    }

    return {
        CMT:new CLIENT_MSG_TYPE(),
        SMT:new SERVER_MSG_TYPE()
    }
});