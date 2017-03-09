/**
 *
 * Created by wgw on 2016/12/27.
 */

module.exports = Group;
var GUID = require("../../dep/baBasicLib/util/GUID");

function Group(camp){
    this.id = GUID.getGUID();
    this.name = null;
    this.camp = camp;
    this.type = null;
    //是否被击溃
    this.isDestroyed = false;
    this.sightList = null;
    this._isSightInit = false;
    this.loc = -1;
    this.aimLoc = -1;
    this.attLoc = -1;
    this.soldierList = [];
    this.order = "defend";

}
Group.prototype = {
    initialize:function(){
    },
    destroy:function(){
        this.soldierList = [];
    },
    getLoc:function(){
        return this.loc;
    },
    getCamp:function(){
        return this.camp;
    },
    getSoldierList:function(){
        return this.soldierList;
    },
    getSoldierNum:function(){
        return this.soldierList.length;
    },
    addSoldier:function(soldier){
        if(!this._isSightInit){
            this.initSight(soldier);
        }
        this.soldierList.push(soldier);
        soldier.setGroup(this);
    },
    soldierDied:function(soldier){
        for(var i = 0;i<this.soldierList.length;i++){
            if(soldier == this.soldierList[i]){
                this.soldierList.splice(i,1);
                break;
            }
        }
        var len = this.soldierList.length;
        if(!len){
            this.isDestroyed = true;
            this.camp.groupVanished(this);
        }
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
        var name = this.name;
        var campId = this.camp.id;
        var type = this.type;
        var soldierNum = this.soldierList.length;
        var loc = -1;
        var soldier_1 = this.soldierList[0];
        if(soldier_1){
            loc =  soldier_1._t_loc;
        }
        return {
            id:id,
            name:name,
            campId:campId,
            type:type,
            loc:loc,
            num:soldierNum
        }
    }
}