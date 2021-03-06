/**
 * 阵营
 * Created by wgw on 2016/4/18.
 */

module.exports = Camp;
var GUID = require("../../dep/baBasicLib/util/GUID");
var GroupManager = require("../controller/GroupManager");
var SoldierPool = require("./SoldierPool");

function Camp(id){
    this.id = id||GUID.getGUID();
    this.commander = null;
    this.groupManager = new GroupManager(this);
    this.battleGround = null;
    this.visibleBlocks = {};
    this._t_num = 0;
    this.soldierPool = new SoldierPool(this);
    //this.initialize();
}
Camp.prototype = {
    initialize:function(){
        this.soldierPool.inputSampleSoldiers();
        this._setOriVisibleBlock();
    },
    getCampId:function(){
        return this.id;
    },
    /**
     * 获取阵营的信息
     * @returns {{id: *}}
     */
    getCampInfo: function () {
        var campInfo = {};

        campInfo.id = this.id;

        campInfo.visibleBlocks = this.visibleBlocks;

        var soldierDetail = {};
        var group_i;
        var groupList = this.groupManager.getGroupList();
        for(var i = 0;i<groupList.length;i++){
            group_i = groupList[i];
            var groupInfo = group_i.getOutPut();
            soldierDetail[groupInfo.id] = groupInfo;
        }
        campInfo.solderDetail = soldierDetail;

        var soldierPoolInfo = this.soldierPool.getSoldierPoolInfo();
        campInfo.soldierPoolInfo = soldierPoolInfo;

        return campInfo;
    },
    getCampNum:function(){
        return this._t_num;
    },

    _setOriVisibleBlock:function(){
        var campNum = this.getCampNum();
        var oriNum;
        switch (campNum){
            case 0:
                oriNum = 0;
                break;
            case 1:
                oriNum = 2;
                break;
        }
        for(var i = oriNum;i<oriNum+2;i++){
            for(var p = 2;p<8;p++){
                var block_i = this.battleGround.getBlockByXY(i,p);
                var blockInfo = block_i.getOutPut();
                var loc = block_i.getLoc();
                this.visibleBlocks[loc] = blockInfo;
            }
        }
    },
    /**
     * 添加士兵
     * @param soldier
     */
    addSoldier:function(soldier){
        soldier.setCamp(this);
        var group = this.groupManager.getGroupBySoldierType(soldier.type);
        if(!group) {
            group = this.groupManager.addGroupBySoldierType(soldier.type);
        };
        group.addSoldier(soldier);
    },
    /**
     * 团队消失（被打到撤销番号）
     * @param group
     */
    groupVanished:function(group){
        this.groupManager.groupVanished(group);
    },
    /**
     * 根据用户请求，设置阵营属性
     * @param campInfo
     */
    setCampByClientSubmit:function(campInfo){
        var soldierInfo_i,group_i,soldier_p;

        var self = this;
        var editInfo_i,group_i;
        for(var i = 0;i<campInfo.length;i++){
            editInfo_i = campInfo[i];

            if(editInfo_i.type == "soldierRecruitment"){
                this.soldierPool.recruitment(editInfo_i.args);
            }
            else if(editInfo_i.type == "groupAdd"){
                var group = this.groupManager.generateGroupBySubmit(editInfo_i.args);
                this.battleGround.groupAdd(group,editInfo_i);
            }
            else{
                var group = this.groupManager.getGroupById(editInfo_i.args[0]);
                if(!group){
                    throw new Error("can't find the group when you submit a groupEdit");
                    continue;
                }
                if(editInfo_i.type == "groupSep"){
                    this.battleGround.groupDivide(group,editInfo_i);
                }
                else{
                    this.battleGround.groupSet(group,editInfo_i);
                }
            }

        }

    },
    /**
     * 收集战场信息
     * @param block
     */
    addBlockStatistic:function(block){
        var loc = block.loc;
        this.visibleBlocks[loc] = block;
    },
    /**
     * 战后统计（主要是把死人清理出战场）
     */
    battleStatistic:function(){
        var group;
        var groupList = this.groupManager.getGroupList();
        for(var i = 0;i<groupList.length;i++){
            group = groupList[i];
            group.battleStatistic();
        }
    },
    /**
     * 回合重置
     */
    roundReset:function(){
        this.visibleBlocks = {};
    }

}