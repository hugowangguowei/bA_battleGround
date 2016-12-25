/**
 * Created by wgw on 2016/5/10.
 */
    module.exports = baQuaTree;

    function baQuaTree(){
        this.id = null;
        this.type = "quaTree";
        this.level = 0;
        this.bounds = {x:0,y:0,w:0,h:0};
        this.minW = 1;
        this.minH = 1;
        this.maxSpriteNum = 5;
        this.spriteCount = 0;

        this.markColor = "#FF0000";
        this.parent = null;
        this.nodeList = [];
        this.spriteList = [];
        this.getID();
    }

    baQuaTree.prototype = {
        getID:function(){

        },
        setMaxSpriteNum:function(num){
            this.maxSpriteNum = num;
            return this;
        },
        setMinW:function(num){
            this.minW = num;
            return this;
        },
        setMinH:function(num){
            this.minH = num;
            return this;
        },
        setMarkColor:function(){
            var index = Math.pow(2,this.level);
            if(!this.bounds.w||!this.bounds.h)
                return 0
            var allWidth = index * this.bounds.w;
            var allHeight = index * this.bounds.h;
            var decimal_w = Math.ceil(this.bounds.x * 256/allWidth);
            var decimal_h = Math.ceil(this.bounds.y * 256/allHeight);
            var num_w = decimal_w.toString(16);
            var num_h = decimal_h.toString(16);
            if(num_w <10)
                num_w = "0" + num_w;
            if(num_h <10)
                num_h = "0" + num_h;
            this.markColor = "#" + num_w + num_h + "ff";
        },
        buildBySpriteList:function(spriteList){
            for(var i = 0,len = spriteList.length;i<len;i++){
                var sprite_i = spriteList[i];
                this.insertSprite(sprite_i);
            }
        },
        getSpriteList:function(spriteList){
            var spriteList = spriteList||[];
            if(this.spriteList.length){
                for(var i = 0,len = this.spriteList.length;i<len;i++){
                    spriteList.push(this.spriteList[i]);
                }
            }
            if(this.nodeList.length){
                for(var i = 0,len = this.nodeList.length;i<len;i++){
                    var quaNode_i = this.nodeList[i];
                    quaNode_i.getSpriteList(spriteList);
                }
            }
            return spriteList;
        },
        insertSprite:function(sprite_i){
            this.spriteCount ++;
            if(this.nodeList.length){
                this.putSpriteIntoNode(sprite_i);
            }
            else{
                this.spriteList.push(sprite_i);
                if(this.spriteList.length > this.maxSpriteNum && this.canDivide()){
                    this.divide();
                }
                else{
                    sprite_i.setQuaTreeNode(this);
                }
            }
        },
        deleteSprite: function (sprite) {
            for(var i = 0;i<this.spriteList.length;i++){
                var sprite_i = this.spriteList[i];
                if(sprite_i.id == sprite.id){
                    this.spriteList.splice(i,1);
                    sprite.removeQuaTreeNode();
                    if(this.parent){
                        this.parent.oneSpriteDeleted();
                    }
                    this.spriteCountMinus();
                    return true;
                }
            }
            return false;
        },
        spriteCountMinus:function(){
            if(this.spriteCount)
                this.spriteCount--;
            if(this.parent)
                this.parent.spriteCountMinus();
        },
        /**
         * 分节点移除元素后父节点的响应
         */
        oneSpriteDeleted:function(){
        //TODO :好像非常复杂啊这个地方
            var spriteList = this.getSpriteList();
            this.nodeList = [];
            this.spriteList = [];
            this.buildBySpriteList(spriteList);
        },
        /**
         * 判断节点是否可再分
         * @returns {boolean}
         */
        canDivide:function(){
            if(this.bounds.w/2 > this.minW && this.bounds.h/2 > this.minH){
                return true;
            }
            return false;
        },
        /**
         * 如果一个节点的元素满编，则新建四个分支
         */
        divide:function(){
            var x = this.bounds.x,y = this.bounds.y,w= this.bounds.w,h = this.bounds.h;
            var node_1 = new baQuaTree();
            node_1.bounds = {x:x,y:y,w:w/2,h:h/2};
            node_1.level = this.level + 1;
            node_1.parent = this;
            node_1.setMinW(this.minW).setMinH(this.minH).setMaxSpriteNum(this.maxSpriteNum);
            node_1.setMarkColor();
            this.nodeList.push(node_1);

            var node_2 = new baQuaTree();
            node_2.bounds = {x:x + w/2,y:y,w:w/2,h:h/2};
            node_2.level = this.level + 1;
            node_2.parent = this;
            node_2.setMinW(this.minW).setMinH(this.minH).setMaxSpriteNum(this.maxSpriteNum);
            node_2.setMarkColor();
            this.nodeList.push(node_2);

            var node_3 = new baQuaTree();
            node_3.bounds = {x:x,y:y + h/2,w:w/2,h:h/2};
            node_3.level = this.level + 1;
            node_3.parent = this;
            node_3.setMinW(this.minW).setMinH(this.minH).setMaxSpriteNum(this.maxSpriteNum);
            node_3.setMarkColor();
            this.nodeList.push(node_3);

            var node_4 = new baQuaTree();
            node_4.bounds = {x:x + w/2,y:y + h/2,w:w/2,h:h/2};
            node_4.level = this.level + 1;
            node_4.parent = this;
            node_4.setMinW(this.minW).setMinH(this.minH).setMaxSpriteNum(this.maxSpriteNum);
            node_4.setMarkColor();
            this.nodeList.push(node_4);

            for(var i = 0;i<this.spriteList.length;i++){
                var sprite_i = this.spriteList[i];
                this.putSpriteIntoNode(sprite_i);
            }
            this.spriteList = [];
        },
        /**
         * 将对象放入分支节点中
         * @param sprite
         */
        putSpriteIntoNode:function(sprite){
            if(sprite.loc.y < this.nodeList[2].bounds.y){
                if(sprite.loc.x < this.nodeList[1].bounds.x){
                    this.nodeList[0].insertSprite(sprite);
                }else{
                    this.nodeList[1].insertSprite(sprite);
                }
            }else{
                if(sprite.loc.x < this.nodeList[1].bounds.x){
                    this.nodeList[2].insertSprite(sprite);
                }else{
                    this.nodeList[3].insertSprite(sprite);
                }
            }
        },
        /**
         * 移除分支节点
         */
        removeNodeList:function(){
            for(var i = 0;i<this.nodeList.length;i++){
                var quaNode = this.nodeList[i];
                if(quaNode.nodeList.length){
                    quaNode.removeNodeList();
                }
                this.nodeList[i] = 0;
            }
            this.nodeList = [];
        },
        /**
         * 获取树及其子节点的基本信息
         * @param infoList
         */
        getBasicTreeInfo:function(infoList){
            var infoList = infoList||[];
            var isLeaf = false;
            if(!this.nodeList.length)
                isLeaf = true;
            var basicInfo = {
                id:this.id,
                spriteCount:this.spriteCount,
                isLeaf:isLeaf,
                bounds:this.bounds,
                markColor:this.markColor
            };
            infoList.push(basicInfo);
            if(this.nodeList.length){
                for(var i = 0;i<this.nodeList.length;i++){
                    var kidNode = this.nodeList[i];
                    kidNode.getBasicTreeInfo(infoList);
                }
            };
            return infoList;
        },
        /**
         * 获取所有的叶子节点
         * @param infoList
         */
        getLeafNode:function(infoList){
            var infoList = infoList||[];
            if(!this.nodeList.length)
            infoList.push(this);
            if(this.nodeList.length){
                for(var i = 0;i<this.nodeList.length;i++){
                    var kidNode = this.nodeList[i];
                    kidNode.getLeafNode(infoList);
                }
            };
            return infoList;
        },
        /**
         * 获取树上所有叶子节点的基本信息
         * @param infoList
         * @returns {*|Array}
         */
        getLeafNodeInfo:function(infoList){
            var infoList = infoList||[];
            if(this.nodeList.length){
                for(var i = 0;i<this.nodeList.length;i++){
                    var kidNode = this.nodeList[i];
                    kidNode.getLeafNodeInfo(infoList);
                }
            }
            else{
                var basicInfo = {
                    id:this.id,
                    spriteCount:this.spriteCount,
                    bounds:this.bounds,
                    markColor:this.markColor
                }
                infoList.push(basicInfo);
            }
            return infoList;
        },
        /**
         * 根据位置获取相应的子节点
         * @param loc
         * @returns {*}
         */
        getNodeByLoc:function(loc){
            if(this.nodeList.length){
                var childNode;
                if(loc.x < this.bounds.x + this.bounds.w/2){
                    if(loc.y < this.bounds.y + this.bounds.h/2){
                        childNode = this.nodeList[0];
                    }else{
                        childNode = this.nodeList[2];
                    }
                }else{
                    if(loc.y < this.bounds.y + this.bounds.h/2){
                        childNode = this.nodeList[1];
                    }else{
                        childNode = this.nodeList[3];
                    }
                }
                return childNode.getNodeByLoc(loc);
            }else{
                return this;
            }
        }
    }