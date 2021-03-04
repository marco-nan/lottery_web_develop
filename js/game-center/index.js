/**
 * Created by Zelei on 2017/5/5.
 */
var _Rnum = '';
var goAims = 0;
(function ($) {
  var md5Password = true;
  if (system_config && system_config.user_password_type) {
      md5Password = system_config.user_password_type === '0'
  } else {
      md5Password = false
  }
  var defaultPlayType = '0';
  if (system_config && system_config.play_type_config) {
      defaultPlayType = system_config.play_type_config
  }
  var gameList = []
  $.extend({
    getQueryParameter: function (parameterName) {
      if (!parameterName) {
        return null;
      }
      var reg = new RegExp('(^|&)' + parameterName + '=([^&]*)(&|$)');
      var r = decodeURI(window.location.search.substr(1)).match(reg);
      return r != null ? r[2] : null;
    },
    alert: function (context, title, message, callback, afterDispear, timeout) {
      var content = '';
      if (!title === false && !message === false) {
        content += '<strong>' + title + '</strong>' + message;
      } else if (!title === false) {
        content += '<strong>' + title + '</strong>';
      } else if (!message === false) {
        content += message;
      }

      var top = 90;
      var margin = 5;
      $('[data-alert]').each(function (i, e) {
        top += margin + $(e).outerHeight();
      });

      var alert = $("<div data-alert class='alert alert-" + context +
          " hidden' role='alert'><button type='button' class='close'>&times;</button>"
          +
          "<span class='alert-content'>" + content + "</span></div>").appendTo(
          $(document.body));
      var left = ( $(document.body).width() - alert.width()) / 2;
      if (window.parent !== window) {
        left -= ($(window.parent.document.body).width() - $(
                document.body).width()) / 2;
      }

      $('.alert>button').on('click', function () {
        $(this).parent().remove();
      });

      alert.css({
        position: 'fixed',
        top: top + 'px',
        left: left
      }).removeClass('hidden');

      if (afterDispear === true) {
        setTimeout(function () {
          alert.remove();
          if ($.isFunction(callback)) {
            callback();
          }
        }, !timeout === false ? timeout : 1000);
      } else {
        if ($.isFunction(callback)) {
          callback();
        }
        setTimeout(function () {
          alert.remove();
        }, !timeout === false ? timeout : 1000);
      }
      return alert;
    },
    warn: function (title, message, callback, afterDispear, timeout) {
      return $.alert("warn", title, message, callback, afterDispear, timeout);
    },
    info: function (title, message, callback, afterDispear, timeout) {
      return $.alert("info", title, message, callback, afterDispear, timeout);
    },
    success: function (title, message, callback, afterDispear, timeout) {
      return $.alert("success", title, message, callback, afterDispear,
          timeout);
    },
    danger: function (title, message, callback, afterDispear, timeout) {
      return $.alert("danger", title, message, callback, afterDispear, timeout);
    },
    dangerTip: function (title, timeout) {
      return $.alert("danger", title, null, null, null, timeout);
    },
    respTip: function (xhr, context, timeout) {
      var responseText = xhr.responseText;
      try {
        responseText = JSON.parse(responseText);
      } catch (e) {

      }
      responseText = $.isString(responseText) ? responseText : responseText.msg;
      return $.alert(context, responseText, null, null, null, timeout);
    },
    getPrototype: function (object) {
      var prototype = Object.prototype.toString.call(object);
      return prototype.substring(8, prototype.length - 1);
    },
    isString: function (str) {
      return $.getPrototype(str) === 'String';
    }
  });

  $.fn.extend({
    onEnter: function (handler) {
      this.on('keydown', function (e) {
        if (e.which === 13) {
          handler(e);
        }
      })
    }
  });

  var blockInitialized = false, gameCates, counterTimeoutId,
      loadOpenInfoTimeoutId, showIframeDefault;

  function paddingTime(t) {
    return (t < 10 ? '0' : '') + t;
  }

  function clearLoginForm() {
    $("#username").val(null);
    $("#password").val(null);
    $("#rmNum").val(null);
  }

  function setLoginFalse() {
    $('#header_user').hide();
    $('#header_user_login').show();
  }

  function setLoginTrue(account) {
      autoLoadUserInfo(function (response) {
          $('#account').text(response.userInfo.account);
          $('#balance').text(response.extInfo.money);
          if (!response.userInfo.isDl) {
              $('#agent-center').remove();
          }
          $('#header_user').show();
          $('#header_user_login').hide();
      });
  }

  var userInfo = null;
  function autoLoadUserInfo(callback) {
      if (userInfo) {
          $.ajax({
              url: '/api/user/status',
              type: 'GET',
              dataType: 'json',
              cache: false,
              success: function (response) {
                  userInfo.extInfo.money = response.money;
                  callback(userInfo);
              }
          });
      } else {
          $.ajax({
              url: '/api/user/info',
              type: 'GET',
              dataType: 'json',
              cache: false,
              success: function (response) {
                  userInfo = response;
                  callback(response)
              }
          });
      }
  }

  function toRemainTimeHtml(remainMillis) {
    var hours = 0, minutes = 0, seconds = 0;
    if (!remainMillis === false && remainMillis > 0) {
      hours = Math.floor(remainMillis / (1000 * 60 * 60));
      remainMillis = remainMillis % (1000 * 60 * 60);
      minutes = Math.floor(remainMillis / (1000 * 60));
      remainMillis = remainMillis % (1000 * 60);
      seconds = Math.floor(remainMillis / (1000));
    }
    return '<span>' + paddingTime(hours)
        + '</span><span>&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>'
        + paddingTime(minutes)
        + '</span><span>&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>'
        + paddingTime(seconds)
        + '</span>';

  }

  function getProtocolPrefix() {
    return (window.location.protocol || document.location.protocol) + '//';
  }

  function toFullPath(url) {
    var protocol = getProtocolPrefix();
    if (url.indexOf(protocol) === -1) {
      return protocol + window.location.host + url;
    }
    return url;
  }

  function toOpenInfoList(allOpenInfoResponse) {
      var newResult = []
      for (var i = 0; i < gameList.length; i++) {
          var game = gameList[i]

          var openInfo = $.extend({
              game: game
          }, allOpenInfoResponse[game.id])

          //openInfo.cur.serverTime = allOpenInfoResponse.serverTime
          newResult.push(openInfo)
      }

      return newResult
  }

  function loadOpenInfo() {
      $.ajax({
          url: '/v/lottery/allOpenInfo',
          type: 'get',
          dataType: 'json',
          cache: false,
          success: function (response) {
              var openInfo = toOpenInfoList(response);
              if (!blockInitialized) {
                  initiallizeGameBlocks(openInfo);
                  blockInitialized = true;
              }
              else {
                  updateOpenInfo(openInfo);
              }
          }
      })
  }

  function formatOpenNum(openNum) {
    var openNumArray = openNum.split(',');
    var ballSm = openNumArray.length > 8;
    var result = '';
    $.each(openNumArray, function (i, e) {
      result += '<span class="num' + (ballSm ? ' sm' : '') + '">' + e
          + '</span>';
    });
    return result;
  }

  function toOpenInfoArray(openInfo) {
    var remainMillis = openInfo.cur.closeTime - openInfo.cur.serverTime;
    if (remainMillis < 0) {
      remainMillis = 0;
    }
    var curTurnNumb = '', remainTimeHtml = toRemainTimeHtml(remainMillis),
        preOpenNums = '';
    if (!openInfo.cur) {
      curTurnNumb += '封盘中';
    } else {
      if (!openInfo.cur.turnNum === false) {
        curTurnNumb += '第' + '<span>' + openInfo.cur.turnNum + '</span>' + '期 ';
      }
      switch (openInfo.cur.status) {
        case 1:
          curTurnNumb += '封盘中';
          break;
        case 2:
          curTurnNumb += '已停用';
          break;
        default:
          break;
      }
    }
    if (!openInfo.pre) {
      preOpenNums += '<span class="no-num">暂无数据</span>';
    } else {
      var isOpening = false;
      if (openInfo.pre.turn && openInfo.cur.turn && parseInt(openInfo.cur.turn) - parseInt(openInfo.pre.turn) > 1) {
          isOpening = true;
      }
      if (isOpening) {
          preOpenNums += '<span class="no-num">正在开奖</span>';
      } else if (openInfo.pre.openNum) {
          preOpenNums += formatOpenNum(openInfo.pre.openNum);
      } else {
          preOpenNums += '<span class="no-num">暂无数据</span>';
      }
    }
    return [curTurnNumb, remainMillis, remainTimeHtml, preOpenNums];
  }

  function updateGameBlock(block, openInfo) {
    var openInfoArray = toOpenInfoArray(openInfo);
    block.find('.cur-info>div>p').html(openInfoArray[0]).siblings('div').attr(
        'data-remain-millis', openInfoArray[1]).html(
        openInfoArray[2]);
    block.find('.pre-info>div').html(openInfoArray[3]);
  }

  function generateGameBlock(openInfo) {
    var openInfoArray = toOpenInfoArray(openInfo);

    goAims = openInfo.game.isOffcial;
    if (goAims === 1) {
      goAims = defaultPlayType;
    } else {
      goAims = "1";
    }

    var html = '<div class="open-info" data-game-code="' + openInfo.game.code
        + '">'
        + '<div class="wrapper">'
        + '<div class="top-wrapper">'
        + '<div class="cur-info">'
        + '<a><img src="/page/game/img/' + openInfo.game.code + '.png"></a>'
        + '<div>'
        + '<h3>' + openInfo.game.name + '</h3>'
        + '<p>' + openInfoArray[0] + '</p>'
        + '<div data-remain-millis="' + openInfoArray[1] + '">'
        + openInfoArray[2] + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="pre-info align-items-center">'
        + '<span>上期开奖</span>'
        + '<div>'
        + openInfoArray[3] + '</div>'
        + '</div>'
        + '</div>'
        + '<ul class="actions">'
        + '<li><a class="show-iframe" href="/page/game-center/open-infos.html?gameCode='
        + openInfo.game.code + '" target="_blank">开奖结果</a></li>'//北京快乐8 特殊处理
        + '<li><a class="show-iframe" href="/page/game-center/'
        + (openInfo.game.isOffcial === 1 && openInfo.game.code !== 'bjkl8'
            ? 'open-trend.html?' : 'open-infos.html?officialMode=true&')
        + 'gameCode=' + openInfo.game.code + '" target="_blank">开奖走势</a></li>'
        + '<li><a href="/data/game/' + openInfo.game.code
        + '/index' + (goAims === '0' ? '_official' : '')
        + '.html" class="active">立即投注</a></li>'
        + '</ul>'
        + '</div>'
        + '</div>';
    return html;
  }

  function initiallizeGameBlocks(openInfos) {
    if (!counterTimeoutId === false) {
      clearTimeout(counterTimeoutId);
    }
    var gameBlocks = $('#game-blocks').empty();
    if (showIframeDefault !== true) {
      gameBlocks.show();
      $('#frame').hide();
    } else {
      showIframeDefault = false;
    }

    $.each(openInfos, function (i, openInfo) {
      if (openInfo.game.open === 0
          && (!gameCates
          || gameCates.indexOf('|' + openInfo.game.cate + '|') !== -1)) {
        gameBlocks.append(generateGameBlock(openInfo));

        //设置侧边栏跳转链接一致
        $("i[data-game-code=" + openInfo.game.code + "]").parents('a').attr(
            'href', $("div[data-game-code=" + openInfo.game.code + "]").find(
                'li:eq(2)').find('a').attr('href'));

      }
    });
    gameBlocks.find('a.show-iframe').on('click', function (e) {
      e.preventDefault();
      showIframe($(this).attr('href'));
    });
    counterTimeoutId = setTimeout(flushCounter, 1000);
  }

  function showIframe(url) {
    $('#game-blocks').hide();
    if (!loadOpenInfoTimeoutId === false) {
      clearInterval(loadOpenInfoTimeoutId);
    }
    $('#frame').show().children('iframe').attr('src', toFullPath(url));
  }

  function updateOpenInfo(openInfos) {
    var gameBlocks = $('#game-blocks'), block;
    $.each(openInfos, function (i, openInfo) {
      block = gameBlocks.children(
          '[data-game-code="' + openInfo.game.code + '"]');
      if (openInfo.game.open === 0) {
        updateGameBlock(block, openInfo);
      } else {
        block.remove();
      }
    });
  }

  function flushCounter() {
    $('#game-blocks .cur-info>div>div').each(function (i, e) {
      var counter = $(e);
      var remainMillis = parseInt(counter.attr('data-remain-millis'));
      if (remainMillis === 0) {
        return;
      }
      remainMillis -= 1000;
      counter.attr('data-remain-millis', remainMillis).html(
          toRemainTimeHtml(remainMillis));
      if (remainMillis <= 0) {
        counter.prev('p').html('封盘中');
      }
    });
    counterTimeoutId = setTimeout(flushCounter, 1000);
  }

    function playNotice() {
        var noticeContent = $('#notice-content').empty();
        $.getJSON(toFullPath('/data/json/notice_list.json'), null,
            function (response) {
                if (!response) {
                    return;
                }
                var notice = '';
                if (response.lottery_notice ){
                  for (var i = 0; i < response.lottery_notice.length; i++) {
                      notice +=  (response.lottery_notice[i].noticeContent + "<span style='width: 50px;height: 12px;display: inline-block'></span>")
                    }
                }
                if (!notice && response.roll_notice) {
                    notice = response.roll_notice[0].noticeContent;
                    if (!notice) {
                        return;
                    }
                }
                noticeContent.append(
                    $('<marquee onmouseover= this.stop() onmouseout= this.start()  onfinish= playNotice()>'
                        + notice + '</marquee>'));
            });
        //setTimeout(playNotice, 1000 * 60);
    }

  function doLayout() {
    $('#layout-center').width(
        $(document.body).width() - $('#layout-west').outerWidth() - 3);
    $('#game-list').height(
        $('#layout-west').height() - $('#logo').outerHeight() - $(
            '#refresh-game-list').outerHeight() - 1);
    $('#game-blocks-wrapper').height(
        $('#layout-center').height() - $('#notice-carousel').outerHeight() - 54
        - 1);
  }

  function signOut() {
    $.get(toFullPath('/v/user/logout'), {}, function (data) {
      $.cookie("token", null, {path: '/'});
      $.cookie("userType",null, {path: "/"});
      top.document.location.href = '/';
    }).error(function (XMLHttpRequest) {
      //$.removeCookie('token', { path: '/' });
      $.cookie("token", null, {path: '/'});
      $.cookie("userType",null, {path: "/"});
    });
    setLoginFalse();
  }

  function registerTest() {
    userInfo = null;
    $.getJSON(toFullPath('/v/user/regTest'), function (response) {
      if (!response === false) {
        setLoginTrue(response.account);
        clearLoginForm();
        //获取公告的JSON数据
        var noticeJson = HttpUtil.ajaxAsync(
            HttpUtil.baseUrl + "/data/json/notice.json");
        if (noticeJson != null && noticeJson != "") {
          if (noticeJson.login_notice != null && noticeJson.login_notice != "") {
            var option = {
              title: noticeJson.login_notice.noticeTitle
            }
            layer.open({
              type: 1,
              area: ['500px', 'auto'],
              btn: ['确认'],
              content: '<div style="padding: 20px;font-size:16px;">'
              + noticeJson.login_notice.noticeContent + '</div>',
              yes: function (index, layero) {
                layer.closeAll();
              },
              cancel: function (index) {
                layer.closeAll();
              }
            });
          } else {
            layer.msg('试玩会员注册成功', {icon: 6});
          }
        }

      } else {
        layer.msg('试玩会员注册失败', {icon: 5});
      }
    }).error(function (xhr, errorText, errorType) {
      layer.msg("试玩会员注册失败", {icon: 5});
    });
  }

  /***********************************验证码******************************/
  //验证码
  function getKey(url) {
    $("#vPic").attr("src",
        "/v/vCode?t=" + Math.random() + (new Date).getTime());
    $("#vPic").show();
  }

  function getYzm(url) {
    $("#vImg").attr("src",
        "/v/vCode?t=" + Math.random() + (new Date).getTime());
    $("#vImg").show();
  }

  //登陆验证
  function login() {
    var uname = $("#username").val();
    if (uname == "") {
      layer.msg("用户名不能为空！", {icon: 5}, 1200);
      $("#username").focus();
      return false;
    }
    var pwd = $("#password").val();
    if (pwd == "") {
      layer.msg("密码不能为空！", {icon: 5}, 1200);
      $("#password").focus();
      return false;
    }
    var needVocde = $("#needVocde").val();
    var rmNum = $("#rmNum").val();
    if ((rmNum == "") && needVocde > 0) {
      layer.msg("验证码不能为空！", {icon: 5}, 1200);
      $("#rmNum").focus();
      return false;
    }

    $("#loginBtn").attr("disabled", true); //按钮失效
    userInfo = null;
    $.post("/v/user/login", {
      r: Math.random(),
      account: uname,
      password: md5Password ? hex_md5(pwd) : pwd,
      password:   pwd,
      valiCode: rmNum
    }, function (data) {
      //  公告  弹窗
      //获取公告的JSON数据
      clearLoginForm();
      var noticeJson = HttpUtil.ajaxAsync(
          HttpUtil.baseUrl + "/data/json/notice.json");
      if (noticeJson != null && noticeJson != "") {
        if (noticeJson.login_notice != null && noticeJson.login_notice != "") {
          var option = {
            title: noticeJson.login_notice.noticeTitle
          }
          layer.open({
            type: 1,
            area: ['500px', 'auto'],
            btn: ['确认'],
            content: '<div style="padding: 20px;font-size:16px;">'
            + noticeJson.login_notice.noticeContent + '</div>',
            yes: function () {
              layer.closeAll()
              setLoginTrue(data.account);
            },
            cancel: function (index) {
              layer.closeAll()
              setLoginTrue(data.account);
            }
          });
        }
      }
      $("#loginBtn").attr("disabled", false); //按钮有效
    }).error(function (XMLHttpRequest) {
      $("#loginBtn").attr("disabled", false); //按钮有效
      // $.respTip(XMLHttpRequest, "danger", 2000);
      var responseText = XMLHttpRequest.responseText;
      try {
        responseText = JSON.parse(responseText);
      } catch (e) {
      }
      responseText = $.isString(responseText) ? responseText : responseText.msg;
      layer.msg(responseText, {icon: 5}, 2000)
    });
  }

  function getRegisterLimit() {
    $.get("/v/user/getRegLimit", {}, function (data) {
      if (data.register == 0) {
        $("#register_moudle").hide();
        $("#register_a").html("未开放注册");
      } else {
        $("#register_a").attr("href", "/user_register.html");
      }
    }).error(function (XMLHttpRequest) {
    })
  }

  function getLoginLimit() {//async修改为同步,以防验证码栏后加载，出现闪动
    $.ajax({
      url: "/data/json/limit/userLoginLimit.json",
      dataType: 'json',
      async: false,
      cache: false,
      success: function (data) {
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
          $("#needVocde").attr("value", 1);
        } else {
          $("#needVocde").attr("value", 0);
          $("#vcode_moudle").hide();
        }
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

  function loadJob() {
    if (!$.cookie('token') === false) {
      setLoginTrue();
    } else {
      setLoginFalse();
    }
  }

  $(function () {
    var gameCode = $.getQueryParameter('gameCode');
    var type = $.getQueryParameter('type') || 'trend';
    if (!gameCode === false) {
      var href = '/page/game-center/open-' + type + '.html?gameCode='
          + gameCode;
      showIframe(href);
      showIframeDefault = true;
    }

    $('#username').onEnter(login);
    $('#password').onEnter(login);
    $('#rmNum').on('focus', function () {
      getYzm();
    });
    $('#vImg').on('click', function () {
      getYzm();
    });
    $('#loginBtn').on('click', function () {
      login();
    });

    doLayout();
    window.onresize = doLayout;
    playNotice();

    $('#refresh-game-list').on('click', function (e) {
      $('#game-list>.accordion>.accordion-content').slideUp(100, function (e) {
        gameCates = '';
        blockInitialized = false;
        loadOpenInfo();
      });
    });
    //退出
    $('#signOut').on('click', signOut);
    // 注册试用账号
    $('#registerTest').on('click', registerTest);
    //
    $('#game-list>.accordion>.accordion-head').on('click', function (e) {
      var $this = $(this);
      $this.next('.accordion-content').slideToggle(100, function () {
        gameCates = '|';
        $('#game-list>.accordion>.accordion-content[data-game-cate]:visible').each(
            function (i, e) {
              gameCates += $(e).attr('data-game-cate') + '|';
            });
        if (gameCates === '|') {
          gameCates = '';
        }
        blockInitialized = false;
        startLoadOpenInfo()
      });
    });

    var startLoadOpenInfo = function() {
        loadOpenInfo();
        loadOpenInfoTimeoutId = setInterval(loadOpenInfo, 1000 * 10);
    };

    $.ajax({
        url: '/data/json/games.json',
        type: 'GET',
        dataType: 'json',
        cache: false,
        success: function (response) {
            gameList = response;
            $.each(response, function (i, game) {
                //官方玩法优先
                $('#game-list>.accordion>.accordion-content[data-game-cate="'
                    + game.cate + '"]').append(
                    '<li><a href="/data/game/' + game.code
                    + '/index' + (goAims === '0' ? "_official" : "")
                    + '.html"><i style="background-image: url(/page/game/img/'
                    + game.code + '.png)" data-game-code="' + game.code
                    + '"></i><span>' + game.name
                    + '</span></a></li>');
            });
            startLoadOpenInfo();
        }
    })
    loadJob();
    setInterval(loadJob, 1000 * 10);//定时刷新余额
    getLoginLimit();
  });
})(jQuery);