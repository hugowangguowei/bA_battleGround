/**
 * Created by wgw on 2016/2/10.
 */
define(function(require){
    var outerStruct = require("privateLib/outerStruct");

    function oS_selfControl(id,x,y,w,h,reflectable){
        outerStruct.call(this);
        this.id = id;
        this.name = id;
        this.type = "oS_game";
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

        this._curLoc = 0;
    }

    oS_selfControl.prototype = new outerStruct();
    oS_selfControl.prototype.refresh = function (self) {
        var curLoc = self._curLoc;

        self.cleanCache();

        //ªÊ÷∆»ÀŒÔø®
        if(self.nodeList["playerCard"]){
            var playerCardList = self.nodeList["playerCard"].list;
            var playerCard_i;
            for(var i = 0;i<playerCardList.length;i++){
                playerCard_i = playerCardList[i];
                var relativeLoc = {
                    x:0,
                    y:i*singleRoomHeight - curLoc,
                    w:self.roomIntroConfig.w,
                    h:self.roomIntroConfig.h
                };
                roomIntro_i.draw(self.showWindowCanvas,relativeLoc,self.showWindowConfig);
            }
        }

    }
    oS_selfControl.prototype.drawSelf = function(self,canvas){
        var cxt = canvas.getContext("2d");
        var sW = self.showWindowConfig;
        cxt.drawImage(self.showWindowCanvas,sW.x,sW.y,sW.w,sW.h);
        cxt.strokeStyle = "black";
        cxt.strokeRect(self.x,self.y,self.width,self.height);
        var sB = self.borderInfo;
        cxt.strokeRect(self.x + sB.left,self.y + sB.top,
            self.width - sB.left-sB.right,self.height - sB.top -sB.bottom);
    }

    return oS_selfControl;
});






