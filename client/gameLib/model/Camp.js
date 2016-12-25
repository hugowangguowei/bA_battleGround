/**
 * Created by wgw on 2016/4/30.
 */


define(function (require) {

    function Camp(model){
        this.model = model||0;
        this.soldierList = [];
        if(!this.model){
            throw new Error("camp's model not defined");
        }
    }

    Camp.prototype = {
        addSolder:function(soldier){
            this.soldierList.push(soldier);
            return true;
        },
        getSoldierList:function(){
            return this.soldierList;
        },
        getSoldierByNum:function(num){
            if(this.soldierList[num])return this.soldierList[num];
        },
        getCampInfo:function(){
            var sL = this.soldierList;
            var campInfo = [];
            var s_i = null;
            var s_iInfo = null;
            for(var i = 0;i<sL.length;i++){
                s_i = sL[i];
                s_iInfo = s_i.getSoldierInfo();
                campInfo.push(s_iInfo);
            }
            return campInfo;
        }
    }

    return Camp;
})