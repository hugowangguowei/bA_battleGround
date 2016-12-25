/**
 * Created by wgw on 2016/6/13.
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

module.exports = DarkTower;
function DarkTower(prop){
    Sprite.call(this);
    this.id = GUID.getGUID();
    this.type = "DarkTower";
    this.camp = "orc";
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

DarkTower.prototype = new Sprite();
DarkTower.prototype.addToGeo = function (geo) {
    this.geoInfo.bindGeo = geo;
    this.geoInfo.bindGeo.addQuaNode(this);
    var width = geo.width;
    var height = geo.height;
    var base_x = width*0.9;
    var base_y = height*0.9;
    var loc_x = base_x;
    var loc_y = base_y;
    var direction = 0;

    this.loc.x = loc_x;
    this.loc.y = loc_y;
    this.loc.direction = direction;
};
DarkTower.prototype._upButton = function () {
    this.evilEye.loc.y - 5 >=0?this.evilEye.loc.y -=5:this.evilEye.loc.y = 0;
}
DarkTower.prototype._downButton = function () {
    var geo = this.geoInfo.bindGeo;
    this.evilEye.loc.y + 5 <=geo.height?this.evilEye.loc.y +=5:this.evilEye.loc.y = geo.height;
}
DarkTower.prototype._leftButton = function(){
    this.evilEye.loc.x - 5 >=0?this.evilEye.loc.x -=5:this.evilEye.loc.x = 0;
}
DarkTower.prototype._rightButton = function(){
    var geo = this.geoInfo.bindGeo;
    this.evilEye.loc.x + 5 <=geo.width?this.evilEye.loc.x +=5:this.evilEye.loc.x = geo.width;
}
DarkTower.prototype.action = function(){
    var self = this;
    var G = self.orcGene;

    var t = new Date().getTime();
    if(G.stamp == 0){
        G.stamp = t;
        return;
    };
    if(t - G.stamp > G.interval){
        //self.generateOneOrc();
        self.evilWatch();
        G.stamp = t;
    }
}
//生成一个兽人
DarkTower.prototype.generateOneOrc = function(){
    var self = this;
    var orc = new Bear();
    orc.id = GUID.getGUID();
    self.GM.addSprite(orc);
    var prop = orc.getOutPut();
    self.GM.fireEvent("addSprite",{type:"bear",prop:{id:orc.id,loc:orc.loc}});
};
DarkTower.prototype.evilWatch = function(){
    var loc = this.evilEye.loc;
    var treeNode = this.geoInfo.bindGeo.quaTree.getNodeByLoc(loc);
    var dis = 100;
    var aim = null;
    for(var i= 0;i<treeNode.spriteList.length;i++){
        var sprite_i = treeNode.spriteList[i];
        if(sprite_i.camp != this.camp){
            var n_dis = Math.abs(sprite_i.loc.x - loc.x) + Math.abs(sprite_i.loc.y - loc.y);
            if(n_dis<dis){
                aim = sprite_i;
                dis = n_dis;
            }
        }
    }
    if(aim){
        var orc = new Orc();
        orc.id = GUID.getGUID();
        orc.loc.x  = this.loc.x;
        orc.loc.y = this.loc.y;
        orc.aimInfo.enemy = aim;
        this.GM.addSprite(orc);
        var prop = orc.getOutPut();
        this.GM.fireEvent("addSprite",{type:"orc",prop:{id:orc.id,loc:orc.loc}});
    }
};
DarkTower.prototype.getAim = function(viewObjList){
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
    }
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
    }

    return {friend:friend,enemy:enemy};
};
DarkTower.prototype.getMoveDir = function(){
    //var self = this;
    //if(self.controller){
    //    return self.loc.direction;
    //}
    //var aimInfo = self.aimInfo;
    //var curDir = self.loc.direction;
    //var dir = curDir;
    //if(aimInfo.aimLoc){
    //    var aimLoc = aimInfo.aimLoc;
    //    var _x = aimLoc.x - loc.x , _y = aimLoc.y - loc.y;
    //    if(_y > 0){
    //        dir = Math.atan(_y/_x);
    //    }
    //    else if(_y < 0){
    //        dir = Math.PI + Math.atan(_y/_x);
    //    }else{
    //        if(_x > 0){
    //            dir = 0;
    //        }else{
    //            dir = Math.PI;
    //        }
    //    }
    //    dir = (dir+Math.PI)%(2*Math.PI);
    //}
    //
    //var needRot = dir - curDir;
    //if(Math.abs(needRot) > self.propInfo.rotate){
    //    var i;
    //    Math.abs(needRot)==needRot?i = 1:i= -1;
    //    self.loc.direction += i*self.propInfo.rotate;
    //}else{
    //    self.loc.direction = dir;
    //}
    //return self.loc.direction;
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
        var _x = aimLoc.x - loc.x , _y = aimLoc.y - loc.y;
        if(_y > 0){
            dir = Math.atan(_y/_x);
        }
        else if(_y < 0){
            dir = Math.PI + Math.atan(_y/_x);
        }else{
            if(_x > 0){
                dir = 0;
            }else{
                dir = Math.PI;
            }
        }
        dir = (dir+Math.PI)%(2*Math.PI);

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
DarkTower.prototype.setAttackInterval = function (attResult) {
    var self = this;
    var p = self.getAccPercent();
    self.attackInfo.actInterval -= 20*p;
};
DarkTower.prototype.changeSpeedFunc = function(){
    var self = this;
    var pI = self.propInfo;
    var percent = self.getAccPercent();
    var p = percent*pI.maxAccDmg;
    self.propInfo.damage = pI.baseDamage + p;
};
DarkTower.prototype.getDamage = function(damageNum){
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
DarkTower.prototype.damageCallback = function(info){
    var self = this;
    var kickBack = info.kickBack;
    this.changeSpeed(-5*kickBack);
    var honor = info.honor;
    self.propInfo.life += honor*20;
    self.propInfo.baseDamage += honor*10;
};
DarkTower.prototype.getOutPut = function(info){
    return{
        id:this.id,
        type:this.type,
        loc:this.loc,
        propInfo:this.propInfo,
        evilEye:this.evilEye
    }
}
