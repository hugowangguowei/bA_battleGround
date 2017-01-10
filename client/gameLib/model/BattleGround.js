/**
 * Created by wgw on 2017/1/2.
 */


define(function (require) {
    var GroupManager = require("gameLib/controller/GroupManager");

    function Block(){
        this.id =  0;
        this.loc = -1;
        this.groupList = [];
    }
    Block.prototype = {
        init:function(){

        },
        initByServerInfo:function(blockInfo){
            var id = blockInfo.id;
            var loc = blockInfo.loc;
            var groupInfoList = blockInfo.groupInfoList;
            var gI_i,group;
            for(var i = 0;i<groupInfoList.length;i++){
                gI_i = groupInfoList[i];
                group = GroupManager.generateGroupByType(gI_i.type,gI_i.campId,{num:gI_i.soldierNum,loc:gI_i.loc});
                this.groupList.push(group);
            }
        }
    }

    function BattleGround(model){
        this.model = model||0;
        this.width = 4;
        this.height = 4;
        this.visibleBlocks = [];
    }

    BattleGround.prototype = {
        /**
         * hb
         * @param visibleBlocks {type_s_1}
         */
        setVBByServer:function(visibleBlocks){
            var vB_i;
            for(var i in visibleBlocks){
                vB_i = visibleBlocks[i];
                var block = new Block();
                block.initByServerInfo(vB_i);
                this.visibleBlocks.push(visibleBlocks[i]);
            };
        }
    }

    return BattleGround;
})