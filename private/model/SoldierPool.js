/**
 * Created by wgw on 2017/3/10.
 * 士兵池
 */
module.exports = Group;
var GUID = require("../../dep/baBasicLib/util/GUID");

function SoldierPool(camp){
    this.id = GUID.getGUID();
    this.camp = camp;
    this.soldierList = [];

}
SoldierPool.prototype = {
    inputSampleSoldiers:function(){

    }
}