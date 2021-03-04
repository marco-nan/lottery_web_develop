/**
 * Created by tpd on 2017/7/28.
 */

/***
 **  开奖公告
 */

var Allresponse="",
    DrawNoticeSpan = "";

var notice_lhs = $(".notice_lhs"),
    notice_ssc = $(".notice_ssc"),
    notice_pk = $(".notice_pk"),
    notice_syxw = $(".notice_syxw"),
    notice_ks = $(".notice_ks"),
    notice_dpc = $(".notice_dpc");


$(document).ready(function () {
  var DrawNoticeUrl = '/v/lottery/getAllOpenInfo';    // 获取所有数据

  $.getJSON(DrawNoticeUrl,function(response){
      Allresponse = response;
      ALlDrawNotice(response);      // 所有最新开奖
      DrawNoticeDelite(response);   // 所有最新开奖详情
  })
})


/**
 *
 * @param response
 * @param apiGetTime           open :1 不显示;  open :0 显示;
 * @constructor
 */

/**
 *  开奖公告 详情   open 【1 不显示;  open :0 显示】    cate 【0 六合彩；1 低频彩；2 时时彩；3 pk拾；4 11选；5 快乐十分】
 */



//  所有最新开奖数据
function ALlDrawNotice(response){
  $.each(response, function (index, datas) {
    if (datas.game.open == 1) return true;
    DrawNoticeSpan += ' <li onclick="TabResult(this)" data="/page/game-center/open-infos.html?gameCode='
        + datas.game.code + '"><a target="_blank">'
        + datas.game.name + '</a></li>';
  })
  $('.draw-lotteryList').append(DrawNoticeSpan);
}


//  开奖公告  详情
function DrawNoticeDelite(result){

  $.each(result, function (index, datas) {
      if (datas.game.open == 1) return true;
      var number_ball = "",
          turnNum = datas.pre.turnNum,
          startTime = datas.pre.openTime,
          name = datas.game.name,
          openNum = datas.pre.openNum,
          amount = datas.game.amount,
          code = datas.game.code,
          openFrequency = datas.game.openFrequency,
          openSpan = [],
          isOffcial = datas.game.isOffcial,
          ballbgSpan = '';

      if (turnNum == null) {
        turnNum = "暂无";
      }
      if (startTime == null) {
        startTime = "暂无";
      }
      if (name == null) {
        startTime = "暂无";
      }
      if (amount == null) {
        amount = "'暂无'";
      }
      if (openFrequency == null) {
        openFrequency = "暂无";
      }
      if (isOffcial == 0 ){
        isOffcial = 'index'
      }
      if (isOffcial == 1)
      {
        isOffcial = 'index_official'
      }
      if (openNum == null) {
        openNum = " '暂无' ";
      }
      else {
        openSpan = openNum.split(',');
        $.each(openSpan, function (index, datas) {

          ballbgSpan += "<span>" + datas + "</span>";
        })
      }
      if (datas.game.cate === 0) {
          var lhcOpenNum = datas.pre.openNum!=null&&datas.pre.openNum!="" ? datas.pre.openNum.split(',') : "",
              lhcOpenSex;

          if(datas.pre.result != null && JSON.parse(datas.pre.result)[datas.game.id + '200103008'] != undefined && JSON.parse(datas.pre.result)[datas.game.id + '200103008'] != null){
              lhcOpenSex = (JSON.parse(datas.pre.result))[datas.game.id + '200103008'].split(',');
              for (var j=0; j<lhcOpenNum.length; j++ ){
                  if ( j == 6){
                      var only_number_ball = '<div class="number_ball"><a class="only-number ball_'+lhcOpenNum[j]+'">'+lhcOpenNum[j]+'</a><div class="ball_sxs">'+lhcOpenSex[j]+'</div></div></div>'
                  }else{
                      number_ball += '<div class="number_ball number_ball_only ball_'+lhcOpenNum[j]+'"><a>'+lhcOpenNum[j]+'</a><div class="ball_sub">'+lhcOpenSex[j]+'</div></div>';
                  }
              }
              ballbgSpan = '<div class="ballDivMain">'
                  +'<div class="ballDiv ballDivLhc">'
                  + number_ball
                  +' </div>'
                  +'<div class="ballPlus"><a>+</a></div>'
                  + only_number_ball;

              commonFunn(name,turnNum,startTime,ballbgSpan,amount,openFrequency,code,notice_lhs,isOffcial);
          }



      }
      if (datas.game.cate == 1) {

        commonFunn(name,turnNum,startTime,ballbgSpan,amount,openFrequency,code,notice_dpc,isOffcial);
      }
      if (datas.game.cate == 2) {
        commonFunn(name,turnNum,startTime,ballbgSpan,amount,openFrequency,code,notice_ssc,isOffcial);
      }
      if (datas.game.cate == 3) {
        commonFunn(name,turnNum,startTime,ballbgSpan,amount,openFrequency,code,notice_pk,isOffcial);

      }
      if (datas.game.cate == 4) {
        commonFunn(name,turnNum,startTime,ballbgSpan,amount,openFrequency,code,notice_syxw,isOffcial);
      }
      if (datas.game.cate == 5) {
        commonFunn(name,turnNum,startTime,ballbgSpan,amount,openFrequency,code,notice_ks,isOffcial);
      }
  })

  $(".draw-content-load").hide();    // loading 加载完毕

}

function commonFunn(name,turnNum,startTime,ballbgSpan,amount,openFrequency,code,wrap,isOffcial){
  var showName = "";
  if (name == '六合彩')
  {
    showName = "每周开奖3期";
  }
  else
  {
    showName = '每天开奖' + amount + '期'
  }
  notice_lhs_tr = '<tr class="bgcolor"><td><a class="name">' + name
      + '</a></td>'
      + '<td><a>' + turnNum + '</a></td>'
      + '<td>' + startTime + '</td>'
      + '<td><div class="ballbg">' + ballbgSpan + '</div></td>'
      + '<td>'+showName+'</td>'
      + '<td>' + openFrequency + '</td>'
      + '<td onclick="TabResult(this)" data="/page/game-center/open-infos.html?gameCode='+code+ '">'
      + '<a class="c-blue blod">详情</a></td>'
      + '<td onclick="TabResult(this)" data="/page/game-center/open-trend.html?gameCode='+code+ '">'
      + '<a><img src="/views/img/zst.gif" /></a></td>'
      + '<td class="b"><a href="/data/game/' + code
      + '/'+isOffcial+'.html" class="draw-lottery-btn">我要投注</a></td></tr>';
  wrap.append(notice_lhs_tr);    //  六合彩
}


// 六合彩 生肖
function  lhc() {
  var lhc = "";
  // $.ajaxSettings.async = true;
  $.ajax({
    url: '/data/json/lhc_sx.json',
    type: 'get',
    dataType: 'json',
    async: false,
    success: function (response) {
      lhc = response;
    }
  })
  return lhc;

}