/**
 * Created by wgw on 2017/3/1.
 */

define(function(require){

    var instance = null;

    function ShowManager(){
        this.colorList = [];
        this.curColNum = 0;
        this.cur2DColNum = 0;
        this.cur3DColNum = 0;
        this.campId_Color = {};
        this.campId_2DColor = {};
        this.campId_3DColor = {};

        this.shapeNumList = [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08"
        ];
        this.curShapeNum = 0;
        this.campId_ShapeNum = {};
    };

    ShowManager.prototype = {
        setShapeNumByCampId:function(campId,num){
            var finalNum = num;
            if(!finalNum){
                finalNum = this.shapeNumList[this.curShapeNum];
                if(!finalNum){
                    finalNum = this.shapeNumList[0];
                    this.curShapeNum = 0;
                }
                this.curShapeNum ++;
            }
            this.campId_ShapeNum[campId] = finalNum;
            return finalNum;
        },
        getShapeNumByCampId:function(campId){
            var shapeNum = this.campId_ShapeNum[campId];
            if(!shapeNum){
                shapeNum = this.setShapeNumByCampId(campId);
            }
            return shapeNum;
        }
    }

    return {
        getInstance:function(){
            if(!instance){
                instance = new ShowManager();
            }
            return instance;
        }
    }
});