/**
 * Created by wgw on 2017/1/2.
 */


define(function (require) {

    var Block = require("./Block");

    function BattleGround(model){
        this.model = model||0;
        this.width = 10;
        this.height = 10;
        this.blockList = {};
        this.visibleBlocks = [];
        this.invisibleBlocks = [];
        this.init();
    }

    BattleGround.prototype = {

        init:function(){
            var count = 0;
            for(var i = 0;i<this.width;i++){
                for(var p = 0;p<this.height;p++){
                    var block = new Block(this);
                    block.id = count;
                    block.loc = count;
                    this.blockList[block.loc] = block;
                    count++;
                }
            }
        },
        /**
         *
         * @param visibleBlocks {type_s_1}
         */
        setVBByServer:function(visibleBlocks){
            this.resetVisibility();

            var vB_i,b_i;
            //生成可见块
            for(var i in visibleBlocks){
                vB_i = visibleBlocks[i];
                var loc = vB_i.loc;
                var block = this.getBlockByLoc(loc);
                block.visibleFlag = true;
                block.setByServerInfo(vB_i);
                this.visibleBlocks.push(block);
            };
            //生成不可见块
            for(var i in this.blockList){
                b_i = this.blockList[i];
                if(!b_i.visibleFlag){
                    this.invisibleBlocks.push(b_i);
                    //如果原先可见，现在又不可见了，也需要重新设置
                    if(b_i.visible){
                        b_i.setByServerInfo();
                    }
                }
            };
        },
        getBlockByLoc:function(loc){
            return this.blockList[loc];
        },
        resetVisibility:function(){
            var block_i;
            for(var i in this.blockList){
                block_i = this.blockList[i];
                if(block_i.visibleFlag){
                    block_i.visibleFlag = false;
                }
            };
            this.visibleBlocks = [];
            this.invisibleBlocks = [];
        },
        getBlockList:function(){
            return this.blockList;
        },
        getVisibleBlocks:function(){
            return this.visibleBlocks;
        },
        getInvisibleBlocks:function(){
            return this.invisibleBlocks;
        }
    }

    return BattleGround;
})