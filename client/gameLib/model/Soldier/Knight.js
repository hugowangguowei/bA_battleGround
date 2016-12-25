/**
 * Created by wgw on 2016/11/18.
 */

define(function (require) {
    var Soldier = require("../Soldier");

    function Knight(camp,soldierInfo){
        Soldier.call(this,camp,soldierInfo);
        this.type = "knight";
        this.brave = 0.8;
        this.obey = 0.5;

        this.attackNum = 10;
        this.defendNum = 10;

        this.fillColor = "blue";
    }

    Knight.prototype = new Soldier();

    return Knight;
})