/**
 * Created by wgw on 2016/8/14.
 */
var Sprite = require("./Sprite_c1");
var Bear = require("./O_Bear");
var Orc = require("./O_Orc");
var util = require("../../../../../dep/baBasicLib/util/baLib");
var GUID = require("../../../../../dep/baBasicLib/util/GUID");
var PI = Math.PI;

//默认输入控制
var defaultGMInput = {
    acc:0.1,//加速
    draw:0.3,//暂停
    tL:-0.3,//左转
    tR:0.3//右转
}

module.exports = Barracks;
function Barracks(prop){
    Sprite.call(this);
    this.id = GUID.getGUID();
    this.type = "barracks";
    this.camp = "orc";
    this.controllable = false;
    this.propInfo = {
        baseLife:500,
        life:500,
        accLength:4,
        accNum:5,
        baseDamage:5,//基础伤害
        maxAccDmg:15,//通过速度获得的最大伤害
        damage:5,//伤害
        attackRange:5,//攻击距离
        baseArmor:1,//基础护甲
        armor:1,//护甲
        maxKickBack:10,//受到负反馈的最大参考值
        maxHonor:10,//收到正反馈的最大参考值
        isDead:false
    };
    this.viewInfo = {
        stamp:0,
        baseActInterval:200,
        actInterval:200,
        range:100,
        data:[]
    };
    //移动数据
    this.moveInfo.maxStepLen = 1.5;
    this.moveInfo.stepLength = 0.2;
    this.attackInfo = {
        stamp:0,
        baseActInterval:100,
        actInterval:100
    };
    //制造兽人的相关信息
    this.orcGene = {
        stamp:0,
        interval:1000,
    };
    this.evilEye = {
        loc:{x:650,y:850},
        rad:50,
    };
    this.initialize(prop);
}

Barracks.prototype = new Sprite();
Barracks.prototype.addToGeo = function (geo) {
    this.geoInfo.bindGeo = geo;
    this.geoInfo.bindGeo.addQuaNode(this);
    var width = geo.width;
    var height = geo.height;
    var base_x = width*1.1;
    var base_y = height*1.1;
    var loc_x = base_x;
    var loc_y = base_y;
    var direction = 0;

    this.loc.x = loc_x;
    this.loc.y = loc_y;
    this.loc.direction = direction;
};
Barracks.prototype._upButton = function () {
}
Barracks.prototype._downButton = function () {
}
Barracks.prototype._leftButton = function(){
}
Barracks.prototype._rightButton = function(){
}
Barracks.prototype.action = function(){
    var self = this;
    var G = self.orcGene;
    var t = new Date().getTime();
    if(G.stamp == 0){
        G.stamp = t;
        return;
    };
    if(t - G.stamp > G.interval){
        self.generateOneOrc();
        G.stamp = t;
    }
}
//生成一个兽人
Barracks.prototype.generateOneOrc = function(){
    var self = this;
    var gm = self.GM;
    var sprite_i,sCount = 0;
    for(var i in gm.spriteList){
        sprite_i = gm.spriteList[i];
        if(sprite_i.type == "bear")sCount++;
    }
    if(sCount > 30)return;
    var orc = new Bear();
    orc.id = GUID.getGUID();
    self.GM.addSprite(orc);
    var prop = orc.getOutPut();
    self.GM.fireEvent("addSprite",{type:"bear",prop:{id:orc.id,loc:orc.loc}});
};
