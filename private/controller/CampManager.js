﻿/**
 * Created by wgw on 2016/6/19.
 */

var Camp = require("../model/Camp");

module.exports = CampManager;

function CampManager(model){
    this.campList = {};
    this.campNum = 0;
    this.model = model;
};
p = CampManager.prototype;
p.generateOneCamp = function(commander){
    if(!commander){
        throw new Error("!no commander here!CampManager");
        return null;
    };

    var camp  = new Camp();
    camp._t_num = this.campNum;
    camp.commander = commander;
    camp.battleGround = commander.game.battleGround;
    commander.camp = camp;

    this.campList[camp.id] = camp;
    this.campNum++;
    return camp;
};
p.getCampList = function(){
    return this.campList;
};
/**
 * 战斗完成后统计
 */
p.battleStatistic = function(){
    var camp;
    for(var i in this.campList){
        camp = this.campList[i];
        camp.battleStatistic();
    }
};
/**
 * 生成战斗报告
 */
p.generateReport = function(){
    var camp;
    for(var i in this.campList){
        camp = this.campList[i];
        var campInfo = camp.getCampInfo();
        var client = camp.commander;
        var data = {
            client:client,
            SMT:"test",
            type:"testCampRefresh",
            detail:campInfo
        };
        this.model.pushData(data);
    }
}
