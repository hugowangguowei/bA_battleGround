/**
 * Created by wgw on 2016/8/16.
 */
define(function (require) {
    var Sprite_c1 = require("gameLib/script/revengerRoad/chapter_1/sprite/Sprite_c1");
    var util = require("baBasicLib/util/baLib");
    var GUID = require("baBasicLib/util/GUID");
    var KingView = require("gameLib/script/revengerRoad/chapter_1/spriteView/KingView");

    function King(prop){
        Sprite_c1.call(this);
        this.id = GUID();
        this.type = "king";
        this.bindView = new KingView(this)
        this.initialize(prop);
    }

    King.prototype = new Sprite_c1();
    return King;
})