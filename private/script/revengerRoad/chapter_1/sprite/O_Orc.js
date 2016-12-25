/**
 * Created by wgw on 2016/6/13.
 */
var Sprite = require("./Sprite_c1");
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

module.exports = Orc;
function Orc(prop){
    Sprite.call(this);
    this.id = GUID.getGUID();
    this.type = "orc";
    this.camp = 'Orc';
    this.controllable = false;
    this.propInfo = {
        baseLife:20,
        life:20,
        accLength:4,
        accNum:5,
        baseDamage:5,//基础伤害
        maxAccDmg:15,//通过速度获得的最大伤害
        damage:15,//伤害
        attackRange:6,//攻击距离
        baseArmor:1,//基础护甲
        maxAccArmor:5,//通过固守获得的最大护甲
        armor:1,//护甲
        maxKickBack:10,//受到负反馈的最大参考值
        maxHonor:10,//收到正反馈的最大参考值
        isDead:false
    };
    this.viewInfo = {
        stamp:0,
        actInterval:200,
        range:50,
        data:[]
    };
    //移动数据
    this.moveInfo.maxStepLen = 2.2;
    this.moveInfo.stepLength = 2.2;
    this.attackInfo = {
        stamp:0,
        actInterval:100
    };
    this.orderList = [];
    this.initialize(prop);
}
Orc.prototype = new Sprite();
Orc.prototype.viewHandle = function(){
    //Orc不需要视觉。。
};
Orc.prototype.addToGeo = function (geo) {
    this.geoInfo.bindGeo = geo;
    this.geoInfo.bindGeo.addQuaNode(this);
    var width = geo.width;
    var height = geo.height;
    var base_x = width*0.6;
    var base_y = height*0.6;
    var ran_x = width*0.1;
    var ran_y = height*0.1;
    var loc_x = base_x + parseInt(Math.random()*ran_x);
    var loc_y = base_y + parseInt(Math.random()*ran_y);
    var direction = Math.PI;

    this.loc.x = loc_x;
    this.loc.y = loc_y;
    this.loc.direction = direction;
};
Orc.prototype.getMoveDir = function () {
    var self = this;
    var aimObj = self.aimInfo.enemy;
    var dir;
    var curDir = self.loc.direction;

    if(aimObj&&!aimObj.isDead()){
        var aimLoc = aimObj.loc;
        dir = self.getDirByAimLoc(aimLoc);
    }
    else{
        self.killSelf();
    }
    var needRot = dir - curDir;
    if(Math.abs(needRot) > self.propInfo.rotate){
        var i;
        Math.abs(needRot)==needRot?i = 1:i= -1;
        self.loc.direction += i*self.propInfo.rotate;
    }else{
        self.loc.direction = dir;
    }
    return self.loc.direction;
};
Orc.prototype.changeSpeedFunc = function(){
    var self = this;
    var pI = self.propInfo;
    var percent = self.getAccPercent();
    var armor = pI.maxAccArmor*(1-percent);
    self.propInfo.armor =self.propInfo.baseArmor + armor;
};
Orc.prototype.getDamage = function(damageNum){
    var self = this;
    var propInfo = self.propInfo;
    var realDamage;
    damageNum - propInfo.armor >0?realDamage = (damageNum - propInfo.armor):realDamage = 0;
    propInfo.life -= realDamage;

    var kickBack = propInfo.armor*0.1;
    kickBack > 1?kickBack = 1:kickBack;
    if(propInfo.life > 0){
        return {kickBack:kickBack,honor:0};
    }else{
        self.died();
        return {kickBack:kickBack,honor:0.5};
    }
};
Orc.prototype.damageCallback = function(info){
    var self = this;
    //小熊没有。。负反馈
    var kickBack = info.kickBack;
    //(self.moveInfo.stepLength - 5*kickBack)>0?self.moveInfo.stepLength -=5*kickBack:self.moveInfo.stepLength = 0;
    //self.speedChanged();

    //正反馈结算（对骑士来说，是加血量）
    var honor = info.honor;
    self.propInfo.life += honor*20;
    self.propInfo.baseDamage += honor*10;
};