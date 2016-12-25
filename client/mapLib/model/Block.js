/**
 * Created by wgw on 2016/10/7.
 */
define(function(require){

    function Block(name,x,y,a,color){
        this.type = "block";
        this.name = name||"";
        //x轴倾斜度
        this.xS = x||0;
        //y轴倾斜度
        this.yS = y||0;
        //各项同性
        this.anisortropy = a||false;
        //在view中的颜色
        this.color = color||"green";
        //在view中的位置
        this.viewLoc = null;
        this.imageNum = 0;
    }

    return Block;
});