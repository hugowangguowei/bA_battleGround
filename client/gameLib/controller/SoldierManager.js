/**
 * Created by wgw on 2016/11/18.
 */

define(function(require){
    var Archer = require("../model/Soldier/Archer");
    var FootMan = require("../model/Soldier/FootMan");
    var Knight = require("../model/Soldier/Knight");

    var instance = null;

    function SoldierManager(){

    }

    SoldierManager.prototype = {
        generateSoldierByType:function(type,camp,soldierInfo){
            var soldier;
            switch(type){
                case "footMan":
                    soldier = new FootMan(camp,soldierInfo);
                    break;
                case "archer":
                    soldier = new Archer(camp,soldierInfo);
                    break;
                case "knight":
                    soldier = new Knight(camp,soldierInfo);
                    break;
            }
            return soldier;
        }

    }

    return {
        getInstance:function(){
            if(!instance){
                instance = new SoldierManager();
            }
            return instance;
        }
    }

});