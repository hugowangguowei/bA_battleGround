/**
 * Created by wgw on 2016/4/14.
 */
define(function(require){
    var baNode = require("baBasicLib/model/baNode");
    var ID_Manager = require("privateLib/config/ID_Manager").getInstance();
    function MemTag(id,container,scene){
        baNode.call(this);
        this.id = id;
        this.viewID = ID_Manager.getNewIdForMemViewTag();
        this.type = "MemTag";
        this.scene = scene;
        this.container = container
        this.memInfo = {};
        this.initialize();
    };
    MemTag.prototype = new baNode();
    MemTag.prototype.initialize = function(){
        if(this.scene){
            this.scene.addChild(this);
        }
        if(this.container){
            this.addToContainer();
        }
    }
    MemTag.prototype.addToContainer = function(){
        this.container.addMemTag(this);
    }
    MemTag.prototype.updateToContainer = function(){
        this.container.updateMemTag(this);
    }
    MemTag.prototype.removeFromContainer = function(){
        this.container.removeMemTag(this);
    }

    return MemTag;
});