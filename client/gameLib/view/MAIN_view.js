/**
 * Created by wgw on 2016/6/19.
 */
define(function(require){
    var View = require("baBasicLib/view/View");
    var viewConfig = require("baBasicLib/view/ViewConfig");
    var listenerType = viewConfig.listenerType;
    var listenerClass = viewConfig.listenerClass;
    var getGUID = require("baBasicLib/util/GUID");
    var baLib = require("baBasicLib/util/baLib");

    function MAIN_view(div,model){
        View.call(this,div,model);
        this.id = getGUID();
        this.div = null;
        this.model = null;
        this.objShapes = {};
        this.initialize(div,model);
    };
    MAIN_view.prototype = new View();
    MAIN_view.prototype.initialize = function(div,model){
        this.div = div;
        this.model = model;
        this.addOriListeners();
        this.addBasicStruct();
        this.init3DEnv();
        this.draw();
    };
    MAIN_view.prototype.addOriListeners = function(){
        var self = this;
        var prop = {
            id: this.id,
            class: "ori"
        };

        this.model.addListener("soldierChange",prop,function(soldier){
            var bG = self.model.battleGround;
            var visibleBlocks = bG.visibleBlocks;
            var vB_i,loc_i;
            for(var i = 0;i<visibleBlocks.length;i++){
                vB_i = visibleBlocks[i];
                self._drawVisibleBlock(vB_i);
            };
        });
        this.model.addListener("campChange",prop,function(){
            var bG = self.model.battleGround;
            var visibleBlocks = bG.visibleBlocks;
            var vB_i,loc_i;
            for(var i = 0;i<visibleBlocks.length;i++){
                vB_i = visibleBlocks[i];
                self._drawVisibleBlock(vB_i);
            };
        });
    };
    MAIN_view.prototype._drawVisibleBlock = function(block){
        var loc_i = block.loc;
        var groupList = block.groupInfoList;
        var len = groupList.length;
        var group_i;
        for(var i = 0;i<len;i++){
            group_i = groupList[i];
            var shape = this._getShapeByType(group_i.type);
            var locInfo =this._getShapeLocInfo(loc_i,len,i);
            shape.position.x = locInfo.x;
            shape.position.y = locInfo.y;
            shape.position.z = locInfo.z;
            shape.scale.x = locInfo.s;
            shape.scale.y = locInfo.s;
            shape.scale.z = locInfo.s;
            this.scene.add(shape);
        }
    };
    /**
     * 根据group的type获取已经加载好的模型
     * @param type
     * @returns {*}
     * @private
     */
    MAIN_view.prototype._getShapeByType = function(type){
        var shape = null;
        switch (type){
            case "knight":
                shape = this.objShapes["knight_01"];
                break;
            case "archer":
                shape = this.objShapes["archer_01"];
                break;
            case "footMan":
                shape = this.objShapes["footMan_01"];
                break;
        }
        return shape.clone();
    };
    /**
     * 将战场位置转换为3D场景中的位置
     * @param loc
     * @param len
     * @param i
     * @returns {{x: number, y: number, z: number, s: number}}
     * @private
     */
    MAIN_view.prototype._getShapeLocInfo = function(loc,len,i){
        var bG = this.model.battleGround;
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
            shapeX += (i%2)*0.1;
            shapeZ += parseInt(i/2)*0.1;
        }else{
            shapeX += 0.2;
        }
        return {
            x:shapeX,
            y:shapeY,
            z:shapeZ,
            s:scale
        }
    };
    /**
     * 初始化3d环境
     */
    MAIN_view.prototype.init3DEnv = function(){
        var self = this;
        var renderer = new THREE.WebGLRenderer({canvas:this.div});
        renderer.setClearColor(0xffffff);
        var scene = new THREE.Scene();
        this.scene = scene;
        var camera = new THREE.PerspectiveCamera(45,4/4,1,1000);
        var controls = new THREE.TrackballControls( camera );
        camera.position.set(0,12,12);
        camera.lookAt(new THREE.Vector3(0,0.2,2));
        scene.add(camera);


        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setBaseUrl( '../image/Texture/' );
        mtlLoader.setPath( '../image/Texture/' );
        mtlLoader.load( 'knight_01/knight_01.mtl', function( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( '../image/Texture/' );
            objLoader.load( 'knight_01/knight_01.obj', function ( object ) {
                object.position.x = 0.3;
                object.position.y = 0;
                object.position.z = 0.1;
                object.scale.x = 0.003;
                object.scale.y = 0.003;
                object.scale.z = 0.003;
                object.rotation.y = Math.PI;
                for(var i in materials.materials){
                    var m = materials.materials[i];
                    m.side = THREE.DoubleSide;
                }
                self.objShapes["knight_01"] = object;
                //scene.add( object );
                //renderer.render(scene,camera);
            });

        });

        mtlLoader.load( 'archer_01/BA_Archer_01.mtl', function( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( '../image/Texture/' );
            objLoader.load( 'archer_01/BA_Archer_01.obj', function ( object ) {
                object.position.x = 1.3;
                object.position.y = 0;
                object.position.z = 0.1;
                object.scale.x = 0.003;
                object.scale.y = 0.003;
                object.scale.z = 0.003;
                object.rotation.y = Math.PI;
                for(var i in materials.materials){
                    var m = materials.materials[i];
                    m.side = THREE.DoubleSide;
                }
                self.objShapes["archer_01"] = object;
                //scene.add( object );
                //renderer.render(scene,camera);
            });

        });

        mtlLoader.load( 'footman_01/BA_Footman_01.mtl', function( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( '../image/Texture/' );
            objLoader.load( 'footman_01/BA_Footman_01.obj', function ( object ) {
                object.position.x = 2.3;
                object.position.y = 0;
                object.position.z = 0.1;
                object.scale.x = 0.003;
                object.scale.y = 0.003;
                object.scale.z = 0.003;
                object.rotation.y = Math.PI;
                for(var i in materials.materials){
                    var m = materials.materials[i];
                    m.side = THREE.DoubleSide;
                }
                self.objShapes["footMan_01"] = object;
                //scene.add( object );
                //renderer.render(scene,camera);
            });

        });

        //添加底图
        var group = new THREE.Group();
        var x_length = 1;
        var y_length = 1;
        var z_length = 1;
        var box = new THREE.BoxGeometry(x_length,y_length,z_length);
        var material = new THREE.MeshBasicMaterial({
            map:THREE.ImageUtils.loadTexture("../image/bg_1.png",{},function(){
                renderer.render(scene,camera);
            })
        });
        for(var i = 0;i<10;i++){
            for(var j = 0;j<10;j++){
                var mesh = new THREE.Mesh(box,material);
                mesh.position.x = -5 + i*x_length;
                mesh.position.z = -5 + j*z_length;
                mesh.position.y = -0.4;
                mesh.scale.y = 0.4;
                box.depth = Math.random()*2;
                group.add(mesh);
            }
        };
        scene.add(group);

        var lightAmbient = new THREE.AmbientLight(0x555555);
        scene.add(lightAmbient);
        var light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0,0,10);
        scene.add(light);

        //天空盒子
        var urlPrefix = "../image/";
        var urls = [urlPrefix + "timg.jpg",
            urlPrefix + "timg.jpg",
            urlPrefix + "timg.jpg",
            urlPrefix + "timg.jpg",
            urlPrefix + "timg.jpg",
            urlPrefix + "timg.jpg"];
        var textureCube = THREE.ImageUtils.loadTextureCube(urls);
        var shader = THREE.ShaderLib["cube"];
        shader.uniforms["tCube"].value = textureCube;
        var sky_mrl = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            side: THREE.BackSide
        });
        var material = new THREE.MeshBasicMaterial({
            map:THREE.ImageUtils.loadTexture("../image/sky_02.png",{},function(){
                renderer.render(scene,camera);
            }),
            side:THREE.BackSide
        });
        var geometry = new THREE.BoxGeometry(80, 80, 80);
        var skyboxMesh = new THREE.Mesh(geometry, material);
        skyboxMesh.position.x=0;
        skyboxMesh.position.y=0;
        skyboxMesh.position.z=0;
        scene.add(skyboxMesh);

        renderer.render(scene,camera);

        setInterval(function(){
            controls.update();
            renderer.render(scene,camera);
        },20);
    };
    MAIN_view.prototype.draw = function(){


        //==============================================================================================================

        //==============================================================================================================

    };
    MAIN_view.prototype.addBasicStruct = function(){
    };
    MAIN_view.prototype.get3DLoc = function(loc){

    }
    return MAIN_view;
})