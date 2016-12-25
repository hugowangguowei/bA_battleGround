/**
 * Created by wgw on 2016/4/4.
 */
define(function(require){
    var baNode = require("baBasicLib/model/baNode");
    var ID_Manager = require("privateLib/config/ID_Manager").getInstance();
    function MemIntroTag(id,container,scene){
        baNode.call(this);
        this.id = id;
        this.viewID = ID_Manager.getNewIdForMemIntroView();
        this.type = "MemIntroTag";
        this.scene = scene;
        this.container = container
        this.memIntroInfo = {};
        this.initialize();
    };
    MemIntroTag.prototype = new baNode();
    MemIntroTag.prototype.initialize = function(){
        if(this.scene){
            this.scene.addChild(this);
        }
        if(this.container){
            this.addToContainer();
        }
    }
    MemIntroTag.prototype.addToContainer = function(){
        this.container.addMemIntroTag(this);
    }
    MemIntroTag.prototype.updateToContainer = function(){
        this.container.updateMemIntroTag(this);
    }
    MemIntroTag.prototype.removeFromContainer = function(){
        this.container.removeMemIntroTag(this);
    }

    return MemIntroTag;
});