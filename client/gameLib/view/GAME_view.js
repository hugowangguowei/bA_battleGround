/**
 * Created by wgw on 2016/5/5.
 */
define(function(require){
    var View = require("baBasicLib/view/View");
    var viewConfig = require("baBasicLib/view/ViewConfig");
    var wsConfig = require("gameLib/webSocket/WS_Config");
    var listenerType = viewConfig.listenerType;
    var listenerClass = viewConfig.listenerClass;
    var getGUID = require("baBasicLib/util/GUID");
    var baLib = require("baBasicLib/util/baLib");

    function GameView(div,model){
        View.call(this,div,model);
        this.id = getGUID();
        this.div = null;
        this.model = null;
        this.isObstacleInit = false;
        this.initialize(div,model);
    };
    GameView.prototype = new View();
    GameView.prototype.initialize = function(div,model){
        this.div = div;
        this.model = model;
        this.addOriListeners();
        this.addBasicStruct();
    };
    GameView.prototype.addOriListeners = function(){
        var self = this;

        var prop = {
            id: this.id,
            class: "ori"
        };

        this.model.addListener("geoChange",prop,function(){
            var geo = self.model.geoInfo;
            self.drawGeo(geo,self._geoCache);
            self.draw();
        });

        this.model.addListener("spriteChange", prop, function (arg) {
            var geo = self.model.geoInfo;
            var spriteList = self.model.spriteList;
            self.drawSpriteList(spriteList,self._spriteCache);
            self.drawQuaTree(geo,self._quaTreeCache);
            self.drawObs(self._obstacleCache);
            self.draw();
        });
    };
    /**
     * 绘制
     */
    GameView.prototype.draw = function(){
        var cxt = this.div.getContext("2d");
        cxt.clearRect(0,0,this.div.width,this.div.height);
        cxt.drawImage(this._bgPicCache,0,0,this.div.width,this.div.height);
        cxt.drawImage(this._spriteCache,0,0,this.div.width,this.div.height);
        cxt.drawImage(this._obstacleCache,0,0,this.div.width,this.div.height);
        //cxt.drawImage(this._quaTreeCache,0,0,this.div.width,this.div.height);
    };
    /**
     * 绘制四叉树
     * @param geo
     * @param canvas
     */
    GameView.prototype.drawQuaTree = function (geo,canvas) {
        var cxt = canvas.getContext("2d");
        cxt.clearRect(0,0,canvas.width,canvas.height);
        var quaTree = geo.quaTree;
        canvas.width = quaTree.bounds.w;
        canvas.height = quaTree.bounds.h;
        var leafList = [];
        quaTree.getLeafNodeInfo(leafList);
        for(var i = 0,len = leafList.length;i<len;i++){
            var leaf_i = leafList[i];
            var color = leaf_i.markColor;
            var bounds = leaf_i.bounds;
            cxt.strokeStyle = color;
            cxt.strokeRect(bounds.x,bounds.y,bounds.w,bounds.h);
            cxt.stroke();
        }
    };
    /**
     * 绘制地理信息
     * @param geo
     * @param canvas
     */
    GameView.prototype.drawGeo = function(geo,canvas){
        var dataArray = geo.dataArray;
        var d_w = geo.xNum;
        var d_h = geo.yNum;
        var c_w = canvas.width;
        var c_h = canvas.height;
        var _w = c_w/d_w;
        var _h = c_h/d_h;
        var cxt = canvas.getContext("2d");
        for(var i = 0,len = dataArray.length;i<len;i++){
            var x = i%d_w;
            var y = parseInt(i/d_w);
            var c = parseInt(dataArray[i]);
            if(c >= 255)c= 255;
            var cc = c.toString(16);
            if(c <16){
                cc = "0" + cc;
            }
            cxt.strokeStyle = "#" + cc + cc + cc;
            cxt.strokeRect(x*_w,y*_h,_w,_h);
            cxt.stroke();
        };
    };
    /**
     * 绘制sprite列表
     * @param spriteList
     * @param canvas
     */
    GameView.prototype.drawSpriteList = function(spriteList,canvas){
        var cxt = canvas.getContext("2d");
        cxt.clearRect(0,0,canvas.width,canvas.height);
        for(var i in spriteList){
            var sprite_i = spriteList[i];
            var spriteView = sprite_i.bindView;
            spriteView.draw(canvas);
        };
    };
    /**
     * 绘制障碍层
     * @param canvas
     */
    GameView.prototype.drawObs = function(canvas){
        if(!this.model.obstacleList)return null;
        if(this.model.isObstacleInit)return null;
        var geo = this.model.geoInfo;
        var obs = this.model.obstacleList;
        canvas.width = geo.width;
        canvas.height = geo.height;
        var cxt = canvas.getContext("2d");
        var obs_i;
        for(var i = 0;i<obs.length;i++){
            obs_i = obs[i];
            switch (obs_i.type){
                case "line":
                    cxt.beginPath();
                    cxt.strokeStyle = "blue";
                    cxt.moveTo(obs_i.node[0],obs_i.node[1]);
                    cxt.lineTo(obs_i.node[2],obs_i.node[3]);
                    cxt.stroke();
                    cxt.closePath();
                    break;
                case "cycle":
                    cxt.beginPath();
                    cxt.strokeStyle = "blue";
                    cxt.arc(obs_i.node[0],obs_i.node[1],obs_i.node[2],obs_i.node[3],obs_i.node[4]);
                    cxt.stroke();
                    cxt.closePath();
                    break;
            }
        }
        this.model.isObstacleInit = true;
    };
    /**
     * 绘制背景图片
     */
    GameView.prototype.drawBgPic = function(canvas){
        var cxt = canvas.getContext("2d");
        cxt.clearRect(0,0,canvas.width,canvas.height);
        var bgImage = new Image();
        //bgImage.src = wsConfig.WS_URL +"/client/image/c1_map.png";
        //bgImage.src = "localHost:18080/client/image/DarkTower.png";
        bgImage.src = "http://badventure.duapp.com/client/image/c1_map.png";
        bgImage.onload = function(){
            cxt.drawImage(bgImage,0,0,canvas.width,canvas.height);
        }
    };
    /**
     * 添加基本元素
     */
    GameView.prototype.addBasicStruct = function(){
        var self = this;
        var h = screen.height;
        var c_w = parseInt(h * 0.65);var c_h = parseInt(h * 0.65);
        var canvas = this.div;
        canvas.style.width = c_w + "px";
        canvas.style.height = c_h + "px";
        canvas.width = c_w;
        canvas.height = c_h;

        self._geoCache = document.createElement("canvas");
        self._geoCache.width =c_w;
        self._geoCache.height = c_h;

        self._spriteCache = document.createElement('canvas');
        //self._spriteCache = document.getElementById("spCanvas");
        self._spriteCache.width = c_w;
        self._spriteCache.height = c_h;

        self._quaTreeCache = document.createElement('canvas');
        self._quaTreeCache.width = c_w;
        self._quaTreeCache.height = c_h;

        self._obstacleCache = document.createElement('canvas');
        self._obstacleCache.width = c_w;
        self._obstacleCache.height = c_h;

        self._bgPicCache = document.createElement('canvas');
        self._bgPicCache.width = c_w;
        self._bgPicCache.height = c_h;
        self.drawBgPic(self._bgPicCache);
    };
    return GameView;
})