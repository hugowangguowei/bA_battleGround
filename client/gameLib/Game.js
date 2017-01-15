/**
 * Created by wgw on 2016/4/18.
 */
define(function(require){
    var spriteManager = require("gameLib/controller/SpriteManager").getInstance();
    var groupManager = require("gameLib/controller/GroupManager").getInstance();
    var Camp = require("gameLib/model/Camp");
    var BattleGround = require("gameLib/model/BattleGround");
    var Geo = require("gameLib/model/Geo");
    var baEventSource = require("baBasicLib/baEventSource");
    var errorCheck = require("gameLib/webSocket/WS_errorCheck");
    //TODO 要写成单例
    function Game(initInfo){
        baEventSource.call(this);
        this.geoInfo = new Geo();
        this.spriteList = {};
        this.spriteCount = 0;
        this.controlSprite = null;
        this.obstacleList = null;
        this.timer = {
            timerTask:null,
            frameSpeed:40
        }
        this._eventPool = {};
        this._selfCamp = null;
        this.initialize(initInfo);
    }

    Game.prototype = new baEventSource();
    Game.prototype.initialize = function(initInfo){};
    Game.prototype.loadChapter = function(chapterInfo,charaInfo,isLeader){
        if(chapterInfo.Map){
            this.geoInfo.generateByFile(chapterInfo.Map);
            this.fireEvent('geoChange');
        };
        if(chapterInfo.Sprite){
            var spriteList = chapterInfo.Sprite;
            for(var i in spriteList){
                var num = spriteList[i].num;
                for(var m = 0;m<num;m++){
                    var sprite_i = spriteManager.generateSpriteByType(i);
                    sprite_i.id = i + "_" + m;
                    this.addSprite(sprite_i);
                }
            }
        };
        this.battleGround = new BattleGround();

        this.startEngine();
    };
    Game.prototype.startEngine = function(){
        var self = this;
        self.timer.timerTask = setInterval(function(){
            for(var i in self._eventPool){
                if(self._eventPool[i].changed){
                    self.fireEvent(i,self._eventPool[i].args);
                    self._eventPool[i].changed = false;
                }
            }
        },self.timer.frameSpeed);
    };
    Game.prototype.getSyn = function (msg) {
        console.log("beginSyn");
        var t1 = new Date().getTime();
        var self = this;
        if(!msg.length){
            return false;
        }
        var id,type,ctrName,detail;
        outerLoop:
        for(var i in self.spriteList){
            var sprite_i = self.spriteList[i];
            var isExist = false;
            innerLoop:
            for(var m = 0;m < msg.length;m++){
                var sInfo_m = msg[m];
                if(sprite_i.id == sInfo_m.id){
                    isExist = true;
                    break innerLoop;
                }
            }
            if(!isExist){
                self.removeSprite(sprite_i);
            }
        }
        for(var i = 0;i<msg.length;i++){
            var sInfo_i = msg[i];
            if(!self.spriteList[sInfo_i.id]){
                type = sInfo_i.type;
                id = sInfo_i.id;
                ctrName = sInfo_i.ctrName;
                detail = {type:type,prop:{id:id,ctrName:ctrName}};
                var sprite_i = spriteManager.generateSpriteByDetail(detail);
                self.addSprite(sprite_i);
            }
            else{
                for(var p in sInfo_i){
                    self.spriteList[sInfo_i.id][p] = sInfo_i[p];
                };
            }
        }
        var t2 = new Date().getTime();
        console.log(t2 - t1);
    };
    Game.prototype.input = function (type,info,packNum){
        var self = this;
        switch (type){
            case "addSprite":
                var sprite_i = spriteManager.generateSpriteByDetail(info);
                self.addSprite(sprite_i);
                //self.fireEvent("spriteChange");
                self.addEventToPool("spriteChange");
                break;
            case "refreshSprite":
                for(var i = 0;i<info.length;i++){
                    var sInfo = info[i];
                    var id = sInfo.id;
                    var sprite = self.spriteList[id];
                    if(sprite){
                        for(var m in sInfo){
                            sprite[m] = sInfo[m];
                        }
                        //sprite.refreshGeo();
                    }
                    else{
                        //之所以会有{！sprite}事件的发生，是因为角色死亡事件立刻触发
                        //但是角色更新操作需要当前所有对象更新完成后才会触发事件
                        //所以有可能当一个角色先执行了动作，该动作会被推送入refreshList
                        //然后在同一帧，该角色被杀死了，就会出现这个问题
                        //更新机制还需要改进。
                    }
                }
                self.addEventToPool("spriteChange",info);
                break;
            case "removeSprite":
                self.removeSpriteById(info);
                self.addEventToPool("spriteChange",info);
                break;
            case "gameOver":
                alert(info.detail);
                self.addEventToPool("recordChange",info.record);
                break;
        }
    };
    Game.prototype.addEventToPool = function(eventType,info){
        var _info = info||0;
        this._eventPool[eventType] = {changed:true,args:_info};
    };
    Game.prototype.addSprite = function(sprite_i){
        sprite_i.GM = this;
        sprite_i.addToGeo(this.geoInfo);
        this.spriteList[sprite_i.id] = sprite_i;
        this.spriteCount++;
    };
    Game.prototype.removeSprite = function(sprite){
        for(var i in this.spriteList){
            var sprite_i = this.spriteList[i];
            if(sprite_i == sprite){
                console.log("lost One Sprite");
                delete this.spriteList[i];
                this.spriteCount--;
                return true;
            }
        }
        return false;
    };
    Game.prototype.getSpriteById = function(id){
        for(var i in this.spriteList){
            var sprite_i = this.spriteList[i];
            if(sprite_i.id == id){
                return sprite_i;
            }
        }
        return false;
    };
    Game.prototype.removeSpriteById = function(id){
        if(this.spriteList[id]){
            this.spriteList[id].removeFromGeo();
            delete this.spriteList[id];
            this.spriteCount--;
            return true;
        }
        return false;
    };
    Game.prototype.testCampInput = function(type,info){
        switch (type){
            case "selfCamp":
                this._generateCamp(info);
                break;
            case "soldierArrange":
                this._solderArrange(info);
                break;
        }
    };
    Game.prototype._generateCamp = function(campInfo){
        //battleGround信息更新
        var blockInfo = campInfo.visibleBlocks;
        this.battleGround.setVBByServer(blockInfo);
        //新建camp
        var camp = new Camp(this);
        this._selfCamp = camp;
        //添加soldier信息
        var soldierList = campInfo.solderDetail;
        var soldier_i;
        for(var i in soldierList){
            var soldierInfo = soldierList[i];
            soldier_i = groupManager.generateGroupByType(i,camp.id,soldierInfo);
            if(soldier_i){
                camp.addGroup(soldier_i);
            }
        };
        //触发事件
        this.addEventToPool("campChange",campInfo);
    };
    Game.prototype._solderArrange = function(info){
        var type = info.type;
        var num = info.num;
        var value = info.value;

        if(this._selfCamp){
            var soldier = this._selfCamp.getGroupByNum(num);
            soldier.setProperty(type,value);
            this.addEventToPool("soldierChange",null);
        }
    };
    Game.prototype.submitStrategy = function(){
        var campInfo = this._selfCamp.getCampInfo();
        var info = {
            type:"testCampSubmit",
            detail:campInfo
        }
        WSM.sendMsg("gameInput",info);
    }
    Game.prototype.testClockInput = function(info){
        this.addEventToPool("clockChange",info);
    }
    return Game;
});