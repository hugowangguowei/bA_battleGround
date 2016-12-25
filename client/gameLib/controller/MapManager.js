/**
 * Created by wgw on 2016/4/27.
 */
define(function(require){
    var testMap = require('gameLib/test/script/revengerRoad/chapter_1/mapData');

    var instance = null;

    function MapManager(){

    }
    MapManager.prototype = {
        initialize:function(){

        },
        getMap:function(mapName){
            return testMap;
        }
    }

    return {
        getInstance:function(){
            if(!instance){
                instance = new MapManager();
            }
            return instance;
        }
    }
});