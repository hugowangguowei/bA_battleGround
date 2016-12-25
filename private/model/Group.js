/**
 * 组（阵营下面的子组织单位）
 * Created by wgw on 2016/12/27.
 */

module.exports = Group;
var GUID = require("../../dep/baBasicLib/util/GUID");

function Group(camp){
    this.id = id||GUID.getGUID();
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
    },
}