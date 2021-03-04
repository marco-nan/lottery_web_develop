

var LANGX = 'gb', H = '75', ajaxDoing = false, query = {};

//防被砍
if (top.location.hostname != self.location.hostname) {
    location = 'http://www.7843000.com/';
}
//获取验证码
function getYzm(url) {
    $("#vImg").attr("src", "/v/vCode?m=reg&t="+Math.random()+(new Date).getTime());
}

//表单验证
$(function () {
	getYzm('');
    $(".password_adv").passStrength({
        userid: "#account",
        shortPass_txt: '密码强度：太短',
        badPass_txt: '密码强度：弱',
        goodPass_txt: '密码强度：很好',
        strongPass_txt: '密码强度：强',
        samePassword_txt: '帐号与密码不能相同'
    });

    $("#account").keyup(function () {
       var zh_pattern = /[a-z0-9]/g;
        if (!zh_pattern.test($(this).val())) {
           $("#account").val('');
        } /**/
    })

   $("#account").focus(function() {
	   var vdefault = this.value;   //获得焦点时，如果值为默认值，则设置为空
       if(vdefault!=""){
    	   value=$('div').is('.FormErrorC');
           if(value) {
               $("#account").val("");
           }
       }
   });

	//账号只能输入数字和小写字母
	jQuery.validator.addMethod("checkAccount", function(value, element) {
	    var tel = /[^0-9a-z]/g;
			return this.optional(element) || (!tel.test(value));
	}, "");

	//手机号只能输入+开头数字,或数字
	jQuery.validator.addMethod("checkMobile", function(value, element) {
		if(value==''){
			return true;
		}
	    var tel = /^[+]?[0-9]{6,13}$/g;
		return tel.test(value);
	}, "");

	//如果限制为中国手机就只能输入11位手机号
	jQuery.validator.addMethod("checkChinaMobile", function(value, element) {
		if(value==''){
			return true;
		}
	    var tel = /^[1][3578]\d{9}$/g;
		return tel.test(value);
	}, "");

	//检测QQ号
	jQuery.validator.addMethod("checkQq", function(value, element) {
		if(value==''){
			return true;
		}
	    var tel = /^[1-9][0-9]{4,9}$/g;
		return tel.test(value);
	}, "");
	//检测EMAIL号
	jQuery.validator.addMethod("checkEmail", function(value, element) {
		if(value==''){
			return true;
		}
	    var tel = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return tel.test(value);
	}, "");
    //检查账号的唯一性
    $.validator.addMethod('checkAccountUnique', function (value, element) {
    	var result = HttpUtil.ajaxAsync(HttpUtil.baseUrl+"/api/admin/checkUnique?account="+value)
        return result;
    }, '');
    //检查真实姓名必须中文
    $.validator.addMethod('CheckChinaName', function (value, element) {
    	if(value==''){
    		return true;
    	}
        var Ch = /^[\u4e00-\u9fa5]+$/;
        return Ch.test(value);
    }, '');
    //检查账号和密码是否一致
    $.validator.addMethod('equalToUsername', function (value, element) {
        return (value == $('#account').val()) ? false : true;
    }, '');
    //检查密码的强度
    $.validator.addMethod('CheckPWDStrength', function (value, element) {
        return ($.fn.checkstrength(value) < 26) ? false : true;
    }, '密码强度：弱');
    /**/
    var validator = $("#myFORM").validate({
        'onkeyup': false,
        'focusCleanup': true,
        'focusInvalid': false,
        'errorElement': 'span',
        /**/
        'rules': {
            'account': {
                'required': true,
                'minlength': 4,
                'checkAccountUnique': true,
				'checkAccount': true,
                'maxlength': 11,
            },
            'nickname': {
            	'required': true,
                'CheckChinaName':true,
                'maxlength': 4,
            },
            'password': {
                'required': true,
                'minlength': 6,
                'equalToUsername': true,
                'CheckPWDStrength': true
            },
            'confirmPassword': {
                'required': true,
                'equalTo': '#password'
            },
            'intrWeb': {
                'required': true
            },
			'phone':{
				'checkChinaMobile': true
            },
			'email': {
				'checkEmail': true
			},
			'qq': {				
				'checkQq': true
			},
			'zcyzm': {				
				'required': true
			},
			'cardNo': {				
				'required': true,
				'minlength': 19,
				'maxlength': 23
			},
			'bankAddress': {				
				'required': true
			}
        },
        /**/
        'messages': {
            'account': {
                'required': $._BuildPrompt('account', '✖ 请输入帐号!!'),
                'minlength': $._BuildPrompt('account', '✖ 帐号：请输入4-11个字元, 仅可输入英文字母以及数字的组合!!', { 'width': 360 }),
                'checkAccountUnique': $._BuildPrompt('account', '✖ 此帐号已经有人使用了！',{ 'width': 160 }),
				'checkAccount': $._BuildPrompt('account', '✖ 只能输入数字和小写字母！！',{ 'width': 180 }),
            },
            'nickname': {
            	'required': $._BuildPrompt('nickname', '✖ 请输入真实姓名!!'),
                'CheckChinaName': $._BuildPrompt('nickname', '✖ 真实姓名必须是汉字!!',{ 'width': 160 }),
                'maxlength': $._BuildPrompt('nickname', '✖ 姓名：最多输入4个汉字!!', { 'width': 160 })
            },
            'password': {
                'required': $._BuildPrompt('password', '✖ 请输入密码!!'),
                'minlength': $._BuildPrompt('password', '✖ 请输入6-11个字元的密码!!', { 'width': 170 }),
                'equalToUsername': $._BuildPrompt('password', '✖ 帐号与密码不能相同!!', { 'width': 170 }),
                'CheckPWDStrength': $._BuildPrompt('password', '✖ 密码强度：弱')
            },

            'confirmPassword': {
                'required': $._BuildPrompt('confirmPassword', '✖ 确认密码!!'),
                'equalTo': $._BuildPrompt('confirmPassword', '✖ 确认密码错误！请重新输入!!', { 'width': 140 })
            },
            'intrWeb': {
                'required': $._BuildPrompt('intrWeb', '✖ 推广网址不能为空!!')
            },
            'phone': { 
				'checkChinaMobile': $._BuildPrompt('phone', '✖ 只能输入11位的中国手机号！！',{ 'width': 200 })
            },
            'email': { 
				'checkEmail':$._BuildPrompt('email', '✖ 请输入一个正确的邮箱！！',{ 'width': 160 })
            },
            'qq': { 
				'checkQq': $._BuildPrompt('qq', '✖ 请输入正确QQ号码！',{ 'width': 140 })
            },
            'zcyzm': {				
            	'required': $._BuildPrompt('zcyzm', '✖ 请输入验证码!!')
			},
			'cardNo': {				
            	'required': $._BuildPrompt('cardNo', '✖ 请输入银行账号!!'),
            	'minlength': $._BuildPrompt('cardNo', '✖ 请输入16-19个字元的银行账号!!', { 'width': 170 }),
			},
			'bankAddress': {				
            	'required': $._BuildPrompt('bankAddress', '✖ 请输入地址!!')
			}
        },
        /**/
        'submitHandler': function () {
        	$('form input:submit').attr('disabled', 'disabled');
            var pwd = $("#password").val();
            var confirmPwd = $("#confirmPassword").val();
            $("#password").val(hex_md5(pwd));
            $("#confirmPassword").val(hex_md5(confirmPwd));
        	HttpUtil.ajaxForm({
				type: "POST",
				url: HttpUtil.baseUrl+"/api/admin/add/dl",
				dataType: "json",
				complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
					
				},
				success:function(data){
					layer.alert('代理信息提交申请成功', {icon: 1}, function(index){
						layer.close(index);
						$('form input:submit').attr('disabled', '');
					});
				}
			},"myFORM");
        }
    });
});

$.extend({
    /**/
    '_BuildPrompt': function (Name, PromptText, o) {
        var options = {
            'showArrow': true,
            'positionType': 'topRight',
            'width': 100,
            'top': -28,
            'left': -27,
            'opacity': 0.8,
            'AMarginLeft': 13
        };
        options = $.extend(options, o);

        if (LANGX != 'gb' && LANGX != 'big5')
            options.width += 50;

        /**/
        var prompt = $('<div>');
        prompt.addClass("FormError");
        /**/
        var promptContent = $('<div>').addClass("FormErrorC").css('width', options.width).html(PromptText).appendTo(prompt);
        /**/
        if (options.showArrow) {
            var arrow = $('<div>').addClass("FormErrorA").css('marginLeft', options.AMarginLeft);
            switch (options.positionType) {
                case "bottomLeft":
                case "bottomRight":
                    prompt.find(".FormErrorC").before(arrow);
                    arrow.addClass("FormErrorABottom").html('<div style="width:1px;border:none;background: #DDDDDD;"><!-- --></div><div style="width:3px;border:none;background:#DDDDDD;"><!-- --></div><div style="width:1px;border-left:2px solid #DDDDDD;border-right:2px solid #ddd;border-bottom:0 solid #ddd;"><!-- --></div><div style="width:3px;"><!-- --></div><div style="width:5px;"><!-- --></div><div style="width:7px;"><!-- --></div><div style="width:9px;"><!-- --></div><div style="width:11px;"><!-- --></div><div style="width:13px;border:none;"><!-- --></div><div style="width:15px;border:none;"><!-- --></div>');
                    break;
                case "topLeft":
                case "topRight":
                    arrow.html('<div style="width:15px;border:none;"><!-- --></div><div style="width:13px;border:none;"><!-- --></div><div style="width:11px;"><!-- --></div><div style="width:9px;"><!-- --></div><div style="width:7px;"><!-- --></div><div style="width:5px;"><!-- --></div><div style="width:3px;"><!-- --></div><div style="width:1px;border-left:2px solid #ddd;border-right:2px solid #ddd;border-bottom:0 solid #DDDDDD;"><!-- --></div><div style="width:3px;border:none;background:#DDDDDD;"><!-- --></div><div style="width:1px;border:none;background: #DDDDDD;"><!-- --></div>');
                    prompt.append(arrow);
                    break;
            }
        }
        /**/
        prompt.css({
            "top": options.top,
            "left": options.left,
            "opacity": options.opacity
        });
        return $('<span>').addClass("Error_" + Name).css('position', 'relative').css('vertical-align', 'top').append(prompt.css('position', 'absolute'));
    }
});

