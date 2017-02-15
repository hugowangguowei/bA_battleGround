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
    var CameraController = require("gameLib/model/CameraController");

    function MAIN_view(div,model){
        View.call(this,div,model);
        this.id = getGUID();
        this.div = null;
        this.model = null;
        this.objShapes = {};
        this.terraShapes = {};
        this.padShapes = {};
        this.fogShape = null;
        this.font = null;
        this.mainCamera = null;

        this.shapeCacheList = [];
        this.fogCacheList = [];
        this.terraCacheList = [];
        this.padCacheList = [];
        this.controller = null;
        this.initialize(div,model);
    };
    MAIN_view.prototype = new View();
    MAIN_view.prototype.initialize = function(div,model){
        this.div = div;
        this.model = model;
        this.addOriListeners();
        this.init3DEnv();
        this.addBasicStruct();
        this.draw();
    };
    MAIN_view.prototype.addOriListeners = function(){
        var self = this;
        var prop = {
            id: this.id,
            class: "ori"
        };

        this.model.addListener("soldierChange",prop,function(soldier){
        });
        this.model.addListener("campChange",prop,function(){
            var bG = self.model.battleGround;
            var visibleBlocks = bG.getVisibleBlocks();
            var vB_i;
            for(var i = 0;i<visibleBlocks.length;i++){
                vB_i = visibleBlocks[i];
                var blockShape = vB_i.getBlockShape3D();
                blockShape.draw(self);
            };
            var iVB = bG.getInvisibleBlocks();
            var iVB_i;
            for(var i = 0;i<iVB.length;i++){
                iVB_i = iVB[i];
                var blockShape = iVB_i.getBlockShape3D();
                blockShape.draw(self);
            }
        });
        this.model.addListener("cameraChange",prop,function(){
            var pad_i;
            for(var i = 0;i< self.padCacheList.length;i++){
                pad_i = self.padCacheList[i];
                self._getPadRotate(pad_i);
                //this.scene.remove(this.padCacheList[i]);
            }
        });
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
        this.controller = new CameraController(this.model,camera);
        this.mainCamera = camera;
        scene.add(camera);

        //加载模型
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
            });

        });
        mtlLoader.load( 'fog_01/BA_Fog_01.mtl', function( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( '../image/Texture/' );
            objLoader.load( 'fog_01/BA_Fog_01.obj', function ( object ) {
                object.position.x = 2;
                object.position.y = 0;
                object.position.z = 2;
                object.scale.x = 0.01;
                object.scale.y = 0.01;
                object.scale.z = 0.01;
                object.rotation.y = Math.PI;
                for(var i in materials.materials){
                    var m = materials.materials[i];
                    m.side = THREE.DoubleSide;
                }
                self.fogShape = object;
            });
        });
        mtlLoader.load( 'mount_01/BA_Mount_01.mtl', function( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( '../image/Texture/' );
            objLoader.load( 'mount_01/BA_Mount_01.obj', function ( object ) {
                object.position.x = 2;
                object.position.y = 1;
                object.position.z = 2;
                object.scale.x = 0.01;
                object.scale.y = 0.01;
                object.scale.z = 0.01;
                object.rotation.y = Math.PI;
                for(var i in materials.materials){
                    var m = materials.materials[i];
                    m.side = THREE.DoubleSide;
                }

                self.terraShapes["mount_01"] = object;
                renderer.render(scene,camera);
            });
        });
        mtlLoader.load( 'sea_01/BA_Sea_01.mtl', function( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( '../image/Texture/' );
            objLoader.load( 'sea_01/BA_Sea_01.obj', function ( object ) {
                object.position.x = 3;
                object.position.y = 1;
                object.position.z = 2;
                object.scale.x = 0.01;
                object.scale.y = 0.01;
                object.scale.z = 0.01;
                object.rotation.y = Math.PI;
                for(var i in materials.materials){
                    var m = materials.materials[i];
                    m.side = THREE.DoubleSide;
                }
                self.terraShapes["sea_01"] = object;
                renderer.render(scene,camera);
            });
        });
        mtlLoader.load( 'plant_01/BA_Plant_01.mtl', function( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( '../image/Texture/' );
            objLoader.load( 'plant_01/BA_Plant_01.obj', function ( object ) {
                object.position.x = 3;
                object.position.y = 1;
                object.position.z = 1;
                object.scale.x = 0.01;
                object.scale.y = 0.01;
                object.scale.z = 0.01;
                object.rotation.y = Math.PI;
                for(var i in materials.materials){
                    var m = materials.materials[i];
                    m.side = THREE.DoubleSide;
                }
                self.terraShapes["plant_01"] = object;
                renderer.render(scene,camera);
            });
        });
        mtlLoader.load( 'pad_01/BA_Pad_01.mtl', function( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( '../image/Texture/' );
            objLoader.load( 'pad_01/BA_Pad_01.obj', function ( object ) {
                object.position.x = 0;
                object.position.y = 0;
                object.position.z = 0;
                object.scale.x = 0.01;
                object.scale.y = 0.01;
                object.scale.z = 0.01;
                object.rotation.y = Math.PI;
                for(var i in materials.materials){
                    var m = materials.materials[i];
                    m.side = THREE.DoubleSide;
                }
                self.padShapes["pad_01"] = object;
            });
        });


        //加载字体
        var loader = new THREE.FontLoader();
        loader.load('../image/Font/helvetiker_regular.typeface.json', function(font) {
            self.font = font;
        });

        //加载战争迷雾模型
        var x_length = 1;
        var y_length = 1;
        var z_length = 1;
        var box = new THREE.BoxGeometry(x_length,y_length,z_length);
        var material = new THREE.MeshBasicMaterial({
            color: 0xcccccc
        });
        var mesh = new THREE.Mesh(box,material);

        var lightAmbient = new THREE.AmbientLight(0xaaaaaa);
        scene.add(lightAmbient);
        //var light = new THREE.DirectionalLight(0xffffff);
        //light.position.set(10,3,0);
        //scene.add(light);
        var light = new THREE.DirectionalLight(0xffffff);
        light.position.set(-10,3,0);
        scene.add(light);
        var light = new THREE.PointLight(0xffffff);
        light.position.set(10,3,0);
        scene.add(light);
        //var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 1 );
        //scene.add( light );
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
        var skyBoxMesh = new THREE.Mesh(geometry, material);
        skyBoxMesh.position.x=0;
        skyBoxMesh.position.y=0;
        skyBoxMesh.position.z=0;
        scene.add(skyBoxMesh);

        renderer.render(scene,camera);

        setInterval(function(){
            renderer.render(scene,camera);
        },20);
    };

    /**
     * 根据group的type获取已经加载好的模型
     * @param type
     * @returns {*}
     * @private
     */
    MAIN_view.prototype._getShapeByType = function(type,campId){
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
     * 根据类型获取地形
     * @returns {*}
     * @private
     */
    MAIN_view.prototype._getTerraByType = function(terraType){
        var terra;
        switch (terraType){
            case "plant":
                terra = this.terraShapes["plant_01"];
                break;
            case "mount":
                terra = this.terraShapes["mount_01"];
                break;
            case "sea":
                terra = this.terraShapes["sea_01"];
                break;
            default :
                terra = this.terraShapes["plant_01"];
                break;
        }
        return terra.clone();
    };
    /**
     * 根据类型获取标牌
     * @returns {*}
     * @private
     */
    MAIN_view.prototype._getPadByType = function(){
        return this.padShapes["pad_01"].clone();
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
     * 获取战争迷雾对象的3D场景位置
     * @param loc
     * @returns {{x: number, y: number, z: number}}
     * @private
     */
    MAIN_view.prototype._getTerraLocInfo = function(loc){
        var bG = this.model.battleGround;
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
    };
    /**
     * 获取标牌的旋转
     * @param pad
     * @private
     */
    MAIN_view.prototype._getPadRotate = function(pad){
        var _x = pad.position.x - this.mainCamera.position.x;
        var _y = pad.position.y - this.mainCamera.position.y;
        var _z = pad.position.z - this.mainCamera.position.z;
        pad.rotation.x = this.mainCamera.rotation.x;
        pad.rotation.y = this.mainCamera.rotation.y;
        pad.rotation.z = this.mainCamera.rotation.z;
    };

    MAIN_view.prototype.draw = function(){
    };

    MAIN_view.prototype.addBasicStruct = function(){
        var self = this;
        document.onkeydown=function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            console.log(e.keyCode);
            switch (e.keyCode){
                case 37:
                //Left
                    self.controller.input("left");
                break;
                case 38:
                    //Up
                    self.controller.input("up");
                    break;
                case 39:
                    //Right
                    self.controller.input("right");
                    break;
                case 40:
                    //Down
                    self.controller.input("down");
                    break;
            }
        };
        document.onmousewheel = function(event){
            if(event.deltaY > 0){
                self.controller.input("zoomOut");
            }else{
                self.controller.input("zoomIn");
            }
        };
    };
    return MAIN_view;
})