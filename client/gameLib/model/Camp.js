/**
 * Created by wgw on 2016/4/30.
 */


define(function (require) {
    var baLib = require("baBasicLib/util/baLib");
    var GUID = require("baBasicLib/util/GUID");
    var GroupEdit = require("./GroupEdit");

    function Camp(model,id){
        this.id = id||0;
        this.model = model||0;
        this.groupList = [];
        this.soldierPool = [];
        if(!this.model){
            throw new Error("camp's model not defined");
        }
        this.operateList = [];
    }

    Camp.prototype = {
        getSoldierPool:function(){
            return this.soldierPool;
        },
        getGroupList:function(){
            return this.groupList;
        },
        getGroupByNum:function(num){
            if(this.groupList[num])return this.groupList[num];
        },
        getGroupInfoFromSoldierPool:function(num){
            if(this.soldierPool[num]){
                return this.soldierPool[num];
            }
            throw new Error("can't find the groupInfo with the num input");
            return null;
        },
        addGroup:function(group){
            this.groupList.push(group);
            this.model.battleGround.addGroup(group);
            var edit = new GroupEdit("groupAdd");
            edit.addArg(group.id);
            edit.addArg(group.loc);
            edit.addArg(group.type);
            return edit;
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
            var result = this.model.battleGround.deleteGroup(group);
            //如果成功删除了父group，则继续添加子group
            if(result){
                for(var i = 0;i<groupList.length;i++){
                    var result2 = this.model.battleGround.addGroup(groupList[i]);
                    if(!result2){
                        return false;
                    }
                }
                var edit = new GroupEdit("groupSep");
                edit.addArg(group.id);
                for(var i = 0;i<groupList.length;i++){
                    edit.addArg(groupList[i]);
                }
                return edit;
            }
            //如果删除父group失败，则直接返回false
            return false;
        },
        soldierRecruitment:function(num,info,groupId){
            var soldier = this.soldierPool[num];
            if(!soldier){return null;}
            soldier.num -= info.num;
            if(soldier.num <= 0) {
                this.soldierPool.splice(num, 1);
            }
            var edit = new GroupEdit("soldierRecruitment");
            edit.addArg(soldier.type);
            edit.addArg(info.num);
            edit.addArg(groupId);
            return edit;
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