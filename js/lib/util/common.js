// 空串格式格式
var isempty = /^\s*$/;
// 数字、字母或下划线格式
var provisionAccount = /^[a-zA-Z_0-9]+$/;
//邮箱格式定义
var pro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
// 密码格式-不能为纯数字
var provisionPwd = /^.*\D.*$/;
var re = /^[0-9]+.?[0-9]*$/;
var zzs = /^[0-9]*$/;   //非负整数（正整数 + 0） 
var m = /^[0-9]*[1-9][0-9]*$/;  //正整数 
var bankCheck = /^\d{16}|\d{19}$/; // 银行卡号
var phoneReg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;// 验证手机号码

var USER_LOGIN_PAGE = '/login.html';//用户登录页面
var USER_WELCOME_PAGE = '/index.html';//
/**
 * 取消easyui grid鼠标右键
 * @param e
 */
function cancelRightMenu(e){
	if(e.button==2){
		if (window.event) //IE
            e.returnValue = false;
        else //FF
            e.preventDefault();
	}
}
Date.prototype.format =function(format)
{
	var o = {
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter
		"S" : this.getMilliseconds() //millisecond
	};
	if(/(y+)/.test(format)) 
		format = format.replace(RegExp.$1,(this.getFullYear()+"").substr(4- RegExp.$1.length));
	for(var k in o)
	{
		if(new RegExp("("+ k +")").test(format))
			format = format.replace(RegExp.$1,RegExp.$1.length==1? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
	}
	return format;
};
if(!String.prototype.trim){
    String.prototype.trim = function(){
        return this.replace(/^s+|s+$/g, '');
    };
}
 
String.prototype.lTrim = function() 
{ 
	return this.replace(/(^\s*)/g, ""); 
} ;
 
String.prototype.rTrim = function() 
{ 
	return this.replace(/(\s*$)/g, ""); 
} ;
String.prototype.format = function(args) {
	var result = this;
	if (arguments.length > 0) {
		if (arguments.length == 1 && typeof (args) == "object") {
			for ( var key in args) {
				if (args[key] != undefined) {
					var reg = new RegExp("({" + key + "})", "g");
					result = result.replace(reg, args[key]);
				}
			}
		} else {
			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i] != undefined) {
					var reg = new RegExp("({[" + i + "]})", "g");
					result = result.replace(reg, arguments[i]);
				}
			}
		}
	}
	return result;
}
//Array.prototype.contains = function(element) {
//	for (var i = 0; i < this.length; i++) {
//		if (this[i] == element) {
//			return true;
//		}
//	}
//	return false;
//}
/**
 * 切换验证码
 */
function changeImgCode(imgId){
	var url = "http://"+window.location.host+"/";
	if($('#'+imgId)){
		$('#'+imgId).attr('src',url+'oauth/getValidateCode.do?_='+Math.random());
	}
}
/**
 * flash复制内容
 * @param id
 * @param txt
 */
function copyToClipboard(id,txt) {
	var clip = new ZeroClipboard($('#'+id), {
		  moviePath: "/js/util/ZeroClipboard.swf"
	});
	clip.on( 'complete', function(client, args) {
	  alert("内容已被复制!");
	});
	clip.on( 'mousedown', function(client) {
		clip.setText(txt);
	});
}

function decimal(num,v)
{
    var vv = Math.pow(10,v);
    return Math.round(num*vv)/vv;
}
/**
 * 统一打开窗口
 */
var Win={
	id : 'winPanel',
	open :function (paras,loadEvent){
		Win.close();
		$('body').append('<div id="'+Win.id+'"></div>');
		if(!paras){
			paras = {};
		}
		paras.onLoad = loadEvent;
		paras.onClose = function(){
			$('#'+Win.id).window('destroy');
		};
		if(!paras.collapsible){
			paras.collapsible = false;
		}
		if(!paras.minimizable){
			paras.minimizable = false;
		}
		if(!paras.maximizable){
			paras.maximizable = false;
		}
		$('#'+Win.id).window(paras);
	},
	close : function(){
		$('#'+Win.id).window('close');
	}
};
/**
 * 统一打开对话框
 */
var Dialog={
	id : 'dialogPanel',
	open :function (paras,loadEvent){
		Dialog.close();
		$('body').append('<div id="'+this.id+'"></div>');
		if(!paras){
			paras = {};
		}
		paras.onLoad = loadEvent;
		paras.onClose = function(){
			$('#'+this.id).dialog('destroy');
		};
		$('#'+this.id).dialog(paras);
		$('#'+this.id).window('open');
	},
	close : function(){
		$('#'+this.id).dialog('close');
	}
};
/** 
 * 异步加载依赖的javascript文件 
 * src：script的路径 
 * callback：当外部的javascript文件被load的时候，执行的回调 
 */  
function loadAsyncScript(src, callback) {  
    var head = document.getElementsByTagName("head")[0];  
    var script = document.createElement("script");  
    script.setAttribute("type", "text/javascript");  
    script.setAttribute("src", src);  
    script.setAttribute("async", true);  
    script.setAttribute("defer", true);  
    head.appendChild(script);  
      
    //fuck ie! duck type  
    if (document.all) {  
        script.onreadystatechange = function() {  
            var state = this.readyState;  
            if (state === 'loaded' || state === 'complete') {  
                callback();  
            }  
        }  
    } else {  
        //firefox, chrome  
        script.onload = function() {  
            callback();  
        }  
    }  
};

function winAlert(msg){
//	jAlert(msg, '提示框');
	alert(msg);
}
/**
 * 显示弹窗
 * @param o
 */
/*function showPop(o){
	var elem = $(o),
	w = elem.outerWidth(),
	h = elem.outerHeight();
	elem.css({
		//'margin-top':-h/2,
		'margin-left':-w/2
	});
	elem.show();
	$('#mask').show();
}*/
var zIndex = 998;
function showPop(o){
    var mask = $('<div class="mask"></div>');
    mask.css('zIndex',zIndex);

	var elem = $(o),
		w = elem.outerWidth(),
		h = elem.outerHeight();
	elem.css({
		//'margin-top':-h/2,
		'margin-left':-w/2,
        'zIndex':zIndex++
	});

	elem.show();
    elem.before(mask);
    mask.show();
}

/**
 * 隐藏弹窗
 * @param o
 */
/*function hidePop(o){
	var elem = $(o);
	elem.hide();
	$('#mask').hide();
	$('#'+winId).empty();
}*/
function hidePop(o){
	var elem = $(o);
	elem.hide();
    elem.prev('.mask').remove();
    $('#'+winId).empty();
}
function hidePop1(o){
	var elem = $(o);
	elem.hide();
	elem.remove();
    elem.prev('.mask').remove();
//    $('#'+winId).empty();
}
var  winId = 'windowPanel_';
/**
 * 加载html弹窗
 * @param url
 */
function loadWindow(url, para, callback){
	var obj = $('#'+winId);
	if($('#'+winId).length > 0){
		obj.empty();
	}else{
		$('body').append('<div id="'+winId+'"></div>');
	}
	obj = $('#'+winId);
	obj.load(url, para, function(response,status,xhr){
		if(callback){
			callback(response,status,xhr,para);
		}
	});
}
var Win = {
	winId : 'windowPanel_',
//	elem : null,
	obj : null,
	init : function(){
		Win.obj = $('#'+Win.winId);
		if(Win.obj.length > 0){
			Win.obj.empty();
		}else{
			$('#mask').after('<div class="mask" id="'+Win.winId+'"></div>');
//			$('body').append('<div class="mask" id="'+Win.winId+'"></div>');
			Win.obj = $('#'+Win.winId);
		}
	},
	load : function(url, para, callback){
		Win.init();
		Win.obj.load(url, para, function(response,status,xhr){
			var elem = Win.obj.children().eq(0);
			w = elem.outerWidth(),
			h = elem.outerHeight();
			elem.css({
				//'margin-top':-h/2,
				'margin-left':-w/2
			});
			elem.show();
			Win.obj.show();
			if(callback){
				callback(response,status,xhr,para);
			}
		});
	},
	close : function(){
		Win.obj.hide();
//		Win.obj.empty();
	}
};
function errorMsg(msg){
	var str = '<div class="pop pop-msg" id="errorMsg">'
			+ '	<h3 class="pop-hd">提示信息</h3>'
			+ '	<p class="pop-tips" id="errorTips">'+msg+'</p>'
			+ '	<div class="btn-tips">'
			+ '		<a href="javascript:;" class="u-btn u-btn7 j-close" onclick="$(\'#errorMsg\').remove();$(\'.mask:last\').hide()">确定</a>'
			+ '	</div>'
			+ '</div>';
	$('body').append(str);
	showPop('#errorMsg');
}
/**
 * 金额转换:分转成元,保留两位小数点
 * @param val
 * @returns {Number}
 */
function renderMoney (val) {
	return (val==null?0:(val/100));
}
/**
 * 显示返点%
 * @param val
 * @returns
 */
function renderRebate (val) {
	return (val==null?0:(val/10))+'%';
}

/** 用户提现状态值 */
function getuserWithdrawStatus(value){
	if(value == 1){
		return "未受理";
	}else if(value == 2){
		return "受理中";
	}else if(value == 3){
		return "通过";
	}else if(value == 4){
		return "不通过";
	}else if(value == 5){
		return "撤销";
	}
}
//银行卡号校验

//Description:  银行卡号Luhm校验

//Luhm校验规则：16位银行卡号（19位通用）:

// 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
// 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
// 3.将加法和加上校验位能被 10 整除。
function luhmCheck(bankno){
	if (bankno.length < 16 || bankno.length > 19) {
		//$("#bankError").html("银行卡号长度必须在16到19之间");
		return false;
	}
	
	var num = /^\d*$/;  //全数字
	if (!num.exec(bankno)) {
		//$("#bankError").html("银行卡号必须全为数字");
		return false;
	}
	//开头6位
	var strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";    
	if (strBin.indexOf(bankno.substring(0, 2))== -1) {
		//$("#banknoInfo").html("银行卡号开头6位不符合规范");
		return false;
	}
    var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）

    var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
    var newArr=new Array();
    for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i,1));
    }
    var arrJiShu=new Array();  //奇数位*2的积 <9
    var arrJiShu2=new Array(); //奇数位*2的积 >9
    
    var arrOuShu=new Array();  //偶数位数组
    for(var j=0;j<newArr.length;j++){
        if((j+1)%2==1){//奇数位
            if(parseInt(newArr[j])*2<9)
            arrJiShu.push(parseInt(newArr[j])*2);
            else
            arrJiShu2.push(parseInt(newArr[j])*2);
        }
        else //偶数位
        arrOuShu.push(newArr[j]);
    }
    
    var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
    for(var h=0;h<arrJiShu2.length;h++){
        jishu_child1.push(parseInt(arrJiShu2[h])%10);
        jishu_child2.push(parseInt(arrJiShu2[h])/10);
    }        
    
    var sumJiShu=0; //奇数位*2 < 9 的数组之和
    var sumOuShu=0; //偶数位数组之和
    var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal=0;
    for(var m=0;m<arrJiShu.length;m++){
        sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
    }
    
    for(var n=0;n<arrOuShu.length;n++){
        sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
    }
    
    for(var p=0;p<jishu_child1.length;p++){
        sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
        sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
    }      
    //计算总和
    sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
    
    //计算Luhm值
    var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;        
    var luhm= 10-k;
    
    if(lastNum==luhm){
   // $("#bankError").html("Luhm验证通过");
   // console.log("Luhm验证通过");
    return true;
    }
    else{
   // $("#bankError").html("银行卡号必须符合Luhm校验");
   // console.log("银行卡号必须符合Luhm校验");
    return false;
    }        
}
//人民币金额转大写
function numToCny(n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
        return "";
    var unit = "千百拾亿千百拾万千百拾元角分", str = "";
        n += "00";
    var p = n.indexOf('.');
    if (p >= 0)
        n = n.substring(0, p) + n.substr(p+1, 2);
        unit = unit.substr(unit.length - n.length);
    for (var i=0; i < n.length; i++)
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
    return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}

function isNumber(a) {
	a = a ? a : window.event;
	a = a.which ? a.which : a.keyCode;
	return 31 < a && (46 > a || 57 < a) ? !1 : !0
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

/***********************************************************************
 * 判断一个字符串是否为合法的日期格式：YYYY-MM-DD HH:MM:SS
 * 或 YYYY-MM-DD 或 HH:MM:SS
 */
function isDateStr(ds){
  parts = ds.split(' ');
  switch(parts.length){
    case 2:
      if(isDatePart( parts[0] ) == true && isTimePart( parts[1] )){
        return true;
      }else{
        return false;
      }
    case 1:
      aPart = parts[0];
      if(aPart.indexOf(':') > 0 ){
        return isTimePart(aPart);
      }else{
        return isDatePart(aPart);
      }
    default:
      return false;
  }
}

/***********************************************************************
 * 判断一个字符串是否为合法的日期格式：YYYY-MM-DD
 */
function isDatePart(dateStr){
  var parts;

  if(dateStr.indexOf("-") > -1){
    parts = dateStr.split('-');
  }else if(dateStr.indexOf("/") > -1){
    parts = dateStr.split('/');
  }else{
    return false;
  }

  if(parts.length < 3){
  //日期部分不允许缺少年、月、日中的任何一项
    return false;
  }

  for(i = 0 ;i < 3; i ++){
  //如果构成日期的某个部分不是数字，则返回false
    if(isNaN(parts[i])){
      return false;
    }
  }

  y = parseInt(parts[0]);//年
  m = parseInt(parts[1]);//月
  d = parseInt(parts[2]);//日

  if(y > 3000){
    return false;
  }

  if(m < 1 || m > 12){
    return false;
  }

  switch(d){
    case 29:
      if(m == 2){
      //如果是2月份
        if( (y / 100) * 100 == y && (y / 400) * 400 != y){
          //如果年份能被100整除但不能被400整除 (即闰年)
        }else{
          return false;
        }
      }
      break;
    case 30:
      if(m == 2){
      //2月没有30日
        return false;
      }
      break;
    case 31:
      if(m == 2 || m == 4 || m == 6 || m == 9 || m == 11){
      //2、4、6、9、11月没有31日
        return false;
      }
      break;
    default:

  }

  return true;
}

/***********************************************************************
 * 判断一个字符串是否为合法的时间格式：HH:MM:SS
 */
function isTimePart(timeStr){
  var parts;

  parts = timeStr.split(':');

  if(parts.length < 2){
  //日期部分不允许缺少小时、分钟中的任何一项
    return false;
  }

  for(i = 0 ;i < parts.length; i ++){
  //如果构成时间的某个部分不是数字，则返回false
    if(isNaN(parts[i])){
      return false;
    }
  }

  h = parts[0];//年
  m = parts[1];//月

  if( h < 0 || h > 23){
  //限制小时的范围
    return false;
  }
  if( m < 0 || h > 59){
  //限制分钟的范围
    return false;
  }

  if(parts.length > 2){
    s = parts[2];//日

    if( s < 0 || s > 59){
    //限制秒的范围
      return false;
    }
  }

  return true;
}