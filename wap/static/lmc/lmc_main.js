$(function(){
	var webim = getQueryVariable("webim");
	if(webim || webim == "true"){
		$("#reback").hide();
	}
	loadLmclList(true);
	window.setInterval(function () {
		loadLmclList(false);
	}, 60000);
	$(".type_span").on("click",function(){
		var cVal = $(this).html();
		var _cVal = "";
		$(".type_sel").each(function(){
			_cVal = $(this).html();
			$(this).removeClass("type_sel");
		});
		if(_cVal==cVal){
			return;
		}
		$(this).addClass("type_sel");
		if(cVal=="我要投注"){
			$("#betDiv").show();
			$("#betLogsDiv").hide();
			loadLmclList();
		}else{
			$("#betDiv").hide();
			$("#betLogsDiv").show();
			var _height = getQueryVariable("height");
			var height = 0;
			if(_height!=null){
				height = _height;
			}else{
				height = document.documentElement.clientHeight;	
				if(height==0){
					height = window.screen.availHeight - 42 - 50 - 90;
				}
			}
			$("#rows_log").css("height",(height-47)+"px");
			loadBetLogs();
		}
	});
	
	$("#moneySpan").on("click",function(){
		var css = $(this).attr("class")
		if(css.indexOf("money_hide")!=-1){
			$(this).removeClass("money_hide");
		}else{
			$(this).addClass("money_hide");
		}
		loadUserStatus();
	});
});

function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function loadLmclList(flag){
	var msg = null;
	if(flag){
		msg = layer.msg('努力加载中...', {icon: 16,shade: [0.5, '#f5f5f5'],scrollbar: false,time: 0});
	}
	$.ajax({
		type: 'get',
		url: '/v/lottery/all_game_lmcl_new?_t='+Date.parse(new Date()),
		dataType: 'json',
		success: function (response) {
			if(flag){
				layer.close(msg);
			}
			var html = "";
			for (var i = 0; i < response.length; i++) {
				 html+= genHtml(response[i]);
			}
			html += "<div  style=\"padding-bottom:345px;\"></div>";
			$("#rows").html(html);
			if(flag){
				//获取open数据
				getAllOpenInfo();
				loadUserStatus();
				timer();
				window.setInterval(function () {
					getAllOpenInfo();
					loadUserStatus();
				}, 10000);
			}
          	if(IsPC()){
            	$(".row_game_btn_0").off("click");
              	$(".row_game_btn_0").on("click",function(){
                  	onBindClick(flag,this);
              	});
            }else{
            	$(".row_game_btn_0").off("touchend");
				$(".row_game_btn_0").on("touchend",function(){
					onBindClick(flag,this);
				});
				$("body").off("touchend");
				$("body").on("touchend",function(){
					
				});
            }      
		},
		error: function (err) {
			if(flag){
				layer.close(msg);
			}
			layer.msg("获取长龙助手数据异常！");
		}
	});
}

//如果返回的是false说明当前操作系统是手机端，如果返回的是true则说明当前的操作系统是电脑端
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

function onBindClick(flag,obj){
	var css = $(obj).attr("class");
  var gameId = $($(obj).parent().parent().parent()[0]).attr("id");
  if(css.indexOf("row_game_fp") != -1){
    return;
  }
  $(".row_game_btn_0").each(function(){
    var _gameId = $($(this).parent().parent().parent()[0]).attr("id");
    if(gameId != _gameId){
      $(this).removeClass("row_game_btn_sel");
      $(this).find(".row_game_btn_rath").removeClass("row_game_btn_0_sel");
    }
  });

  $(obj).parent().parent().find(".row_game_btn_0").each(function(){
    var css = $(this).attr("class");
    if(css.indexOf("row_game_btn_sel")!=-1){
      $(this).removeClass("row_game_btn_sel");
      $(this).find(".row_game_btn_rath").removeClass("row_game_btn_0_sel");
    }
  });

  if(css.indexOf("row_game_btn_sel")!=-1){
    $(obj).removeClass("row_game_btn_sel");
    $(obj).find(".row_game_btn_rath").removeClass("row_game_btn_0_sel");
  }else{
    $(obj).addClass("row_game_btn_sel");
    $(obj).find(".row_game_btn_rath").addClass("row_game_btn_0_sel");
  }
  if(flag){
    calcMoney();
  }
}

function calcImgPosi(gameId){
	return - (46 * (gameId - 1));
}

var allOpenInfo = {};
var myTimer = null;
function timer() {
    myTimer = window.setInterval(function () {
    	if(allOpenInfo.length<=0){
    		return;
    	}

    	var serverTime = allOpenInfo["serverTime"];
    	for(var key in allOpenInfo){
    		if(key!="serverTime"){
    			$("#"+key+"_turn_num").html((allOpenInfo[key]["cur"]["turnNum"]==null ? "--" : allOpenInfo[key]["cur"]["turnNum"]+" 期"))
    			var str = "--";
    			if(allOpenInfo[key]["cur"]["status"]==0){
	    			var closeTime = allOpenInfo[key]["cur"]["closeTime"];
	    			var intDiff = parseInt((closeTime - serverTime) / 1000);
	    			if(intDiff<=0){
	    				allOpenInfo[key]["cur"]["status"] = 3;
	    			}
	    			else{
	    				str = getDiffM(intDiff);
	    				getNewGameLottery(key);
	    			}
    			}
    			
    			if(allOpenInfo[key]["cur"]["status"]!=0){
    				clearGameAll(key);
    				$("#"+key).find(".row_game_btn_0").each(function(){
    					$(this).addClass("row_game_fp");
    				});
    				$("#"+key).find(".row_game_btn_rath").each(function(){
    					$(this).addClass("row_game_fp");
    				});
    			}
    			else{
    				$("#"+key).find(".row_game_btn_0").each(function(){
    					$(this).removeClass("row_game_fp");
    				});
    				$("#"+key).find(".row_game_btn_rath").each(function(){
    					$(this).removeClass("row_game_fp");
    				});
    			}
    			
    			$("#"+key+"_time").html((allOpenInfo[key]["cur"]["status"]==0 ? str : (allOpenInfo[key]["cur"]["status"]==1 ? "封盘中" : (allOpenInfo[key]["cur"]["status"]==2 ? "已停用" : "开奖中") )));
    			$("#"+key+"_time").attr("style",(allOpenInfo[key]["cur"]["status"]!=0 ? "margin-top: -3px;float: right;padding:5px;font-size: 14px;" : "margin-top: -3px;float: right;padding:5px;color: #666;"));
    			if(allOpenInfo[key]["cur"]["status"]==1){
    				$("#"+key).hide();
    			}
    			else{
    				$("#"+key).show();
    			}
    		}

    		var date = new Date(serverTime);
    		date.setSeconds(date.getSeconds()+1);
    		allOpenInfo["serverTime"] = date.getTime();
		}
    }, 1000);
}

function getAllOpenInfo(){
	$.ajax({
		type: 'get',
		url: '/v/lottery/allOpenInfo?_t='+Date.parse(new Date()),
		dataType: 'json',
		success: function (response) {
			allOpenInfo = response;
		},
		error: function (err) {
		  layer.msg("获取长龙助手最新期号数据异常！");
		}
	});
}

function getDiffM(intDiff){
	var day = 0,
    hour = 0,
    minute = 0,
    second = 0;//时间默认值
	if (intDiff > 0) {
	    day = Math.floor(intDiff / (60 * 60 * 24));
	    hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
	    minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
	    second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
	}
	if (minute <= 9) minute = '0' + minute;
	if (second <= 9) second = '0' + second;
	var str = hour +":"+ minute +":" + second;
	return str;
}

function genHtml(game){
	var html = "<div class=\"row\" id='"+game.gameId+"'>"
	+"	<div class=\"row_game_title\">"
	+"		<img style=\"vertical-align: bottom;\" src=\"/page/game/img/"+game.gameCode+".png\" width=\"20px\" height=\"20px\">"
	+"		<span style=\"padding:5px;\" id='"+game.gameId+"_name'>"+game.gameName+"</span>"
	+"		<span style=\"margin-top: -3px;float: right;padding:5px;font-size: 14px;"+(game.open_time.cur.status!=0 ? "" : "color: #666;")+"\" id='"+game.gameId+"_time'>"+(game.open_time.cur.status==0 ? "--" : (game.open_time.cur.status==1 ? "封盘中" : (game.open_time.cur.status==2 ? "已停用" : "开奖中") ))+"</span>"
	+"		<span style=\"margin-top: -3px;float: right;padding:5px;color: #666;font-size: 14px;\" id='"+game.gameId+"_turn_num'>"+(game.open_time.cur.turnNum==null ? "--" : game.open_time.cur.turnNum+"期" )+"</span>"
	+"	</div>";
	var lmcls = game.lmcl;
	for (var i = 0; i < lmcls.length; i++) {
		html+="	<div class=\"row_game_content\">"
		+"		<div style=\"width: 120px;float:left;text-align: left;\">"
		+"			<div style=\"padding-bottom: 15px;\" id='"+game.gameId+"_type_name'>"
		+"				"+lmcls[i].name
		+"			</div>"
		+"			<div style=\"color: #fff;font-size: 12px;\">"
		+"				<span class=\"row_game_open_count\" id='"+game.gameId+"_"+lmcls[i].code+"_row_game_open_count'>"+(lmcls[i].lastTurnNum.length>4 ? (lmcls[i].lastTurnNum.substr(lmcls[i].lastTurnNum.length-4)):lmcls[i].lastTurnNum)+"</span>"
		+"				<span class=\"row_game_open_value\" id='"+game.gameId+"_"+lmcls[i].code+"_row_game_open_value'>"+lmcls[i].openValue+"</span>"
		+"				<span class=\"row_game_open_issue\" id='"+game.gameId+"_"+lmcls[i].code+"_row_game_open_issue'>"+lmcls[i].repeatCount+"期</span>"
		+"			</div>"
		+"		</div>";
		var types = lmcls[i].types;
		html+="		<div style=\"float:right;text-align: center;\">";
		for (var j = 0; j < types.length; j++) {
			var css = "";
			if(j+1==types.length){
				css = "margin-right:0px;";
			}
			html+="		<div class=\"row_game_btn_0 "+(game.open_time.cur.status!=0 ? "row_game_fp" : "")+" \" style='"+css+"' code='"+types[j].code+"' rebate='"+lmcls[i].rebate+"' model='"+lmcls[i].model+"' cateName='"+lmcls[i].cateName+"' minMoney='"+lmcls[i].minMoney+"' maxMoney='"+lmcls[i].maxMoney+"'>"
			+"				<span>"+types[j].openValue+"</span>"
			+"				<p class=\"row_game_btn_rath "+(game.open_time.cur.status!=0 ? "row_game_fp" : "")+"\">"+(types[j].curOdds == null ? lmcls[i].minOdds :  types[j].curOdds)+"</p>"
			+"			</div>";
		}
		html+="		</div>";
		html+="	</div>";
	}
	html+="</div>";
	return html;
}

function setValue(obj){
	$(obj).val($(obj).val().replace(/[^\d]/g,''));
	if($(obj).val().length>9){
		$(obj).val($(obj).val().substr(0,9));
	}
	calcMoney();
}
function calcMoney(){
	var inputMoney = $("#inputMoney").val();
	var maxMoney = 0;
	var selCount = 0;
	$(".row_game_btn_sel").find(".row_game_btn_rath").each(function(){
		var curOdds = $(this).html();
		maxMoney = parseFloat(maxMoney) + parseFloat(((curOdds - 1) * inputMoney));
		selCount++;
	});
	$("#maxMoney").html(maxMoney.toFixed(2));
	$("#selCount").html(selCount);
	$("#payMoney").html((selCount*inputMoney).toFixed(2));
}

function clearGameAll(gameId){
	$("#"+gameId).find(".row_game_btn_0").each(function(){
		$(this).removeClass("row_game_btn_sel");
		$(this).find(".row_game_btn_rath").removeClass("row_game_btn_0_sel");
	});
	calcMoney();
}

function clearAll(){
	$(".row_game_btn_0").each(function(){
		$(this).removeClass("row_game_btn_sel");
		$(this).find(".row_game_btn_rath").removeClass("row_game_btn_0_sel");
	});
	calcMoney();
}

function submitOk(){
	var html = "";
	var tzHtml = "";
	var gameId = "";
	var content = [];
	var betMoney = $("#inputMoney").val();
	
	if(betMoney <=0){
		layer.msg("请输入下注金额！");
		return;
	}
	
	$(".row_game_btn_sel").each(function(){
		gameId = $($(this).parent().parent().parent()[0]).attr("id");
		var typeName = $($(this).parent().parent().find("#"+gameId+"_type_name")[0]).html();
		var tzName = $($(this).find("span")[0]).html();
		var odds = $($(this).find(".row_game_btn_rath")[0]).html();
		if(tzHtml!=""){
			tzHtml += "，";
		}
		tzHtml += typeName+"-"+tzName;
		content.push({
			"betInfo":tzName,"betModel":0,"cateName":$(this).attr("cateName"),"code":$(this).attr("code"),
			"kyje":(betMoney*odds).toFixed(2),"money":1,"multiple":(parseFloat(betMoney)).toFixed(0),"odds":odds,"rebate":0,
			"totalMoney":(betMoney * 1).toFixed(2),"totalNums":1
		});
	});
	
	if(tzHtml.length<=0){
		layer.msg("请选择下注内容！");
		return;
	}
	
	var gameName = $("#"+gameId+"_name").html();
	var issue = $("#"+gameId+"_turn_num").html();
	html += "<span style='color:#666;'>"+gameName + "：</span>"+issue+"<br>";
	html += "<span style='color:#666;'>投注金额：</span><span style='color:#bf242a;'>￥"+betMoney+" 元</span><br>";
	html += "<span style='color:#666;'>投注内容：</span>"+tzHtml+"<br>";
	layer.confirm(html,{title:'投注确认'}, function(index){
		var data = {"gameId":gameId,"turnNum":issue.replace(" 期",""),"content":content};
		bet(data,index);
	});  
}

function bet(data,index){
	var msg = layer.msg('请稍候，正在下注中...', {icon: 16,shade: [0.5, '#f5f5f5'],scrollbar: false,time: 0});
	data = JSON.stringify(data);
	$.ajax({
		type: 'post',
		url: '/api/bet?_t='+Date.parse(new Date()),
		data:data,
		contentType:'application/json;charset=utf-8',
		dataType: 'json',
		success: function (response) {
			layer.close(msg);
			layer.close(index);
			layer.msg("恭喜您，下注完成！");
			clearAll();
		},
		error: function (err) {
			layer.close(msg);
			var m = JSON.parse(err);
			layer.msg(m.msg);
		}
	});
}

var page = 1;
var rows = 10;
var totalPage = 1;
function loadBetLogs(){
	var msg = layer.msg('努力加载中...', {icon: 16,shade: [0.5, '#f5f5f5'],scrollbar: false,time: 0});
	$.ajax({
		type: 'get',
		url: '/api/cp/records/todayList',
		data:{page:page,rows:rows},
		contentType:'application/json;charset=utf-8',
		dataType: 'json',
		success: function (response) {
			layer.close(msg);
			totalPage = response.totalCount%rows >0 ? parseInt(response.totalCount/rows)+1 : parseInt(response.totalCount/rows);
			var data = response.data;
			var gameNames = response.otherData.gameNames;
			var html = "";
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				var statusTxt = "";
				if(item.status==0 && item.canCancelOrder){
					statusTxt = "<span style=\"color:#2c77ba;\">可撤销</span>";
				}else if(item.status==0){
					statusTxt = "<span style=\"color:#908e8e;\">未开奖</span>";
				}else if(item.status==1 && item.result==0){
					statusTxt = "<span style=\"color:#e71010;\">未中奖</span>";
				}else if(item.status==1 && item.result==1){
					statusTxt = "<span style=\"color:#e71010;\">已派奖</span>";
				}else if(item.status==1 && item.result==2){
					statusTxt = "<span style=\"color:#908e8e;\">和局</span>";
				}else if(item.status==2){
					statusTxt = "<span style=\"color:#908e8e;\">撤销</span>";
				}else if(item.status==3){
					statusTxt = "<span style=\"color:#908e8e;\">删除</span>";
				}else if(item.status==4){
					statusTxt = "<span style=\"color:#908e8e;\">追号停止</span>";
				}
				html += "<div class=\"row_log\">"
					+"	<div class=\"row_list_f\">"
					+"		<div style=\"\">注单编号：<span style=\"\">"+item.orderNo+"</span></div>"
					+"	</div>"
					+"	<div class=\"row_list\">"
					+"		<div style=\"\">彩种：<span>"+gameNames[item.gameId].name+"</span></div>"
					+"	</div>"
					+"	<div class=\"row_list\">"
					+"		<div style=\"\">"+item.addTime+"</div>"
					+"	</div>"
					+"	<div class=\"row_list\">"
					+"		<div style=\"\">玩法：<span>"+item.cateName+"</span></div>"
					+"	</div>"
					+"	<div class=\"row_list\">"
					+"		<div style=\"\">奖期：<span>"+item.turnNum+"</span></div>"
					+"	</div>"
					+"	<div class=\"row_list\">"
					+"		<div style=\"\">投注金额：<span style=\"color:#599c22;\">"+item.totalMoney+"</span> 元</div>"
					+"	</div>"
					+"	<div class=\"row_list\">"
					+"		<div style=\"\">状态："+statusTxt+"</div>"
					+"	</div>"
					+"	<div class=\"row_list\">"
					+"		<div style=\"\">中奖金额：<span style=\"color:#e71010;\">"+item.reward+"</span> 元</div>"
					+"	</div>"
					+"	<div class=\"row_list\">"
					+"		<div style=\"\">用户：<span style=\"\">"+item.account+"</span></div>"
					+"	</div>"
					+"	<div class=\"row_list_f\">"
					+"		<div style=\"\">投注内容：<span style=\"\">"+item.betInfo+"</span></div>"
					+"	</div>"
					+"</div>";
			}
			html += "<div style=\"padding-bottom:110px;\"></div>";
			$("#rows_log").html(html);
		},
		error: function (err) {
			layer.close(msg);
			layer.msg("查询下注记录异常，请重试或联系客服！");
		}
	});
}

function setPage(p){
	if(p=="start"){
		page = 1;
	}else if(p=="end"){
		page = totalPage;
	}else{
		page = page + p;
		if(page<=0){
			page = 1;
		}else if(page>totalPage){
			page = totalPage;
		}
	}
	loadBetLogs();
}

function getNewGameLottery(gameId){
	$.ajax({
		type: 'get',
		url: '/v/lottery/getNewGameLmcl?_t='+Date.parse(new Date())+"&gameId="+gameId,
		contentType:'application/json;charset=utf-8',
		dataType: 'json',
		success: function (response) {
			for(var key in response){
				var lastTurnNum = response[key].lastTurnNum;
				lastTurnNum = (lastTurnNum>4 ? (lastTurnNum.substr(lastTurnNum.length-4)):lastTurnNum);
				var count = $("#"+gameId+"_"+response[key].code+"_row_game_open_count");
				if(count!=null){
					count.html(lastTurnNum);
				}
				var value = $("#"+gameId+"_"+response[key].code+"_row_game_open_value");
				if(value!=null){
					value.html(response[key].openValue);
				}
				var issue = $("#"+gameId+"_"+response[key].code+"_row_game_open_issue");
				if(issue!=null){
					issue.html(response[key].repeatCount+"期");
				}
			}
		},
		error: function (err) {
			layer.msg("获取游戏最新期号出现异常！");
		}
	});
}

function loadUserStatus(){
	var css = $("#moneySpan").attr("class");
	if(css.indexOf("money_hide")!=-1){
		$("#moneySpan").html("****");
	}else{
		$.ajax({
			type: 'get',
			url: '/api/user/status?_t='+Date.parse(new Date()),
			contentType:'application/json;charset=utf-8',
			dataType: 'json',
			success: function (response) {
				$("#moneySpan").html(response.money);
			},
			error: function (err) {
				layer.msg("获取用户状态异常！");
			}
		});
	}
}

