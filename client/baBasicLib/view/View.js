/**
 * Created by wgw on 2016/4/2.
 */
define(function(require){

    function View(div,model){
        this.id = null;
        this.div = null;
        this.model = null;
    };
    View.prototype = {
        initialize:function(div,model) {
            console.log("haha");
        },
    }
    return View;
})