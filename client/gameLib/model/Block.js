/**
 * Created by wgw on 2017/1/14.
 */
define(function(require){
    var GroupManager = require("gameLib/controller/GroupManager").getInstance();

    function Block(){
        this.id =  0;
        this.loc = -1;
        this.visible = false;
        this.groupList = [];
    }
    Block.prototype = {
        init:function(){

        },
        setByServerInfo:function(blockInfo){
            var loc = blockInfo.loc;
            var groupInfoList = blockInfo.groupInfoList;
            var gI_i,group;
            for(var i = 0;i<groupInfoList.length;i++){
                gI_i = groupInfoList[i];
                group = GroupManager.generateGroupByType(gI_i.type,gI_i.campId,{"num":gI_i.soldierNum,"loc":loc});
                this.groupList.push(group);
            }
        }
    }

    return Block;
});