/**
 * Created by wgw on 2016/3/15.
 */
/**
 * Created by wangguowei on 2001/1/11.
 */

define(function(require){

        var baScene = require('baBasicLib/model/baScene');
        var btn_event = require('privateLib/config/btn_event');
        var ID_Manager = require('privateLib/config/ID_Manager').getInstance();
        var baNode = require("baBasicLib/model/baNode");
        var MemIntroTag = require("privateLib/model/MemIntroTag");
        var MemIntroTagContainer = require("privateLib/model/MemIntroTagContainer");
        var RoomIntroTag = require("privateLib/model/RoomIntroTag");
        var RoomIntroTagContainer = require("privateLib/model/RoomIntroTagContainer");
        var memTag = require("privateLib/model/MemTag");
        var memTagContainer = require("privateLib/model/MemTagContainer");

        var viewConfig = require('privateLib/view/ViewConfig');
        var listenerType = viewConfig.listenerType;

        /**
         * 游戏资源加载画面
         * @param _this
         * @constructor
         */
        function GSM_gameLoading(_this){
            _this.obj.fireEvent(listenerType.SCENE_CHANGE,"gameLoading");
            imageArray = [
                {imageName:"aa",src:"images/1.png"},
                {imageName:"bb",src:"images/2.png"}
            ]
            var imageNum = imageArray.length;
            for(var i = 0;i<imageArray.length;i++){
                var image_i = imageArray[i];
                eval(image_i.imageName +"= new Image();");
                eval(image_i.imageName +".src = '" + image_i.src + "';");
                eval(image_i.imageName +".addEventListener('load',show,false);");
            }
            var count = 0;
            function show(){
                count++;
                var percent = count/imageNum;
                _this.obj.fireEvent("loadingProcess",percent);
                if(count >= imageArray.length){
                    console.log("finishLoading");
                    _this.switchToNext("mainShow");
                }
            }
        }
        /**
         * 游戏主界面
         * @param _this
         * @constructor
         */
        function GSM_gameStruct(_this){
            console.log("主界面");
            var model = _this.obj;
            var gameStructScene = new baScene("gameStructScene",_this.obj);
            var msg = _this._startGameMsg;
            var playerType = msg.playerType;
            switch (playerType){
                case "leader":
                    _buildLeaderStruct();
                    break;
                case "normal":
                    _buildNormalStruct();
                    break;
            };
            var memList = msg.mem;
            var memContainer = new memTagContainer("memContainer",gameStructScene);
            for(var i = 0,len = memList.length;i<len;i++){
                var mem_i = new memTag(ID_Manager.getNewIdForMemTag(),memContainer,gameStructScene);
                mem_i.memInfo = memList[i];
                model.fireEvent(listenerType.ADD_MEM_TAG,mem_i);
            }
            function _buildLeaderStruct(){
                model.fireEvent(listenerType.SCENE_CHANGE,"gameStruct");
            }
            function _buildNormalStruct(){
                model.fireEvent(listenerType.SCENE_CHANGE,"gameStruct");
            }
        }
        /**
         * 游戏初始化界面
         * @param _this
         * @returns {number}
         * @constructor
         */
        function GSM_mainShow(_this){
            var scene_mainShow = new baScene("mainShowScene",_this.obj);
            var rContainer = new RoomIntroTagContainer("rContainer",scene_mainShow);
            var mContainer = new MemIntroTagContainer("mContainer",scene_mainShow);
            _this.obj.fireEvent(listenerType.SCENE_CHANGE,"mainShow");
        }
        /**
         * 房间列表画面
         * @param _this
         * @constructor
         */
        function GSM_mainShowBasicStruct(_this){
            _this.obj.fireEvent(listenerType.SCENE_CHANGE,"mainShowBasicStruct");
        }

        return {
            gameLoading:function(){
                return GSM_gameLoading;
            },
            gameStruct:function(){
                return GSM_gameStruct;
            },
            mainShow:function(){
                return GSM_mainShow;
            },
            mainShowBasicStruct:function(){
                return GSM_mainShowBasicStruct;
            }
        }
    }
)
