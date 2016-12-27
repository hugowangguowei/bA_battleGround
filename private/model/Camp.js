/**
 * 阵营
 * Created by wgw on 2016/4/18.
 */

module.exports = Camp;
var GUID = require("../../dep/baBasicLib/util/GUID");
var GroupManager = require("../controller/GroupManager");

function Group(){
    this.soldierList = [];
}

function Camp(id){
    this.id = id||GUID.getGUID();
    this.commander = null;
    this.groupManager = new GroupManager(this);
    this.battleGround = null;
    this._t_num = 0;
}
Camp.prototype = {
    initialize:function(){
    },
    getCampId:function(){
        return this.id;
    },
    getCampInfo: function () {
        var campInfo = {
            id:this.id,
        };

        var soldierDetail = {};
        var group_i,soldierList,soldier_i;
        var groupList = this.groupManager.getGroupList();
        for(var i = 0;i<groupList.length;i++){
            group_i = groupList[i];
            soldierList = group_i.getSoldierList();
            var len = soldierList.length;
            if(len) {
                var type = group_i.type;
                var soldier_i = soldierList[0];
                var loc = soldier_i._t_loc;
                soldierDetail[type] = {num:len,loc:loc};
            }
        }

        //for(var i in this.groupList){
        //    var num = this.groupList[i].length;
        //    var loc = -1;
        //    if(num){
        //        soldier_i = this.groupList[i][0];
        //        loc = soldier_i._t_loc;
        //    }
        //    soldierDetail[i] = {num:num,loc:loc};
        //}
        campInfo.solderDetail = soldierDetail;
        return campInfo;
    },
    addSoldier:function(soldier){
        var group = this.groupManager.getGroupBySoldierType(soldier.type);
        if(!group) {
            group = this.groupManager.addGroupBySoldierType(soldier.type);
        };
        group.addSoldier(soldier);
    },
    setCampByClientSubmit:function(campInfo){
        var soldierInfo_i,group_i,soldier_p;

        for(var i = 0;i<campInfo.length;i++){
            soldierInfo_i = campInfo[i];
            group_i = this.groupManager.getGroupBySoldierType(soldierInfo_i.type);
            if(!group_i)continue;
            var soldierList = group_i.getSoldierList();
            for(var p = 0;p<soldierList.length;p++){
                soldier_p = soldierList[p];
                soldier_p.updatePropByOrder(soldierInfo_i);
            }
        }
    },
    refreshBlockInfo:function(blockInfo){

    },
    /**
     * 战后清理（主要是把死人清理出战场）
     */
    battleStatistic:function(){
        var group,soldier;
        var groupList = this.groupManager.getGroupList();
        for(var i = 0;i<groupList.length;i++){
            group = groupList[i];
            group.battleStatistic();
        }
    }
}