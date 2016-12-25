/**
 * Created by wgw on 2016/4/1.
 */
define(function(){
    "use strict";
    function eventSource(){
        this._eventList = [];
    }
    eventSource.prototype = {
        addListener:function(eventType,listenerProp,callback){
            this._eventList.push(eventType);
            this._eventList.push(listenerProp);
            this._eventList.push(callback);
        },
        removeListener:function(args){
            var id = args.id||"no_id";
            var listenerClass = args.listenerClass||"no_class";
            if(id == "no_id"&&listenerClass == "no_class")
                return 0;
            var removeCount = 0;
            for(var i = 0;i<this._eventList.length;i+= 3){
                if((this._eventList[i+1].id == id||id == "no_id")&&
                    (this._eventList[i+1].class == listenerClass||listenerClass == "no_class")){
                    this._eventList.splice(i,3);
                    i-=3;
                    removeCount++;
                }
            }
            return removeCount;
        },

        fireEvent:function(){
            if(!arguments.length){
                throw new Error("no arguments,you can't fire a event!");
                return;
            }
            var args = Array.prototype.slice.call(arguments);
            var eventType = args.shift();
            for(var i = 0,len = this._eventList.length;i<len;i+=3){
                if(eventType == this._eventList[i]){
                    this._eventList[i+2](args);
                }
            }
        }
    }

    return eventSource;
})
