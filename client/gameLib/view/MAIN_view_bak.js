/**
 * Created by wgw on 2016/6/19.
 */
define(function(require){
    var View = require("baBasicLib/view/View");
    var viewConfig = require("geoLib/view/ViewConfig");
    var listenerType = viewConfig.listenerType;
    var listenerClass = viewConfig.listenerClass;
    var getGUID = require("baBasicLib/util/GUID");
    var baLib = require("baBasicLib/util/baLib");

    function MAIN_view(div,model){
        View.call(this,div,model);
        this.id = getGUID();
        this.div = null;
        this.model = null;
        this.initialize(div,model);
    };
    MAIN_view.prototype = new View();
    MAIN_view.prototype.initialize = function(div,model){
        this.div = div;
        this.model = model;
        this.addOriListeners();
        this.addBasicStruct();
        this.draw();
    };
    MAIN_view.prototype.addOriListeners = function(){
        var self = this;
        var prop = {
            id: this.id,
            class: "ori"
        };

        this.model.addListener("recordChange", prop, function (record) {
            self.draw(record);
        });
    };
    MAIN_view.prototype.draw = function(){
        //var cxt = this.div.getContext("2d");
        //cxt.fillStyle = "red";
        //cxt.fillRect(0,0,10,10);
        var renderer = new THREE.WebGLRenderer({canvas:this.div});
        renderer.setClearColor(0xffffff);
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45,4/4,1,1000);
        var controls = new THREE.TrackballControls( camera );
        //var camera = new THREE.OrthographicCamera(-2,2,-2,2,1,10);
        camera.position.set(0,10,10);
        camera.lookAt(new THREE.Vector3(0,0.2,2));
        scene.add(camera);
        //==============================================================================================================
        //模型加载器
        var onProgress = function ( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
            }
        };
        var onError = function ( xhr ) { };
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setBaseUrl( '../image/Texture/horse/' );
        mtlLoader.setPath( '../image/Texture/horse/' );
        mtlLoader.load( 'horse_01.mtl', function( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( '../image/Texture/horse/' );
            objLoader.load( 'horse_01.obj', function ( object ) {

                //var meshList = [];
                //for(var i= 0;i<object.children.length;i++){
                //    var mesh = object.children[i];
                //    var geo = mesh.geometry;
                //    var material = mesh.material;
                //    meshList.push({geo:geo,material:material});
                //}
                //var group = new THREE.Group();
                //for(var i = 0;i<2;i++){
                //    for(var p = 0;p<meshList.length;p++){
                //        var mesh = new THREE.Mesh(meshList[p].geo,meshList[p].material);
                //        mesh.position.x = 0 + i*0.1;
                //        mesh.scale.x = 0.0005;
                //        mesh.scale.y = 0.0005;
                //        mesh.scale.z = 0.0005;
                //        group.add(mesh);
                //    }
                //}
                //scene.add(group);

                object.position.x = 0;
                object.position.y = 0;
                object.position.z = 0;
                object.scale.x = 0.001;
                object.scale.y = 0.001;
                object.scale.z = 0.001;
                object.rotation.y = Math.PI;
                for(var i in materials.materials){
                    var m = materials.materials[i];
                    m.side = THREE.DoubleSide;
                }
                materials.materials.side = THREE.DoubleSide;
                //var geomotry = object.geomotry;
                //if (object instanceof THREE.Mesh) {
                //    object.material.side = THREE.DoubleSide;
                //}
                scene.add( object );
                renderer.render(scene,camera);
            }, onProgress, onError );

        });
        //==============================================================================================================
        //==============================================================================================================
        //添加一个平面
        //var plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 4, 4 ), new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } ) );
        //plane.position.y = - 2;
        //plane.rotation.x = - Math.PI / 2;
        //scene.add( plane );
        //==============================================================================================================
        //==============================================================================================================
        //添加多个物体
        var group = new THREE.Group();
        var x_length = 0.4;
        var y_length = 0.4;
        var z_length = 0.4;
        var box = new THREE.BoxGeometry(x_length,y_length,z_length);
        //var material = new THREE.MeshNormalMaterial( { overdraw: 0.5 } );
        var material = new THREE.MeshBasicMaterial({
            map:THREE.ImageUtils.loadTexture("../image/bg_1.png",{},function(){
                renderer.render(scene,camera);
            })
        });
        for(var i = 0;i<10;i++){
            for(var j = 0;j<10;j++){
                var mesh = new THREE.Mesh(box,material);
                mesh.position.x = -2 + i*x_length;
                mesh.position.z = -2 + j*z_length;
                mesh.position.y = -0.2;
                mesh.scale.y = 0.2;
                box.depth = Math.random()*2;
                group.add(mesh);
            }
        };
        scene.add(group);
        //==============================================================================================================
        //==============================================================================================================
        //添加一个平面
        //(function(){
        //    var plane = new THREE.PlaneGeometry(8,8,4,4);
        //    var len = plane.vertices.length;
        //    for(var i = 0;i<len;i++){
        //        plane.vertices[i].z = Math.random();
        //    }
        //    var material = new THREE.MeshLambertMaterial({color:0xffff00})
        //    var mesh = new THREE.Mesh(plane,material);
        //    scene.add(mesh);
        //})();
        //==============================================================================================================
        //==============================================================================================================
        //添加一个球
        //(function(){
        //    var cube = new THREE.Mesh(
        //        new THREE.SphereGeometry(1,20,20),
        //        new THREE.MeshLambertMaterial({color:0xffff00})
        //    );
        //    scene.add(cube);
        //})();
        //==============================================================================================================
        //==============================================================================================================
        //光源切换
        var lightAmbient = new THREE.AmbientLight(0x555555);
        scene.add(lightAmbient);
        //var light = new THREE.PointLight(0xffffff,1,0);
        var light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0,0,10);
        scene.add(light);
        //==============================================================================================================
        renderer.render(scene,camera);

        setInterval(function(){
            controls.update();
            renderer.render(scene,camera);
        },20);

    };
    MAIN_view.prototype.addBasicStruct = function(){

    };

    return MAIN_view;
})