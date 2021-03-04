/**
 * pc 和wap访问判断
 */
if(window.location.toString().indexOf('pref=padindex') != -1){

}else{
  if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) ||
      (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
    if(window.location.href.indexOf("?mobile")<0){
      try{
        if(/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
          window.location.href="/views/activity/wap/hongbao.html";
        }else if(/iPad/i.test(navigator.userAgent)){

        }else{

        }
      }catch(e){

      }
    }
  }
}

/**
 * 游戏开始结束
 */
var NowTimeOld = new Date("2016/12/17 16:07:16");
var startDateTime = new Date("2016/12/17 00:00:00");
var one,two,waveTime;
function getRTimeOne(){
  var t_s = NowTimeOld.getTime();
  var NowTime = NowTimeOld.setTime(t_s + 1000);
  var t = startDateTime - NowTime;
  if(t<0){
    clearInterval(one);
    ajaxLottery();
    return;
  }
  var d=Math.floor(t/1000/60/60/24);
  var h=Math.floor(t/1000/60/60%24);
  var m=Math.floor(t/1000/60%60);
  var s=Math.floor(t/1000%60);
  var h = d * 24 + h;
  $("#hb-clock").html("<em>下期开始:</em><span>"+h+"</span><em>小时</em>"+"<span>"+m+"</span><em>分</em>"+"<span>"+s+"</span><em>秒</em>");
}

function getRTimeTwo(){
  var t_s = NowTimeOld.getTime();
  var NowTime = NowTimeOld.setTime(t_s + 1000);
  var t = waveTime - NowTime;
  if(t <= 0){
    clearInterval(two);
    ajaxLottery();
    return;
  }
  var d=Math.floor(t/1000/60/60/24);
  var h=Math.floor(t/1000/60/60%24);
  var m=Math.floor(t/1000/60%60);
  var s=Math.floor(t/1000%60);
  var h = d * 24 + h;
  $("#hb-clock").html("<em>剩余时间:</em><span>"+h+"</span><em>小时</em>"+"<span>"+m+"</span><em>分</em>"+"<span>"+s+"</span><em>秒</em>");
}

var Timerr;

function ajaxLottery(){
  $.ajax({
    url: '/api/activity/getRedEnvelopeInfo',
    dataType: 'json',
    cache: false,
    type: 'GET',
    success: function (obj) {
      switch(obj.stat){
        case '-404':
          $(document).snowfall('clear');
          clearInterval(Timerr);
          $("#hb-message").html('活动已结束');
          $("#hb-clock").hide();
          break;
        case '-1':
          //下一波倒计时
          $("#hb-clock").show();
          $(document).snowfall('clear');
          clearInterval(Timerr);

          var c_time = obj.c_time.replace('-','/');
          var start_time = obj.start_time.replace('-','/');

          NowTimeOld = new Date(c_time);
          startDateTime =  new Date(start_time);
          one = setInterval(getRTimeOne,1000);
          $("#hb-message").html("本轮红包已结束");
          break;
        case '0':
          //抽奖动画
          var c_time = obj.c_time.replace('-','/');
          var end_time = obj.end_time.replace('-','/');
          $("#hb-message").html("本轮红包雨剩余时间");
          $("#hb-clock").show();
          NowTimeOld = new Date(c_time);
          waveTime =  new Date(end_time);
          two = setInterval(getRTimeTwo,1000);
          if(obj.rain==1){
            $(document).snowfall('clear');
            $(document).snowfall({
              image: "./images/hongbao.png",
              flakeCount:obj.maxhong,
              minSize: 50,
              maxSize: 100
            });
            $('.snowfall-flakes').on('click',function(){
              getPacket();
            });
          }else{
            $("#getWin").html("");
          }
          break;
        default:
          break;
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.error("/api/activity/getRedEnvelopeInfo错误");
    }
  }) ;
};

//关闭红包层
function close_hongbao(){
    $('#hongbao_open').hide();
    $('#hongbao_result').hide();
    $('#hongbao_back').hide();
    $("#hongbao_open").removeClass("out");
    $("#hongbao_result").removeClass("in").hide();
    ajaxLottery();
}
var isClick=false;

var isNeedLogin=false;
//查询红包资格
function getPacket() {
  $.ajax({
    url: '/api/user/info',
    type: 'get',//提交的方式
    async: false,
    success: function (msg) {
      isNeedLogin=false;
    },
    statusCode: {
      400: function() {
        isNeedLogin=true;
      }
    }
  });
  if(isNeedLogin){
    return;
  }

  if(isClick){
    return;
  }
  isClick =  true;
  $.ajax({
    url: '/api/activity/getRedEnvelope',
    dataType: 'json',
    cache: false,
    type: 'GET',
    success: function (obj) {
      if(obj.code==200){
        $(document).snowfall('clear');
        $('#hongbao_open').find('.b5').html('您还有'+obj.count+'次机会');
        $('#hongbao_open').show();
        $('#hongbao_back').show();
        isClick = false;
      }else{
        close_hongbao();
        alert(obj.message);
        isClick = false;
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert('网络故障,请联系管理员');
    }
  });
}

/**
 * 抢红包
 */
function startGame(){
  if(isClick){
    return;
  }
  isClick =  true;
  $.ajax({
    url: '/api/activity/drawRedEnvelope',
    dataType: 'json',
    cache: false,
    type: 'POST',
    success: function (obj) {
      if(obj.code==200){
        $('#hongbao_open').addClass("shake");
        setTimeout(function(){
          $('#hongbao_open').removeClass("shake");
          if(obj.count==undefined){
            obj.count='0';
          }
          $('#hongbao_result').find('.w1').html('您还有'+obj.count+'次机会');
          $('#hongbao_result').find('.w3').html('<em>红包</em>'+obj.message+'<em>元</em>');

          $("#hongbao_open").addClass("out").fadeOut();
          $("#hongbao_result").fadeIn().addClass("in");

          isClick = false;
        },2000);
      }else{
        close_hongbao();
        alert(obj.message);
        isClick = false;
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert('网络故障,请联系管理员');
    }
  });
}

// 加载公告
function loadAnnounce() {
  $.ajax({
    url: '/api/activity/queryWelfareDetailList',
    dataType: 'json',
    cache: false,
    type: 'GET',
    success: function (obj) {
      if(obj){
        var sAwardEle = "";
        $.each(obj, function(i, award){
          sAwardEle += '恭喜'+award.account+'获得现金'+award.money+'元&nbsp;&nbsp;&nbsp;';
        });
        $('#announce').html(sAwardEle);
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
    }
  })
}
ajaxLottery();
loadAnnounce();

(function(){
    window.alert = function(name){
        layer.open({
            skin: 'alert-msg',
            title: "信息",
            shadeClose: false,
            type: 1,
            area: ['260px', '155px'],
            btn: '关闭',
            content: name,
            yes: function () {
                layer.closeAll();
            }
        })
    }
})();