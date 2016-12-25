/**
 * Created by wangguowei on 2001/1/11.
 */
define(function(require){

    var instance = null;
    function ID_Manager(){
        this.OUTER_STRUCT_ID = 0;
        this.ROOM_INTRO_ID = 0;
        this.ROOM_INTRO_VIEW_ID = 0;
        this.MEM_INTRO_ID = 0;
        this.MEM_INTRO_VIEW_ID = 0;
        this.MEM_PLAYER_ID = 0;
        this.MEM_ID = 0;
        this.MEM_VIEW_ID = 0;
        this.initialize();
    }
    ID_Manager.prototype = {
        initialize:function(){
            instance = this;
        },
        getNewIdForOuterStruct:function(){
            this.OUTER_STRUCT_ID++;
            return "outerStruct_" + this.OUTER_STRUCT_ID;
        },
        getNewIdForRoomIntro:function(){
            this.ROOM_INTRO_ID++;
            return "rI_" + this.ROOM_INTRO_ID;
        },
        getNewIdForRoomIntroView:function(){
            this.ROOM_INTRO_VIEW_ID++;
            return "rI_model_bind_id_" + this.ROOM_INTRO_VIEW_ID;
        },
        getNewIdForMemIntro:function(){
            this.MEM_INTRO_ID++;
            return "mI_" + this.MEM_INTRO_ID;
        },
        getNewIdForMemIntroView:function(){
            this.MEM_INTRO_VIEW_ID++;
            return "mI_model_bind_id_" + this.MEM_INTRO_VIEW_ID;
        },
        getNewIdForMemTag:function(){
            this.MEM_ID++;
            return "mem_tag_" + this.MEM_ID;
        },
        getNewIdForMemViewTag:function(){
            this.MEM_VIEW_ID++;
            return "mT_model_bind_id_" + this.MEM_VIEW_ID;
        },
        getNewIdForMemPlayer:function(){
            this.MEM_PLAYER_ID++;
            return "memPlayer_" + this.MEM_PLAYER_ID;
        }
    }

    return {
        getInstance:function(){
            if(!instance){
                instance = new ID_Manager();
            }
            return instance;
        }
    }
})
