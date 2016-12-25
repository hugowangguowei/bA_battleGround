/**
 * Created by wgw on 2016/7/15.
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

module.exports = Captain;
function Captain(prop){
    Sprite.call(this);
    this.id = GUID.getGUID();
    this.type = "captain";
    this.camp = "Rohan";
    this.propInfo = {
        baseLife:20,
        life:20,
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
    this.moveInfo.maxStepLen = 2.5;
    this.moveInfo.stepLength = 0.2;
    //战略数据
    this.strategyInfo.hasStrategy = true;
    this.strategyInfo.ability = {range:200,baseUnit:10,maxCtr:8};
    this.strategyInfo.curSt = {
        range:200,
        baseUnit:10,
        dataInfo:[{x:20,y:0}, {x:40,y:0}, {x:0,y:-10}, {x:0,y:10}, {x:0,y:-20}, {x:0,y:20}]
    }
    //攻击属性
    this.attackInfo = {
        stamp:0,
        baseActInterval:100,
        actInterval:100
    };
    this.initialize(prop);
}

Captain.prototype = new Sprite();
Captain.prototype.changeSpeedFunc = function(_speed){
    var self = this;
    var pI = self.propInfo;
    var percent = self.getAccPercent();
    var p = percent*pI.maxAccDmg;
    self.propInfo.damage = pI.baseDamage + p;
};
Captain.prototype.getAim = function(viewObjList){
    var self = this;
    var friend = null;
    var enemy = self.aimInfo.enemy,enemyDis = self.viewInfo.range;
    var isEnemyThere = false;
    if(enemy){
        if(!enemy.isDead){
            var dis = util.getTwoSpriteDis(enemy,self);
            if(dis < self.viewInfo.range)isEnemyThere = true;
        }else{
            enemy = null;
        }
    }
    var len = viewObjList.length;
    if(len){
        for(var i = 0;i<len;i++){
            var sprite_i = viewObjList[i];
            if(sprite_i != self){
                var dis = util.getTwoSpriteDis(sprite_i,self);
                //判断阵营
                if(sprite_i.camp == self.camp){
                    if(sprite_i.type == "knight"&&!sprite_i.leader){
                        self.addFollowToSt(sprite_i);
                    }
                }
                else{
                    if(!isEnemyThere && dis < enemyDis){
                        enemy = sprite_i;
                        enemyDis = dis;
                    }
                }
            }
        }
    }
    return {friend:friend,enemy:enemy};
};
Captain.prototype.getMoveDir = function(){
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
Captain.prototype.setAttackInterval = function (attResult) {
    var self = this;
    var p = self.getAccPercent();
    self.attackInfo.actInterval -= 20*p;
};
Captain.prototype.getDamage = function(damageNum){
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
Captain.prototype.damageCallback = function(info){
    var self = this;
    //负反馈结算（对于骑士来说，是减速）
    var kickBack = info.kickBack;
    self.changeSpeed(-5*kickBack);
    //正反馈结算（对骑士来说，是加血量）
    var honor = info.honor;
    self.propInfo.life += honor*20;
    self.propInfo.baseDamage += honor*10;
    self.recordInfo.totalScore += honor;
};