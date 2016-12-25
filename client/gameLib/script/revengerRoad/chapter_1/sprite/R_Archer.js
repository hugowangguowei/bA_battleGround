/**
 * Created by wgw on 2016/8/18.
 */
define(function (require) {
    var Sprite_c1 = require("gameLib/script/revengerRoad/chapter_1/sprite/Sprite_c1");
    var util = require("baBasicLib/util/baLib");
    var GUID = require("baBasicLib/util/GUID");
    var archerView = require("gameLib/script/revengerRoad/chapter_1/spriteView/ArcherView");

    function Archer(prop){
        Sprite_c1.call(this);
        this.id = GUID();
        this.type = "archer";
        this.bindView = new archerView(this)
        this.initialize(prop);
    }

    Archer.prototype = new Sprite_c1();
    return Archer;
})