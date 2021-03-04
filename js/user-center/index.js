/**
 * Created by Zelei on 2017/4/21.
 */
(function ($) {
    var userInfo = {};
    $(function () {

        function loadJob() {
            loadUserInfo(function (response) {
                $('#account').text(response.userInfo.account);
                $('#balance').text(parseFloat(response.extInfo.money.toFixed(4)) + '元');
                userInfo = response.userInfo;
                if (!response.userInfo.isDl) {
                    $('#agent-center').remove();
                }
            });
            setTimeout(loadJob, 1000 * 60);
        }

        loadJob();
        loadGames();
        doLayout();

        $('#page-frame').on('load', function (e) {
            loaded();

            var url = fromFullPath(this.contentWindow.location.href);
            var active = $('#accordion ul.accordion-content>li.active');
            if (active.length !== 0 && active.attr('data-url') === url) {
                if (url.indexOf('team-overviews') !== -1) {
                    $('#breadcrumb').text('用户中心>代理中心>团队总览');
                }
                return;
            }
            var target = $(
                '#accordion ul.accordion-content>li[data-url="' + url + '"]');
            if (target.length === 0) {
                return;
            }
            if (active.length !== 0) {
                active.removeClass('active').parent('.accordion-content').siblings(
                    '.accordion-title').click();
            }
            var menu = target.text();
            var catelog = target.addClass('active').parent(
                '.accordion-content').siblings('.accordion-title').click().text();
            var model = '用户中心';

            if (url.indexOf('team-overviews') !== -1) {
                var account = getQueryParam(this.contentWindow.location.href,
                    "account");
                if (account) {
                    $('#breadcrumb').text(
                        model + '>' + catelog + '>' + menu + '【' + account + '】');
                }
            } else {
                $('#breadcrumb').text(model + '>' + catelog + '>' + menu);
            }


        });
        $('#nav-sign-out').on('click', signOut);
        $('#accordion .accordion-title').on('click', function (e) {
            $(this).siblings('.accordion-content').slideToggle(200).parent(
                '.accordion-item').siblings('.accordion-item').children(
                '.accordion-content').slideUp(200);
        });
        $('#accordion ul.accordion-content>li').on('click', function (e) {
            loading();
            var $this = $(this);
            loadFramePage($this.attr('data-url'));
            if ($this.hasClass('active')) {
                return;
            }
            var menu = $this.text();
            var catelog = $this.parent('.accordion-content').siblings(
                '.accordion-title').text();
            var model = '用户中心';
            $('#breadcrumb').text(model + '>' + catelog + '>' + menu);
            $this.siblings('li.active').removeClass('active');
            $this.addClass('active').parent('.accordion-content').parent(
                '.accordion-item').siblings('.accordion-item').find(
                'ul.accordion-content>li.active').removeClass('active');
        });
        $('#nav-game-center').on('mouseenter', function (e) {
            var $this = $(this);
            var navOffset = $this.offset();
            var navWidth = $this.outerWidth();
            var navHeight = $this.outerHeight();
            var gameCenterGames = $('#game-center-games').slideDown(300);
            var left = navOffset.left - (gameCenterGames.outerWidth() - navWidth) / 2;
            if (left + gameCenterGames.outerWidth() > $(document.body).width()) {
                left = $(document.body).width() - gameCenterGames.outerWidth();
            }
            gameCenterGames.css({
                top: navOffset.top + navHeight - 40,
                left: left
            });
        }).on('mouseleave', function (e) {
            var x = e.originalEvent.x || e.originalEvent.layerX || 0;
            var y = e.originalEvent.y || e.originalEvent.layerY || 0;
            var gameCenterGames = $('#game-center-games');
            var offset = gameCenterGames.offset();
            var width = gameCenterGames.outerWidth();
            var height = gameCenterGames.outerHeight();
            if (x < offset.left || x > offset.left + width || y < offset.top || y
                > offset.top + height) {
                $('#game-center-games').hide();
            }
        });
        $('#game-center-games').on('mouseleave', function (e) {
            $(this).hide();
        });
        $('#bank-rech').on('click', forwardRech);
        $('#bank-withdraw').on('click', forwardWithdraw);
        startPage(getStartPageParameter());
    });

    function doLayout() {
        $('#page-container').height($('#layout-center').height(
            $(document.body).innerHeight() - $(
            '#navbar').outerHeight()).innerHeight() - $(
            '#page-info').outerHeight() - $('#navbar').outerHeight());
        if ($(document.body).data('horizontalResizerBinded') !== true) {
            window.onresize = doLayout;
            $(document.body).data('horizontalResizerBinded', true);
        }
    }

    function loading(id) {
        var loadingEl = $('<div class="loading-default"><div></div></div>');
        if (!id === false) {
            loadingEl.attr('id', id);
        }
        $(document.body).append(loadingEl);
        return loadingEl;
    }

    function loaded(id) {
        if (!id === false) {
            $('#' + id).remove();
        } else {
            $(document.body).children('.loading-default').remove();
        }
    }

    function loadGames() {
        $.getJSON(toFullPath('/data/json/games.json'), null, function (response) {
            $.each(response, function (i, e) {
                var officialGames = $('#official-games');
                var creditGames = $('#credit-games');
                if (e.isOffcial === 1) {
                    officialGames.append(
                        '<li><a href="' + toGamePath(e, 0) + '">' + e.name
                        + '</a></li>');
                }
                if (e.isCredit === 1) {
                    creditGames.append(
                        '<li><a href="' + toGamePath(e, 1) + '">' + e.name
                        + '</a></li>');
                }
            });
            //  官方玩法关闭 去掉前台显示
            if ($("#official-games").html() === null || $("#official-games").html() === "") {
                $("#game-center-games").find(".border-right").remove();
                $("#game-center-games").find(".games-catelog").css({
                    "width": "100%"
                });
            }
        });
    }

    function toGamePath(game, model) {
        return toFullPath(
            '/data/game/' + game.code + '/index' + (model === 0 ? '_official' : '')
            + '.html');
    }

    function loadUserInfo(callback) {
        $.getJSON(toFullPath('/api/user/info'), null, callback).error(
            function (xhr, errorText, errorType) {
                var responseText = xhr.responseText;
                try {
                    responseText = JSON.parse(responseText);
                } catch (e) {
                }
                if (responseText.code === 'UC/TOKEN_INVALID') {
                    alert('网络连接超时，请重新登陆！');
                    $.cookie('token', null, {path: '/'});
                    window.location.href = '/views/main.html';
                }
            });
    }

    function signOut() {
        $.getJSON(toFullPath('/v/user/logout'), null, function (response) {
            $.cookie('token', null, {path: '/'});
            window.location.href = '/views/main.html';
        }).error(function (xhr, errorText, errorType) {
            $.cookie('token', null, {path: '/'});
            window.location.href = '/views/main.html';
        });
    }

    function disactiveMenu() {
        $('#accordion ul.accordion-content>li.active').removeClass('active');
        $('#accordion ul.accordion-content:visible').slideUp();
    }

    function getRechNotic() {
        var noticeContent = $('#rechNotice').empty();
        $('#notice-carousel').css("background", "url(/images/suona.png) 10px 10px no-repeat");
        $.getJSON(toFullPath('/data/json/notice_list.json?' + new Date()), null,
            function (response) {
                if (!response) {
                    return;
                }
                var noticeContent = "";
                var notice = {};
                try {
                    loadUserInfo(function (response) {
                        userInfo = response.userInfo;
                    });
                    for (var i = 0; i < response.rech_notice.length; i++) {
                        notice = response.rech_notice[i];
                        if ($.isNumeric(notice)) {
                            notice = {content: (notice + '')}
                        } else {
                            notice.content = notice.noticeContent;
                        }
                        noticeContent += notice.content + "<div style='width: 50px;display: inline-block;'></div>";
                        if ($.isArray(notice.subList) && notice.subList.length > 0) {
                            $.each(notice.subList, function (idx, value) {
                                    if (value.subKey === userInfo.hyLevel) {
                                        if (value.noticeContent != null) {
                                            noticeContent += value.noticeContent + "<div style='width: 50px;display: inline-block;'></div>";
                                           // return false;
                                        }
                                    }
                            });
                        }

                    }
                } catch (e) {
                    /*if(response.rech_notice && response.rech_notice.noticeContent!=null && response.rech_notice.noticeContent !==""){
                        notice.content =response.rech_notice.noticeContent;
                    }*/
                }
                if (notice.content == null || notice.content === "") {
                    return;
                }
                $('#rechNotice').html($('<marquee onmouseover= this.stop() onmouseout= this.start() onfinish= getRechNotic()>' + noticeContent + '</marquee>'));
            }
        );
        //setTimeout(getRechNotic, 1000 * 60);
    }
    function forwardRech() {
        disactiveMenu();
        loading();
        loadFramePage('/page/user-center/payment/recharge.html');
        var menu = '账户充值';
        var model = '用户中心';
        $('#breadcrumb').text(model + '>' + menu);
        getRechNotic();
    }

    function forwardWithdraw() {
        $('#rechNotice').empty()
        $('#notice-carousel').css("background", "none");
        disactiveMenu();
        loadUserInfo(function (response) {
            if (!response.userBank) {
                $('#account-mgmt').click();
                $('#account-bank').click();
            } else {
                loading();
                loadFramePage('/page/user-center/bank/withdraw.html');
                var menu = '提现';
                var model = '用户中心';
                $('#breadcrumb').text(model + '>' + menu);
            }
        });
    }

    function startPage(id) {
        if (!id || $('#' + id).length === 0) {
            id = 'account-overviews';
        }
        $('#' + id).click().parent('.accordion-content').siblings(
            '.accordion-title').click();
    }

    function getStartPageParameter() {

        var temp = window.location.href.split('?');
        if (temp.length < 2 || temp[1].indexOf('startPage') === -1) {
            return;
        }
        temp = temp[1].split('&');
        var parameterArray;
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].indexOf('startPage') === 0) {
                parameterArray = temp[i].split('=');
                if (parameterArray.length >= 2) {
                    return parameterArray[1];
                }
            }
        }
    }

    function loadFramePage(url) {

        $('#rechNotice').empty();
        $('#notice-carousel').css("background", "none");
        if (url.indexOf('?') === -1) {
            url += '?' + new Date().getTime();
        } else {
            url += '&' + new Date().getTime();
        }
        $('#page-frame').attr('src', toFullPath(url));
    }

    function getProtocolPrefix() {
        return (window.location.protocol || document.location.protocol) + '//';
    }

    function toFullPath(url) {
        var protocol = getProtocolPrefix();
        if (url.indexOf(protocol) === -1) {
            return protocol + window.location.host + url;
        }
        return url;
    }

    function fromFullPath(url) {
        var index = url.indexOf('?');
        if (index !== -1) {
            url = url.substring(0, index);
        }
        var protocol = getProtocolPrefix();
        if (url.indexOf(protocol) === -1) {
            return url;
        }
        return url.substring((protocol + window.location.host).length, url.length);
    }

    function getQueryParam(url, param) {
        var index = url.indexOf("?");
        var queryArray
        if (index !== -1) {
            queryArray = url.substring(index + 1).split('&');
        }
        for (var i = 0; i < queryArray.length; i++) {
            if (queryArray[i].indexOf(param) !== -1) {

                return queryArray[i].split('=')[1];
            }
        }
        return null;
    }
})(jQuery);