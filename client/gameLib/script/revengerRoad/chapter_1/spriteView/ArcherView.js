/**
 * Created by wgw on 2016/8/18.
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
        cxt.fillStyle = "blue";
        var x1 = 0,y1 = canvas.height*0.2;
        var x2 = canvas.width,y2 = canvas.height*0.5;
        var x3 = 0,y3 = canvas.height*0.8;
        var x = canvas.width*0.5;
        var y = canvas.height*0.5;
        var r = canvas.height*0.5;
        cxt.arc(x,y,r,-Math.PI*0.5,Math.PI*0.5);
        cxt.fill();
    }

    function KnightView(model){
        spriteView.call(this);
        this.type = "KnightView";
        this.bindModel = model;
    };
    KnightView.prototype = new spriteView();
    KnightView.prototype.draw = function(canvas){
        var obj = this.bindModel;
        var loc = obj.loc;
        //计算位置
        var geo = obj.geoInfo.bindGeo;
        var geoW = geo.width , geoH = geo.height;
        var relX = loc.x/geoW , relY = loc.y/geoH;
        var cW = canvas.width , cH = canvas.height;
        var transRateX = cW/geoW,transRateY = cH/geoH;
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
            cxt.beginPath();
            cxt.strokeStyle = "red";
            cxt.strokeRect(-1*bearWidth/2 - 2, -1*bearHeight/2 - 1,bearWidth + 4,bearHeight + 2);
            cxt.closePath();
            cxt.stroke();
            if(obj.attackDis&&obj.propInfo.attackState){
                var aD = obj.attackDis;
                cxt.strokeStyle = "red";
                cxt.beginPath();
                cxt.arc(0,0,aD.min*transRateX,0 - aD.range/2,0 + aD.range/2,false);
                cxt.arc(0,0,aD.max*transRateX,0 + aD.range/2,0 - aD.range/2,true);
                cxt.closePath();
                cxt.stroke();
            };
        }
        cxt.restore();

        if(obj.attackDis&&obj.propInfo.attackState){
            var qt =obj.attackDis.quaTreeRange;
            if(qt){
                cxt.beginPath;
                cxt.strokeRect(qt.x*transRateX,qt.y*transRateY,qt.w*transRateX,qt.h*transRateY);
                cxt.closePath();
                cxt.stroke;
            }

        };


        this.drawName(canvas,{x:x,y:y});
    };

    return KnightView;
});
