/**
 * Created by wgw on 2016/4/14.
 */
define(function(require){
    var baNode = require("baBasicLib/model/baNode");
    function MemTagContainer(id,scene){
        baNode.call(this);
        this.id = id;
        this.type = "MemTagContainer";
        this.scene = scene;
        this.memTagList = [];
        this._picked_MT_ID = null;
        this.initialize();
    };
    MemTagContainer.prototype = new baNode();
    MemTagContainer.prototype.initialize = function(){
        if(this.scene){
            this.scene.addChild(this);
        }
    };
    MemTagContainer.prototype.addMemTag = function(mt){
        this.memTagList.push(mt);
    };
    MemTagContainer.prototype.updateMemTag = function(mt){

    };
    MemTagContainer.prototype.removeMemTag = function(mt){

    };
    return MemTagContainer;

});