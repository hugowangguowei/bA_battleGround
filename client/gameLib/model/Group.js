/**
 * Created by wgw on 2016/4/30.
 */
define(function (require) {
    var GroupEdit = require("./GroupEdit");
    var GUID = require("baBasicLib/util/GUID");

    function Group(campId,soldierInfo){
        this.id = -1;
        this.campId = campId||0;
        this.type = "footman";

        this.num = 10;
        this.brave = 0.8;
        this.obey = 0.5;
        this.attackNum = 10;
        this.defendNum = 10;
        this.loc = -1;
        this.aimLoc = -1;
        this.attLoc = -1;
        this.showPad = true;
        this.curOrder = "defend";
        this.fillColor = "black";

        this.initialize(soldierInfo);
    }

    Group.prototype = {
        initialize:function(sI){
            if(sI){
                this.id = sI.id;
                this.num = sI.num;
                this.loc = sI.loc;
                this.campId = sI.campId;
                this.name = sI.name;
            }
            if(!this.id){
                this.id = GUID();
            }
        },
        setProperty:function(type,value){
            switch (type){
                case "att":
                    this.curOrder = "attack";
                    break;
                case "def":
                    this.curOrder = "defend";
                    break;
                case "loc":
                    this.aimLoc = value;
                    break;
                case "attLoc":
                    this.attLoc = value;

            }

            var edit = new GroupEdit(type);
            edit.addArg(this.id);
            edit.addArg(value);
            return edit;
        },
        getGroupInfo:function(){
            return{
                type:this.type,
                loc:this.loc,
                aimLoc:this.aimLoc,
                attLoc:this.attLoc,
                order:this.curOrder,
                brave:this.brave,
                obey:this.obey
            }
        }
    }

    return Group;
})