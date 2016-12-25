/**
 * Created by wgw on 2016/4/10.
 */
define(function (require) {
   var listenerType = require("privateLib/view/ViewConfig").listenerType;
   function ReSure(model){
      this.model = model;
      this.context = null;
      this.callbackTrue = null;
      this.callbackFalse = null;
      this.checked = true;
   }
   ReSure.prototype = {
      check: function (context,callBackTrue,callBackFalse) {
         this.context = context;
         this.callbackTrue = callBackTrue;
         this.callbackFalse = callBackFalse||function callbackFalse(){return false};
         this.model.fireEvent(listenerType.RESURE_CHECK,{text:"你确定执行该操作吗？",Y:"确定退出",N:"取消"});
         this.checked = false;
      },
      returnCheckResult:function(result){
         this.model.fireEvent(listenerType.RESURE_CHECK_FINISH);
         this.checked = true;
         switch (result){
            case true:
                 this.callbackTrue.call(this.context);
                 break;
            case false:
                 this.callbackFalse.call(this.context);
                 break;
         }
      }
   }
   return ReSure;
});