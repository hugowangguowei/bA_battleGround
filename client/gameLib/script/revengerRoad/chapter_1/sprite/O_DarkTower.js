/**
 * Created by wgw on 2016/6/13.
 */

define(function (require) {
    var Sprite_c1 = require("gameLib/script/revengerRoad/chapter_1/sprite/Sprite_c1");
    var util = require("baBasicLib/util/baLib");
    var GUID = require("baBasicLib/util/GUID");
    var darkTowerView = require("gameLib/script/revengerRoad/chapter_1/spriteView/DarkTowerView");

    function DarkTower(prop){
        Sprite_c1.call(this);
        this.id = GUID();
        this.type = "darkTower";
        this.bindView = new darkTowerView(this);
        this.evilEye = {
            loc:{x:0,y:0},
            rad:50,
        };
        this.initialize(prop);
    }

    DarkTower.prototype = new Sprite_c1();
    return DarkTower;
})