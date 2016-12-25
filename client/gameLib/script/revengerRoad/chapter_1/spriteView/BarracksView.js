/**
 * Created by wgw on 2016/8/15.
 */
define(function(require){
    var spriteView = require("gameLib/script/revengerRoad/chapter_1/spriteView/SpriteView_c1");
    var BearViewCache = document.createElement("canvas");
    var basicScale = 0.2;
    initCache(BearViewCache);
    function initCache(canvas){
        canvas.width = 10;
        canvas.height = 10;
    }

    function BarracksView(model){
        spriteView.call(this);
        this.type = "bearView";
        this.bindModel = model;
    };
    BarracksView.prototype = new spriteView();
    BarracksView.prototype.draw = function(canvas){
    };
    return BarracksView;
});