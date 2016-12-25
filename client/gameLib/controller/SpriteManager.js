/**
 * Created by wgw on 2016/4/29.
 */
define(function (require) {
    var Bear = require('gameLib/script/revengerRoad/chapter_1/sprite/O_Bear');
    var Knight = require('gameLib/script/revengerRoad/chapter_1/sprite/R_Knight');
    var DarkTower = require('gameLib/script/revengerRoad/chapter_1/sprite/O_DarkTower');
    var Orc = require('gameLib/script/revengerRoad/chapter_1/sprite/O_Orc');
    var Chief = require('gameLib/script/revengerRoad/chapter_1/sprite/O_Chief');
    var Captain = require('gameLib/script/revengerRoad/chapter_1/sprite/R_Captain');
    var Barracks = require('gameLib/script/revengerRoad/chapter_1/sprite/O_Barracks');
    var King = require('gameLib/script/revengerRoad/chapter_1/sprite/R_King');
    var Archer = require('gameLib/script/revengerRoad/chapter_1/sprite/R_Archer');

    var instance = null;

    function SpriteManager(){

    }
    SpriteManager.prototype ={
        /**
         * 通过对象类型来生成sprite
         * @param type
         * @returns {*}
         */
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
        /**
         * 通过属性来生成sprite
         * 参数格式：
         * {
         *   type:"bear",
         *   prop:{
         *      id:id,
         *      loc:**
         *   }
         * }
         * 说明：所有在prop对象中的sprite属性会被覆盖
         * @param detail
         * @returns {*}
         */
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
            };
            return sprite;
        },
        /**
         * 生产测试数据
         */
        generateTestData:function(){
            //for(var i = 0;i<)
        }
    }

    return {
        getInstance:function(){
            if(!instance){
                instance = new SpriteManager();
            }
            return instance;
        }
    }
})