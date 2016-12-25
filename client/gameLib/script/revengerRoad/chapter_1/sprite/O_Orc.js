/**
 * Created by wgw on 2016/6/15.
 */

define(function (require) {
    var Sprite_c1 = require("gameLib/script/revengerRoad/chapter_1/sprite/Sprite_c1");
    var util = require("baBasicLib/util/baLib");
    var GUID = require("baBasicLib/util/GUID");
    var orcView = require("gameLib/script/revengerRoad/chapter_1/spriteView/BearView");

    function Orc(prop){
        Sprite_c1.call(this);
        this.id = GUID();
        this.type = "orc";
        this.bindView = new orcView(this);
        this.initialize(prop);
    }

    Orc.prototype = new Sprite_c1();
    return Orc;
})