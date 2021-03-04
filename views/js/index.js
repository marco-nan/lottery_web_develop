
var hot_content = "",               
    Allresponse = "",           
    YesOrNO  = true,
    hotStaus ={
      block : 'block',
      class : 'on'
    };

var rollNotice=""; //滚动公告内容

$(function () {

  var allMessageUrl = '/v/lottery/getAllOpenInfo';//  所有信息;

  // 所有 数据
  $.getJSON(allMessageUrl, function (result) {
    Allresponse = result;
    LotteryDraw(result);
    var apiGetTime = new Date().getTime();

    // 热门彩 中间 内容
      Color_Chart(result,apiGetTime);

  })

  //  30 秒  刷新一次数据
  var time = setInterval(function(){
    $.getJSON(allMessageUrl, function (result) {
      var apiGetTime = new Date().getTime();
      YesOrNO  = true;
      hot_content = "";
      hotStaus ={
        block : 'block',
        class : 'on'
      };
      Color_Chart(result,apiGetTime);
    })
  },30000);

  // 轮播 配置
    var mySwiper = new Swiper('.swiper-container', {
      autoplay: 3000,
      autoplayDisableOnInteraction: false,
      loop: true,
      pagination: '.swiper-pagination',
      paginationClickable: true,
      prevButton:'.swiper-button-prev',
      nextButton:'.swiper-button-next',
    })

  // 输入 金额
  $(".import").keyup(function () {
    num('keydown');
  })

  // 中奖名单
  GetDraw();
})

/***********************************所有函数定义******************************/

/**
 * 增减倍数
 */
// 中奖名单
function  GetDraw() {
  $.getJSON("/v/lottery/getNoticeWinMessage",
      function (response) {
        var content = '';
        if (response != null || response != "")
        {
          $.each(response,function (index,data){
            content += "<div class='DrawWrapIndex'><span>"+data.name+"</span><span>"+data.gameName+"</span><span>"+(+(data.winMoney))*10+"元</span></div>"
          })
        }
        else
        {
          content = "暂无会员中奖！"
        }
        $('.dowebok').append(content);
        $('.dowebok').liMarquee({     //滚动参数
          direction: 'up'
        });
      }
  )
}


function num(num) {
  var val = +$(".import").val();
  if (num == "plus") {
    val++;
    $(".import").val(val);
    $(".tatil-money").text(val * 2);
  }
  if (num == "minus") {
    if (val < 1) {
      layer.alert("倍数不能小于0");
      return false;
    }
    val--;
    $(".import").val(val);
    $(".tatil-money").text(val * 2);
  }
  if (num == "keydown") {
    $(".import").val(val);
    $(".tatil-money").text(val * 2);
  }
}

/**
 *  table 切换
 */

function _table(_this, _style, _next, _second) {
  var _index = $(_this).index();
  $(_this).parents().children().removeClass(_style);
  $(_this).parents().children().eq(_index).addClass(_style);
  if (_next != "" || _next != null) {
    $('.' + _next).css('display', 'none');
    $('.' + _next).eq(_index).css('display', 'block');
  }
  if (_second != "" || _second != null) {
    $('.' + _second).css('display', 'none');
    $('.' + _second).eq(_index).css('display', 'block');
  }
}

/**
 *  换一注 or  投注
 */

function ForA(_data, _type) {
  var betInfo = "",                //  随机的 号码
      mutiple = "";                // 倍数
  for (var i = 0; i < 6; i++) {
    var staus = $(".qb-box-list-content").eq(i).css('display');
    if (_data == "for") {           //  换一注
      if (staus == 'block') {
        var _that = $(".qb-box-list-content").eq(i),
            length = _that.find('.qb-selectnumber').find('.Number-1').length,
            oneORtow = _that.find('.qb-selectnumber').find('.Number-1').eq(0).text().length;
        for (var k = 0; k < length; k++) {
          if (oneORtow != 2) {
            _that.find('.qb-selectnumber').find('.Number-1').eq(k).text(
                randomNum());
          }
          else {
            _that.find('.qb-selectnumber').find('.Number-1').eq(k).text(
                randomNum_doubel());
          }
        }
        return true;
      }
    }
    if (_data == "instant") {       // 投注
      if (staus == 'block') {
        var _that = $(".qb-box-list-content").eq(i),
            length = _that.find('.qb-selectnumber').find('.Number-1').length,
            dataStaus = $(".qb-box-list-content").eq(i).attr('data'),
            isOffcial = _that.attr('isoffcial');
        for (var j = 0; j < length; j++) {
          betInfo += _that.find('.qb-selectnumber').find('.Number-1').eq(
                  j).text() + "|";
        }
        betInfo = encodeURI(betInfo);
        mutiple = $('.import').val();
        if (mutiple == "0") {
          mutiple = "1";
        }
        if (_type == "selfHelp") {
          betInfo = '';
          mutiple = '1'
        };
        var officalNum = $('.hot-nav').find('.on').attr('isoffcial'),
            official = "";
        if(officalNum =="1"){
          official = "index_official";
        }else{
          official = "index";
        }
        window.location.href="/data/game/" + dataStaus
            + "/"+official+".html?code=92610201101&betInfo=" + betInfo
            + "&mutiple=" + mutiple;
        return true;
      }
    }
  }
}

/**
 *  切换 菜种 玩法
 */

function play_mathods_tab(_this, _id) {
  $(_this).parents().children().removeClass('current');
  $(_this).addClass('current');
  $('.rule-right').hide();
  $("#" + _id + "").show();
  if (_id == 'game-x') {
    $("#" + _id + "").find('.game-x').text($(_this).text());
  }
  $('html, body').animate({
    scrollTop: $("#" + _id).offset().top
  }, 100);
}

/**
 * 随机数 0-9
 */

function randomNum() {
  return Math.round(Math.random() * 9);
}

/**
 * 随机数 01-10
 */

function randomNum_doubel() {
  var num = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
  return num[Math.round(Math.random() * 9)];
}

/**
 *   倒计时 内容    status  0:未开奖; 1:封盘中; 2:已停用 ; 3: 开奖中  ;
 */

function Color_Chart(result,apiGetTime) {
  $('.hot-nav,.nav-content').empty("");
  var num = 0;
  $.each(result, function (index, datas) {
    if (datas.game.open != 1 && datas.game.isOffcial==1){
      if (num < 5){
         if(datas.game.code == "lhc") return true;
          var turnNum = "",    // 期数
              li = "",         // 号码
              openNum = datas.pre.openNum,
              code = datas.game.code,
              officialORcredit = datas.game.isOffcial,
              status = datas.pre.status;
          turnNum = datas.pre.turnNum;
          if (status == 3){
            status = "开奖中";
          }else if (status == 2){
            status = "已停用";
          }else if(status == 1){
            status = "封盘中"
          }else {
            if (datas.cur.endTime != null){
              var enddata = new Date(datas.cur.endTime.replace(/-/g,'/')).getTime(),
                  serverTime = datas.cur.serverTime;
              //  倒计时  时间差
              var longTime = (enddata - serverTime - (new Date().getTime() - apiGetTime)) / 1000;
              status = formatTime(Math.ceil(longTime));
            }
          }
          if (turnNum == null) turnNum == " '暂无期数' ";
          if (officialORcredit){
            officialORcredit = "index_official";
          }else {
            officialORcredit = "index";
          }
          if (openNum != null){
            if (openNum.split(",")!= null){
              var str = openNum.split(",");
              for (var i=0; i<str.length; i++){
                li +='<li class="Number-1">'+str[i]+'</li>';
              }
            }
          }
          if(!YesOrNO) {
            hotStaus.block = 'none';
            hotStaus.class = '';
          }
          var hot_nav = $('<li isOffcial="'+datas.game.isOffcial+'" class="'+hotStaus.class+'" data="getCountdown"><a>' + datas.game.name
              + '</a></li>');

          hot_nav.attr('onmouseover',
              '_table(this,"on","qb-box-list-content")');

          hot_content += '<div class="qb-box-list-content" style="display:'+hotStaus.block+'" data="'
              + datas.game.code + '"><ul class="qb-info"><li>'
              + '<span>第<span name="issue">' + turnNum
              + '</span>期</span><span class="c-gray">截止：</span>'
              + '<span class="Balltime">'+status+'</span>'
              + '</li>'
              + '<li class="bztz">'
              + '<a name="btn_game_play" href="/data/game/' + code + '/'+officialORcredit+'.html">自助选号</a>|'
              + '<a name="btn_trend" href="/page/game-center.html?gameCode=' + code + '&type=trend">走势图</a></li></ul>'
              + '<div class="qb-selectnumber"><ul>'
              + '<li style="background: none"><img src="/page/game/img/'+ code + '.png"/></li>'+li+'</ul></div></div>'
          YesOrNO = false;
          num ++;
        
        $('.hot-nav').append(hot_nav);

      }
    }
  })
  $(".loading").hide();
  $('.nav-content').append(hot_content);

}


/***
 *    高频 / 低频 开奖公告
 */

function LotteryDraw(result) {
  // console.log(result)
  $.each(result, function (index, datas) {
    if (datas.game.open != 1){
      var name = datas.game.name,
          turnNum = datas.cur.turnNum,
          openTime = datas.cur.openTime,
          openNum = datas.pre.openNum,
          amount = datas.pre.amount,
          code = datas.game.code,
          openSpan = [],
          ballbgSpan = '';

      if (turnNum == null) {
        turnNum = "暂无";
      }
      if (openTime == null) {
        openTime = "暂无";
      }
      if (name == null) {
        startTime = "暂无";
      }
      if (openNum == null) {
        openNum = "暂无";
      }
      else {
        openSpan = openNum.split(',');
        $.each(openSpan, function (index, datas) {
          ballbgSpan += "<span>" + datas + "</span>";
        })
      }
      var openNum = "",
          defaultBal = "";
      for (var k = 0; k < openSpan.length; k++) {
        openNum += ' <div class="redball">' + openSpan[k] + '</div>';
        defaultBal += '<li class="Number-1">' + openSpan[k] + '</li>';
      }

    }
  })
}

/**
 * 转化为 日+小时+分+秒
 */

function formatTime(longTime) {
  //转化为 日+小时+分+秒
  var  time = Math.ceil(longTime);
  if (time != null && time != "") {

     if (time <= 60) {
      var s = time;
      time = '0天0时0分' + s + '秒';
    } else if (time > 60 && time < 3600) {
      var m = parseInt(time / 60);
      var s = parseInt(time % 60);
      time = "0天0时" + m + "分" + s + "秒";
    } else if (time >= 3600 && time < 86400) {
      var h = parseInt(time / 3600);
      var m = parseInt(time % 3600 / 60);
      var s = parseInt(time % 3600 % 60 % 60);
      time = "0天" + h + "时" + m + "分" + s + "秒";

    } else if (time >= 86400) {
      var d = parseInt(time / 86400);
      var h = parseInt(time % 86400 / 3600);
      var m = parseInt(time % 86400 % 3600 / 60)
      var s = parseInt(time % 86400 % 3600 % 60 / 60);
      time = d + '天' + h + "时" + m + "分" + s + "秒";
    }else {
      time = " '封盘中' ";
    }
  }
   return time;
}

var time = setInterval(function () {
  for (var i=0; i <$('.Balltime').length;i++){
    var html = $('.Balltime').eq(i).html().length;
    if (html != 3) {
      var data = $('.Balltime').eq(i).html().split(/[天时分秒]/);
      var longTime = ( +data[0]*86400)+( +data[1]*3600) + ( +data[2]*60) + ( +data[3])-1;
      $('.Balltime').eq(i).html(formatTime(longTime));
    }
  }
},1000);

function TabChart(_this) {
  var href = $(_this).attr('data');
  $(".content-wrap").empty();
  $("#TrendBody").show();
  $(".more-lottery-wrap").hide();
  $(".lottery-list-wrap").hide();
  $(".lottery-tab").css("display", "none");
  $(window).scrollTop(0);
  window.frames['TrendBody'].location.href = href;
}




















