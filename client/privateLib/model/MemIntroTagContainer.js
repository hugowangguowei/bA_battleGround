/**
 * Created by wgw on 2016/4/4.
 */
define(function(require){
    var baNode = require("baBasicLib/model/baNode");
    function MemIntroTagContainer(id,scene){
        baNode.call(this);
        this.id = id;
        this.type = "MemIntroTag";
        this.scene = scene;
        this.memIntroTagList = [];
        this._picked_MIT_ID = null;
        this.initialize();
    };
    MemIntroTagContainer.prototype = new baNode();
    MemIntroTagContainer.prototype.initialize = function(){
        if(this.scene){
            this.scene.addChild(this);
        }
    };
    MemIntroTagContainer.prototype.addMemIntroTag = function(mit){
        this.memIntroTagList.push(mit);
    };
    MemIntroTagContainer.prototype.updateMemIntroTag = function(mit){

    };
    MemIntroTagContainer.prototype.removeMemIntroTag = function(mit){

    };
    return MemIntroTagContainer;

});