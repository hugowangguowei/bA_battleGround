/**
 * 组（阵营下面的子组织单位）
 * Created by wgw on 2016/12/27.
 */

module.exports = Group;
var GUID = require("../../dep/baBasicLib/util/GUID");

function Group(camp){
    this.id = GUID.getGUID();
    this.name = null;
    this.camp = camp;
    this.type = null;
    this.sightList = null;
    this._isSightInit = false;
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
        if(!this._isSightInit){
            this.initSight(soldier);
        }
        this.soldierList.push(soldier);
        soldier.setGroup(this);
    },
    initSight:function(soldier){
        this._isSightInit = true;

        switch (soldier.type){
            case "knight":
                this.sightList = [{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:0,y:-1},{x:-1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:-1}];
                break;
            case "footMan":
                this.sightList = [{x:0,y:0},{x:0,y:1},{x:0,y:-1}];
                break;
            case "archer":
                this.sightList = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
                break;
        }
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
    },
    getOutPut:function(){
        var id =  this.id;
        var campId = this.camp.id;
        var type = this.type;
        var soldierNum = this.soldierList.length;
        return {
            id:id,
            campId:campId,
            type:type,
            soldierNum:soldierNum
        }
    }
}