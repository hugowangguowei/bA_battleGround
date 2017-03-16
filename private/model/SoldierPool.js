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
    this.reserveList = [];

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
    /**
     * 征召士兵
     * 被征召的士兵
     * @param args{[type,num,groupId]}分别表示征召的士兵类型和数量
     * @returns {boolean}
     */
    recruitment:function(args){
        var type = args[0];
        var soldiers = this.soldierList[type];
        var soldierNum = soldiers.length;
        var recruitNum = parseInt(args[1]);
        if(recruitNum > soldierNum){
            recruitNum = soldierNum;
        }
        var recruitSoldier = this.soldierList[type].splice(0,recruitNum);
        var reserveSoldier = {
            groupId:args[2],
            type:type,
            list:recruitSoldier
        }
        this.reserveList.push(reserveSoldier);
        return true;
    },
    getReserveList:function(){
        return this.reserveList;
    },
    getReserveSoldierByGroupId:function(id){
        for(var i = 0;i<this.reserveList.length;i++){
            var rL = this.reserveList[i];
            if(rL.groupId == id){
                this.reserveList.splice(i,1);
                return rL.list;
            }
        }
        return false;
    },
    getSoldierPoolInfo:function(){
        var info = [];
        var sArray;
        for(var type in this.soldierList){
            sArray = this.soldierList[type];
            var len = sArray.length;
            if(len){
                info.push({type:type,num:len});
            }
        }
        return info;
    }


}