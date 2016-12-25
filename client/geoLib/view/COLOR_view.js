/**
 * Created by wgw on 2016/4/22.
 */
define(function(require){
    var View = require("baBasicLib/view/View");
    var viewConfig = require("geoLib/view/ViewConfig");
    var listenerType = viewConfig.listenerType;
    var listenerClass = viewConfig.listenerClass;
    var getGUID = require("baBasicLib/util/GUID");
    var baLib = require("baBasicLib/util/baLib");

    function ColorView(div,model){
        View.call(this,div,model);
        this.id = getGUID();
        this.div = null;
        this.model = null;
        this.initialize(div,model);
    };
    ColorView.prototype = new View();
    ColorView.prototype.initialize = function(div,model){
        this.model = model;
        this.addOriListeners();
    }
    ColorView.prototype.addOriListeners = function() {
            var self = this;
            var prop = {
                id: this.id,
                class: "ori"
            };
            this.model.addListener("colorChange", prop, function (arg) {
                var colorInfo = self.model.colorInfo;
                self.colorRefresh(colorInfo);
            });
        };
    ColorView.prototype.colorRefresh = function(colorInfo){
        var colorList = colorInfo.colorList;
        var len = colorList.length;
        var canvas = $("#colorPane")[0];
        var width = canvas.width;
        var height = canvas.height;
        var _w = width/len;
        var cxt = canvas.getContext("2d");
        cxt.clearRect(0,0,canvas.width,canvas.height);
        console.log(len);
        for(var i = 0;i<len;i++){
            cxt.fillStyle = colorList[i];
            cxt.fillRect(i*_w,0,_w,height);
            cxt.fill();
        }

    };
    return ColorView;
})