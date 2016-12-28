/**
 * Created by wgw on 2016/11/29.
 */

module.exports = BattleGround;
var GUID = require("../../dep/baBasicLib/util/GUID");

var Block = function(id){
    this.id = id;
    this.loc = id;
    this.soldierList = [];
    this.campList = [];
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
        var campList = this.getCampInBlock();
        var blockInfo = this.getOutPut();
        for(var i = 0;i<campList.length;i++){
            campList[i].refreshBlockInfo(blockInfo);
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
    getCampInBlock:function(){
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
     * 获取基本信息
     * @returns {null}
     */
    getOutPut: function () {
        var blockId = this.id;
        var blockState;
        if(this.campList)
        return null;
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
    initialize:function(){
        for(var i = 0;i<this.width*this.height;i++){
            var block = new Block(i);
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
            block.statistic();
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
    getBlockByLoc:function(loc){
        return this.blockList[loc];
    },
    getInfo: function () {
        var campInfo
    }
}