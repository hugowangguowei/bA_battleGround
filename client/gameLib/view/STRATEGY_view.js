/**
 * Created by wgw on 2016/6/10.
 */
define(function(require){
    var View = require("baBasicLib/view/View");
    var viewConfig = require("geoLib/view/ViewConfig");
    var getGUID = require("baBasicLib/util/GUID");
    var baLib = require("baBasicLib/util/baLib");

    function StrategyView(div,model){
        View.call(this,div,model);
        this.id = getGUID();
        this.div = null;
        this.model = null;
        this.initialize(div,model);
    };

    var p = StrategyView.prototype = new View();

    p.initialize = function(div,model){
        this.div = div;
        this.model = model;
        this.addOriListeners();
        this.addBasicStruct();
    };
    p.addOriListeners = function(){
        var self = this;
        var prop = {
            id: this.id,
            class: "ori"
        };

        this.model.addListener("spriteChange", prop, function (arg) {
            self.draw();
        });
        this.model.addListener("soldierChange",prop,function(arg){
            self.draw(arg);
        });
        this.model.addListener("campChange",prop,function(arg){
            var camp = self.model._selfCamp;
            var sL = camp.getSoldierList();
            var count = 0;
            for(var i = 0;i<sL.length;i++){
                var soldier_i = sL[i];
                var sDTag = $("#campTag_" + count);
                if(sDTag){
                    var type = sDTag.children()[0];
                    type.value = soldier_i.type;
                    var num = sDTag.children()[1];
                    num.value = soldier_i.num;
                    var loc = sDTag.children()[2];
                    loc.value = "";
                    var att = sDTag.children()[3];
                    $(att).attr("disabled",false);
                    var attLoc = sDTag.children()[4];
                    attLoc.value = "";
                    var def = sDTag.children()[5];
                    $(def).attr("disabled",false);
                }
                count++;
            }
            if(count <5){
                for(var i = count;i<6;i++){
                    sDTag = $("#campTag_" + i);
                    sDTag.hide();
                }
            };
            self.draw();
        });
    };
    p.draw = function(camp){
        var width = 100;
        var height = 75;
        var self = this;
        var canvas = self.div;
        var cxt = canvas.getContext("2d");
        cxt.clearRect(0,0,500,500);
        cxt.beginPath();
        cxt.strokeStyle = "red";
        cxt.fillStyle = "grey";
        for(var i = 0;i<4;i++){
            for(var j = 0;j<4;j++){
                cxt.strokeRect(width*i,height*j,width,height);
                var num = j*4 + i;
                cxt.fillText(""+num,width*(i + 0.5),height*(j+0.2))
            }
        }
        cxt.closePath();

        var camp = this.model._selfCamp;
        if(!camp)return 0;
        var soldierList = camp.soldierList;
        var s_i = null;
        for(var i = 0;i<soldierList.length;i++){
            s_i = soldierList[i];
            if(s_i.loc >= 0){
                //绘制坐标位置
                var x = s_i.loc%4;
                var y = parseInt(s_i.loc/4);

                var _x = width*(x + 0.5);
                var _y = height*(y + 0.5);

                cxt.fillStyle = s_i.fillColor;
                cxt.fillRect(_x -5,_y -3,10,6);
                cxt.textAlign = "center";
                cxt.fillText(s_i.type,width*(x + 0.5),height*(y + 0.5)+ 15);

                if(s_i.aimLoc>= 0){
                    var aX = s_i.aimLoc%4;
                    var aY = parseInt(s_i.aimLoc/4);

                    var _aX = width * (aX + 0.5);
                    var _aY = height *(aY + 0.5);
                    cxt.strokeStyle = s_i.fillColor;
                    cxt.beginPath();
                    cxt.moveTo(_x,_y);
                    cxt.lineTo(_aX,_aY);
                    cxt.closePath();
                    cxt.stroke();
                    cxt.arc(_aX,_aY,4,0,Math.PI*2,true);
                    cxt.fill();
                }

                if(s_i.attLoc >= 0){
                    var tX = s_i.attLoc%4;
                    var tY = parseInt(s_i.attLoc/4);

                    var _tX = width * (tX + 0.5);
                    var _tY = height *(tY + 0.5);
                    cxt.strokeStyle = s_i.fillStyle;
                    cxt.beginPath();
                    if(s_i.aimLoc >= 0){
                        cxt.moveTo(_aX,_aY);
                    }else{
                        cxt.moveTo(_x,_y);
                    }
                    cxt.lineTo(_tX,_tY);
                    cxt.closePath();
                    cxt.stroke();
                    cxt.arc(_tX,_tY,4,0,Math.PI*2,0);
                    cxt.fill();
                }

            }
        }
    };
    p.addBasicStruct = function(){
        var self = this;
        var canvas = self.div;
        canvas.width = 400;
        canvas.height = 320;

        var campList = $("#campDetail");
        campList.html('' +
            '<div class="campTag" id="campTag_0"> ' +
            '<input type="button" class="campNameBtn">' +
            '<input type="button" class="campNumBtn">' +
            '  loc: <input type="text" class="campLocInp"> ' +
            '<input type="button" class="campAttBtn" value="攻击"> ' +
            '  : <input type="text" class="campAttInp"> ' +
            '<input type="button" class="campDefBtn" value="防守"> ' +
            '</div> ' +
            '<div class="campTag" id="campTag_1"> ' +
            '<input type="button" class="campNameBtn">' +
            '<input type="button" class="campNumBtn">' +
            '  loc: <input type="text" class="campLocInp"> ' +
            '<input type="button" class="campAttBtn" value="攻击"> ' +
            '  : <input type="text" class="campAttInp"> ' +
            '<input type="button" class="campDefBtn" value="防守"> ' +
            '</div> ' +
            '<div class="campTag" id="campTag_2"> ' +
            '<input type="button" class="campNameBtn">' +
            '<input type="button" class="campNumBtn">' +
            '  loc: <input type="text" class="campLocInp"> ' +
            '<input type="button" class="campAttBtn" value="攻击"> ' +
            '  : <input type="text" class="campAttInp"> ' +
            '<input type="button" class="campDefBtn" value="防守"> ' +
            '</div> ' +
            '<div class="campTag" id="campTag_3"> ' +
            '<input type="button" class="campNameBtn">' +
            '<input type="button" class="campNumBtn">' +
            '  loc: <input type="text" class="campLocInp"> ' +
            '<input type="button" class="campAttBtn" value="攻击"> ' +
            '  : <input type="text" class="campAttInp"> ' +
            '<input type="button" class="campDefBtn" value="防守"> ' +
            '</div> ' +
            '<div class="campTag" id="campTag_4"> ' +
            '<input type="button" class="campNameBtn">' +
            '<input type="button" class="campNumBtn">' +
            '  loc: <input type="text" class="campLocInp"> ' +
            '<input type="button" class="campAttBtn" value="攻击"> ' +
            '  : <input type="text" class="campAttInp"> ' +
            '<input type="button" class="campDefBtn" value="防守"> ' +
            '</div>'+
            '<div class="campSubmit">'+
            '<input type = "button" id = "campSubmitBtn" value="提交布局">'+
            '</div>'
        );

        $(".campAttInp").attr("disabled","disabled");
        //进攻按钮
        $(".campAttBtn").click(function(){
            var parent = $(this).parent();
            var id = parent.attr("id");
            var num = id.split("_")[1];
            self.model.testCampInput("soldierArrange",{type:"att",num:num,value:true});
            $(this).attr("disabled","disabled");
            $(this).next().removeAttr("disabled");
            $(this).next().next().removeAttr("disabled");
        });
        //进攻位置
        $(".campAttInp").bind('input propertychange',function(){
            var parent = $(this).parent();
            var id = parent.attr("id");
            var num = id.split("_")[1];
            self.model.testCampInput("soldierArrange",{type:"attLoc","num":num,value:this.value})
        });
        //防守
        $(".campDefBtn").click(function(){
            var parent = $(this).parent();
            var id = parent.attr("id");
            var num = id.split("_")[1];
            self.model.testCampInput("soldierArrange",{type:"def",num:num,value:true});
            $(this).attr("disabled","disabled");
            $(this).prev().attr("disabled","disabled");
            $(this).prev().prev().removeAttr("disabled");
        });
        //位置更改
        $(".campLocInp").bind('input propertychange', function() {
            var parent = $(this).parent();
            var id = parent.attr("id");
            var num = id.split("_")[1];
            self.model.testCampInput("soldierArrange",{type:"loc","num":num,value:this.value})
        });
        //阵营提交
        $("#campSubmitBtn").click(function(){
            self.model.submitStrategy();
        });
        this.draw();
    };
    return StrategyView;
})