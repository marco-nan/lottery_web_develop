var userName = '';
var userPas = '';
var userCode = '';
var nickName;
var userType;  // -1  未注册  0  未完善资料   1  已注册

var userAgentInfo = navigator.userAgent;
var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
var isMobileClient = false;
for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
        isMobileClient = true;
        break;
    }
}

$(function () {

    "use static";
    getVcode();

});

function getVcode () {
    $("#Vcode").attr("src", "/v/vCode?t=" + (new Date).getTime());
}

function checkAccount () {
    var un = $("#account").val();
    if (un ==='' || un == userName) {
        layer.msg('用户名不能为空');
        $("#account").focus();
    } else {
        $.ajax({
            url: '/v/h-user/verify',
            async: false,
            data: {account: un},
            type: 'get',
            success: function (res) {
                userType = res;
                if (res === -1) {
                    $("#confirmPasswordWrap").css("display", "flex");
                } else {
                    $("#confirmPasswordWrap").css("display", "none");
                }
            }
        })
    }
}

function alertLogin () {
    checkAccount ();
    var un = $("#account").val(),
        pas = $("#password").val(),
        code = $("#vCodeReg").val(),
        confPas = $("#confirmPassword").val();

    if (un ==='' || un == userName) {
        $("#account").focus();
    } else if (pas ==='' || pas == userPas) {
        $("#password").focus();
        layer.msg('密码不能为空');
    } else if (userType === -1 && pas !== confPas) {
        layer.msg('密码不一致');
    } else if (code ==='' || code === userCode) {
        layer.msg('验证码不能为空');
        getVcode();
        $("#vCodeReg").focus();
    } else {
        var data = {
            account: un,
            loginPassword: pas,
            srcDomain: getQueryString("srcDomain"),
            srcCode: getQueryString('srcCode') ? getQueryString('srcCode') : findSpreadDomainInfo(),
            verifyCode: code
        };
        $.ajax({
            url: '/v/h-user/authenticate',
            type: 'post',
            data: data,
            success: function (response) {
                if (response.status === 1) {
                    $.cookie("account", response.tokenInfo.account, {path: "/"});
                    $.cookie("token", response.tokenInfo.token, {path: "/"});
                    $.cookie("accountType", response.tokenInfo.type, {path: "/"});
                    webSkip();
                    //layer.open({
                    //    type: 1,
                    //    title: false,
                    //    shadeClose: false,
                    //    content:"<ul class='alert-style'><li>聪明的你用五秒钟记住下次登入域名</li><li>9912789.com</li></ul>"
                    //});

                    //setTimeout(function () {
                    //    webSkip()
                    //},5 * 1000)

                } else if (response.status === 0){
                    window.location.href = '/page/newVersion/completeUser.html?userName= ' + $("#account").val() + '&srcCode=' +  data.srcCode + '&srcDomain=' +  data.srcDomain
                    //layer.open({
                    //    type: 1,
                    //    title: false,
                    //    shadeClose: false,
                    //    content:"<ul class='alert-style'><li>聪明的你用五秒钟记住下次登入域名</li><li>9912789.com</li></ul>"
                    //});

                    //setTimeout(function () {
                     //   window.location.href = '/page/newVersion/completeUser.html?userName=' + $("#account").val()
                    //},5 * 1000);

                }
            },
            error: function (error) {
                layer.msg(JSON.parse(error.responseText).msg);
                getVcode();
            }
        });
    }
}

function findSpreadDomainInfo() {
  var domainConfig = $.cookie("spreadCode", {path: "/"});
  return domainConfig;
}

function Material() {

    var data = {
        withdrawPassword: $("#withdrawPassword").val(),
        nickName: getQueryString('userName'),
        fullName: $("#fullName").val(),
        phone: $("#phone").val(),
        wechat: $("#wechat").val(),
        qq: $("#qq").val(),
        email: $("#email").val(),
        srcCode: getQueryString('srcCode') ? getQueryString('srcCode') : findSpreadDomainInfo(),
        srcDomain: getQueryString("srcDomain")
    };

    if (data.withdrawPassword === '') {
        layer.msg('提现密码不能为空');
        $("#withdrawPassword").focus();
        return
    }
    if (data.phone === '' && data.wechat === '' && data.qq === '') {
        layer.msg('请填写联系方式，手机号, qq 或 微信 ');
        return
    } else if (data.phone !== '' && !(/^1\d{10}$/).test(data.phone)) {
        layer.msg('请输入中国境内手机号');
        $("#phone").focus();
        return
    } else if (data.wechat !== '' && !(/[a-z_\d]+$/).test(data.wechat)) {
        layer.msg('请输入正确格式的微信号');
        $("#wechat").focus();
        return
    } else  if (data.qq !== ''&& !(/^[1-9]\d{4,9}$/).test(data.qq)) {
        layer.msg('请输入正确格式的qq');
        $("#qq").focus();
        return
    }
    if (data.email != '' && !(/([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})/).test(data.email)) {
        layer.msg('请输入正确格式的邮箱');
        $("#email").focus();
        return
    }

    $.ajax({
        url: '/v/h-user/register',
        data: data,
        type: 'post',
        success: function (res) {
            $.cookie("account", res.account, {path: "/"});
            $.cookie("token", res.token, {path: "/"});
            $.cookie("accountType", res.type, {path: "/"});
            webSkip()
        },
        error: function (error) {
            if (JSON.parse(error.responseText).code === 'SESSION_EXPIRED') {
                layer.msg(JSON.parse(error.responseText).msg)
                setTimeout(function () {
                    window.location.href = '/page/newVersion/loginUser.html'
                },1000)
            }
        }
    })
}

function alertReg () {
    if (isMobileClient) {
        window.location.href = '/wap/index.html#/register'
    } else {
        window.location.href = '/views/html/register.html'
    }
}

function webSkip() {
    if (isMobileClient) {
        window.location.href = '/wap/index.html'
    } else {
        window.location.href = '/views/main.html'
    }
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return '';
}