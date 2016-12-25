/**
 * Created by wgw on 2016/6/13.
 */

define(function(require){
    var spriteView = require("gameLib/script/revengerRoad/chapter_1/spriteView/SpriteView_c1");
    var BearViewCache = document.createElement("canvas");
    var evilEyeCache = document.createElement("canvas");
    var basicScale = 1;
    initCache(BearViewCache);
    initEye(evilEyeCache);
    function initCache(canvas){
        canvas.width = 50;
        canvas.height = 50;
        var cxt = canvas.getContext("2d");
        cxt.moveTo(25,0);
        cxt.lineTo(30,20);
        cxt.lineTo(50,25);
        cxt.lineTo(30,30);
        cxt.lineTo(25,50);
        cxt.lineTo(20,30);
        cxt.lineTo(0,25);
        cxt.lineTo(20,20);
        cxt.lineTo(25,0);
        cxt.save();
        cxt.globalAlpha = 0.6;
        cxt.fillStyle = "orange";
        cxt.fill();
        cxt.restore();
        cxt.strokeStyle = "orange";
        cxt.stroke();
        //var image = new Image();
        //image.src = "http://badventure.duapp.com/client/image/DarkTower.png";
        //image.onload = function(){
        //    cxt.drawImage(image,0,0,canvas.width,canvas.height);
        //}
    }


    function initEye(canvas){
        canvas.width = 100;
        canvas.height = 100;

        var cxt = canvas.getContext("2d");
        cxt.save();
        cxt.globalAlpha = 0.4;
        cxt.fillStyle = "red";
        cxt.arc(50,50,50,0,Math.PI*2,true);
        cxt.fill();
        cxt.restore();
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
        //����λ��
        var geo = obj.geoInfo.bindGeo;
        var geoW = geo.width , geoH = geo.height;
        var relX = loc.x/geoW , relY = loc.y/geoH;
        var cW = canvas.width , cH = canvas.height;
        var x = relX*cW;
        var y = relY*cH;
        //���㷽��
        var direction = loc.direction;
        var propInfo = obj.propInfo;
        var scale = propInfo.life/propInfo.baseLife * basicScale;
        var bearWidth = BearViewCache.width*scale , bearHeight = BearViewCache.height*scale;

        var cxt = canvas.getContext("2d");
        cxt.save();
        cxt.translate(x, y);
        cxt.rotate(direction);//��ת47��
        cxt.drawImage(BearViewCache,-1*bearWidth/2, -1*bearHeight/2,bearWidth,bearHeight);
        if(obj.testSignal.watch){
            cxt.strokeStyle = "red";
            cxt.strokeRect(-1*bearWidth/2 - 2, -1*bearHeight/2 - 1,bearWidth + 4,bearHeight + 2);
            cxt.stroke();
        }
        cxt.restore();


        //����а��
        var eyeLoc = obj.evilEye.loc;
        var relX = eyeLoc.x/geoW , relY = eyeLoc.y/geoH;
        var cW = canvas.width , cH = canvas.height;
        var ex = relX*cW;
        var ey = relY*cH;
        cxt.drawImage(evilEyeCache,ex-50,ey-50);

        this.drawName(canvas,{x:x,y:y});
    }
    return BearView;
});