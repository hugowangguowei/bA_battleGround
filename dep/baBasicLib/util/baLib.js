/**
 * Created by wangguowei on 2016/1/11.
 */
var PI = Math.PI;

exports.cloneObject = function(obj){
    if(typeof obj === "object"){
        if(Object.prototype.toString.call(obj) === '[object Array'){
            var newArray = [];
            for(var i = 0;i<obj.length;i++){
                newArray.push(cloneObject(obj[i]));
            }
            return newArray;
        }
        else{
            var newObj = {};
            for(var key in obj){
                newObj[key] = this.cloneObject(obj[key]);
            }
            return newObj;
        }
    }
    else{
        return obj;
    }
}

exports.isEmpty = function(obj){
    for(var i in obj){
        return false;
    }
    return true;
}

exports.isOwnEmpty = function(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)){
            return false;
        }
    }
    return true;
}

exports.getRandomColor = function(){
    var c_r = parseInt(Math.random()*255);
    var c_g = parseInt(Math.random()*255);
    var c_b = parseInt(Math.random()*255);
    var color = 'rgb(' + c_r + "," + c_g + "," + c_b + ")";
    return color;
}

exports.getPointOnDiv = function(x,y,obj){
    var bBox = obj.getBoundingClientRect();
    return {
        x:x-bBox.left*(obj.width/bBox.width),
        y:y - bBox.top*(obj.height/bBox.height)
    };
}

exports.getCircleAreaInArray = function(w,h,x,y,r){
    var data = [];
    var _temX,_temY;
    for(var i = 0;i<(2*r + 1);i++){
        _temX = x-r+i;
        if(_temX >= 0 && _temX <= w){
            for(var j = 0;j<(2*r + 1);j ++){
                _temY = y -r +j;
                if(_temY>= 0 && _temY<= h){
                    if((i - r)*(i - r) + (j - r)*(j-r) < r*r){
                        data.push(_temY * w + _temX);
                    }
                }
            }
        }
    }
    return data;
}

exports.getTwoLocDis = function(loc1,loc2){
    var _x = loc1.x - loc2.x;
    var _y = loc1.y - loc2.y;
    var dis = Math.sqrt(_x*_x + _y*_y);
    return dis;
}

exports.getTwoSpriteDis = function(sprite_1,sprite_2){
    var _x = sprite_1.loc.x - sprite_2.loc.x;
    var _y = sprite_1.loc.y - sprite_2.loc.y;
    var dis = Math.sqrt(_x*_x + _y*_y);
    return dis;
}

exports.getRelativeLoc = function(sprite,loc){
    var sLoc = sprite.loc;
    var dir = sLoc.direction;
    var newLoc = {
        x:sLoc.x + loc.x*Math.cos(dir) - loc.y *Math.sin(dir),
        y:sLoc.y + loc.x*Math.sin(dir) + loc.y *Math.cos(dir)
    }
    return newLoc;
}

//获取相对角度
exports.getRelativeAngle = function(loc1,loc2){
    var x = loc2.x - loc1.x;
    var y = loc2.y - loc1.y;
    var hypotenuse = Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2));
    //斜边长度
    var cos = x/hypotenuse;
    var radian = Math.acos(cos);
    //求出弧度
    var angle = 180/(Math.PI/radian);
    //用弧度算出角度
    if (y<0) {
        radian = -radian;
    } else if ((y == 0) && (x<0)){
        radian = Math.PI;
    }
    return radian;
}

getAngle = function(angle){
    var fAngle;
    if(angle < 0){
        var a = parseInt((-1*angle)/(Math.PI*2));
        fAngle = angle + PI*2*(a+1);
    }else{
        fAngle = angle%(PI*2);
    }
    return fAngle;
};


exports.getIncludedAngle = function(angle1,angle2){
    var a1,a2;
    a1 = getAngle(angle1);
    a2 = getAngle(angle2);

    var a = a1 - a2;
    if(a<0)a+=PI*2;
    if(a > PI)a = PI*2 - a;
    return a;
}

