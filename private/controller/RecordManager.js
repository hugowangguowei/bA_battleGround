/**
 * Created by wgw on 2016/6/19.
 */
var instance = null;

exports.getInstance = function(){
    if(!instance){
        instance = new RecordManager();
    }
    return instance;
}

function RecordManager(){
    this.playerRecord = [];
};
RecordManager.prototype.generateRecordFromGame = function(game){
    //var spriteList = game.spriteList;
    var playerList = game._eventList;
    var sprite;
    for(var i in playerList){
        sprite = playerList[i].sprite;
        var id = sprite.controller.UNI_id.split("_")[0];
        var record = this.getRecordById(id);
        record = this.refreshRecord(record,sprite);
        this.addRecord(record);
    }
    return this.playerRecord;
};
RecordManager.prototype.getRecordById = function(id) {
    var record_i;
    for (var i = 0; i < this.playerRecord.length; i++) {
        record_i = this.playerRecord[i];
        if(record_i.id == id){
            this.playerRecord.splice(i,0);
            return record_i;
        }
    }
    //TODO record格式。。。
    return {id:id, score:0};
};
RecordManager.prototype.refreshRecord = function (record,sprite) {
    var score = sprite.recordInfo.totalScore;
    record.score += score;
    return record;
};
RecordManager.prototype.addRecord = function(record){
    if(!this.playerRecord.length){
        this.playerRecord.push(record);
        return;
    }
    var record_i;
    for(var i= 0;i<this.playerRecord.length;i++){
        var record_i = this.playerRecord[i];
        if(record.score > record_i.score){
            this.playerRecord.splice(i,0,record);
            return;
        }
    }
    this.playerRecord.push(record);
};
RecordManager.prototype.getRecords = function(){
    return this.playerRecord;
};
