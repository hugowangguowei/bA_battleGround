/**
 * Created by wgw on 2016/6/24.
 */

define(function (require) {
    var Sprite_c1 = require("gameLib/script/revengerRoad/chapter_1/sprite/Sprite_c1");
    var util = require("baBasicLib/util/baLib");
    var GUID = require("baBasicLib/util/GUID");
    var chiefView = require("gameLib/script/revengerRoad/chapter_1/spriteView/ChiefView");

    function Chief(prop){
        Sprite_c1.call(this);
        this.id = GUID();
        this.type = "chief";
        this.bindView = new chiefView(this)
        this.initialize(prop);
    }

    Chief.prototype = new Sprite_c1();
    return Chief;
})