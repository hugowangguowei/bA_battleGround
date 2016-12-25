/**
 * Created by wangguowei on 2001/1/1.
 */
define(function(require){
   "use strict";
    var instance = null;
    var baEventSource = require("baBasicLib/baEventSource");
    var ReSure = require("baBasicLib/controller/Resure");

    function baGlobal(){
        baEventSource.call(this);
        /**
         * 场景数组
         * @type {Array}
         */
        this.sceneArray = [];
        this.foregroundScene = null;
        /**
         * 游戏状态机
         * @type {baBasicLib/gameState}
         */
        this.GSM = null;
        /**
         * 连接管理器
         * @type {module:socket/WS_Manager}
         */
        this.WSM = null;
        /**
         * 确认控制器
         */
        this.resureChecker = new ReSure(this);
    }

    baGlobal.prototype = new baEventSource();
    //场景管理==========================================================================================================
    baGlobal.prototype.addScene = function(scene,focus){
        this.sceneArray.push(scene);
        if(focus){
            this.foregroundScene = scene;
        };
    };
    baGlobal.prototype.removeSceneByID = function(id){
        for(var i = 0,len = this.sceneArray.length;i<len;i++){
            if(this.sceneArray[i].id == id){
                this.sceneArray.splice(i,1);
                if(this.foregroundScene.id == id)
                    this.foregroundScene = null;
                return true;
            }
        }
        return false;
    };
    baGlobal.prototype.removeScene = function(scene){
        for(var i = 0,len = this.sceneArray.length;i<len;i++){
            if(this.sceneArray[i] == scene){
                this.sceneArray.splice(i,1);
                if(this.foregroundScene == scene)
                    this.foregroundScene = null;
                return true;
            }
        }
        return false;
    };
    baGlobal.prototype.setForegroundScene = function(scene){
        this.foregroundScene = scene;
    };
    baGlobal.prototype.getScene = function(sceneID){
        for(var i = 0,len = this.sceneArray.length;i<len;i++){
            if(this.sceneArray[i].id == sceneID){
                return this.sceneArray[i];
            }
        }
        return 0;
    };
    //状态机管理========================================================================================================
    baGlobal.prototype.addGameStateMachine = function(gsm){
        gsm.obj = this;
        this.GSM = gsm;
    };
    baGlobal.prototype.getGameStateMachine = function(){
        return this.GSM;
    };
    //对象管理==========================================================================================================
    baGlobal.prototype.getSpriteById = function(id){
        for(var i = 0;i<this.sceneArray.length;i++){
            if(this.sceneArray[i].childList[id]){
                return this.sceneArray[i].childList[id];
            }
        }
        return 0;
    };

    return {
        getInstance:function(){
            if(!instance){
                instance = new baGlobal();
            }
            return instance;
        }
    };
});



























