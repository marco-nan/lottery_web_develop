/**
 * Created by Zelei on 2017/4/25.
 */
(function ($) {
  $(function () {
    var rebateMode = null;
    $.ajax({
      url: $.toFullPath('/data/json/config.json'),
      async: false,
      dataType: 'json',
      success: function (response) {
        var systemConfig = response['system_config'];
        for (var i = 0; i < systemConfig.length; i++) {
          var config = systemConfig[i];
          if (config.configKey === 'site_rebate_model') {
            rebateMode = config.configValue;
          }
        }
      },
      error: function () {
        rebateMode = '1';
      }
    });
    if (rebateMode === '1') {
      $('#rebate-container, #rebate-container-hr').remove();
    } else {
      $.getJSON($.toFullPath('/api/dl/getDlSubRebateRange'), null, function(response) {
        if (!response) {
          return;
        }
        var max = $.toFixed(response[1], 4);
        $.extend({
          maxRebate: max,
          maxRebatePercent: max
        });
        max = max / 0.1;
        var min = $.toFixed(response[0], 4) / 0.1;
        var rebate = $('#rebate');
        for (var i = max; i >= min; i--) {
          var r = $.toFixed($.maxRebate - (max - i) * 0.1);
          var l = 1800 + i * 2;
          var option = '<option value="' + r + '">' + $.toFixed(r, 2)
              + '% ----- ' + l + '</option>';
          if (i === max - 1) {
            option = $(option).attr('selected', 'selected');
          }
          rebate.append(option);
        }
      }).error($.errorHandler);
    }
    $('#registForm').validate({
      rules: {
        nickname: {
          pattern: /([z-zA-Z0-9\u4e00-\u9fa5]{2,15})/
        },
        fullName: {
        	pattern: /([0-9\u4e00-\u9fa5]{2,15})/,
	        checkName:true,
	        valCheckName:true
        },
        phone: {
            pattern: /^1\d{10}$/,
            checkPhone:true,
            valCheckPhone:true
        },
        account: {
          pattern: /^[a-zA-z][a-zA-Z0-9_]{4,29}$/,
          remote: {
            url: $.toFullPath('/v/user/checkUnique2'),
            type: 'get',
            data: {
              type: 0,
              val: function () {
                return $('#account').val();
              }
            }
          }
        },
        password: {
          pattern: /^[a-zA-Z0-9]{6,16}$/
        },
        repassword: {
          equalTo: '#password'
        }
      },
      messages: {
        nickname: {
          pattern: '昵称由2-15个汉字、字母或数字组成'
        },
        fullName: {
          pattern: '姓名由2-15个汉字或数字组成',
        },
        account: {
          pattern: '帐号以字母开头，由5-30位字母、数字或下划线组成',
          remote: '帐号已存在'
        },
        password: {
          pattern: '密码由6-16位字母或数字组成'
        },
        phone: {
            pattern: '手机号格式错误'
        },
        repassword: {
          equalTo: '两次密码输入不一致'
        }
      },
      submitHandler: function (form) {
        $.loading();
        var userInfo = $(form).serializeObject();
        var params = {
          'userInfo.isDl': userInfo.isDl,
          'userInfo.nickname': userInfo.nickname,
          'userInfo.account': userInfo.account,
          'userInfo.password': hex_md5(userInfo.password)
        };
        if (rebateMode !== '1') {
        	params['userInfo.rebate'] = userInfo.rebate;
        }
        if(_fullName == 1) {
        	params['userInfo.fullName'] = userInfo.fullName;
     	}
        if(_phone == 1) {
        	params['userInfo.phone'] = userInfo.phone;
        }
        if(_fullName == 1) {
        	params['userInfo.fullName'] = userInfo.fullName;
        }
        if(_phone == 1) {
        	 params['userInfo.phone'] = userInfo.phone;
        }
        $.post($.toFullPath('/api/dl/add'), params, function (response) {
          $.info('保存成功！', null, function () {
            $.loaded();
            window.location.href = $.toFullPath(
                '/page/user-center/agent/user_list.html');
          }, true);
        }, 'text').error($.errorHandler);
      },
      errorPlacement: $.errorPlacement
    });
  });
  
  //获取注册限制配置
  var _fullName,_phone,_onlyfullName,_onlyfullPhone;
  $(function() {
	  $.getJSON("/data/json/limit/registerLimit.json?" + new Date().getTime(), {}, function (data) {
		  _fullName = data.fullName;
		  _onlyfullName = data.onlyfullName;
		  _phone = data.phone;
		  _onlyfullPhone = data.onlyfullPhone;
		  if (_fullName == 0) {
			  $("#fullnameStar").removeClass("fa fa-required m-r-xs");
		  } else if (_fullName == 1) {
		  } else {
			  $("#fullname_moudle").hide();
		  }
		  if (_phone == 0) {
			  $("#phoneStar").removeClass("fa fa-required m-r-xs");
		  } else if (_phone == 1) {
		  } else {
			  $("#phone_moudle").hide();
		  }
	  }).error(function (XMLHttpRequest) {
	  });
  })
  
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
	  return flag;
  }
})(jQuery);