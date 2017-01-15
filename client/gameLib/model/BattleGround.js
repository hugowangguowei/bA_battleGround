/**
 * Created by wgw on 2017/1/2.
 */


define(function (require) {
    var Block = require("./Block");

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
            this.visibleBlocks = [];
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