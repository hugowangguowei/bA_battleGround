/**
 * Created by wgw on 2017/2/3.
 */
define(function(require){
    function Controller(camera){
        this.camera = camera;
        this.axis = null;
        this.angle1 = 0;
        this.angle2 = Math.PI/4;
        this.radius = 20;
        this.pR = this.radius*Math.cos(this.angle2);
        this.step = 0.05;
        this.init();
    }

    Controller.prototype = {
        init:function(){
            if(!this.camera){
                throw new Error("camera is needed");
            };
            this.pR = Math.cos(this.angle2)*this.radius;
            this.camera.position.y = Math.sin(this.angle2)*this.radius;
            this.camera.position.z = Math.cos(this.angle1)*this.pR;
            this.camera.position.x = Math.sin(this.angle1)*this.pR;
            this.camera.lookAt(new THREE.Vector3(0,0,0));
        },
        rotateAroundWorldAxis:function(object, axis, radians) {
            var rotWorldMatrix = new THREE.Matrix4();
            rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
            rotWorldMatrix.multiply(object.matrix);
            object.matrix = rotWorldMatrix;
            object.rotation.setFromRotationMatrix(object.matrix);
        },
        input:function(type){

            var pos = this.camera.position;
            switch (type){
                case "left":
                    this.angle1 += this.step;
                    break;
                case "right":
                    this.angle1 += (-1*this.step);
                    break;
                case "up":
                    this.angle2 += this.step;
                    if(this.angle2>= Math.PI)this.angle2 =Math.PI;
                    break;
                case "down":
                    this.angle2 += (-1*this.step);
                    if(this.angle2<= 0)this.angle2 =0;

                    break;
                case "zoomIn":
                    this.radius--;
                    if(this.radius<2)this.radius = 2;
                    break;
                case "zoomOut":
                    this.radius++;
                    if(this.radius>24)this.radius = 24;
                    break;
            }
            this.pR = Math.cos(this.angle2)*this.radius;
            this.camera.position.y = Math.sin(this.angle2)*this.radius;
            this.camera.position.z = Math.cos(this.angle1)*this.pR;
            this.camera.position.x = Math.sin(this.angle1)*this.pR;
            this.camera.lookAt(new THREE.Vector3(0,0,0));
        }
    }
    return Controller;
});