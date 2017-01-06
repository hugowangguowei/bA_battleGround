/**
 * Created by wgw on 2017/1/2.
 */


define(function (require) {

    function BattleGround(model){
        this.model = model||0;
        this.width = 4;
        this.height = 4;
        this.visibleBlocks = [];
    }

    BattleGround.prototype = {
        /**
         *
         * @param visibleBlocks {type_s_1}
         */
        setVBByServer:function(visibleBlocks){
            for(var i in visibleBlocks){
                this.visibleBlocks.push(visibleBlocks[i]);
            };
        }
    }

    return BattleGround;
})