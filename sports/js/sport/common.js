var matchurl = 0; //足球单式
var time_bet = 10; //倒计时10秒
var match_time_id = time_id = 0;

//保留当前页面参数 sportType, type, page, legs, selection
var sport_type;
var sport_table_name;
var sport_legs;
var sport_selection;

var pd_full_or_half_flag = false; // false 全场,true上半场;


$(document).ready(function () {
    common.initTimeClock();
    getuserinfo()
    loadMatch('footBall', 'ft_ft_r', 1)
    $('.menu li').click(function () {
        sps = $(this).attr('id');
        if (sps == 'sps') {
            return false;//如果是赛果就不改变样式
        }
        order.cancelBet();
        $('.menu li').addClass('menuover_1');
        $(this).removeClass('menuover_1');
        $(this).addClass('menuover');
        $('.sportmenu').find('ul:first').find('li').removeClass('c2');
        $('.sportmenu').find('ul:first').find('li:first').addClass('c2');
        $('.sportmenu_').hide();
        $('.sportmenu_first').show();
    })
    $('.sportmenu').find('ul:first').find('li').click(function () {
        order.cancelBet();
        $('.sportmenu').find('ul:first').find('li').removeClass('c2')
        $(this).addClass('c2')
        d = $(this).attr('data')
        $('.sportmenu_').hide();
        $('#' + d).show();

    })
    $('.sportmenu_ li').click(function () {
        order.cancelBet();
        $('.sportmenu_ li').removeClass('c2')
        $(this).addClass('c2')
    })
    $(window).bind("resize", auto_wh);
    auto_wh();
    matchnum();
    matchNumFu();
    $('#closeNoLoginTipBtn').on('click', function () {
        $('#noLoginDialog').hide();
    })
    showMessage();
    loadBetedLogs();
    order.initBetConfig();
});

var common = function () {
    function dateFormat(date, format) {
        if (!date) {
            return ''
        }
        date = new Date(date);
        var map = {
            "M": date.getMonth() + 1, //月份
            "d": date.getDate(), //日
            "h": date.getHours(), //小时
            "m": date.getMinutes(), //分
            "s": date.getSeconds(), //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };

        format = format.replace(/([yMdhmsqS])+/g, function(all, t){
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            }
            else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    }
    var serviceTime, getServiceTimeTime;
    var loadTime = function () {
        $.ajax({
            url: '/api/sports/time',
            type: 'GET',
            success: function (data) {
                serviceTime = data.timestamp;
                getServiceTimeTime = new Date().getTime();
                setInterval(refreshTime, 1000);
            }
        })
    }, refreshTime = function () {
        $('#vlock').html(dateFormat(serviceTime + new Date().getTime() - getServiceTimeTime, "美东 yyyy/MM/dd hh:mm:ss"));
    }
    return {
        initTimeClock: loadTime
    }
}();

function sortMatch(){
	var sortselect = $("#sortOrder").val();
	loadMatch(sport_type, sport_table_name, 1,sport_legs,sortselect);
}

function matchnum() {
    $.get('/api/sports/matchNum', {}, function (d) {
        sitestatus(d)
        $.each(d, function (i, v) {
            $('#' + i).html(v)
        })
        setTimeout('matchnum()', 6000 * 2);
    }, 'json')
}
function matchNumFu() {
    $.get('/api/sports/matchNumFu', {}, function (d) {
        sitestatus(d)
        $.each(d, function (i, v) {
            $('#' + i).html(v)
        })
        setTimeout('matchNumFu()', 6000 * 2);
    }, 'json')
}
function log(k) {
}

function loadBetedLogs() {

    var tmp = {
        title :'<div class="gtitle">{{sportTypeName}}  {{betTypeName}}<span style="color:red; font-weight:bold;">{{betTeam}}</span>\
            [<span style="color:red; font-weight:bold;">¥{{money.toFixed(2)}}</span>]</div>',
        data:'<div class="gsum">\
        <div class="order-item" style="text-align:left;">\
        {{datetime}}<br>\
        {{if sportsType == 18}}<font color="red">{{retimeset}}({{score_h}} - {{score_c}})</font>{{/if}}	\
        {{league}}<br>\
        <span style="color:blue;">[{{gnumh}}]</span> : <span style="color:blue;">[{{gnumc}}]</span><br>\
    {{if betTypeName == "让球" || betTypeName == "半场让球"}}{{if strong}}{{team_h}}{{/if}}{{if !strong}}{{team_c}}{{/if}}{{/if}}\
    {{if betTypeName != "让球" && betTypeName != "半场让球"}}{{team_h}}{{/if}}\
    <b style="color:red;">\
    {{if betTypeName == "让球" || betTypeName == "半场让球"}}{{ratio}}{{/if}}\
    {{if betTypeName != "让球" && betTypeName != "半场让球"}}VS.{{/if}}\
    </b> \
    {{if betTypeName == "让球" || betTypeName == "半场让球"}}{{if strong}}{{team_c}}{{/if}}{{if !strong}}{{team_h}}{{/if}}{{/if}}    \
    {{if betTypeName != "让球" && betTypeName != "半场让球"}}{{team_c}}{{/if}}\
    <br>\
        <font color="#CC0000"> {{ratioTeam}} {{ratio}}</font> @ <font color="#CC0000"><b> {{odds}} </b></font><br></div>\
        </div>',
          has_chuan_data:'<div class="gsum" style="margin-bottom: 0px;border-bottom: 0px;">\
        <div class="order-item" style="text-align:left;">\
        {{datetime}}<br>\
        {{league}}<br>\
        <span style="color:blue;">[{{gnumh}}]</span> : <span style="color:blue;">[{{gnumc}}]</span><br>\
        {{if chuanBetTypeName == "让球" || chuanBetTypeName == "半场让球"}}{{if strong}}{{team_h}}{{/if}}{{if !strong}}{{team_c}}{{/if}}{{/if}}    \
        {{if chuanBetTypeName != "让球" && chuanBetTypeName != "半场让球"}}{{team_h}}{{/if}}\
    <b style="color:red;">\
    {{if chuanBetTypeName == "让球" || chuanBetTypeName == "半场让球"}}{{ratio}}{{/if}}\
    {{if chuanBetTypeName != "让球" && chuanBetTypeName != "半场让球"}}VS.{{/if}}\
    </b> \
    {{if chuanBetTypeName == "让球" || chuanBetTypeName == "半场让球"}}{{if strong}}{{team_c}}{{/if}}{{if !strong}}{{team_h}}{{/if}}{{/if}}\
    {{if chuanBetTypeName != "让球" && chuanBetTypeName != "半场让球"}}{{team_c}}{{/if}}\
    <br>\
        <font color="#CC0000"> {{ratioTeam}} </font> @ <font color="#CC0000"><b> {{odds}} </b></font><br></div>\
        </div>',
          chuan_data:'<div class="gsum" style="border-top: none;border-bottom: 0px;margin-top:0px;margin-bottom:0px;">\
        	  <hr class="hr1"/><div class="order-item" style="text-align:left;">\
        {{league}}<br>\
        <span style="color:blue;">[{{gnumh}}]</span> : <span style="color:blue;">[{{gnumc}}]</span><br>\
    {{if chuanBetTypeName == "让球" || chuanBetTypeName == "半场让球"}}{{if strong}}{{team_h}}{{/if}}{{if !strong}}{{team_c}}{{/if}}{{/if}}\
    {{if chuanBetTypeName != "让球" && chuanBetTypeName != "半场让球"}}{{team_h}}{{/if}}\
    <b style="color:red;">\
    {{if chuanBetTypeName == "让球" || chuanBetTypeName == "半场让球"}}{{ratio}}{{/if}}\
    {{if chuanBetTypeName != "让球" && chuanBetTypeName != "半场让球"}}VS.{{/if}}\
    </b> \
    {{if chuanBetTypeName == "让球" || chuanBetTypeName == "半场让球"}}{{if strong}}{{team_c}}{{/if}}{{if !strong}}{{team_h}}{{/if}}{{/if}}\
    {{if chuanBetTypeName != "让球" && chuanBetTypeName != "半场让球"}}{{team_c}}{{/if}}\
    <br>\
        <font color="#CC0000"> {{ratioTeam}} </font> @ <font color="#CC0000"><b> {{odds}} </b></font><br></div>\
        </div>',
        chuan_end_data:'<div class="gsum" style="border-top: none;margin-top:0px;">\
        	<hr class="hr1"/><div class="order-item" style="text-align:left;">\
        {{league}}<br>\
        <span style="color:blue;">[{{gnumh}}]</span> : <span style="color:blue;">[{{gnumc}}]</span><br>\
    {{if chuanBetTypeName == "让球" || chuanBetTypeName == "半场让球"}}{{if strong}}{{team_h}}{{/if}}{{if !strong}}{{team_c}}{{/if}}{{/if}}\
    {{if chuanBetTypeName != "让球" && chuanBetTypeName != "半场让球"}}{{team_h}}{{/if}}\
    <b style="color:red;">\
    {{if chuanBetTypeName == "让球" || chuanBetTypeName == "半场让球"}}{{ratio}}{{/if}}\
    {{if chuanBetTypeName != "让球" && chuanBetTypeName != "半场让球"}}VS.{{/if}}\
    </b> \
    {{if chuanBetTypeName == "让球" || chuanBetTypeName == "半场让球"}}{{if strong}}{{team_c}}{{/if}}{{if !strong}}{{team_h}}{{/if}}{{/if}}\
    {{if chuanBetTypeName != "让球" && chuanBetTypeName != "半场让球"}}{{team_c}}{{/if}}\
    <br>\
        <font color="#CC0000"> {{ratioTeam}} </font> @ <font color="#CC0000"><b> {{odds}} </b></font><br></div>\
        </div>'
    };

    $.get('/api/sports/queryBetByNotSettled', {}, function (d) {
        var html = "";
        if(d == null){
            html = "您没有未结算的交易";
        }else{
            $("#bethistory").css("padding-top","0px");
            html +='<div id="rec5_div" style="background-color: rgb(227, 207, 170);left: 0px;top: 0px;">';
            $(d).each(function(i,bet){
                var title ='', data = '',chuanData='',chuanEndData = '';
              title = template.compile(tmp.title);

                if(bet.chuans && bet.chuans.length > 0){
                  data = template.compile(tmp.has_chuan_data);
                  chuanData = template.compile(tmp.chuan_data);
                  chuanEndData = template.compile(tmp.chuan_end_data);
                }else{
                  data = template.compile(tmp.data);
                }

                html +=title(bet)+data(bet);
                if(bet.chuans.length > 0){
                    $(bet.chuans).each(function (x, chuan) {
                        if(bet.chuans.length -1 == x){
                            html += chuanEndData(chuan);
                        }else{
                          html+= chuanData(chuan);
                        }
                    })
                }
            });
            html +='</div>';
        }
        $("#bethistory").html(html);
    }, 'json');
    $("#bethistory").hide();
}

function updateBetsLog(bet){
    var tmp = {
        title :'<div class="gtitle">{{sportTypeName}} {{betTypeName}} <span style="color:red; font-weight:bold;">{{betTeam}}</span>\
            [<span style="color:red; font-weight:bold;">¥{{money}}</span>]</div>',
        data:'<div class="gsum">\
        <div class="order-item" style="text-align:left;">\
        {{datetime}}<br>\
        {{league}}<br>\
        <span style="color:blue;">[{{gnumh}}]</span> : <span style="color:blue;">[{{gnumc}}]</span><br>\
    {{team_h}}<b style="color:red;">VS.</b> {{team_c}}<br>\
        <font color="#CC0000"> {{ratioTeam}} </font> @ <font color="#CC0000"><b> {{odds}} </b></font><br></div>\
        </div>'
    };
    var html ="";
    var title = template.compile(tmp.title),
        data = template.compile(tmp.data);
    html += title(bet) + data(bet);


   var optDiv =  document.getElementById("rec5_div"),
       innerPreHtml = optDiv.innerHTML;
  html = html + innerPreHtml;
    showRec();
    optDiv.innerHTML = html;

}


function getAccountHistory(page,spty){
    var ht = $("#history-type"),
    value = parseInt(ht.val());
    $("#tablename").html("账户历史摘要");
    clearTimeout(match_time_id);
    $("#full_half").hide();
    $("#data-account-history").remove();
    $(".account-his-title").remove();
    $(".history-none").remove();

    $("#data-bet-logs").remove();
    if(typeof spty == 'undefined'){
        spty = -1;
    }
    if(typeof page == 'undefined') {
        page = 1;
    }
    var tp = {
        title:'<table class="account-his-title">\
        <tbody><tr>\
        <td>按体育查看记录<select id="history-type" onchange="getAccountHistory(1,this.value)">\
            <option  value="-1" >所有</option>\
            <option  value="0" >足球</option>\
            <option  value="1" >篮球</option>\
        </select>\
        </td>\
            </tr>\
            </tbody></table> ',
        header:'<div id="gameTableContent" style="">\
        <table class="gameW result olist" cellpadding="0" cellspacing="0" border="0">\
            <thead>\
            <tr>\
            <td align="center">日期</td>\
            <td width="100" align="center">投注额</td>\
            <td width="100" align="center">有效金额</td>\
            <td width="100" align="center">退水</td>\
            <td width="100" align="center">派彩结果</td>\
            </tr>\
            </thead>\
            <tbody>',
        tr:'<tr class="{{eo}} TrBgOdd" >\
            <td style="height:30px;" align="center">\
        	<a style="color: #222; font-weight: normal;" target="mainFrame" href="javascript:;" onclick="getAccountHistoryDetail('+spty+',&quot;{{settledDate}}&quot;)">{{date}}</a></td>\
        <td width="100" align="center">{{money}}</td>\
        <td width="100" align="center">{{realMoney}}</td>\
        <td width="100" align="center">{{returnMoney}}</td>\
        <td width="100" align="center" style="color:{{pcc}};">{{pc}}</td>\
        </tr>',
        trEmpty:'<tr class="{{eo}} TrBgOdd" >\
            <td style="height:30px;" align="center">{{date}}</td>\
        <td width="100" align="center">-</td>\
        <td width="100" align="center">-</td>\
        <td width="100" align="center">-</td>\
        <td width="100" align="center">-</td>\
        </tr>',
        foot:'</tbody></table></div>'
    },
        renderHistory = function(data){
            hideMainBetOperationArea();
            
            var html = '<div id="data-account-history" style="overflow: auto;overflow-y: auto;">';
            html +=tp.header;
            $.each(data,function(i,v){
                if(i % 2 == 0){
                    v.eo = 'odd';
                }else{
                    v.eo = 'even1';
                }
                if(v.pc >= 0 ){
                    v.pcc='green';
                }else{
                    v.pcc = 'red';
                }
                //下注金额为0则无数据
                if(v.money!=0){
                	html += template.compile(tp.tr)(v);
                }else{
                	html += template.compile(tp.trEmpty)(v);
                }
                
            });
            html +=tp.foot;
            html += "</div>";
            html = tp.title+html;
            render(html);
        },
        render = function(html){
            $("#box_mid").append(html)
        };

    $.ajax({
        url: '/api/sports/loadAccountHistory?sportType='+spty+'&page='+page,
        type: 'GET',
        success: function (data) {
        	renderHistory(data);
        	
            var n = 0;
            switch (value) {
                case -1:
                    n = 0;
                    break;
                case 0:
                    n = 1;
                    break;
                case 1:
                    n = 2;
                    break;
            }
            $("#history-type").children().eq(n).prop('selected',true);
        },
        error:apiErrorHandler
    })

}

//查询历史账户下注记录详细信息
function getAccountHistoryDetail(spty,queryTime){
	$("#tablename").html("账户历史");
	clearTimeout(match_time_id);
	$("#full_half").hide();
	$("#data-account-history").remove();
	$(".account-his-title").remove();
    $(".history-none").remove();
    $("#right_sport_main").css({
        'overflow': "auto"
    });
    
	var tp = {
        title:'<table class="account-his-title">\
        <tbody><tr><td>&nbsp;</td></tr></tbody></table>',
        header:'<div id="data-account-history"><div id="gameTableContent"><table class="gameW result olistW" cellpadding="0" cellspacing="0" border="0">\
            <thead>\
            <tr>\
            <td width="100">交易时间</td>\
            <td width="100">方式</td>\
            <td>内容</td>\
            <td width="80">投注金额</td>\
            <td width="80">可赢金额</td>\
            <td width="80">输赢状态</td>\
            <td width="60">返水</td>\
        	<td width="80">派彩结果</td>\
            </tr>\
            </thead>\
            <tbody>',
        tr:'<tr class="{{eo}} TrBgOdd">\
            <td>NO：{{orderID}}<br>{{createDate | dateFormat:\'MM月dd日\'}}<br>{{createDate | dateFormat:\'hh:mm:ss\'}}<br>\
        		{{if status==1}}<font color="red">注单取消</font>{{/if}}</td>\
        	<td>{{typeSport}}<br>{{if sportsType!=2 && sportsType!=4 && sportsType!=8 && sportsType!=14}}\
        		{{typeOdds}}<br><span style="color:red">{{typeSelection}}</span>{{/if}}\
        		<br>{{if sportsType == 2 || sportsType == 4 || sportsType == 8 || sportsType == 14}}<font color="red">{{listChuan.length +1}}串1</font>{{/if}}\
        		</td>\
        	<td><div style="text-align:left;margin: 10px;">\
        		{{start | dateFormat:\'MM-dd hh:mm\'}}{{if sportsType == 18}}&nbsp;&nbsp;<font color="red">{{retimeset}}({{score_h}} - {{score_c}})</font>{{/if}}<br>{{league}}<br>\
        		{{if runTail}}\
                <span style="color: blue">\
        		{{if strong==1}}[{{gnum_h}}]{{/if}}{{if strong==0}}[{{gnum_c}}]{{/if}}:\
                {{if strong==0}}[{{gnum_h}}]{{/if}}{{if strong==1}}[{{gnum_c}}]{{/if}}\
                </span><br>\
        		{{if strong==1}}{{team_h}}{{/if}}{{if strong==0}}{{team_c}}{{/if}}\
        		{{if ratio}}<span style="color: red">{{ratio}}</span>{{/if}}\
        		{{if ratio==null}}<span style="color: red">VS.</span>{{/if}} \
        		{{if strong==0}}{{team_h}}{{/if}}{{if strong==1}}{{team_c}}{{/if}}<br>\
        		{{else}}\
        		 <span style="color: blue">[{{gnum_h}}]:[{{gnum_c}}]</span><br>\
                {{team_h}} <span style="color: red">VS.</span>{{team_c}}<br>\
        		{{/if}}\
        		<span style="color: red">{{optionInfo}}</span> @<span style="color: red"> {{odds}}</span><br>\
        		{{if rscore_h!=null && rscore_c!=null}}\
        		<table style="font-weight:bold" class="order-result"><tbody>\
        		<tr>\
        			<td>\
        			{{if sportsType > 5}}{{if isHalf == 0}}全场{{/if}}{{if isHalf == 1}}半场{{/if}}{{/if}}\
        			{{if sportsType < 6}}{{if sectionType !=null}}{{nowSection}}{{/if}}{{/if}}\
        			<td>\
        			<td>{{team_h}}</td>\
        			<td style="color:blue;font-weight:900;">{{if rscore_h==-1}}赛事取消{{/if}}{{if rscore_h!=-1}}{{rscore_h}}-{{rscore_c}}{{/if}}\
        			</td>\
        			<td>{{team_c}}</td>\
        		</tr></tbody></table>{{/if}}\
        		</div><hr>\
	        	{{each listChuan as value index}}\
        			<div style="text-align:left;margin: 10px;">\
        			{{value.start | dateFormat:\'MM-dd hh:mm\'}}<br>{{value.league}}<br><span style="color: blue">[{{value.gnum_h}}]:[{{value.gnum_c}}]</span><br>\
        			{{value.team_h}}{{if value.ratio}}<span style="color: red">{{value.ratio}}</span>{{/if}}\
        			{{if value.ratio==null}}<span style="color: red">VS.</span>{{/if}}{{value.team_c}}<br>\
        			<span style="color: red">{{value.optionInfo}}</span>@<span style="color: red"> {{value.odds}}</span><br>\
        			{{if value.rscore_h!=null && value.rscore_c!=null}}\
        			<table style="font-weight:bold" class="order-result"><tbody><tr>\
        				<td>\
        				{{if value.sportsType > 5}}{{if value.isHalf == 0}}全场{{/if}}{{if value.isHalf == 1}}半场{{/if}}{{/if}}\
        				{{if value.sportsType < 6}}{{if value.sectionType !=null}}{{value.nowSection}}{{/if}}{{/if}}\
        				<td>\
        				<td>{{value.team_h}}</td>\
        				<td style="color:blue;font-weight:900;">{{if value.rscore_h==-1}}赛事取消{{/if}}{{if value.rscore_h!=-1}}{{value.rscore_h}}-{{value.rscore_c}}{{/if}}\
        				</td>\
        				<td>{{value.team_c}}</td>\
        			</tr></tbody></table>{{/if}}\
        			</div><hr>\
        		{{/each}}\
        	</td>\
        	<td>{{money}}</td>\
        	<td>{{canWin}}</td>\
        	<td>{{if resultStatus == 0}}打平{{/if}}{{if resultStatus == 1}}全赢{{/if}}{{if resultStatus == 2}}赢一半{{/if}}{{if resultStatus == 3}}全输{{/if}}{{if resultStatus == 4}}输一半{{/if}}</td>\
	        <td>{{returnMoney}}</td>\
	        <td style="color:{{pcc}};">{{result}}</td>\
	        </tr>',
        foot:'</tbody></table></div></div>'
    },
	    renderHistoryDetail = function(data){
	        hideMainBetOperationArea();
	        var html =tp.header;
	        $.each(data,function(i,v){
	            if(i % 2 == 0){
	                v.eo = 'odd';
	            }else{
	                v.eo = 'even1';
	            }
	            if(v.result >= v.money ){
	                v.pcc='green';
	            }else{
	                v.pcc = 'red';
	            }
	            v.result = (v.result-v.money).toFixed(2);
	            //滚球篮球获取节数
	            if(v.sectionType !=null){
	            	v.nowSection = nowSection(v.sectionType);
	            }
	            //滚球篮球串获取节数
	            if(v.listChuan !=null && v.listChuan.length > 0){
            		for(var i=0;i<v.listChuan.length;i++){
            			if(v.listChuan[i].sectionType !=null && v.listChuan[i].sectionType !=7){
            				v.listChuan[i].nowSection = nowSection(v.listChuan[i].sectionType);
            			}
	            	}
	            }
	            
	            html += template.compile(tp.tr)(v);
	        });
	        html +=tp.foot;
	        html = tp.title+html;
	        render(html);
    	},
	    render = function(html){
	        $("#box_mid").append(html);
	    };

	$.ajax({
	    url: '/api/sports/loadAccountHistoryDetail?date='+queryTime+'&sportType='+spty,
	    type: 'GET',
	    success: function (data) {
	    	renderHistoryDetail(data);
	    },
	    error:apiErrorHandler
	});
}

function nowSection(sectionType){
	var retstr = "";
    if(sectionType !=null){
        switch (sectionType){
            case 0:
                retstr = "第一节 ";
                break;
            case 1:
                retstr = "第二节";
                break;
            case 2:
            	retstr = "上半场";
            	break;
            case 3:
                retstr = "第三节";
                break;
            case 4:
                retstr = "第四节";
                break;
            case 5:
            	retstr = "下半场";
            	break;
            case 6:
                retstr = "加时赛";
                break;
            case 7:
                retstr = "全场";
                break;
        }
        return retstr;
    }
}

function showNoLoginTip() {
    $('#noLoginDialog').show();
}

function redirectTo(url) {
    top.location.href = url;
}

function apiErrorHandler(response) {
    var result = JSON.parse(response.responseText);
    if (result && result.code) {
        switch (result.code) {
            case 'UC/TOKEN_INVALID':
                showNoLoginTip();
                break;
            default:
                var errorMsg = result.msg || '发生错误了';
                alert(errorMsg);
                break;
        }
    }
}

function sport_menu(obj) {
    $('.sportmenu').hide();
    $('.sportmenu .sportmenu_:first ,.sport_' + obj).show();
    if (obj == 'today')
        loadMatch('footBall', 'ft_ft_r', 1)
    else if (obj == 'morning')
        loadMatch('footBall', 'ft_fu_r', 1)
    else if (obj == 'grounder')
        loadMatch('footBall', 'ft_rb_re', 1)
    else if (obj == 'amidithion')
        refresh(411, 0);
}


function formatNumber(num, exponent) {
    if (num != 0) {
        num = parseFloat(num).toFixed(exponent);
        if (num < 0)
            num = "<font color='#006633'>" + num + "</font>";
        return num;
    } else {
        return '';
    }
}

window.onscroll = function () {
    auto_wh()
}
$(function () {
    $("#selectAll").click(function () { //全选  
        $("#legname_data_load :checkbox").attr("checked", true);
        $("#legname_data_load :checkbox").prop("checked", true);
    });

    $("#unSelect").click(function () { //全不选  
        $("#legname_data_load :checkbox").attr("checked", false);

    });

    $("#reverse").click(function () { //反选  
        $("#legname_data_load :checkbox").each(function () {
            c = $(this).is(':checked');
            if (c == true) {
                c = false;
                $(this).attr("checked", c);
                $(this).removeAttr("checked");
            }
            else {
                c = true;
                $(this).prop("checked", c);
                $(this).attr("checked", 'checked');
            }

        });
    });
});

function auto_wh() {

    h = $(window).height();
    w = $(window).width();
    scrollTop = $(window).scrollTop();
    header_h = $('.header').height();
    $(".left").height(h - header_h - 1)
    $("#right").height(h - header_h - 1)
    $("#right").width(w - $("#left").width()-10)
    $("#right_sport_main").height(h - header_h - 75 + scrollTop);

    $("#data").height(h - header_h - 130)
    $("#data-bet-logs").height(h - header_h - 100)
    $("#data-result").height(h - header_h - 100)
    $("#right_sport_main").css({
        'z-index': 11000
    })
}

function showOrder() {
    $('#order_button').removeClass('ord_btn');
    $('#order_button').addClass('ord_on');
    $('#record_button').removeClass('record_on');
    $('#record_button').addClass('record_btn');
    $('#bet_login_out,#bethistory').stop();
    $('#bet_login_out').fadeIn(500);
    $('#bethistory').hide();
}

function showRec() {
    $('#order_button').removeClass('ord_on');
    $('#order_button').addClass('ord_btn');
    $('#record_button').removeClass('record_btn');
    $('#record_button').addClass('record_on');
    $('#bet_login_out,#bethistory').stop();
    $('#bethistory').fadeIn(500);
    $('#bet_login_out').hide();
}

function checkUid() {

    if ($('#userName').html() != '你好，请先登录！') {
        return true;
    } else return false;
}
function sitestatus(d) {
    if (d.sitestatus) {
        window.top.frames.location.href = d.sitestatus;
        return false;
    }
}
var getuserinfo_time_id = null;

function getuserinfo_auto() {

    clearTimeout(getuserinfo_time_id);
    getuserinfo();
    getuserinfo_time_id = setTimeout('getuserinfo_auto()', 15000);
}
// getuserinfo_auto();

function getuserinfo() {
    $.ajax({
        url: '/api/user/info',
        dataType: 'json',
        type: 'GET',
        // async: false, //改为同步请求，拿到用户信息再进行其他的请求
        cache: false,
        success: function (response) {
            if (response.userInfo) {
                $('#userName').html(response.userInfo.account);
                $('#user_money').html(response.extInfo.money.toFixed(2));
            } else {
                $('#user_money').html('0.00');
                $('#userName').html('你好，请先登录！');
            }
        }
    });
}

function loading(obj) {
    //  $(obj).html("<div class='loading'>数据加载中...</div>");
    $("#load_alpha").show()
    header_h = $('.header').height();
    var x = $('#right_sport_main').position().top;
    var y = $('#right_sport_main').position().left;
    log(x + '-' + y);
    $("#load_alpha").css({
        top: x,
        left: y,
        width: $("#right").width(),
        height: $("#right").height() - 60
    })
}

function loadMoreMatch() {
	loadMatch(sport_type, sport_table_name, $("#legpage").val(),sport_legs,sport_selection);
   // loadMatch(sport_type, sport_table_name, $("#legpage").val());
}

function loadMoreBetInfo() {


    showBetInfo($("#betpage").val());
}

var lastData, lastDataType;


function startRefresh(i,time_match, time_match_) {
    var t1 = arguments[1]?arguments[1]:120;
    var t2 = arguments[2]?arguments[2]:120;
    refreshmatch(t1, t2);
    if(!i)
    loadMatch(sport_type,sport_table_name,1,sport_legs,sport_selection);
}

var showMainBetOperationArea = function () {
        $("#data-bet-logs").remove();
        $("#data-account-history").remove();
        $(".history-none").remove();
        $("#history-type").remove();
        $("#data-result").remove();
        $(".account-his-title").remove();
        $(".datatop").show();
        $("#data").show();
    },
    hideMainBetOperationArea = function () {
        $(".datatop").hide();
        $("#data").hide();
        $(".account-his-title").remove();
        $("#data-account-history").remove();
        $(".history-none").remove();
        $("#data-bet-logs").remove();
        $(".result-none").remove();
        $("#gameTableContent").remove();
        $("#data-result").remove();
    };



function showBetInfo(page) {
    $("#data-bet-logs").remove();
    $(".history-none").remove();
    var noData = function () {
        var html = '<table class=\'game\'><tr><td colspan=\'7\' class=\'b_1st\'>无下注数据</td></tr></table>'
        setHtml(html)
    }
    var setHtml = function (html) {
        hideMainBetOperationArea();
        $("#box_mid").append(html)

    }

    var templateTitle = '<tr >\
                      <th with = "2%">编号</th>\
                      <th with = "15%">注单号/投注日期</th>\
                      <th with = "10%">投注类型</th>\
                      <th with = "15%">选项</th>\
                      <th with = "5%">投注额</th>\
                      <th with = "5%">可赢金额</th>\
                      <th with = "5%">注单状态</th>\
                      </tr>\
                        ';
    var templateData =  '<tr> \
                <td>{{index}}</td>\
                <td>{{orderID}}<br>{{createDate | dateFormat:\'MM月dd日,hh:mm\'}}</td>\
                <td>{{typeSport}}<br>{{typeOdds}}<br>{{if sportsType == 2 || sportsType == 4 || sportsType == 8 || sportsType == 14}}<font color="red">{{listChuan.length +1}}串1</font>{{/if}}</td>\
                <td>{{league}}{{if sportsType == 18}}&nbsp;&nbsp;<font color="red">{{retimeset}}({{score_h}} - {{score_c}})</font>{{/if}}\
                <br>\
                {{if runTail}}\
                {{if strong}}{{team_h}}{{/if}}\
                {{if !strong}}{{team_c}}{{/if}}\
                <span style="color: #f90000">{{ratio}}</span>\
                {{if strong}}{{team_c}}{{/if}}\
                {{if !strong}}{{team_h}}{{/if}}\
                <br>\
                <span style="background-color: #e5c89d">\
                 {{if sportsType > 5}}{{if isHalf == 0}}全场{{/if}}{{if isHalf == 1}}半场{{/if}}{{/if}}\
                 {{if sportsType < 6}}\
                 {{sectionType}}\
                 {{/if}}\
                </span>&nbsp;\
                <span style="color: red">{{optionInfo}}</span>@<span style="color: red"> {{odds}}</span>\
                {{else}}\
                    {{team_h}}vs.{{team_c}}\
                    <br>\
                    <span style="background-color: #e5c89d">\
                    {{if sportsType > 5}}{{if isHalf == 0}}全场{{/if}}{{if isHalf == 1}}半场{{/if}}{{/if}}\
                    {{if sportsType < 6}}\
                    {{sectionType}}\
                    {{/if}}\
                    </span>&nbsp;\
                    <span style="color: red">{{optionInfo}}</span>@<span style="color: red"> {{odds}}</span>\
                {{/if}}\
                {{each listChuan as value index}}\
                <div class="bet-line"></div>\
                 {{if value.runTail}}\
                   {{if value.strong}}{{value.team_h}}{{/if}}\
                   {{if !value.strong}}{{value.team_c}}{{/if}}\
                   <span style="color: red">{{value.ratio}}</span>\
                   {{if value.strong}}{{value.team_c}}{{/if}}\
                   {{if !value.strong}}{{value.team_h}}{{/if}}\
               {{else}}\
                    {{value.team_h}}vs.{{value.team_c}}\
               {{/if}}\
               <br>\
               <span style="background-color: #e5c89d">\
                {{if value.sportsType > 5}}{{if value.isHalf == 0}}全场{{/if}}{{if value.isHalf == 1}}半场{{/if}}{{/if}}\
                {{if value.sportsType < 6}}\
                {{value.sectionType}}\
                {{/if}}\
                </span>&nbsp;\
               <span style="color: red">{{value.optionInfo}}</span>@<span style="color: red"> {{value.odds}}</span>\
               \
                {{/each}}\
              </td>\
                <td>{{money}}</td>\
                <td>{{canWin}}</td>\
                <td>{{strStatus}}</td>\
            </tr>\
        '

    var tableTitle = '<table class="bet-record">'
    var renderHtml = function (data) {
        var matchRender = template.compile(templateData);
        var rowHtml;
        var result = tableTitle+templateTitle;
        $.each(data, function (index, data) {
            var str = "";
            if(data.status == 0){
                str = "正常";
            }else if (data.status == 6) {
                str = "待确认";
            }else if (data.status == 7){
                str = "已确认";
            }else if (data.status == 21) {
                str = "待结算";
            }else if (data.status == 1) {
                str = "已取消"
            }
            if(data.sportsType < 6) {
                data.sectionType = nowSection(data.sectionType)
                if(data.listChuan !=null && data.listChuan.length > 0){
                    for(var i=0;i<data.listChuan.length;i++){
                        if(data.listChuan[i].sectionType !=null){
                            data.listChuan[i].sectionType = nowSection(data.listChuan[i].sectionType);
                        }
                    }
                }
            }
            data.strStatus = str;
            data.index = ++index;
            rowHtml = matchRender(data);
            result+=rowHtml;
        })
        result += "</table>"
        result = '<div id="data-bet-logs" style="overflow: auto;overflow-y: auto;">'+result+'</div>';
        return result;
    }

    $.ajax({
        url: '/api/sports/queryBet',
        type: 'GET',
        cache: false,
        dataType: 'JSON',
        data: {page: page, size: 30},
        success: function (data) {
            setHtml(renderHtml(data.ordersBases));
            betInfoPages(data.totalPage,data.curPage);
        },
        error: apiErrorHandler
    })
    // setHtml(renderHtml(1))

}

function loadMatch(sportType, type, page, legs, selection) {

    if (type == 'ft_fu_r' || type == 'ft_fu_t' || type == 'ft_fu_pd' || type == 'ft_fu_p3' || type == 'ft_fu_hpd' || type == 'ft_fu_f' || type == 'bk_fu_p3' || type == 'bk_fu_all') {
        $.get('/api/sports/matchNumFu', {}, function (d) {
            sitestatus(d)
            $.each(d, function (i, v) {
                $('#' + i).html(v)
            })
        }, 'json');
    } else {
        $.get('/api/sports/matchNum', {}, function (d) {
            sitestatus(d)
            $.each(d, function (i, v) {
                $('#' + i).html(v)
            })
        }, 'json');
    }

    showMainBetOperationArea();
    //如果不是滚球，则隐藏滚球区域信息
    if(type){
        // if(type=='ft_rb_re' || type=='bk_rb_re') {
        //   $("#gqArea").show();
        // }else{
        //   $("#gqArea").hide();
        // }
    }

    var _legs = arguments[3] ? arguments[3] : "";
    var _selection = arguments[4] ? arguments[4] : -1;
    sport_type = sportType;
    sport_table_name = type;
    sport_legs = legs;
    sport_selection = selection;
    var noData = function (tableName) {
        var html = '<table class=\'game\'><tr><td colspan=\'7\' class=\'b_1st\'>您选择的项目暂时没有赛事，请修改您的选项或迟些再返回。</td></tr></table>'
        setHtml(html, tableName)
    }
    var error = function (message, tableName) {
        message = message || '数据加载错误 :加载超时,请重试!'
        var html = "<table class='game'><tr><td colspan='7' class='b_1st'>" + message + "</td></tr></table>";
        setHtml(html, tableName)
    }
    var setHtml = function (html, tableName) {
        $('#tableref').removeClass('tablerefon');
        $('#tableref').addClass('tableref');
        $('#data').html(html)
        $('#tablename').html(tableName);
        if(sportType === 'basketball' && (type==='bk_ft_all' || type=='bk_fu_all')){
            bindSelection(_selection);
        }
    }
    $('#tableref').addClass('tablerefon');
    var defaultLeagueTemplate = '<tr> \
                <td colspan="{{columnsNum}}" class="b_hline"> \
                    <table border="0" cellpadding="0" cellspacing="0">\
                        <tbody>\
                            <tr class="LeagueTr" valign="middle" style="cursor: pointer">\
                                <td onclick="showLeg(\'{{id}}\')" class="tabtitle" ><span class="showleg"><span id="{{id}}_open" class="LegOpen" style="display: block;"></span><span id="{{id}}_close" class="LegClose" style="display: none;"></span></span></span><span>{{name}}</span></td>\
                             </tr>\
                        </tbody>\
                     </table>\
            </tr>';
    var templateData;
    var tableName;
    var pd_full_or_falf = '<select id="full_half" onchange="loadMatch(\'footBall\', this.value, 1);">\
        <option value="{{full}}" selected="selected">全场</option>\
        <option value="{{half}}">上半场</option>\
        </select>';
    var rendPdFullOrHalf = function (type) {
        var data = null,full = '',half='';
        if(type == "ft_ft_pd"){
            full = 'ft_ft_pd';
            half = 'ft_ft_hpd';
        }else{
            full = 'ft_fu_pd';
            half = 'ft_fu_hpd';
        }
        data = {full:full,half:half};
        var fullOrHalf = template.compile(pd_full_or_falf);
        var fhHtml = fullOrHalf(data);
        $("#box_top").append(fhHtml);
    }
    if (sportType === 'footBall') {
        if(type == "ft_ft_pd" || type == 'ft_fu_pd'){
            if(typeof $("#full_half").html() == "undefined"){
                rendPdFullOrHalf(type)
            }
            //全场
            pd_full_or_half_flag = false;
        }
        else if(type == "ft_ft_hpd" || type == "ft_fu_hpd"){
            //半场
            pd_full_or_half_flag = true;
        }else{
            $("#full_half").remove();
        }
        templateData = footBall.getTemplateData(type);
        tableName = footBall.getTableName(type)
    } else if (sportType === 'basketball') {
    	$("#full_half").remove();
        templateData = basketBall.getTemplateData(type);
        tableName = basketBall.getTableName(type)
    } else {
        noData('')
        return;
    }
    var renderHtml = function (type, data) {
        var leagueNameRender = template.compile(templateData.league || defaultLeagueTemplate)
        var matchRender = template.compile(templateData.match)
        var lastLeagueName = ''
        var lastLeagueId;
        var resultHtml = templateData.title;
        var rowHtml;
        var sessionNum="";
        var columnsNum = templateData.columnsNum || 6
        $.each(data, function (index, data) {
            if (lastLeagueName != data.league) {
                resultHtml += leagueNameRender({'name': data.league, 'columnsNum': columnsNum, 'id': data.gid})
                lastLeagueId = data.gid
                lastLeagueName = data.league
            }

            data.lastLeagueId = lastLeagueId;
            if(type == "bk_rb_re"){
                data.sessionNum = getRemainTime(data.nowSession,data.retimeset,data.lastTime);
            }else{
                data.sessionNum = data.retimeset;
                if(data.retimeset != null && typeof data.retimeset != 'undefined' && data.retimeset.indexOf("Start^") > -1) {
                    data.retimeset = data.retimeset.replace("Start^","");
                }
            }
            rowHtml = matchRender(data);
            var elm = $(rowHtml);
            if (lastData && lastDataType === type) {
                $(elm).find('td[check-value]').each(function (el) {
                    var key = $(this).attr('check-value');
                    if (lastData[index] && lastData[index].gid === data.gid && lastData[index][key] != data[key]) {
                        $(this).addClass("b_rig_y");
                    }
                })
            }

            for (var i = 0; i < elm.length; i++) {
                if (elm[i]) {
                    var s = elm[i].outerHTML;
                    if (s) {
                        resultHtml += s;
                    }
                }
            }
        })
        lastData = data;
        lastDataType = type
        return resultHtml
    }
    var getRemainTime = function(nowSession,start,remainTime){
        var retstr = "";
        if(nowSession.length > 0){
        	if(nowSession=="OT"){
        		retstr += "加时";
        	}
            switch (parseInt(nowSession.substr(1))){
                case 1:
                    retstr += "第一节 ";
                    break;
                case 2:
                    retstr += "第二节";
                    break;
                case 3:
                    retstr += "第三节";
                    break;
                case 4:
                    retstr += "第四节";
                    break;
                case 5:
                    retstr += "第五节";
                    break;
                case 6:
                    retstr += "第六节";
                    break;
            }
        }
        if(parseInt(remainTime) >= 0){
        	var se = parseInt(remainTime);
            if(se>0) {
                var minu = parseInt(se / 60),
                	sec = remainTime - minu * 60;
                if (minu >= 10) {
                    retstr += minu + ":";
                } else {
                    retstr += "0" + minu + ":";
                }
                if (sec >= 10) {
                    retstr += sec;
                } else {
                    retstr += "0" + sec;
                }
            }else {
                retstr += "00:00";
            }
        }else{
        	retstr += "00:00";
        }
        return retstr;


    };

    if(type.indexOf('rb_re')>0){
        startRefresh(1,30,30);
    }else{
        startRefresh(1);
    }
    //对全场波胆的处理
//    if(type == 'ft_ft_hpd'){
//        type = 'ft_ft_pd';
//    }else if( type == 'ft_fu_hpd') {
//        type = 'ft_fu_pd';
//    }
    $.ajax({
        url: '/api/sports/match',
        type: 'GET',
        cache: false,
        dataType: 'JSON',
        data: {type: type, page: page, legName: _legs, selection: _selection},
        success: function (data) {
            if (data && data.matchList && data.matchList.length > 0) {
            	filterMatch(data);
                setHtml(renderHtml(type, data.matchList), tableName)
                getlegname(data.leagueList)
                pages(data.totalPage, data.curPage)
            } else {
                noData(tableName)
                pages(data.totalPage, data.curPage)
            }

        },
        error: function (response) {
            error(null, tableName)
        }
    })
    
    var filterMatch = function(data) {
    	var cookies = document.cookie.split(";");
    	var gids = [];
    	for(var i=0;i<cookies.length;i++) {
    		if(cookies[i].indexOf("match_result_") != -1) {
    			gids.push(parseInt(cookies[i].split("=")[1]));
    		} 
    	}
    	if(gids.length == 0) {
    		return;
    	}
    	var newMatchList = [];
    	for(var i=0;i<data.matchList.length;i++) {
    		if(gids.indexOf(data.matchList[i].gid) == -1) {
    			newMatchList.push(data.matchList[i])
    		}
    	}
    	data.matchList = newMatchList;
    }

}


function bindSelection(defaultValue) {
    //
    $("#tablename").append("<select id='btSelection'><option name='btOption' value='1'>所有时节</option><option value='2' name='btOption'>单节</option><option value='3' name='btOption'>单式</option></select>");
    var selection = $("option[name='btOption']");
    for(var i = 0;i<selection.length;i++){
        if(selection[i].value == defaultValue){
            selection[i].selected = true;
        }
    }
    $("#btSelection").change(function () {
        loadMatch(sport_type, sport_table_name, 1, "", $(this).val());
    });
}

function refresh(i, p, s) {
    refreshmatch(120, 120);
    $('#legselect').show();
    if (s) dbs = null;
    // i >= 0 ? matchurl = i : matchurl = 0;

    if (matchurl == 0)
        BasketballToday(p);
    // BaseballToday(p);
    // FootballToday(p);
    else if (matchurl == 1)
        BasketballToday(p);
    //else if (matchurl == 4)
    //    BasketballGG(p);
    //else if (matchurl == 11)
    //    FootballGG(p);
    //else if (matchurl == 2)
    //    FootballZRQ(p);
    //else if (matchurl == 3)
    //    FootballBD(p);
    //else if (matchurl == 5) {
    //    //$('#legselect').hide();
    //    FootballPlaying(p);
    //    refreshmatch(10, 30);
    //}
    //else if (matchurl == 6) {
    //    //$('#legselect').hide();
    //    BasketballPlaying(p);
    //}

    //else if (matchurl == 7)
    //    VolleyballToday(p);
    //else if (matchurl == 8)
    //    TennisToday(p);
    //else if (matchurl == 9)
    //    BaseballToday(p);
    //else if (matchurl == 311)
    //    FootballMorning(p);
    //else if (matchurl == 312)
    //    FootballMBD(p);
    //else if (matchurl == 313)
    //    FootballMZRQ(p);
    //else if (matchurl == 314)
    //    FootballMGG(p);
    //else if (matchurl == 321)
    //    BasketballMorning(p);
    //else if (matchurl == 322)
    //    BasketballMGG(p);
    //else if (matchurl == 331)
    //    VolleyballMorning(p);
    //else if (matchurl == 341)
    //    TennisMorning(p);
    //else if (matchurl == 411)
    //    FBRresults(p);
    //else if (matchurl == 421)
    //    BKRresults(p);
    //else if (matchurl == 431)
    //    VBRresults(p);
    //else if (matchurl == 441)
    //    TNRresults(p);
    //else if (matchurl == 441)
    //    TNRresults(p);
    //else if (matchurl == 451)
    //    BBRresults(p);

}
isnumber = function (e) {
    if(!!$.browser.msie){
        if ($.browser.msie) {
            if (((event.keyCode > 47) && (event.keyCode < 58)) ||
                (event.keyCode == 8)) {
                return true;
            } else {
                return false;
            }
        } else {
            if (((e.which > 47) && (e.which < 58)) ||
                (e.which == 8)) {
                return true;
            } else {
                return false;
            }
        }
    }

}

function qx_bet() {
    showOrder();
    $('#bet_login_out').html('<div style="padding-top:50px;min-height:100px;">点击赔率便可将<br>选项加到交易单裡</div>')
}

function check_win(bet_money) {
    plwin_obj = $(".plwin");
    dsorcg = $('#dsorcg').val();
    plwin = 1;
    $.each(plwin_obj, function (i, v) {
        plwin = plwin * parseFloat($(this).val());
    })
    if (dsorcg != 1) plwin -= 1;
    isnum = /^\d+(\.\d+)?$/;
    if (isnum.test(bet_money) == false || bet_money == '')
        bet_money = $("#bet_money").val();
    else
        $("#bet_money").val(bet_money);
    bet_money = $("#winmoney").html((plwin * bet_money).toFixed(2));
}

function closecgbet(matchid) {
    bet_num = $('.order_div_bet').length;
    if (bet_num > 1)
        $('.bet_' + matchid).parent().remove();
    else
        qx_bet();
}

//window.clearTimeout(time_id);

//clearTimeout(time_id);
//http://xinhome.com/index.php/sports/main/?token=1a30ade1b90457c9243c8f70e27f941e&uid=17687
function refreshmatch(time_match, time_match_) {
    clearTimeout(match_time_id);
    obj = $("#tableref");

    if (time_match < 10)
        obj.html(' 0' + time_match + '');
    else
        obj.html(' ' + time_match + '');

    match_time_id = setTimeout(function () {
        if (time_match <= 1) {
            time_match = time_match_;
            loadMatch(sport_type,sport_table_name,1,sport_legs,sport_selection);
            // refresh(matchurl, $('#legpage').val())
        }
        refreshmatch(time_match - 1, time_match_)
    }, 1000);
}
function orderReload() {
    clearTimeout(time_id);
    var check = $("#checkOrder").attr('checked');
    if (check == 'checked') {
        Refresh();
    } else {
        $("#bet_time").html("10");
    }
}

function Refresh() {
    time_bet = time_bet - 1;
    if (time_bet == 0) {
        dsorcg = $('#dsorcg').val();
        if (dsorcg == 1) {
            obj = $('.order_div_bet')
            matchid = obj.attr('data');
            bet_money = $('#bet_money').val();
            Match_Type = obj.find("input[name='Match_Type[]']").val();
            Sport_Type = obj.find("input[name='Sport_Type[]']").val();
            betOrder(Sport_Type, Match_Type, matchid, bet_money);
        }

    }
    if (time_bet < 0) {
        time_bet = 10;
        $("#bet_time").html(time_bet);
    } else {
        $("#bet_time").html(time_bet);
    }
    time_id = setTimeout("orderReload()", 1000);
}

function betOrderView(d, sport_type) {
    var PKINFO = info = '';
    var betpl = 0;
    var html_btn = '';
    var html_bet = '';
    var html_bet_re = '';
    var dsorcg = $('#dsorcg').val();
    Match_ShowType = '';
    oddpk = $('#arepk').val();
    PKINFO = d.data.pk[0][0];
    if (d.data.pk[2] == 'QCDY' || d.data.pk[2] == 'SBDY') {
        if (d.data.pk[2] == 'QCDY') {
            if (d.data.pk[0][1] == 'Z') {
                info = d.data.data[0].Match_Master;
            } else if (d.data.pk[0][1] == 'K') {
                info = d.data.data[0].Match_Guest;
            } else {
                info = d.data.pk[0][1];
            }
        } else {
            if (d.data.pk[0][1] == 'Z') {
                info = d.data.data[0].Match_Master;
            } else if (d.data.pk[0][1] == 'K') {
                info = d.data.data[0].Match_Guest;
            } else {
                info = d.data.pk[0][1];
            }
        }
    } else if (d.data.pk[2] == 'QCRQ' || d.data.pk[2] == 'SBRQ') {
        if (d.data.pk[2] == 'QCRQ') {
            if (d.data.data[0]['Match_ShowType'] == 'H') {
                PKINFO = '主让';
                Match_ShowType = 'H';
            } else {
                PKINFO = '客让';
                Match_ShowType = 'C';
            }
            PKINFO += ' <span class="c1 b">' + d.data.data[0]['Match_RGG'] + '</span>';
            betpl = d.data.data[0]['Match_RGG'];
        } else {
            if (d.data.data[0]['Match_Hr_ShowType'] == 'H') {
                PKINFO = '主让';
                Match_ShowType = 'H';
            } else {
                PKINFO = '客让';
                Match_ShowType = 'C';
            }
            PKINFO += ' <span class="c1 b">' + d.data.data[0]['Match_BRpk'] + '</span>';
            betpl = d.data.data[0]['Match_BRpk'];
        }
        if (d.data.pk[0][1] == 'Z')
            info = d.data.data[0].Match_Master;
        else if (d.data.pk[0][1] == 'K')
            info = d.data.data[0].Match_Guest;
        else
            info = d.data.pk[0][1];
    } else if (d.data.pk[2] == 'QCDX' || d.data.pk[2] == 'SBDX') {
        if (d.data.pk[2] == 'QCDX') {
            info = d.data.pk[0][1] + ' ' + d.data.data[0]['Match_DxGG'];
            betpl = d.data.data[0]['Match_DxGG'];
        } else {
            info = d.data.pk[0][1] + ' ' + d.data.data[0]['Match_Bdxpk'];
            betpl = d.data.data[0]['Match_Bdxpk'];
        }
    } else /*if (d.data.pk[2] == 'QCDS' || d.data.pk[2] == 'SBDS' || d.data.pk[2] == 'BD')*/ {
        info = d.data.pk[0][1];
    }
    var bet_num = $('.order_div_bet').length;
    info = (d.data.betinfo).split('@')[0] + " @ <span class='b c1'>" + formatNumber(d.data.pl, 2) + "</span>";
    var html = '<div class="order_div"><form name="order_bet_name" id="order_bet_form" >' +
        '<div class="tiTimer xs" onclick=orderReload()><span id="bet_time">10</span><input id="checkOrder" type="checkbox" value="10" checked=""></div>' +
        '<div class="clear"></div>' +
        '<div class="order_div_bet_all">';
    html_bet += '<div><div class="order_div_bet bet_' + d.data.data[0].Match_ID + '" data=' + d.data.data[0].Match_ID + '>';
    html_bet += '<div class="order_div_leg_name"><span class="bet_close fl_r" onclick="closecgbet(' + d.data.data[0].Match_ID + ')"></span>' + d.data.data[0].Match_Name + '</div>';
    html_bet += '<div class="order_div_pk">' + PKINFO + '</div>';
    html_bet += '<div class="order_div_Mster_Guest">' + d.data.data[0].Match_Master + ' Vs ' + d.data.data[0].Match_Guest + '</div>';
    html_bet += '<div class="order_div_info ' + (bet_num < 1 ? '' : 'bg2') + '">' + info + '</div>';
    html_bet += '<input name="Match_ID[]" type="hidden"  value="' + d.data.data[0].Match_ID + '">';
    html_bet += '<input name="Match_ShowType[]" type="hidden"  value="' + Match_ShowType + '">';
    html_bet += '<input name="Match_Type[]" type="hidden"  value="' + d.data.pk[1] + '">';
    html_bet += '<input name="Sport_Type[]" type="hidden"  value="' + sport_type + '">';
    html_bet += '<input name="Bet_PK[]" type="hidden"  value="' + betpl + '">';
    html_bet += '<input name="Bet_PL[]" type="hidden"  value="' + d.data.pl + '">';
    html_bet += '<input name="Odd_PK[]" type="hidden"  value="' + oddpk + '">';
    html_bet += '<input name="Win_PL[]" type="hidden" class="plwin" value="' + d.data.plwin + '">';
    html_bet += '</div></div>';

    if (dsorcg != 1 && bet_num > 0) {
        $('.order_div_info').removeClass('bg2');
        var cgcheck = false;
        $.each($('.order_div_bet'), function (i, v) {
            matchid = $(this).attr('data');
            if (matchid == d.data.data[0].Match_ID) {
                cgcheck = true;
                // html_bet=html_bet.replace('order_div_info','order_div_info bg2');
                $('.bet_' + matchid).parent().html(html_bet);
                //html_bet+=$('.order_div_bet').html();
            } else {
                MG = $(this).find('.order_div_Mster_Guest').html();
                if (MG == d.data.data[0].Match_Master + ' Vs ' + d.data.data[0].Match_Guest) {
                    $('.bet_' + matchid).parent().html(html_bet);
                    cgcheck = true;
                }
            }
        })
        if (cgcheck == false)
            html_bet = ($('.order_div_bet_all').html() + html_bet);
        else
            html_bet = ($('.order_div_bet_all').html());
    } else {


    }
    html_bet += '</div>';
    /*<div class="order_div_bet">*/

    html_btn += '<div class="order_div_money"> <span class="fl_l">交易金额：</span>';
    html_btn += '<span class="fl_l"><input type="text" name="bet_money" id="bet_money" maxlength=7 onkeyup="return check_win(event);" onkeydown="if(event.keyCode==13)return check_bet();" oncontextmenu="return false" oncopy="return false" oncut="return false" autocomplete="off" onpaste="return false" onkeypress="return isnumber(event);"></span>';
    html_btn += '<div class="clear"></div><div class="setmoney" ><dd class="smm1" onclick="setmoney(10,1)">10</dd><dd class="smm2" onclick="setmoney(100,2)">100</dd><dd class="smm3" onclick="setmoney(1000,3)">1000</dd><dd class="smm4" onclick="setmoney(2000,4)">2000</dd></div>';
    html_btn += '<div class="clear"></div><input type="hidden" id="plwin" value="' + d.data.plwin + '">';
    html_btn += '<input type="hidden" name="uid" id="uid" value="' + uid + '">';
    html_btn += '<div class="clear"></div>';
    html_btn += '可赢金额：<span id="winmoney">0</span><Br> 单注最低：<span id="minmoney">' + d.data.pk['xe'][2] + '</span><br>单注最高：<span id="maxmoney">' + d.data.pk['xe'][1] + '</span>';
    html_btn += '<div class="clear"></div>';
    html_btn += '<div class="qx_btn fl_l xs" onclick="qx_bet()">取消</div><div id="qr_btn" class="qr_btn fl_l xs" onclick="check_bet()">确认交易</div>';
    html_btn += '<div class="clear"></div>';
    html_btn += '</div>';
    html += html_bet + html_btn;
    html += '<div class="clear"></div></form></div>';

    return html;
}
function setmoney(v) {
    $('#bet_money').val(v)
    check_win();
}

function betOrder(sport_type, gid, bet_money) {
    if (parseFloat(bet_money) < 0 || bet_money) {
        bet_money = 0;
    }

    if (checkUid() != true) {
        return false;
    }
    showOrder();


}

function betOrder(sport_type /*赛事类型*/, pk /*盘口*/, matchid /*matchid*/, bet_money) {
    if (parseFloat(bet_money) < 0 || !bet_money)
        bet_money = 0;
    if (checkUid() != true) {
        return false;
    }
    showOrder()
    var oddpk = $('#arepk').val();
    var dsorcg = $('#dsorcg').val();
    var token = $('#token').val()
    var uid = $('#uid').val()
    $.get('/db/makebetshow.txt', {
        uid: uid,
        token: token,
        sport_type: sport_type,
        pk: pk,
        matchid: matchid,
        oddpk: oddpk,
        dsorcg: dsorcg
    }, function (d) {
        if (d.login != '1') {
            qx_bet();
            if (d.sitestatus) {
                sitestatus(d)
            }
            else alert('您已经退出，请登录账号！');
        } else {
            if (d.status == 1) {
                html = betOrderView(d, sport_type);
                if (dsorcg == 1)
                    $('#bet_login_out').html(html)
                else {
                    $('#bet_login_out').html(html)
                }
                $('#bet_money').focus();

                check_win(bet_money);
                orderReload();
            } else
                $('#bet_login_out').html(d.msg)
        }


    }, 'json')
}

function pkchoose() {
    $('#tableref').click();
    var oddpk = $('#arepk').val();
}

function pages(p, thispage) {
    page = '';

    for (var i = 1; i <= p; i++) {
        s = '';
        if (i == thispage) {
            s = "selected";
        }
        page += "<option " + s + " value=" + i + ">第" + i + "页</option>";
    }
    $('#legpage').html(page);
}


function betInfoPages(p,thispage) {
    var betPages = "<select onchange=\"loadMoreBetInfo()\" id=\"betpage\" style='margin-top: 2px;    border: #ffffff solid 1px；font-family: Microsoft YaHei, \"微软雅黑\", sans-serif;background: #FCF9CE;'>";
    for (var i = 1; i <= p; i++) {
        s = '';
        if (i == thispage) {
            s = "selected";
        }
        betPages += "<option " + s + " value=" + i + ">第" + i + "页</option>";
    }
    betPages +="</select>"
    $('#data-bet-logs').prepend(betPages);

}

function showLeg(id) {


    //$('#tr1_' + id + ",#tr2_" + id+ ",#tr3_" + id).toggle();
 	var curObj=$('#tr1_' + id);
 	do{
 		if(curObj.length>0){
 			curObj.toggle();
 			curObj=curObj.next();
 		}
 	}while(curObj.attr('id'))
    changeDisplay($("#"+id+"_open"))
    changeDisplay($("#"+id+"_close"))
    // $('#TR_' + id + ',#TR1_' + id + ',#TR2_' + id).toggle();
}

function changeDisplay(elm){
    if(elm[0].style.display == 'none'){
        elm[0].style.display = 'block';
    }else{
        elm[0].style.display = 'none';
    }
}

function showLegList() {
    header_h = $('.header').height();
    var x = $('#right_sport_main').position().top;
    var y = $('#right_sport_main').position().left;
    log(x + '-' + y);
    $("#legname_data").css({
        top: x + 1,
        left: y + 5,
        width: $("#data").width() - 22,
        'max-height': $("#right_sport_main").height() - 50

    })
    $('#legname_data').fadeToggle(500);
}

function getlegname(d) {
    leg = '';
    $.each(d, function (i, v) {
        leg += '<div><input type="checkbox" name="legname" value="' + v + '"> ' + v + '</div>'
    })
    $('#legname_data_load').html(leg)
}


function selectLeague() {
    leg = $('#legname_data_load input');
    var legs_ = "";
    if (leg.length > 0) {
        $.each(leg, function (i, v) {
            if ($(this).prop('checked')) {
                legs_ += $(this).val() + ','
            }
        })
    }
    loadMatch(sport_type, sport_table_name, 1, legs_);
}

/*交易状况*/
function getbet() {
    if (!checkUid()) {
        alert('您好，请先登录！');
        return false
    }
    $("#tablename").text("交易状况");
    // getbetdata(1);
    if(typeof $("#data-bet-logs").html() == "undefined"){
        //停掉赛事刷新
        clearTimeout(match_time_id);
        $("#full_half").hide();
        showBetInfo(1);
    }

    // $("#box_mid").hide();
    // $("#showbet").show();
    // easyDialog.open({
    //     container: 'showbet',
    //     fixed: true,
    //     drag: true,
    //     follow: 'transaction',
    //     followX: -107,
    //     followY: 24
    // });
    // $('#easyDialogBox').css({width: '56%'})
}

/*足球-赛果*/
function FBRresults(t) {
    var t = 0;//t=getRresultsDate(t,1);

    var table = ''
    var html = table + '<table id="game_table"  cellspacing="0" cellpadding="0" class="game">' +
        '<tr>' +
        '<th  class="time">时间</th>' +
        '<th  class="time">主客队伍</th>' +
        '<th  class="h_1x2">上半场比分</th>' +
        '<th class="h_1x2">全场比分</th>' +
        '</tr>';


    $.post('/index.php/sports/Match/FBRresults/' + "?t=" + Math.random(), {
        time: t
    }, function (d) {
        var Match_Name;
        if (d) {
            //pages(d.page, thispage)
            $.each(d.db, function (i, v) {
                var s1, x1, mcname;

                if (v.TG_Inball < 0) {
                    s1 = '<td colspan=2 class="b_cen"  id="">赛事无效</td>'
                    x1 = s1;
                } else {
                    s1 = '<td id="2158360_MH" class="b_cen">' + v.MB_Inball_HR + '</td>' +
                        '<td id="2158360_PRH" class="b_cen">' + v.MB_Inball + '</td>';
                    x1 = '<td id="2158360_MH" class="b_cen">' + v.TG_Inball_HR + '</td>' +
                        '<td id="2158360_PRH" class="b_cen">' + v.TG_Inball + '</td>';
                }
                if (Match_Name == v.Match_Name) {
                    mcname = '';
                } else {

                    mcname = '<tr>' +
                        '<td  colspan="4"  class="b_hline">' +
                        ' <table  border="0"  cellpadding="0"  cellspacing="0"  width="100%"><tbody>' +
                        '<tr>' +
                        '<td  class="legicon" >' +
                        '<span  id="' + v.Match_Name + '"  class="showleg"><span  id="LegOpen"></span> </span>' +
                        '</td>' +
                        '<td  class="leg_bar" >' + v.Match_Name + ' </td>' +
                        '</tr>' +
                        '</tbody></table>' +
                        '</td>' +
                        '</tr>';
                }
                Match_Name = v.Match_Name;
                html += mcname +
                    '<tr *class*="" id="">' +
                    '<td width="26%" class="b_cen" rowspan="2">' + v.Match_MatchTime + '</td>' +
                    '<td width="26%" class="b_cen" rowspan="2"> ' + v.Match_Master + ' <br>' +
                    v.Match_Guest + ' </td>' +
                    s1 +
                    '</tr>' +
                    '<tr *class*="" id="">' +
                    x1 +
                    '</tr>';

            })

            html += '</table>';

        } else {
            html += '<tr><Td colspan=4 class="b_cen">无赛事数据</td></tr>';
            html += '</table>';
        }

        $('#tableref').removeClass('tablerefon');
        $('#tableref').addClass('tableref');
        $('#data').html(html)
        $('#tablename').html('足球赛果');
    }, 'json').error(function () {
        showStatus();
    })

}

/*篮球-赛果*/
function BKRresults(t) {
    var t = 0;//t=getRresultsDate(t,2);

    var table = ''
    var html = table + '<table id="game_table"  cellspacing="0" cellpadding="0" class="game">' +
        '<tr>' +
        '<th  class="time">时间</th>' +
        '<th  class="time">主客队伍</th>' +
        '<th  class="h_1x2">1</th>' +
        '<th class="h_1x2">2</th>' +
        '<th  class="h_1x2">3</th>' +
        '<th class="h_1x2">4</th>' +
        '<th  class="h_1x2">上半</th>' +
        '<th class="h_1x2">下半</th>' +
        '<th  class="h_1x2">加时</th>' +
        '<th class="h_1x2">全场</th>' +
        '</tr>';


    $.post('/index.php/sports/Match/BKRresults/' + "?t=" + Math.random(), {
        time: t
    }, function (d) {
        var Match_Name;
        if (d) {
            //pages(d.page, thispage)
            $.each(d.db, function (i, v) {
                //将空的数据赋值为长度为0的字符串；
                for (nv in v) {
                    if (v[nv] === null) {
                        v[nv] = '';
                    }
                }
                var s1, x1, mcname;
                if (Match_Name == v.Match_Name) {
                    mcname = '';
                } else {

                    mcname = '<tr>' +
                        '<td  colspan="10"  class="b_hline">' +
                        ' <table  border="0"  cellpadding="0"  cellspacing="0"  width="100%"><tbody>' +
                        '<tr>' +
                        '<td  class="legicon" >' +
                        '<span  id="' + v.Match_Name + '"  class="showleg"><span  id="LegOpen"></span> </span>' +
                        '</td>' +
                        '<td  class="leg_bar" >' + v.Match_Name + ' </td>' +
                        '</tr>' +
                        '</tbody></table>' +
                        '</td>' +
                        '</tr>';
                }
                Match_Name = v.Match_Name;
                html += mcname +
                    '<tr *class*="" id="">' +
                    '<td width="26%" class="b_cen" rowspan="2">' + v.Match_Date + '<br />' + v.Match_Time + '</td>' +
                    '<td width="26%" class="b_cen" rowspan="2"> ' + v.Match_Master + ' <br>' +
                    v.Match_Guest + ' </td>' +
                    '<td  class="b_cen"  id="118389861_MH">' + v.MB_Inball_1st + '</td>' +
                    '<td  class="b_cen"  id="118389861_PRH">' + v.MB_Inball_2st + '</td>' +
                    '<td  class="b_cen"  id="118389861_MH">' + v.MB_Inball_3st + '</td>' +
                    '<td  class="b_cen"  id="118389861_PRH">' + v.MB_Inball_4st + '</td>' +
                    '<td  class="b_cen"  id="118389861_MH">' + v.MB_Inball_HR + '</td>' +
                    '<td  class="b_cen"  id="118389861_PRH">' + v.MB_Inball_ER + '</td>' +
                    '<td  class="b_cen"  id="118389861_MH">' + v.MB_Inball_Add + '</td>' +
                    '<td  class="b_cen"  id="118389861_PRH">' + v.MB_Inball + '</td>' +
                    '</tr>' +
                    '<tr *class*="" id="">' +
                    '<td  class="b_cen"  >' + v.TG_Inball_1st + '</td>' +
                    '<td  class="b_cen"  >' + v.TG_Inball_2st + '</td>' +
                    '<td  class="b_cen"  >' + v.TG_Inball_3st + '</td>' +
                    '<td  class="b_cen"  >' + v.TG_Inball_4st + '</td>' +
                    '<td  class="b_cen"  >' + v.TG_Inball_HR + '</td>' +
                    '<td  class="b_cen"  >' + v.TG_Inball_ER + '</td>' +
                    '<td  class="b_cen"  >' + v.TG_Inball_Add + '</td>' +
                    '<td  class="b_cen"  >' + v.TG_Inball + '</td>' +
                    '</tr>';

            })

            html += '</table>';

        } else {
            html += '<tr><Td colspan=10 class="b_cen">无赛事数据</td></tr>';
            html += '</table>';
        }

        $('#tableref').removeClass('tablerefon');
        $('#tableref').addClass('tableref');
        $('#data').html(html)
        $('#tablename').html('篮球结果');
    }, 'json').error(function () {
        showStatus();
    })

}

/*获取比赛日期*/
function getRresultsDate(t, type) {
    var slct = '选择时间：<select id="RresultsDate" onchange="setRresultsDate(' + type + ')">' +
        '<option value="0">今天</option>' +
        '<option value="1">昨天</option>' +
        '<option value="2">前天</option>' +
        '<option value="3">3天前</option>' +
        '<option value="4">4天前</option>' +
        '<option value="5">5天前</option>' +
        '<option value="6">6天前</option>' +
        '<option value="7">7天前</option>' +
        '</select><div id="data"></div>';
    $("#box_mid").html(slct);
    if (t !== null) {
        t = parseInt(t) === 'NaN' ? 0 : parseInt(t);
        $("#RresultsDate").val(t);
    }
    return t;

}
/*更改比赛日期*/
function setRresultsDate(type) {
    t = $('#RresultsDate').val();
    if (type == 1) {
        FBRresults(t);
    }
    if (type == 2) {
        BKRresults(t);
    }
    if (type == 3) {
        TNRresults(t);
    }
    if (type == 4) {
        VBRresults(t);
    }
    if (type == 5) {
        BBRresults(t);
    }

}

/*更多消息*/
function getNews(type) {
	clearTimeout(match_time_id);
	$("#tablename").text("公告");
    $("#full_half").hide();
    $("#data-account-history").remove();
    $(".account-his-title").remove();
    $(".history-none").remove();

    if(typeof type =="undefined"){
    	type = 2; //默认查今天数据
    };
    	
    var tp = {
            title:'<table class="account-his-title" style="height:34px"><tbody><tr>\
            			<td> <b>日期</b>：&nbsp;&nbsp; \
            				<a href="javascript:;" target="mainFrame" onclick="getNews(1)" id="news-1"class="news-a">全部</a>&nbsp;|&nbsp;\
			            	<a href="javascript:;" target="mainFrame" onclick="getNews(2)" id="news-2"class="news-a">今日</a>&nbsp;|&nbsp;\
			            	<a href="javascript:;" target="mainFrame" onclick="getNews(3)" id="news-3"class="news-a">昨日</a>&nbsp;|&nbsp;\
			            	<a href="javascript:;" target="mainFrame" onclick="getNews(4)" id="news-4"class="news-a">更早</a>\
    					</td></tr></tbody></table>',
            header:'<div id="data-account-history"><table><tbody>',
            tr:'<tr class="TrBgOdd">\
                	<td rowspan="1" height="25" style="text-align: center; vertical-align: middle;" width="64">{{index}}</td>\
		            <td align="left" class="mqContent" style="line-height: 20px; padding: 3px 8px !important;">{{message}}</td>\
            	</tr>',
            foot:'</tbody></div></div></tbody></table>'
        };



        renderNews = function(data){
            hideMainBetOperationArea();
            
            var html =tp.header;
            $.each(data,function(i,v){
            	v.index = ++i;
                html += template.compile(tp.tr)(v);
            });
            html +=tp.foot;
            html = tp.title+html;
            render(html);
            $('#news-'+type).addClass('getNews');
        };
        render = function(html){
            $("#box_mid").append(html);
        };
        
        $.ajax({
            url: '/api/sports/getNews?type='+type,
            type: 'GET',
            success: function (data) {
            	renderNews(data);
            }
        });
}

//帮助显示隐藏
function OnMouseOverEvent() {
    document.getElementById("informaction").style.display = "block";
}
function OnMouseOutEvent() {
    document.getElementById("informaction").style.display = "none";
}
//帮助下面打开新窗口方法
function winOpen(url, width, height, left, top, name) {
    var temp = "menubar=no,toolbar=no,directories=no,scrollbars=yes,resizable=no";
    if (width) {
        temp += ',width=' + width;
    } else {
        width = 1024;
    }
    if (height) {
        temp += ',height=' + height;
    } else {
        height = 600;
    }
    if (left) {
        temp += ',left=' + left;
    } else {
        temp += ',left='
            + Math.round((window.screen.width - parseInt(width)) / 2);
    }
    if (top) {
        temp += ',top=' + top;
    } else {
        temp += ',top='
            + Math.round((window.screen.height - parseInt(height)) / 2);
    }
    if (typeof (name) == "undefined") {
        name = "";
    }
    if (name == "game") {
        //alert(temp);
        var obj = window.open(url, name, temp);
        obj.moveTo(0, 0);
        obj.resizeTo(window.screen.availWidth, window.screen.availHeight);
        //window.setTimeout("obj.document.location=url",3000);
    }
    else {
        window.open(url, name, temp);
    }
}

function GoToPager(name, me, type) {
    if (type) {
        hg_right.location.href = '/index.php/Index/' + name + '?url=' + me;
    } else {
        if (me == '') {
            hg_right.location.href = '/index.php/Index/' + name;
        } else {
            hg_right.location.href = '/index.php/Index/' + name + '?metype=' + me;
        }
    }
}

function ChangeTag(hgz) {
    if (hgz) {
        document.getElementById('right_sport_hg_main').style.display = 'none';
        document.getElementById('right').style.display = 'block';
    } else {
        document.getElementById('right').style.display = 'none';
        document.getElementById('right_sport_hg_main').style.display = 'block';
    }
}


function showStatus() {
    var timeout = '数据加载错误 :加载超时,请重试!';
    var html = "<table  class='game'>";
    html += "<tr><td colspan='7' class='b_1st'>" + timeout + "</td></tr>";
    html += "</table>";
    $('#data').html(html);
    $('#tableref').removeClass('tablerefon');
    $('#tableref').addClass('tableref');
}

function showMessage() {

    $.get("/api/sports/message",function (data) {

        $("#real_msg").html(data.message);

    })

}
//获取当前赛果
function getResult(){
    var leagueOrTeam = $("#leagueOrTeam").val() || "";
    var time = $("#result-time").val();
    var timeDate = new Date(time);
    var date = new Date(defaultDate());
    var goDaysStr = '<span class="goDays"><a href="javascript:goDays(-1);">前一天</a></span>';
    if(timeDate < date) {
    	goDaysStr = '<span class="goDays"><a href="javascript:goDays(-1);">前一天</a>/<a href="javascript:goDays(1);">后一天</a></span>';
    }
    
    $(".account-his-title").remove();
    $("#data-result").remove();
    $("#gameTableContent").remove();
    $("#full_half").remove();
    clearTimeout(match_time_id);
    var spt = sport_type,
        tablename = sport_table_name,
        tp = {
            title:'<table class="result-his-title">\
        <tbody><tr>\
        <td>' + goDaysStr + '&nbsp;&nbsp;时间:<input  type="date" name="rst_time" id="result-time" /> <input id="leagueOrTeam" name="leagueOrTeam" type="text" placeholder="联赛名称或主客队伍" value="'+ leagueOrTeam + '" style="height: 18px"/> <a href="javascript:getResult();" class="result-submit">查询</a></td>\
            </tr>\
            </tbody></table> ',
            header:'<div id="gameTableContent" style="">\
            <table class="game result" cellpadding="0" cellspacing="0" border="0">\
            <thead>\
            <tr>\
            <td class="rdt">时间</td>\
            <td colspan="6">赛果</td>\
            </tr>\
            </thead>\
            <tbody>\
        ',
            football_tr_header:'<tr class="LeagueTr" onclick="toggleLeague(this, {{p}})" valign="middle" style="cursor:pointer">\
            <td colspan="6" class="tabtitle" style="text-align: left;">\
            <span class="showleg"><span class="LegOpen"></span><span class="LegClose" style="display: none;"></span></span><span>{{league}}</span>\
            </td>\
            </tr>\
            ',
            football_tr:'<tr class="TrBgOdd lclass-{{p}}">\
            <td rowspan="3">{{date}}<br>{{time}}</td>\
    <td class="rname">比赛队伍</td>\
        <td class="vs"><b style="color:#c00">{{team_h}}</b></td>\
        <td colspan="2" class="vs">vs.</td>\
        <td>{{team_c}}</td>\
        </tr>\
        <tr class="TrBgOdd odd lclass-{{p}}">\
        <td>半场</td>\
        <td colspan="2" class="bold">{{h_half ==-5 ? "" : (h_half == -2 ? "" : (h_half == -1 ? ((!h_half_str || h_half_str == "null") ? "赛事取消":h_half_str) : h_half))}}</td>\
        <td colspan="2" class="bold">{{c_half ==-5 ? "" : (c_half == -2 ? "" : (c_half == -1 ? ((!c_half_str || c_half_str == "null") ? "赛事取消":c_half_str) : c_half))}}</td>\
        </tr>\
        {{if h_full == -2 || h_full == -1 || h_full == -5 }}\
        <tr class="TrBgOdd odd lclass-{{p}}">\
        <td class="red" >全场</td>\
        <td colspan="2" class="bold red">{{h_full == -2 ? "" : (h_full == -1 ? ((!h_full_str || h_full_str == "null") ? "赛事取消":h_full_str) :(h_full == -5 ? "" : h_full))}}</td>\
        <td colspan="2" class="bold red">{{c_full == -2 ? "" : (c_full == -1 ? ((!c_full_str || c_full_str == "null") ? "赛事取消":c_full_str) :(c_full == -5 ? "" : c_full))}}</td>\
        {{else}}\
         <tr class="TrBgOdd even lclass-{{p}}">\
         <td class="red" >全场</td>\
        <td colspan="2" class="bold red">{{h_full == -2 ? "" : (h_full == -1 ? ((!h_full_str || h_full_str == "null") ? "赛事取消":h_full_str) :h_full)}}</td>\
        <td colspan="2" class="bold red">{{c_full == -2 ? "" : (c_full == -1 ? ((!c_full_str || c_full_str == "null") ? "赛事取消":c_full_str) :c_full)}}</td>\
        {{/if}}\
        </tr>',
            basketball_tr_header:'<tr class="LeagueTr" onclick="toggleLeague(this, {{p}})" valign="middle" style="cursor:pointer">\
            <td colspan="6" class="tabtitle" style="text-align: left;">\
            <span class="showleg"><span class="LegOpen"></span><span class="LegClose" style="display: none;"></span></span><span>{{league}}</span>\
            </td>\
            </tr>',
            basketball_tr:'<tr class="TrBgOdd lclass-{{p}}">\
            <td rowspan="9">{{date}}<br>{{time}}</td>\
    <td class="rname">比赛队伍</td>\
        <td class="vs">{{team_h}}</td>\
        <td colspan="2" class="vs">vs.</td>\
        <td>{{team_c}}</td>\
        </tr>\
        <tr class="TrBgOdd lclass-{{p}}">\
        <td class="bad">第1节</td>\
        <td colspan="2" class="bad bold">{{h_first == -1 ? ((!h_first_str || h_first_str == "null") ? "赛事取消":h_first_str):h_first}}</td>\
        <td colspan="2" class="bad bold">{{c_first == -1 ? ((!c_first_str || c_first_str == "null") ? "赛事取消":c_first_str):c_first}}</td>\
        </tr>\
        <tr class="TrBgOdd lclass-{{p}}">\
        <td class="bad">第2节</td>\
        <td colspan="2" class="bad bold">{{h_second == -1 ? ((!h_second_str || h_second_str == "null") ? "赛事取消":h_second_str):h_second}}</td>\
        <td colspan="2" class="bad bold">{{c_second == -1 ? ((!c_second_str || c_second_str == "null") ? "赛事取消":c_second_str):c_second}}</td>\
        </tr>\
        <tr class="TrBgOdd lclass-{{p}}">\
        <td class="bad">第3节</td>\
        <td colspan="2" class="bad bold">{{h_third == -1 ? ((!h_third_str || h_third_str == "null") ? "赛事取消":h_third_str):h_third}}</td>\
        <td colspan="2" class="bad bold">{{c_third == -1 ? ((!c_third_str || c_third_str == "null") ? "赛事取消":c_third_str):c_third}}</td>\
        </tr>\
        <tr class="TrBgOdd lclass-{{p}}">\
        <td class="bad">第4节</td>\
        <td colspan="2" class="bad bold">{{h_forth== -1 ? ((!h_forth_str || h_forth_str == "null") ? "赛事取消":h_forth_str):h_forth}}</td>\
        <td colspan="2" class="bad bold">{{c_forth== -1 ? ((!c_forth_str || c_forth_str == "null") ? "赛事取消":c_forth_str):c_forth}}</td>\
        </tr>\
        <tr class="TrBgOdd odd lclass-{{p}}">\
        <td class="bad">上半</td>\
        <td colspan="2" class="bad bold">{{h_half== -1 ? ((!h_half_str || h_half_str == "null") ? "赛事取消":h_half_str):h_half}}</td>\
        <td colspan="2" class="bad bold">{{c_half== -1 ? ((!c_half_str || c_half_str == "null") ? "赛事取消":c_half_str):c_half}}</td>\
        </tr>\
        <tr class="TrBgOdd odd lclass-{{p}}">\
        <td class="bad">下半</td>\
        <td colspan="2" class="bad bold">{{h_next== -1 ? ((!h_next_str || h_next_str == "null") ? "赛事取消":h_next_str):h_next}}</td>\
        <td colspan="2" class="bad bold">{{c_next== -1 ? ((!c_next_str || c_next_str == "null") ? "赛事取消":c_next_str):c_next}}</td>\
        </tr>\
        <tr class="TrBgOdd lclass-{{p}}">\
        <td>加时</td>\
        <td colspan="2" class="bold">{{h_delay== -1 ? ((!h_delay_str || h_delay_str == "null") ? "赛事取消":h_delay_str):h_delay}}</td>\
        <td colspan="2" class="bold">{{c_delay== -1 ? ((!c_delay_str || c_delay_str == "null") ? "赛事取消":c_delay_str):c_delay}}</td>\
        </tr>\
        <tr class="TrBgOdd even lclass-{{p}}">\
        <td class="red">全场</td>\
        <td colspan="2" class="bold red">{{h_full== -1 ? ((!h_full_str || h_full_str == "null") ? "赛事取消":h_full_str):h_full}}</td>\
        <td colspan="2" class="bold red">{{c_full== -1 ? ((!c_full_str || c_full_str == "null") ? "赛事取消":c_full_str):c_full}}</td>\
        </tr>',
            footer:'</tbody></table></div>'
        },
        noData = function(){
            hideMainBetOperationArea();
            var html = tp.title+tp.header+'<table class=\'result-none game\'><tr><td colspan=\'7\' class=\'b_1st\'>无赛果数据</td></tr></table>'
            render(html);

        },
        renderResult = function(data){
            hideMainBetOperationArea();
            var html = '<div id="data-result" style="overflow: auto;overflow-y: auto;">'+tp.title+tp.header;
            var league = "";
            var p = 0;
            if(spt == 'footBall'){
                if(!data){
                    return;
                };
                //根据联赛分组
              var mapData = {};
              var lastLeague = "";
              var newArray = [];//最终的集合
              $.each(data, function (index, obj) {
                var tempObj = obj;
                var tempKey = tempObj.league;

                var tempArray;
                if (lastLeague == "") {
                  lastLeague = tempKey;
                  tempArray = [];
                  mapData[tempKey] = tempArray;
                }

                if (lastLeague == tempKey) {
                  tempArray = mapData[tempKey];
                  tempArray.push(tempObj);
                  if (index == data.length - 1) {
                    $.each(tempArray, function (obj) {
                      newArray.push(tempArray[obj]);
                    });
                  }
                } else {
                  //把上一个联盟的球赛全部保存到数组里，然后清空
                  tempArray = mapData[lastLeague];
                  $.each(tempArray, function (obj) {
                    newArray.push(tempArray[obj]);
                  });
                  delete mapData[lastLeague];
                  //如果不是最后一个
                  if(index==data.length-1){
                    newArray.push(tempObj);
                  }else {
                    lastLeague = tempKey;
                    tempArray = [];
                    tempArray.push(tempObj);
                    mapData[tempKey] = tempArray;
                  }
                }
              });

                $.each(newArray,function(k,v){
                    var date = new Date(v.game_date),
                        mo = date.getMonth()+1,
                        day = date.getDate(),
                        h  = date.getHours(),
                        m = date.getMinutes();
                    if(mo < 10){
                        mo ="0"+mo;
                    }
                    if(day < 10){
                        day = "0"+day;
                    }
                    if(h < 10){
                        h = "0"+h;
                    }
                    if(m < 10){
                        m  = "0"+m
                    }
                    v.date = mo+"-"+day;
                    v.time = h+":"+m;

                    if(p == 0){
                        p = v.gid;
                    }

                    if(v.league != league){
                        p = v.gid;
                        html += template.compile(tp.football_tr_header)({league:v.league,p:p});
                    }
                    v.p = p;
                    html += template.compile(tp.football_tr)(v);
                    league = v.league;
                });


            }else{

                $.each(data,function(k,v){
                    var date = new Date(v.game_date),
                        mo = date.getMonth()+1,
                        day = date.getDate(),
                        h  = date.getHours(),
                        m = date.getMinutes();
                    if(mo < 10){
                        mo ="0"+mo;
                    }
                    if(day < 10){
                        day = "0"+day;
                    }
                    if(h < 10){
                        h = "0"+h;
                    }
                    if(m < 10){
                        m  = "0"+m
                    }
                    v.date = mo+"-"+day;
                    v.time = h+":"+m;


                    if(p == 0){
                        p = v.gid;
                    }


                    if(v.league != league){
                        p = v.gid;
                        html += template.compile(tp.football_tr_header)({league:v.league,p:p});
                    }
                    v.p = p;
                    html +=template.compile(tp.basketball_tr)(v);
                    league = v.league;
                });
            }

            html += tp.footer+"</div>";
            render(html);

        },
        render = function(html){
            $("#box_mid").append(html)
        };



    if(typeof time  == 'undefined'){
        time = defaultDate();
    }

    $.ajax({
        url: '/api/sports/loadResult',
        type: 'GET',
        cache: false,
        dataType: 'JSON',
        data:{st:spt,tb:tablename,start:time},
        success: function (data) {
            if(spt == 'footBall'){
                $("#tablename").html("足球赛果")
            }else{
                $("#tablename").html("篮球赛果")
            }
            if(data != null){
                data = filterResult(leagueOrTeam,data);
                renderResult(data);
            }else{
                noData();
            }
            $("#result-time").val(time);
        },
        error:apiErrorHandler
    })




}
function defaultDate(){
    var date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth()+1,
        day = date.getDate();
        if(month < 10){
            month = "0"+month
        }
        if(day < 10){
            day = "0" + day;
        }

    return year+"-"+month+"-"+day;
};


function goDays(days) {
	var time = $("#result-time").val(); 
	var d = new Date(time);
	d.setDate(d.getDate()+days); 
	var month=d.getMonth()+1; 
	var day = d.getDate(); 
	if(month < 10){ 
		month = "0" + month; 
	} 
	if(day < 10){ 
		day = "0" + day; 
	} 
	var val = d.getFullYear()+"-"+month+"-"+day; 
	$("#result-time").val(val);
	getResult();
}

function toggleLeague(t,cls){
    $(".lclass-"+cls).toggle();
    $(t).find(".LegOpen").toggle("fast");
    $(t).find(".LegClose").toggle("fast");
}

function filterResult(leagueOrTeam,data) {
    var newData = [];
    $.each(data,function (k,v) {
        if(v.league.indexOf(leagueOrTeam) != -1 || v.team_h.indexOf(leagueOrTeam) != -1 || v.team_c.indexOf(leagueOrTeam) != -1) {
            newData.push(v);
        }
    })
    return newData;
}