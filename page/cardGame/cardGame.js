$(function () {
  "use strict";

  var filterType = true;
  var defaultClass = null;
  var showList = "ky,jdb,lc,nwg,kk,dg2,rmg,gg_chess,tm_chess,ly_chess";//HB, wz, nw, dfw,
  var gameType = getQueryString('gameType');

  var data = {
    liveCode: gameType,
    page: 1,
    rows: 100,
    isFlash: 0
  };
  $.getJSON("/api/live/allLiveGames?show=true", function (res) {
    $(".chess-tab").empty();
    for (var i = 0; i < res.length; i++) {
      if(res[i].code == 'mg'){
      		continue;
      }
      if (showList.indexOf(res[i].code) > -1) {
        if (gameType) {
          if (gameType === res[i].code) {
            defaultClass = "active"
          } else {
            defaultClass = null
          }
        } else {
          if (filterType) {
            data.liveCode = res[i].code;
            defaultClass = "active";
            filterType = false;
          } else {
            defaultClass = null
          }
        }

        if(res[i].code == 'jdb'){
          $("<li/>", {
            type: res[i].code,
            id: res[i].code + "Btn",
            class: "gameTab " + defaultClass,
            "onclick": "gameTab(this, '" + res[i].code + "','JDB_QT')"
            // html: res[i].name
          }).appendTo($(".chess-tab"));
        }else{
          $("<li/>", {
            type: res[i].code,
            id: res[i].code + "Btn",
            class: "gameTab " + defaultClass,
            "onclick": "gameTab(this, '" + res[i].code + "')"
            // html: res[i].name
          }).appendTo($(".chess-tab"));
        }
      }
    }
    getAllCardGameList(data);
    isShowLuckyTip(data.liveCode);
  });
});

/***
 *  获取棋牌 列表
 */

function getAllCardGameList(data) {
  $(".chessLoading").show();
  $.getJSON('/api/live/qst', data, function (response) {
    $(".chessLoading").hide();
    $(".jbao-list-wrap").empty();
    for (var i = 0; i < response.data.length; i++) {
      $("<div/>", {
        title: response.data[i].chineseName,
        class: "jbao-list-row",
        "onclick": "entereleGame(this)",
        "liveCode": response.data[i].liveCode,
        "gameType": response.data[i].gameType,
        "gameCode": response.data[i].gameCode,
        "firstKind": response.data[i].firstKind,
        html: "<div class='jbao-list-icno'><img onerror=\"this.src='/page/eleGame/img/404.png'\" src='/data/" + data.liveCode + "Picture/" + response.data[i].imageName + "' /></div><a href='javascript:;'>进入游戏</a><div class='jbao-list-name'>" + response.data[i].chineseName + "</div>"
      }).appendTo($(".jbao-list-wrap"));
    }
    var chessCode = response.data[0].liveCode;
    if (chessCode === "lucky") {
      $("<p id='luckyChessTip'>温馨提示: 幸运棋牌不需要进行额度转换，试玩账号可直接进入游戏！</p>").appendTo($(".jbao-list-wrap"))
    } else {
      return;
    }
  })
}

/***
 **   获取url 参数 判断游戏种类
 */

function getQueryString(gameType) {
  var reg = new RegExp("(^|&)" + gameType + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

/***
 **   切换游戏
 */

function gameTab(that, gameType,gameKind) {
  var data = {};
  data = gameKind === undefined || gameKind == '' || gameKind == null ? {
    liveCode: gameType,
    page: 1,
    rows: 100,
    isFlash: 0
  } :
  {
    liveCode: gameType,
    gameKind: gameKind,
    page: 1,
    rows: 100,
    isFlash: 0
  };
  isShowLuckyTip(gameType);
  getAllCardGameList(data);
  $(".gameTab").removeClass('CardTabStyle');
  $(".chess-tab li").removeClass('active');
  $(that).addClass('active');
}

function isShowLuckyTip(gameType) {
  if (gameType === "lucky") {
    $("#luckyChessTip").html("温馨提示: 幸运棋牌不需要进行额度转换，试玩账号可直接进入游戏！");
  } else {
    $("#luckyChessTip").html("");
  }
}