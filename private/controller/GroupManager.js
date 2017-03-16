/**
 * Created by wgw on 2016/12/27.
 */

var Group = require("../model/Group");

module.exports = GroupManager;

function GroupManager(camp){
    this.camp = camp;
    this.groupList = [];
};
p = GroupManager.prototype;
p.getGroupList = function(){
    return this.groupList;
};
p.getGroupById = function(id){
    var group_i;
    for(var i = 0;i<this.groupList.length;i++){
        group_i = this.groupList[i];
        if(group_i.id == id){
            return group_i;
        }
    }
    return false;
};
p.getGroupBySoldierType = function(type){
    var group_i;
    for(var i = 0;i< this.groupList.length;i++){
        group_i = this.groupList[i];
        if(group_i.type == type)return group_i;
    }
    return null;
};
p.generateGroupByType = function(type){
    var group = new Group(this.camp);
    group.type = type;
    this.groupList.push(group);
    return group;
};

p.generateGroupBySubmit = function(args){
    var group = new Group(this.camp);
    var groupId = args[0];
    var groupLoc = args[1];
    var groupType = args[2];
    group.id = groupId;
    group.loc = groupLoc;
    group.type = groupType;
    var soldierList = this.camp.soldierPool.getReserveSoldierByGroupId(groupId);
    if(soldierList){
        for(var i = 0;i<soldierList.length;i++){
            group.addSoldier(soldierList[i]);
        }
    }
};
p.addGroupBySoldierType = function(type){
    var group = new Group(this.camp);
    group.type = type;
    this.groupList.push(group);
    return group;
};
p.groupVanished = function(group){
    for(var i = 0;i<this.groupList.length;i++){
        if(group == this.groupList[i]){
            this.groupList.splice(i,1);
            return true;
        }
    }
    return false;
};