/**
 * Created by wgw on 2016/2/13.
 * 总是无法提交。。。啊。。
 */
define(function(require){
    var outerStruct = require("privateLib/outerStruct");

    function oS_memShow(id,x,y,w,h,reflectable){
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
        this._memCtrlConfig = {
            w:this.showWindowConfig.w,
            h:100
        }
        this._curLoc = 0;
    }

    oS_memShow.prototype = new outerStruct();
    oS_memShow.prototype.refresh = function (self) {
        var curLoc = self._curLoc;
        var singleMemHeight = self._memCtrlConfig.h;

        self.cleanCache();

        if(!self.nodeList["memCtrl"]){
            return 0;
        }
        var memList = self.nodeList["memCtrl"].list;
        var memCtrl_i;
        for(var i = 0;i<memList.length;i++){
            memCtrl_i = memList[i];
            var relativeLoc = {
                x:0,
                y:i*singleMemHeight - curLoc,
                w:self._memCtrlConfig.w,
                h:self._memCtrlConfig.h
            };
            memCtrl_i.draw(self.showWindowCanvas,relativeLoc,self.showWindowConfig);
        }

    }
    oS_memShow.prototype.drawSelf = function(self,canvas){
        var cxt = canvas.getContext("2d");
        var sW = self.showWindowConfig;
        cxt.drawImage(self.showWindowCanvas,sW.x,sW.y,sW.w,sW.h);
        cxt.strokeStyle = "black";
        cxt.strokeRect(self.x,self.y,self.width,self.height);
        var sB = self.borderInfo;
        cxt.strokeRect(self.x + sB.left,self.y + sB.top,
            self.width - sB.left-sB.right,self.height - sB.top -sB.bottom);
    }
    oS_memShow.prototype.onMouseWheel = function (deltaY) {
        this._curLoc += deltaY/10;
        this._curLoc<0?this._curLoc = 0:this._curLoc;
    }

    return oS_memShow;
});

