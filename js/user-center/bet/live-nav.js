function loadGameNav(finishCallback, search) {
    var errorFunc = function () {
    };
    var _export = {
        error: function (func) {
            errorFunc = func
        }
    };
    function initDateRange() {
        var date = new Date(), now = $.dateformat(date, 'yyyy-MM-dd');
        date.setTime(date.getTime() - (1000 * 60 * 60 * 24 * 7));
        var minDate = $.dateformat(date, 'yyyy-MM-dd');

        $('#startDatePicker').datepicker({
            el: 'startDate',
            minDate: '',
            minDate: minDate,
            maxDate: now
        }).children('#startDate').val(now);
        $('#endDatePicker').datepicker({
            el: 'endDate',
            minDate: '',
            minDate: minDate,
            maxDate: now
        }).children('#endDate').val(now);
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    var pageType = getQueryString("pageType");
    var pageGameCode = getQueryString("gameCode");
    var gameMap = {
        'live': ['ag', 'bbin', 'lmg', 'og', 'dg', 'mg', 'ds','fe','hj','hbo','bg_video'],
        'sport': [{code: 'hgSport', name: '皇冠体育', url: 'sport-bet.html?pageType=sport&gameCode=hgSport'}, 'sb', 'm8'],
        'electronic': ['pt', 'wzry', 'cq9', 'jdb','hb','pg','pt2','bw','gg_slot','bg_egame','bg_fishing'],
        'chess': ['jb', 'ky','qly','lc','nwg','kk','dg2','rmg','gg_chess','tm_chess','ly_chess']
    };

    $.getJSON('/api/live/allLiveGames', function (response) {
        if (!response || response.length === 0) {
            if (finishCallback) finishCallback()
            return;
        }
        var gameList = gameMap[pageType]
        var findGameByCode = function (code) {
            for (var i = 0; i < response.length; i++) {
                if (response[i].code === code) {
                    return response[i]
                }
            }
        };
        var gameCodeNav = $('#gameCodeNav').empty();
        for (var i = 0; i < gameList.length; i++) {
            var gameCode = gameList[i]
            if (typeof gameCode === 'string') {
                var gameInfo = findGameByCode(gameCode);
                if (gameInfo) {
                    if (window.location.pathname === '/page/user-center/bet/live-bet.html') {
                        gameCodeNav.append('<li data-code="' + gameInfo.code + '"><a href="javascript:void(0)">' + gameInfo.name + '</a></li>')
                    } else {
                        gameCodeNav.append('<li data-code="' + gameInfo.code + '"><a href="/page/user-center/bet/live-bet.html?pageType=' + pageType + '&gameCode=' + gameInfo.code + '">' + gameInfo.name + '</a></li>')
                    }
                }
            } else if (gameCode.url) {
                gameCodeNav.append('<li native-code="' + gameCode.code + '"><a href="' + gameCode.url + '">' + gameCode.name + '</a></li>')
            }
        }
        gameCodeNav.children('li[data-code]').click(function () {
            var $This = $(this);
            var dataCode = $This.attr('data-code');
            if ($This.hasClass('active') || !dataCode) {
                return;
            }
            $This.addClass('active').siblings('.active').removeClass('active');
            $('#gameCode').val(dataCode);
            initDateRange();
            search();
        });
        if (pageGameCode) {
            $('#gameCodeNav li[native-code=' + pageGameCode + ']').addClass('active');
            $('#gameCodeNav li[data-code=' + pageGameCode + ']').click();
        } else {
            $('#gameCodeNav li[data-code]').first().click();
        }
        if (finishCallback) finishCallback()
    }).error(function () {
        if (errorFunc) errorFunc.apply(null, arguments)
    });
    return _export;
}
