/**
 */

var Constants = {CREDIT_HTML: "index.html", OFFICIAL_HTML: "index_official.html", SEMICOLON: ";"};

var userRebate = system_config.visitors_rebate; // 默认游客返水最大值
var playMap = {};
var playByCodeMap = {};
var inputRebate = 0;
//历史开奖显示个数
var defaultLotterySize = 6;

//console.log(2222);
var rebateCore = (function () {
    var gameId = $("#gameId").val();
    $.ajax({
        url: '/data/json/' + gameId + '.json',
        type: 'get',
        cache: false,
        dataType: 'json',
        success: function (data) {
            //console.log("-------3333------");
            playMap = data.playByIdMap;
            playByCodeMap = data.playMap;
            if (rebateChange) {
                rebateChange(inputRebate);
            }
        }
    });

    // 增加
    function plusClick() {
        if (inputRebate - 0.1 < 0) {
            return;
        }
        inputRebate -= 0.1;
        setSliderValue();
    };

    function minuesClick() {
        if (inputRebate + 0.1 > userRebate) {
            return;
        }
        inputRebate += 0.1;
        setSliderValue();
    };

    function setSliderValue() {
        var sliderValue = (1 - inputRebate / userRebate) * 100;
        $(".red").slider("value", sliderValue);
        $(".proportion").html(inputRebate);
        if (rebateChange) {
            rebateChange(inputRebate);
        }
    }

    function onSlideValueChange() {
        var red = $(this).slider("value");
        //console.log("v=" + red);
        hexFromRGB(red);
        var _inputRebate = getRebate(red);
        if (_inputRebate !== inputRebate) {
            inputRebate = _inputRebate;
            $(".red").slider("value", red);
            $(".proportion").html(inputRebate);
            if (rebateChange) {
                rebateChange(inputRebate);
            }
        }
    }

    function getRebate(value) {
        return parseFloat(((1 - value / 100) * userRebate).toFixed(1));
    }

    function hexFromRGB(r) {
        var hex = [
            r.toString(16),
        ];
        $.each(hex, function (nr, val) {
            if (val.length === 1) {
                hex[nr] = "0" + val;
            }
        });
        return hex.join("").toUpperCase();
    }

    function init() {
        $(".red").slider({
            orientation: "horizontal",
            range: "min",
            max: 100,
            value: 100,
            slide: onSlideValueChange,
            change: onSlideValueChange
        });
    }

    return {
        plusClick: plusClick,
        minuesClick: minuesClick,
        init: init
    };
})();


/**
 * 用户信息
 * @type {{load}}
 */
var userInfoManager = function () {
    var rebate = 0;
    var isLoadUserInfoFinish = false;
    var loadUserInfo = function () {
        var token = $.cookie("token", {path: "/"});
        if (token && !(token == "null")) {
            $.ajax({
                url: '/api/user/info',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    isLoadUserInfoFinish = true;
                    if (userRebate != data.userInfo.rebate) {
                        userRebate = data.userInfo.rebate;
                        if (rebateChange) {
                            rebateChange();
                        }
                    }

                    $("#userName").html(data.userInfo.account);
                    $("#userMoney").html(data.extInfo.money);
                    if (data.userInfo.isDl) { // 如果是代理，个人消息改为代理中心
                        $("#user-account-manage").html("<span>代理中心</span>");
                        $("#user-account-manage").attr("title", "代理中心");
                        $("#user-account-manage").attr("onclick", "openModalX('agent-center');");
                    }
                    if (window.officialCore) {
                        officialCore.userInfoLoaded();
                    }
                }
            });
        } else {
            $("#userName").html('游客');
            $("#userMoney").html('0.0');
            //存款 取款 额度转换 跳转登陆弹窗
            $('#user-center-id a').removeAttr('onclick').on('click', turnLogin)
            // $('#user-deposit').removeAttr('onclick').on('click',turnLogin)
            // $('#user-withdraw').removeAttr('onclick').on('click',turnLogin)
            // $('#user-account-record').removeAttr('onclick').on('click',turnLogin)
            // $('#user-game-record').removeAttr('onclick').on('click',turnLogin)
            // $('#user-account-manage').removeAttr('onclick').on('click',turnLogin)
            // $('#user-center').removeAttr('onclick').on('click',turnLogin)
        }


    };

    var updateUserMoney = function () {
        $.ajax({
            url: '/api/user/status',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $("#userMoney").html(data.money);
            }
        });
    };

    var getRate = function () {
        return rebate;
    };

    var turnLogin = function () {
        var url = "/views/html/login.html";
        openTabInThisPage(url)
        // openLoginModal(url);
    };

    var autoLoad = function () {
        if (isLoadUserInfoFinish) {
            updateUserMoney();
        } else {
            loadUserInfo();
        }
    };

    var userInterVal = function () {
        var token = $.cookie("token", {path: "/"});
        if (token && !(token == "null")) {
            window.setInterval(autoLoad, 60000);
        }
    };

    return {
        load: autoLoad, turnLogin: turnLogin, getRebate: getRate, interVal: userInterVal
    };
}();


var gameManager = (function () {

    var opts = {
        gameId: "#gameId",
        lotteryHistory: "#lotteryResultCenter",
        loadOfficial: ".gamePlayOfficial",
        loadRight: false,//是否加载左边信息
        loadLmcl: false,//是否加载长龙精选信息
        loadAnalysis: false,//是否加载底部分析信息
        gameType: undefined, //记录当前游戏玩法
    }

    var cateType = [
        {name: "六合彩", cate: 0, list: []},
        {name: "低频彩", cate: 1, list: []},
        {name: "时时彩", cate: 2, list: []},
        {name: "PK拾", cate: 3, list: []},
        {name: "11选5", cate: 4, list: []},
        {name: "快乐彩", cate: 5, list: []},
        {name: "快三", cate: 6, list: []},
        {name: "PC蛋蛋", cate: 7, list: []}
    ]
    var game;

    var gameType = '';
    var gameId = $(opts.gameId).val();
    var gameCode = $(opts.gameId).attr('data-gamecode');
    var addOfficialType = false;
    var init = function (opt) { //初始化当前游戏信息
        opts = $.extend(opts, opt || {});
        //获取当前页面游戏的玩法
        getGameType();
        //加载玩法菜单
        loadLotteryTypeMenu();

        //更新用户信息
        userInfoManager.interVal();
        // userInfoManager.load();

    };

    var loadLotteryTypeMenu = function () {
        $.ajax({
            type: "get",
            url: "/data/json/games.json",
            success: function (data) {
                for (var j = 0; j < cateType.length; j++) {
                    for (var i = 0; i < data.length; i++) {
                        if (cateType[j].cate == data[i].cate) {
                            data[i].href = "";
                            if (gameType == Constants.OFFICIAL_HTML && data[i].isOffcial == 1) {
                                data[i].href = "/data/game/" + data[i].code + "/" + Constants.OFFICIAL_HTML
                            } else if (gameType == Constants.OFFICIAL_HTML && data[i].isOffcial == 0) {
                                data[i].href = "/data/game/" + data[i].code + "/" + Constants.CREDIT_HTML
                            } else if (gameType == Constants.CREDIT_HTML) {
                                data[i].href = "/data/game/" + data[i].code + "/" + Constants.CREDIT_HTML
                            }
                            cateType[j].list.push(data[i]);
                        }
                        if (data[i].id == gameId) {
                            game = data[i];
                            addOfficialType = data[i].isOffcial == 1 ? true : false;
                        }
                    }
                }

                if (addOfficialType) {
                    $(opts.loadOfficial).css('display', 'block')
                } else {
                    $(opts.loadOfficial).css('display', 'none')
                }
                loadLotteryType();

                //加载开奖历史
                loadLotteryHistory();
            }
        });
    }

    var getGameType = function () {
        gameType = getCurrentPlayType();
    }

    var addLotteryReulstListener = function (e) {
        //加载历史
        if (gameType == Constants.CREDIT_HTML) {
            $(e).attr('href', "/page/game-center.html?gameCode=" + gameCode + "&type=infos");
        } else {
            $(e).attr('href', "/page/game-center.html?gameCode=" + gameCode + "&type=trend");
        }
        /*var title = gameType == Constants.CREDIT_HTML ? '开奖结果' : '开奖走势';
        var url = (gameType == Constants.CREDIT_HTML ? '/page/game-center/open-infos.html?gameCode=' : '/page/game-center/open-trend.html?gameCode=') + gameCode;
        $(e).off('click').on('click', function(event) {
          event.preventDefault();
          openModalX({
            title: title,
            url: url
          });
        });*/
    }

    var loadLotteryType = function () {
        if (cateType[0].cate === 0 && cateType[0].list.length === 1) {
            cateType.splice(0, 1);
        }
        var html = template('gameListTempLate', {cates: cateType, type: gameType});
        $("#sideMenu").html(html);
        var type = '';
        bindLotteryTypeEvent();
    }


    var loadRightInfo = function () {//加载右边信息
        //加载下注信息
        loadLatelyBetInfo();
        loadLmcl();
    }

    var loadLmcl = function () {
        if (opts.loadLmcl) {
            $.ajax({
                url: '/v/lottery/getLmcl?gameId=' + gameId,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    var html = template('rightInfoWithLmcl', {list: data});
                    $("#_rightInfo").html(html);
                }
            });
        } else {
            var html = template('rightInfoWithoutLmcl');
            $("#_rightInfo").html(html);
        }
    }

    var loadLotteryHistory = function () {
        $.ajax({
            async: false,
            url: "/v/lottery/getTopResults?gameId=" + gameId + "&topNums=" + defaultLotterySize,
            type: "get",
            dataType: 'json',
            success: function (data) {
                var type = "";
                var gameType = cateType;
                for(var i =0 ; i < gameType.length ; i++){
                    if(cateType[i].list.length > 0){
                        for(var j = 0 ; j<cateType[i].list.length ; j++ ){
                            if(gameId == cateType[i].list[j].id){
                                type = cateType[i].list[0].type;
                                break;
                            }
                        }

                    }
                }
                $.each(data, function (i, value) {
                    if (value.turnNum.length > 7) {
                        value.turnNum = value.turnNum.substring(4);
                    }
                    if(type == "k3"){
                        value['result'] = makeK3ExtraDesc(value.openNum);
                    }else{
                        value['result'] = '';
                    }
                })
                var result = {list: data};
                var html = template("lotteryHistoryTemplate", result);

                addLotteryReulstListener($('.left_result_btn'));
                $(opts.lotteryHistory).html(html);
                //设置
                if (data.length > 0) {
                    var css = '';
                    if (data[0].openNum.split(",").length > 10) {
                        css = 'spanLongHover'
                    } else if (data[0].openNum.split(",").length <= 10 && data[0].openNum.split(",").length > 8) {
                        css = 'spanMiddleHover'
                    } else {
                        css = 'spanShortHover'
                    }
                    $('.left_resultNum').find('span').hover(function () {
                        $(this).addClass(css)
                    }, function () {
                        $(this).removeClass(css)
                    })
                }
            }
        });
    }

    var makeK3ExtraDesc = function (openNum) {
            var sumVal = 0
            openNum = openNum.split(",")
            for(var i =0 ; i < openNum.length ; i++){
                sumVal = sumVal + parseInt(openNum[i])
            }
            var dxVal = sumVal >= 11 ? '大' : '小'
            var dsVal = sumVal % 2 === 0 ? '双' : '单'
            return sumVal + ' ' + dxVal + ' ' + dsVal
    }

    var loadAnalysis = function () {
        if (opts.loadAnalysis) {
            $.ajax({
                url: '/v/lottery/todayCl?gameId=' + gameId,
                type: 'get',
                dataType: 'json',
                success: function (data) {
                    anaylsisRender(data);
                    clAnalysisManager.initListener();
                }
            });
        }
    }


    var anaylsisRender = function (data) {
        $('tr[nanlysis=trend]').each(function () {
            var dataCode = $(this).attr('data-code');
            var trendData = data[dataCode] || [];
            var tds = "";
            for (var i = 0; i < 30; i++) {
                var dataIndex = i - 30 + trendData.length;
                if (dataIndex >= 0) {
                    var v = '';
                    if (trendData[dataIndex]) {
                        v = trendData[dataIndex].replace(/,/g, '<br/>');
                    }
                    tds += "<td class='w3p3'>" + v + "</td>"
                } else {
                    tds += "<td class='w3p3'>&nbsp;</td>"
                }
            }
            $(this).html(tds);
        });
        $('tr[nanlysis=repeatNum]').each(function () {
            var dataCode = $(this).attr('data-code');
            var ballIndex = parseInt($(this).attr('ball-index'));
            var nums
            if (data[dataCode]) {
                var repeatData = data[dataCode][ballIndex - 1];
                nums = repeatData.split(',');
            } else {
                nums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
            var tds = "";
            for (var i = 0; i < 10; i++) {
                tds += "<td>" + nums[i] + "</td>"
            }
            $(this).html(tds);
        });
    }
    var loadLatelyBetInfo = function () { // 最新注单
        if (gameType == Constants.CREDIT_HTML) {
            $.ajax({
                type: "get",
                url: '/v/report/getLatelyBetInfo/' + gameId + "?model=1",
                success: function (data) {
                    if (data.length == 0) {
                        return;
                    }
                    $.each(data, function (i, item) {
                        //2017-04-18 18:29:10
                        item.addTime = item.addTime.substring(11, 16)
                        if (item.odds.indexOf(',') > 0) {
                            item.odds = item.odds.split(',')[0];
                        }
                        var money = item.totalMoney.toString().split();
                        var model = 0;
                        if (money.toString().indexOf(".") !== -1) {
                            model = money.toString().split(".")[1].length;
                        }
                        item.moneyStr = "1元";
                        if (model === 1) {
                            item.odds = (item.odds * 10).oddFixed(4);
                            item.moneyStr = "0.1元";
                        } else if (model === 2) {
                            item.moneyStr = "0.01元";
                            item.odds = (item.odds * 100).oddFixed(4);
                        }
                    })
                    var bets = {content: data};
                    var html = template('latelyBetInfoTemp', bets, userRebate);
                    $(".CurrentBetting_zi").html(html);
                    showDetailLaterOrderInfo();
                }
            });
        }
    }

    var showDetailLaterOrderInfo = function () {
        if ($('#hoverDialog').length === 0) {
            $('body').append('<div id="hoverDialog" tabindex="-1" style="position: absolute; outline: 0px; left: 436px; top: 406px; z-index: 1024;display: none">\
                            <div i="dialog" class="hover-tips" style="border: 2px solid #b62929;\>\
                                                        <table><tbody><tr><td style="padding: 5px;">\
                                    <div>\
                                        <div class="content break-wrod"></div>\
                                    </div>\
                                </td></tr></tbody></table>\
                            </div>\
                        </div>');
        }
        $(".top10-tr").hover(function (e) {
            var position = $(this).offset();
            $('#hoverDialog .content').html($(this).attr('data-tip'));
            var positionType = $(this).attr('data-position');
            var dialogWidth = $('#hoverDialog').width(), dialogHeight = $('#hoverDialog').height();
            var left, top;
            if (positionType === 'mouse') {
                left = e.pageX + 10;
                if (left + dialogWidth + 10 > window.innerWidth) {
                    left = e.pageX - dialogWidth - 10;
                }
                top = e.pageY - dialogHeight - 10;
            } else {
                left = position.left - (dialogWidth - $(this).width()) / 2;
                top = position.top - dialogHeight - 10;
            }
            $('#hoverDialog').css({left: left, top: top});
            $('#hoverDialog').show();
        }, function () {
            $('#hoverDialog').hide();
        });
    }

    var refreshBetInfo = function () {

    }

    var getCurrentPlayType = function () {
        return window.location.pathname.match(/index(\S*)html/)[0];
        ;
    }


    //开奖处理
    var openCallback = function () {
        //信用玩法，刷新长龙榜
        if (gameType == Constants.CREDIT_HTML) {
            loadLmcl();
            //刷新底部分析
            loadAnalysis()
        }
        //刷新用户余额
        userInfoManager.load();
        //刷新开奖历史
        loadLotteryHistory();

        loadLatelyBetInfo();
    }

    //开盘处理
    var startCallback = function () {
        //开盘
        var event = eventManager.getEvent();
        if (event) {
            event.unBlock();
            //test block
            // event.block();
        }
    }

    var cancel = function () {
        var event = eventManager.getEvent();
        if (event) {
            event.cancel();
        }
    }

    var stopCallback = function () {
        var event = eventManager.getEvent();
        if (event) {
            event.block();
        }
    }

    return {
        initGame: init,
        loadLatelyBetInfo: loadLatelyBetInfo,
        openCallback: openCallback,
        startCallback: startCallback,
        stopCallback: stopCallback,
        getPlayType: getCurrentPlayType,
        addLotteryResultListener: addLotteryReulstListener,
        cancel: cancel
    }
})()

var oggManager = function () {
    var isInit = false;
    var isPlay = '1';
    var cookie_audio = "audio-default";
    var init = function () {
        if (isInit) {
            return
        }

        if ($.cookie('ismute') == null) {
            $.cookie('ismute', '1');
        } else {
            isPlay = $.cookie('ismute');
        }
        ;
        changeIcon();
        isInit = true;
        var v = $.cookie(cookie_audio);
        $('#audio-select').change(function () {
            $('#select-trackName').html($(this).children('option:selected').html())
            $.cookie(cookie_audio, $(this).children('option:selected').val());
            play();
        })
        if (v) {
            $("#audio-select").val(v);
            $('#select-trackName').html($("#audio-select").children('option:selected').html())
        }
    }

    var changeIcon = function () {
        if (isPlay == '1') {
            $('.volume').removeClass('volume-off').addClass("volume-on")
        } else {
            $('.volume').removeClass('volume-on').addClass("volume-off")
        }
    }

    var mute = function () {
        isPlay = isPlay == '1' ? '0' : '1';
        $.cookie('ismute', isPlay);
        changeIcon();
    }

    var play = function () {
        isPlay = $.cookie('ismute');
        if (isPlay == '0') {
            return;
        }
        if ($('#lottery_audio')) {
            if ($('#lottery_audio')[0]) {
                //获取当前ogg-value
                var v = $.cookie('audio-default');
                if (v) {
                    $('#lottery_audio').attr('src', '/page/game/oggs/' + v + '.ogg');
                    $('#lottery_audio')[0].pause();
                    $('#lottery_audio')[0].play();
                } else {
                    $('#lottery_audio').attr('src', '/page/game/oggs/1.ogg');
                    $('#lottery_audio')[0].pause();
                    $('#lottery_audio')[0].play();
                }
            }
        }
    }
    return {
        init: init, play: play, mute: mute
    };
}();
/**
 * lhc
 * @type {{}}
 */
var LHCData = {};  // 配置信息
var quickOnclickKey = {}; // 快捷下注事件key
var isAllChosen = false;
var lastGroup = 0;
var lhcManager = {
    initConfig: function () { // 初使化配置信息
        $.ajax({
            type: "get",
            url: "/v/lhc/info",
            success: function (data) {
                LHCData = data;
            }
        });
    },
    result: function (data) {
        showTemp(data); // 在lottery.js中
        var nums = [];
        var sxs = [];
        if (data.preOpenNum) {
            nums = data.preOpenNum.split(gameConstants.BET_SEPARATOR);
            sxs = data["preResult"]["70200103008"].split(gameConstants.BET_SEPARATOR);
            // sxs = '鸡';
        }
        var html = "";
        $.each(nums, function (n, o) {
            var css = "lottery-result-ball ball_" + n;
            html += " <span class=\"" + css + "\"  style=\"position:relative;\">" +
                "<label>" + o + "</label>" +
                "<span style=\"position:absolute;right:-1em;bottom:5px;color:#fff;font-weight:normal;font-size:12px;line-height:1\">" + sxs[n] + "</span>" +
                "</span>"
        });

        $("#lotterResult").html(html);

    },
    allChosen: function () {
        this.quickBet('DAN_N')
        this.quickBet('SHUANG_N')
    }
    ,
    quickBet: function (type, sxsIndex, ele) { // 快捷下注操作
        var vas = LHCData[type];
        var key = type;
        if (type == 'SXS_N') { // 生肖
            vas = LHCData[type][sxsIndex];
            key = type + sxsIndex;
        }
        var money = $("input#quickMoney").val();
        if (vas) {
            $.each(vas, function (n, value) {
                if (!quickOnclickKey[key] || quickOnclickKey[key] == 0) {
                    $('.data-value-' + value).addClass("danger");// 添加选中样式
                    $('.data-value-' + value).find("input").val(money);// 添加选中样式
                    // $('#'+value).val(money); // 设置金额
                    $(ele).css('background-color', '#FFC214')
                } else {
                    $('.data-value-' + value).removeClass("danger"); // 删除选中样式
                    $('.data-value-' + value).find("input").val('');// 添加选中样式
                    $(ele).css('background-color', '')
                }
            });
        }
        if (!quickOnclickKey[key] || quickOnclickKey[key] == 0) {
            quickOnclickKey[key] = 1;
        } else {
            quickOnclickKey[key] = 0;
        }
    },

}

/*** 会员退出登录 ***/
function logout() {
    $.get("/v/user/logout", {}, function (data) {
        $.cookie("account", null, {path: '/'});
        $.cookie("token", null, {path: '/'});
        window.location.href = '/views/main.html';
    }).error(function (XMLHttpRequest) {
        //$.removeCookie('account', { path: '/' });
        $.cookie("account", null, {path: '/'});
        window.location.href = '/views/main.html';
    })
}