/**
 * Created by wgw on 2016/8/15.
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

module.exports = King;
function King(prop){
    Sprite.call(this);
    this.id = GUID.getGUID();
    this.type = "king";
    this.camp = "Rohan";
    this.propInfo = {
        baseLife:30,
        life:30,
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
    this.moveInfo.maxStepLen = 3;
    this.moveInfo.stepLength = 0.1;

    this.attackInfo = {
        stamp:0,
        baseActInterval:100,
        actInterval:100
    };
    this.initialize(prop);
}

King.prototype = new Sprite();
King.prototype.addToGeo = function (geo) {
    this.geoInfo.bindGeo = geo;
    this.geoInfo.bindGeo.addQuaNode(this);
    var direction = Math.random()*Math.PI*2;

    this.loc.x = 479;
    this.loc.y = 185;
    this.loc.direction = direction;
};
King.prototype.getAim = function(viewObjList){
    var self = this;
    var friend = null,friendDis = self.viewInfo.range;
    var enemy = self.aimInfo.enemy,enemyDis = self.viewInfo.range;
    var isEnemyThere = false;
    if(enemy){
        if(!enemy.isDead){
            var dis = util.getTwoSpriteDis(enemy,self);
            if(dis < self.viewInfo.range)isEnemyThere = true;
        }else{
            enemy = null;
        }
    };
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
                }else{
                    if(!isEnemyThere && dis < enemyDis){
                        enemy = sprite_i;
                        enemyDis = dis;
                    }
                }
            }
        }
    };
    return {friend:friend,enemy:enemy};
};
King.prototype.getMoveDir = function(){
    var self = this;
    if(self.controller){
        return self.loc.direction;
    }
    var loc = self.loc;
    var curDir = self.loc.direction;
    var dir = curDir;
    var enemy = self.aimInfo.enemy;
    if(enemy){
        var aimLoc = enemy.loc;
        dir = self.getDirByAimLoc(aimLoc);
        self.aimInfo.aimEmptySignal = self.aimInfo.aimEmptyInterval;
    }
    else{
        self.aimInfo.aimEmptySignal --;
        if(self.aimInfo.aimEmptySignal <= 0){
            dir += (Math.random()*0.5 - 0.25);
            self.aimInfo.aimEmptySignal = self.aimInfo.aimEmptyInterval;
        }
    }

    var needRot = dir - curDir;
    if(Math.abs(needRot) > self.propInfo.rotate){
        var i;
        Math.abs(needRot)==needRot?i = 1:i= -1;
        self.loc.direction += i*self.propInfo.rotate;
    }
    else{
        self.loc.direction = dir;
    }
    return self.loc.direction;
};
King.prototype.setAttackInterval = function (attResult) {
    var self = this;
    var p = self.getAccPercent();
    self.attackInfo.actInterval -= 20*p;
};
King.prototype.changeSpeedFunc = function(){
    var self = this;
    var pI = self.propInfo;
    var percent = self.getAccPercent();
    var p = percent*pI.maxAccDmg;
    self.propInfo.damage = pI.baseDamage + p;
};
King.prototype.getDamage = function(damageNum){
    var self = this;
    var propInfo = self.propInfo;
    var realDamage;
    damageNum - propInfo.armor >0?realDamage = (damageNum - propInfo.armor):realDamage = 0;
    propInfo.life -= realDamage;

    var kickBack = propInfo.armor*01;
    kickBack > 1?kickBack = 1:kickBack;
    if(propInfo.life > 0){
        return {kickBack:kickBack,honor:0};
    }else{
        self.died();
        return {kickBack:kickBack,honor:0.5};
    }
};
King.prototype.damageCallback = function(info){
    var self = this;
    //负反馈结算（对于骑士来说，是减速）
    var kickBack = info.kickBack;
    this.changeSpeed(-5*kickBack);

    //正反馈结算（对骑士来说，是加血量）
    var honor = info.honor;
    self.propInfo.life += honor*20;
    self.propInfo.baseDamage += honor*10;
    self.recordInfo.totalScore += honor;
};
