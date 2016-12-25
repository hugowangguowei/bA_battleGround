/**
 * Created by wgw on 2016/4/27.
 */
var testMap = require('../test/script/revengerRoad/chapter_1/mapData');

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
        return testMap;
    }
}