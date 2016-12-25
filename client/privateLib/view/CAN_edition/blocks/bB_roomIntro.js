/**
 * Created by wangguowei on 2001/1/11.
 */
define(function(require){
    var basicBlock = require("privateLib/basicBlock");
    function bB_roomIntro(id){
        basicBlock.call(this);
        this.id = id;
        this.type = "roomIntro";
        this._roomInfo = {};
        this._leaderIntro = {};
        this._memberIntro = {};
    }

    bB_roomIntro.prototype = new basicBlock();
    return bB_roomIntro;
});






















