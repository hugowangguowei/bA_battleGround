/**
 * Created by wgw on 2016/4/3.
 */
define(function(require){
    function baNode(id,scene){
        this.id = id||null;
        this.scene = scene||null;
        this.logicParent = null;
        this.logicChildList = [];
        this.type = "node";
        this.initialize();
    }
    baNode.prototype = {
        initialize:function(){
        },
        addToScene:function(scene){
            scene.addChild(this);
        },
        addToLogicParent:function(arg){
            if(this.logicParent){
                throw new Error("can't add logicParentNode,it's already exist");
                return 0;
            }
            this.logicParent = arg;
            arg.logicChildList.push(this);
        },
        getLogicChild:function(id){
            for(var i in this.logicChildList){
                if(this.logicChildList[i].id == id){
                    return this.logicChildList[i];
                }
            }
            return 0;
        },
        removeLogicChild:function(arg){
            for(var i in this.logicChildList){
                if(this.logicChildList[i] == arg){
                    this.logicChildList.splice(i,1);
                    arg.logicParent = 0;
                    return 0;
                }
            }
            throw new Error("no such logicChild,can't remove");
        },
        removeAllLogicChildren:function(){
            this.logicChildList = [];
        },
        removeLogicParent:function(){
            if(this.logicParent){
                this.logicParent.removeLogicChild(this);
            }
        }
    };

    return baNode;
});