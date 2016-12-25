/**
 * Created by wgw on 2016/4/3.
 */
define(function(require){
    function baScene(id,model){
        this.id = id||null;
        if(this.id == null){
            throw new Error("id needed in baScene");
            return;
        }
        if(model){
            model.sceneArray.push(this);
        }
        this.childList = {};
        this.privatedata = {};
    }
    baScene.prototype = {
        addChild:function(args){
            var id = args.id;
            if(!id){
                throw new Error("baScene:addChild:you must name your sprite!")
                return 0;
            }
            if(this.childList[id]){
                throw new Error("node id is already exist!");
                return 0;
            }
            this.childList[id] = args;
            args.parent = this;
        },
        removeChild:function(args){
            if(!args){
                return 0;
            }
            for(var i in this.childList){
                if(this.childList[i] == args){
                    delete this.childList[i];
                    args.parent = null;
                    if(args.logicChildList&&args.logicChildList.length>0){
                        for(var m in args.logicChildList){
                            var lC_m = args.logicChildList[m];
                            args.removeLogicChild(lC_m);
                        }
                    }
                    if(args.logicParent){
                        args.logicParent.removeLogicChild(args);
                    }
                    return 0;
                }
            }
        },
        removeChildAndTheTree: function (args) {

        },
        removeLeafSpotOfTheTree:function(args){

        },
        removeAllChild:function(){
            for(var i in this.childList){
                this.removeChild(this.childList[i]);
            }
            this.childList = {};
        },
        getChildById: function (id) {
            if(this.childList[id]){
                return this.childList[id];
            }
            return 0;
        },
    }

    return baScene;
})