/**
 * Created by wgw on 2016/4/1.
 */

module.exports = eventSource;

var packCount = 0;

function eventSource(){
    this.isDebug = false;
    this._eventList = [];
    this.msgList = [];
}
eventSource.prototype = {
    addListener:function(eventType,listenerProp){
        this._eventList.push(eventType);
        this._eventList.push(listenerProp);
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
                var ws = this._eventList[i+1];
                ws.emit("event_msg",args);
                this.recordMsg(args);
            }
        }
    },
    /**
     * ²âÊÔ¹¦ÄÜ
     * @param msg
     */
    recordMsg:function(msg){
        if(!this.isDebug)
            return msg;
        var msgNum = packCount;
        packCount++;
        msg.packNum = msgNum;

        var len = this.msgList.length;
        if(len >= 1000){
            this.msgList.shift();
        }
        this.msgList.push(msg);
        return msg;
    }
}

