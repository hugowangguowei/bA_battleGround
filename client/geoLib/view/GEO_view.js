/**
 * Created by wgw on 2016/4/18.
 */
define(function(require){
    var View = require("baBasicLib/view/View");
    var viewConfig = require("geoLib/view/ViewConfig");
    var listenerType = viewConfig.listenerType;
    var listenerClass = viewConfig.listenerClass;
    var getGUID = require("baBasicLib/util/GUID");
    var baLib = require("baBasicLib/util/baLib");

    function GeoView(div,model,showType){
        View.call(this,div,model);
        this.id = getGUID();
        this.div = null;
        this.model = null;
        this.showType = showType||"color";
        this.initialize(div,model);
    };
    GeoView.prototype = new View();
    GeoView.prototype.initialize = function(div,model){
        this.div = div;
        this.model = model;
        this.addOriListeners();
        this.addBasicStruct();
        this.initPaper();
    }
    GeoView.prototype.addOriListeners = function() {
        var self = this;
        var prop = {
            id: this.id,
            class: "ori"
        };
        this.model.addListener("paperChange", prop, function (arg) {
            var paperInfo = self.model.paperInfo;
            var colorInfo = self.model.colorInfo;
            self.drawPaper(paperInfo,colorInfo);

        });
    };
    GeoView.prototype.addBasicStruct = function(){
        var self = this;
        var canvas = this.div;
        canvas.width = 800;
        canvas.height = 800;
        var c_w = canvas.width , c_h = canvas.height;
        canvas.addEventListener('mousedown',function(e){
            var loc = baLib.getPointOnDiv(e.pageX, e.pageY,canvas);
            var pLoc = {x:loc.x/c_w , y: loc.y/c_h};
            self.model.mouseInput('mousedown',pLoc);
        },false);
        canvas.addEventListener('mousemove',function(e){
            var loc = baLib.getPointOnDiv(e.pageX, e.pageY,canvas);
            var pLoc = {x:loc.x/c_w , y: loc.y/c_h};
            self.model.mouseInput('mousemove',pLoc);
        },false);
        canvas.addEventListener('mouseup',function(e){
            var loc = baLib.getPointOnDiv(e.pageX, e.pageY,canvas);
            var pLoc = {x:loc.x/c_w , y: loc.y/c_h};
            self.model.mouseInput('mouseup',pLoc);
        },false);
    };
    GeoView.prototype.initPaper = function(){
        var self = this;
        var $mainC = $("#mainCanvas");
        var canvas = $mainC[0];
        var cxt = canvas.getContext("2d");
        var dataArray = self.model.paperInfo.dataArray;
        var width = self.model.paperInfo.width;
        var height = self.model.paperInfo.height;
        var bx = canvas.width/width;
        var by = canvas.height/height;

        if(this.showType == "color"){
            var color = "rgb(0,255,0)";
            cxt.fillStyle = color;
            cxt.fillRect(0,0,canvas.width,canvas.height);
            cxt.fill();
        }
    }
    GeoView.prototype.drawPaper = function(paperInfo,colorInfo){
        var self = this;
        var canvas = this.div;
        var cxt = canvas.getContext("2d");
        var dataArray = paperInfo.dataArray;
        var width = paperInfo.width;
        var height = paperInfo.height;
        var bx = canvas.width/width;
        var by = canvas.height/height;
        switch (self.showType){
            case "color":
                drawRect_p();
                break;
            case "text":
                drawText();
                break;
        }
        function drawRect_p(){
            var cachedPix = self.model.paperInfo.cachedPix;
            var colorInfo = self.model.colorInfo;
            var interval = colorInfo.c3.H - colorInfo.c1.H;
            var listLen = colorInfo.colorList.length - 1;
            for(var i = 0;i<cachedPix.length;i+=3){
                var x = cachedPix[i] * bx;
                var y = cachedPix[i+1] * by;
                var h = cachedPix[i+2];
                var per = (h- colorInfo.c1.H)/interval;
                var color = colorInfo.colorList[parseInt(listLen * per)];
                if(!color){
                    console.log("ha");
                }
                cxt.fillStyle = color;
                cxt.fillRect(x,y,bx,by);
                cxt.fill();
            }
        }
        function drawRect(){
            var colorInfo = self.model.colorInfo;
            var interval = colorInfo.c3.H - colorInfo.c1.H;
            var listLen = colorInfo.colorList.length - 1;
            for(var i = 0;i<dataArray.length;i++){
                var x = (i%width)*bx;
                var y = parseInt(i/width)*by;
                var h = dataArray[i];
                if(h != 0){
                    console.log("ha");
                }
                var per = (h- colorInfo.c1.H)/interval;
                var color = colorInfo.colorList[parseInt(listLen * per)];
                cxt.fillStyle = color;
                cxt.fillRect(x,y,bx,by);
                cxt.fill();
            }
        }
        function drawText(){
            var cachedPix = self.model.paperInfo.cachedPix;
            var colorInfo = self.model.colorInfo;
            var interval = colorInfo.c3.H - colorInfo.c1.H;
            var listLen = colorInfo.colorList.length - 1;
            for(var i = 0;i<cachedPix.length;i+=3) {
                var x = cachedPix[i] * bx;
                var y = cachedPix[i + 1] * by;
                var h = parseInt(cachedPix[i + 2]);
                var color = "black";
                cxt.clearRect(x, y, bx, by);
                cxt.fillStyle = color;
                cxt.fillText(h, x, y);
                cxt.fill();
            }
        }
        function getColorByH(h){
            var destR,destG,destB;
            var oriR,oriG,oriB;
            var maxH;
            if(h >= 0){
                maxH = colorInfo.c3.H;
                if(h > colorInfo.c3.H)h = colorInfo.c3.H;
                destR = colorInfo.c3.R;
                destG = colorInfo.c3.G;
                destB = colorInfo.c3.B;

            }else{
                maxH = colorInfo.c1.H;
                if(h < colorInfo.c1.H)h = colorInfo.c1.H;
                destR = colorInfo.c1.R;
                destG = colorInfo.c1.G;
                destB = colorInfo.c1.B;
            }
            oriR = colorInfo.c2.R;
            oriG = colorInfo.c2.G;
            oriB = colorInfo.c2.B;
            var finR = oriR + h/maxH*(destR - oriR);
            var finG = oriG + h/maxH*(destG - oriG);
            var finB = oriB + h/maxH*(destB - oriB);

            var color = "#" + NumToString(finB) + NumToString(finG) + NumToString(finR);
            return color;
        }
        function NumToString(num){
            var tem = parseInt(num).toString(16);
            if(num <= 16){
                tem = "0" + tem;
            }
            return tem;
        }


    }
    return GeoView;
})