/**
 * Created by wgw on 2016/4/2.
 */
define(function(require){

    var View = require("baBasicLib/view/View");
    var viewConfig = require("privateLib/view/ViewConfig");
    var listenerType = viewConfig.listenerType;
    var listenerClass = viewConfig.listenerClass;
    var getGUID = require("baBasicLib/util/GUID");
    var SMT = require('privateLib/webSocket/WS_msgDefine').SMT;
    var btn_event = require("privateLib/config/btn_event");


    function CSSView(div,model){
        View.call(this,div,model);
        this.id = getGUID();
        this.div = null;
        this.model = null;
        this.initialize(div,model);
    };

    CSSView.prototype = new View();
    CSSView.prototype.initialize = function(div,model,width,height){
        this.model = model;
        this.setDIV(div,width,height);
        this.addOriListeners();
    }
    CSSView.prototype.setDIV = function(div,width,height){
        this.baseDiv = div;
        var width = width||1400;
        var height = height||700;
        this.width = width;
        this.height = height;
        this.baseDiv.width = width;
        this.baseDiv.height = height;
        this.baseDiv.style.width = width + "px";
        this.baseDiv.style.height = height + "px";
        this.baseDiv.style.position = "relative";
        this.baseDiv.style.top = "0px";
        this.baseDiv.style.left = "0px";
        this.baseDiv.style.zIndex = 0;
    },
    CSSView.prototype.addOriListeners = function(){
        var _this = this;
        var prop = {
            id:this.id,
            class:listenerClass.ORI
        };
        this.model.addListener(listenerType.SCENE_CHANGE,prop,function(arg){
            _this.changeScene(arg[0]);
        });
        this.model.addListener(listenerType.RESURE_CHECK,prop,function(arg){
            var msg = arg[0];
            var $resureLayer = $("<div></div>");
            $resureLayer.attr("id","resureLayer");
            $resureLayer.html(
                "<div id = 'resureLayer_text_1'>" + msg.text + "</div>" +
                "<input id = 'resureLayer_btn_1' type = 'button' value = '"+ msg.Y+ "'>"+
                "<input id = 'resureLayer_btn_2' type = 'button' value = '"+ msg.N+ "'>"
            );
            $("#mainDiv").append($resureLayer);
            $("#resureLayer_btn_1").on("click",function(){
                _this.model.resureChecker.returnCheckResult(true);
            });
            $("#resureLayer_btn_2").on("click",function(){
                _this.model.resureChecker.returnCheckResult(false);
            })

        });
        this.model.addListener(listenerType.RESURE_CHECK_FINISH,prop,function(arg){
            $("#resureLayer").remove();
        })
    };
    CSSView.prototype.changeScene = function(sceneName){
        var _this = this;
        var prop = {
            id:this.id,
            class:listenerClass.SCENE_MONOPOLY
        };
        $('#outS').remove();
        _this.model.removeListener({id:_this.id,listenerClass:listenerClass.SCENE_MONOPOLY});
        switch (sceneName) {
            case "gameLoading":
                changeScene_gameLoading();
                break;
            case "mainShow":
                changeScene_mainShow();
                break;
            case "mainShowBasicStruct":
                changeScene_mainShowBasicStruct();
                break;
            case "gameStruct":
                changeScene_gameStruct();
                break;
        }
        function changeScene_gameLoading(){
        }
        function changeScene_mainShow(){
            $('#mainDiv').html(
                "<div id = 'outS'>"+
                "<div id = 'INIT_name'>"+
                "<h2>Hi,YOU</h2>"+
                "</div>"+
                "<input id = 'INIT_connect' type='button' class='INIT_connect' value='connectToServer'>"+
                "</div>"
            )
            $('#INIT_connect').on('click',function(){
                btn_event.BTN_E_connectToServer();
            });
        }
        function changeScene_mainShowBasicStruct(){
            $('#mainDiv').html(
                "<div id = 'outS'>"+
                    "<div id = 'MT_title'></div>"+
                    "<div id = 'MT_main'>"+
                        "<div id = 'MT_leftFrame1'></div>"+
                        "<div id = 'MT_leftFrame2'></div>"+
                        "<div id = 'MT_middleFrame'></div>"+
                        "<div id = 'MT_rightFrame1'></div>"+
                        "<div id = 'MT_rightFrame2'>"+
                            "<input type='button' id = 'MT_btn1' class='roomBtn' value='buildRoom'>"+
                            "<input type='button' id = 'MT_btn2' class='roomBtn' value='getIntoRoom'>"+
                            "<input type='button' id = 'MT_btn3' class='roomBtn' value='searchRoom'>"+
                            "<div id = 'MT_rF_buildRoom'>" +
                                "<input type = 'text' id = 'MT_rF_bR_input1' class = 'MT_rF_buildRoomInner' placeholder='房间名称：默认随机'>"+
                                "<input type = 'text' id = 'MT_rF_bR_input2' class = 'MT_rF_buildRoomInner' placeholder='人数：默认5'>"+
                                "<div id = 'MT_rF_bR_show1' class='MT_rF_buildRoomInner'></div>"+
                                "<div id = 'MT_rF_bR_show2' class='MT_rF_buildRoomInner'>" +
                                    "<input type = 'button' id = 'MT_btn1_1' class = 'MT_roomBtn_inner1' value = '确定'>"+
                                    "<input type = 'button' id = 'MT_btn1_2' class = 'MT_roomBtn_inner1' value = '取消'>"+
                                "</div>"+
                            "</div>"+
                            "<div id = 'MT_rF_searchRoom'>" +
                                "<input type = 'text' id = 'MT_rF_iP_input1' class = 'MT_rF_buildRoomInner' placeholder='请输入房间ID'>"+
                                "<div id = 'MT_rF_iP_show1' class='MT_rF_buildRoomInner'></div>"+
                                "<div id = 'MT_rF_iP_show2' class='MT_rF_buildRoomInner'>" +
                                    "<input type = 'button' id = 'MT_btn3_1' class = 'MT_roomBtn_inner1' value = '确定'>"+
                                    "<input type = 'button' id = 'MT_btn3_2' class = 'MT_roomBtn_inner1' value = '取消'>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                    "<div id = 'MT_bottom'>"+
                        "<div id = 'MT_bottomFrame'>"+
                            "<div id = 'MT_b_wrap'>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>"
            );
            /**
             * 添加绑定函数
             */
            (function(){
                _this.model.addListener(listenerType.ADD_ROOM_INTRO_TAG,prop,function(msg){
                    var roomIntroTag = msg[0];
                    MT_buildNewRoom(roomIntroTag);
                });
                _this.model.addListener(listenerType.REFRESH_ROOM_INTRO_TAG,prop,function(msg){
                    console.log("refreshRoomIntroTag");
                });
                _this.model.addListener(listenerType.INTO_WAITING_QUEUE,prop,function(msg){
                    var userType = msg[0];

                    var $memControlBtns = $("#MT_gameControl_div");
                    if($memControlBtns.length == 0){
                        var $memControlBtns = $("<div></div>");
                        $memControlBtns.attr("id","MT_gameControl_div");
                        $("#MT_bottom").append($memControlBtns);
                    }
                    switch (userType){
                        case "leader":
                            $memControlBtns.html(
                                "<input type='button' id = 'MT_gC_start'class = 'MT_gameControl_btns' value = '开始'>" +
                                "<input type='button' id = 'MT_gC_leaderQuit' class = 'mT_gameControl_btns' value = '退出房间'>" +
                                "<input type='button' id = 'MT_gC_kick' class = 'mT_gameControl_btns' value = '踢除用户'>"
                            )
                            $('#MT_gC_start').on('click',function(e){
                                btn_event.BTN_E_startGame();
                            });
                            break;
                        case "normalMem":
                            $memControlBtns.html(
                                "<input type = 'button' id = 'MT_gC_start'class = 'MT_gameControl_btns' value = '准备'>"
                            )
                            break;
                    }
                });
                _this.model.addListener(listenerType.ADD_MEM_INTRO_TAG,prop,function(msg){
                    var memIntroTag = msg[0];
                    MT_buildNewMemIntro(memIntroTag);
                });

                $("#MT_leftFrame2").hide();
                $("#MT_rightFrame1").hide();
                $("#MT_rF_buildRoom").hide();
                $("#MT_rF_searchRoom").hide();
                $("#MT_leftFrame1").on("click",function(){
                    $("#MT_leftFrame1").hide();
                    $("#MT_leftFrame2").show();
                });
                $("#MT_leftFrame2").on("click",function(){
                    $("#MT_leftFrame2").hide();
                    $("#MT_leftFrame1").show();
                });
                $("#MT_rightFrame1").on("click",function(){
                    $("#MT_rightFrame1").hide();
                    $("#MT_rightFrame2").show();
                });
                $("#MT_rightFrame2").on("click",function(){
                    $("#MT_rightFrame2").hide();
                    $("#MT_rightFrame1").show();
                });
                $("#MT_btn1").on("click",function(e){
                    var $MT_rF_buildRoom = $('#MT_rF_buildRoom');
                    var $MT_rF_searchRoom = $('#MT_rF_searchRoom');
                    $MT_rF_searchRoom.hide();
                    if($MT_rF_buildRoom.is(":hidden")){
                        $MT_rF_buildRoom.show();
                    }
                    return false;
                });
                $("#MT_btn2").attr("disabled",true);
                $("#MT_btn2").on("click",function(e){
                    btn_event.BTN_E_getIntoARoom();
                    return false;
                });
                $('#MT_btn3').on('click',function(e){
                    var $MT_rF_buildRoom = $('#MT_rF_buildRoom');
                    var $MT_rF_searchRoom = $('#MT_rF_searchRoom');
                    $MT_rF_buildRoom.hide();
                    if($MT_rF_searchRoom.is(":hidden")){
                        $MT_rF_searchRoom.show();
                    }
                    return false;
                });
                $('#MT_rF_buildRoom').on('click',function(e){return false;});
                $('#MT_btn1_1').on('click',function(e){
                    $('#MT_rF_bR_show1').html("please wait...");
                    var roomName = "room_" + $("#MT_rF_bR_input1").val();
                    var memNum = parseInt($("#MT_rF_bR_input2").val());
                    var msg = {name:roomName,memNum:memNum};
                    btn_event.BTN_E_createNewRoom()(msg);
                });
                $('#MT_btn1_2').on('click',function(e){
                    //TODO 如果处于正在连接状态，需要注意
                    $('#MT_rF_buildRoom').hide();
                });
                $('#MT_rF_searchRoom').on('click',function(e){return false;});
                $('#MT_btn3_1').on('click',function(e){
                    console.log("发送请求");
                });
                $('#MT_btn3_2').on('click',function(e){
                    $('#MT_rF_invitePlayer').hide();
                });

                function MT_buildNewRoom(roomIntroTag){
                    var $newRoom = $("<div></div>").addClass("roomIntro");
                    $newRoom.html(
                        "<div class='rI_b1'></div>" +
                        "<div class='rI_b2'></div>" +
                        "<div class='rI_b3'></div>"
                    )
                    var divID = roomIntroTag.viewID;
                    $newRoom.attr("id",divID);
                    var roomID = roomIntroTag.id;
                    var $b1 = $newRoom.find('.rI_b1');
                    $b1.html(roomID);
                    $newRoom.click(function(e){
                        var roomIntroList = $('.roomIntro');
                        roomIntroList.removeClass("roomIntroSelected");
                        $(this).addClass("roomIntroSelected");
                        $("#MT_btn2").attr("disabled",false);
                        btn_event.BTN_E_clickARoom(roomIntroTag);
                    })
                    $("#MT_middleFrame").append($newRoom);
                }
                function MT_buildNewMemIntro(){
                    var $newRoom = $("<div></div>").addClass("MT_memIntro");
                    $newRoom.html(
                        "<div class='mI_img'></div>"
                    )
                    $("#MT_b_wrap").append($newRoom);
                }
            })();
        }
        function changeScene_gameStruct(){
            $('#mainDiv').html(
                "<div id = 'outS'>" +
                    "<div id = 'GA_title'></div>"+
                    "<div id = 'GA_main'>"+
                        "<div id = 'GA_leftFrame1'></div>"+
                        "<div id = 'GA_leftFrame2'></div>"+
                        "<div id = 'GA_middleFrame'></div>"+
                        "<div id = 'GA_rightFrame0'>" +
                            "<div id = 'GA_memContainer'></div>"+
                        "</div>"+
                        "<div id = 'GA_rightFrame1'></div>"+
                        "<div id = 'GA_rightFrame2'>"+
                            "<input type='button' id = 'GA_rF2_btn1' class='roomBtn' value='quitRoom'>"+
                            "<input type='button' id = 'GA_rF2_btn2' class='roomBtn' value='userProp'>"+
                            "<input type='button' id = 'GA_rF2_btn3' class='roomBtn' value='setting'>"+
                        "</div>"+
                    "</div>"+
                    "<div id = 'GA_bottom'>"+
                        "<input type='text' id = 'GA_input'>"+
                        "<input type='button' id='GA_submitBtn' value='submit'>"+
                    "</div>"+
                "</div>"
            );
            (function () {
                _this.model.addListener(listenerType.ADD_TEXT,prop,function(msg){
                    var msgInfo = msg[0];
                    var $newTextTag = $('<div></div>').addClass('GA_textTag');
                    $newTextTag.html(
                        "<div class = 'GA_tT1'></div>" +
                        "<div class='GA_tT2'>"+ msgInfo + "</div>"
                    )
                    $("#GA_middleFrame").append($newTextTag);
                });
                _this.model.addListener(listenerType.ADD_MEM_TAG,prop,function(msg){
                    var $newMem = $("<div></div>").addClass("GA_memTag");
                    $('#GA_memContainer').append($newMem);
                });
                _this.model.addListener(listenerType.REFRESH_MEM_TAG,prop,function(msg){});
                _this.model.addListener(listenerType.REMOVE_MEM_TAG,prop,function(msg){});
                $("#GA_leftFrame2").hide();
                $("#GA_rightFrame1").hide();
                $("#GA_leftFrame1").on("click",function(){
                    $("#GA_leftFrame1").hide();
                    $("#GA_leftFrame2").show();
                });
                $("#GA_leftFrame2").on("click",function(){
                    $("#GA_leftFrame2").hide();
                    $("#GA_leftFrame1").show();
                });
                $("#GA_rightFrame1").on("click",function(){
                    $("#GA_rightFrame1").hide();
                    $("#GA_rightFrame2").show();
                });
                $("#GA_rightFrame2").on("click",function(){
                    $("#GA_rightFrame2").hide();
                    $("#GA_rightFrame1").show();
                });
                $("#GA_rF2_btn1").on("click",function(){
                    _this.model.resureChecker.check(this,quit,cancelQuit);
                    function quit(){
                        console.log("quit");
                    }
                    function  cancelQuit(){
                        console.log("cancelQuit");
                    }
                    return false;
                });
                $("#GA_submitBtn").on("click",function(){
                    var $GA_input = $('#GA_input')
                    var value = $GA_input.val();
                    $GA_input.val("");
                    btn_event.BTN_E_clientSubmit(value);
                });

            })();
        }
    }

    return CSSView;
})