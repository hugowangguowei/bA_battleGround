/**
 * Created by wgw on 2016/4/30.
 */


var baQuaTree = require('../../dep/baBasicLib/model/baQuaTree');
module.exports = Geo;

function Geo(){
    this.hasMap = false;
    this.width = 0;
    this.height = 0;
    this.xNum = 1;
    this.yNum = 1;
    this._w = 0;
    this._h = 0;
    this.quaTree = new baQuaTree();
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
        this._w = this.width/this.xNum;
        this._h = this.height/this.yNum;
        this.dataArray = geoInfo.dataArray;
        this.quaTree.bounds = {x:0,y:0,w:geoInfo.width,h:geoInfo.height};
        for(var i = 0;i<this.dataArray.length;i++){
            this.objectArray.push(0);
        }
    },
    addQuaNode:function(sprite){
        this.quaTree.insertSprite(sprite);
    },
    getLocByNum:function(i){
        if(i <0 || i>this.dataArray.length){
            return null;
        }
        var x = i%this.width;
        var y = parseInt(i/this.height);
        var loc = {x:x,y:y};
        return loc;
    },
    /**
     * 通过坐标获取地形信息
     * @param loc
     */
    getLandFormByLoc:function(loc){
        var _x = parseInt(loc.x/this._w);
        var _y = parseInt(loc.y/this._h);
        var lfX = this.dataArray[2*(this.xNum*_y + _x)]||0;
        var lfY = this.dataArray[2*(this.xNum*_y + _x) + 1]||0;
        return {x:lfX,y:lfY};
    },
    getQuaTreeInfo:function(){
        return this.quaTree;
    }
}