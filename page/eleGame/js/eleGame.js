/***
 ** 电子游艺
 ***/

var curGameCode = "cq9";
var gameKind = null;
var searchValue = null;
var mySwiper;
var curIndex = 0;

$(function () {

    if (getQueryString('gameType')) {
        curGameCode = getQueryString('gameType');
    }

   //  电子主菜单
   $.getJSON('/page/eleGame/nav.json', function (response) {

       $.each(response, function(index, item){
         let acitve = '';
         if (item.code === curGameCode) {
           acitve = 'ele-swiper-slide-active';
           curIndex = index;
         }
         $("<div/>", {
           class: "swiper-slide " + acitve,
           onclick: "Tab(this, " + index + ")",
           code: item.code,
           html: "<div><img src=" + item.logoSrc + "></div><div>" + item.name + "</div>"
         }).appendTo($(".ele-swiper-wrapper"))
       });

       mySwiper = new Swiper('.ele-swiper-container', {
           slidesPerView: 6,
           autoplay: 3000,
           autoplayDisableOnInteraction: false,
           loop: true,
           prevButton:'.swiper-button-prev',
           nextButton:'.swiper-button-next'
       });

       mySwiper.slideTo(curIndex + 4);

   });

  $(".searchValue").keyup(function(event){
    if(event.keyCode === 13){
      searchGame()
    }
  });

  $('.ele-header').mouseenter(function () {
    mySwiper.stopAutoplay();
    $(".ele-header .swiper-button-next, .ele-header .swiper-button-prev").show()
  });

  $('.ele-header').mouseleave(function () {
    mySwiper.startAutoplay();
    $(".ele-header .swiper-button-next, .ele-header .swiper-button-prev").hide()
  });

   initMenu(curGameCode);

   if (curGameCode !== 'agby') {
     show();
     getGameList(curGameCode, 1)
   }

});

// 游戏 切换
function Tab (that, index) {
  curGameCode = $(that).attr("code");
  gameKind = null;
  searchValue = null;
  $(".searchValue").val(null);
  $(that).siblings().removeClass("ele-swiper-slide-active");
  $(that).addClass("ele-swiper-slide-active");
  $("#curPageNum").text(1);
  initMenu(curGameCode);

  if(curGameCode === 'agby') {
    $(".isNotAgby").hide();
    $(".isAgby").show();
  } else {
    $(".isNotAgby").show();
    $(".isAgby").hide();
    show();
    getGameList($(that).attr("code"), 1);
  }

}

// MG / JDB 游戏分类
function eleGameClass (gameType) {
  gameKind = gameType;
  searchValue = null;
  $(".searchValue").val(null);
  $("#curPageNum").text(1);
  show();
  getGameList(curGameCode, 1)
}

//  首页
function eleIndexPage () {
  if(parseInt($("#curPageNum").text()) === 1) {
    layer.alert('已经是第一页了!');
  } else {
    $("#curPageNum").text(1);
    show();
    getGameList(curGameCode, 1);
  }
}

//  上一页
function elePrevPage () {
  var curPageNum = parseInt($("#curPageNum").text());
  if (curPageNum === 1) {
    layer.alert('已经是第一页了!');
  } else {
    curPageNum -= 1;
    $("#curPageNum").text(curPageNum);
    show();
    getGameList(curGameCode, curPageNum)
  }
}

//  下一页
function eleNextPage () {
  var curPageNum = parseInt($("#curPageNum").text()),
      curTotalPageNum = parseInt($("#curTotalPageNum").text());
  if ((curTotalPageNum - curPageNum) <= 0) {
    layer.alert('已经是最后一页了!');
  } else {
    curPageNum += 1;
    $("#curPageNum").text(curPageNum);
    show();
    getGameList(curGameCode, curPageNum)
  }
}

// 尾页
function eleEndPage () {
  var curPageNum = parseInt($("#curPageNum").text()),
      curTotalPageNum = parseInt($("#curTotalPageNum").text());
  if ((curTotalPageNum - curPageNum) <= 0) {
    layer.alert('已经是最后一页了!');
  } else {
    $("#curPageNum").text(curTotalPageNum);
    show();
    getGameList(curGameCode, curTotalPageNum)
  }
}

//  查询当前游戏种类所有游戏
function searchCurGame () {
  $("#curPageNum").text(1);
  gameKind = null;
  searchValue = null;
  $(".searchValue").val(null);
  show();
  getGameList(curGameCode, 1);
}

// 模糊查询
function searchGame () {
   searchValue = $.trim($(".searchValue").val());
   if((/^\s*$/g).test(searchValue)) {
     layer.alert('关键字不能为空')
   } else {
     $("#curPageNum").text(1);
     show();
     getGameList(curGameCode, 1)
   }
}

//  获取游戏列表
function getGameList (liveCode, page) {

  $(".ele-gamelist-row").empty();

  let data = {
    liveCode: liveCode,
    page: page,
    rows: 15,
    isFlash: 0
  };

  if (gameKind) {
    data.gameKind = gameKind
  } else {
    delete data.gameKind
  }
  if (searchValue) {
    data.chineseName = searchValue
  } else {
    delete data.chineseName
  }

  $.getJSON('/api/live/qst', data, function (response) {
    $("#curTotalPageNum").text(Math.ceil(response.totalCount / 15));
    $.each(response.data, function (index, item) {
      var img_src = "";
      if (item.liveCode === 'ag' || item.liveCode === 'bbin' || item.liveCode === 'pt' || item.liveCode === 'fe' || item.liveCode === 'hj') {
        img_src = "/data/gamePicture/" + item.imageName;
      } else if (item.liveCode === 'cq9') {
        img_src = "/data/gamePicture/cq/" + item.imageName;
      } else {
        img_src = "/data/" + item.liveCode + "Picture/" + item.imageName;
      }
      $("<div/>", {
        class: "ele-gamelist-col",
        onclick: "entereleGame(this)",
        "liveCode": item.liveCode,
        "gameType": item.gameType,
        "gameKind": item.gameKind,
        "gameCode":item.gameCode,
        html: "<div class=\"ele-gamelist-col-logo\"><img class='" +item.liveCode+ "' onerror=\"this.src='/page/eleGame/img/404.png'\" src=" + img_src + "></div>"
        + "<div style=\"display: none\" class=\"ele-gamelist-col-title\">"
        + "<i class=\"fa fa-star\" aria-hidden=\"true\"></i>"
        + "<i class=\"fa fa-star\" aria-hidden=\"true\"></i>"
        + "<i class=\"fa fa-star\" aria-hidden=\"true\"></i>"
        + "<i class=\"fa fa-star\" aria-hidden=\"true\"></i>"
        + "<i class=\"fa fa-star\" aria-hidden=\"true\"></i></div>"
        + "<div class=\"ele-gamelist-col-text\">" + item.chineseName + "</div></div>"
      }).appendTo($(".ele-gamelist-row"))
    });
    hide();
  });
}

// 初始化菜单
function initMenu (type) {

  if (type === 'mg') {
    $(".ele-mg-next-nav").show();
    $(".ele-jdb-next-nav").hide();
  } else if (type === 'jdb'){
    $(".ele-jdb-next-nav").show();
    $(".ele-mg-next-nav").hide();
  } else {
    $(".ele-jdb-next-nav").hide();
    $(".ele-mg-next-nav").hide();
  }

  var Media = document.getElementById("ele-byVideo");

  if (type === 'agby') {
    $(".isAgby").show();
    $(".isNotAgby").hide();
    Media.play();
  } else {
    $(".isAgby").hide();
    $(".isNotAgby").show();
    Media.pause();
  }

}

//  静音
function mutedBank () {
  var type = $("#ele-byVideo").prop('muted'),
      Media = document.getElementById("ele-byVideo");
  if (type) {
    Media.muted = false;
    $(".isMuted").hide();
    $(".isNotMuted").show();
  } else {
    Media.muted = true
    $(".isNotMuted").hide();
    $(".isMuted").show();
  }
}

function show () {
  $(".ele-loading").show();
}

function hide () {
  $(".ele-loading").hide();
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
 *   ag 捕鱼  游戏帮助
 */

function agbyGamehelp(_this, _type) {
    var _area = [],
        _title = "",
        _imgSrc = "";

    switch (_type) {
        case 1:
            _area = ['678px', '468px'];
            _title = "界面说明";
            _imgSrc = "tab_img1";
            helpContent(_area, _title, _imgSrc);
            break;
        case 2:
            _area = ['678px', '372px'];
            _title = "操作说明";
            _imgSrc = "tab_img2";
            helpContent(_area, _title, _imgSrc);
            break;
        case 3:
            _area = ['678px', '380px'];
            _title = "鱼的说明";
            _imgSrc = "tab_img3";
            helpContent(_area, _title, _imgSrc);
            break;
        case 4:
            _area = ['678px', '380px'];
            _title = "炮的说明";
            _imgSrc = "tab_img4";
            helpContent(_area, _title, _imgSrc);
            break;
        case 5:
            _area = ['678px', '380px'];
            _title = "图表说明";
            _imgSrc = "tab_img5";
            helpContent(_area, _title, _imgSrc);
            break;
    }
}

/***
 **   AG捕鱼 帮助  弹窗
 */

function helpContent(_area, _title, _imgSrc) {
    layer.open({
        skin: 'ele-by-class',
        title: _title,
        shadeClose: true,
        type: 1,
        area: _area,
        content: '<div class="PicWrap"><img style="width: 100%" src="/page/eleGame/img/' + _imgSrc
        + '.jpg" style=""></div>'
    });
}
