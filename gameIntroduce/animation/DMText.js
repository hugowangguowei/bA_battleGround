
define(function(require){
    function DMText(text,loc,dir,speed,range,alpha,life){
        this.text = text||"主播傻B出BUG了！";
        this.loc = loc||{x:0,y:0};
        this.dir = dir||0;
        this.speed = speed||1;
        this.alpha = alpha||0;
        this.maxAlphaStay = 50;
        this.alphaStayCount = this.maxAlphaStay;
        this._alpha = 0.01;
        this.fontSize = 20;
        this.minSize = 20;
        this.maxSize = 30;
        this.range = range||{left:300,right:1000,top:0,bottom:200};
        this.life = life||200;
    }
    DMText.prototype = {
        refresh:function(){
            this.loc.x += Math.cos(this.speed*this.dir);
            this.loc.y += Math.sin(this.speed*this.dir);
            if(this.loc.x <= this.range.left||this.loc.x >= this.range.right){
                this.dir = Math.PI - this.dir;
            }
            if(this.loc.y <= this.range.top||this.loc.y >= this.range.bottom){
                this.dir = -1*this.dir;
            }

            //设置透明度
            this.alpha += this._alpha;
            if(this.alpha >= 1){
                this.alpha = 1;
                this.alphaStayCount--;
                if(this.alphaStayCount < 0){
                    this._alpha = -1*this._alpha;
                    this.alphaStayCount = this.maxAlphaStay;
                }
            }
            if(this.alpha <= 0){
                this.alpha = 0;
                this._alpha = -1*this._alpha;
            }

            //设置字号
            this.fontSize = this.minSize + this.alpha*(this.maxSize - this.minSize);

            this.life--;
            if(this.life <= 0)return false;
            return {
                text:this.text,
                //text:parseInt(this.loc.x) + "  " + parseInt(this.loc.y),
                loc:this.loc,
                alpha:this.alpha,
                fontSize:this.fontSize
            };
        }
    };
    return DMText;
})