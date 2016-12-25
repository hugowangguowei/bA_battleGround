/**
 * Created by wgw on 2016/4/27.
 * chapter1 猎熊者
 */

define(function(require){
    var mapManager = require('gameLib/controller/MapManager').getInstance();
    var obsData = require('gameLib/test/script/revengerRoad/chapter_1/obstacleData');
    return{
        Map:mapManager.getMap("RR_c1"),
        Sprite:{
            "archer":{num:1},
            //"captain":{num:1},
            //"knight":{num:15},
            //"king":{num:1},
            //"chief":{num:2},
            //"barracks":{num:1},
            ////"darkTower":{num:1},

            "bear":{num:15}

        },
        //obstacle:obsData(100)
        obstacle:[
            {type:"line",node:[385,92,577,92]},
            {type:"line",node:[351,126,351,245]},
            {type:"line",node:[610,126,610,245]},
            {type:"line",node:[385,279,461,279]},
            {type:"line",node:[495,279,579,279]},
            {type:"line",node:[385,125,462,125]},
            {type:"line",node:[497,125,572,125]},
            {type:"line",node:[385,125,385,242]},
            {type:"line",node:[572,125,572,242]},
            {type:"line",node:[385,242,572,242]},
            {type:"cycle",node:[351,92,32,Math.PI*0.5,Math.PI*2]},
            {type:"cycle",node:[610,92,32,Math.PI,Math.PI*0.5]},
            {type:"cycle",node:[351,276,32,0,Math.PI*1.5]},
            {type:"cycle",node:[610,276,32,Math.PI*-0.5,Math.PI]}
        ]
    }
})