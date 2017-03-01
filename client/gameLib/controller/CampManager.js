/**
 * Created by wgw on 2016/11/18.
 */

define(function(require){
    var Camp = require("gameLib/model/Camp");
    var instance = null;

    function CampManager(){
        this.campList = [];
    }

    CampManager.prototype = {
        addCamp:function(camp){
            this.campList.push(camp);
        }
    }

    return {
        getInstance:function(){
            if(!instance){
                instance = new CampManager();
            }
            return instance;
        }
    }

});