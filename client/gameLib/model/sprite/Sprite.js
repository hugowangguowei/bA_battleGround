/**
 * Created by wgw on 2016/4/18.
 */
define(function(require){
   function Sprite(id){
       this.id = id;
       this.geoInfo = {
       }
   }
    Sprite.prototype = {
        initialize:function(){

        },
        addToGeo:function(geoInfo){

        },
        setQuaTreeNode:function(node){
            this.geoInfo.quaTreeNode = node;
        },
        removeQuaTreeNode:function(){
            this.geoInfo.quaTreeNode = 0;
        },
        action:function(){

        },
        getOutPut: function () {
            return null;
        }
    }

    return Sprite;
});