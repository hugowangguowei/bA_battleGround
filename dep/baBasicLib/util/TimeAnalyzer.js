/**
 * Created by wgw on 2016/6/16.
 * ʱ�������
 */
module.exports = TimeAnalyzer;

function TimeAnalyzer (outputInterval){
    this.allTime = 0;
    this.avTime = 0;
    this.count = 0;
    this.bT = 0;
    this.eT = 0;
    this.outputInterval = outputInterval||1;
}

TimeAnalyzer.prototype = {
    //���ÿ�ʼʱ��
    setBeginTime:function(){
        this.bT = new Date().getTime();
    },
    //���ý���ʱ��
    setEndTime:function(){
        this.eT = new Date().getTime();
        var interval = this.eT - this.bT;
        this.allTime += interval;
        this.count++;
        this.avTime = this.allTime/this.count;

        if(!(this.count%this.outputInterval)){
            console.log(this.avTime);
        }
    }
}
