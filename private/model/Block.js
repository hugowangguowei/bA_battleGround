/**
 * Created by wgw on 2017/1/15.
 */
module.exports = Block;

function Block(id){
    this.id = id;
    this.loc = id;
    this.battleGround = null;
    //士兵相关
    this.soldierList = [];
    this.groupList = [];
    this.campList = [];
    this.campSightList = [];
    //地形相关
    this.terraType = "plant"
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
     * 移除一个soldier
     * @param soldier
     * @returns {boolean}
     */
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
        console.log("选择敌人");
        var soldier;
        for(var i = 0;i<this.soldierList.length;i++){
            soldier = this.soldierList[i];
            if((soldier.getCamp().getCampId() != myCampId)&&(!soldier.isDead())){
                return soldier;
            }else{
                if(soldier.getCamp().getCampId() == myCampId)console.log("是友军");
                if(soldier.isDead())console.log("敌人死人一锅");
                continue;
            }

        }
        return null;
    },
    /**
     * 数据统计
     */
    statistic:function(){
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
     * 添加视野(该block在某camp的视野之内）
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
     * 视野移除
     */
    sightRemove:function(){
        this.campSightList = [];
    },
    /**
     * 战后block的清理
     */
    clean:function(){
        //TODO 包括及部分内容
        //1.记录当前块的阵营归属
        //2.记录当前块的归属转移情况
        this.soldierList = [];
        this.groupList = [];
        this.campList = [];
        this.sightRemove();
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
            if(s_x < 0 || s_x >= w)continue;
            if(s_y < 0 || s_y >= h)continue;
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
        if(this.loc == 1){
            console.log("test");
        }

        var groupList = this.groupList;
        var groupInfoList = [];
        var groupInfo_i,group_i;
        for(var i = 0;i<groupList.length;i++){
            group_i = groupList[i];
            groupInfo_i = group_i.getOutPut();
            groupInfoList.push(groupInfo_i);
        }

        var terraType = this.terraType;

        var info = {
            blockId:blockId,
            loc:loc,
            groupInfoList:groupInfoList,
            terraType:terraType
        };
        return info;
    }
}