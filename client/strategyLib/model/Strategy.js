/**
 * Created by wgw on 2016/6/27.
 */
define(function(require){
    function Strategy(){
        this.isInit = false;
        this.width = 10;
        this.height = 10;
        this.range = 10;
        this.baseUnit = 10;
        this.data = new Int8Array(this.width*this.height);
        this.dataInfo = null;
        this.MLoc = 0;
        this.maxCtr = 5;//最大控制数量
        this.curCtr = 5;//当前控制点数量
    }
    Strategy.prototype.initialize = function(){
    };
    /**
     * 根据sprite的战略能力来生成战略图
     */
    Strategy.prototype.initByAbility = function(ability){
        var range = ability.range;
        var baseUnit = ability.baseUnit;
        var maxCtrl = ability.maxCtr;
        if(range < baseUnit){
            throw new Error("range not correct");
            return;
        }
        this.width = this.height = range/baseUnit;
        this.data = new Int8Array(this.width*this.height);
        this.MLoc = parseInt(this.width/2) + this.width*parseInt(this.height/2);
        this.data[this.MLoc] = 1;
        this.range = range;
        this.baseUnit = baseUnit;
        this.maxCtr = maxCtrl;
        this.curCtr = maxCtrl;
        this.isInit = true;
    };
    Strategy.prototype.input = function (type,loc) {
        switch (type){
            case "add":
                if(this.curCtr <= 0||loc == this.MLoc){
                    return false;
                }
                this.data[loc] = 2;
                this.curCtr--;
                break;
            case "delete":
                if(this.data[loc] == 2){
                    this.data[loc] = 0;
                    this.curCtr++;
                }
                break;
        }
        return true;
    };
    Strategy.prototype.isBuildFinish = function(){
        if(this.curCtr == 0)return true;
        return false;
    };
    Strategy.prototype.getInfo = function(){
        this.dataInfo = this.generateDataInfo();
        return {
            range:this.range,
            baseUnit:this.baseUnit,
            dataInfo:this.dataInfo
        }
    };
    Strategy.prototype.generateDataInfo = function(){
        var dataInfo = [];
        var baseLoc = {
            x:this.MLoc%this.width,
            y:parseInt(this.MLoc/this.width)
        };
        var loc;
        for(var i = 0,len = this.data.length;i<len;i++){
            if(this.data[i] == 2){
                loc = {x:i%this.width, y:parseInt(i/this.width)};
                var _x = this.baseUnit*(loc.x - baseLoc.x);
                var _y = this.baseUnit*(loc.y - baseLoc.y);
                dataInfo.push({x:_x,y:_y});
            }
        }
        return dataInfo;
    }
    return Strategy;
})