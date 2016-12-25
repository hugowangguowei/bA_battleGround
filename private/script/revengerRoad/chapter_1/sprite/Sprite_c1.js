/**
 * Created by wgw on 2016/6/11.
 */

var Sprite = require("../../../../model/Sprite");
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

module.exports = Sprite_c1;
function Sprite_c1(prop){
    Sprite.call(this);
    this.id = GUID.getGUID();
    this.type = "sprite_c1";//类型
    this.camp = "default";//阵营
    this.AI = true;
    this.GM = null;
    this.leader = null;//指挥官
    this.controllable = true;
    this.controller = null;
    this.recordInfo = {
        totalScore:0
    };
    this.geoInfo = {
        bindGeo:null,
        quaTreeNode:null
    };
    this.quaTreeNode = null;
    this.loc = {
        x:0,
        y:0,
        direction:0
    };
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
    //属性控制状态：每回合都会重置，用以检测在本回合发生的属性改变
    this.propControlState = {
        isLocChanged : false,
        isSpeedChanged : false,
        isDirChanged : false
    };
    this.viewInfo = {
        stamp:0,
        baseActInterval:200,
        actInterval:200,
        range:50,
    };
    this.viewData = {
        range:50,
        objList:[]
    }
    this.moveInfo = {
        stamp:0,
        baseActInterval:40,
        actInterval:40,
        stepLength:0.2,
        acc:0.01,
        draw:-0.03,
        maxStepLen:3,
        minStepLen:0,
        climbAbility:2,
        static:true,
    };
    this.attackInfo = {
        stamp:0,
        baseActInterval:100,
        actInterval:100
    };
    this.aimInfo = {
        aimLoc:null,
        aimObj:null,
        friend:null,
        enemy:null,
        aimEmptyInterval:20,
        aimEmptySignal:20
    };
    this.strategyInfo = {
        hasStrategy:false,
        ability:{range:100,baseUnit:10,maxCtr:5},
        sList:[],
        curSt:null,
        followList:[],
        curStNum:0
    };
    this.orderInfo = {
        follow:null,
        toLoc:null,
        toDir:null,
        rush:null
    };
    this.testSignal = {
        watch:false,
        halt:false
    };
    this.initialize(prop);
}
Sprite_c1.prototype = new Sprite();
Sprite_c1.prototype.initialize = function(prop){
    var self = this;
    for(var i in prop){
        self[i] = prop[i];
    }
};
