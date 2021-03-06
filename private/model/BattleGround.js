/**
 * Created by wgw on 2016/11/29.
 */

module.exports = BattleGround;
var GUID = require("../../dep/baBasicLib/util/GUID");
var blockManager = require("../controller/BlockManager").getInstance();

function BattleGround(id){
    this.id = id||GUID.getGUID();
    this.width = 10;
    this.height = 10;
    this.blockList = [] ;
    this.speedList = {};
    this.initialize();
}
BattleGround.prototype = {
    /**
     * 初始化
     */
    initialize:function(){
        this.blockList = blockManager.generateBlockListByLineAndRow(this.width,this.height,this);
    },
    groupAdd:function(group,editInfo){
        var type = editInfo.type;
        var args = editInfo.args;
        var groupId = args[0];
        var loc = args[1];
        var groupType = args[2];
        var order = args[3];
        var aimLoc = args[4];
        var attLoc = args[5];

        group.id = groupId;
        group.loc = loc;
        group.order = order;
        group.aimLoc = aimLoc;
        group.attLoc = attLoc;

        var block = this.blockList[group.getLoc()];
        if(!block){
            throw new Error("can't find the block when you try to add a group");
            return null;
        }
        block.addGroup(group);
    },
    groupSet:function(group,editInfo){
        var type = editInfo.type;
        var args = editInfo.args;
        var block = this.blockList[group.getLoc()];
        if(!block){return false;}

        //该判断主要用作用户的输入检测和过滤
        switch (type){
            case "att":
                break;
            case "def":
                break;
            case "loc":
                break;
            case "attLoc":
                break;
        }
        group.setProp(type,args);

        return true;
    },
    groupDivide:function(group,editInfo){
        var block = this.blockList[group.getLoc()];
        var camp = group.getCamp();
        var groupList = block.getGroupList();

        var campNum = 0,group_i,camp_i;
        for(var i = 0;i<groupList.length;i++){
            group_i = groupList[i];
            camp_i = group_i.getCamp();
            if(camp_i.id == camp.id){
                campNum ++;
            }
            if(campNum > 1){
                return false;
            }
        }

        var newGroup_i;
        var newGroupList = [];
        for(var i = 0;i<2;i++){
            newGroup_i = camp.groupManager.generateGroupByType(group.type);
            newGroup_i.id = editInfo.args[i+1];
            newGroupList.push(newGroup_i);
        }
        var soldierNum = group.getSoldierNum();
        var soldierList = group.getSoldierList();
        var firstNum = Math.ceil(soldierNum/2);
        var secondList = soldierList.splice(firstNum + 1,firstNum -1);
        newGroupList[0].groupList = soldierList;
        newGroupList[1].groupList = secondList;
        for(var i = 0;i<2;i++){
            block.addGroup(newGroupList[i]);
        }

        block.removeGroup(group);
    },
    /**
     * 添加soldier
     * @param soldier
     */
    addSoldier:function(soldier){
        var loc = soldier._t_loc;
        var block = this.blockList[loc];
        if(block){
            block.addSoldier(soldier);
        }
    },
    /**
     * 准备作战
     * (主要任务是将所有的soldier加入战场）
     */
    ready:function(camManager){
        console.log("准备工作");
        //var campList = camManager.getCampList();
        //var camp,
        //    groupManager,groupList,group,
        //    soldierList,soldier;
        //for(var i in campList){
        //    camp = campList[i];
        //    groupManager = camp.groupManager;
        //    groupList = groupManager.getGroupList();
        //    loop:
        //    for(var p in groupList){
        //        group = groupList[p];
        //        //添加士兵
        //        var soldierList = group.getSoldierList();
        //        for(var m = 0;m<soldierList.length;m++){
        //            soldier = soldierList[m];
        //            this.addSoldier(soldier);
        //        };
        //    };
        //};

        var block_i;
        for(var i = 0;i<this.blockList.length;i++){
            block_i = this.blockList[i];
            block_i.ready();
        }
    },
    /**
     * 战斗
     */
    fight:function(){
        console.log("开始战斗");
        var block;
        for(var i =0;i<this.blockList.length;i++){
            block = this.blockList[i];
            block.gather(this);
        }

        for(var i = 0;i<10;i++){
            var speedGroup = this.speedList[i];
            if(!speedGroup||!speedGroup.length)continue;
            var soldier;
            for(var p = 0;p<speedGroup.length;p++){
                soldier = speedGroup[p];
                soldier.t_action(this);
            }
        }

        for(var i = 0;i<this.blockList.length;i++){
            block = this.blockList[i];
            block.reform(this);
        }
    },

    /**
     * 数据统计
     */
    statistic:function(){
        var block;
        for(var i = 0;i<this.blockList.length;i++){
            block = this.blockList[i];
            block.sightRegister();
        }
        for(var i = 0;i<this.blockList.length;i++){
            block = this.blockList[i];
            block.sightCommit();
        }
    },
    /**
     * 战斗清理
     */
    clean:function(){
        console.log("战场清理");
        var block;
        for(var i = 0;i<this.blockList.length;i++){
            block = this.blockList[i];
            block.clean();
        };

        this.speedList = {};
    },
    /**
     * 根据loc获取指定的block
     * @param loc
     * @returns {*}
     */
    getBlockByLoc:function(loc){
        return this.blockList[loc];
    },
    getBlockByXY:function(x,y){
        var loc = x*this.width + y;
        if(this.blockList[loc]){
            return this.blockList[loc];
        }
        throw new Error("can't find block by XY");
        return null;
    },
    getInfo: function () {
        var campInfo;
    }
}