/***
 **  进入真人游戏 （真人视讯）
 */
function EnterLiveGame(liveCode) {
    if (liveCode === null) {
        layer.alert("敬请期待,更多游戏!")
    }
    var token = $.cookie("token", {path: "/"}),
        userType = $.cookie("userType", {path: "/"});
		accountType = $.cookie("accountType", {path: "/"});
    if (token == null || token == "") {
        layer.alert('请登入后再进入游戏哦!', {
            skin: 'layui-layer-molv'
            , closeBtn: 1
            , anim: 1
            , shadeClose: true
            , btn: ['确定']
            , icon: 6
        });
        return false;
    }
    if (userType != null) {
        if (userType.toLowerCase() === "test") {
            layer.open({
                skin: 'layui-layer-molved',
                closeBtn: 1,
                shadeClose: false,
                anim: 3,
                btn: ['确定'],
                icon: 6,
                content: '试玩账号不能进入,请注册成正式会员!'
            });
            return false;
        }
    }
	if (accountType) {
        if (accountType.toLowerCase() === "vhy") {
            layer.open({
                skin: 'layui-layer-molved',
                closeBtn: 1,
                shadeClose: false,
                anim: 3,
                btn: ['确定'],
                icon: 6,
                content: '您的账号没有权限，请联系您的上级开通!'
            });
            return false;
        }
	}
    var data = {
        liveCode: liveCode,
        gameType: '',
        isMobile: false
    };
    var gameApi = "/api/live/play";

    if (liveCode === 'ag') {
        data.gameType = 1;
    } else if (liveCode === 'agty') {
        data.liveCode = 'ag';
        data.gameType = 'TASSPTA';
    }else if (liveCode === 'bb') {
        data.liveCode = 'bbin';
        data.gameType = 'ball';
    }else if (liveCode === 'bbe') {
        data.liveCode = 'bbin';
        data.gameType = 'game';
    }else if (liveCode === 'bbin') {
        data.gameType = 'live';
    } else if (liveCode === 'jb') {
        data.gameType = 'jb';
    } else if (liveCode === 'mg') {
        data.gameType = 6883;
    }else if(liveCode == 'bl'){
    	data.gameType = "4";
    }  else {
        data.gameType = null;
    }

    var _win = window.open('/views/html/loading.html', 'newwindow', 'height=600, width=1000, top=20, left=20, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');

    $.ajax({
        type: 'get',
        url: gameApi,
        data: data,
        dataType: "text",
        success: function (response) {
            $(".loadingWrap").hide();     // 跳转成功
            if (liveCode === 'pt') {
                _win.close();
                post(response);
            } else {
                _win.location = response;
            }
        },
        error: function (response) {
            _win.close();
            var msg = '暂未上线，敬请期待';
            if(null != response && null != response.responseText) {
                if(JSON.parse(response.responseText).code == 'LIVE/maintenance' || JSON.parse(response.responseText).code.indexOf("NOT-SUPPORT") != -1) {
                    layer.alert(JSON.parse(response.responseText).msg);
                }else if(null != JSON.parse(response.responseText).msg) {
                    layer.alert(JSON.parse(response.responseText).msg);
                }else {
                    layer.alert(msg);
                }
            } else {
                layer.alert(msg);
            }
        }
    });
}

/***
 **   pt 视讯  form 提交
 */
function post(URL) {
    var temp_form = document.createElement("form");
    temp_form.action = URL;
    temp_form.target = "_blank";
    temp_form.method = "post";
    temp_form.style.display = "none";
    document.body.appendChild(temp_form);
    temp_form.submit();
}

/***
 **  ag 捕鱼 (ag捕鱼王)
 */

function bywEnterGame() {
    var token = $.cookie("token", {path: "/"}),
        userType = $.cookie("userType", {path: "/"});
		accountType = $.cookie("accountType", {path: "/"});
    if (token == null || token == "") {
        layer.alert('请登入后再进入游戏哦!', {
            skin: 'layui-layer-molv'
            , closeBtn: 1
            , anim: 1
            , shadeClose: true
            , btn: ['确定']
            , icon: 6
        });
        return false;
    }
    if (userType != null) {
        if (userType.toLowerCase() === "test") {
            layer.open({
                skin: 'layui-layer-molved',
                closeBtn: 1,
                shadeClose: false,
                anim: 3,
                btn: ['确定'],
                icon: 6,
                content: '试玩账号不能进入,请注册成正式会员!'
            });
            return false;
        }
    }
	if (accountType) {
        if (accountType.toLowerCase() === "vhy") {
            layer.open({
                skin: 'layui-layer-molved',
                closeBtn: 1,
                shadeClose: false,
                anim: 3,
                btn: ['确定'],
                icon: 6,
                content: '您的账号没有权限，请联系您的上级开通!'
            });
            return false;
        }
	}
    var data = {
        liveCode: 'ag',
        gameType: 6,
        isMobile: false
    };

    var _win = window.open('/views/html/loading.html', 'newwindow', 'height=600, width=1000, top=20, left=20, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');

    $.ajax({
        type: 'get',
        url: '/api/live/play',
        data: data,
        dataType: 'text',
        success: function (response) {
            _win.location = response;
        },
        error: function () {
            _win.close();
            layer.alert("暂未上线，敬请期待");
        }
    });
}

/***
 *   进入游戏 (电子游艺)
 */
function entereleGame(_this) {

    var token = $.cookie("token", {path: "/"}),
        userType = $.cookie("userType", {path: "/"});
		accountType = $.cookie("accountType", {path: "/"});
    if (token == null || token == "") {
        layer.open({
            skin: 'layui-layer-molved',
            closeBtn: 1,
            shadeClose: false,
            anim: 3,
            btn: ['确定'],
            icon: 6,
            content: '请登入后再进入游戏!'
        });
        return false;
    }
    if (userType != null) {
        if (userType.toLowerCase() === "test") {
            layer.open({
                skin: 'layui-layer-molved',
                closeBtn: 1,
                shadeClose: false,
                anim: 3,
                btn: ['确定'],
                icon: 6,
                content: '试玩账号不能进入,请注册成正式会员!'
            });
            return false;
        }
    }
	if (accountType != null) {
        if (accountType.toLowerCase() === "vhy") {
            layer.open({
                skin: 'layui-layer-molved',
                closeBtn: 1,
                shadeClose: false,
                anim: 3,
                btn: ['确定'],
                icon: 6,
                content: '您的账号没有权限，请联系您的上级开通!'
            });
            return false;
        }
	}
    var liveCode = _this.getAttribute("livecode"),
        gameType = _this.getAttribute("gametype"),
        gameCode = _this.getAttribute("gameCode");
    	

  var _data = {
      liveCode: liveCode,
      gameType: gameType,
      gameCode: gameCode,
      isMobile :false
  };
  //如果是聚合接口，这里不要设置
//  if ( liveCode === "pt"){
//      $("#eleload").hide();      //  加载完成
//      formsSubmit('/api/live/play',gameType,"get");
//      return false;
//  } else if (liveCode === "bbin") {
//      _data.gameType = 'game';
//  } else if (liveCode === "ltlottery") {
//	  _data.liveCode = "bbin",
//	  _data.gameType = "ltlottery";
//  }


    var _win = window.open('/views/html/loading.html', 'newwindow', 'height=600, width=1000, top=20, left=20, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');

    $.ajax({
        type: "get",
        url: "/api/live/play",
        data: _data,
        dataType: "text",
        success: function (response) {
            if(liveCode==="pg"){
                try {
                    PGSDK.launchGame(response);
                    _win.close();
                    return false;
                } catch (e) {
                }
            }
            _win.location = response;
        },
        error: function () {
            _win.close();
            layer.alert("暂未上线，敬请期待");
        }
    })
}

/***
 **   PT 进入游戏 from 提交 数据
 */
function formsSubmit(URL, gameType, type) {

    layer.closeAll();                // 加载完成
    var temp_form = document.createElement("form");
    temp_form.action = URL;
    temp_form.target = "_blank";
    temp_form.method = type;
    temp_form.style.display = "none";

    document.body.appendChild(temp_form);

    // 创建一个输入
    var input = document.createElement("input");
    // 设置相应参数
    input.type = "text";
    input.name = "liveCode";
    input.value = "pt";

    // 将该输入框插入到 form 中
    temp_form.appendChild(input);

    // 创建一个输入
    var input1 = document.createElement("input");
    // 设置相应参数
    input1.type = "text";
    input1.name = "gameType";
    input1.value = gameType;

    // 将该输入框插入到 form 中
    temp_form.appendChild(input1);

    // 创建一个输入
    var input2 = document.createElement("input");
    // 设置相应参数
    input2.type = "text";
    input2.name = "isMobile";
    input2.value = false;

    // 将该输入框插入到 form 中
    temp_form.appendChild(input2);

    temp_form.submit();
    // 删除该 form
    document.body.removeChild(temp_form);
}
