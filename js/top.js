//定义验证时的全局变量
var _User = '';
var _Pass = '';
var _Rnum = '';
/***********************************js跳转页面******************************/
//open
// function getPager(type,mo,me){
//     if(type.charAt(0) == "-") {
//         if (type.charAt(1) != '') {
//             var adid = type.substr(1);
//             if (me == '') {
//                 window.location.href = mo + '?advtype='+adid;
//             }else{
//                 window.location.href = mo + '?metype='+me + '&advtype='+adid;
//             }
//         }else{
//             if (me == '') {
//                 window.location.href = mo;
//             }else{
//                 window.location.href = mo + '?metype='+me;
//             }
//         }
//     }else if(type.charAt('_')){
//         if(type == '_bank') {
//             mo = 'http://'+mo;
//             window.open(mo, null);
//         } else if(type == '_self') {
//             location.href = mo;
//         }
//     }
// }
/**
 * 打开新页面
 */

function openNewTab(url) {
  //window.location.href = url;
  // window.open(url);
  window.open(url, '', 'height=600, width=1400 ,top =20, left =20');
}

function openModalX(key) {
  if ($.type(key) === 'object') {
    var modalX = new ModalX(key);
    return;
  }
  $.getJSON('/data/json/menu-groups.json', function (response) {
    var conf = response[key];
    var modalX = new ModalX({
      title: conf.name,
      url: conf.url,
      tabs: conf.children
    });
  })
}

function ModalX(options) {
  var settings = $.extend({
    title: '',
    url: '',
    tabs: []
  }, options || {});
  this.initialize(settings)
}

ModalX.prototype.initialize = function (settings) {
  var modalX = this;
  this.onClose = settings.onClose
  this.jqObject = $(
      '<div class="modalx-layer"><div class="modalx-wrapper"><div class="modalx-header"><span class="modalx-title"></span><span class="modalx-close">X</span></div><div class="modalx-content"><div class="modalx-frame-container"><iframe width="100%" height="100%" frameborder="no" scrolling="auto"></iframe></div></div></div></div>');
  this.jqObject.appendTo($(document.body));
  this.jqObject.find('.modalx-title').text(settings.title);
  this.jqObject.find('.modalx-close').on('click', function () {
    modalX.jqObject.remove();
    if ($.isFunction(settings.onClose)) {
      settings.onClose();
    }
  });
  var iframe = this.jqObject.find('.modalx-frame-container>iframe');
  var tabs = settings.tabs;
  if ($.isArray(tabs) && tabs.length > 0) {
    this.jqObject.find('.modalx-frame-container').addClass('has-tabs');
    var tabsEl = $('<ul class="modalx-tabs"></ul>'), tabEl, tab;
    for (var i = 0; i < tabs.length; i++) {
      tab = tabs[i];
      tabEl = $('<li data-url="' + tab.url + '">' + tab.name + '</li>');
      tabEl.on('click', function () {
        var $this = $(this);
        if ($this.hasClass('active')) {
          return;
        }
        $this.addClass('active').siblings('.active').removeClass('active');
        iframe.attr('src', $this.attr('data-url'));
      });
      tabsEl.append(tabEl);
    }
    this.jqObject.find('.modalx-content').prepend(tabsEl);
    tabsEl.children('li').first().click();
  } else {
    iframe.attr('src', settings.url);
  }
}

function openTabInThisPage(url) {
  window.location.href = url;
}

/***********************************会员中心******************************/
//前台会员中心打开
// function openHelp(url,title) {
// 	layer.open({
//     	type: 2,
//     	title:title,
//     	area: '1000px',
//     	offset: ['100px'],
//     	fixed: true, //不固定
//     	maxmin: false,
//     	content: url,
//     	success: function(layero, index) {
//             layer.iframeAuto(index);
//         }
//     });
// }

/***********************************弹出登录******************************/
//前台会员中心打开
// function openLoginModal(url) {
// //	layer.open({
// //		type: 2,
// //		title:'会员登录',
// //		area: ['650px', '480px'],
// //		offset: ['100px'],
// //		fixed: false, //不固定
// //		maxmin: false,
// //		content: url
// //	});
// //	open(url,'会员登录','width=650,height=480,menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes')
// 	window.open(url,'会员登录','height=480,width=650,top=0,left=300,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no');
// }
/***********************************验证码******************************/
//验证码
// function getKey(url) {
//
//     $("#vPic").attr("src", "/v/vCode?t="+Math.random()+(new Date).getTime());
//     $("#vPic").show();
// }

function getYzm(url) {
  $("#vImg").attr("src", "/v/vCode?t=" + Math.random() + (new Date).getTime());
  $("#vImg").show();
}
/***********************************代理联盟table选项卡******************************/
// $.fn.mtab2 = function(posType) {
//     var area = this, bgTop = '', bgBottom = '';
//     var posType = (typeof posType !== 'undefined'? posType: 'l');
//     switch(posType) {
//         case 'c':
//             bgTop = 'top center';
//             bgBottom = 'bottom center';
//             break;
//         case 'r':
//             bgTop = 'top right';
//             bgBottom = 'bottom right';
//             break;
//         default:
//             bgTop = 'top left';
//             bgBottom = 'bottom left'
//     }
//     $.each(area.find('li[id^=#]'), function(i) {
//         if(i != 0) {
//             area.find(this.id)[0].style.display = 'none';
//         }
//     });
//     area.find('li[id^=#]').click(function() {
//         var self = this;
//         $.each(area.find('li[id^=#]'), function(i) {
//             if(self.id != this.id) {
//                 area.find(this.id)[0].style.display = 'none';
//                 $(this)[0].style.backgroundPosition = bgTop;
//                 $(this).removeClass('mtab');
//             } else {
//                 area.find(this.id)[0].style.display = 'block';
//                 $(this)[0].style.backgroundPosition = bgBottom;
//                 $(this).addClass('mtab');
//             }
//         });
//     });
// };

/***********************************显示美东时间******************************/
//美东时间
// function RefTime(){
//     dd2.setSeconds(dd2.getSeconds()+1);
//     var myYears = ( dd2.getYear() < 1900 ) ? ( 1900 + dd2.getYear() ) : dd2.getYear();
//     $("#vlock").html('美東時間'+'：'+myYears+'年'+fixNum(dd2.getMonth()+1)+'月'+fixNum(dd2.getDate())+'日 '+time(dd2));
// }

// function time(vtime){
//     var s='';
//     var d=vtime!=null?new Date(vtime):new Date();
//     with(d){
//         s=fixNum(getHours())+':'+fixNum(getMinutes())+':'+fixNum(getSeconds())
//     }
//     return(s);
// }

// function fixNum(num){
//     return parseInt(num)<10?'0'+num:num;
// }

// /***********************************日历******************************/
// function _getYear(d){
//     var yr=d.getYear();
//     if(yr<1000) yr+=1900;
//     return yr;
// }

// function tick(){
//     function initArray(){
//         for(i=0;i<initArray.arguments.length;i++) this[i]=initArray.arguments[i];
//     }
//     var isnDays=new initArray("星期日","星期一","星期二","星期三","星期四","星期五","星期六","星期日");
//     var today=new Date();
//     var hrs=today.getHours();
//     var _min=today.getMinutes();
//     var sec=today.getSeconds();
//     var clckh=""+((hrs>12)?hrs-12:hrs);
//     var clckm=((_min<10)?"0":"")+_min;clcks=((sec<10)?"0":"")+sec;
//     var clck=(hrs>=12)?"下午":"上午";
//
//     //document.getElementById("t_2_1").innerHTML = _getYear(today)+"/"+(today.getMonth()+1)+"/"+today.getDate()+"&nbsp;"+clckh+":"+clckm+":"+clcks+"&nbsp;"+clck+"&nbsp;"+isnDays[today.getDay()];
//     document.getElementById("t_2_1").innerHTML = _getYear(today)+"/"+(today.getMonth()+1)+"/"+today.getDate()+"&nbsp;"+clckh+":"+clckm+":"+clcks;
//
//     window.setTimeout("tick()", 100);
// }

// function urlparent(url){
//     window.open(url,"newFrame");
// }
//
// function topMouseEvent(mi,ty,i){
//     if(ty == "o" && i != disnum){
//         mi.className = "homemenua";
//     }else if(ty == "t" && i != disnum){
//         mi.className = "alink";
//     }
// }
// function KeyDown() {
//     if(event.keyCode==13){
//         aLeftForm1Sub();
//     }
// }
// function loginKeyDown() {
//     if(event.keyCode==13){
//         LoginPage();
//     }
// }

//登陆验证
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
          //获取公告的JSON数据
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

//登陆页面登陆验证
function LoginPage() {

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
  $("#submit").hide();
  $("#submited").show();
  $.post("/v/user/login",
      {r: Math.random(), account: un, password: hex_md5(pw), valiCode: rmNum},
      function (data) {
        $.cookie("account", data.account, {path: "/"});
        $.cookie("accountType", data.type, {path: "/"});
        if (data.type == "TEST") {
          noticeManager.getNoticeAndLogin(function () {
            window.location.href = '/views/main.html'
          })
        } else {
          //获取公告的JSON数据
          noticeManager.getNoticeAndLogin(function () {
            window.location.href = '/page/game-center.html'
          })
        }
      }).error(function (XMLHttpRequest) {
    getYzm();
    $("#submit").attr("disabled", false); //按钮有效
    $("#submited").hide();
    $("#submit").show();
  });
}

//跳转到新增会员页面
function returnSavaMember() {
  window.close();
  window.opener.location.href = "/views/html/register.html";
}

//跳转到优惠活动的页面
function returnYouhui() {
  window.close();
  window.opener.location.href = "/views/html/youhui.html";
}

//忘记密码
function openForgetPwd() {
  window.close();
  window.open('/user_findPwd.html', 'Go_forget_pwd',
      'width=390,resizable=yes,height=664,status=no');
}

// /***********************************会员登录******************************/
// function mem_login(){
//     var uname = $("#username").val();
//     if(uname == "" || uname == _User){
//         $("#username").focus();
//         return false;
//     }
//     var pwd = $("#password").val();
//     if(pwd == "" || pwd == _Pass){
//         $("#password").focus();
//         return false;
//     }
//     var rmNum = $("#rmNum").val();
//     if(rmNum == "" || rmNum == _Rnum){
//         $("#rmNum").focus();
//         return false;
//     }
//
//     $("#submit").attr("disabled",true); //按钮失效
//     $.post("/v/user/login",{r:Math.random(),account:uname,password:hex_md5(pwd),valiCode:rmNum},function(data){
//     	$.cookie("account", data.account);
//     	window.location.href= '/';
//     }).error(function(XMLHttpRequest){
//     	$("#submit").attr("disabled",false); //按钮有效
//     });
// }
/*** 会员退出登录 ***/
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

// /***********************************memberUrl******************************/
// function memberUrl(url) {
//     art.dialog.open(url,{width:960,height:500});
// }

// function get_dled(){
//     $.getJSON("getDLED.php?callback=?",function(json){
//         $("#dled").html("("+json.dled+")");
//     });
// }

// function navfocu(i){
//     var as = document.getElementById("top_3").getElementsByTagName("a");
//     for(var s=0; s<as.length; s++){
//         if(s == (i-1)){
//             as[s].className = "nav"+i+"_f";
//         }else{
//             as[s].className = "nav"+(s+1);
//         }
//     }
// }

/***********************************收藏及设为首页******************************/
//用法
//onclick="AddFavorite(window.location, document.title)"
//onclick="SetHome(this, top.location)"

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
 *设为首页
 */
function SetHome(obj, vrl) {
  try {
    obj.style.behavior = 'url(#default#homepage)';
    obj.setHomePage(vrl);
  }
  catch (e) {
    if (window.netscape) {
      try {
        netscape.security.PrivilegeManager.enablePrivilege(
            "UniversalXPConnect");
      }
      catch (e) {
        alert(
            "此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
      }
      var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(
          Components.interfaces.nsIPrefBranch);
      prefs.setCharPref('browser.startup.homepage', vrl);
    } else {
      alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入：" + vrl + "点击确定。");
    }
  }
}

/***********************************A标签文字闪烁-无需调用******************************/
// function toggleColor(id, arr, s){
//     var self = this;
//     self._i = 0;
//     self._timer = null;
//
//     self.run = function() {
//         if(arr[self._i]) {
//             $(id).css('color', arr[self._i]);
//         }
//         self._i == 0 ? self._i++ : self._i = 0;
//         self._timer = setTimeout(function() {
//             self.run(id, arr, s);
//         }, s);
//     }
//     self.run();
// }
//讀取文案連結  data-color
// $(function() {
//     $('a.js-article-color').each(function() {
//         var color_arr = $(this).data('color');
//
//         if ('undefined' ==  typeof color_arr) return;
//
//         color_arr = color_arr.split('|');
//
//         // 確認顏色數量  2=>閃爍   1=>單一色  0=>跳過
//         if(color_arr.length == 2) {
//             new toggleColor(this, [color_arr[0], color_arr[1]], 500 );
//         }else if(color_arr.length == 1 && color_arr[0] != ''){
//             $(this).css('color', color_arr[0]);
//         }
//     });
// });

function getRegisterLimit() {
  $.getJSON("/data/json/limit/registerLimit.json", {cache: false},
      function (data) {
        if (data.register == 0) {
          $("#register_moudle").hide();
          $("#register_a").html("未开放注册");
        } else {
          $("#register_a").attr("href", "/user_register.html");

        }
      }).error(function (XMLHttpRequest) {
  })
}

function getLoginLimit() {
  $.getJSON("/data/json/limit/userLoginLimit.json", {_t: new Date().getTime()},
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

//是否已登陆
function isLogin() {
  var token = $.cookie("token", {path: "/"});
  if (token != null && token != "") {
    $.ajax({
      type: "POST",
      url: "/views/html/top_user_info.html",
      success: function (msg) {

        $("#logined").html(msg).show();
        $("#headTop_right .hide").hide();
        $("#headTop_left").hide();
      }
    });
  } else {
    $("#loginBefore").show();
    $("#logined").hide();

  }
}
//输入框验证
$(document).ready(function () {

  getLoginLimit();
  isLogin();
  setInterval(function () {
    isLogin();
  }, 5 * 60 * 1000);

});