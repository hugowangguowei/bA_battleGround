/**
 * 组（阵营下面的子组织单位）
 * Created by wgw on 2016/12/27.
 */

module.exports = Group;
var GUID = require("../../dep/baBasicLib/util/GUID");

function Group(camp){
    this.id = GUID.getGUID();
    this.name = null;
    this.camp = null;
    this.type = null;
    this.sightList = null;
    this.soldierList = [];
}
Group.prototype = {
    initialize:function(){
    },
    getCamp:function(){
        return this.camp;
    },
    getSoldierList:function(){
        return this.soldierList;
    },
    addSoldier:function(soldier){
        this.soldierList.push(soldier);
        soldier.setGroup(this);
    },
    battleStatistic:function(){
        var soldier;
        for(var i= 0 ; i<this.soldierList.length ;i++){
            soldier = this.soldierList[i];
            if(soldier._t_isDead){
                this.soldierList.splice(i,1);
                i--;
            }
        }
    }
}