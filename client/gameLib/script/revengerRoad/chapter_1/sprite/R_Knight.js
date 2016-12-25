/**
 * Created by wgw on 2016/6/9.
 */
define(function (require) {
    var Sprite_c1 = require("gameLib/script/revengerRoad/chapter_1/sprite/Sprite_c1");
    var util = require("baBasicLib/util/baLib");
    var GUID = require("baBasicLib/util/GUID");
    var KnightView = require("gameLib/script/revengerRoad/chapter_1/spriteView/KnightView");

    function Knight(prop){
        Sprite_c1.call(this);
        this.id = GUID();
        this.type = "knight";
        this.bindView = new KnightView(this)
        this.initialize(prop);
    }

    Knight.prototype = new Sprite_c1();
    return Knight;
})