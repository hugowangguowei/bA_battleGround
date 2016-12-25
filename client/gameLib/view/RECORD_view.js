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

    function RecordView(div,model){
        View.call(this,div,model);
        this.id = getGUID();
        this.div = null;
        this.model = null;
        this.initialize(div,model);
    };
    RecordView.prototype = new View();
    RecordView.prototype.initialize = function(div,model){
        this.div = div;
        this.model = model;
        $("td").width(100);
        this.addOriListeners();
        this.addBasicStruct();
    };
    RecordView.prototype.addOriListeners = function(){
        var self = this;
        var prop = {
            id: this.id,
            class: "ori"
        };

        this.model.addListener("recordChange", prop, function (record) {
            self.draw(record);
        });
    };
    RecordView.prototype.draw = function(recordInfo){
        var rInfo = recordInfo[0];
        var record = $("#recordList");
        record.children().remove();
        var tr = $("<tr></tr>");
        tr.html('<td>排名</td><td>用户ID</td><td>总分</td>');
        record.append(tr);
        var record_i,num;
        for(var i = 0;i<rInfo.length;i++){
            record_i = rInfo[i];
            tr = $("<tr></tr>");
            num = i+1;
            tr.html('<td>'+ num+ '</td><td>'+ record_i.id + '</td><td>'+ record_i.score +'</td>');
            record.append(tr);
            if(i >9)break;
        }
    };
    RecordView.prototype.addBasicStruct = function(){

    };

    return RecordView;
})