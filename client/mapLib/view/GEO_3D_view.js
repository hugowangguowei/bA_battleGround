/**
 * Created by wgw on 2016/4/18.
 */
define(function(require){
    var View = require("baBasicLib/view/View");
    var viewConfig = require("mapLib/view/ViewConfig");
    var listenerType = viewConfig.listenerType;
    var listenerClass = viewConfig.listenerClass;
    var getGUID = require("baBasicLib/util/GUID");
    var baLib = require("baBasicLib/util/baLib");

    var VSHADER_SOURCE =
        'attribute vec4 a_Position;\n' +
        'void main() {\n' +
        '  gl_Position = a_Position;\n' +
        '}\n';

    var FSHADER_SOURCE =
        'void main() {\n' +
        '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
        '}\n';


    function GeoView(div,model,showType){
        View.call(this,div,model);
        this.id = getGUID();
        this.div = null;
        this.model = null;
        this.showType = showType||"color";
        this.initialize(div,model);
    };
    GeoView.prototype = new View();
    GeoView.prototype.initialize = function(div,model){
        this.div = div;
        this.model = model;
        this.addOriListeners();
        this.addBasicStruct();
        this.initPaper();
    }
    GeoView.prototype.addOriListeners = function() {
        var self = this;
        var prop = {
            id: this.id,
            class: "ori"
        };
        this.model.addListener("paperChange", prop, function (arg) {
            var paperInfo = self.model.paperInfo;
            var colorInfo = self.model.colorInfo;
            self.drawPaper(paperInfo,colorInfo);
        });
    };
    GeoView.prototype.addBasicStruct = function(){
        var self = this;
        var canvas = this.div;
        canvas.width = 800;
        canvas.height = 800;
        var c_w = canvas.width , c_h = canvas.height;
        canvas.addEventListener('mousedown',function(e){
            var loc = baLib.getPointOnDiv(e.pageX, e.pageY,canvas);
            var pLoc = {x:loc.x/c_w , y: loc.y/c_h};
            self.model.mouseInput('mousedown',pLoc);
        },false)
        canvas.addEventListener('mousemove',function(e){
            var loc = baLib.getPointOnDiv(e.pageX, e.pageY,canvas);
            var pLoc = {x:loc.x/c_w , y: loc.y/c_h};
            self.model.mouseInput('mousemove',pLoc);
        },false)
        canvas.addEventListener('mouseup',function(e){
            var loc = baLib.getPointOnDiv(e.pageX, e.pageY,canvas);
            var pLoc = {x:loc.x/c_w , y: loc.y/c_h};
            self.model.mouseInput('mouseup',pLoc);
        },false)

    };
    GeoView.prototype.initPaper = function(){
        this.drawPaper();
    }
    GeoView.prototype.drawPaper = function(paperInfo,colorInfo){
        var self = this;
        var paperInfo = self.model.paperInfo;
        var canvas = this.div;

        var gl = getWebGLContext(canvas);
        if (!gl) {
            console.log('Failed to get the rendering context for WebGL');
            return;
        }

        // Initialize shaders
        if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
            console.log('Failed to intialize shaders.');
            return;
        }

        // Write the positions of vertices to a vertex shader
        var n = initVertexBuffers(gl);
        if (n < 0) {
            console.log('Failed to set the positions of the vertices');
            return;
        }

        // Specify the color for clearing <canvas>
        gl.clearColor(0, 0, 0, 1);

        // Clear <canvas>
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Draw the rectangle
        gl.drawArrays(gl.TRIANGLES, 0, n);
    }

    function initVertexBuffers(gl) {
        var vertices = new Float32Array([
            0, 0.5,   -0.5, -0.5,   0.5, -0.5
        ]);
        var n = 3; // The number of vertices

        // Create a buffer object
        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }

        // Bind the buffer object to target
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        // Write date into the buffer object
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
        if (a_Position < 0) {
            console.log('Failed to get the storage location of a_Position');
            return -1;
        }
        // Assign the buffer object to a_Position variable
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

        // Enable the assignment to a_Position variable
        gl.enableVertexAttribArray(a_Position);

        return n;


    }
    return GeoView;
})