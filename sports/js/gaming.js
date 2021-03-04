/**
 * @Description:电子竞技
 *
 * 日期格式
 */
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
/**
 * 跳转登录面板
 * error.js调用
 */
var mem_logout = function () {
    $.get("/v/user/logout", {}, function (data) {
        $.cookie("account", null, {path: '/'});
        $.cookie("token", null, {path: '/'});
        $.cookie("userType", null, {path: "/"});
        // parent.location.href = '/views/main.html';
        parent.location.href = '/views/html/login.html';
    }).error(function (XMLHttpRequest) {
        $.cookie("account", null, {path: '/'});
        $.cookie("token", null, {path: '/'});
        $.cookie("userType", null, {path: "/"});
        // parent.location.href = '/views/main.html';
        parent.location.href = '/views/html/login.html';
    })
};
var gameRoundText = ['全场', '第一局', '第二局', '第三局', '第四局', '第五局', '第六局', '第七局'];
var gameRoundRuleText = {'1': '一局制', '3': '三局两胜', '5': '五局三胜', '7': '七局四胜'};
var storeKey = 'eSports_bet_data';
var mySwiper;
var esportsMatchDate;
//赔率刷新
var refreshIntervalMap = {};
refreshIntervalMap['refreshMatch'] = setInterval("getMatch(1)", 1000 * 30);
/**
 * 初始化日期控件.
 */
var initDatePicker = function () {
    var today = new Date();
    var todayStr = today.format('yyyy-MM-dd');
    var maxYear = today.getFullYear();
    today.setDate(today.getDate() - 7);
    var str7dayAgo = today.format('yyyy-MM-dd');
    $.datetimepicker.setLocale('zh');
    //订单查询时间1
    $('#startTime').val(str7dayAgo).datetimepicker({
        lang: 'ch',
        format: 'Y-m-d',
        yearStart: 2015,
        yearEnd: maxYear,
        minDate: str7dayAgo,
        onShow: function (ct) {
            this.setOptions({
                maxDate: $('#startEnd').val() ? $('#startEnd').val() : false
            })
        },
        onSelectDate: function (dateText, inst) {
            $("#startEnd").datetimepicker("option", "minDate", dateText);
            return true;
        }
    });
    //订单查询时间2
    $('#startEnd').val(todayStr).datetimepicker({
        lang: 'ch',
        format: 'Y-m-d',
        yearStart: 2015,
        yearEnd: maxYear,
        maxDate: "+0d",
        onShow: function (ct) {
            this.setOptions({
                minDate: $('#startTime').val() ? $('#startTime').val() : false
            })
        },
        onSelectDate: function (dateText, inst) {
            $("#startTime").datetimepicker("option", "maxDate", dateText);
            $("#startTime").datetimepicker("option", "default", dateText);
            return true;
        }
    });
    //赛果查询时间1
    $('#Resuot_startTime').val(todayStr).datetimepicker({
        lang: 'ch',
        format: 'Y-m-d',
        yearStart: 2015,
        yearEnd: maxYear,
        defaultSelect: true,
        onShow: function (ct) {
            this.setOptions({
                maxDate: $('#Resuot_startEnd').val() ? $('#Resuot_startEnd').val() : false
            })
        }
    });
    //赛果查询时间2
    $('#Resuot_startEnd').val(todayStr).datetimepicker({
        lang: 'ch',
        format: 'Y-m-d',
        yearStart: 2015,
        yearEnd: maxYear,
        defaultSelect: true,
        onShow: function (ct) {
            this.setOptions({
                maxDate: todayStr
            })
        },
        onSelectDate: function (dateText, inst) {
            if ($('#Resuot_startEnd').val() < $('#Resuot_startTime').val() || !$('#Resuot_startTime').val()) {
                $('#Resuot_startTime').val($('#Resuot_startEnd').val());
            }
            return true;
        }
    });
};
/**
 *获取用户信息
 */
var getUserInfo = function () {
    try {
        $.ajax('/api/user/info', {
            //async: false,
            success: function (data) {
                $.cookie('account', data.userInfo.account, {path: '/'});
                $(parent.document).find('.top_u_money').text((data.extInfo.money || 0).toFixed(2));
            }, error: function (data) {
                $.cookie('account', '', {path: '/'});
            }
        });
    } catch (e) {

    }
};
/**
 *  是否登录
 * @returns {boolean}
 */
var isLogined = function () {
    var account = $.cookie('account', {path: '/'});
    return account != null && account != undefined && account !== '';
};

/**
 * 获取赛事数据
 * @param pageIdx
 * @param init
 */
var getMatch = function (pageIdx, init) {
    //return;
    showLoading();
    var pageSize = 1000;
    $.getJSON('/api/eSports/queryMatchPage', {
        matchDateStart: esportsMatchDate,
        matchDateEnd: esportsMatchDate,
        page: pageIdx,
        rows: pageSize,
        queryType: 'm'
    }, function (response) {
        // var pageNo = Math.ceil(response.totalCount / pageSize);
        // $(".paging").empty().Page({
        //     Pages: pageNo,
        //     PageOn: getMatch,
        //     JumpOn: getMatch,
        //     Jump: false,
        //     Page: pageIdx,
        //     // PageNum: pageNo + 2,
        //     ActiveClass: "paging-select"
        // });
        hideLoading();
        renderMatch(response);
    });
};
/**
 * 展示赛事数据
 * @param response
 */
var renderMatch = function (response) {
    var data = response.data;
    var matchList = $('.listDelite').empty();

    if (data && $.isArray(data) && data.length > 0) {
        data.sort(function (a, b) {
            return Date.parse(a.matchDate) - Date.parse(b.matchDate);
        });
        var dateNow = new Date();
        $.each(data, function (idx, match) {
            try {
                var matchType = response.otherData.matchTypes[match.matchTypeId];
                var isLive = (dateNow - Date.parse(match.matchDate) >= 0);
                matchList.append('<tr onclick="nextMenu(this,' + match.id + ',\'' + match.teamH + '\',\'' + match.matchDate + '\')">' +
                    '<td>' + '<div>' + (matchType.name + (matchType.groupType ? ('(' + matchType.groupType + ')') : '')) + '</div>' +
                    '<div>' + match.matchDate + '</div>' +
                    '</td>' +
                    '<td>' +
                    '<span class="gameLogo"></span>' +
                    '</td>' +
                    '<td>' +
                    //'<span class="gametext">Winner</span>' +
                    '</td>' +
                    '<td>' +
                    '<span class="gamenameLeft">' + match.teamH + '</span>' +
                    '<span class="gamePicLeft" style="background: url(\'' + match.hLogo + '\')"></span>' +
                    //'<button>3.2</button>' + //class="active"
                    '<span class="vs" style="color: #21cc0e;">VS</span>' +
                    //'<button>3.2</button>' +
                    '<span class="gamePicRight" style="background:url(\'' + match.cLogo + '\')"></span>' +
                    '<span class="gamenameRight">' + match.teamC + '</span>' +
                    '</td>' +
                    '<td>' +
                    //'<span class="gameChangeright">' + ('+' + (match.bo && match.bo >= 0 ? (match.bo + 1) : 0)) + '</span>' +
                    '</td>' +
                    '</tr>' +
                    '<tr class="nextMenu">' +
                    '</tr>');
            } catch (e) {
            }
        });
        //展开赛事.
        $(".listDelite > tbody > tr :even").click();
    } else {
        matchList.append('<div style="text-align: center;font-size: 20px;padding-top: 20px;font-weight: 600;">暂无赛事数据</div>');
    }
};
/**
 * 对局信息toggle
 * @param _this
 * @param matchId
 * @param teamH
 * @param matchDate
 */
// nextMenu(this,191,'sViper','2018-02-23 20:00:00')
var nextMenu = function (_this, matchId, teamH, matchDate) {
    var container = $(_this).next();
    var _type = container.css("display");
    //$('.nextMenu').empty().hide();
    switch (_type) {
        case "none":
            //container.css("display", "block");
            showLoading();
            getCompetition(container, matchId, teamH, matchDate);
            //clearInterval(refreshIntervalMap['match_' + matchId]);
            //refreshIntervalMap['match_' + matchId] = setInterval("getCompetition('container'," + matchId + ",'" + teamH + "','" + matchDate + "',true)", 1000 * 30);
            break;
        case "block":
            // clearInterval(refreshIntervalMap['match_' + matchId]);
            hideLoading();
            container.css("display", "none");
            //container.empty();
            break;
    }
    hideLoading();
};
/**
 * 获取玩法数据
 * @param container
 * @param matchId
 * @param teamHName
 * @param matchDate
 * @param isRefresh
 */
var getCompetition = function (container, matchId, teamHName, matchDate, isRefresh) {
    isRefresh = (isRefresh === true);
    showLoading();
    matchDate = matchDate || "";
    $.getJSON('/api/eSports/queryMatchCompetition',
        {matchId: matchId},
        function (data) {
            hideLoading();
            if (data && $.isArray(data) && data.length > 0) {
                //合并主客队及对局
                var currentMatch = {teamHName: teamHName};
                var gameRounds = {};
                $.each(data, function (idx, cmpt) {
                    /*if (cmpt.odds == null || isNaN(cmpt.odds) || cmpt.odds <= 0) {
                        return;
                    }*/
                    cmpt.title = cmpt.title.replace('X', cmpt.betData);
                    cmpt.competitionTypeDesc = cmpt.competitionTypeDesc.replace('X', cmpt.betData);
                    var competitionKey = 'EM_' + cmpt.matchId + '_EMR_' + cmpt.matchResultId + '_ECT_' + cmpt.competitionType;
                    if (!gameRounds[cmpt.round]) {
                        gameRounds[cmpt.round] = {};
                    }
                    if (!gameRounds[cmpt.round][competitionKey]) {
                        gameRounds[cmpt.round][competitionKey] = {
                            round: cmpt.round,
                            competitionType: cmpt.competitionType,
                            competitionTypeDesc: cmpt.competitionTypeDesc
                        };
                    }
                    if (!cmpt.competitionTeam || cmpt.competitionTeam === null || cmpt.competitionTeam === '' || cmpt.competitionType === 6) {//整局下注,如比赛时长,比分
                        gameRounds[cmpt.round][competitionKey].united = gameRounds[cmpt.round][competitionKey].united || [];
                        gameRounds[cmpt.round][competitionKey].united.push(cmpt);
                    } else {
                        if (cmpt.competitionType == 18) {//大小
                            if (!gameRounds[cmpt.round][competitionKey].teamH) {
                                gameRounds[cmpt.round][competitionKey].teamH = cmpt;
                            } else {
                                gameRounds[cmpt.round][competitionKey].teamC = cmpt;
                            }
                        } else if (cmpt.competitionType == 16) {//让分,coupleId匹配.
                            gameRounds[cmpt.round][competitionKey]['coupleId_' + cmpt.coupleId] = gameRounds[cmpt.round][competitionKey]['coupleId_' + cmpt.coupleId] || {coupleId: cmpt.coupleId};
                            if (teamHName === cmpt.competitionTeam) {
                                gameRounds[cmpt.round][competitionKey]['coupleId_' + cmpt.coupleId].teamH = cmpt;
                            } else if (cmpt.competitionTeam == null || cmpt.competitionTeam === '' || cmpt.competitionTeam === 'NONE') {
                                gameRounds[cmpt.round][competitionKey]['coupleId_' + cmpt.coupleId].other = cmpt;
                            } else {
                                gameRounds[cmpt.round][competitionKey]['coupleId_' + cmpt.coupleId].teamC = cmpt;
                            }
                        } else {//主客队下注,如胜负
                            if (teamHName === cmpt.competitionTeam) {
                                gameRounds[cmpt.round][competitionKey].teamH = cmpt;
                            } else if (cmpt.competitionTeam == null || cmpt.competitionTeam === '' || cmpt.competitionTeam === 'NONE') {
                                gameRounds[cmpt.round][competitionKey].other = cmpt;
                            } else {
                                gameRounds[cmpt.round][competitionKey].teamC = cmpt;
                            }
                        }
                        if (teamHName !== cmpt.competitionTeam && !currentMatch.teamCName) {
                        currentMatch.teamCName = currentMatch.teamCName || cmpt.competitionTeam;
                    }
                        }
                });
                currentMatch.gameRounds = gameRounds;
                //页面HTML生成
                var fillBlankBetItem = function (numbers, tmplHtml) {
                    if (numbers == null || isNaN(numbers) || numbers <= 0) {
                        return '';
                    }
                    numbers = Math.ceil(numbers);
                    var template = '<span style="visibility: hidden"><a></a><a></a></span>';
                    if (tmplHtml) {
                        template = tmplHtml;
                    }
                    var strHtml = '';
                    for (var i = 0; i < numbers; i++) {
                        strHtml += template;
                    }
                    return strHtml;
                };
                var allCompetitions = {};
                $.each(currentMatch.gameRounds, function (roundNum, gameRound) {
                    //appScope适用范围:0全适用，1全场，2单局
                    var gameTitle = currentMatch.teamHName + " VS " + currentMatch.teamCName + '[' + gameRoundText[roundNum] + ']';
                    $.each(Object.keys(gameRound), function (index, key) {
                        try {
                            var competition = gameRound[key];
                            var betItemsHtml = '';
                            var competitionTitle = '';
                            var betItems = 0;
                            if (competition.united) {//单双,比分
                                competitionTitle = '<div class="gameDtlite-head"><a>|</a>' + gameRoundText[roundNum] + competition.competitionTypeDesc + '</div>';
                                $.each(competition.united, function (i, utcp) {
                                    var betItemUid = utcp.matchResultId + '_' + utcp.competitionType + '_' + utcp.id;
                                    var clickEvent = '';
                                    var betExistsResult = betExistsFn(betItemUid);
                                    var title = '';
                                    if (utcp.hasPreSet === 1) {//读取预设
                                        if (utcp.rangeStatus) {
                                            title = (utcp.rangeOne || "") + (utcp.rangeTwo ? (' ~ ' + utcp.rangeTwo) : "");
                                        } else {
                                            title = utcp.betData || "";
                                        }
                                    }
                                    if (!utcp.strong) {
                                        title = (utcp.betData == 1 ? '单' : (title == 2 ? '双' : (utcp.betData || '')));
                                    }
                                    if (utcp.competitionType === 6) {
                                        if (utcp.competitionTeam === 'NONE') {
                                            title = '一样多';
                                        } else {
                                            title = utcp.competitionTeam;
                                        }
                                    }
                                    var wrongOdds = (utcp.odds == null || isNaN(utcp.odds) || utcp.odds <= 0);
                                    if (!wrongOdds) {
                                        clickEvent = 'competitionBet(this,\''
                                            + betItemUid + '\',\''
                                            + gameTitle + '\',\''
                                            + title + '\',\''
                                            + utcp.title + '\','
                                            + (utcp.odds || 0) + ',\''
                                            + matchDate + '\',\''
                                            + utcp.betData + '\',\''
                                            + teamHName + '\')';
                                        betItems += 1;
                                    } else if (betExistsResult !== true) {
                                        removeBet(betItemUid);
                                        return;
                                    }
                                    if (!isRefresh) {
                                        if (utcp.strong) {//让分
                                            betItemsHtml += '<span class="' + (betExistsResult === true ? ' active' : '') + '" id="bet_' + betItemUid +
                                                '" onclick="' + clickEvent + '">' +
                                                '<a>' + title + '</a><a>' + (wrongOdds ? '暂无赔率' : utcp.odds.toFixed(2)) + '</a></span>';
                                        } else {//单双,比分.
                                            betItemsHtml += '<span class="' + (betExistsResult === true ? ' active' : '') + '" id="bet_' + betItemUid +
                                                '" onclick="' + clickEvent + '">' +
                                                '<a>' + title + '</a><a>' + (wrongOdds ? '暂无赔率' : utcp.odds.toFixed(2)) + '</a></span>';
                                        }
                                    } else {//仅刷新赔率
                                        $("#bet_" + betItemUid + ' > a').eq(1).text((utcp.odds || 0).toFixed(2));
                                        $("#bet_" + betItemUid).attr('onclick', clickEvent);
                                    }
                                });
                            } else {
                                competitionTitle = '<div class="gameDtlite-head"><a>|</a>' + gameRoundText[roundNum] + competition.competitionTypeDesc + '</div>';
                                //betItems = Object.keys(competition).length - 1;
                                var competitionPairs = [];
                                if (competition.competitionType == 16) {
                                    $.each(Object.keys(competition), function (cpiIdx, cpiCmpt) {
                                        if (competition[cpiCmpt].coupleId) {
                                            competitionPairs.push(competition[cpiCmpt]);
                                        }
                                    })
                                } else {
                                    competitionPairs.push(competition);
                                }
                                $.each(competitionPairs, function (iii, cpCompetition) {
                                    var betSubTitle = '';
                                    var otherItemDesc = '';
                                    if (cpCompetition.other) {
                                        if (cpCompetition.other.competitionType === 4 || cpCompetition.other.competitionType === 17) {//主宰,击杀数.
                                            otherItemDesc = '均未获得';
                                        } else if (cpCompetition.other.competitionType === 6) {//击杀
                                            otherItemDesc = '一样多';
                                        }
                                    }
                                    var hBetItemUid = (cpCompetition.teamH.matchResultId + '_' + cpCompetition.teamH.competitionType + '_' + cpCompetition.teamH.id);
                                    var cBetItemUid = (cpCompetition.teamC.matchResultId + '_' + cpCompetition.teamC.competitionType + '_' + cpCompetition.teamC.id);
                                    var oBetItemUid = (!cpCompetition.other ? '' : (cpCompetition.other.matchResultId + '_' + cpCompetition.other.competitionType + '_' + cpCompetition.other.id));
                                    var hWrongOdds = (cpCompetition.teamH.odds == null || isNaN(cpCompetition.teamH.odds) || cpCompetition.teamH.odds <= 0);
                                    var cWrongOdds = (cpCompetition.teamC.odds == null || isNaN(cpCompetition.teamC.odds) || cpCompetition.teamC.odds <= 0);
                                    var oWrongOdds = (!cpCompetition.other || cpCompetition.other.odds == null || isNaN(cpCompetition.other.odds) || cpCompetition.other.odds <= 0);
                                    var hClickEvent = '';
                                    var cClickEvent = '';
                                    var oClickEvent = '';
                                    var hBetExistsResult = betExistsFn(hBetItemUid);
                                    var cBetExistsResult = betExistsFn(cBetItemUid);
                                    var oBetExistsResult = (cpCompetition.other ? betExistsFn(oBetItemUid) : false);
                                    var isSumScoreType = (cpCompetition.teamH.competitionType === 18 || cpCompetition.teamC.competitionType === 18);

                                    //让分 添加让分信息,H:主让,C:客让,N:非让分
                                    var isStrong = (cpCompetition.teamH.competitionType === 16 && (cpCompetition.teamH.strong || cpCompetition.teamC.strong)) ? (cpCompetition.teamH.betData ? 'H' : 'C') : 'N';
                                    var middleBlock = '';
                                    if (isStrong !== 'N') {//让分
                                        if (cpCompetition.teamH.strong === 'H' && cpCompetition.teamH.betData) {
                                            betSubTitle = '[主让]' + cpCompetition.teamH.betData;
                                        }
                                        if (cpCompetition.teamC.strong === 'C' && cpCompetition.teamC.betData) {
                                            betSubTitle = '[客让]' + cpCompetition.teamC.betData;
                                        }
                                        middleBlock = ('<span class="noHover" style="width: 60px;"><a>' + (isStrong === 'H' ? '主让' : '客让') + '</a><a>' + (isStrong === 'H' ? cpCompetition.teamH.betData : cpCompetition.teamC.betData) + '局</a></span>');
                                    } else if (isSumScoreType) {//比分大小
                                        //middleBlock = ('<span class="noHover" style="width: 60px;"><a>比分(和)</a><a>' + cpCompetition.teamC.betData + '</a></span>');
                                        betSubTitle = cpCompetition.teamH.betData + '-比分(和)';
                                    } else {
                                        betSubTitle = cpCompetition.teamC.title;
                                    }
                                    if (!hWrongOdds) {
                                        hClickEvent = 'competitionBet(this,\''
                                            + hBetItemUid + '\',\''
                                            + gameTitle + '\',\''
                                            + (isStrong === 'N' ? cpCompetition.teamH.competitionTeam : cpCompetition.teamH.title) + '\',\''
                                            + betSubTitle + (isStrong !== 'N' ? '-[主胜]' : '') + '\','
                                            + (cpCompetition.teamH.odds || 0) + ',\''
                                            + matchDate + '\',\''
                                            + (isStrong !== 'C' ? cpCompetition.teamH.betData : cpCompetition.teamC.betData) + '\',\''
                                            + teamHName + '\')';
                                        betItems += 1;
                                    } else if (hBetExistsResult !== true) {
                                        removeBet(hBetItemUid);
                                    }
                                    if (!cWrongOdds) {
                                        cClickEvent = 'competitionBet(this,\''
                                            + cBetItemUid + '\',\''
                                            + gameTitle + '\',\''
                                            + (isStrong === 'N' ? cpCompetition.teamC.competitionTeam : cpCompetition.teamC.title) + '\',\''
                                            + betSubTitle + (isStrong !== 'N' ? '-[客胜]' : '') + '\','
                                            + (cpCompetition.teamC.odds || 0) + ',\''
                                            + matchDate + '\',\''
                                            + (isStrong !== 'H' ? cpCompetition.teamC.betData : cpCompetition.teamH.betData) + '\',\''
                                            + teamHName + '\')';
                                        betItems += 1;
                                    } else if (cBetExistsResult !== true) {
                                        removeBet(cBetItemUid);
                                    }
                                    if (!oWrongOdds) {
                                        oClickEvent = 'competitionBet(this,\''
                                            + oBetItemUid + '\',\''
                                            + gameTitle + '\',\''
                                            + otherItemDesc + '\',\''
                                            + betSubTitle + (isStrong !== 'N' ? '' : '') + '\','
                                            + (cpCompetition.other.odds || 0) + ',\''
                                            + matchDate + '\',\''
                                            + (isStrong !== 'H' ? cpCompetition.other.betData : cpCompetition.other.betData) + '\',\''
                                            + teamHName + '\')';
                                        betItems += 1;
                                    } else if (cpCompetition.other && oBetExistsResult !== true) {
                                        removeBet(oBetItemUid);
                                    }
                                    if (!isRefresh) {
                                        betItemsHtml += (!hWrongOdds ?
                                            ('<span id="bet_' + hBetItemUid + '" class="' + (betExistsFn(hBetItemUid) === true ? ' active' : '') +
                                                '" onclick="' + hClickEvent + '"><a>' +
                                                cpCompetition.teamH.competitionTeam + (isSumScoreType ? cpCompetition.teamH.betData : '') + '</a><a>' + cpCompetition.teamH.odds.toFixed(2) +
                                                '</a></span>') : fillBlankBetItem(1)) + middleBlock;
                                        betItemsHtml += (!cWrongOdds ?
                                            ('<span id="bet_' + cBetItemUid + '" class="' + (betExistsFn(cBetItemUid) === true ? ' active' : '') +
                                                '" onclick="' + cClickEvent + '"><a>' +
                                                cpCompetition.teamC.competitionTeam + (isSumScoreType ? cpCompetition.teamC.betData : '') + '</a><a>' + cpCompetition.teamC.odds.toFixed(2) +
                                                '</a></span>') : fillBlankBetItem(1));
                                        betItemsHtml += (!oWrongOdds ?
                                            ('<span id="bet_' + oBetItemUid + '" class="' + (betExistsFn(oBetItemUid) === true ? ' active' : '') +
                                                '" onclick="' + oClickEvent + '"><a>' +
                                                otherItemDesc + '</a><a>' + cpCompetition.other.odds.toFixed(2) +
                                                '</a></span>') : '');
                                    } else {//仅刷新赔率
                                        if (!hWrongOdds) {
                                            $("#bet_" + hBetItemUid + ' > a').eq(1).text(cpCompetition.teamH.odds.toFixed(2));
                                            $("#bet_" + hBetItemUid).attr('onclick', hClickEvent);
                                        } else {
                                            $("#bet_" + hBetItemUid).remove();
                                        }
                                        if (!cWrongOdds) {
                                            $("#bet_" + cBetItemUid + ' > a').eq(1).text(cpCompetition.teamC.odds.toFixed(2));
                                            $("#bet_" + cBetItemUid).attr('onclick', cClickEvent);
                                        } else {
                                            $("#bet_" + cBetItemUid).remove();
                                        }
                                        if (cpCompetition.other) {
                                            if (!oWrongOdds) {
                                                $("#bet_" + oBetItemUid + ' > a').eq(1).text(cpCompetition.other.odds.toFixed(2));
                                                $("#bet_" + oBetItemUid).attr('onclick', oClickEvent);
                                            } else {
                                                $("#bet_" + oBetItemUid).remove();
                                            }
                                        }
                                    }
                                });
                            }
                            if (betItems > 0) {
                                if (competition.competitionType == 16) {
                                    betItems += 1;//一组让分中间多一个span
                                }
                                allCompetitions['round_' + roundNum] = allCompetitions['round_' + roundNum] || [];
                                allCompetitions['round_' + roundNum].push({
                                    items: betItems,
                                    html: betItemsHtml,
                                    title: competitionTitle
                                });
                            }
                        } catch (e) {
                        }
                    });
                });
                var blankTitle = '<div class="gameDtlite-head" style="visibility: hidden"><a>|</a></div>';
                if ((!isRefresh)) {
                    if (Object.keys(allCompetitions).length > 0) {
                    var leftBet = '';
                    var rightBet = '';
                    $.each(allCompetitions, function (r, data) {
                        for (var vIdx = 0, vSize = data.length; vIdx < vSize; vIdx++) {
                            var lItem = data[vIdx];
                            vIdx++;
                            var rItem = data[vIdx];
                            leftBet += '<div class="gameDtlite-con">' + lItem.title + lItem.html + fillBlankBetItem(rItem !== undefined ? (rItem.items - lItem.items) : 0) + '</div>';
                            rightBet += '<div class="gameDtlite-con">' + (rItem !== undefined ? (rItem.title + rItem.html) : blankTitle) + fillBlankBetItem(lItem.items - (rItem === undefined ? 0 : rItem.items)) + '</div>';
                        }
                    });
                    var html = '<td colspan="7">';
                    html += '<div class="gameDtlite-left">' + leftBet + '</div><div class="gameDtlite-right">' + rightBet + '</div>';
                    html += '</td>';
                    container.empty().append(html);
                    $(container).find(".roundContent").eq(0).show();
                        container.css("display", "block");
                    } else {
                        container.hide();
                }
                }
            }else{
                //container.css("display", "none");
                container.hide();
            }
        }
    );
};
/**
 *隐藏显示对局信息
 */
var toggleRound = function (_this) {
    var _type = $(_this).next().css("display");
    $(".roundContent").slideUp(100);
    switch (_type) {
        case "none":
            $(_this).next().slideDown(100);
            break;
        default:
            $(_this).next().slideUp(100);
            break;
    }
};
/**
 * 检查下注重复
 * @param uid
 */
var betExistsFn = function (uid) {
    var duplicate = false;
    var betArray = getExistsBetData();
    $.each(betArray, function (idx, bet) {
        if (bet.uid === uid) {
            duplicate = true;
            return false;
        }
    });
    return duplicate ? duplicate : betArray;
};
/**
 * 添加下注
 * @param _this
 * @param uid
 * @param gameTitle
 * @param betTitle
 * @param betSubTitle
 * @param odds
 * @param matchDate
 */
var competitionBet = function (_this, uid, gameTitle, betTitle, betSubTitle, odds, matchDate, betData, homeTeam) {
    if (betData === 'null') {
        betData = null;
    }
    betTitle = betTitle === '' || betTitle == null ? null : betTitle;
    InjectionContentShow('show');
    var result = betExistsFn(uid);
    if (result !== true) {
        var ids = uid.split('_');
        var newBet = {
            uid: uid,
            gameTitle: gameTitle,
            betTitle: betTitle,
            homeTeam: homeTeam,
            betSubTitle: betSubTitle,
            betData: betData,
            resultId: ids[0],
            competitionType: ids[1],
            competitionId: ids[2],
            odds: (odds || 0),
            date: matchDate,
            money: (parseFloat($('#eachBetMoney').val()) || 0)   //默认投注额
        };
        result.push(newBet);
        setBetDate(result);
        renderBetList(result);
        $('.InjectionModuleDelite').animate({scrollTop: $('.InjectionModuleDelite ul').height() + 'px'}, 500);
    } else {
        //alert('此赛事投注已在您的投注单中.');
        removeBet(uid);
    }
};

/**
 * 获取已选择下注单
 */
var getExistsBetData = function () {
    var localData = JSON.parse(window.localStorage.getItem(storeKey)) || {};
    if (((new Date()).getTime() - (localData.time || 0)) > (1000 * 60 * 30)) {
        window.localStorage.removeItem(storeKey);
        return [];
    } else {
        setBetDate(localData.betData);
        return localData.betData || [];
    }
};
/**
 * 设置下注单
 * @param data
 */
var setBetDate = function (data) {
    window.localStorage.setItem(storeKey, JSON.stringify({betData: data, time: ((new Date()).getTime())}));
};
/**
 * 渲染下注列表
 * @param data
 * @param uid
 */
var renderBetList = function (data, uid) {
    var betContainer;
    if (!uid) {
        betContainer = $(".InjectionModuleDelite").empty();
    } else {
        betContainer = $(".InjectionModuleDelite");
    }
    var totalBetMoney = 0;
    var maxWinning = 0;
    var betListCount = 0;
    if (data && $.isArray(data) && data.length > 0) {
        var html = '<ul>';
        var effectiveBets = [];
        $.each(data, function (idx, bet) {
            /*if ($("#bet_" + bet.uid).length === 0) {
                return;
            } else {
                effectiveBets.push(bet);
            }*/
            betListCount += 1;
            if (bet.odds == null || isNaN(bet.odds) || bet.odds < 0 || bet.money == null || isNaN(bet.money) || bet.money < 0) {
                removeBet(bet.uid);
                return;
            } else if (bet.odds < 1) {
                maxWinning += (bet.money * bet.odds);
            } else {
                maxWinning += (bet.money * (bet.odds - 1));
            }
            totalBetMoney += (bet.money || 0);
            var content = '<div><span>' + bet.gameTitle + '</span><span>' + /*bet.date +*/ '</span></div>' +
                '<div>' +
                '<span>' + (bet.odds.toFixed(2) || '') + '</span>' +
                '<span>' +
                '   <span>' + bet.betTitle + '</span>' +
                '   <span style="color: #ff574f;font-weight: bold">'
                + bet.betSubTitle + '</span>' +
                '</span>' +
                '<span>' +
                '   <input type="number" min="0" value="' + ((bet.money || 0).toFixed(2)) + '" onchange="betMoneyChange(event,this,\'' + bet.uid + '\')"  placeholder="投注额"/>' +
                '</span>' +
                '<span>' +
                '   <i class="fa fa-times" aria-hidden="true" onclick="removeBet(\'' + bet.uid + '\')"></i>' +
                '</span>' +
                '</div>';
            if (uid && bet.uid === uid) {
                //$("#" + bet.uid).empty().append(content);
            } else {
                html += '<li class="DetailsOfNotes" id="' + bet.uid + '">' + content + '</li>';
            }
            $("#bet_" + bet.uid).addClass('active');
        });
        if (!uid) {
            html += '</ul>';
            betContainer.append(html);
        }
        //`setBetDate(effectiveBets);
    }
    $("#totalBetMoney").html(totalBetMoney.toFixed(2));
    $("#maxWinning").html(maxWinning.toFixed(2));
    $("#betListCount").html(betListCount);
};
/**
 * 删除下注
 * @param uid
 */
var removeBet = function (uid) {
    var betData = getExistsBetData();
    $.each(betData, function (idx, bet) {
        if (bet.uid === uid) {
            betData.splice(idx, 1);
            setBetDate(betData);
            $('.InjectionModuleDelite').animate({scrollTop: idx * 116 + 'px'}, 200, function () {
                $("#bet_" + uid).removeClass('active');
                $("#" + uid).hide(500, function () {
                    $("#" + uid).remove();
                });
            });
            return false;
        }
    });
    renderBetList(betData, uid);
};
/**
 * 清空下注
 */
var removeAllBet = function () {
    var betList = getExistsBetData();
    if (!$.isArray(betList) || betList.length === 0) {
        return;
    } else {
        // $.each(betList, function (idx, bet) {
        //     $("#bet_" + bet.uid).removeClass('active');
        // });
        // setBetDate([]);
        // renderBetList();
        layer.open({
            title: "注意!",
            content: "清空所有投注单?",
            btn: ['确认', '取消'],
            yes: function () {
                $.each(betList, function (idx, bet) {
                    $("#bet_" + bet.uid).removeClass('active');
                });
                setBetDate([]);
                renderBetList();
                layer.closeAll();
            }
        })
    }
    ;

};

/**
 * 刷新赔率
 */
var refreshBetOdds = function () {
    var betList = getExistsBetData();
    if (!$.isArray(betList) || betList.length === 0) {
        return;
    }
    showLoading();
    var keys = [];
    $.each(betList, function (idx, bet) {
        keys.push(bet.competitionId);
    });
    $.getJSON('/api/eSports/queryCompetitionOdds', {ids: JSON.stringify(keys)}, function (response) {
        hideLoading();
        if (response) {
            $.each(betList, function (idx, bet) {
                bet.odds = response[bet.competitionId].odds;
            });
            setBetDate(betList);
            renderBetList(betList);
        }
    });
};
/**
 * 投注金额变化
 * ==================begin=============================
 */
/*var vBetMoneyChangeDelay;
var curInput;*/
var betMoneyChange = function (event, _this, uid) {
    /*clearTimeout(vBetMoneyChangeDelay);
    if (event.keyCode === 9) {
        return;
    } else if (event && event.keyCode !== 8 && (event.keyCode === 190 || event.keyCode === 110 || event.keyCode > 105 || (event.keyCode < 96 && event.keyCode > 57) || event.keyCode < 48)) {
        _this.value = _this.defaultValue;
        return;
    }*/
    var curBetMoney = parseFloat(_this.value);
    if (isNaN(curBetMoney)) {
        _this.value = _this.defaultValue; //_this.value ? _this.value.substr(0, Math.max(_this.value.length - 1, _this.value.indexOf('.'))) : '';
        return;
    } else {
        $('#eachBetMoney').val('');
    }
    /*vBetMoneyChangeDelay = setTimeout("updateDelay(" + curBetMoney + ",'" + uid + "')", 500);
    if (event) {
        curInput = _this;
    } else {
        curInput = undefined;
    }*/
    var betData = getExistsBetData();
    $.each(betData, function (idx, bet) {
        if (bet.uid === uid) {
            bet.money = curBetMoney;
            return false;
        }
    });
    setBetDate(betData);
    renderBetList(betData, uid);
    /*if (curInput) {
        $(curInput).focus();
    }*/
};
/**
 * ==================end=============================
 */

/**
 * 批量设置投注额
 * @param _this
 */
var selectMoney = function (_this) {
    //li选择这把值赋予input再处理
    var eachBet = $(_this).attr("data");
    if (eachBet !== undefined && eachBet != null && eachBet !== '') {
        $('#eachBetMoney').val(eachBet);
    }
    var betMoney = parseFloat($('#eachBetMoney').val());
    if (isNaN(betMoney)) {
        $(".alertModle").hide();
        return;
    } else if (betMoney < 0) {//防止负值
        betMoney = 0;
    } else if (betMoney > 1000000) {
        betMoney = 1000000;
    }
    var betData = getExistsBetData();
    $.each(betData, function (idx, bet) {
        bet.money = betMoney;
    });
    setBetDate(betData);
    renderBetList(betData);
    $(".alertModle").hide();
    $('#eachBetMoney').val(betMoney);
};
var selectMoneywrap = function () {
    $(".alertModle").show()
};

/**
 * 下注栏toggle
 * @param _type
 * @constructor
 */
var InjectionContentShow = function (_type) {
    if (_type !== "init") {
        return;
    }
    // var _bottom = $(".InjectionModule").css("bottom");
    //
    // if (_type === "init") {
    //     _bottom = "0px";
    // } else if (_type === 'show') {
    //     _bottom = "-590px";
    // } else if (_bottom !== "-590px") {
    //     _bottom = "0px";
    // } else {
    //     _bottom = "-590px";
    // }
    //
    // if (_bottom === "-590px") {
    //     $(".spreadCon").remove();
    //     $(".InjectionModule").stop().animate({bottom: "0px"}, 300).css("box-shadow", " rgb(16, 22, 33) -2px -1px 2px;");
    //
    //     if ($(".retractCon").length === 1) {
    //         return;
    //     }
    $("<span/>", {
        class: 'retractCon',
        html: '<i class="fa fa-refresh" aria-hidden="true" title="更新赔率" onclick="refreshBetOdds()"></i>' +
        '<i class="fa fa-trash" aria-hidden="true" title="清理全部投注" onclick="removeAllBet()"></i>' +
        '<i class="fa"></i>'
        // '<i class="fa fa-chevron-circle-down" aria-hidden="true" title="收起" onclick="InjectionContentShow()"></i>'
    }).appendTo($(".InjectionModuletop"));
    // } else {
    //     $(".retractCon").remove();
    //     $(".InjectionModule").stop().animate({bottom: "-590px"}, 300).css("box-shadow", "");
    //     $("<span/>", {
    //         class: 'spreadCon',
    //         html: '<span class="InjectionModuleBtn" onclick="InjectionContentShow()">竞猜<i class="fa fa-chevron-circle-up" aria-hidden="true"></i></span>' +
    //         ''
    //     }).appendTo($(".InjectionModuletop"));
    // }
};

/**
 * 获取下注单
 * @param pageIdx
 */
var getOrders = function (pageIdx) {
    showLoading();
    if (!isLogined()) {
        hideLoading();
        layer.open({
            closeBtn: 0,
            title: "温馨提示",
            content: "您还没有登录,请先登录",
            yes: function () {
                parent.location.href = "/views/html/login.html";
            }
        });
        return;
    }
    var pageSiz = 5;
    var statusArray;
    var ext = $(".guessingCompetition-menu > div").filter('.active').attr('ext');
    if (ext == 1) {//已结算订单
        statusArray = [18, 1];
    } else {
        statusArray = [0, 21, 26];
    }
    $.getJSON(
        "/api/eSports/queryOrderPage",
        {
            page: pageIdx,
            rows: pageSiz,
            createDateStart: $("#startTime").val(),
            createDateEnd: $("#startEnd").val(),
            statusIn: JSON.stringify(statusArray),
            queryType: ext
        },
        function (responseData) {
            hideLoading();
            var container = $(".orderDeliteWrap").eq(0).empty();
            var html = '<ul class="orderDeliteTitle">' +
                '<li>订单号</li>' +
                '<li>竞猜详情</li>' +
                '<li>赔率</li>' +
                '<li>投注额</li>' +
                '<li>输赢金额</li>' +
                '<li>状态</li>' +
                '</ul>';
            if ($.isArray(responseData.data) && responseData.data.length > 0) {
                $("#orderPaging").empty().Page({
                    Pages: Math.ceil(responseData.totalCount / pageSiz),
                    PageOn: getOrders,
                    JumpOn: getOrders,
                    Page: pageIdx,
                    Jump: false,
                    ActiveClass: "paging-select"
                });
                var gameTitle = '';
                $.each(responseData.data, function (idx, order) {
                    gameTitle = order.teamH + ' <span style="color: #a94410">VS</span> ' + order.teamC + ((order.round != null && (order.round >= 0)) ? ('-<span style="color: red">[' + gameRoundText[order.round] + ']</span>') : '');
                    html += '<ul class="orderDeliteCon">' +
                        '<li>' +
                        '   <div>订单号: ' + order.orderId + '</div>' +
                        '   <div><span>日期:</span>' + order.createDate + '</div>' +
                        '</li>' +
                        '<li>' +
                        '   <div title="' + order.league + '">' + order.league + '</div>' +
                        '<div>' + gameTitle + '</div>';
                    var teamTitle = '';
                    var betTitle = '';
                    if (order.competitionType === 4) {//主宰
                        betTitle = order.title;
                        teamTitle = order.competitionTeam;
                        if (order.competitionTeam === 'NONE') {
                            teamTitle = '均未获得'
                        }
                    } else if (order.competitionType === 6) {//击杀
                        betTitle = order.title;
                        teamTitle = order.competitionTeam;
                        if (order.competitionTeam === 'NONE') {
                            teamTitle = '一样多'
                        }
                    } else if (order.competitionType === 15) {
                        betTitle = order.title;
                        teamTitle = order.betData === '1' ? '单' : '双';
                    } else if (order.competitionType === 16) {
                        betTitle = order.title;
                        teamTitle = (order.strong === 'H' ? '主让' : '客让') + '-' + order.betData + '[' + (order.competitionTeam === order.teamH ? '主胜' : '客胜') + ']';
                    } else if (order.competitionType === 17) {
                        betTitle = order.title.replace('X', order.betData);
                        teamTitle = order.competitionTeam;
                        if (order.competitionTeam === 'NONE') {
                            teamTitle = '均未获得'
                        }
                    } else if (order.competitionType === 18) {
                        betTitle = order.title;
                        teamTitle = order.competitionTeam + order.betData;
                    } else {
                        betTitle = order.title;
                        teamTitle = order.competitionTeam;
                    }
                    html += ('<div>[' + betTitle + ']-<span style="color: red">' + teamTitle + '</span></div>');
                    html += '</li>' +
                        '<li>' +
                        (order.odds || 0).toFixed(2) +
                        '</li>' +
                        '<li>' +
                        (order.money || 0).toFixed(2) +
                        '</li>' +
                        '<li ' + (((order.result || 0) > order.money) ? 'style="color: red"' : '') + '>' + (((order.result == null || isNaN(order.result || order.status == 26)) ? '-' : (order.result - order.money).toFixed(2))) + '</li>' +
                        '<li>' +
                        responseData.otherData.status[order.status] +
                        '</li>' +
                        '</ul>';
                });
            } else {
                $("#orderPaging").empty();
                html += '<div style="text-align: center;">暂无数据</div>';
            }
            hideLoading();
            container.append(html);
        }
    );
};

/**
 * 查询指定日期结束赛事
 * @param date
 */
var getFinishedMatch = function (date) {
    showLoading();
    if (date) {
        $('#Resuot_startTime').val(date);
        $('#Resuot_startEnd').val(date);
    }
    var params = {
        matchDateStart: $('#Resuot_startTime').val(),
        matchDateEnd: $('#Resuot_startEnd').val()
    };
    var container = $("#finishedMatchContent").empty();
    $.getJSON('/api/eSports/queryMatchPage', params, function (arg1, arg2, arg3) {
        hideLoading();
        var html = "";
        if ($.isArray(arg1.data) && arg1.data.length > 0) {
            $.each(arg1.data, function (index, match) {
                var matchType = arg1.otherData.matchTypes[match.matchTypeId];
                var mScoreH = parseInt(match.scoreH);
                var mScoreC = parseInt(match.scoreC);
                var wrongMatch = isNaN(mScoreH) || isNaN(mScoreC) || mScoreH < 0 || mScoreC < 0 || !match.valid;
                html += '<div class="Resuot-content" ' + (wrongMatch ? '' : 'style="cursor: pointer"') + (!match.valid ? '' : 'onclick="tabGameDelite(' + match.id + ')"') + '>' +
                    '<div><i class="fa fa-play-circle" aria-hidden="true"></i></div>' +
                    '<div class="Resuot-time-wrap">' +
                    '<div>' + (matchType.name + (matchType.groupType ? ('(' + matchType.groupType + ')') : '')) + '</div>' +
                    '<div>' + match.matchDate + (!match.valid ? '<span style="color: red;margin-left: 5px;">(赛事延期或取消)</span>' : '') + '</div>' +
                    '</div>' +
                    '<div style="background: url(\'http://game.gtimg.cn/images/yxzj/ingame/matchCenter/a20170829kpl//2018cy-RSG.png\') no-repeat left center/50%;"></div>' +
                    // '<div></div>' +
                    '<div class="Vsitem-content">' +
                    '<div>' + match.teamH + '</div>' +
                    '<div style="background: url(\'http:' + match.hLogo + '\') no-repeat center/70%"></div>' +
                    '<div><a style="padding:8px 10px;">' + (wrongMatch ? (match.valid ? '进行中' : '0') : mScoreH) + '</a></div>' +
                    '<div><a class="vs" style="color: #21cc0e;">vs</a></div>' +
                    '<div><a style="padding:8px 10px;">' + (wrongMatch ? (match.valid ? '进行中' : '0') : mScoreC) + '</a></div>' +
                    '<div style="background: url(\'http:' + match.cLogo + '\') no-repeat center/70%"></div>' +
                    '<div>' + match.teamC + '</div>' +
                    '</div>' +
                    '<div>' +
                    //'<div class="LinesEllipsis_l">DreamHack DreamHackLeipzig</div>'+
                    '<div class="LinesEllipsis_r"><i class="fa fa-chevron-right" aria-hidden="true"></i>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
            });
        } else {
            html += '<div class="Resuot-content" style="position: relative"><span style="position:absolute;left: 45%; color: white">暂无数据</span></div>'
        }
        hideLoading();
        container.append(html);
    });
};

/***
 **  显示最近7天
 */
var prevWeekDays = function () {
    $(".GameDelite_Week").empty();
    var myDate = new Date();
    myDate.setDate(myDate.getDate() - 7);
    var dateArray = [],
        dateTemp,
        flag = 1,
        nowWeek = myDate.getDay(),
        week = "";

    for (var i = 0; i < 7; i++) {
        dateTemp = (myDate.getMonth() + 1) + "月" + myDate.getDate() + "日";
        $(".GameDelite_Week").append();
        dateArray.push(dateTemp);
        if (nowWeek > 6) {
            nowWeek = 0
        }
        switch (nowWeek) {
            case 0:
                week = "天";
                break;
            case 1:
                week = "一";
                break;
            case 2:
                week = "二";
                break;
            case 3:
                week = "三";
                break;
            case 4:
                week = "四";
                break;
            case 5:
                week = "五";
                break;
            case 6:
                week = "六";
                break;
        }
        $("<a/>", {
            "onclick": "getFinishedMatch('" + myDate.format('yyyy-MM-dd') + "')",
            html: dateTemp
        }).appendTo($(".GameDelite_Week"));
        myDate.setDate(myDate.getDate() + flag);
        nowWeek++;
    }
};
/***
 **  赛果:获取已结束比赛
 */
var tabGameDelite = function (matchId) {
    switch (mySwiper.realIndex) {
        case 0:
            mySwiper.slideTo(1, 1000, false);
            $("#swiper-container .swiper-wrapper").css({
                'transition-duration': '500ms',
                'transform': 'translate3d(-1000px, 0px, 0px)'
            });
            showLoading();
            getMatchResult(matchId);
            break;
        case 1:
            mySwiper.slideTo(0, 1000, false);
            $("#swiper-container .swiper-wrapper").css({
                'transition-duration': '500ms',
                'transform': 'translate3d(0px, 0px, 0px)'
            });
            break;
    }
};
/**
 * 获取赛果详细信息.
 * @param matchId
 */
var getMatchResult = function (matchId) {
    if (!matchId) {
        return;
    }
    $.getJSON('/api/eSports/queryMatchResult', {matchId: matchId}, function (arg1) {
        hideLoading();
        if ($.isArray(arg1.matchResult) && arg1.matchResult.length > 0) {
            $(".dispayTableLogo_l").css({"background-image": "url('" + arg1.match.hLogo + "')"});
            $(".dispayTableText_l").empty().append(arg1.match.teamH);
            $(".dispayTableLogo_r").css({"background-image": "url('" + arg1.match.cLogo + "')"});
            $(".dispayTableText_r").empty().append(arg1.match.teamC);
            $(".matchTitle").empty().append('<a>' + arg1.matchType.name + (arg1.matchType.groupType ? ('(' + arg1.matchType.groupType + ')') : "") + '</a><a>' + (arg1.match.matchDate || '') + '</a>');

            arg1.matchResult.sort(function (e1, e2) {
                return e1.round - e2.round;
            });
            var container = $(".gameVsDelite_table").empty();
            var html = '';
            var cmptMap = {};
            var allTypeId = {};
            $.each(arg1.types, function (vi, value) {
                cmptMap[value.resultID + '_' + value.type] = value;
                allTypeId['_' + value.type] = 'yes';
            });
            var headerContainer = $(".gameVsDelite_wrap_header").empty();
            headerContainer.append("<div></div><div>队伍</div><div>比分</div>");
            headerContainer.append('<div>一血</div>');
            if (allTypeId['_7']) {
                headerContainer.append('<div>击杀数</div>');
            }
            if ((allTypeId['_6'])) {
                headerContainer.append('<div>击杀胜</div>');
            }
            if (allTypeId['_17']) {
                headerContainer.append('<div>率先获得击杀数</div>');
            }
            headerContainer.append('<div>第一条主宰</div>');
            //headerContainer.append('<div>时长</div>');
            var hScore = 0;
            var cScore = 0;
            $.each(arg1.matchResult, function (idx, result) {
                if (result.round !== 0) {
                    if (result.scoreH) {
                        hScore += result.scoreH;
                    }
                    if (result.scoreC) {
                        cScore += result.scoreC;
                    }
                }
                //console.table(result);
                html += '<tr>' +
                    '<td>' +
                    '    <ul>' +
                    '       <li>' + (gameRoundText[result.round] || '') + '</li>' +
                    (result.valid === false ? '<li>(<font style="color: red">赛事无效</font>)</li>' : '') +
                    '    </ul>' +
                    '</td>' +
                    '<td>' +
                    '    <ul>' +
                    '        <li ' + (result.scoreH > result.scoreC ? 'class="win"' : '') + '>' + (result.teamH || '') + '</li>' +//队伍
                    '        <li ' + (result.scoreC > result.scoreH ? 'class="win"' : '') + '>' + (result.teamC || '') + '</li>' +
                    '    </ul>' +
                    '</td>' +
                    '<td>' +
                    '    <ul>' +
                    '        <li>' + (result.scoreH === null || isNaN(result.scoreH) ? '-' : result.scoreH) + '</li>' +//比分
                    '        <li>' + (result.scoreC === null || isNaN(result.scoreC) ? '-' : result.scoreC) + '</li>' +
                    '    </ul>' +
                    '</td>' +
                    /*'<td>' +
                    '    <ul>' +
                    '        <li>' + (result.hAssists ? result.hAssists : '-') + '</li>' +//助攻数
                    '        <li>' + (result.cAssists ? result.cAssists : '-') + '</li>' +
                    '    </ul>' +
                    '</td>' +
                    '<td>' +
                    '    <ul>' +
                    '        <li>' + (result.hTowers ? result.hTowers : '-') + '</li>' +//破塔数
                    '        <li>' + (result.cTowers ? result.cTowers : '-') + '</li>' +
                    '    </ul>' +
                    '</td>' +*/
                    '<td>' +
                    '    <ul>' +
                    '        <li>' + (result.firstBloodTeam === result.teamH ? result.teamH : '-') + '</li>' +//一血
                    '        <li>' + (result.firstBloodTeam === result.teamC ? result.teamC : '-') + '</li>' +
                    '    </ul>' +
                    '</td>' +
                    ((allTypeId['_7']) ? (
                        '<td>' +
                        '    <ul>' +
                        '        <li>' + (result.hKillers ? result.hKillers : '-') + '</li>' +//击杀数
                        '        <li>' + (result.cKillers ? result.cKillers : '-') + '</li>' +
                        '    </ul>' +
                        '</td>'
                    ) : '') +
                    ((allTypeId['_6']) ? (
                        '<td>' +
                        '    <ul>' +
                        '        <li>' + (result.teamMemberKillWin ? (result.teamMemberKillWin !== 'NONE' ? (result.teamMemberKillWin === 'INVALID' ? '无效' : result.teamMemberKillWin) : '一样多') : '-') + '</li>' +//击杀胜
                        '    </ul>' +
                        '</td>'
                    ) : '') +
                    ((allTypeId['_17']) ? (
                        '<td>' +
                        '    <ul>' +
                        (result.firstArriveKillNum ? result.firstArriveKillNum !== 'NONE' ?
                                '        <li>' + (result.firstArriveKillNum === result.teamH ? (cmptMap[result.id + '_17'].name.replace('X', cmptMap[result.id + '_17'].betData)) : '-') + '</li>' +
                                '        <li>' + (result.firstArriveKillNum === result.teamC ? (cmptMap[result.id + '_17'].name.replace('X', cmptMap[result.id + '_17'].betData)) : '-') + '</li>'
                                :
                                '        <li>均未获得</li>'
                                : '-'
                        ) +
                        '    </ul>' +
                        '</td>'
                    ) : '') +
                    /*'<td>' +
                    '    <ul>' +
                    '        <li>' + (result.firstTowerTeam === result.teamH ? result.teamH : '-') + '</li>' +//一塔
                    '        <li>' + (result.firstTowerTeam === result.teamC ? result.teamC : '-') + '</li>' +
                    '    </ul>' +
                    '</td>' +
                    '<td>' +
                    '    <ul>' +
                    '        <li>' + (result.firstSmallDragonTeam === result.teamH ? result.teamH : '-') + '</li>' +//第一条小龙
                    '        <li>' + (result.firstSmallDragonTeam === result.teamC ? result.teamC : '-') + '</li>' +
                    '    </ul>' +
                    '</td>' +*/
                    '<td>' +
                    '    <ul>' +
                    (result.firstBigDragonTeam ? result.firstBigDragonTeam !== 'NONE' ?
                            '        <li>' + (result.firstBigDragonTeam === result.teamH ? result.teamH : '-') + '</li>' +
                            '        <li>' + (result.firstBigDragonTeam === result.teamC ? result.teamC : '-') + '</li>'
                            :
                            '        <li>均未获得</li>'
                            : '-'
                    ) +
                    '    </ul>' +
                    '</td>' +
                    /*'<td>' +
                    '    <ul>' +
                    '        <li>' + (result.duration || '-') + '</li>' +//比赛时长
                    '    </ul>' +
                    '</td>' +*/
                    '</tr>';
            });
            $("#fullRoundScoreH").empty().append(hScore || 0);
            $("#fullRoundScoreC").empty().append(cScore || 0);
            html += '<tr><td></td><td></td><td></td>' +
                '<td></td>' +
                ((allTypeId['_7']) ? '<td></td>' : '') +
                ((allTypeId['_6']) ? '<td></td>' : '') +
                ((allTypeId['_17']) ? '<td></td>' : '') +
                '<td></td>' +
                '</tr>';
            container.append(html);
        }
    });
};

/**
 * 事件定义
 */
var eventHandlerDefine = function () {
    $(".load").on("click", function () {
        $(this).hide();
        $(".InjectionMoney").hide();
    });

    /**
     * 提交下注单
     */
    $("#authorization").on('click', function () {
        showLoading();
        if (!isLogined()) {
            hideLoading();
            layer.open({
                closeBtn: 0,
                title: "温馨提示",
                content: "您还没有登录,请先登录",
                yes: function () {
                    parent.location.href = "/views/html/login.html";
                }
            });
            return;
        }
        var allBet = getExistsBetData();
        if (!$.isArray(allBet) || allBet.length <= 0) {
            hideLoading();
            layer.msg("您还没有下注单.");
        } else {
            var errorBet = false;
            $.each(allBet, function (idx, bet) {
                if (bet.money <= 0) {
                    errorBet = true;
                    return false;
                }
            });
            if (errorBet) {
                hideLoading();
                layer.msg('您有投注单下注金额无效,请核对!');
            } else {
                $.ajax({
                    type: "post",
                    url: '/api/eSports/bet',
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify({
                        orders: allBet,
                        autoAcceptBetterOdds: $("#autoAccept").val()
                    }),
                    success: function (result) {
                        hideLoading();
                        if (result.Status === 'S') {
                            // alert(result.msg);
                            layer.msg(result.msg)
                            getUserInfo();//刷新余额.
                            $.each(allBet, function (idx, bet) {
                                $("#bet_" + bet.uid).removeClass('active');
                            });
                            setBetDate([]);
                            renderBetList();
                        } else {
                            layer.msg("赛事无效下注失败,请刷新重试.")
                        }
                    },
                    error: function (response) {
                        hideLoading();
                        var data = JSON.parse(response.responseText) || {};
                        layer.msg(data.msg + '\n' + data.code);
                    }
                });
            }
        }
    });
    /**
     * 赛果查询按钮
     */
    $("#SearchBtn").on("click", function () {
        showLoading();
        getFinishedMatch();
    });
    /**
     * 顶部页签切换
     */
    $(".gaming-title > button").on("click", function (arg1) {
        $(".gaming-title > button").removeClass('active');
        $(".ListCon").hide();
        $(".guessingCompetition").hide();
        this.className = 'active';
        if ($(this).attr('ext') === '1') {
            $(".weekListWrap").show();
            showLoading();
            var timeContainer = $("#availableMatchDate").empty();
            $.ajax({
                type: "get",
                url: '/api/eSports/queryMatchDate',
                contentType: 'application/json',
                dataType: "json",
                success: function (result) {
                    hideLoading();
                    var today = new Date((new Date()).format('yyyy-MM-dd'));
                    if ($.isArray(result) && result.length > 0) {
                        //$('<div class="swiper-slide"><a onclick="esportsMatchDate=null;getMatch(1,null)">' + '全部' + '</a></div>').appendTo(timeContainer);
                        $.each(result, function (mIdx, strDate) {
                            var mDate = new Date(strDate);
                            if(mDate.getTime() >= today.getTime()){
                                if (!esportsMatchDate) {
                                    esportsMatchDate = mDate.format('yyyy-MM-dd');
                                }
                                $('<div class="swiper-slide"><a onclick="esportsMatchDate=\'' + mDate.format('yyyy-MM-dd') + '\';getMatch(1,null)">' + (mDate.getMonth() + 1) + "月" + mDate.getDate() + "日" + '</a></div>').appendTo(timeContainer);
                            }
                        });
                    } else {
                        esportsMatchDate = today.format('yyyy-MM-dd');
                        layer.msg("暂无赛事.")
                    }
                    getMatch(1, true);
                },
                error: function (response) {
                    layer.msg("暂无赛事.")
                }
            });
        } else {
            $(".weekListWrap").hide();
        }
        $("." + $(this).attr('data')).show();
    });
    /**
     * 订单页左侧页签切换
     */
    $(".guessingCompetition-menu > div").on('click', function (arg1) {
        showLoading();
        if ($(this).hasClass('active')) {
            hideLoading();
            return;
        }
        $(".guessingCompetition-menu > div").removeClass('active');
        $(this).addClass('active');
        $('.myGuessingTitle').text($(this).attr('guessingTitle'));
        getOrders(1);
    });
    if (isLogined()) {//加载我的订单数据
        $(".guessingCompetition-menu > div").eq(0).click();
    }
    $(".gaming-title > button").eq(0).click();
};
/**
 * 入口函数.
 */
$(function () {
    // 'use strict';
    if (!window.localStorage) {
        layer.alert('浏览器不支持localStorage!');
        return;
    }
    //getUserInfo();
    if (isLogined()) {
        $(".gaming-title > button").eq(1).after('<button data="guessingCompetition" ext="3">我的订单</button>');
    }
    mySwiper = new Swiper('#swiper-container', {
        preventClicksPropagation: false,
        noSwiping: true
    });
    new Swiper('.week-container', {
        slidesPerView: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
    prevWeekDays();
    initDatePicker();
    InjectionContentShow('init');
    eventHandlerDefine();
    renderBetList(getExistsBetData())
});

// 显示加载框

var showLoading = function () {
    $(".loading").show();
};
var hideLoading = function () {
    $(".loading").hide();
};

//王者荣耀游戏规则
showRule=function () {
    var page="/sports/Rule/rule_esports.html";
    parent.layer.open({
        type: 2,
        shadeClose: true,
        skin: 'esports_wrap',
        scrollbar: false,
        shade: [0.6, '#000'],
        offset: ['10%', '20%'],
        title: ['游戏规则'],
        closeBtn: 1,
        area: ['850px', '600px'],
        anim: 2,
        move: false,
        content: page
    })
}
