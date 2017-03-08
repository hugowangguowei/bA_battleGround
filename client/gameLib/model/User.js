/**
 * Created by wgw on 2017/2/23.
 */
define(function (require) {

    function User(){
        this.userId = null;
        this.camp = null;
        this.editList = [];
        this.initialize();
    }

    User.prototype = {
        initialize:function(sI){
        },
        addEdit:function(op){
            this.editList.push(op);
        },
        /**
         * 获取编辑操作队列
         * editList中的每个元素，都是GroupEdit
         * @returns {Array}
         */
        getEditList:function(){
            return this.editList;
        },
        getEditListInfo:function(){
            var infoList = [];
            var edit_i,info_i;
            for(var i = 0;i<this.editList.length;i++){
                edit_i = this.editList[i];
                info_i = edit_i.getInfo();
                infoList.push(info_i);
            }
            return infoList;
        },
    }

    return User;
})