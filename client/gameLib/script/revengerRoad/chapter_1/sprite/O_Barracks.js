/**
 * Created by wgw on 2016/8/15.
 */
define(function (require) {
    var Sprite_c1 = require("gameLib/script/revengerRoad/chapter_1/sprite/Sprite_c1");
    var util = require("baBasicLib/util/baLib");
    var GUID = require("baBasicLib/util/GUID");
    var barracksView = require("gameLib/script/revengerRoad/chapter_1/spriteView/BarracksView");

    function Barracks(prop){
        Sprite_c1.call(this);
        this.id = GUID();
        this.type = "barracks";
        this.bindView = new barracksView(this);
        this.initialize(prop);
    }

    Barracks.prototype = new Sprite_c1();
    return Barracks;
})