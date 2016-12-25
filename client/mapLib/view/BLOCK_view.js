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

    function BlockView(div,model,showType){
        View.call(this,div,model);
        this.id = getGUID();
        this.div = null;
        this.model = null;
        this.showType = showType||"color";
        this.drawSet = {
            t1:{},
            t2:{},
            r1:{},
            r2:{}
        }
        this.initialize(div,model);
    };
    BlockView.prototype = new View();
    BlockView.prototype.initialize = function(div,model){
        this.div = div;
        this.model = model;
        this.addOriListeners();
        this.addBasicStruct();
        this.initPaper();
    }
    BlockView.prototype.addOriListeners = function() {
        var self = this;
        var prop = {
            id: this.id,
            class: "ori"
        };
        this.model.addListener("paletteChange", prop, function (arg) {
            var paperInfo = self.model.paperInfo;
            self.draw();

        });
    };
    BlockView.prototype.addBasicStruct = function(){
        var self = this;
        var canvas = this.div;
        canvas.width = 500;
        canvas.height = 800;
        var c_w = canvas.width , c_h = canvas.height;
        //canvas.addEventListener('mousedown',function(e){
        //    var loc = baLib.getPointOnDiv(e.pageX, e.pageY,canvas);
        //    var pLoc = {x:loc.x/c_w , y: loc.y/c_h};
        //    self.model.mouseInput('mousedown',pLoc);
        //},false);
        //canvas.addEventListener('mousemove',function(e){
        //    var loc = baLib.getPointOnDiv(e.pageX, e.pageY,canvas);
        //    var pLoc = {x:loc.x/c_w , y: loc.y/c_h};
        //    self.model.mouseInput('mousemove',pLoc);
        //},false);
        canvas.addEventListener('mouseup',function(e){
            var loc = baLib.getPointOnDiv(e.pageX, e.pageY,canvas);
            //var pLoc = {x:loc.x/c_w , y: loc.y/c_h};
            self.model.paletteInput('pickBlock',loc);
        },false);

        self.drawSet.t1 = {x:50,y:40 ,s:"当前可选择地形："};
        self.drawSet.t2 = {x:50,y:140,s:"可选地形："};
        self.drawSet.r1 = {x:50,y:55 ,w:50 ,h:50};
        self.drawSet.r2 = {x:50,y:155,w:400,h:100};
    };
    BlockView.prototype.initPaper = function(){
        this.draw();

    }
    BlockView.prototype.draw = function(){
        var self = this;
        var canvas = this.div;
        var cxt = canvas.getContext("2d");
        var ds = self.drawSet;
        cxt.fillText(ds.t1.s,ds.t1.x,ds.t1.y);
        cxt.strokeRect(ds.r1.x,ds.r1.y,ds.r1.w,ds.r1.h);
        cxt.fillText(ds.t2.s,ds.t2.x,ds.t2.y);
        cxt.strokeRect(ds.r2.x,ds.r2.y,ds.r2.w,ds.r2.h);

        var model = self.model;
        //绘制当前选中块
        if(model.curBlock){
            var cB = model.curBlock;
            self.drawBlock(cxt,cB,ds.r1.x,ds.r1.y,ds.r1.w,ds.r1.h);
        }
        //绘制所有块
        var bL = model.blockList.length;
        if(bL){
            var bw = ds.r1.w;
            for(var i = 0;i<bL;i++){
                var cB = model.blockList[i];
                if(cB.viewLoc){
                    self.drawBlock(cxt,cB);
                }else{
                    var len = i*bw;
                    var x = len%ds.r2.w;
                    var y = parseInt(len/ds.r2.w);
                    cB.viewLoc = {x:ds.r2.x +x,y:ds.r2.y + y,w:ds.r1.w,h:ds.r1.h};
                    self.drawBlock(cxt,cB);
                }

            }
        }
    }
    BlockView.prototype.drawBlock = function(cxt,block,x,y,w,h){
        var color = block.color;
        var vL = block.viewLoc;
        var x = x||vL.x;
        var y = y||vL.y;
        var w = w||vL.w;
        var h = h||vL.h;
        cxt.fillStyle = color;
        cxt.fillRect(x,y,w,h);
    }
    return BlockView;
})