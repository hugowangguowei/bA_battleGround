/**
 * Created by wgw on 2017/2/17.
 */
/**
 * Created by wgw on 2016/4/29.
 */
define(function (require) {
    var showManager = require("../view/ShowManager").getInstance();
    var instance = null;

    function ThreeDModelManager(model){
        this.model = model;
        this.objShapes = [];
        this.fogShape = null;
        this.terraShapes = [];
        this.padShapes = [];
        this.font = null;
        this.init();
    }

    ThreeDModelManager.prototype = {
        init:function(){
            if(!this.model){
                throw new Error("model is needed in threeDModelManager");
            }
            this._load3DModels();
        },
        _load3DModels:function(){
            var self = this;
            //加载模型
            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.setBaseUrl( '../image/Texture/' );
            mtlLoader.setPath( '../image/Texture/' );
            mtlLoader.load( 'knight_01/bA_Knight_01.mtl', function( materials ) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials( materials );
                objLoader.setPath( '../image/Texture/' );
                objLoader.load( 'knight_01/BA_Knight_01.obj', function ( object ) {
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
                });
            });
            mtlLoader.load( 'knight_02/BA_Knight_02.mtl', function( materials ) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials( materials );
                objLoader.setPath( '../image/Texture/' );
                objLoader.load( 'knight_02/BA_Knight_02.obj', function ( object ) {
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
                    self.objShapes["knight_02"] = object;
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
                });
            });
            mtlLoader.load( 'archer_02/BA_Archer_02.mtl', function( materials ) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials( materials );
                objLoader.setPath( '../image/Texture/' );
                objLoader.load( 'archer_02/BA_Archer_02.obj', function ( object ) {
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
                    self.objShapes["archer_02"] = object;
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
            mtlLoader.load( 'footman_02/BA_Footman_02.mtl', function( materials ) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials( materials );
                objLoader.setPath( '../image/Texture/' );
                objLoader.load( 'footman_02/BA_Footman_02.obj', function ( object ) {
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
                    self.objShapes["footMan_02"] = object;
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
            mtlLoader.load( 'pad_02/BA_Pad_02.mtl', function( materials ) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials( materials );
                objLoader.setPath( '../image/Texture/' );
                objLoader.load( 'pad_02/BA_Pad_02.obj', function ( object ) {
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
                    self.padShapes["pad_02"] = object;
                });
            });
            mtlLoader.load( 'pad_03/BA_Pad_03.mtl', function( materials ) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials( materials );
                objLoader.setPath( '../image/Texture/' );
                objLoader.load( 'pad_03/BA_Pad_03.obj', function ( object ) {
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
                    self.padShapes["pad_03"] = object;
                });
            });

            //加载字体
            var loader = new THREE.FontLoader();
            loader.load('../image/Font/helvetiker_regular.typeface.json', function(font) {
                self.font = font;
            });
        },
        getShapeByType:function(shapeType,campId){
            var shape = null;
            var type = null,num = null;
            switch (shapeType){
                case "knight":
                    type = "knight";
                    break;
                case "archer":
                    type = "archer";
                    break;
                case "footMan":
                    type = "footMan";
                    break;
                default :
                    type = "knight";
                    break;
            }
            var num = showManager.getShapeNumByCampId(campId);
            var str = type + "_" + num;
            shape = this.objShapes[str];
            if(!shape){
                throw new Error("shape not loaded!");
                return null;
            }
            return shape.clone();
        },
        getTerraByType:function(terraType){
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
    },
        getFogByType:function(type){
            return this.fogShape.clone();
        },
        getPadByType:function(type){
            if(type == ""){

            }else if (type == ""){

            }
            return this.padShapes["pad_01"].clone();
        }
    }

    return {
        getInstance:function(model){
            if(!instance){
                instance = new ThreeDModelManager(model);
            }
            return instance;
        }
    }
})