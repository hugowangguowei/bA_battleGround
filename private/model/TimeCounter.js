/**
 * Created by wgw on 2016/4/18.
 */

module.exports = TimeCounter;

function TimeCounter(id){
    this.id = id;
    /**
     * 玩家一回合选择过程的总时间
     * @type {number}
     * @private
     */
    this._playerOpInterval = 30;
    /**
     * 开始该回合的时间戳
     * @type {number}
     * @private
     */
    this._playerOpStamp = 0;
    /**
     * 该回合已经过去的时间计时
     * @type {number}
     * @private
     */
    this._playerOpCount = 30;

    this._battleInterval = 3;
    this._battleStamp = 0;
    this._battleCount = 3;

    this._resultShowInterval = 5;
    this._resultShowStamp = 0;
    this._resultShowCount = 5;

}
TimeCounter.prototype = {
    initialize:function(){
    },
    setPlayerOpInterval:function(t){
        if(t){
            this._playerOpInterval = t;
        }
        return true;
    },
    getPlayerOpCount:function(){
        var nDate = new Date().getTime();
        var interval = (nDate - this._playerOpStamp)/1000;
        this._playerOpCount =parseInt(this._playerOpInterval - interval);
        if(this._playerOpCount<= 0)return 0;
        return this._playerOpCount;
    },
    beginPlayerOp:function(){
        var date = new Date().getTime();
        this._playerOpStamp = date;
    },
    endPlayerOp:function(){
        this._playerOpCount = 0;
    },

    setBattleInterval:function(t){
        if(t){
            this._battleInterval = t;
        }
        return true;
    },
    getBattleCount:function(){
        var nDate = new Date().getTime();
        var interval = (nDate - this._battleStamp)/1000;
        this._battleCount =parseInt(this._battleInterval - interval);
        if(this._battleCount<= 0)return 0;
        return this._battleCount;
    },
    beginBattleOp:function(){
        var date = new Date().getTime();
        this._battleStamp = date;
    },
    endBattleOp:function(){
        this._battleCount = 0;
    },

    setResultShowInterval:function(t){
        if(t){
            this._resultShowInterval = t;
        }
        return true;
    },
    getResultShowCount:function(){
        var nDate = new Date().getTime();
        var interval = (nDate - this._resultShowStamp)/1000;
        this._resultShowCount =parseInt(this._resultShowInterval - interval);
        if(this._resultShowCount<= 0)return 0;
        return this._resultShowCount;
    },
    beginResultShowOp:function(){
        var date = new Date().getTime();
        this._resultShowStamp = date;
    },
    endResultShowOp:function(){
        this._resultShowCount = 0;
    },

    getOutPut: function () {
        return null;
    }
}