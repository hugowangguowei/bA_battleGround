/**
 * Created by wgw on 2016/6/29.
 */
define(function (require) {
    var Sprite = require("gameLib/model/sprite/Sprite");
    var util = require("baBasicLib/util/baLib");
    var GUID = require("baBasicLib/util/GUID");
    var bearView = require("gameLib/script/revengerRoad/chapter_1/spriteView/BearView");

    function Sprite_c1(prop){
        Sprite.call(this);
        this.id = GUID();
        this.type = "sprite_c1";
        this.bindView = null;
        this.AI = true;
        this.GM = null;
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
            baseLife:10,
            life:10,
            accLength:4,
            accNum:5,
            damage:5,
            isDead:false
        };
        this.viewInfo = {
            stamp:0,
            actInterval:200,
            range:50,
            data:[]
        };
        this.moveInfo = {
            stamp:0,
            actInterval:40,
            stepLength:2,
            climbAbility:2
        };
        this.attackInfo = {
            stamp:0,
            actInterval:100
        };
        this.aimInfo = {
            aimLoc:null,
            aimObj:null,
            aimEmptyInterval:20,
            aimEmptySignal:20
        };
        this.testSignal = {
            watch:false
        };
        this.strategyInfo = {
            hasStrategy:false,
            ability:{range:100,baseUnit:10,maxCtr:5},
            sList:[]
        };
        //this.initialize(prop);
    }

    Sprite_c1.prototype = new Sprite();
    Sprite_c1.prototype.initialize = function(prop){
        var self = this;
        for(var i in prop){
            self[i] = prop[i];
        }
    };
    Sprite_c1.prototype.addToGeo = function(geo){
        this.geoInfo.bindGeo = geo;
        this.geoInfo.bindGeo.addQuaNode(this);
    };
    Sprite_c1.prototype.refreshGeo = function(){
        if(this.geoInfo.quaTreeNode){
            this.geoInfo.quaTreeNode.deleteSprite(this);
            this.geoInfo.bindGeo.addQuaNode(this);
        }else{
        }
    }
    Sprite_c1.prototype.removeFromGeo = function(){
        if(this.geoInfo.quaTreeNode){
            this.geoInfo.quaTreeNode.deleteSprite(this);
        }
    }
    Sprite_c1.prototype.action = function(){
        if(this.AI){
            this.viewHandle();
            this.moveHandle();
            this.attackHandle();
        }
    };

    Sprite_c1.prototype.viewHandle = function(){
        //view事件触发判断
        var self = this;
        var viewInfo = this.viewInfo;
        var _t = new Date().getTime();
        if(_t - viewInfo.stamp < viewInfo.actInterval){
            return;
        }
        viewInfo.stamp = _t;
        viewInfo.actInterval += (Math.random()*300 - 150);

        var viewObjList = _getObjInView();
        var aimObj = _getAim(viewObjList);
        _setAim(aimObj);

        function _getObjInView(){
            var loc = self.loc;
            var viewInfo = self.viewInfo;
            var quaTreeNode = self.geoInfo.quaTreeNode;
            if(!quaTreeNode){
                console.log("can't find own tree");
                return [];
            }

            var w = quaTreeNode.bounds.w;
            var spriteList = quaTreeNode.spriteList;
            var list = [];
            if(w <= viewInfo.range){
                list = spriteList;
            }
            else{
                for(var i = 0,len = spriteList.length;i<len;i++){
                    var sprite_i = spriteList[i];
                    if(util.getTwoSpriteDis(sprite_i,self) <= viewInfo.range){
                        list.push(sprite_i);
                    }
                }
                if(list.length>1 && self.testSignal.watch){
                }
            }
            return list;
        };
        function _getAim(viewObjList){
            var len = viewObjList.length;
            if(!len){
                return 0;
            }
            var num = parseInt(Math.random() * len);
            var aimObj = viewObjList[num];
            if(aimObj == self){
                viewObjList.splice(num,1);
                aimObj = _getAim(viewObjList);
            }
            return aimObj;
        };
        function _setAim(aimObj){
            //console.log("------------------------------")
            //console.log("old--------");
            //if(!self.aimInfo.aimObj){
            //    console.log("noAim");
            //}else{
            //    console.log(self.aimInfo.aimObj.id);
            //}
            //console.log("new--------");
            //if(!aimObj){
            //    console.log("noObj");
            //}else{
            //    console.log(aimObj.id);
            //}

            var aimInfo = self.aimInfo;
            self.aimInfo.aimObj = aimObj;
            if(aimObj){
                self.aimInfo.aimLoc = {x:aimObj.loc.x,y:aimObj.loc.y};
                self.aimInfo.aimEmptySignal = aimInfo.aimEmptyInterval;
            }
            else{
                self.aimInfo.aimEmptySignal--;
                self.aimInfo.aimLoc = 0;
                if(self.aimInfo.aimEmptySignal <= 0){
                    self.aimInfo.aimEmptySignal = self.aimInfo.aimEmptyInterval;
                    self.loc.direction = Math.random()* 0.6 - 0.3 + self.loc.direction;
                }
            }
        }
    };
    Sprite_c1.prototype.moveHandle = function () {
        var self = this;
        var moveInfo = this.moveInfo;
        var _t = new Date().getTime();
        if(_t - moveInfo.stamp < moveInfo.actInterval){
            return;
        }
        moveInfo.stamp = _t;

        var loc = this.loc;
        var speed = _getSpeed();
        var dir = _getDir();
        loc.x += speed * Math.cos(dir);
        loc.y += speed * Math.sin(dir);
        var geoInfo = this.geoInfo.bindGeo;
        if(loc.x <= 0||loc.x >= geoInfo.width){
            loc.direction = Math.PI - loc.direction;
        }
        if(loc.y <= 0||loc.y >= geoInfo.height){
            loc.direction = -1*loc.direction;
        }

        self.refreshGeo();

        //获取速度
        function _getSpeed(){
            var moveInfo = self.moveInfo;
            var aimInfo = self.aimInfo;
            var baseSpeed = moveInfo.stepLength;
            if(aimInfo.aimObj){
            }
            return baseSpeed;
        };
        //获取方向
        function _getDir(){
            var aimInfo = self.aimInfo;
            var dir = 0;
            if(aimInfo.aimLoc){
                var aimLoc = aimInfo.aimLoc;
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
                self.loc.direction = dir;
            }

            return self.loc.direction;

        }
    };
    Sprite_c1.prototype.attackHandle = function(){
        var self = this;
        var attackInfo = this.attackInfo;
        var _t = new Date().getTime();
        if(_t - attackInfo.stamp < attackInfo.actInterval){
            return;
        }
        attackInfo.stamp = _t;

        var aimInfo = self.aimInfo;
        //if(aimInfo.aimObj&&aimInfo.aimObj.isAttackable(this)){
        if(aimInfo.aimObj){
            //var sLife = self.propInfo.life;
            //var aLife = aimInfo.aimObj.propInfo.life;
            //if(sLife >= aLife){
            var damageCount = _damageCount();
            var damageResult = aimInfo.aimObj.getDamage(damageCount);
            _damageCallback(damageResult);
            //}
        }else{

        }

        function _damageCount(){
            return self.propInfo.damage;
        }
        function _damageCallback(info){
            switch (info){
                case "killed":
                    _killOne();
                    break;
                case 0:
                    break;
            }
        }
        function _killOne(){
            var propInfo = self.propInfo;
            propInfo.life += 10;
            propInfo.damage += 1;
        }
    };
    Sprite_c1.prototype.getDamage = function(damageNum){
        var self = this;
        var propInfo = self.propInfo;
        propInfo.life -= damageNum;
        if(propInfo.life > 0){
            return 0;
        }else{
            if(!self.geoInfo.quaTreeNode){
                console.log("queTreeNotExist");
            }
            self.died();
            return "killed";
        }
    };
    Sprite_c1.prototype.died = function(){
        if(!this.geoInfo.quaTreeNode){
            console.log("!!");
        }
        if(!this.geoInfo.quaTreeNode.deleteSprite(this)){
        };

        this.GM.removeSprite(this);
        this.GM.fireEvent('removeSprite',this.id);
    };
    Sprite_c1.prototype.isDead = function(){
        if(this.propInfo.life <= 0){
            return true;
        }
        return false;
    };
    Sprite_c1.prototype.isAttackable = function(beater){
        var self = this;
        var sLife = self.propInfo.life;
        var bLife = beater.propInfo.life;
        if(sLife<=bLife)
            return true;
        return false;
    };
    Sprite_c1.prototype.getOutPut = function(){
        //TODO 现在的情况是不论sprite Change与否都会返回
        return{
            id:this.id,
            type:this.type,
            loc:this.loc,
            viewData:this.viewInfo.data
        }
    };
    return Sprite_c1;
})