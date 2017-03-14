/**
 * Created by wgw on 2017/3/10.
 * 士兵池
 */
module.exports = SoldierPool;
var GUID = require("../../dep/baBasicLib/util/GUID");
var spriteManager = require("../controller/SpriteManager").getInstance();

function SoldierPool(camp){
    this.id = GUID.getGUID();
    this.camp = camp;
    this.soldierList = {};

}
SoldierPool.prototype = {
    inputSampleSoldiers:function(){
        var sprite_i;
        for(var i = 0;i<2;i++){
            sprite_i = spriteManager.generateSpriteByType("footMan");
            this.addSpriteToList(sprite_i);
            sprite_i = spriteManager.generateSpriteByType("knight");
            this.addSpriteToList(sprite_i);
            sprite_i = spriteManager.generateSpriteByType("archer");
            this.addSpriteToList(sprite_i);
        }
    },
    addSpriteToList:function(sprite){
        var type = sprite.getType();
        if(!this.soldierList[type]){
            this.soldierList[type] = [];
        }
        this.soldierList[type].push(sprite);
    },
    getSoldierPoolInfo:function(){
        var info = [];
        var sArray;
        for(var type in this.soldierList){
            sArray = this.soldierList[type];
            var len = sArray.length;
            info.push({type:type,num:len});
        }
        return info;
    }

}