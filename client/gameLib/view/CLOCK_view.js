/**
 * Created by wgw on 2016/6/10.
 */
define(function(require){
    var View = require("baBasicLib/view/View");
    var viewConfig = require("baBasicLib/view/ViewConfig");
    var getGUID = require("baBasicLib/util/GUID");
    var baLib = require("baBasicLib/util/baLib");

    function ClockView(div,model){
        View.call(this,div,model);
        this.id = getGUID();
        this.div = null;
        this.model = null;
        this.initialize(div,model);
    };

    var p = ClockView.prototype = new View();

    p.initialize = function(div,model){
        this.div = div;
        this.model = model;
        this.addOriListeners();
        this.addBasicStruct();
    };
    p.addOriListeners = function(){
        var self = this;
        var prop = {
            id: this.id,
            class: "ori"
        };

        this.model.addListener("clockChange", prop, function (arg) {
            self.draw(arg);
        });
    };
    p.draw = function(arg){
        var self = this;
        var canvas = self.div;
        var cxt = canvas.getContext("2d");
        cxt.clearRect(0,0,canvas.width,canvas.height);
        cxt.strokeStyle = "black";
        cxt.fontSize = 30;
        cxt.textAlign = "center";
        cxt.fillText(arg,100,100);
    };
    p.addBasicStruct = function(){
        var self = this;
        var canvas = self.div;
        canvas.width = 200;
        canvas.height = 200;
        this.draw();
    };
    return ClockView;
})