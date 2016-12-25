/**
 * Created by wgw on 2016/2/24.
 */

/**
 * 创建房间
 */
function createNewRoom(){
    require(['baBasicLib/webSocket/WS_Manager','privateLib/config/btn_event'],
        function(wsManager,btn_event){
            var roomName = document.getElementById('createRoomName').value;
            var roomMemberNum = document.getElementById("roomMemNum").value;
            var msg = {name:roomName,memNum:roomMemberNum};
            btn_event.BTN_E_createNewRoom(msg);
        });
}