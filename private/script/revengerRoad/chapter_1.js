/**
 * Created by wgw on 2016/4/27.
 * chapter1 猎熊者
 */


var mapManager = require('../../controller/MapManager').getInstance();
var obsGenerator = require('../../test/script/revengerRoad/chapter_1/obstacleData');

exports.Map = mapManager.getMap("RR_c1");
exports.Sprite = {
    "archer":{num:1},
    //"captain":{num:1},
    //"knight":{num:15},
    //"king":{num:1},
    //"chief":{num:2},
    //"barracks":{num:1},
    ////"darkTower":{num:1},
    //"bear":{num:15}
};
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
//exports.obstacle = obsGenerator.generateRandomObstacle(100);
exports.obstacle = [
    {type:"line",node:[385,92,577,92]},
    {type:"line",node:[351,126,351,245]},
    {type:"line",node:[610,126,610,245]},
    {type:"line",node:[385,279,461,279]},
    {type:"line",node:[495,279,579,279]},
    {type:"line",node:[385,125,462,125]},
    {type:"line",node:[497,125,572,125]},
    {type:"line",node:[385,125,385,242]},
    {type:"line",node:[572,125,572,242]},
    {type:"line",node:[385,242,572,242]},
    {type:"cycle",node:[351,92,32,Math.PI*0.5,Math.PI*2]},
    {type:"cycle",node:[610,92,32,Math.PI,Math.PI*0.5]},
    {type:"cycle",node:[351,276,32,0,Math.PI*1.5]},
    {type:"cycle",node:[610,276,32,Math.PI*-0.5,Math.PI]}
];
