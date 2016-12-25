/**
 * Created by wgw on 2016/4/27.
 * chapter1 猎熊者
 */

exports.event = [
    //function(){
    //    var sprite_i;
    //    for(var i in this.spriteList){
    //        sprite_i = this.spriteList[i];
    //        if(sprite_i.camp == "Orc"){
    //            return false;
    //        }
    //    };
    //    return function(){
    //        this.endGame(["Orc"],"洛汗骑兵赢得了战争~");
    //    };
    //},
    //function(){
    //    var sprite_i;
    //    for(var i in this.spriteList){
    //        sprite_i = this.spriteList[i];
    //        if(sprite_i.camp == "Rohan"){
    //            return false;
    //        }
    //    };
    //    return function(){
    //        this.endGame(["Orc"],"半兽人赢得了战争~");
    //    };
    //},
    //function(){
    //    if(this.gameLog.curTime - this.gameLog.startTime > 240000){
    //        return function(){
    //            this.endGame([],"时间流逝完了~正如游戏已经结束");
    //        };
    //    }
    //    return 0;
    //}
];

exports.routineList = [
    {
        id:"prepare",
        interval:200
    },
    {
        id:"playerOperate",
        interval:50
    },
    {
        id:"showResult",
        interval:20
    }
]

