/**
 * Created by wgw on 2016/6/10.
 */
define(function(require){
    var View = require("baBasicLib/view/View");
    var viewConfig = require("baBasicLib/view/ViewConfig");
    var getGUID = require("baBasicLib/util/GUID");
    var baLib = require("baBasicLib/util/baLib");

    function StrategyView(div,model){
        View.call(this,div,model);
        this.id = getGUID();
        this.div = null;
        this.model = null;
        this.battleGroundCache = null;
        this.strategyCache = null;
        this.initialize(div,model);
    };

    var p = StrategyView.prototype = new View();

    p.initialize = function(div,model){
        this.div = div;
        this.model = model;
        this.initCache();
        this.addOriListeners();
        this.addBasicStruct();
    };
    p.initCache = function(){
        this.battleGroundCache = document.createElement("canvas");
        this.battleGroundCache.width = 500;
        this.battleGroundCache.height = 500;
        this.strategyCache = document.createElement("canvas");
        this.strategyCache.width = 500;
        this.strategyCache.height = 500;
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
            self._strategyCacheRefresh();
            self.draw(arg);
        });
        this.model.addListener("campChange",prop,function(arg){
            self._controlBarRefresh();
            self._battleGroundCacheRefresh();
            self._strategyCacheRefresh();
            self.draw();
        });
    };
    p._controlBarRefresh = function(){
        var self = this;
        var camp = self.model.user.camp;

        var campList = $("#campDetail");
        campList.empty();


        //添加士兵池控制
        var sPCount = 0;
        var sP = camp.getSoldierPool();
        for(var i = 0;i<sP.length;i++){
            var soldier_i = sP[i];
            var sDTag = $("<div id = 'campTag_" + sPCount + "'class ='campTag'></div>" );
            sDTag.html(
                '<input type="button" class="soldierTypeBtn">' +
                '<input type="button" class="soldierNumBtn">' +
                '  位置: <input type="text" class="soldierLocInp"> ' +
                '<input type="button" class="soldierAddBtn" value="添加"><hr>'
            )
            campList.append(sDTag);

            var type = sDTag.children()[0];
            type.value = soldier_i.type;
            var num = sDTag.children()[1];
            num.value = soldier_i.num;
            sPCount++;
        }
        //添加战场队伍控制
        var count = 0;
        var sL = camp.getGroupList();
        for(var i = 0;i<sL.length;i++){
            var soldier_i = sL[i];
            var sDTag = $("<div id = 'campTag_" + count + "'class ='campTag'></div>" );
            sDTag.html(
                '<input type="button" class="campNameBtn">' +
                '<input type="button" class="campNumBtn">' +
                '  位置: <input type="text" class="campLocInp"> ' +
                '<input type="button" class="campAttBtn" value="攻击"> ' +
                '  : <input type="text" class="campAttInp"> ' +
                '<input type="button" class="campDefBtn" value="防守"> ' +
                '<hr>'+
                '<span class = "campSepSpan">拆分: </span>'+
                '<input type="text" class="campSepInp">'+
                '<input type="button" class="campSepBtn" value="确定"><hr>'
            )
            campList.append(sDTag);

            //设置类型
            var type = sDTag.children()[0];
            type.value = soldier_i.type;
            //设置数量
            var num = sDTag.children()[1];
            num.value = soldier_i.num;
            //设置进攻位置
            var loc = sDTag.children()[2];
            var aimLoc = soldier_i.aimLoc;
            var oriLoc = soldier_i.loc;
            console.log("c");
            if(aimLoc >= 0){
                loc.value = aimLoc;
            }else{
                loc.value = oriLoc;
            }
            //设置是否攻击
            var att = sDTag.children()[3];
            $(att).attr("disabled",false);
            //设置攻击位置
            var attLoc = sDTag.children()[4];
            attLoc.value = "";
            //设置是否防守
            var def = sDTag.children()[5];
            $(def).attr("disabled",false);
            count++;
        }

        var sDSub = $(
            '<div class="campSubmit">'+
            '<input type = "button" id = "campSubmitBtn" value="提交布局">'+
            '</div>'
        );
        campList.append(sDSub);

        //绑定函数======================================================================================================
        //从士兵池中输入数据
        $(".soldierAddBtn").click(function(){
            var parent = $(this).parent();
            var id = parent.attr("id");
            var num = id.split("_")[1];
            var loc = $(this).prev().val();
            if(loc == ""){
                return false;
            }
            var soldierNum = $(this).prev().prev().val();
            self.model.testCampInput("soldierArrange",{type:"groupAdd",num:num,value:{num:soldierNum,loc:loc}});
        });
        //进攻输入
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
            console.log("a");
            var parent = $(this).parent();
            var id = parent.attr("id");
            var num = id.split("_")[1];
            self.model.testCampInput("soldierArrange",{type:"loc","num":num,value:this.value})
        });
        //队伍拆分
        $(".campSepBtn").click(function(){
            var parent = $(this).parent();
            var id = parent.attr("id");
            var num = id.split("_")[1];
            self.model.testCampInput("soldierArrange",{type:"groupSep","num":num,value:this.value})
        });
        //阵营提交
        $("#campSubmitBtn").click(function(){
            self.model.submitStrategy();
        });

    };
    p._battleGroundCacheRefresh = function(){
        var width = 40;
        var height = 40;
        var self = this;
        var canvas = this.battleGroundCache;
        var cxt = canvas.getContext("2d");
        cxt.clearRect(0,0,500,500);

        //绘制战场
        var bG = this.model.battleGround;
        //先涂黑
        cxt.beginPath();
        cxt.strokeStyle = "red";
        var w = bG.width;
        var h = bG.height;
        for(var i = 0;i<w;i++){
            for(var j = 0;j<h;j++){
                cxt.strokeRect(width*i,height*j,width,height);
                cxt.fillStyle = "grey";
                cxt.fillRect(width*i + 1,height*j + 1,width - 2,height -2);
                var num = j*w + i;
                cxt.fillStyle = "white";
                cxt.fillText(""+num,width*(i + 0.5),height*(j+0.25))
            }
        }
        cxt.closePath();
        //再把能看见的涂白
        cxt.beginPath();
        var visibleBlocks = bG.visibleBlocks;
        var vB_i,loc_i,_x,_y;
        var selfCamp = this.model.getSelfCamp();
        for(var i = 0;i<visibleBlocks.length;i++){
            vB_i = visibleBlocks[i];
            loc_i = vB_i.loc;
            _x = loc_i%w;
            _y = parseInt(loc_i/w);
            cxt.fillStyle = "white";
            cxt.fillRect(width*_x + 1,height*_y + 1,width - 2,height -2);
            cxt.fillStyle = "grey";
            cxt.fillText(""+loc_i,width*(_x + 0.5),height*(_y+0.25));
            var groupList = vB_i.groupList;
            var group_i;
            for(var p = 0;p<groupList.length;p++){
                group_i = groupList[p];
                if(group_i.campId == selfCamp.id){
                    cxt.fillStyle = "red";
                }else{
                    cxt.fillStyle = "blue";
                }
                cxt.fillRect(width*_x + 1,height*_y + 1,5,5);
            }
        };
        cxt.closePath();
    };
    p._strategyCacheRefresh = function(){
        var width = 40;
        var height = 40;
        var self = this;
        var canvas = self.strategyCache;
        var cxt = canvas.getContext("2d");
        cxt.clearRect(0,0,500,500);
        var bG = this.model.battleGround;
        var w = bG.width;
        var h = bG.height;
        var camp = this.model.getSelfCamp();
        if(camp){
            var groupList = camp.groupList;
            var s_i = null;
            for(var i = 0;i<groupList.length;i++){
                s_i = groupList[i];
                if(s_i.loc >= 0){
                    //绘制坐标位置
                    var x = s_i.loc%w;
                    var y = parseInt(s_i.loc/w);

                    var _x = width*(x + 0.5);
                    var _y = height*(y + 0.5);

                    cxt.fillStyle = s_i.fillColor;
                    cxt.fillRect(_x -5,_y -3,10,6);
                    cxt.textAlign = "center";
                    cxt.fillText(s_i.type,width*(x + 0.5),height*(y + 0.5)+ 15);

                    if(s_i.aimLoc>= 0){
                        var aX = s_i.aimLoc%w;
                        var aY = parseInt(s_i.aimLoc/w);

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
                        var tX = s_i.attLoc%w;
                        var tY = parseInt(s_i.attLoc/w);

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
            };
        }
    };
    p.draw = function(camp){
        var self = this;
        var canvas = self.div;
        var cxt = canvas.getContext("2d");
        cxt.clearRect(0,0,500,500);
        cxt.drawImage(this.battleGroundCache,0,0);
        cxt.drawImage(this.strategyCache,0,0);
    };
    p.addBasicStruct = function(){
        var self = this;
        var canvas = self.div;
        canvas.width = 400;
        canvas.height = 320;
        this.draw();
    };
    return StrategyView;
})