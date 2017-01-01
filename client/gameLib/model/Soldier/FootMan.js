/**
 * Created by wgw on 2016/4/30.
 */

define(function (require) {
    var Soldier = require("../Soldier");

    function FootMan(camp,soldierInfo){
        Soldier.call(this,camp,soldierInfo);
        this.type = "footMan";
        this.brave = 0.8;
        this.obey = 0.5;
        this.attackNum = 10;
        this.defendNum = 10;

        this.fillColor = "red";
    }

    FootMan.prototype = new Soldier();

    return FootMan;
})