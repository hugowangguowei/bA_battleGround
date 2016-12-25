/**
 * Created by wgw on 2016/11/10.
 */
module.exports = Routine;

function Routine(prop,game){
    this.id = prop.id||0;
    this.interval = prop.interval||10;
    this.timeStamp = 0;
    this.count = 0;

    this.pauseStamp = -1;
    this.nextRoutineId = null;
    this.outPut = null;
    this._isStarted = false;
    this._isPaused = false;
}
Routine.prototype = {
    start:function(){
        this.timeStamp = new Date().getTime();
    },
    getCount:function(){
        var t = new Date().getTime();
        var _t = t - this.timeStamp;
        this.count = this.interval - _t/1000;
        if(this.count <= 0)this.count = 0;
        return this.count;
    },
    pause:function(){
        this._isPaused = true;
    },
    terminate:function(){

    },
    getOutPut:function(){
        if(this._isPaused)return null;

        var count = parseInt(this.getCount());
        if(count !=  this.outPut){
            this.outPut = count;
            return count;
        }
        return null;
    }
}