/**
 * Created by wgw on 2016/4/18.
 */
define(function(require){
    var View = require("baBasicLib/view/View");
    var viewConfig = require("mapLib/view/ViewConfig");
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
        },false)
        canvas.addEventListener('mousemove',function(e){
            var loc = baLib.getPointOnDiv(e.pageX, e.pageY,canvas);
            var pLoc = {x:loc.x/c_w , y: loc.y/c_h};
            self.model.mouseInput('mousemove',pLoc);
        },false)
        canvas.addEventListener('mouseup',function(e){
            var loc = baLib.getPointOnDiv(e.pageX, e.pageY,canvas);
            var pLoc = {x:loc.x/c_w , y: loc.y/c_h};
            self.model.mouseInput('mouseup',pLoc);
        },false)

    };
    GeoView.prototype.initPaper = function(){
        this.drawPaper();
    }
    GeoView.prototype.drawPaper = function(paperInfo,colorInfo){
        var self = this;
        var paperInfo = self.model.paperInfo;
        var canvas = this.div;
        var cxt = canvas.getContext("2d");
        var dataArray = paperInfo.dataArray;
        var width = paperInfo.width;
        var height = paperInfo.height;
        var bx = canvas.width/width;
        var by = canvas.height/height;
        var _x = 0,_y = 0;
        cxt.strokeStyle = "black";
        for(var i = 0;i<width*height;i++){
            _x = parseInt(i/width);
            _y = i%height;
            cxt.strokeRect(_x*bx,_y*by,bx,by);
        }


        var infoX,infoY,infoA;
        var center_x,center_y;
        cxt.strokeStyle = "red";
        for(var i = 0 ; i<dataArray.length ; i = i+3){
            var loc = i/3;
            _x = loc%width;
            _y = parseInt(loc/height);
            infoX = dataArray[i];
            infoY = dataArray[i+1];
            infoA = dataArray[i+2];
            center_x = (_x + 0.5)*bx;
            center_y = (_y + 0.5)*by;
            cxt.beginPath();
            if(infoX){
                cxt.moveTo(center_x,center_y);
                cxt.lineTo(center_x +infoX*5,center_y);
            }
            if(infoY){
                cxt.lineTo(center_x,center_y + infoY*5);
            }
            cxt.closePath();
            cxt.stroke();
        }

    }
    return GeoView;
})