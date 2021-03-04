/**
 * Created by tpd on 2017/7/30.
 */


var _User = '',
  _Pass = '',
  _Rnum = '',
  flag = 0;
  
/***
 **   用法
 */

$(function () {
  getYzm();
  getLoginLimit();
  isLogin();
});

var layerFlag = true;
function KeyDown() {
  if (event.keyCode == 13) {
	 var token = $.cookie("token", {path: "/"});
	 if (token == null) {
		 if(layerFlag) {
			 aLeftForm1Sub();
		 }else {
			 layer.closeAll();
			 layerFlag = true;
		 }
	 } else {
		 layer.closeAll()
		 window.location.href='/views/main.html';
	 }
  }
}

function getYzm() {
  $("#vImg").attr("src", "/v/vCode?t=" + Math.random() + (new Date).getTime());
  $("#vImg").show();
}

//是否已登陆
function isLogin() {
  var token = $.cookie("token", {path: "/"});
  if (token != null && token != "") {
    $.ajax({
      type: "POST",
      url: "/views/html/top_user_info.html",
      success: function (msg) {
        $(".key-wrap").html(msg).show();
        $(".header_top_right_wrap .hide").hide();
        $(".header_top_left_wrap .hide").hide();
      }
    });
  } else {
    $(".key-wrap").show();
    $(".header_top_right_wrap .hide").show();
    $(".header_top_left_wrap .hide").show();
  }
}

/***
 * 登录 验证
 * **/
function aLeftForm1Sub() {
  var md5Password = ($.cookie("md5Password", {path: "/"}) === 'true');  // md5密码加密验证
  var un = $("#username").val();
  if (un == "" || un == _User) {
    layer.alert("用户名不能为空！", {
      icon: 2,
      shade: 0
    });
    layerFlag = false;
    $("#username").focus();
    return false;
  }
  var pw = $("#password").val();
  if (pw == "" || pw == _Pass) {
    layer.alert("密码不能为空！", {
      icon: 2,
      shade: 0
    });
    layerFlag = false;
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
    layerFlag = false;
    $("#rmNum").focus();
    return false;
  }
  $("#submit").attr("disabled", true); //按钮失效
  $.post("/v/user/login",
    {r: Math.random(), account: un, password: md5Password ? hex_md5(pw) : pw, valiCode: rmNum},
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
          window.location.href = '/views/main.html';
        })
      }
    }).error(function (XMLHttpRequest) {
    getYzm();
    $("#submit").attr("disabled", false); //按钮有效
  });
  layerFlag = false;
}

/***
 * 会员退出登录 *
 * **/
function mem_logout() {
  $.get("/v/user/logout", {}, function (data) {
    $.cookie("account", null, {path: '/'});
    $.cookie("token", null, {path: '/'});
    $.cookie("userType",null, {path: "/"});
    window.location.href = '/views/main.html';
  }).error(function (XMLHttpRequest) {
    $.cookie("account", null, {path: '/'});
    $.cookie("token", null, {path: '/'});
    $.cookie("userType",null, {path: "/"});
    window.location.href = '/views/main.html';
  })
}

function getLoginLimit() {
  $.getJSON("/data/json/limit/userLoginLimit.json?" + new Date().getTime(),
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
