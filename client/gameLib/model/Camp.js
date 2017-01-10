/**
 * Created by wgw on 2016/4/30.
 */


define(function (require) {

    function Camp(model,id){
        this.id = id||0;
        this.model = model||0;
        this.groupList = [];
        if(!this.model){
            throw new Error("camp's model not defined");
        }
    }

    Camp.prototype = {
        addGroup:function(group){
            this.groupList.push(group);
            return true;
        },
        getGroupList:function(){
            return this.groupList;
        },
        getGroupByNum:function(num){
            if(this.groupList[num])return this.groupList[num];
        },
        getCampInfo:function(){
            var sL = this.groupList;
            var campInfo = [];
            var s_i = null;
            var s_iInfo = null;
            for(var i = 0;i<sL.length;i++){
                s_i = sL[i];
                s_iInfo = s_i.getGroupInfo();
                campInfo.push(s_iInfo);
            }
            return campInfo;
        }
    }

    return Camp;
})