/**
 * Created by wgw on 2016/4/30.
 */

define(function(require) {
    var Soldier = require("../Soldier");

    function Archer(camp,soldierInfo){
        Soldier.call(this,camp,soldierInfo);
        this.type = "archer";
        this.brave = 0.8;
        this.obey = 0.5;

        this.attackNum = 10;
        this.defendNum = 10;

        this.fillColor = "green";
    }

    Archer.prototype = new Soldier();

    return Archer;
});