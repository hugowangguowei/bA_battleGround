function hasUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

var trumpMouseLoc = {x:0,y:0};
var hilaryMouseLoc = {x:0,y:0};

//视频读取相关
if (hasUserMedia()) {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  var video = document.querySelector('video'),
      canvas = document.querySelector('canvas'),
      streaming = false;

  navigator.getUserMedia(
      {
          video: true,
          audio: false
      },
      function (stream) {
      video.src = window.URL.createObjectURL(stream);
      streaming = true;
  }, function (error) {
    console.log("Raised an error when capturing:", error);
  });
}

//canvas层初始化处理
require([
    'animation/FaceGenerator',
    'animation/TextManager',
    'config'
],function(
    faceGene,textManager,config
){
    var canvas = document.getElementById("canvas1");
    canvas.width = 1900;canvas.height = 300;
    var canvas2 = document.getElementById("canvas2");
    canvas2.width = 1900;canvas2.height = 300;
    var timer = null;
    var imageCount = 0;
    function imageLoadCheck(){
        imageCount++;
        if(imageCount ==7){
            imageLoadFinish();
        }else{
            return;
        }
    };
    function imageLoadFinish(){
        drawBase();
        var trumpFace = new faceGene("trump",[mt1,mt2,mt3]);
        var hilaryFace = new faceGene("hilary",[mh1,mh2,mh3]);
        var tM = new textManager();
        timer = setInterval(animation,40);
        function animation(){
            drawPic();
            drawText();
        };

        function drawPic(){
            var cxt = canvas2.getContext("2d");
            var w = canvas2.width;
            var h = canvas2.height;
            cxt.clearRect(0,0,w,h);
            var tf = trumpFace.getOne();
            var tfLoc = config.trumpMouseLoc;
            cxt.drawImage(tf,tfLoc.x,tfLoc.y);
            var hf = hilaryFace.getOne();
            var hfLoc = config.hilaryMouseLoc;
            cxt.drawImage(hf,hfLoc.x,hfLoc.y);
        };
        function drawText(){
            var textInfo = tM.getTextInfo();
            var cxt = canvas2.getContext("2d");
            var w = canvas2.width;
            var h = canvas2.height;
            var text_i;
            for(var i = 0;i< textInfo.length;i++){
                text_i = textInfo[i];
                cxt.save();
                cxt.globalAlpha = text_i.alpha;
                cxt.font = text_i.fontSize + "px Arial";
                cxt.fillStyle = "white";
                cxt.fillText(text_i.text,text_i.loc.x,text_i.loc.y);
                cxt.restore();
            }
        }
    };

    function drawBase(){
        var cxt = canvas.getContext("2d");
        cxt.drawImage(coverImg,0,0);
    }
    var coverImg = new Image();coverImg.src = "images/bg4.png";
    coverImg.onload = imageLoadCheck();
    var mt1 = new Image();mt1.src = "images/trump/trumpM_1.png";
    mt1.onload = imageLoadCheck();
    var mt2 = new Image();mt2.src = "images/trump/trumpM_2.png";
    mt2.onload = imageLoadCheck();
    var mt3 = new Image();mt3.src = "images/trump/trumpM_3.png";
    mt3.onload = imageLoadCheck();
    var mh1 = new Image();mh1.src = "images/Hilary/HilaryM1.png";
    mh1.onload = imageLoadCheck();
    var mh2 = new Image();mh2.src = "images/Hilary/HilaryM2.png";
    mh2.onload = imageLoadCheck();
    var mh3 = new Image();mh3.src = "images/Hilary/HilaryM3.png";
    mh3.onload = imageLoadCheck();
});

//输入处理
function inputChange(){
    require(['config'],function(config){
        var tlx = parseInt($("#tlx").val());
        var tly = parseInt($("#tly").val());
        var hlx = parseInt($("#hlx").val());
        var hly = parseInt($("#hly").val());
        config.trumpMouseLoc = {x:tlx,y:tly};
        config.hilaryMouseLoc = {x:hlx,y:hly};
    })



}

