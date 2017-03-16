/**
 * Created by wgw on 2016/11/18.
 */

define(function(require){
    var Archer = require("../model/group/Archer");
    var FootMan = require("../model/group/FootMan");
    var Knight = require("../model/group/Knight");

    var instance = null;

    function GroupManager(){

    }

    GroupManager.prototype = {
        generateGroupByType:function(type,campId,soldierInfo){
            var group;
            switch(type){
                case "footMan":
                    group = new FootMan(campId,soldierInfo);
                    break;
                case "archer":
                    group = new Archer(campId,soldierInfo);
                    break;
                case "knight":
                    group = new Knight(campId,soldierInfo);
                    break;
            }
            return group;
        }

    }

    return {
        getInstance:function(){
            if(!instance){
                instance = new GroupManager();
            }
            return instance;
        }
    }

});