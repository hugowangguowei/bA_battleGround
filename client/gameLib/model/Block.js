/**
 * Created by wgw on 2017/1/14.
 */
define(function(require){
    var GroupManager = require("gameLib/controller/GroupManager").getInstance();
    var BlockShape3D =require("gameLib/shape/3D/BlockShape3D");

    function Block(battleGround){
        this.id =  0;
        this.battleGround = battleGround;
        this.loc = -1;
        this.visible = false;
        this.visibleFlag = false;
        this.groupList = [];
        this.terraType = "plant";
        this.blockShape2D = null;
        this.blockShape2DDirty = true;
        this.blockShape3D = null;
        this.blockShape3DDirty = true;
        this.init();
    }
    Block.prototype = {
        init:function(){
            if(!this.battleGround){
                throw new Error("battleGround is needed in block");
            }
        },
        setByServerInfo:function(blockInfo){
            this._compareChanges(blockInfo);
            this._resetData();
            this._setNewData(blockInfo);
        },
        _compareChanges:function(blockInfo){
            //TODO 需要比较检测
            this.blockShape3DDirty = true;
            return true;
        },
        _resetData:function(){
            if(!this.blockShape3DDirty){
                return ;
            }
            this.groupList = [];
        },
        _setNewData:function(blockInfo){
            if(blockInfo){
                this.visible = true;
                var loc = blockInfo.loc;
                var groupInfoList = blockInfo.groupInfoList;
                var gI_i,group;
                for(var i = 0;i<groupInfoList.length;i++){
                    gI_i = groupInfoList[i];
                    group = GroupManager.generateGroupByType(gI_i.type,gI_i.campId,gI_i);
                    this.groupList.push(group);
                }
                this.terraType = blockInfo.terraType;
            }
            else{
                this.visible = false;
            }
        },
        addGroup:function(group){
            this.groupList.push(group);
            this.blockShape3DDirty = true;
        },
        deleteGroup:function(group){
            for(var i = 0;i<this.groupList.length;i++){
                var group_i = this.groupList[i];
                if(group_i.id == group.id){
                    this.groupList.splice(i,1);
                    this.blockShape3DDirty = true;
                    return true;
                }
            }
            return false;
        },
        getBlockShape2D:function(){

        },
        getBlockShape3D:function(){
            if(!this.blockShape3D){
                this.blockShape3D = new BlockShape3D(this);
            }
            return this.blockShape3D;
        }
    }

    return Block;
});