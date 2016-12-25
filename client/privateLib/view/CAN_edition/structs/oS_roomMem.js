/**
 * Created by wangguowei on 2001/1/1.
 */
define(function(require){
    var outerStruct = require("privateLib/outerStruct");

    function oS_roomMem(id,x,y,w,h,reflectable){
        outerStruct.call(this);
        this.id = id;
        this.name = name;
        this.x =x;
        this.y =y;
        this.width = w;
        this.height = h;
        this.reflectable = reflectable;
        this.nodeList = {};
        this.showWindowConfig = {
            x:this.x + this.borderInfo.left,
            y:this.y + this.borderInfo.top,
            w:this.width - this.borderInfo.left - this.borderInfo.right,
            h:this.height - this.borderInfo.top - this.borderInfo.bottom
        };
        this.showWindowCanvas = document.createElement("canvas");
        this.showWindowCanvas.width = this.showWindowConfig.w;
        this.showWindowCanvas.height = this.showWindowConfig.h;
        this._memIntroConfig = {
            w:100,
            h:100
        }
        this._curLoc = 0;
    }

    oS_roomMem.prototype = new outerStruct();
    oS_roomMem.prototype.refresh = function (self) {
        self.cleanCache();

        if(!self.nodeList["memIntro"]){
            return 0;
        }
        var memList = self.nodeList["memIntro"].list;
        var memIntro_i;
        for(var i =0;i<memList.length;i++){
            memIntro_i = memList[i];
            var relativeLoc = {
                x:i*self._memIntroConfig.w,
                y:0,
                w:self._memIntroConfig.w,
                h:self._memIntroConfig.h
            };
            memIntro_i.draw(self.showWindowCanvas,relativeLoc,self.showWindowConfig);
        }
    }
    oS_roomMem.prototype.drawSelf = function(self,canvas){
        var cxt = canvas.getContext("2d");
        var sW = self.showWindowConfig;
        cxt.drawImage(self.showWindowCanvas,sW.x,sW.y,sW.w,sW.h);
        cxt.strokeStyle = "black";
        cxt.strokeRect(self.x,self.y,self.width,self.height);
        var sB = self.borderInfo;
        cxt.strokeRect(self.x + sB.left,self.y + sB.top,
            self.width - sB.left-sB.right,self.height - sB.top -sB.bottom);
    }

    return oS_roomMem;
});
























