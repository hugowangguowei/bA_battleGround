﻿/**
 * Created by wgw on 2016/4/29.
 * 服务器端
 *
 */

var Bear = require('../script/revengerRoad/chapter_1/sprite/O_Bear');
var Knight = require('../script/revengerRoad/chapter_1/sprite/R_Knight');
var FootMan = require('../script/revengerRoad/chapter_1/sprite/R_FootMan');
var DarkTower = require('../script/revengerRoad/chapter_1/sprite/O_DarkTower');
var Chief = require('../script/revengerRoad/chapter_1/sprite/O_Chief');
var Orc = require('../script/revengerRoad/chapter_1/sprite/O_Orc');
var Barracks = require('../script/revengerRoad/chapter_1/sprite/O_Barracks');
var Captain = require('../script/revengerRoad/chapter_1/sprite/R_Captain');
var King = require('../script/revengerRoad/chapter_1/sprite/R_King');
var Archer = require('../script/revengerRoad/chapter_1/sprite/R_Archer');

var instance = null;
exports.getInstance = function(){
    if(!instance){
        instance = new SpriteManager();
    }
    return instance;
}

function SpriteManager(){
    this.spriteList = {};
}

SpriteManager.prototype ={
    generateSpriteByType:function(type){
        var sprite;
        switch (type){
            case 'bear':
                sprite = new Bear();
                break;
            case 'knight':
                sprite = new Knight();
                break;
            case 'darkTower':
                sprite = new DarkTower();
                break;
            case 'orc':
                sprite = new Orc();
                break;
            case 'chief':
                sprite = new Chief();
                break;
            case 'captain':
                sprite = new Captain();
                break;
            case 'barracks':
                sprite = new Barracks();
                break;
            case 'king':
                sprite = new King();
                break;
            case 'archer':
                sprite = new Archer();
                break;
        }
        return sprite;
    },
    generateSpriteByDetail:function(detail){
        var sprite;
        switch (detail.type){
            case 'bear':
                sprite = new Bear(detail.prop);
                break;
            case 'knight':
                sprite = new Knight(detail.prop);
                break;
            case 'darkTower':
                sprite = new DarkTower(detail.prop);
                break;
            case 'orc':
                sprite = new Orc(detail.prop);
                break;
            case 'chief':
                sprite = new Chief(detail.prop);
                break;
            case 'captain':
                sprite = new Captain(detail.prop);
                break;
            case 'barracks':
                sprite = new Barracks(detail.prop);
                break;
            case 'king':
                sprite = new King(detail.prop);
                break;
            case 'archer':
                sprite = new Archer(detail.prop);
                break;
        }
        return sprite;
    },
    generateSpriteForCamp:function(camp){
        var knight_i,archer_i,footMan_i;
        var num = camp._t_num;

        for(var i = 0;i<2;i++){

            knight_i = new Knight();
            knight_i._t_loc = num*10 + 1;

            archer_i = new Archer();
            archer_i._t_loc = num*10 + 2;

            footMan_i = new FootMan();
            footMan_i._t_loc = num*10 + 3;

            camp.addSoldier(knight_i);
            camp.addSoldier(archer_i);
            camp.addSoldier(footMan_i);
        }
    }
}
