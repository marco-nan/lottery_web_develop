var isClick = false;
var isChai = false;

$(function(){
    $(".js_close_dialog").click(function(){
        $(".iDialog").hide();
        $(".iDialogLayout").hide();
    })
})
//关闭红包层
function close_hongbao(){
    isChai = false;
    $('#hongbao_result').find('.w2').html('恭喜发财，大吉大利!');
    $('#hongbao_open').hide();
    $('#hongbao_result').hide();
    $('#hongbao_back').hide();
    $("#hongbao_open").removeClass("out");
    $("#hongbao_result").removeClass("in").hide();
}


// 显示登录框
function showGetWin() {
  $('#login').fadeIn();
}
// 关闭登录框
function closeGetWin() {
  $('#login').fadeOut();
}

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
        window.location.href="/wap/index.html#/login";
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
        closeGetWin();
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

function lotterylist(){
    $.ajax({
        url: '/api/activity/queryWelfareDetailList',
        dataType: 'json',
        cache: false,
        type: 'GET',
        success: function (obj) {
            if(obj){
                var sAwardEle = "";
                $.each(obj, function(i, award){
                    sAwardEle += '<li><span>会员：</span><b>'+award.account+'</b>成功中奖<i>'+award.money+'元</i>...</li>';
                });
                $('.infoList').html(sAwardEle);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        }
    })
}

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

(function(){
    window.alert = function(name){
        layer.open({
            skin: 'alert-msg',
            title: "信息",
            shadeClose: false,
            type: 1,
            area: ['350px', 'auto'],
            btn: '关闭',
            content: name,
            yes: function () {
                layer.closeAll();
            }
        })
    }
})();