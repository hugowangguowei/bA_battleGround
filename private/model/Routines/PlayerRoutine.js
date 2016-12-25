/**
 * Created by wgw on 2016/11/10.
 */
var Routine = require("../Routine");
module.exports = PlayerRoutine;

function PlayerRoutine(prop,game){
    Routine.call(this);
    this.id = prop.id||0;
    this.interval = prop.interval||10;
    this.timeStamp = 0;
    this.count = 0;
    this.outPut = -1;
    this.pauseStamp = -1;
    this.nextRoutineId = null;
}
PlayerRoutine.prototype = new Routine();
var p = PlayerRoutine.prototype;

p.start = function(){
    this.timeStamp = new Date().getTime();
    this.count = this.interval;
};

p.getOutPut = function(){
    var count = this.getCount();
    if(parseInt(count) !=  this.outPut){
        return count;
    }
    return null;
}
