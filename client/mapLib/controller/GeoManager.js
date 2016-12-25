/**
 * Created by wgw on 2016/4/18.
 */
define(function(require){
    "use strict";
    var instance = null;
    var baEventSource = require("baBasicLib/baEventSource");
    var BlockManager = require("mapLib/controller/BlockManager");
    var blockManager = BlockManager.getInstance();

    function GeoManager(){
        baEventSource.call(this);
        this.type = "GeoManager";
        this.mouseInfo = {
            state:'up'
        };
        this.paperInfo = {
            width:20,
            height:20,
            dataArray:[],
            cachedPix:[]
        };
        this.curBlock = null;
        this.blockList = [];
        this.initialize();
    }
    GeoManager.prototype = new baEventSource();
    GeoManager.prototype.initialize = function(){
        var self = this;
        this.blockList = blockManager.getBasicBlockList();
        for(var i = 0;i<this.paperInfo.width*this.paperInfo.height*3;i++){
            this.paperInfo.dataArray.push(0);
        }
    };
    GeoManager.prototype.mouseInput = function(type,loc){
        var self = this;
        switch (type){
            case "mousedown":
                this.mouseInfo.state = "down";
                break;
            case "mousemove":
                break;
            case "mouseup":
                this.mouseInfo.state = "up";
                self._mouseUp(loc);
                break;
        };
    };
    GeoManager.prototype._mouseUp = function(loc){
        var self = this;
        //传入的loc数据{x:x0,y:y0}，x0 和 y0是比例值
        var width = self.paperInfo.width;
        var height = self.paperInfo.height;
        var x = parseInt(loc.x * width);
        var y = parseInt(loc.y * height);
        //获取指定块在dataArray中的位置
        var dx = (width * y + x)*3;
        //获取block信息,并重置dataArray
        var cBlock = self.curBlock;
        if(cBlock){
            self.paperInfo.dataArray[dx] = cBlock.xS;
            self.paperInfo.dataArray[dx + 1] = cBlock.yS;
            //触发事件
            self.fireEvent("paperChange");
        }
    }
    GeoManager.prototype.paletteInput = function(type,loc){
        switch (type){
            case "pickBlock":
                this._pickBlock(loc);
                break;
        }
    };
    GeoManager.prototype._pickBlock = function(loc){
        var blockList = this.blockList;
        var cB,vL;
        for(var i = 0;i<blockList.length;i++){
            cB = blockList[i];
            vL = cB.viewLoc;
            if(!vL)return false;
            if(loc.x >vL.x &&loc.y >vL.y &&loc.x<(vL.x + vL.w)&&loc.y <(vL.y + vL.h)){
                this.curBlock = cB;
                this.fireEvent("paletteChange");
                return true;
            }
        }
    };
    GeoManager.prototype.draw = function(loc){
        var self = this;
        this.fireEvent("paperChange");
    };
    GeoManager.prototype.updateColor = function(c1,c2,c3){
        var cList = [];
        cList.push(c1);
        cList.push(c2);
        cList.push(c3);
        for(var i = 0;i<3;i++){
            var c_i = cList[i];
            if(c_i.H < cList[0].H){
                cList.splice(i,1);
                cList.unshift(c_i);
            }
            if(c_i.H > cList[2].H){
                cList.splice(i,1);
                cList.push(c_i);
            }
        }
        this.colorInfo.c1 = cList[0];
        this.colorInfo.c2 = cList[1];
        this.colorInfo.c3 = cList[2];
        console.log(cList);
        this.refreshColorList();
        this.fireEvent("colorChange");
    };
    GeoManager.prototype.refreshColorList = function(){
        var cList = [];
        cList.push(this.colorInfo.c1);
        cList.push(this.colorInfo.c2);
        cList.push(this.colorInfo.c3);
        var colorList = [];
        for(var i = 1;i<3;i++){
            var interval1= cList[i].H - cList[i-1].H;
            var iR1 = cList[i].R - cList[i-1].R;
            var iG1 = cList[i].G - cList[i-1].G;
            var iB1 = cList[i].B - cList[i-1].B;
            var iR1t,iG1t,iB1t;
            for(var m = 0;m<interval1;m++){
                iR1t = parseInt(parseInt(cList[i-1].R) + m*iR1/interval1);
                iG1t = parseInt(parseInt(cList[i-1].G) + m*iG1/interval1);
                iB1t = parseInt(parseInt(cList[i-1].B) + m*iB1/interval1);
                colorList.push("rgb(" + iR1t + "," + iG1t + "," + iB1t + ")");
            }
        }
        this.colorInfo.colorList = colorList;
    };

    return{
        getInstance: function () {
            if(!instance){
                instance = new GeoManager();
            }
            return instance;
        }
    }
});