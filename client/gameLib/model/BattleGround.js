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
                    var block = new Block();
                    block.id = count;
                    block.loc = count;
                    this.blockList[block.loc] = block;
                    count++;
                }
            }
        },
        /**
         * hb
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
                block.visible = true;
                block.setByServerInfo(vB_i);
                this.visibleBlocks.push(visibleBlocks[i]);
            };
            //生成不可见块
            for(var i in this.blockList){
                b_i = this.blockList[i];
                if(!b_i.visible){
                    this.invisibleBlocks.push(b_i);
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
                block_i.visible = false;
            };
            this.visibleBlocks = [];
            this.invisibleBlocks = [];
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