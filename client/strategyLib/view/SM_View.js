/**
 * Created by wgw on 2016/6/27.
 */

define(function(require){
    var View = require("baBasicLib/view/View");
    var getGUID = require("baBasicLib/util/GUID");
    var baLib = require("baBasicLib/util/baLib");

    function SM_View(div,model){
        View.call(this);
        this.id = getGUID();
        this.div = div;
        this.cache = null;
        this.canvas = null;
        this.cw = 0;
        this.ch = 0;
        this.initialize(div,model);
        this.canvasOperateType = "add";//在画布上的操作类型{'add'/'delete'}
    }

    SM_View.prototype = new View();
    SM_View.prototype.initialize = function(div,model){
        if(!div||!model){
            alert("数据绑定不完整");
        }
        this.div = div;
        this.model = model;
        this.strategy = model.curStrategy;
        this.addOriListeners();
        this.addBasicStruct();
    };
    SM_View.prototype.addOriListeners = function(){
        var self = this;
        var prop = {
            id: this.id,
            class: "ori"
        };
        this.model.addListener("canvasChange",prop,function(){
            self.draw();
        });
    };
    SM_View.prototype.addBasicStruct = function(){
        var self = this;
        this.div.innerHTML = "" +
            "<input type='button' id = 'sB_0' value = '新建' class='sB'>" +
            //"<input type='test' id = 'sT_0' placeholder = '阵型名称'>"+
            "<input type='button' id = 'sB_1' value = '提交' class = 'sB'>"+
            "<hr>"+
            "<input type='button' id = 'sB_2' value ='添加' class='sB'>" +
            "<input type='button' id = 'sB_3' value ='移除' class='sB'>" +
            "<hr>" +
            "<h6 id = 'sH_0'>剩余可布置兵力：</h6>"+
            "<hr>"+
            "<canvas id = 'sCanvas'></canvas>";
        this.canvas = document.getElementById("sCanvas");
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.cw = this.canvas.width;
        this.ch = this.canvas.height;
        $("#sT_0").hide();
        $('#sB_1').hide();
        $('#sB_2').hide();
        $('#sB_3').hide();
        $('#sH_0').hide();
        $("#sCanvas").hide();

        //创建阵型按钮
        $("#sB_0").click(function(){
            $('#sH_0').show();
            if(self.initDiv()){
                $("#sB_0").hide();
                $("#sT_0").show();
                $('#sB_1').show();
                $('#sB_2').show();
                $('#sB_3').show();
                $('#sCanvas').show();
                self.initCanvas();
                self.draw();
            }

        });

        //提交阵型按钮
        $("#sB_1").click(function(){
            if(self.strategy.isBuildFinish()){
                self.model.submitStrategy();
            }else{
                $("#sH_0").html("你尚未完成编辑，药不能停！");
            }
        });

        //添加布置按钮
        $("#sB_2").click(function(){
            self.canvasOperateType = "add";
        });

        //删除布置按钮
        $("#sB_3").click(function(){
            self.canvasOperateType = "delete";
        });

        //绑定canvas点击事件
        $("#sCanvas").click(function(e){
            var x = e.pageX;
            var y = e.pageY;
            var loc = baLib.getPointOnDiv(x,y,self.canvas);
            var detail = {
                type:self.canvasOperateType,
                x:loc.x,
                y:loc.y,
                w:self.canvas.width,
                h:self.canvas.height
            };
            self.model.input({type:"canvasClick",detail:detail});
        });

    };
    SM_View.prototype.initDiv = function(){
        var ctrObj = this.model.game.controlObj;
        if(!ctrObj){
            $('#sH_0').html("抱歉，你还没有开始游戏");
            return false;
        }
        var strategyInfo = ctrObj.strategyInfo;
        if(!strategyInfo.hasStrategy){
            $('#sH_0').html("抱歉！你的角色无法创建阵型");
            return false;
        }else{
            var ability = strategyInfo.ability;
            this.strategy.initByAbility(ability);
            $('#sH_0').html("可设置的随从数量：" + this.strategy.maxCtr);
            return true;
        }
    }
    SM_View.prototype.initCanvas = function(){
        this.cache = document.createElement("canvas");
        this.cache.width = 300;
        this.cache.height = 300;
        if(!this.strategy){
            return null;
        }
        var w = this.strategy.width;
        var _w = this.cw/w;
        var h = this.strategy.height;
        var _h = this.ch/h;
        var cxt = this.cache.getContext("2d");
        cxt.strokeStyle = "black";
        for(var i = 0;i<w;i++){
            for(var p = 0;p<h;p++){
                cxt.strokeRect(_w*i,_h*p,_w,_h);
            }
        }
    };
    SM_View.prototype.draw = function(){
        //更新说明
        $('#sH_0').html("可设置的随从数量：" + this.strategy.curCtr);
        //更新canvas
        var cxt = this.canvas.getContext("2d");
        cxt.clearRect(0,0,this.canvas.width,this.canvas.height);
        cxt.drawImage(this.cache,0,0);
        var data = this.strategy.data;
        var w = this.strategy.width;
        var h = this.strategy.height;
        var _w = this.cw/w;
        var _h = this.cw/h;
        for(var i = 0,len = data.length;i<len;i++){
            var x = i%w;
            var y = parseInt(i/w);
            switch (data[i]){
                case 0:
                    break;
                case 1:
                    cxt.fillStyle = "red";
                    cxt.fillRect(_w*x,_h*y,_w,_h);
                    cxt.fill();
                    break;
                case 2:
                    cxt.fillStyle = "blue";
                    cxt.fillRect(_w*x,_h*y,_w,_h);
                    cxt.fill();
                    break;
            }
        }
    }
    return SM_View;
});