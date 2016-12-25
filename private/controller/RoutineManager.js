/**
 * Created by wgw on 2016/11/10.
 * 流程管理器
 * 负责载入流程，管理流程，为上层提供流程操作接口
 */
var instance = null;
var Routine = require("../model/Routine");
exports.getInstance = function(){
    if(!instance){
        instance = new RoutineManager();
    }
    return instance;
}

function RoutineManager(){
    this.routineList = {};
    this.routineNum = 0;
    this.curRoutine = null;
};
p = RoutineManager.prototype;
/**
 * 根据脚本生成Routine
 * @param script
 */
p.generateRoutineByScript = function(script){
    var script_i,routine;
    for(var i = 0;i< script.length;i++){
        script_i = script[i];
        routine = new Routine(script_i);
        if(routine){
            this.routineList[routine.id] = routine;
            this.routineNum ++;
            if( i == 0){
                this.curRoutine = routine;
            }
        }
    }
    console.log("流程数量为：" + this.routineNum);
};
p.startRoutine = function(){
    this.curRoutine.start();
};
p.pauseRoutine = function(){
    this.curRoutine.pause();
};
p.terminateRoutine = function(){
    this.curRoutine.terminate();
};
p.changeRoutine = function(name){
    this.curRoutine.terminate();
    var r = this.routineList[name];
    if(r){
        this.curRoutine = r;
        this.curRoutine.start();
        return true;
    }
    return false;
}
