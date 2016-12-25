/**
 * Created by wgw on 2016/7/15.
 */

define(function (require) {
    var Sprite_c1 = require("gameLib/script/revengerRoad/chapter_1/sprite/Sprite_c1");
    var util = require("baBasicLib/util/baLib");
    var GUID = require("baBasicLib/util/GUID");
    var captainView = require("gameLib/script/revengerRoad/chapter_1/spriteView/CaptainView");

    function Captain(prop){
        Sprite_c1.call(this);
        this.id = GUID();
        this.type = "captain";
        this.bindView = new captainView(this)
        this.initialize(prop);
    }

    Captain.prototype = new Sprite_c1();
    return Captain;
})