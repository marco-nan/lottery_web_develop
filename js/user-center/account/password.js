/**
 * Created by Zelei on 2017/4/26.
 */
var isHY=false;
(function ($) {
  var md5Password = false;
  var hasFundPassword = true;
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
      },
      error: $.errorHandler
    });
  }

  function getHasFundPassword() {
    $.ajax({
      async: false,
      url: '/api/user/info',
      type: 'get',
      dataType: 'json',
      success: function (response) {
        hasFundPassword = !response.extInfo.fundPwd === false;
          isHY=(response.userInfo.type==='HY'?true:false)
      },
      error: $.errorHandler
    });
  }
  
  
  
  //获取注册限制配置
  var _fullName,_phone,_onlyfullName,_onlyfullPhone;
  function getRegisterConfigs() {
    $.getJSON("/data/json/limit/registerLimit.json?" + new Date().getTime(), {}, function (data) {
    	_fullName = data.fullName;
    	_phone = data.phone;
        _onlyfullName = data.onlyfullName;
        _onlyfullPhone = data.onlyfullPhone;
    }).error(function (XMLHttpRequest) {
    });
  }

  $(function () {
	getRegisterConfigs();
    getUserPasswordType();
    getHasFundPassword();
    if (!hasFundPassword) {
      $('#fundPwdDiv').remove();
    }

    $('#loginForm').validate({
      rules: {
        newPassword: {
          pattern: /^[\da-z]{6,12}$/i
        },
        repassword: {
          equalTo: '#loginForm input[name="newPassword"]'
        }
      },
      messages: {
        newPassword: {
          pattern: '密码由6-12位字母或数字组成'
        },
        repassword: {
          equalTo: '两次密码输入不一致'
        }
      },
      submitHandler: function (form) {
        $.loading();
        var formData = $(form).serializeObject();
        $.post($.toFullPath('/api/user/updatePassword'), {
          'oldPassword': md5Password ? hex_md5(formData.password)
              : formData.password,
          'newPassword': md5Password ? hex_md5(formData.newPassword)
              : formData.newPassword
        }, function (response) {
          $.info('保存成功！', null, function () {
            $.loaded();
            window.location.reload(true);
          }, true);
        }, 'text').error($.errorHandler);
      },
      errorPlacement: $.errorPlacement
    });
    $('#withdrawForm').validate({
      rules: {
        repassword: {
          equalTo: '#withdrawForm input[name="newPassword"]'
        }
      },
      messages: {
        newPassword: '请输入4位数字密码',
        repassword: {
          equalTo: '两次密码输入不一致'
        }
      },
      submitHandler: function (form) {
        $.loading();
        var formData = $(form).serializeObject();
        $.post($.toFullPath('/api/user/updateFundPwd'), {
          'oldPassword': formData.password,
          'newPassword': formData.newPassword
        }, function (response) {
          $.info('保存成功！', null, function () {
            $.loaded();
            window.location.reload(true);
          }, true);
        }, 'text').error($.errorHandler);
      },
      errorPlacement: $.errorPlacement
    });

    $('a[href="#info"]').on('click', function () {
      $.getJSON('/api/user/info', function (response) {
        var userInfo = response.userInfo;
        $('#account').text(userInfo.account);
        var fullName = userInfo.fullName;
        if (!fullName === false) {
          $('#fullNameStatic').text(userInfo.fullName).show();
          $('#fullName, #fullNameTips').hide();
        } else {
          $('#fullNameStatic').text(userInfo.fullName).hide();
          $('#fullName, #fullNameTips').show();
        }
        for (var key in userInfo) {
          if (userInfo[key]) {
            $('#infoForm input[name="' + key + '"]').attr('readonly', true);
            $('#infoForm input[name="' + key + '"]').val(userInfo[key]);
          }
        }

      }).error($.errorHandler);
    });

    
    
    $('#infoForm').validate({
    	
      rules: {
        fullName: {
          pattern: /([0-9\u4e00-\u9fa5]{2,15})/,
          checkName:true,
          valCheckName:true
        },
        weixin: {
          pattern: /^[a-zA-Z0-9]{5,50}$/
        },
        phone: {
          pattern: /^1\d{10}$/,
          checkPhone:true,
          valCheckPhone:true
        },
        email: {
          pattern: /^([a-z0-9A-Z]+[-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/
        },
        qq: {
          pattern: /^[1-9][0-9]{4,28}$/
        }
      },
      messages: {
        fullName: {
          pattern: '姓名由2-15个汉字或数字组成'
        },
        weixin: {
          pattern: '微信由5-50位字母或数字组成'
        },
        phone: {
          pattern: '手机号格式错误'
        },
        email: {
          pattern: '邮箱格式错误'
        },
        qq: {
          pattern: 'QQ由5-29位数字组成'
        }
      },
      submitHandler: function (form) {
        $.loading();
        $.post($.toFullPath('/api/user/modifyUserInfo'),
            $(form).serializeObject(), function () {
              $.loaded();
              $.info('保存成功！');
            }, 'text').error($.errorHandler);
      },
      errorPlacement: $.errorPlacement
    })
  });
  
  jQuery.validator.addMethod("checkName", function(value, element,name) {
      return checkName(name);
  },'名称必填');
  
  jQuery.validator.addMethod("checkPhone", function(value, element,phone) {
      return checkPhone(phone);
  },'手机号码必填');
  
  
  jQuery.validator.addMethod("valCheckName", function(value, element,name) {
      return checkUniqueName(name);
  },'名称已存在');
  
  jQuery.validator.addMethod("valCheckPhone", function(value, element,phone) {
      return checkUniquePhone(phone);
  },'手机号码已存在');
  
  
  function checkName(name) {
	  var flag = true;
	  if(_fullName == 1) {
		  if(!$("#fullName").val()) {
			  flag = false;
		  }
	  }
	  return flag;
  }
  
  function checkPhone(phone) {
	  var flag = true;
	  if(_phone == 1) {
		  if(!$("#phone").val()) {
			  flag = false;
		  }
	  }
	  return flag;
  }
  
  //名称唯一校验
  function checkUniqueName(name) {
	  var flag = true;
	  if (_onlyfullName == 1 && $("#fullName").val()) {
		  $.ajax({
			  url: '/v/user/checkUnique',
			  type: 'get',//提交的方式
			  async: false,
			  data: {
				  val: $('#fullName').val(),
				  type: 1
			  },
			  success: function (msg) {
				  if (msg) {
					  flag = false;
				  }
			  }
		  });
      }
	  return flag;
  }
  
  //手机唯一校验
  function checkUniquePhone(phone) {
	  var flag = true;
	  if($("#phone").prop("readonly") == false) {
		  if(_onlyfullPhone == 1 && $("#phone").val()){
			  //验证电话号码是否唯一
			  $.ajax({
				  url: '/v/user/checkUnique',
				  type: 'get',//提交的方式
				  async: false,
				  data: {
					  val: $('#phone').val(),
					  type: 2
				  },
				  success: function (msg) {
					  if (msg) {
						  flag = false;
					  }
				  }
			  });
		  }
	  }
	  return flag;
  }
  
})(jQuery);