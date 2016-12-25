/**
 * Created by wgw on 2016/10/7.
 * 负责管理绘制块
 */
define(function(require){
    "use strict";
    var instance = null;
    var baEventSource = require("baBasicLib/baEventSource");
    var Block = require("mapLib/model/Block");

    function BlockManager(){
        baEventSource.call(this);
        this.type = "BlockManager";
        this.basicBlockList = [];
        this.initialize();

    }
    BlockManager.prototype = new baEventSource();
    BlockManager.prototype.initialize = function(){
        var self = this;
        var glass = new Block("grass",0,0,0,"green");
        var river = new Block("river",2,2,1,"blue");
        this.basicBlockList.push(glass);
        this.basicBlockList.push(river);
    };
    BlockManager.prototype.getBasicBlockList = function(num){
        return this.basicBlockList;
    };


    return{
        getInstance: function () {
            if(!instance){
                instance = new BlockManager();
            }
            return instance;
        }
    }
});