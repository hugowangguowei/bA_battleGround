/**
 * Created by wgw on 2017/2/12.
 */
define(function(require){

    function BlockShape3D(block){
        this.id =  0;
        this.block = block;
        this.objShapesCache = [];
        this.padShapesCache = [];
        this.terraShapsCache = [];
        this.fogShapesCache = [];
        this.view = null;
    }
    BlockShape3D.prototype = {
        init:function(){

        },
        clearCacheList:function(cacheList){
            for(var i = 0;i<cacheList.length;i++){
                this.view.scene.remove(cacheList[i]);
            }
        },
        clearAllCache:function(){
            this.clearCacheList(this.fogShapesCache);
            this.clearCacheList(this.objShapesCache);
            this.clearCacheList(this.terraShapsCache);
            this.clearCacheList(this.padShapesCache);
        },
        draw:function(view){
            if(!this.block.blockShape3DDirty){
                console.log("+1");
                return ;
            }
            this.view = view;
            var loc = this.block.loc;
            this.clearAllCache();
            if(this.block.visible){
                //绘制人物模型
                var groupList = this.block.groupList;
                var len = groupList.length;
                for(var i = 0;i<len;i++){
                    this._drawObjShape(groupList[i],loc,len,i);
                }
                //绘制地形
                this._drawTerraShape(this.block.terraType,loc);
            }else{
                //绘制战争迷雾
                this._drawFogShape(loc);
            }
            this.block.blockShape3DDirty = false;
        },
        _getShapeLocInfo:function(loc,len,i){
            var bG = this.block.battleGround;
            var w = bG.width;
            var h = bG.height;
            var x = loc%w;
            var y = parseInt(loc/w);
            var shapeX = -5 + x;
            var shapeY = 0;
            var shapeZ = -5 + y;
            var scale = 0.003;
            if(len > 1){
                scale = 0.002;
                shapeX += (i%2)*0.3;
                shapeZ += parseInt(i/2)*0.3;
            }else{
                shapeX += 0.2;
            }
            return {
                x:shapeX,
                y:shapeY,
                z:shapeZ,
                s:scale
            }

        },
        _drawObjShape:function(group,loc,len,i){
            var shape = this.view.threeDModelManager.getShapeByType(group.type,group.campId);
            var locInfo =this._getShapeLocInfo(loc,len,i);
            shape.position.x = locInfo.x;
            shape.position.y = locInfo.y;
            shape.position.z = locInfo.z;
            shape.scale.x = locInfo.s;
            shape.scale.y = locInfo.s;
            shape.scale.z = locInfo.s;
            this.objShapesCache.push(shape);
            this.view.scene.add(shape);
            if(group.showPad){
                var info = group.type;
                var material = new THREE.MeshPhongMaterial({
                    color: 0x000000,
                    specular:0xffff00,
                    shininess:0
                });
                var padAll = new THREE.Group();
                var text = new THREE.Mesh(new THREE.TextGeometry(info, {
                    font: this.view.threeDModelManager.font,
                    size: 0.1,
                    height: 0.1
                }), material);
                var bBox = new THREE.Box3().setFromObject(text)
                var centerOffset = -0.5 * ( bBox.max.x - bBox.min.x );
                text.position.x += centerOffset;
                text.scale.z = 0.01;
                padAll.add(text);
                var pad = this.view.threeDModelManager.getPadByType();
                padAll.add(pad);
                padAll.position.x = locInfo.x;
                padAll.position.y = locInfo.y + 1;
                padAll.position.z = locInfo.z;
                var rotateInfo = this.view._getPadRotate(padAll);
                this.padShapesCache.push(padAll);
                this.view.scene.add(padAll);
            }
        },
        _getTerraLocInfo:function(loc){
            var bG = this.block.battleGround;
            var w = bG.width;
            var h = bG.height;
            var x = loc%w;
            var y = parseInt(loc/w);
            var shapeX = -5 + x;
            var shapeY = 0;
            var shapeZ = -5 + y;
            return{
                x:shapeX,
                y:shapeY,
                z:shapeZ
            }
        },
        _drawTerraShape:function(terraType,loc){
            var terra = this.view.threeDModelManager.getTerraByType(terraType);
            var terraLocInfo = this._getTerraLocInfo(loc);
            terra.position.x = terraLocInfo.x;
            terra.position.y = terraLocInfo.y;
            terra.position.z = terraLocInfo.z;
            terra.scale.x = 0.01;
            terra.scale.y = 0.01;
            terra.scale.z = 0.01;
            this.terraShapsCache.push(terra);
            this.view.scene.add(terra);
        },
        _drawFogShape:function(loc){
            var fogShape = this.view.threeDModelManager.getFogByType();
            var tDLocInfo = this._getTerraLocInfo(loc);
            fogShape.position.x = tDLocInfo.x;
            fogShape.position.y = tDLocInfo.y;
            fogShape.position.z = tDLocInfo.z;
            fogShape.scale.x = 0.01;
            fogShape.scale.y = 0.01;
            fogShape.scale.z = 0.01;
            this.fogShapesCache.push(fogShape);
            this.view.scene.add(fogShape);
        },

    }
    return BlockShape3D;
});