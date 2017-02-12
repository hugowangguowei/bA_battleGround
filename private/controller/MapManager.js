/**
 * Created by wgw on 2016/4/27.
 */
//var testMap = require('../test/script/revengerRoad/chapter_1/mapData');

var instance = null;
exports.getInstance = function(){
    if(!instance){
        instance = new MapManager();
    }
    return instance;
}

function MapManager(){

}
MapManager.prototype = {
    initialize:function(){

    },
    getMap:function(mapName){
        return null;
    },
    getRandomTerraType:function(){
        var m = Math.random();
        var type;
        if(m < 0.4){
            type = "plant";
        }else if(m<0.7){
            type = "mount";
        }else{
            type = "sea";
        }
        return type;
    }
}