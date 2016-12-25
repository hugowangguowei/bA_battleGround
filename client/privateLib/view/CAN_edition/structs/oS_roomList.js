/**
 * Created by wangguowei on 2001/1/1.
 */
define(function(require){
    var outerStruct = require('privateLib/outerStruct');

    function oS_roomList(id,x,y,w,h,reflectable){
        outerStruct.call(this);
        this.id = id;
        this.name = id;
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
        this.roomIntroConfig = {
            w:this.showWindowConfig.w,
            h:70
        }
        this._curLoc = 0;
    }

    oS_roomList.prototype = new outerStruct();
    oS_roomList.prototype.refresh = function (self) {
        var curLoc = self._curLoc;
        var singleRoomHeight = self.roomIntroConfig.h;
        var minRoomNum = parseInt(curLoc/singleRoomHeight);
        var maxRoomNum = parseInt((curLoc + self.showWindowConfig.h)/singleRoomHeight);
        if(minRoomNum >= maxRoomNum){
            throw new Error("oS_roomList:minRoomNum is bigger than maxRoomNum!");
            return 0;
        }
        self.cleanCache();

        if(!self.nodeList["roomIntro"]){
            return 0;
        }
        var roomList = self.nodeList["roomIntro"].list;
        var roomIntro_i;
        for(var i = minRoomNum;i<maxRoomNum;i++){
            if(!roomList[i]){
                break;
            }
            roomIntro_i = roomList[i];
            var relativeLoc = {
                x:0,
                y:i*singleRoomHeight - curLoc,
                w:self.roomIntroConfig.w,
                h:self.roomIntroConfig.h
            };
            roomIntro_i.draw(self.showWindowCanvas,relativeLoc,self.showWindowConfig);
        }
    }
    oS_roomList.prototype.drawSelf = function(self,canvas){
        var cxt = canvas.getContext("2d");
        var sW = self.showWindowConfig;
        cxt.drawImage(self.showWindowCanvas,sW.x,sW.y,sW.w,sW.h);
        cxt.strokeStyle = "black";
        cxt.strokeRect(self.x,self.y,self.width,self.height);
        var sB = self.borderInfo;
        cxt.strokeRect(self.x + sB.left,self.y + sB.top,
            self.width - sB.left-sB.right,self.height - sB.top -sB.bottom);
    }
    oS_roomList.prototype.onMouseWheel = function (deltaY) {
        this._curLoc += deltaY/10;
        this._curLoc<0?this._curLoc = 0:this._curLoc;
    }

    return oS_roomList;
})























