/**
 * Created by wgw on 2016/4/30.
 */
define(function (require) {

    function Soldier(camp,soldierInfo){
        this.camp = camp||0;
        this.type = "footman";

        this.num = 10;

        this.brave = 0.8;
        this.obey = 0.5;

        this.attackNum = 10;
        this.defendNum = 10;
        this.loc = -1;
        this.aimLoc = -1;
        this.attLoc = -1;
        this.curOrder = "defend";
        this.fillColor = "black";

        this.initialize(soldierInfo);
    }

    Soldier.prototype = {
        initialize:function(sI){
            if(sI){
                this.num = sI.num;
                this.loc = sI.loc;
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
            this.camp.model.addEventToPool("soldierChange",null);
        },
        getSoldierInfo:function(){
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

    return Soldier;
})