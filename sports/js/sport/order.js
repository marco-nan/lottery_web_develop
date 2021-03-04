var order = function () {

    var betConfig = {};
    var minChuan = 2,
        maxChuan = 10;
    var getPostBetInfo = function (result,betType,matchData) {


        switch (betType) {
            case 'ior_RH':
            case 'ior_RC':
                result.betInfo = matchData.ratio;
                result.strong = matchData.strong;
                break;
            case 'ior_HRH':
            case 'ior_HRC':
                result.betInfo = matchData.hratio;
                result.strong = matchData.hstrong;
                break;
            case 'ior_OUH':
                result.betInfo = matchData.ratio_o;
                break;
            case 'ior_OUC':
                result.betInfo = matchData.ratio_u;
                break;
            case 'ior_HOUH':
                result.betInfo = matchData.hratio_o;
                break;
            case 'ior_HOUC':
                result.betInfo = matchData.hratio_u;
                break;
        }
    }
    var boDanBetInfoMaps = {
        ior_H1C0: '波胆 1:0',
        ior_H2C0: '波胆 2:0',
        ior_H2C1: '波胆 2:1',
        ior_H3C0: '波胆 3:0',
        ior_H3C1: '波胆 3:1',
        ior_H3C2: '波胆 3:2',
        ior_H4C0: '波胆 4:0',
        ior_H4C1: '波胆 4:1',
        ior_H4C2: '波胆 4:2',
        ior_H4C3: '波胆 4:3',
        ior_H0C0: '波胆 0:0',
        ior_H1C1: '波胆 1:1',
        ior_H2C2: '波胆 2:2',
        ior_H3C3: '波胆 3:3',
        ior_H4C4: '波胆 4:4',
        ior_H0C1: '波胆 0:1',
        ior_H0C2: '波胆 0:2',
        ior_H1C2: '波胆 1:2',
        ior_H0C3: '波胆 0:3',
        ior_H1C3: '波胆 1:3',
        ior_H2C3: '波胆 2:3',
        ior_H0C4: '波胆 0:4',
        ior_H1C4: '波胆 1:4',
        ior_H2C4: '波胆 2:4',
        ior_H3C4: '波胆 3:4',
        ior_OVH: '波胆其他'
    }
    var halfBoDanBetInfoMaps = {
        ior_HH1C0: '半场波胆 1:0',
        ior_HH2C0: '半场波胆 2:0',
        ior_HH2C1: '半场波胆 2:1',
        ior_HH3C0: '半场波胆 3:0',
        ior_HH3C1: '半场波胆 3:1',
        ior_HH3C2: '半场波胆 3:2',
        ior_HH0C0: '半场波胆 0:0',
        ior_HH1C1: '半场波胆 1:1',
        ior_HH2C2: '半场波胆 2:2',
        ior_HH3C3: '半场波胆 3:3',
        ior_HH0C1: '半场波胆 0:1',
        ior_HH0C2: '半场波胆 0:2',
        ior_HH1C2: '半场波胆 1:2',
        ior_HH0C3: '半场波胆 0:3',
        ior_HH1C3: '半场波胆 1:3',
        ior_HH2C3: '半场波胆 2:3',
        ior_HOVH: '半场波胆其他'
    }
    var zrqBetInfoMaps = {
        ior_T01: '总 0~1',
        ior_T23: '总 2~3',
        ior_T46: '总 4~6',
        ior_OVER: '总 7+ '
    }
    var bqcBetInfoMaps = {
        ior_FHH: '主主',
        ior_FHN: '主和',
        ior_FHC: '主客',
        ior_FNH: '和主',
        ior_FNN: '和和',
        ior_FNC: '和客',
        ior_FCH: '客主',
        ior_FCN: '客和',
        ior_FCC: '客客',
    }

    var getBetInfo = function (result,betType,data) {

        if (boDanBetInfoMaps[betType]) {
            result.orderInfo = boDanBetInfoMaps[betType];
            return
        }
        if (halfBoDanBetInfoMaps[betType]) {
            result.orderInfo = halfBoDanBetInfoMaps[betType];
            return
        }
        if (zrqBetInfoMaps[betType]) {
            result.orderInfo = zrqBetInfoMaps[betType];
            return
        }
        if (bqcBetInfoMaps[betType]) {
            result.orderInfo = bqcBetInfoMaps[betType];
            return
        }
        switch (betType) {
            case 'ior_MN':
                result.orderInfo = '和局'
                break;
            case 'ior_MH':
                result.orderInfo = data.team_h;
                break;
            case 'ior_MC':
                result.orderInfo = data.team_c;
                break;
            case 'ior_HMN':
                result.orderInfo = '<font color="#00CC00">[半]</font>和局'
                break;
            case 'ior_HMH':
                result.orderInfo = '<font color="#00CC00">[半]</font>' + data.team_h
                break;
            case 'ior_HMC':
                result.orderInfo = '<font color="#00CC00">[半]</font>' + data.team_c
                break;
            case 'ior_RH': // 让球
                if (data.strong) {
                    result.teamInfo = data.team_h + '<font color="#CC0000"><b>' + data.ratio + '</b></font> ' + data.team_c
                } else {
                    result.teamInfo = data.team_c + '<font color="#CC0000"><b>' + data.ratio + '</b></font> ' + data.team_h
                }
                result.orderInfo = data.team_h
                break;
            case 'ior_RC':
                if (data.strong) {
                    result.teamInfo = data.team_h + '<font color="#CC0000"><b>' + data.ratio + '</b></font> ' + data.team_c
                } else {
                    result.teamInfo = data.team_c + '<font color="#CC0000"><b>' + data.ratio + '</b></font> ' + data.team_h
                }
                result.orderInfo = data.team_c
                break;
            case 'ior_HRH': // 半场让球
                if (data.hstrong) {
                    result.teamInfo = data.team_h + '<font color="#CC0000"><b>' + data.hratio + '</b></font> ' + data.team_c
                } else {
                    result.teamInfo = data.team_c + '<font color="#CC0000"><b>' + data.hratio + '</b></font> ' + data.team_h
                }
                result.orderInfo = '<font color="#00CC00">[半]</font>' + data.team_h
                break;
            case 'ior_HRC':
                if (data.hstrong) {
                    result.teamInfo = data.team_h + '<font color="#CC0000"><b>' + data.hratio + '</b></font> ' + data.team_c
                } else {
                    result.teamInfo = data.team_c + '<font color="#CC0000"><b>' + data.hratio + '</b></font> ' + data.team_h
                }
                result.orderInfo = '<font color="#00CC00">[半]</font>' + data.team_c
                break;
            case 'ior_OUH':
                result.orderInfo = '大 ' + data.ratio_o.substr(1,data.ratio_o.length);
                break;
            case 'ior_OUC':
                result.orderInfo = '小 ' + data.ratio_u.substr(1,data.ratio_o.length);
                break;
            case 'ior_HOUH':
                result.orderInfo =  '<font color="#00CC00">[半]</font>大' + data.hratio_o.slice(1,data.hratio_o.length);
                break;
            case 'ior_HOUC':
                result.orderInfo =  '<font color="#00CC00">[半]</font>小' + data.hratio_u.slice(1,data.hratio_u.length);
                break;
            case 'ior_EOO':
                result.orderInfo = '单'
                break;
            case 'ior_EOE':
                result.orderInfo = '双'
                break;
            case 'ior_POUH':
                result.orderInfo = '大'+ data.ratio_o;
                break;
            case 'ior_POUC':
                result.orderInfo = '小'+ data.ratio_u;
                break;
            case 'ior_PRH':
                if (data.strong) {
                    result.teamInfo = data.team_h + '<font color="#CC0000"><b>' + data.ratio + '</b></font> ' + data.team_c
                } else {
                    result.teamInfo = data.team_c + '<font color="#CC0000"><b>' + data.ratio + '</b></font> ' + data.team_h
                }
                result.orderInfo = data.team_h
                break;
            case 'ior_PRC':
                if (data.strong) {
                    result.teamInfo = data.team_h + '<font color="#CC0000"><b>' + data.ratio + '</b></font> ' + data.team_c
                } else {
                    result.teamInfo = data.team_c + '<font color="#CC0000"><b>' + data.ratio + '</b></font> ' + data.team_h
                }
                result.orderInfo = data.team_c
                break;
        }
    }
    var betIsChuan = false, minChuanNum = 0, maxChuanNum = 10;//串上限默认最多100场
    var betAry = []
    var postBetData = []
    var lastBetMatchData = []
    var betShowItemTemplate = '{{each list as bet}}\
                <div class="order_div_bet bet_{{bet.gid}}" data="{{bet.gid}}"> \
                    <div class="order_div_leg_name"> \
                        <span class="bet_close fl_r" onclick="order.deleteBetItem({{bet.gid}})"></span>{{bet.league}} \
                    </div> \
    				{{if bet.sportType == "ft_rb_re"}}&nbsp;&nbsp;<font color="red">{{bet.retimeset}}({{bet.score_h}} - {{bet.score_c}})</font>{{/if}}   \
                    <div class="order_div_Mster_Guest">{{bet.teamInfo}}</div> \
                  <div class="order_div_info {{if bet.oddsIsChange}}bg2{{/if}}"><font color="#CC0000"> {{bet.orderInfo}} </font> @ <font color="#CC0000"><b>{{bet.odds}}</b></font></span></div> \
                </div> \
                {{/each}}';
    var betShowViewHtml = '<div class="order_div">\
            <div class="tiTimer xs" onclick="order.reload()">\
                <span id="bet_time">10</span> \
                <input id="checkOrder" type="checkbox" value="10" checked="">\
            </div>\
            <div class="clear"></div>\
            <div class="order_div_bet_all">\
                <div id="order_bet_items">\
                </div>\
            </div>\
	    	<div id="order_refresh">\
		        <img src="/sports/images/sports/icon01.jpg" width="25" height="21" align="absmiddle">\
		        <span>自动接受较佳赔率 </span>\
		        <input style="vertical-align: middle;" checked="checked" type="checkbox" id="AutoMore" value="1">\
	        </div>\
            <div class="order_div_money">\
                <span class="fl_l">交易金额：</span>\
                <span class="fl_l"><input type="text" name="bet_money" id="bet_money" maxlength="7" onkeyup="return order.calculateCanWinMoney();" onkeydown="if(event.keyCode==13)return order.submitBet();" oncontextmenu="return false" oncopy="return false" oncut="return false" autocomplete="off" onpaste="return false" onkeypress="return isnumber(event);"></span>\
                <div class="clear"></div>\
                <div class="setmoney">\
                    <dd class="smm1" onclick="order.setMoney(10)">10</dd>\
                    <dd class="smm2" onclick="order.setMoney(100)">100</dd>\
                    <dd class="smm3" onclick="order.setMoney(1000)">1000</dd>\
                    <dd class="smm4" onclick="order.setMoney(2000)">2000</dd>\
                </div>\
                <div class="clear"></div>\
                <div class="clear"></div>\
                    可赢金额：<span id="winmoney">0.00</span><br>\
                    单注最低：<span id="minmoney">10</span><br>\
                    单注最高：<span id="maxmoney">20000</span>\
                <div class="clear"></div>\
                <div class="qx_btn fl_l xs" onclick="order.cancelBet()">取消</div>\
                <div id="qr_btn" class="qr_btn fl_l xs" onclick="order.submitBet()">确认交易</div>\
                <div class="clear"></div>\
            </div>\
        <div class="clear"></div>\
    </div>'

    var betedShowTemplate = '<div class="order_div">\
    <div class="order_div_bet_info">\
           <div class="order_div_leg_name"> \
                        <span></span>  {{typeSport}} \
                    </div> \
           <div class="fin_title "><p class="fin_acc">成功提交注单</p><p class="fin_uid">注单号:{{orderID}}</p></div> \
           <div class="leag" style="padding-right: 0px">\
           <div class="order_div_leg_name"><span>  {{league}}{{if sportsType == 18}}&nbsp;&nbsp;<font color="red">{{retimeset}}({{score_h}} - {{score_c}})</font>{{/if}}</span></div>\
           <div class="bet-info">\
           {{team_h}}{{if ratio}}<span style="color: red">{{ratio}}</span>{{/if}}vs.{{team_c}}<br>\
           <span style="color: red">{{optionInfo}}</span>@<span style="color: red"> {{odds}}</span><br>\
            {{if listChuan  && listChuan.length > 0}}\
               {{each listChuan as value index}}\
                   <div class="order_div_leg_name"><span>  {{value.league}}</span></div>\
                   <div class="bet-info">\
                   {{value.team_h}}{{if value.ratio}}<span style="color: red">{{value.ratio}}</span>{{/if}}vs.{{value.team_c}}<br>\
                   <span style="color: red">{{value.optionInfo}}</span>@<span style="color: red"> {{value.odds}}</span><br>\
                   </div>\
               {{/each}}\
           {{/if}}\
           <span>交易金额: {{money}}</span>\
           </div>\
           </div>\
    </div>\
    </div>';


    var betedShowRender = template.compile(betedShowTemplate);

    var betShowItemViewRender = template.compile(betShowItemTemplate, {'escape': false})
    var bet = function (sportType, betType, gid) {
    		//设置了足球/篮球，半/全场提前结束时间，验证比赛是否符合配置规则
    		if(sportType == 'ft_rb_re' || sportType == 'bk_rb_re'){
    			var flag = validateGrounderConfig(sportType, betType, gid);
    			if(flag){
    				betAry = []
    	            clearInterval(countDownTimer)
    	            $('#bet_login_out').html('<div style="padding-top:50px;min-height:100px;">点击赔率便可将<br>选项加到交易单裡</div>')
    				alert("盘口已关闭，请重新刷新!");
    				return;
    			}
    		}
            showOrder();
//            if(sportType == 'ft_ft_hpd'){
//                sportType = 'ft_ft_pd';
//            }else if(sportType == 'ft_fu_hpd'){
//                sportType = 'ft_fu_pd';
//            }
            betIsChuan = false;
            betAry = [{'sportType': sportType, 'betType': betType, 'gid': gid,pdFlag:pd_full_or_half_flag}];
            loadShowBetInfo();
            //filterBetMaxMin(sportType);
        }, betChuan = function (sportType, betType, gid, team_h, team_c) {
          if (!betIsChuan) {
            betAry = [];
          };
          var addBet = function () {
            for (var i = 0; i < betAry.length; i++) {
              if (betAry[i].gid === gid) {
                betAry[i].sportType = sportType;
                betAry[i].betType = betType;
                return
              }else if(betAry[i].team_h == team_h && betAry[i].team_c == team_c){
            	betAry[i].sportType = sportType;
            	betAry[i].betType = betType;
            	betAry[i].gid = gid;
            	return
              }
            }
            betAry.push({
              'sportType': sportType,
              'betType': betType,
              'gid': gid,
              'team_h': team_h,
              'team_c': team_c,
              pdFlag: pd_full_or_half_flag
            });
          };
          if (postBetData && (postBetData.length + 1) > maxChuan) {
            alert('下注最多串数:'+maxChuan);
            return;
          };
          addBet();
          showOrder();
          loadShowBetInfo();
          //filterBetMaxMin(sportType);
          betIsChuan = true;
        }, findLastMatchData = function (gid) {
            if (lastBetMatchData) {
                for (var i = 0; i < lastBetMatchData.length; i++) {
                    if (lastBetMatchData[i].gid === gid) {
                        return lastBetMatchData[i]
                    }
                }
            }
            return null
        }, renderBetShowView = function (list) {
            if ($('#order_bet_items').length == 0) {
                $('#bet_login_out').html(betShowViewHtml)
            }
            var showBetData = []
            postBetData = []
            $.each(list, function (index, data) {
                var lastMatchData = findLastMatchData(data.gid)
                showBetData.push(makeShowBetData(betAry[index].sportType, betAry[index].betType, data, lastMatchData))
                postBetData.push(makePostBetItemData(betAry[index].sportType, betAry[index].betType, data))
            })
            var resultHtml = betShowItemViewRender({'list': showBetData})
            $('#order_bet_items').html(resultHtml);

            calculateCanWinMoney();
        }, makePostBetItemData = function (sportType, betType, matchData) {
            var isTailGame = false;
            if(sportType == "ft_rb_re" || sportType == "bk_rb_re"){
                isTailGame = true;
            }
            
            var tempBetType = betType;
        	//篮球今日综合与篮球早盘综合因表结构与其他比赛表不一致，将比赛类型转换成表结构字段获取赔率
        	if(sportType=="bk_fu_p3" || sportType=="bk_ft_p3"){
        		switch(betType){
	        		case "ior_RH": tempBetType = "ior_PRH";break;
	        		case "ior_OUH": tempBetType="ior_POUH";break;
	    	    	case "ior_RC": tempBetType="ior_PRC";break;
	    	    	case "ior_OUC": tempBetType="ior_POUC";break;
        		}
        	}
            
            var result = {
                sportType: sportType,
                betType: betType,
                betInfo: '',
                gid: matchData.gid,
                odds: matchData[tempBetType],
                strong: true,
                handlerConfirm:isTailGame,
            }
            getPostBetInfo(result, betType, matchData);
            return result
        }, makeShowBetData = function (sportType, betType, data, lastData) {
        	var tempBetType = betType;
        	//篮球今日综合与篮球早盘综合因表结构与其他比赛表不一致，将比赛类型转换成表结构字段获取赔率
        	if(sportType=="bk_fu_p3" || sportType=="bk_ft_p3"){
        		switch(betType){
	        		case "ior_RH": tempBetType = "ior_PRH";break;
	        		case "ior_OUH": tempBetType="ior_POUH";break;
	    	    	case "ior_RC": tempBetType="ior_PRC";break;
	    	    	case "ior_OUC": tempBetType="ior_POUC";break;
        		}
        	}
        		
            var result = {
                gid: data.gid,
                league: data.league,
                teamInfo: data.team_h + '<font color="#CC0000"><b>VS.</b></font> ' + data.team_c,
                orderInfo: '',
                oddsIsChange: lastData && lastData[betType] !== data[betType],
                odds: data[tempBetType]
            }
            if(sportType == "ft_rb_re") {
            	result.sportType = sportType;
            	result.retimeset = data.retimeset;
            	result.score_h = data.score_h;
            	result.score_c = data.score_c;
            }
            
            getBetInfo(result, betType, data);
            return result
        },
        /*filterBetMaxMin = function (st) {

            var betmax, betmin;
            switch (st) {
                case 'ft_rb_re':
                    betmin = betConfig.ftRMinLimit;
                    betmax = betConfig.ftRMaxLimit;
                    break;
                case 'bk_rb_re':
                    betmin = betConfig.bkRMinLimit;
                    betmax = betConfig.bkRMaxLimit;
                    break;
                case 'ft_ft_r':
                    betmin = betConfig.ftSMinLimit;
                    betmax = betConfig.ftSMaxLimit;
                    break;
                case 'bk_ft_all':
                    betmin = betConfig.bkSMinLimit;
                    betmax = betConfig.bkSMaxLimit;
                    break;
                case 'ft_ft_pd':
                    betmin = betConfig.ftPMinLimit;
                    betmax = betConfig.ftPMaxLimit;
                    break;
                case 'ft_ft_hpd':
                	betmin = betConfig.ftHPMinLimit;
                    betmax = betConfig.ftHPMaxLimit;
                    break;
                case 'ft_ft_t':
                    betmin = betConfig.ftTMinLimit;
                    betmax = betConfig.ftTMaxLimit;
                    break;
                case 'ft_ft_f':
                    betmin = betConfig.ftHTMinLimit;
                    betmax = betConfig.ftHTMaxLimit;
                    break;
                case 'ft_ft_p3':
                    betmin = betConfig.ftCMinLimit;
                    betmax = betConfig.ftCMaxLimit;
                    break;
                case 'bk_ft_p3':
                    betmin = betConfig.bkCMinLimit;
                    betmax = betConfig.bkCMaxLimit;
                    break;
                case 'ft_fu_r':
                    betmin = betConfig.ftMSMinLimit;
                    betmax = betConfig.ftMSMaxLimit;
                    break;
                case 'ft_fu_pd':
                    betmin = betConfig.ftMPMinLimit;
                    betmax = betConfig.ftMPMaxLimit;
                    break;
                case 'ft_fu_hpd':
                    betmin = betConfig.ftMHPMinLimit;
                    betmax = betConfig.ftMHPMaxLimit;
                    break;
                case 'ft_fu_t':
                    betmin = betConfig.ftMTMinLimit;
                    betmax = betConfig.ftMTMaxLimit;
                    break;
                case 'ft_fu_f':
                    betmin = betConfig.ftMHTMinLimit;
                    betmax = betConfig.ftMHTMaxLimit;
                    break;
                case 'ft_fu_p3':
                    betmin = betConfig.ftMCMinLimit;
                    betmax = betConfig.ftMCMaxLimit;
                    break;
                case 'bk_fu_all':
                    betmin = betConfig.bkMSMinLimit;
                    betmax = betConfig.bkMSMaxLimit;
                    break;
                case 'bk_fu_p3':
                    betmin = betConfig.bkMCMinLimit;
                    betmax = betConfig.bkMCMaxLimit;
                    break;
            }
            //黑名单过滤
            var uname = $("#userName").html();
            var searchStr = '/,?' + uname + ',?/';
            if(betConfig!=undefined && betConfig!=null 
            		&& betConfig.blackList!=null && betConfig.blackList!=undefined){
            	if (uname != '' && betConfig.blackList.search(searchStr) != -1) {
                    betmax = betConfig.blackMaxLimitMoney;
                }
            }
            
            $("#minmoney").text(betmin||10);
            $("#maxmoney").text(betmax||20000);
        },*/
        loadShowBetInfo = function () {
            var requestAry = []
            $.each(betAry, function (index, data) {
                requestAry.push({'sportType': data.sportType, 'gid': data.gid})
            });
            $.ajax({
                url: '/api/sports/getMatch',
                type: 'POST',
                cache: false,
                dataType: 'json',
                async:false,
                contentType: "application/json",
                data: JSON.stringify({list: requestAry}),
                success: function (response) {
                    var list = response.list;
                    renderBetShowView(list);
                    lastBetMatchData = list;
                    reloadCountDown();
                    $("#minmoney").text(response.min||10);
                    $("#maxmoney").text(response.max||20000);
                },
                error: apiErrorHandler
            })
        },
        countDownTimer, reloadCountDown = function () {
            if (countDownTimer) {
                clearInterval(countDownTimer)
            }
            if ($("#checkOrder").is(':checked')) {
                var reloadDelayTime = 10
                $("#bet_time").html(reloadDelayTime);
                countDownTimer = setInterval(function () {
                    $("#bet_time").html(reloadDelayTime)
                    if (reloadDelayTime === 0) {
                        clearInterval(countDownTimer);
                        loadShowBetInfo();
                    }
                    reloadDelayTime -= 1;
                }, 1000)
            } else {
                $("#bet_time").html('');
            }
        }, deleteBetItem = function (gid) {
            var betItemLength = $('.order_div_bet').length;
            if (betItemLength > 1) {
                $('.bet_' + gid).remove()
                for (var i = 0; i < betAry.length; i++) {
                    if (betAry[i].gid === gid) {
                        betAry.splice(i, 1)
                        loadShowBetInfo()
                        break
                    }
                }
            } else {
                cancelBet();
            }
        }, cancelBet = function () {
            betAry = []
            clearInterval(countDownTimer)
            $('#bet_login_out').html('<div style="padding-top:50px;min-height:100px;">点击赔率便可将<br>选项加到交易单裡</div>')
        }, submitBet = function () {
            var money = $('#bet_money').val()
            var minmoney = parseFloat($("#minmoney").text());
            var maxmoney = parseFloat($("#maxmoney").text());
            //获取自动接受较佳赔率复选框是否选中
            var autoMore = $("#AutoMore").get(0).checked;

            if (!money) {
                $('#bet_money').focus();
                alert('请填写下注金额！');
                return;
            }
            if (!/^\d+(\.\d+)?$/.test(money)) {
                $('#bet_money').focus();
                alert('下注金额不正确！');
                return
            }
            var money = parseFloat(money);
            if (money < minmoney && minmoney>0) {
                $('#bet_money').focus();
                alert('投注金额不符合限定金额\n最少：' + minmoney);
                return
            }
            if (money > maxmoney && maxmoney>0) {
                $('#bet_money').focus();
                alert('投注金额不符合限定金额\n最多：' + maxmoney);
                return
            }
            if (betIsChuan) {
                if (postBetData.length < minChuan) {
                    alert('下注最少串数为:' + minChuan);
                    return
                }
                if (postBetData.length > maxChuan) {
                    alert('下注最多串数:' + maxChuan);
                    return
                }
            }

          var isExit = false;
          //判断赔率是否小于0
          $.each(postBetData, function (index, data) {
            if (data && data.odds <= 0) {
              isExit = true;
              return false;
            }
          });
          if (isExit) {
            alert("赔率发生变化，请重新刷新页面");
            return;
          };

                clearInterval(countDownTimer)
                $.ajax({
                    url: '/api/sports/bet',
                    type: 'POST',
                    dataType: 'json',
                    cache: false,
                    contentType: "application/json",
                    data: JSON.stringify({betItems: postBetData, money: money,autoMore: autoMore, canWin: $('#winmoney').html()}),
                    success: function (response) {
                        if(response.success == false) {
                            if(response.msg){
                                alert(response.msg);
                            }else{
                                alert("盘口已关闭，请重新刷新!");
                            }
                        }else{
                            alert("你已经成功提交注单,请至下注状况查案注单是否已确认!");
                            getuserinfo();
                            $('#bet_login_out').html(betedShowRender(response.o));
                            betAry = [];
                            //重新加载
                            loadBetedLogs();
                            showRec();
                            // updateBetsLog(response.bet);
                            //根据订单 获取订单交易记录,插入到最新交易记录中
                        }

                    },
                    error: function(response) {
                    	var result = JSON.parse(response.responseText);
                        if (result && result.code) {
                            switch (result.code) {
                                case 'UC/TOKEN_INVALID':
                                    showNoLoginTip();
                                    break;
                                default:
                                    var errorMsg = result.msg || '发生错误了';
                                    alert(errorMsg);
                                    if(postBetData.length == 0 && postBetData[0].soprtType.indexOf('rb_re')>0){
                                        startRefresh(0,30,30);
                                    }else{
                                        startRefresh(0);
                                    }
                                    break;
                            }
                        }
                    }
                })

        }, setMoney = function (val) {
            $('#bet_money').val(val)
            calculateCanWinMoney()
        }, calculateCanWinMoney = function () {
            var money = $('#bet_money').val();
            var canWinMoney = 0;
            var isZhongHeGuoGuan=false;
            if (/^\d+(\.\d+)?$/.test(money)) {
                canWinMoney = parseFloat(money);
                $.each(postBetData, function (index, data) {
                	//综合过关计算赔率
                	if(data.sportType == "bk_ft_p3" || data.sportType == "bk_fu_p3"
                			|| data.sportType == "ft_ft_p3" || data.sportType== "ft_fu_p3"){
                		canWinMoney = canWinMoney * data.odds;
                    isZhongHeGuoGuan=true;
                		return true;
                	}
                	var odd = data.odds;
                	//除大小、让球的赔率计算时不减1，其他赔率计算需要减1
                	switch(data.betType){
                		case "ior_OUH": break;
                		case "ior_OUC": break;
                		case "ior_HRH": break;
                		case "ior_HRC": break;
                		case "ior_HOUH": break;
                		case "ior_HOUC": break;
                		case "ior_RH": break;
                		case "ior_RC":break;
                		default : odd = odd -1; break;
                	}
                    canWinMoney = canWinMoney * odd;
                })
            };
            if(isZhongHeGuoGuan){
              canWinMoney=canWinMoney-money;
            };
            $('#winmoney').html(canWinMoney.toFixed(2));
        },
        checkIsMaintainDistance = function (start,end) {
        //体育游戏维护判断逻辑
            var date = new Date(),
                timeStamp = date.getTime();
            if(timeStamp > new Date(start).getTime() && timeStamp < new Date(end).getTime()) {
                return true;
            }
            return false;
        },
        validateGrounderConfig = function(sportType,betType,gid){
        	var flag;
        	$.ajax({
                url: '/api/sports/validateGrounderConfig?sportType='+sportType+'&betType='+betType+'&gid='+gid,
                async:false,
                type: 'GET',
                success: function (data) {
                	flag = data;
                },
                error:apiErrorHandler
            });
        	return flag;
        },
        initBetConfig = function () {
            $.ajax({
                url: '/api/sports/getBetConfig',
                type: 'GET',
                cache: false,
                dataType: 'json',
                contentType: "application/json",
                success: function (response) {
                	 //用户没有登陆，配置维护时间
                    betConfig = response;
                    //单用户投注限制
                    var userName = $('#userName').html();
                    if(userName != null && userName != undefined && userName!="请先登录！" && userName!="你好，请先登录！"){
                        $.ajax({
                            url: '/api/sports/getSingleUserBetConfig',
                            type: 'GET',
                            cache: false,
                            dataType: 'json',
                            contentType: "application/json",
                            success: function (responseSecond) {
                            	//没有限制，使用全局配置
                            	if(responseSecond.blackList=="noSingleUser") {
                                betConfig = response
                            	}else{//有限制 ，使用 用户限制配置
                            		betConfig = responseSecond;
                            		betConfig.blackList = response.blackList;
                            		betConfig.blackMaxLimitMoney = response.blackMaxLimitMoney;
                            	}
                            }
                        });
                    }

                  minChuan = parseInt(betConfig.chuanMinNumber) || 2
                  maxChuan = parseInt(betConfig.chuanMaxNumber) || 10

                }
            })
        };
    //initBetConfig();

    return {
        bet:bet,
        betChuan: betChuan,
        cancelBet: cancelBet,
        deleteBetItem: deleteBetItem,
        submitBet: submitBet,
        setMoney: setMoney,
        calculateCanWinMoney: calculateCanWinMoney,
        reload: loadShowBetInfo,
       // filterBetMaxMin:filterBetMaxMin,
        initBetConfig:initBetConfig
    }
}();