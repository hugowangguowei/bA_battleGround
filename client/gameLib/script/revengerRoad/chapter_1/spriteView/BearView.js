/**
 * Created by wgw on 2016/5/7.
 */
define(function(require){
    var spriteView = require("gameLib/script/revengerRoad/chapter_1/spriteView/SpriteView_c1");
    var BearViewCache = document.createElement("canvas");
    var basicScale = 0.2;
    initCache(BearViewCache);
    function initCache(canvas){
        canvas.width = 50;
        canvas.height = 50;
        var cxt = canvas.getContext("2d");
        cxt.fillStyle = "blue";
        var x = 0;
        var y = canvas.height*0.2;
        var w = canvas.width*0.8;
        var h = canvas.height*0.6;
        cxt.fillRect(x,y,w,h);
        cxt.fillStyle = "red";
        x = canvas.width*0.8;
        w = canvas.width*0.2;
        cxt.fillRect(x,y,w,h);
    }

    function BearView(model){
        spriteView.call(this);
        this.type = "bearView";
        this.bindModel = model;
    };
    BearView.prototype = new spriteView();
    BearView.prototype.draw = function(canvas){
        var obj = this.bindModel;
        var loc = obj.loc;
        //计算位置
        var geo = obj.geoInfo.bindGeo;
        var geoW = geo.width , geoH = geo.height;
        var relX = loc.x/geoW , relY = loc.y/geoH;
        var cW = canvas.width , cH = canvas.height;
        var x = relX*cW;
        var y = relY*cH;
        //计算方向
        var direction = loc.direction;
        var propInfo = obj.propInfo;
        var scale = propInfo.life/propInfo.baseLife * basicScale;
        var bearWidth = BearViewCache.width*scale , bearHeight = BearViewCache.height*scale;

        var cxt = canvas.getContext("2d");
        cxt.save();
        cxt.translate(x, y);
        cxt.rotate(direction);//旋转47度
        cxt.drawImage(BearViewCache,-1*bearWidth/2, -1*bearHeight/2,bearWidth,bearHeight);
        if(obj.testSignal.watch){
            cxt.strokeStyle = "red";
            cxt.strokeRect(-1*bearWidth/2 - 2, -1*bearHeight/2 - 1,bearWidth + 4,bearHeight + 2);
            cxt.stroke();
        }
        cxt.restore();

        this.drawName(canvas,{x:x,y:y});
    }
    return BearView;
});
