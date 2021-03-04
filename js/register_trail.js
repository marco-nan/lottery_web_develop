var md5Password = true;   //是否前端密码加密

$(function () {
    getUserPasswordType();
});

//获取判断是否前端密码加密
function getUserPasswordType() {
    $.ajax({
      url: '/data/json/config.json',
      dataType: 'json',
      async: false,
      cache: false,
      success: function (response) {
        var systemConfig = response['system_config'];
        for (var i = 0; i < systemConfig.length; i++) {
          var config = systemConfig[i];
          if (config.configKey === 'user_password_type') {
            md5Password = config.configValue === '0';
          }
        }
        $.cookie("md5Password", md5Password, {path: '/'});
      }
    });
 }

//弹出层获取验证码
function getValiCode() {
    $("#trailvImg").attr("src",
        "/v/vCode?t=" + Math.random() + (new Date).getTime());
    $("#trailvImg").show();
 }

//注册试玩账号
function openRegisterTrailUser(){
    $.getJSON("/data/json/limit/registerLimit.json?_t="+ new Date().getTime(), function (response) {
        if (response.trailUserValidCode === undefined) {
            registerTest();
        } else if ( response.trailUserValidCode === 1) {
            openRegister();
        } else {
            registerTest();
        }
    }).fail(function(){
        registerTest();
    });
}

function openRegister() {
    layer.open({
        type:1,    //页面层
        title:"注册试玩账号",
        skin: 'layui-layer-rim', //加上边框
        area: ['420px', '300px'], //宽高
        content: "<div class=\"register_trail\">"+
        "<form id=\"registerForm\"  onsubmit=\"return registerTrailUser()\" >" +
        "<div class=\"trail_password\">"+
        "<label for=\"trailPassword\" >" +
        "<span ></span>用户密码：" +
        "</label>"+
        "<div>" +
        "<input id=\"trailPassword\" name=\"trailPassword\" type=\"password\" minlength=\"6\" maxlength=\"16\"  placeholder=\"请输入用户密码\" required>"+
        "</div>" +
        "<div class='info_text'>"+
        "<p>*6-16位字母或数字</p>" +
        "</div>" +
        "</div>" +
        "<div class=\"trail_valida\">"+
        "<label for=\"trailVlidaCode\">" +
        "<span></span>验证码&emsp;：" +
        "</label>"+
        "<div>"+
        "<input id=\"trailVlidaCode\" name=\"trailVlidaCode\" type=\"text\" maxlength=\"4\" placeholder=\"请输入验证码\" required/>"+
        "<img id=\"trailvImg\" onclick=\"getValiCode()\" title=\"刷新验证码\"  />"+
        "</div>"+
        "</div>"+
        "<div class=\"trail_btn\">" +
        "<input type=\"submit\"  class=\"trail_submit\" value=\"注册试玩\"/>" +
        "<input type=\"button\"  onclick=\"closeLayer()\"  class=\"trail_cancel\" value=\"取消\"/>" +
        "</div>" +
        "</form>" +
        "</div>",
        success:function(){
            getValiCode();
        }
    })
}


function closeLayer(){
	layer.close(layer.index);
}

function registerTrailUser(){
		 var pwd = $("#trailPassword").val();
		 if (pwd == "") {
			  layer.msg("密码不能为空！", {icon: 2}, 1200);
		      $("#trailPassword").focus();
		      return false;
	     }
	    var trailVlidaCode = $("#trailVlidaCode").val();
	    if (trailVlidaCode == "") {
		      layer.msg("验证码不能为空！", {icon: 2}, 1200);
		      $("#trailVlidaCode").focus();
		      return false;
	    }
	   $.ajax({
	      type: "POST",
	      url: HttpUtil.baseUrl + "/v/user/registerTrailUser",
	      data:{
	    	password:md5Password ? hex_md5(pwd) : pwd,
	    	valiCode:trailVlidaCode
	      },
	      dataType: "json",
	      success: function (data) {
	      if (data != null && data != "") {
	        $.cookie("account", data.account, {path: "/"});
	        $.cookie("userType", data.type, {path: "/"});

              layer.alert('试玩会员注册成功', {icon: 1}, function (index) {
                  layer.close(index);
                  window.location.reload();
              });

             //获取公告的JSON数据
              var noticeJson = HttpUtil.ajaxAsync(
                  HttpUtil.baseUrl + "/data/json/notice.json");

              if (noticeJson != null && noticeJson != ""){
                  if (noticeJson.login_notice != null && noticeJson.login_notice!= ""){
                      var option = {
                          title: noticeJson.login_notice.noticeTitle
                      };
                      layer.open({
                          type: 1,
                          area: ['500px', 'auto'],
                          btn: ['确认'],
                          content: '<div style="padding: 20px;font-size:16px;">'
                          + noticeJson.login_notice.noticeContent + '</div>'
                      });
                  }
              }
	      }
	      else {
	    	 if(data.msg!=null && data.msg!=""){
	    		 layer.alert(data.msg, {icon: 2},1200);
	    	 }else{
	    		 layer.alert('试玩会员注册失败', {icon: 2});
	    	 }
	      }
	    }
	  });
	  getValiCode();
	  return false;
  }
function registerTest() {
    HttpUtil.ajax({
        type: "GET",
        url: HttpUtil.baseUrl + "/v/user/regTest",
        dataType: "",
        success: function (data) {
            if (data != null && data != "") {
                $.cookie("account", data.account, {path: "/"});
                $.cookie("userType", data.type, {path: "/"});
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