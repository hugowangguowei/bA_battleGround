/**
 * Created by wgw on 2016/4/30.
 */


define(function (require) {
    var baLib = require("baBasicLib/util/baLib");
    var GUID = require("baBasicLib/util/GUID");
    

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
        divideGroup:function(group,value){
            var value = 2;
            var groupList = [];
            var group_i,avNum;
            avNum = group.num/value;
            if(avNum <1){
                return false;
            }
            var _num = group.num - parseInt(avNum)*value;
            for(var i = 0;i<value;i++){
                group_i = baLib.cloneObject(group);
                group_i.id = GUID();
                if(i<_num){
                    group_i.num = parseInt(avNum) + 1;
                }else{
                    group_i.num = parseInt(avNum);
                }
                groupList.push(group_i);
            }
            for(var i = 0;i<this.groupList.length;i++){
                group_i = this.groupList[i];
                if(group_i == group){
                    this.groupList.splice(i,1);
                    for(var p = 0;p<groupList.length;p++){
                        this.groupList.splice(i+p,0,groupList[p]);
                    }
                }
            }
            this.model.battleGround.deleteGroup(group);
            for(var i = 0;i<groupList.length;i++){
                this.model.battleGround.addGroup(groupList[i]);
            }
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