/**
 * Created by wgw on 2017/3/8.
 */
define(function(require){
    var GUID = require("baBasicLib/util/GUID");
    function GroupEdit(type){
        this.id = GUID();
        this.type = type||"default";
        this.args = [];
    }
    GroupEdit.prototype = {
        addArg:function(arg){
            this.args.push(arg);
        },
        getInfo:function(){
            return{
                type:this.type,
                args:this.args
            }
        }
    }

    return GroupEdit;
})