/**
 * 阵营
 * Created by wgw on 2016/4/18.
 */

module.exports = Camp;
var GUID = require("../../dep/baBasicLib/util/GUID");
var GroupManager = require("./controller/GroupManager");

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
        var group_i,soldier_i;
        for(var i in this.groupList){
            var num = this.groupList[i].length;
            var loc = -1;
            if(num){
                soldier_i = this.groupList[i][0];
                loc = soldier_i._t_loc;
            }
            soldierDetail[i] = {num:num,loc:loc};
        }
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
            group_i = this.groupList[soldierInfo_i.type];


            if(group_i){
                for(var p = 0;p<group_i.length;p++){
                    soldier_p = group_i[p];
                    this._generateSoldierOrder(soldier_p,soldierInfo_i);
                }
            }
        }
    },
    _generateSoldierOrder:function(soldier,info){
        var loc,order,antiOrder,obey,brave,aimLoc,attLoc;
        loc = info.loc;
        order = info.order;
        aimLoc = info.aimLoc;
        attLoc = info.attLoc;

        brave = info.brave;
        obey = info.obey;

        soldier._t_loc = loc;
        soldier._t_aimLoc = aimLoc;
        soldier._t_attLoc = attLoc;
        soldier._t_order = order;
    },
    refreshBlockInfo:function(blockInfo){

    },
    /**
     * 战后清理（主要是把死人清理出战场）
     */
    battleStatistic:function(){
        var group,soldier;
        for(var i in this.groupList){
            group = this.groupList[i];
            for(var p = 0;p<group.length;p++){
                soldier = group[p];
                if(soldier._t_isDead){
                    group.splice(p,1);
                    p--;
                }
            }
        }
    }
}