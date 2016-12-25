/**
 * Created by wgw on 2016/2/21.
 */
define(function(){
    var a = function (){
        this.value = "aa";
    }

    a.prototype.printValue = function(){
        console.log(this.value);
    }

    return a;
})