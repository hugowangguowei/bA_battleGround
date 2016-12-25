/**
 * Created by wgw on 2016/2/16.
 */
define(function(require){
    var basicBlock = require('privateLib/basicBlock');
    function bB_memCtrl(id,x,y,w,h){
        basicBlock.call(this);
        this.id = id;
        this.type = "memCtrl";
        this.x = x||0;
        this.y = y||0;
        this.width = w||100;
        this.height = h||100;
        this.isInit = false;
        this.cacheCanvas = document.createElement("canvas");
        this.cacheOutDate = false;
        this.isPrivate = true;
        this.isFocusOn = false;

        this._memberType = "leader";
        this._userInfo = 0;
    }

    bB_memCtrl.prototype = new basicBlock();
    bB_memCtrl.prototype.cacheRefresh = function(){
        var self = this;

        var canvas = this.cacheCanvas;
        var cxt = canvas.getContext("2d");

        cxt.fillStyle = "#4aa3df";
        cxt.fillRect(0,0,canvas.width,canvas.height);
        cxt.strokeStyle = "#2980b9";
        cxt.strokeRect(0,0,canvas.width,canvas.height);
        cxt.fillStyle = "black";
        cxt.textAlign = "center";
        cxt.fillText(this.name,canvas.width/2,canvas.height/2);
    }
    bB_memCtrl.prototype.inputEvent = function(eventType){
        console.log("接收了" + eventType + "事件");
    }

    return bB_memCtrl;
});

