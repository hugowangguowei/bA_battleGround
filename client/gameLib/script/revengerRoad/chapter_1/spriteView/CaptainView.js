/**
 * Created by wgw on 2016/7/15.
 */
define(function(require){
    var spriteView = require("gameLib/script/revengerRoad/chapter_1/spriteView/SpriteView_c1");
    var ViewCache = document.createElement("canvas");
    var basicScale = 0.2;
    initCache(ViewCache);
    function initCache(canvas){
        canvas.width = 50;
        canvas.height = 50;
        var cxt = canvas.getContext("2d");
        cxt.fillStyle = "green";
        var x1 = 0,y1 = canvas.height*0.2;
        var x2 = canvas.width,y2 = canvas.height*0.5;
        var x3 = 0,y3 = canvas.height*0.8;
        cxt.beginPath();
        cxt.moveTo(x1,y1);
        cxt.lineTo(x2,y2);
        cxt.lineTo(x3,y3);
        cxt.fill();
        cxt.closePath();
    }

    function CaptainView(model){
        spriteView.call(this);
        this.type = "KnightView";
        this.bindModel = model;
    };
    CaptainView.prototype = new spriteView();
    CaptainView.prototype.draw = function(canvas){
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
        var scale = propInfo.life/propInfo.baseLife*basicScale;

        var bearWidth = ViewCache.width*scale , bearHeight = ViewCache.height*scale;

        var cxt = canvas.getContext("2d");
        cxt.save();
        cxt.translate(x, y);
        cxt.rotate(direction);//旋转47度?
        cxt.drawImage(ViewCache,-1*bearWidth/2, -1*bearHeight/2,bearWidth,bearHeight);
        if(obj.testSignal.watch){
            cxt.strokeStyle = "red";
            cxt.strokeRect(-1*bearWidth/2 - 2, -1*bearHeight/2 - 1,bearWidth + 4,bearHeight + 2);
            cxt.stroke();
        }
        cxt.restore();

        this.drawName(canvas,{x:x,y:y});
    };
    return CaptainView;
});
