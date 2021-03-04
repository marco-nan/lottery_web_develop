var HttpUtil = {
	/**
	 * 获取url #后面参数
	 * @returns {Object}
	 */
	GetRequest : function() {
		var url = location.href; //获取url中"#"符后的字串 
		var array = new Array();
		array = url.split("#"); //字符分割
		url = "#" + array[1];
		var theRequest = new Object();
		if (url.indexOf("#") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	},
	GetUrlPara : function() {
		var url = location.search; //获取url中"?"符后的字串   
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				var kv = strs[i].split("=");
				theRequest[kv[0]] = unescape(kv[1]);
			}
		}
		return theRequest;
	},
	GetIframeUrlPara : function(iframeId) {
		var url = window.parent.document.getElementById(iframeId).contentWindow.location.search; //获取url中"?"符后的字串
		//console.log(url);
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				var kv = strs[i].split("=");
				theRequest[kv[0]] = unescape(kv[1]);
			}
		}
		return theRequest;
	},
	ajax : function(option){
		//url, type, para, successCallBack, errorCallBack
		if(!option){
			return ;
		}
		if(!option.url){
			return;
		}
		$.ajax({
			type : option.type || 'GET',
			url : option.url,
			data : option.para,
			//dataType : 'json',
			success : function(data) {
				if (option.success) {
					option.success(data);
				}
			},
			error : function(xhr, type) {
				checkError(xhr);
			}
		});
	},
	ajaxJsonp : function(url, para, callback) {
		$.ajax({
			type : "get",
			async : true,
			url : url,
			data : para,
			dataType : "jsonp",//数据类型为jsonp  
			jsonp : "jsonp",//服务端用于接收callback调用的function名的参数  
			success : function(result) {
				callback(result);
			}
		});
	},
	ajaxForm : function(option,formName){
		//url, type, para, successCallBack, errorCallBack
		if(!option){
			return ;
		}
		if(!option.url){
			return;
		}
		// 提交表单
		$("#"+formName).ajaxSubmit({
			type : option.type || 'GET',
			url : option.url,
			timeout : 3000, //超时时间设置，单位毫秒
			cache:false,
			async: false,
			resetForm:function(){
				return true;
			},
			success : function(data) {
				if (option.success) {
					option.success(data);
				}
			},
			error : function(xhr, type) {
				checkError(xhr);
			}
		});
	},
	/**
	 * 加载js文件
	 * @param url
	 */
	loadJs : function(url) {
		document.write("<script type='text/javascript' src='" + url
				+ "'><\/script>");
		document.close();
	},
	/**
	 * 加载静态的JSON的数据文件
	 * @param _flag
	 * @returns
	 */
	ajaxAsync : function(_url, para) {
		var redata;
		$.ajax({
			 type: 'GET',
			 url: _url,			 
			 dataType:'json',
			 data : para,
			 async:false,
			 success: function(data){
				 redata=data;
			 },
			 error : function(xhr, type) {
				 checkError(xhr);
			 }
		});
		return redata;
	},
	baseUrl : (window.location.protocol || document.location.protocol) + '//' + window.location.host
};
//动态打开连接
function openwin(url) {
	var a = document.createElement("a");
	a.setAttribute("href", url);
	a.setAttribute("target", "_blank");
	a.setAttribute("id", "openwin");
	document.body.appendChild(a);
	a.click();
}
/**
 * 获取根域名
 * @returns
 */
function getRootDomain() {
	var domain = '';
	var tmp = location.hostname.split('.');
	if (tmp.length > 2)
		domain = tmp.slice(tmp.length - 2).join('.');
	else
		domain = tmp.join('.');
	return domain;
}

function checkError(xhr) {
	var obj = JSON.StrToJSON(xhr.responseText);
	if(403==xhr.status){
		layer.alert(obj.msg, {icon: 2}, function(index){
			layer.close(index);
			location.href = HttpUtil.baseUrl+'/index.html';
		});
	} else{
		if (obj.code == 'UC/TOKEN_INVALID') {// 超时
			layer.alert('会员未登陆', {icon: 2}, function(index){
				layer.close(index);
				$.get("/v/user/logout",{},function(data){
					$.cookie("token", null, { path: '/' });
					top.document.location.href= '/';
			    }).error(function(XMLHttpRequest){
			    	//$.removeCookie('token', { path: '/' });
					$.cookie("token", null, { path: '/' });
			    	top.document.location.href= '/';
			    })
			});
		} else {
			layer.alert(obj.msg, {icon: 2});
		}
	}
}
/*var Cookies = {};
*//**
 * 设置cookie值
 * @param	name	名称
 * @param	value	值
 * @param	expTime 过期时间，单位秒,<=0为会话模式
 *//*
Cookies.set = function(name, value, expTime) {
	var argv = arguments;
	var argc = arguments.length;
	var expires = new Date();
	if (expTime > 0)
		expires.setTime(expires.getTime() + expTime * 1000);
	var path = (argc > 3) ? argv[3] : '/';
	var secure = (argc > 5) ? argv[5] : false;
	var domain = getRootDomain();
	document.cookie = name + "=" + escape(value)
			+ ((expTime > 0) ? ("; expires=" + expires.toGMTString()) : "")
			+ ((path == null) ? "" : ("; path=" + path))
			+ ((domain == null) ? "" : ("; domain=" + domain))
			+ ((secure == true) ? "; secure" : "");
};
*//**
 * 获取cookie值
 *//*
Cookies.get = function(name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	var j = 0;
	while (i < clen) {
		j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return Cookies.getCookieVal(j);
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0)
			break;
	}
	return null;
};
*//**
 * 删除cookie值
 *//*
Cookies.clear = function(name) {
	var path = '/';
	var domain = document.domain;
	var tmp = location.hostname.split('.');
	if (tmp.length > 2)
		domain = tmp.slice(1).join('.');

	if (Cookies.get(name)) {
		document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT"
				+ "; path=" + path + "; domain=" + domain;
	}
};

Cookies.getCookieVal = function(offset) {
	var endstr = document.cookie.indexOf(";", offset);
	if (endstr == -1) {
		endstr = document.cookie.length;
	}
	return unescape(document.cookie.substring(offset, endstr));
};*/
