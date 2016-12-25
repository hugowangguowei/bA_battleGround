/**
 * Created by wgw on 2016/8/17.
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

module.exports = Archer;
function Archer(prop){
    Sprite.call(this);
    this.id = GUID.getGUID();
    this.type = "archer";
    this.camp = "Rohan";
    this.propInfo = {
        baseLife:20,
        life:20,
        accLength:4,
        accNum:5,
        baseDamage:10,//基础伤害
        damage:10,//伤害
        attackRange:5,//攻击距离
        baseArmor:1,//基础护甲
        armor:1,//护甲
        maxKickBack:10,//受到负反馈的最大参考值
        maxHonor:10,//收到正反馈的最大参考值
        attackState:false,
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
    this.attackDis = {
        min:70,
        max:95,
        range:Math.PI*0.3,
        quaTreeRange:null
    }

    this.initialize(prop);
}

Archer.prototype = new Sprite();
