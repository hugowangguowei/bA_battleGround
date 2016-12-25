/**
 * Created by wgw on 2016/4/30.
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

module.exports = Bear;
function Bear(prop){
    Sprite.call(this);
    this.id = GUID.getGUID();
    this.type = "bear";
    this.camp = 'Orc';
    this.propInfo = {
        baseLife:20,
        life:20,
        accLength:4,
        accNum:5,
        baseDamage:5,//基础伤害
        maxAccDmg:15,//通过速度获得的最大伤害
        damage:5,//伤害
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
    this.moveInfo.maxStepLen = 1.5;
    this.moveInfo.stepLength = 0;
    //攻击数据
    this.attackInfo = {
        stamp:0,
        actInterval:100
    };
    this.initialize(prop);
}
Bear.prototype = new Sprite();
Bear.prototype.addToGeo = function (geo) {
    this.geoInfo.bindGeo = geo;
    this.geoInfo.bindGeo.addQuaNode(this);
    var width = geo.width;
    var height = geo.height;
    var base_x = width*0.7;
    var base_y = height*0.7;
    var ran_x = width*0.1;
    var ran_y = height*0.1;
    var loc_x = base_x + parseInt(Math.random()*ran_x);
    var loc_y = base_y + parseInt(Math.random()*ran_y);
    var direction = Math.random()*Math.PI*2;
    //var direction = Math.PI;

    this.loc.x = loc_x;
    this.loc.y = loc_y;
    this.loc.direction = direction;
};
Bear.prototype.getAim = function(viewObjList){
    var self = this;
    var friend = null,friendDis = self.viewInfo.range;
    var enemy = null,enemyDis = self.viewInfo.range;
    var len = viewObjList.length;
    if(len){
        for(var i = 0;i<len;i++){
            var sprite_i = viewObjList[i];
            if(sprite_i != self){
                var dis = util.getTwoSpriteDis(sprite_i,self);
                //判断阵营
                if(sprite_i.camp == self.camp){
                    if(dis < friendDis){
                        friend = sprite_i;
                        friendDis = dis;
                    }
                }
                else{
                    if(dis < enemyDis){
                        enemy = sprite_i;
                        enemyDis = dis;
                    }
                }
            }
        }
    }
    return {friend:friend,enemy:enemy};
};
Bear.prototype.getMoveDir = function () {
    var self = this;
    if(self.controller||self.moveInfo.static){
        return self.loc.direction;
    }
    var loc = self.loc;
    var curDir = self.loc.direction;
    var dir = curDir;
    var friend = self.aimInfo.friend;
    var friendDis = null;

    if(friend){
        friendDis = util.getTwoSpriteDis(friend,self);
    }
    if(friendDis && friendDis > 15){
        var aimLoc = friend.loc;
        dir = self.getDirByAimLoc(aimLoc);
        self.aimInfo.aimEmptySignal = self.aimInfo.aimEmptyInterval;
    }
    else{
        self.aimInfo.aimEmptySignal --;
        if(self.aimInfo.aimEmptySignal <= 0){
            dir += (Math.random()*0.7 - 0.35);
            self.aimInfo.aimEmptySignal = self.aimInfo.aimEmptyInterval;
        }
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
Bear.prototype.changeSpeedFunc = function(){
    var self = this;
    var pI = self.propInfo;
    var percent = self.getAccPercent();
    var armor = pI.maxAccArmor*(1-percent);
    self.propInfo.armor = self.propInfo.baseArmor + armor;
};
Bear.prototype.getDamage = function(damageNum){
    var self = this;
    var propInfo = self.propInfo;
    var realDamage;
    damageNum - propInfo.armor >0?realDamage = (damageNum - propInfo.armor):realDamage = 0;
    propInfo.life -= realDamage;
    var kickBack = propInfo.armor*0.1;
    kickBack > 1?kickBack = 1:kickBack;
    if(propInfo.life > 0){
        return {kickBack:kickBack,honor:0};
    }
    else{
        self.died();
        return {kickBack:kickBack,honor:0.5};
    }
};
Bear.prototype.damageCallback = function(info){
    var self = this;
    var kickBack = info.kickBack;
    var honor = info.honor;
    self.propInfo.life += honor*20;
    self.propInfo.baseDamage += honor*10;
    self.recordInfo.totalScore += honor;
};