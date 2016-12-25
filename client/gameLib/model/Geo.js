/**
 * Created by wgw on 2016/4/30.
 */
define(function (require) {
    var baQuaTree = require('baBasicLib/model/baQuaTree');
    function Geo(){
        this.hasMap = false;
        this.width = 0;
        this.height = 0;
        this.quaTree = new baQuaTree();
        this.xNum = 0;
        this.yNum = 0;
        this.backgroundPic = null;
        this.dataArray = [];
        this.objectArray = [];

    }

    Geo.prototype = {
        generateByFile:function(geoInfo){
            this.width = geoInfo.width;
            this.height = geoInfo.height;
            this.xNum = geoInfo.xNum;
            this.yNum = geoInfo.yNum;
            this.dataArray = geoInfo.dataArray;
            this.quaTree.bounds = {x:0,y:0,w:geoInfo.width,h:geoInfo.height};
            for(var i = 0;i<this.dataArray.length;i++){
                this.objectArray.push(0);
            }
        },
        addQuaNode:function(sprite){
            var node = this.quaTree.insertSprite(sprite);
            //sprite.geoInfo.quaTreeNode = node;
        },
        getLocByNum:function(i){
            if(i <0 || i>this.dataArray.length){
                return null;
            }
            var x = i%this.width;
            var y = parseInt(i/this.height);
            var loc = {x:x,y:y};
            return loc;
        }
    }

    return Geo;
})