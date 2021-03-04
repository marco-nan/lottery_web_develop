/**
 * Created by tpd on 2017/7/28.
 */

/***
 **   走势图  数据
 */
var LooterySpan = "" ,
    LooteryLI = "" ;

var sscWrap= $(".sscWrap"),
    lhcWrap = $(".lhcWrap"),
    pkWrap = $(".pkWrap"),
    syxwWrap = $(".syxwWrap"),
    klcWrap = $(".klcWrap"),
    LFWrap = $(".LFWrap");

$(function () {
  var trendUrl = '/data/json/games.json';       // 走势图 url;
      $.getJSON(trendUrl, function (result)
      {
        chartAll(result);     //  走势导航 所有;
        chartDelite(result)  //  走势导航 详情;
      })
})

/**
 *
 * @param response
 * @param apiGetTime
 * @constructor
 */

/**
 *  频彩 走势图
 */

function chartAll(allTrend) {
  $.each(allTrend, function (index, datas) {
    if (datas.open == 1) return true;
    LooterySpan += ' <span onclick="TabChart(this)" data="/page/game-center/open-trend.html?gameCode='
        + datas.code + '"  cate=' + datas.cate + '>' + datas.name + '</span>';
  })
  $(".game_btn").append(LooterySpan);
}


/**
 *  频彩 走势图 详情   open 【1 不显示;  open :0 显示】    cate 【0 六合彩；1 低频彩；2 时时彩；3 pk拾；4 11选；5 快乐十分】
 */

function chartDelite(allTrend) {
  $.each(allTrend, function (index, datas) {
    if (datas.open == 1) return true;
    var code = datas.code,
        name = datas.name;
    if (datas.cate == 0) {
      commonfunn(code,name,lhcWrap);
    }
    if (datas.cate == 1) {
      commonfunn(code,name,LFWrap);
    }
    if (datas.cate == 2) {
      commonfunn(code,name,sscWrap);
    }

    if (datas.cate == 3) {
      commonfunn(code,name,pkWrap);
    }
    if (datas.cate == 4) {
      commonfunn(code,name,syxwWrap)
    }
    if (datas.cate == 5) {
      commonfunn(code,name,klcWrap)
    }
  })
}

function commonfunn(code,name,Wrap){
  LooteryLI = '<li data="/page/game-center/open-trend.html?gameCode='+code+'" onclick="TabChart(this)">'
      +'<div class="lottery-logo lottery-logo-big"><a><img src="/page/game/img/'+code+'.png" /></a>'
      +'<div class="lottery-title"><h3>' + name + '</h3></div>'
      +'<div class="lottery-text"><button>基本走势</button></div></div></li>'
  Wrap.append(LooteryLI);
}

/**
 *    走势图彩种 切换
 */

function trend_top_tab(_this, _type) {
  $(_this).parent().find('div').removeClass('trend-top-choice');
  $(_this).addClass('trend-top-choice');
  var span = $(".game_btn").find("span");
  span.hide();
  if (_type == "all") {
    span.show();
  }
  else {
    for (var i = 0; i < span.length; i++) {
      if (span.eq(i).attr('cate') == _type) {
        span.eq(i).show();
      }
    }
  }
}

/**
 *    加载 走势图 页面
 */

function TabChart(_this) {
  var href = $(_this).attr('data');
  $(".trend-wrap").empty();
  $("#TrendBody").show();
  $(window).scrollTop(0);
  window.frames['TrendBody'].location.href = href;
}


