

var LANGX = 'gb', H = '75', ajaxDoing = false, query = {};

// 防被砍
if (top.location.hostname != self.location.hostname) {
    location = 'http://www.7843000.com/';
}
function getYzm(url) {
    $("#vImg").attr("src", "/v/vCode?m=reg&t="+Math.random()+(new Date).getTime());
}

$(function () {
	//获取注册限制配置
	$.get("/v/user/getRegLimit",{},function(data){
		allowRegister = (data.register && data.register > 0);
		needVcode = (data.vCode && data.vCode > 0);
		
		if(needVcode){
			getYzm('');
			$("#vCode").rules("add", { required: true, messages: { required:  $._BuildPrompt('vCode', '? 请输入验证码!!',{ 'width': 160 })} });
		}else{
			$("#vcodemoudle").hide();
		}
		
		if(data.fullName > 0){
	    	// 真名不唯一
			$("#fullName").rules("add", { ajaxCheckData: true, messages: { required:  $._BuildPrompt('fullName', '? ✖ 此帐号已经有人使用了，联系客服！',{ 'width': 160 })} });
	    }
		
		if(data.email == 1){
	    	$("#emailStar").append("*&nbsp;");
	    	$("#email").rules("add", { required: true, messages: { required:  $._BuildPrompt('email', '? 请输入邮箱!!', { 'width': 120})} });
	    }else if(data.email == 0){
	    }else{
	    	$("#email_moudle").hide();
	    }
		
		if(data.phone == 1){
	    	$("#phoneStar").append("*&nbsp;");
	    	$("#phone").rules("add", { required: true, messages: { required:  $._BuildPrompt('phone', '? 请输入手机号!!', { 'width': 120})} });
	    }else if(data.phone == 0){
	    }else{
	    	$("#phone_moudle").hide();
	    }
	    
	    if(data.intrCode == 1){
	    	$("#intrcodeStar").append("*&nbsp;");
	    	$("#intrCode").rules("add", { required: true, messages: { required:  $._BuildPrompt('intrCode', '? 请输入推广码!!', { 'width': 120 })} });
	    }else if(data.intrCode == 0){
	    }else{
	    	$("#intrcode_moudle").hide();
	    }
	    
	    if(data.qq == 1){
	    	$("#qqStar").append("*&nbsp;");
	    	$("#qq").rules("add", { required: true, messages: { required:  $._BuildPrompt('qq', '? 请输入QQ号码!!', { 'width': 120})} });
	    }else if(data.qq == 0){
	    }else{
	    	$("#qq_moudle").hide();
	    }
	    
	    if(data.weixin == 1){
	    	$("#weixinStar").append("*&nbsp;");
	    	$("#weixin").rules("add", { required: true, messages: { required:  $._BuildPrompt('weixin', '? 请输入weixin号码!!', { 'width': 120})} });
	    }else if(data.weixin == 0){
	    }else{
	    	$("#weixin_moudle").hide();
	    }
	    if(data.birthday == 1){
	    	$("#birthdayStar").append("*&nbsp;");
	    	$("#year").rules("add", { required: true, messages: { required:  $._BuildPrompt('year', '? 请选择年份!!', { 'width': 120 })} });
	    	$("#month").rules("add", { required: true, messages: { required:  $._BuildPrompt('month', '? 请选择月份!!', { 'width': 120 })} });
	    	$("#day").rules("add", { required: true, messages: { required:  $._BuildPrompt('day', '? 请选择日期!!', { 'width': 120 })} });
	    }else if(data.birthday == 0){
	    }else{
	    	$("#birthday_moudle").hide();
	    	$("#birthday_moudle_tip").hide();
	    }
		
    }).error(function(XMLHttpRequest){
    })
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
jQuery.validator.addMethod("chenckzcname", function(value, element) {
    var tel = /[^0-9a-z]/g;
		return this.optional(element) || (!tel.test(value));
}, "只能输入数字和小写字母！");

//手机号只能输入+开头数字,或数字
jQuery.validator.addMethod("chenckmobile", function(value, element) {
	if(value==''){
		return true;
	}
    var tel = /^[+]?[0-9]{6,13}$/g;
	return tel.test(value);
}, "请输入+开头的国际号码,或6至13个正确手机号！");

//如果限制为中国手机就只能输入11位手机号
jQuery.validator.addMethod("chenckChinaMobile", function(value, element) {
	if(value==''){
		return true;
	}
    var tel = /^[1][3578]\d{9}$/g;
	return tel.test(value);
}, "请输入中国境内手机号！");

//检测QQ号
jQuery.validator.addMethod("chenckqq", function(value, element) {
	if(value==''){
		return true;
	}
    var tel = /^[1-9][0-9]{4,9}$/g;
	return tel.test(value);
}, "请输入正确的QQ号码！");
//检测QQ号
jQuery.validator.addMethod("chenckemail", function(value, element) {
	if(value==''){
		return true;
	}
    var tel = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return tel.test(value);
}, "请输入正确的邮箱地址！");

    /**/
    $.validator.addMethod('ajaxCheckData', function (value, element) {
        var id = element.id;
        if ('undefined' != typeof (query[id]) && query[id].value == value) { return true; }
        //'real_name': {'ajax' : 'checkdata', 'a_real_name': value},
        var data = {
            'account': { 'type': 0, 'val': value },
            'fullName': { 'type': 1, 'val': value }
        };

        query[id] = { 'status': false, 'value': value };
        ajaxDoing = true;
        $(element).siblings('.loading_pic').fadeIn();
        $.ajax({
            'url': '/v/user/checkUnique',
            'type': 'get',
            'data': data[id],
            'cache': false,
            'timeout': 30000,
            'error': function (e, textStatus) {
                if (textStatus == 'timeout') {
                    alert('网路品质不佳!!');
                    $(element).siblings('.loading_pic').fadeOut();
                }
            },
            'success': function (data) {
                query[id].status = !data;
                showError(id, !data);
                ajaxDoing = false;
                $(element).siblings('.loading_pic').fadeOut();
            }
        });
        return true;
    }, '');

    /**/
    $.validator.addMethod('CheckNameRule', function (value, element) {
        var Ch = /^[\u4e00-\u9fa5]+$/;
        var KRW = /^([\uAC00-\uD7AF])*$/gi;

        var En = /^([a-zA-Z]+)$/;

        // 韓幣特例
        var currency = 'RMB'; // $('#myFORM [name=currency]').val()
        if (currency == 'KRW') {
            return this.optional(element) || (Ch.test(value)) || (En.test(value)) || (KRW.test(value));
        } else {
            return this.optional(element) || (Ch.test(value)) || (En.test(value));
        }
    }, '取款密码!!');

    $.validator.addMethod('CheckChinaName', function (value, element) {
    	if(value==''){
    		return true;
    	}
        var Ch = /^[\u4e00-\u9fa5]+$/;
        return Ch.test(value);
    }, '中文信息!!');

    /**/
    $.validator.addMethod('equalToUsername', function (value, element) {
        return (value == $('#account').val()) ? false : true;
    }, '帐号与密码不能相同');


    /**/
    $.validator.addMethod('CheckPWDStrength', function (value, element) {
        return ($.fn.checkstrength(value) < 26) ? false : true;
    }, '密码强度：弱');


    /**/
    $.validator.addMethod('CheckrmNum', function (value, element) {
        return value != '请点击' && value;
    }, '验证码请务必输入!!');

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
                'ajaxCheckData': true,
				'chenckzcname': true,
                'maxlength': 11,
            },
            'fullName': {
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
            'agree': { 'required': true }
            ,
			'phone':{
				'chenckmobile': true
            },
			'email': {
				'chenckemail': true
			},
			'qq': {				
				'chenckqq': true
			},
			'intrCode':{
				
			}
            ,'year': { },'month': {  },'day': { }
            ,'pwd1': { 'required': true },'pwd2': { 'required': true },'pwd3': {'required': true },'pwd4': {'required': true }
        },
        /**/
        'messages': {
            'account': {
                'required': $._BuildPrompt('account', '✖ 请输入帐号!!'),
                'minlength': $._BuildPrompt('account', '✖ 帐号：请输入4-11个字元, 仅可输入英文字母以及数字的组合!!', { 'width': 360 }),
                'ajaxCheckData': $._BuildPrompt('account', '✖ 此帐号已经有人使用了！',{ 'width': 160 }),
				'chenckzcname': $._BuildPrompt('account', '✖ 只能输入数字和小写字母！！',{ 'width': 180 }),
            },
            'fullName': {
                'CheckChinaName': $._BuildPrompt('fullName', '✖ 请输入真实姓名!!',{ 'width': 160 }),
                'maxlength': $._BuildPrompt('fullName', '✖ 姓名：最多输入4个汉字!!', { 'width': 160 })
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
            'agree': { 'required': $._BuildPrompt('agree', '✖ 请勾选同意条款!!', { 'width': 120, 'top': -60, 'left': -28 })
            },
            'phone': { 
						'chenckmobile': $._BuildPrompt('phone', '✖ 只能输入+开头的国际号码,或6至13位数字的正确手机号！',{ 'width': 300 }),
						'chenckChinaMobile': $._BuildPrompt('phone', '✖ 只能输入11位的中国手机号！！',{ 'width': 200 })
            },
            'email': { 
						'checkemail':$._BuildPrompt('email', '✖ 请输入一个正确的邮箱！！',{ 'width': 160 })
            },
            'qq': { 
					'chenckqq': $._BuildPrompt('qq', '✖ 请输入正确QQ号码！',{ 'width': 140 })
            },
            'passport': { 'required': $._BuildPrompt('passport', '✖ 请输入身份证!!', { 'width': 120})
            },
            'intrCode': { 
            }
            ,
            'year': {  }
            ,
            'month': {  }
            ,
            'day': {  }
            ,
            'pwd1': { 'required': $._BuildPrompt('pwd1', '✖ 请输入取款密码!!', { 'width': 120 }) }
             ,
            'pwd2': { 'required': $._BuildPrompt('pwd2', '✖ 请输入取款密码!!', { 'width': 120 }) }
            ,
            'pwd3': { 'required': $._BuildPrompt('pwd3', '✖ 请输入取款密码!!', { 'width': 120 }) }
             ,
            'pwd4': { 'required': $._BuildPrompt('pwd4', '✖ 请输入取款密码!!', { 'width': 120 }) }
        },
        /**/
        'submitHandler': function () {
            for (var i in query) {
                if (!query[i]['status']) {
                    return false;
                }
            }
            layer.confirm('是否确定以该信息注册？', {
        	  btn: ['确认','我再改改'],
        	  shade: 0
        	}, function(index){
        		layer.close(index);
        		$('form input:submit').attr('disabled', 'disabled');
                var pwd = $("#password").val();
                var confirmPwd = $("#confirmPassword").val();
                $("#password").val(hex_md5(pwd));;
                $("#confirmPassword").val(hex_md5(confirmPwd));
                $.ajax({
                    url: '/v/user/reg',
                    type: 'post',//提交的方式
                    data: $('#myFORM').serialize(),
                    success: function() {
                    	$.cookie("account", $("#account").val(),{ path: "/"});
                    	getNoticeRegister();
                    }
                });
        	}, function(){
        	});
        }
    });
    /**/
    $('#myFORM').find('select[name^=pwd]').focus(function () {
        $('.Error_MultiPwd').remove();
    }).end().find('input[name=CANCEL2]').click(function () {
        validator.resetForm();
    });

    /**/
    $('input[name=password], input[name=passwd]').keyup(function () {
        this.value = this.value.replace(/[^a-z0-9]/g, '');
    });

    /**/
    $('#account,#fullName, #zcyzm').focus(function () {
        $('#account, #fullName, #zcyzm').focus(function () {
            showError(this.id, true);
        }).blur(function () {
            var id = this.id;
            if ('undefined' != typeof (query[id]) && !query[id].status && !ajaxDoing && $('.Error_' + id + ':visible').length == 0) {
                showError(id, false);
            }
        })
    });
});
function showError(name, status) {
    var errMes = $('.Error_ajax_' + name);
    if (status) {
        errMes.hide();
    } else {
        if (errMes.length > 0) {
            errMes.show();
            return;
        }
        switch (name) {
            case 'account':
                $('#account').after($._BuildPrompt('ajax_account', '✖ 此帐号已经有人使用了！',{ 'showArrow': false,'width': 160 }));
                break;
            case 'fullName':
            	$('#fullName').after($._BuildPrompt('ajax_fullName', '? ✖ 此帐号已经有人使用了，联系客服！', {'showArrow': false,'width': 160 }));
            	break;
        }
    }
}

$.extend({
    /**/
    '_Dialog': function (Title, Data, Width, Height) {
        $('#Dialog').dialog({
            'title': Title,
            'width': Width,
            'minWidth': Width,
            'height': Height,
            'minHeight': Height,
            'modal': true,
            'bgiframe': true,
            'show': 'blind',
            'hide': 'blind'
        });
        $('#Dialog').html(Data);
    },
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
    },
    /**/
    '_CheckIDCard': function (num) {
        var len = num.length, re;
        if (len == 15)
            re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/);
        else if (len == 18)
            re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\d)$/);
        else {
            return false;
        }
        var a = num.match(re);
        if (a != null) {
            if (len == 15) {
                var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
                var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
            } else {
                var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
                var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
            }
            if (!B) return false;
        }
        return true;
    },
    /**/
    '_InArray': function (stringToSearch, arrayToSearch) {
        for (s = 0; s < arrayToSearch.length; s++) {
            thisEntry = arrayToSearch[s].toString();
            if (thisEntry == stringToSearch) {
                return true;
            }
        }
        return false;
    }
});

