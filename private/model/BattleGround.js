/**
 * Created by wgw on 2016/11/29.
 */

module.exports = BattleGround;
var GUID = require("../../dep/baBasicLib/util/GUID");

var Block = function(id){
    this.id = id;
    this.loc = id;
    this.battleGround = null;
    this.soldierList = [];
    this.campList = [];
    this.campSightList = [];

}
Block.prototype = {
    initialize:function(){

    },
    /**
     * 添加一个soldier
     * @param soldier
     */
    addSoldier:function(soldier){
        this.soldierList.push(soldier);
    },

    removeSoldier:function(soldier){
        var soldier_i;
        for(var i = 0;i<this.soldierList.length;i++){
            soldier_i = this.soldierList[i];
            if(soldier_i.id ==  soldier.id){
                this.soldierList.splice(i,1);
                return true;
            }
        }
        return false;
    },
    /**
     * 集结
     * battle开始时，每个block都会进行集结
     * 用以计算在该回合中每个block的增益
     */
    gather:function(battleGround){
        //TODO 尚未添加群体效应
        var speedList = battleGround.speedList;
        var soldier;
        for(var i = 0;i<this.soldierList.length;i++){
            soldier = this.soldierList[i];
            var speed = soldier._t_speed;
            if(!speedList[speed])speedList[speed] = [];
            speedList[speed].push(soldier);
        }
    },
    /**
     * 获取本block内一个随机soldier
     */
    getRandomEnemySoldier:function(myCampId){
        //TODO 选了第一个敌人
        var soldier;
        for(var i = 0;i<this.soldierList.length;i++){
            soldier = this.soldierList[i];
            if((soldier.getCamp().getCampId() != myCampId)&&(!soldier.isDead())){
                return soldier;
            }else{
                console.log("第一个死啦");
                continue;
            }

        }
        return null;
    },
    /**
     * 数据统计
     */
    statistic:function(){
        if(!this.soldierList.length)return 0;
        var campList = this.getCampsInBlock();
        var blockInfo = this.getOutPut();
        for(var i = 0;i<campList.length;i++){
            campList[i].refreshBlockInfo(blockInfo);
        }
    },
    /**
     * 视野注册
     */
    sightRegister:function(){
        var groupList = this.getGroupsInBlock();
        var group_i;
        outerLoop:
        for(var i = 0;i<groupList.length;i++){
            group_i = groupList[i];
            var sightList = group_i.sightList;
            var rBlockList = this.getRelativeBlockBySL(sightList);
            var block_p;
            innerLoop:
            for(var p = 0 ; p< rBlockList.length ; p++){
                block_p = rBlockList[p];
                block_p.addSight(group_i);
            }
        }
    },
    /**
     * 添加视野
     */
    addSight:function(group){
        var camp = group.camp;
        var camp_i;
        var isExist = false;
        for(var i = 0;i<this.campSightList.length;i++){
            camp_i = this.campSightList[i];
            if(camp.id == camp_i.id){
                isExist = true;
                break;
            }
        }
        if(!isExist)this.campSightList.push(camp);
    },
    /**
     * 视野提交
     */
    sightCommit:function(){
        var blockInfo = this.getOutPut();
        var campSightList = this.campSightList;
        var camp_i;
        for(var i = 0;i<campSightList.length;i++){
            camp_i = campSightList[i];
            camp_i.addBlockStatistic(blockInfo);
        }
    },
    /**
     * 战后block的清理
     */
    clean:function(){
        //TODO 包括及部分内容
        //1.记录当前块的阵营归属
        //2.记录当前块的归属转移情况
        this.soldierList = [];
    },
    /**
     * 获取当前块的阵营信息
     */
    getCampsInBlock:function(){
        var campList = [];
        var camp_p;
        if(!this.soldierList.length)return campList;
        outerLoop:
        for(var i = 0;i<this.soldierList.length;i++){
            var camp = this.soldierList[i].getCamp();
            var isExist = false;
            innerLoop:
            for(var p = 0;p<campList.length;p++){
                camp_p = campList[p];
                if(camp.id == camp_p.id){
                    isExist = true;
                    break innerLoop;
                }
            }
            if(!isExist)campList.push(camp);
        }
        this.campList = campList;
        return campList;
    },
    /**
     * 获取当前块的小队信息
     * @returns {Array}
     */
    getGroupsInBlock:function(){
        var groupList = [];
        var group_p;
        if(!this.soldierList.length)return groupList;
        outerLoop:
        for(var i = 0;i<this.soldierList.length;i++){
            var group = this.soldierList[i].getGroup();
            var isExist = false;
            innerLoop:
            for(var p = 0;p<groupList.length;p++){
                group_p = groupList[p];
                if(group_p.id == group.id){
                    isExist = true;
                    break innerLoop;
                }
            }
            if(!isExist)groupList.push(group);
        }
        this.groupList = groupList;
        return groupList;
    },
    /**
     * 根据视野获取相关块
     * @param sightList
     * @returns {Array}
     */
    getRelativeBlockBySL:function(sightList){
        var blockList = [];
        var battleGround = this.battleGround;
        var w = battleGround.width;
        var h = battleGround.height;
        var x = this.loc%w;
        var y = parseInt(this.loc/w);
        var sight_i,s_x,s_y,loc_i;
        for(var i = 0;i<sightList.length;i++){
            sight_i = sightList[i];
            s_x = x + sight_i.x;
            s_y = y + sight_i.y;
            if(s_x < 0 || s_x > w)continue;
            if(s_y < 0 || s_y > h)continue;
            loc_i = w * s_y + s_x;
            var block = battleGround.getBlockByLoc(loc_i);
            if(block)blockList.push(block);
        }
        return blockList;
    },
    /**
     * 获取基本信息
     */
    getOutPut: function () {
        var blockId = this.id;
        var loc = this.loc;
        var campNum = this.campList.length;
        var campNameList = [];
        for(var i = 0;i<this.campList.length;i++){
            campNameList.push(this.campList[i].id);
        }

        var info = {
            blockId:blockId,
            loc:loc,
            campNum:campNum,
            campNameList:campNameList
        };
        return info;
    }
}

function BattleGround(id){
    this.id = id||GUID.getGUID();
    this.width = 4;
    this.height = 4;
    this.blockList = [] ;
    this.speedList = {};
    this.initialize();
}
BattleGround.prototype = {
    /**
     * 初始化
     */
    initialize:function(){
        for(var i = 0;i<this.width*this.height;i++){
            var block = new Block(i);
            block.battleGround = this;
            this.blockList.push(block);
        }
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
        var campList = camManager.getCampList();
        var camp,
            groupManager,groupList,group,
            soldierList,soldier;
        for(var i in campList){
            camp = campList[i];
            groupManager = camp.groupManager;
            groupList = groupManager.getGroupList();
            loop:
            for(var p in groupList){
                group = groupList[p];
                //添加士兵
                var soldierList = group.getSoldierList();
                for(var m = 0;m<soldierList.length;m++){
                    soldier = soldierList[m];
                    this.addSoldier(soldier);
                };
            };
        };
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
        }
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
    getInfo: function () {
        var campInfo;
    }
}