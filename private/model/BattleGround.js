/**
 * Created by wgw on 2016/11/29.
 */

module.exports = BattleGround;
var GUID = require("../../dep/baBasicLib/util/GUID");
var Block = require("./Block");

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