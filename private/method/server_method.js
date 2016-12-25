/**
 * Created by wangguowei on 2001/1/11.
 */

exports.broadcastToList = function (list,type,info) {
    var chara_i,socket_i;
    for(var i = 0;i<list.length;i++){
        chara_i = list[i];
        chara_i.sendInfo(type,info);
    }
}