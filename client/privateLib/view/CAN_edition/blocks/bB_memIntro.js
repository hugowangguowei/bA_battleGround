/**
 * Created by wangguowei on 2001/1/11.
 */
define(function(require){
    var basicBlock = require("privateLib/basicBlock");
    function bB_memIntro(id,x,y,w,h){
        basicBlock.call(this);
        this.id = id;
        this.type = "memIntro";
        this.x = x||0;
        this.y = y||0;
        this.width = w||100;
        this.height = h||100;
        this.isInit = false;
        this.cacheCanvas = document.createElement("canvas");
        this.cacheOutDate = false;
        this.isPrivate = true;
        this.isFocusOn = false;

        this._memberType = "leader";
        this._userInfo = 0;
    }

    bB_memIntro.prototype = new basicBlock();
    bB_memIntro.prototype.cacheRefresh = function(){
        var self = this;
        if(!this._userInfo){
            return 0;
        }

        switch (this._memberType){
            case 'leader':
                _drawLeader();
                break;
            case 'normal':
                _drawNormalMem();
                break;
        }

        function _drawLeader(){
            var userInfo = self._userInfo;
            var canvas = self.cacheCanvas;
            var cxt = canvas.getContext("2d");
            cxt.fillStyle = "#7f8012";
            cxt.fillRect(0,0,canvas.width,canvas.height);
            cxt.fillStyle = "white"
            cxt.textAlign = "center";

            var text = userInfo.userName;
            cxt.fillText(text,canvas.width/2,canvas.height/2,canvas.width,canvas.height);
            cxt.strokeStyle = "grey";
            cxt.strokeRect(1,1,canvas.width -2,canvas.height -2);
        }

        function _drawNormalMem(){
            var userInfo = self._userInfo;
            var canvas = self.cacheCanvas;
            var cxt = canvas.getContext("2d");
            cxt.fillStyle = "black";
            cxt.fillRect(0,0,canvas.width,canvas.height);
            cxt.fillStyle = "white"
            cxt.textAlign = "center";

            var text = userInfo.userName;
            cxt.fillText(text,canvas.width/2,canvas.height/2,canvas.width,canvas.height);
            cxt.strokeStyle = "grey";
            cxt.strokeRect(1,1,canvas.width -2,canvas.height -2);
        }


    }

    return bB_memIntro;
});






















