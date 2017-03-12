/**
 * Created by wgw on 2017/3/10.
 * 士兵池
 */
module.exports = Group;
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
        }
    }
}