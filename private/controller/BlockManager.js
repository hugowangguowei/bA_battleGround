/**
 * Created by wgw on 2016/6/19.
 */
var instance = null;

exports.getInstance = function(){
    if(!instance){
        instance = new BlockManager();
    }
    return instance;
}

function BlockManager(){
    this.blockList = [];
};
p = BlockManager.prototype;
p.generateBlockListByLineAndRow = function(line,row){

}
