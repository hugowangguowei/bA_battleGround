/**
 * Created by wgw on 2016/4/30.
 */
define(function (require) {
    var Sprite_c1 = require("gameLib/script/revengerRoad/chapter_1/sprite/Sprite_c1");
    var util = require("baBasicLib/util/baLib");
    var GUID = require("baBasicLib/util/GUID");
    var bearView = require("gameLib/script/revengerRoad/chapter_1/spriteView/BearView");

    function Bear(prop){
        Sprite_c1.call(this);
        this.type = "bear";
        this.bindView = new bearView(this)
        this.initialize(prop);
    }

    Bear.prototype = new Sprite_c1();
    return Bear;
})