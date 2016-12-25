/**
 * Created by wangguowei on 2001/1/1.
 */

define(function(){
    var gameStateMachine = function(model){
        this.obj = null;
        this.gameStateArray = [];
        this.currentState = null;
        this.chosenObj = null;
        this.userID = "hugo";
        this.currentObj = null;
        this.privateState = {};
        this._startGameMsg = null;
        if(model){
            model.addGameStateMachine(this);
        }
    };
    gameStateMachine.prototype = {
        initRoutine:function(){
            if(!this.gameStateArray.length){
                throw new Error("gameStateArray is not add yet!");
                return 0;
            }
            this.currentState = this.gameStateArray[0];
            this.currentState.stateFunction(this);
        },
        switchToNext:function(stateName){
            var stateChanged = false;
            for(var i = 0;i<this.gameStateArray.length;i++){
                if(this.gameStateArray[i].stateName == stateName){
                    this.currentState = this.gameStateArray[i];
                    stateChanged = true;
                }
            }

            if(!stateChanged){
                throw new Error("gsm set wrong");
            }
            else{
                this.currentState.stateFunction(this);
                console.log("LISTEN: " + this.currentState.stateName);
            }
        },
    };
    return gameStateMachine;
});

