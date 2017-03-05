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
p.getGroupBySoldierType = function(type){
    var group_i;
    for(var i = 0;i< this.groupList.length;i++){
        group_i = this.groupList[i];
        if(group_i.type == type)return group_i;
    }
    return null;
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