/**
 * Created by tpd on 2017/7/30.
 */


var _User = '',
    _Pass = '',
    _Rnum = '';

/***
 **   用法
 */

getLoginLimit();
isLogin();

function KeyDown() {
  if (event.keyCode == 13) {
    aLeftForm1Sub();
  }
}
function getYzm() {
  $("#vImg").attr("src", "/v/vCode?t=" + Math.random() + (new Date).getTime());
  $("#vImg").show();
}
// 在线客服
function onlineService() {
  window.open('http://messenger.providesupport.com/messenger/1d3itbjg8hdl91o5pzukpwlzrk.html','','height=600, width=1000,top=0, left=0')
}
//是否已登陆
function isLogin() {
  var token = $.cookie("token", {path: "/"});
  if (token != null && token != "") {
    $.ajax({
      type: "POST",
      url: "/views/html/top_user_info.html",
      success: function (msg) {

        $(".login-key").html(msg).show();
        $(".header .hide").hide();
        // $("#header").hide();
      }
    });
  } else {
    $(".login-key").show();
    $("#logined").hide();

  }
}

// 站内短信

function GatMessage() {
  var token = $.cookie("token", {path: "/"});
  if (token != null && token != "" )
    window.location.href = "/page/user-center/user-center.html?startPage=cms-message";
  else
    layer.alert('请先登入', {
      icon: 2,
      shade: 0
    }, function () {
      window.location.href = "/views/html/login.html";
    });
}


/***
 * 登录 验证
 * **/
function aLeftForm1Sub() {
  var un = $("#username").val();
  if (un == "" || un == _User) {
    layer.alert("用户名不能为空！", {
      icon: 2,
      shade: 0
    });
    $("#username").focus();
    return false;
  }
  var pw = $("#password").val();
  if (pw == "" || pw == _Pass) {
    layer.alert("密码不能为空！", {
      icon: 2,
      shade: 0
    });
    $("#password").focus();
    return false;
  }
  var needVocde = $("#needVocde").val();
  var rmNum = $("#rmNum").val();
  if ((rmNum == "" || rmNum == _Rnum) && needVocde > 0) {
    layer.alert("验证码不能为空！", {
      icon: 2,
      shade: 0
    });
    $("#rmNum").focus();
    return false;
  }
  $("#submit").attr("disabled", true); //按钮失效
  $.post("/v/user/login",
      {r: Math.random(), account: un, password: hex_md5(pw), valiCode: rmNum},
      function (data) {
        $.cookie("account", data.account, {path: "/"});
        $.cookie("accountType", data.type, {path: "/"});
        if (data.type == "TEST") {
          // 获取公告的JSON数据
          noticeManager.getNoticeAndLogin(function () {
            window.location.href = '/views/main.html';
          })
        } else {
          noticeManager.getNoticeAndLogin(function () {
            window.location.href = '/page/game-center.html';
          })
        }
      }).error(function (XMLHttpRequest) {
    getYzm();
    $("#submit").attr("disabled", false); //按钮有效
  });
}

function registerTest() {
  HttpUtil.ajax({
    type: "GET",
    url: HttpUtil.baseUrl + "/v/user/regTest",
    dataType: "",
    success: function (data) {
      if (data != null && data != "") {
        $.cookie("account", data.account, {path: "/"});
          layer.alert('试玩会员注册成功', {icon: 1}, function (index) {
              layer.close(index);
              window.location.reload();
          });
        //获取公告的JSON数据
        var noticeJson = HttpUtil.ajaxAsync(
            HttpUtil.baseUrl + "/data/json/notice.json");
        if (noticeJson != null && noticeJson != "") {
          if (noticeJson.login_notice != null && noticeJson.login_notice
              != "") {
            var option = {
              title: noticeJson.login_notice.noticeTitle
            }
            layer.open({
              type: 1,
              area: ['500px', 'auto'],
              btn: ['确认'],
              content: '<div style="padding: 20px;font-size:16px;">'
              + noticeJson.login_notice.noticeContent + '</div>'
              
            });
          }
        }
      } else {
        layer.alert('试玩会员注册失败', {icon: 2});
      }
    }
  });
}

/***
 * 会员退出登录 *
 * **/
function mem_logout() {
  $.get("/v/user/logout", {}, function (data) {
    $.cookie("account", null, {path: '/'});
    $.cookie("token", null, {path: '/'});
    window.location.href = '/views/main.html';
  }).error(function (XMLHttpRequest) {
    $.cookie("account", null, {path: '/'});
    $.cookie("token", null, {path: '/'});
    window.location.href = '/views/main.html';
  })
}

function getLoginLimit() {
  $.getJSON("/data/json/limit/userLoginLimit.json?"+new Date().getTime(),
      function (data) {
        if (data.vCode > 0) {
          $('#rmNum').focus(function () {
            if ($(this).val() == _Rnum) {
              $(this).val('');
            }
          }).blur(function () {
            if ($(this).val() == '') {
              $(this).val(_Rnum);
            }
          });
          //加载验证
          // getYzm('');
          $("#vcode_moudle").show();
          $("#needVocde").attr("value", 1);
        } else {
          $("#needVocde").attr("value", 0);
          $("#vcode_moudle").hide();
        }

      }).error(function (XMLHttpRequest) {
    $('#rmNum').focus(function () {
      if ($(this).val() == _Rnum) {
        $(this).val('');
      }
    }).blur(function () {
      if ($(this).val() == '') {
        $(this).val(_Rnum);
      }
    });
    $("#needVocde").attr("value", 1);
  });
}

/**
 * 获取 url 参数
 */
function getQueryString(game) {
  var reg = new RegExp("(^|&)" + game + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

/**
 *加入收藏
 */

function AddFavorite(sURL, sTitle) {
  try {
    window.external.addFavorite(sURL, sTitle);
  }
  catch (e) {
    try {
      window.sidebar.addPanel(sTitle, sURL, "");
    }
    catch (e) {
      alert("加入收藏失败，请使用Ctrl+D进行添加");
    }
  }
}

/**
 * 关闭浮窗
 */

function closeFloat(_this) {
  $(_this).parent().css('display', 'none');
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