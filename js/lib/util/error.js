$(document).ajaxError(
		function(event, XMLHttpRequest, ajaxOptions, thrownError) {
			// layer icon1：勾，2：叉， 3：问号，4：锁住，5：哭脸，6：笑脸，7+：感叹号
			var obj = jQuery.parseJSON(XMLHttpRequest.responseText);
			switch (XMLHttpRequest.status) {
			case 403:
				layer.alert(obj.msg || "登录超时",{
					icon : 2,
					shade: 0
				});
				top.location.href = '/';
				break;

			default:
				if(obj && obj.code){
					if (obj.code == 'UC/TOKEN_INVALID') {// 超时
						$.cookie("token", null,{path:"/"});
						$.cookie("account", null,{path:"/"});
						$.cookie("accountType", null,{path:"/"});

                        layer.confirm('网络连接超时,请重新登录', {
                            btn: ['确定'] //按钮
                        }, function(){
							mem_logout();
						});
					}else {
						layer.alert(obj.msg || "网络异常,连接超时请刷新页面", {
							icon : 2,
							shade: 0
						});
					}
				}else {
					layer.alert(obj.msg || "网络异常,连接超时请刷新页面", {
						icon : 2,
						shade: 0
					});
				}
				break;
			}
		});