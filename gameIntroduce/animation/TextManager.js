
define(function(require){
    var config = require("../config");
    var dmText = require("./DMText");
    function textManager(){
        this.curText = [];
        this.maxTextNum = 6;
    }
    textManager.prototype = {
        getTextInfo:function(){
            var textList = [],text_i = null;
            for(var i= 0;i<this.curText.length;i++){
                text_i = this.curText[i];
                var textValue = text_i.refresh();
                if(textValue){
                    textList.push(textValue);
                }else{
                    this.curText.splice(i,1);
                    i--;
                }
            }
            if(this.curText.length < this.maxTextNum){
                this.addNewText();
            }
            return textList;
        },
        addNewText:function(){
            var textNum = config.textList.length;
            if(textNum){
                var num = parseInt(Math.random()*textNum);
                var text = config.textList[num];
                var loc = {x:450 + parseInt(Math.random()*500),y:parseInt(Math.random()*250)};
                var dir = Math.random()*Math.PI*2;
                var speed = 1;
                var range = {left:400,right:1000,top:0,bottom:250};
                var alpha = 0.005;
                var life = parseInt(Math.random()*200) + 300;
                var dt = new dmText(text,loc,dir,speed,range,alpha,life);
                this.curText.push(dt);
            }
        }
    }

    return textManager;
})