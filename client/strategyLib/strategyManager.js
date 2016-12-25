/**
 * Created by wgw on 2016/6/27.
 */

define(function(require){

    var SM_View = require("./view/SM_View");
    var Strategy = require("./model/Strategy");
    var baEventSource = require("baBasicLib/baEventSource");

    function StrategyManager(div,game){
        baEventSource.call(this);
        this.game = game;
        this.div = div;
        this.curStrategy;
        this.initialize(div);
    }

    StrategyManager.prototype = new baEventSource();
    StrategyManager.prototype.initialize = function(div){
        //当前战略
        this.curStrategy = new Strategy();
        //添加视图
        var sView = new SM_View(div,this);
    };
    /**
     * 获取游戏信息
     * @returns {null}
     */
    StrategyManager.prototype.getGameInfo = function(){
        if(!this.game)return null;
        var player = this.game.controlSprite;
    };
    /**
     * 模型输入
     * 参数结构：
     * input:{type:"XX",detail:object}
     * type包括："clickCanvas",
     */
    StrategyManager.prototype.input = function(input){
        switch (input.type){
            case "canvasClick":
                this.canvasInput(input.detail);
                break;
        }
    };
    /**
     * 通过canvas点击获得的输入
     * @param detail
     */
    StrategyManager.prototype.canvasInput = function (detail) {
        var len = this.getBlockByLoc(detail);
        this.curStrategy.input(detail.type,len);
        this.fireEvent("canvasChange");
    }
    /**
     * 根据坐标获取data块的位置
     * @param detail
     * @returns {number}
     */
    StrategyManager.prototype.getBlockByLoc = function(detail){
        var st = this.curStrategy;
        var sw = st.width;
        var sh = st.height;
        var _x = detail.x/detail.w;
        var _y = detail.y/detail.h;
        var bx = parseInt(sw * _x);
        var by = parseInt(sh * _y);
        var len = by * sw + bx;
        return len;
    }
    /**
     * 提交‘战略’
     */
    StrategyManager.prototype.submitStrategy = function(){
        var strategyInfo = this.curStrategy.getInfo();
        //this.game.submitStrategy(strategyInfo);
        if(WSM){
            WSM.sendMsg("submitStrategy",strategyInfo);
        }
    };
    return StrategyManager;

});