/**
 * Created by wangguowei on 2001/1/1.
 */

define(function(require){
    var baSprite = require('baBasicLib/baSprite');

    function outerStruct(id,x,y,w,h,reflectable){
        baSprite.call(this);

        this.id = id;
        this.type = "outerStruct";
        this.reflectable = reflectable;
        this.nodeList = {};
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.borderInfo = {
            left:3,
            right:3,
            top:3,
            bottom:3
        };
        this.showWindowConfig = {
            x:this.x + this.borderInfo.left,
            y:this.y + this.borderInfo.top,
            w:this.width - this.borderInfo.left - this.borderInfo.right,
            h:this.height - this.borderInfo.top - this.borderInfo.bottom
        };
        this.showWindowCanvas = document.createElement("canvas");
        this.showWindowCanvas.width = this.showWindowConfig.w;
        this.showWindowCanvas.height = this.showWindowConfig.h;
    }
    outerStruct.prototype = new baSprite();
    outerStruct.prototype.addNode = function(node,group_name){
        var groupName = group_name||node.type;
        if(!this.nodeList[groupName]){
            this.nodeList[groupName] = {list:[],chosenType:"single",curChosen:"no"};
        }
        this.nodeList[groupName].list.push(node);
        node.structParent = this;
        if(!node.group){
            node.group = groupName;
        }
    };
    outerStruct.prototype.removeNode = function(node){
        var group = this.nodeList[node.group];
        if(!group){
            return 0;
        }
        for(var i=0;i<group.list.length;i++){
            var node_i = group.list[i];
            if(node.id == node_i.id){
                group.list.splice(i,1);
                node_i.removeFromLayer();
            }
        }
    };
    outerStruct.prototype.removeAllNodes = function(){
        for(var i in this.nodeList){
            var group_i = this.nodeList[i];
            var group_i_list = group_i.list;
            for(var m = 0;m<group_i_list.length;m++){
                var sprite_m = group_i_list[m];
                sprite_m.removeFromLayer();
            }
        }
        this.nodeList = {};
    };
    outerStruct.prototype.draw = function(canvas){
        var self = this;
        this.refresh(self);
        this.drawSelf(self,canvas);
    };
    outerStruct.prototype.refresh = function(self){
        self.cleanCache();
        for(var i in this.nodeList){
            var group_i = this.nodeList[i];
            var group_i_list = group_i.list;
            for(var m = 0;m<group_i_list.length;m++){
                var sprite_m = group_i_list[m];
                sprite_m.draw(self.showWindowCanvas);
            }
        }
    };
    outerStruct.prototype.drawSelf = function(self,canvas){
        var cxt = canvas.getContext("2d");
        var sW = self.showWindowConfig;
        cxt.drawImage(self.showWindowCanvas,sW.x,sW.y,sW.w,sW.h);

        cxt.strokeStyle = "black";
        cxt.strokeRect(self.x,self.y,self.width,self.height);
        var sB = self.borderInfo;
        cxt.strokeRect(self.x + sB.left, self.y + sB.top,
            self.width - sB.left- sB.right,self.height - sB.top - sB.bottom);
    };
    outerStruct.prototype.cleanCache = function(){
        var canvas = this.showWindowCanvas;
        var cxt = canvas.getContext("2d");
        cxt.clearRect(0,0,canvas.width,canvas.height);
    };
    outerStruct.prototype.onMouseWheel = function(deltaY){
        this._curLoc += deltaY/10
        this._curLoc<0?this._curLoc = 0:this._curLoc;
    };
    outerStruct.prototype.nodeFocusChange = function(node){
        var groupName = node.group;
        var groupInfo = this.nodeList[groupName];
        var group = groupInfo.list;
        if(groupInfo.chosenType == "single"&& node.isFocusOn){
            var node_i;
            for(var i = 0;i<group.length;i++){
                node_i = group[i];
                if(node_i.id!= node.id && node_i.isFocusOn){
                    node_i.focusChange('auto');
                }
            }
        }
    }

    return outerStruct;
});


















