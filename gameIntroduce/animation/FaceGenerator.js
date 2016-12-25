
define(function(require){
    function FaceGenerator(id,source){
        this.id = id;
        this.source = source||[];
        this.curFace = null;
        this.frameCount = 0;
        this.frameMax = 3;
        this.init();
    }
    FaceGenerator.prototype = {
        init:function(){
            if(this.source.length){
                this.curFace = this.source[0];
            }
        },
        getOne:function(){
            this.frameCount++;
            if(this.frameCount>= this.frameMax){
                this.frameCount = 0;
                var len = this.source.length;
                if(!len)return null;
                var num = parseInt(Math.random()*len);
                this.curFace = this.source[num];
            }
            return this.curFace;
        }
    }

    return FaceGenerator;
})