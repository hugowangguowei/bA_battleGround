/**
 * Created by wgw on 2016/6/19.
 */

define(function(require){
    function SpriteView_c1(){
        this.type = 'spriteView';
    }
    SpriteView_c1.prototype = {
        draw:function(){
        },
        drawName:function(canvas,loc){
            var cxt = canvas.getContext("2d");
            var name = this.bindModel.ctrName;
            if(!name)return;
            cxt.fillStyle = "red";
            cxt.font = "15px Arial"
            cxt.textAlign = "center";
            cxt.fillText(name,loc.x,loc.y-10,50);
        },
    }
    return SpriteView_c1;
})