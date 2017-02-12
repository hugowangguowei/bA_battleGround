/**
 * Created by wgw on 2016/6/19.
 */
var mapManager = require("./MapManager").getInstance();
var Block = require("../model/Block");
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
p.generateBlockListByLineAndRow = function(line,row,battleGround){
    var count = 0;
    var blockList = [];
    for(var i = 0;i<line;i++){
        for(var p = 0;p<row;p++){
            var block = new Block();
            block.id = count;
            block.loc = count;
            block.terraType = mapManager.getRandomTerraType();
            blockList.push(block);
            block.battleGround = battleGround;
            count++;
        }
    }
    return blockList;
}
