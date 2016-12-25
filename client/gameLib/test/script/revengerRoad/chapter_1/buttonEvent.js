/**
 * Created by wgw on 2016/5/12.
 */

var imageList = {};
var server_info = null;
var s_w = screen.width; var s_h = screen.height;

function init(){
    $("#t1").val("添加小熊");
    $("#t1").hide();
    $("#t2").val("连接服务器");
    $("#t3").val("开始游戏");
    $("#t3").hide();
    $("#t4").val("加入游戏");
    $("#t4").hide();
    $("#t5").val("关闭当前游戏");
    $("#t5").hide();
    $("#t6").hide();
    $("#roomSelect").hide();
    $("#refreshGameList").hide();
    $("#charaSelect").hide();
    $("#introduce").hide();
}

function test0(){
    var password = document.getElementById("MPassword").value;
    if(password == "yf"){
        login();
    }
}

var isManager = false;

function login(){
    isManager = true;
    console.log("登录成功");
}

//添加小熊
function test1(){
    for(var i = 0;i<5;i++){
        var id = "bear_" + Math.random();
        var loc = {x:parseInt(Math.random()*1000),y:parseInt(Math.random()*800),direction:0};
        var info = {type:"addSprite",detail:{type:"bear",prop:{id:id,loc:loc}}};
        WSM.sendMsg("gameInput",info);
    }
    for(var i = 0;i<5;i++){
        var id = "knight_" + Math.random();
        var loc = {x:parseInt(Math.random()*1000),y:parseInt(Math.random()*800),direction:0};
        var info = {type:"addSprite",detail:{type:"knight",prop:{id:id,loc:loc}}};
        WSM.sendMsg("gameInput",info);
    }
}

//根据localStorage初始化userId
function initUserId(){
    setTimeout(function(){
        if(localStorage.userId){
            $("#userId").attr('placeholder',"默认：" +localStorage.userId);
        };
    },100);

}

//选择一个ID
function registerId(){
    var val = $("#userId").val();
    if(val == ""){
        if(!localStorage.userId){
            alert("请输入你的昵称，谢谢");
            return;
        }
    }else{
        var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
        if(reg.test(val)){
            alert("不要使用中文字符。。这里有个问题没有解决。。");
            return;
        }
        localStorage.userId = val;
        localStorage.UNI_Id = val +"_" + (Math.random()).toFixed(4);
    }
}

//请求连接服务器
function test2(){
    //$("#t2").attr('disabled','true');
    require(
        ['baBasicLib/webSocket/WS_Manager',
        'gameLib/webSocket/WS_Config',
        'gameLib/webSocket/WS_msgDefine'],
        function(wsManager,wsConfig,wsMDF){
            WSM = wsManager.getInstance(gm,wsConfig,wsMDF);
            WSM.connectToServer();
        }
    )
}

//连接服务器成功
function connectServer_suc(serverInfo){
    server_info = serverInfo;
    $("#t2").hide();

    var select = $("#roomSelect");
    for(var i = 0;i<serverInfo.length;i++){
        var value = serverInfo[i];
        var s = $("<option></option>");
        s.attr('value',value.id);
        s.html(value.id);
        select.append(s);
    }
    if(serverInfo[0]){
        refreshCharaList(serverInfo[0]);
    }

    if(isManager){
        $("#t1").show();
        $("#t3").show();
        $("#t5").show();
        if(!serverInfo.length){
            $("#refreshGameList").show();
        }
        else{
            $("#roomSelect").show();
        }
    }
    else{
        if(!serverInfo.length){
            alert("当前没有游戏，请试着刷新一下");
            $("#refreshGameList").show();
        }
        else{
            $("#roomSelect").show();
            $("#charaSelect").show();
            $("#t4").show();
        }
    }
    $("#t6").show();
}

//更改游戏列表中的可选择职业
function changeRoomSelect(e){
    var val = e.options[e.selectedIndex].text;
    if(!server_info)return;

    var game_i;
    for (var i = 0;i< server_info.length;i++){
        game_i = server_info[i];
        if(game_i.id == val){
            refreshCharaList(game_i);
        }
    };

}

//更新游戏列表
function refreshGameList(){
    alert("哈哈。大兄弟，刷新游戏列表的功能还没有添加，你直接按f5刷新一波吧~爱你");
}

//刷新游戏中的角色列表
function refreshCharaList(game_i){
    var gameInfo = game_i.charaControl;
    var select = $("#charaSelect");
    for(var i in gameInfo){
        var s = $("<option></option>");
        s.attr('value',i);
        s.html(i);
        select.append(s);
    }
}

//创建游戏
function test3(){
    WSM.webSocket.emit('startGame');
}

//加入一个游戏
function test4(){
    var gameID = $("#roomSelect").val();
    var charaType = $("#charaSelect").val();
    console.log(charaType);
    WSM.webSocket.emit('joinGame',{gameID:gameID,charaType:charaType});
}

//关闭一个游戏
function test5(){
    WSM.webSocket.emit('closeGame');
}

//查看帮助文档
function test6(){
    if($("#introduce").is(':hidden')){
        $("#introduce").show();
        $("#t6").val("关闭帮助文档");
    }else{
        $("#introduce").hide();
        $("#t6").val("查看帮助文档");
    }
}

//gameInput消息格式示范
/*
var msg = {
    type:"XX",(refreshSprite)
    detail:{
        type:"acc",
        detail:""
    }
}
*/

$(document).keydown(function(event){
    //console.log(event.keyCode);
    switch (event.keyCode){
        case 65:
            WSM.sendMsg("gameInput",{type:"refreshSprite",detail:{type:"turnLeft",detail:""}});
            break;
        case 87:
            WSM.sendMsg("gameInput",{type:"refreshSprite",detail:{type:"acc",detail:""}});
            break;
        case 68:
            WSM.sendMsg("gameInput",{type:"refreshSprite",detail:{type:"turnRight",detail:""}});
            break;
        case 83:
            WSM.sendMsg("gameInput",{type:"refreshSprite",detail:{type:"draw",detail:""}});
            break;

        case 37:
            //Left
            WSM.sendMsg("gameInput",{type:"refreshSprite",detail:{type:"turnLeft",detail:""}});
            break;
        case 38:
            //Up
            WSM.sendMsg("gameInput",{type:"refreshSprite",detail:{type:"acc",detail:""}});
            break;
        case 39:
            //Right
            WSM.sendMsg("gameInput",{type:"refreshSprite",detail:{type:"turnRight",detail:""}});
            break;
        case 40:
            //Down
            WSM.sendMsg("gameInput",{type:"refreshSprite",detail:{type:"draw",detail:""}});
            break;
    }
});