/**
 * Created by wgw on 2016/4/30.
 */
define(function (require) {
    var Sprite = require("gameLib/model/sprite/Sprite");
    var util = require("baBasicLib/util/baLib");
    var GUID = require("baBasicLib/util/GUID");
    var bearView = require("gameLib/script/revengerRoad/chapter_1/spriteView/BearView");
    function Bear(prop){
        Sprite.call(this);
        this.id = GUID();
        this.type = "bear";
        this.AI = true;
        this.GM = null;
        this.bindView = new bearView(this);
        this.geoInfo = null;
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
            damage:5
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
        }
        this.aimInfo = {
            aimLoc:null,
            aimObj:null,
            aimEmptyInterval:20,
            aimEmptySignal:20
        }
        this.interfereInfo = {

        };
        this.testSignal = {
            watch:false
        };
        this.initialize(prop);
    }

    Bear.prototype = new Sprite();
    Bear.prototype.initialize = function(prop){
        var self = this;
        for(var i in prop){
            self[i] = prop[i];
        }
    }
    Bear.prototype.addToGeo = function(geoInfo){
        this.geoInfo = geoInfo;

        var width = geoInfo.width;
        var height = geoInfo.height;
        var loc_x = parseInt(Math.random()*width);
        var loc_y = parseInt(Math.random()*height);
        var direction = Math.random()*Math.PI*2;
        this.loc.x = loc_x;
        this.loc.y = loc_y;
        this.loc.direction = direction;
        this.geoInfo.addQuaNode(this);

    };
    Bear.prototype.refreshGeo = function(){
        if(this.quaTreeNode){
            this.quaTreeNode.deleteSprite(this);
            this.geoInfo.addQuaNode(this);
        }else{
            //console.log(this.propInfo.life);
        }
    };
    Bear.prototype.removeFromGeo = function(){

    };
    Bear.prototype.action = function(){
        if(this.AI){
            this.viewHandle();
            this.moveHandle();
            //this.attackHandle();
        }
    };
    Bear.prototype.viewHandle = function(){
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
            var quaTreeNode = self.quaTreeNode;
            if(!quaTreeNode)
                return [];
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
                    console.log(list);
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
            var aimInfo = self.aimInfo;
            aimInfo.aimObj = aimObj;
            if(aimObj){
                aimInfo.aimLoc = {x:aimObj.loc.x,y:aimObj.loc.y};
                aimInfo.aimEmptySignal = aimInfo.aimEmptyInterval;
            }
            else{
                aimInfo.aimEmptySignal--;
                aimInfo.aimLoc = 0;
                //console.log(aimInfo.aimEmptySignal);
                //console.log(self.loc.direction);
                if(aimInfo.aimEmptySignal <= 0){
                    aimInfo.aimEmptySignal = aimInfo.aimEmptyInterval;
                    self.loc.direction = Math.random()* 0.6 - 0.3 + self.loc.direction;
                }
            }

        }
    };
    Bear.prototype.moveHandle = function () {
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

        var geoInfo = this.geoInfo;
        if(loc.x <= 0||loc.x >= geoInfo.width){
            loc.direction = Math.PI - loc.direction;
        }
        if(loc.y <= 0||loc.y >= geoInfo.height){
            loc.direction = -1*loc.direction;
        }



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
    Bear.prototype.attackHandle = function(){
        var self = this;
        var attackInfo = this.attackInfo;
        var _t = new Date().getTime();
        if(_t - attackInfo.stamp < attackInfo.actInterval){
            return;
        }
        attackInfo.stamp = _t;

        var aimInfo = self.aimInfo;
        if(aimInfo.aimObj){
            var damageCount = _damageCount();
            var damageResult = aimInfo.aimObj.getDamage(damageCount);
            _damageCallback(damageResult);
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
    Bear.prototype.getDamage = function(damageNum){
        var self = this;
        var propInfo = self.propInfo;
        propInfo.life -= damageNum;
        if(propInfo.life > 0){
            return 0;
        }else{
            self.died();
            return "killed";
        }
    };
    Bear.prototype.died = function(){
        if(!this.quaTreeNode){
            console.log("quaTreeNodeNotExist");
        }
        if(!this.quaTreeNode.deleteSprite(this)){
        };
        this.GM.removeSprite(this);
    };
    Bear.prototype.getOutPut = function(){
        return{
            id:this.id,
            type:this.type,
            loc:this.loc,
            viewData:this.viewInfo.data
        }
    };

    return Bear;
})