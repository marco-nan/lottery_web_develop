(function ($) {

  $(function () {

    var subUserId = $.getUrlParam('subUserId');
    var hisArr = $.getUrlParam('hisArr');
    var queryMap = $.getUrlParam('queryMap');

    //初始隐藏表格一
    $('#table').hide();

    $('#backBtn').on('click', function () {
      window.location.href = '/page/user-center/agent/user_list.html?'
          + new Date().getTime() + '&hisArr=' + hisArr + '&queryMap='
          + queryMap;
    });

    $('.nav-item.subInfo').on('click', function () {
      $('#tab_two').show();
      $('#table').hide();
    });

    $.getJSON($.toFullPath('/api/dl/queryUser'), {userId: subUserId},
        function (response) {
          $.extend({
            userRebate: (response.userInfo.rebate).toFixed(1) + '%'
          });
          $('#account').text(response.userInfo.account);
          $('#nickname').text(response.userInfo.nickname);
          if (response.userInfo.nickname == null) {
            $('#nickname').parent().hide();
          }
          if (response.userInfo.type == "HY") {

            if (response.userInfo.isDl == true) {
              $('#type').text("代理用户");
            } else {
              $('#type').text("会员用户");
            }
          } else {
            $('#type').text("试玩用户");
          }
          $('#money').text($.toFixed(response.extInfo.money));
          $('#loginTime').text(response.extInfo.loginTime);

        }).error($.errorHandler);

    $.getJSON($.toFullPath('/api/user/info'), null, function (response) {
//	        $.extend({
//	          userRebate: (response.userInfo.rebate * 100).toFixed(2) + '%'
//	        });

      $.getJSON($.toFullPath('/data/json/games.json'), function (response) {

        $.each(response, function (i, e) {
          if (e.isOffcial === 1) {
            $("#gameTabs").append(
                "<li class='nav-item game'><a role='tab' data-toggle='tab' data-value='"
                + e.id + "@" + 0 + "'>" + e.name + "[官]</a></li>");

          }
          if (e.isCredit === 1) {
            $("#gameTabs").append(
                "<li class='nav-item game'><a role='tab' data-toggle='tab' data-value='"
                + e.id + "@" + 1 + "'>" + e.name + "[信]</a></li>");

          }
        })

        $('.nav-item.game').on('click', function () {
          $('#table').show();
          $('#tab_two').hide();
          loadData($(this).children('a').attr('data-value'));
        });

//		    	$('#gameTabs .gameTab:eq(0)').click();
      }).error($.errorHandler);

    }).error($.errorHandler);

  });

  function loadData(gameInfo) {
    $.loading();
    var gameInfo = gameInfo.split('@');
    var gameId = gameInfo[0];
    var model = gameInfo[1];
    if (model === '0') {
      if ($('#value').length === 0) {
        $('<th id="value">玩法分类</th>').insertAfter('#name');
      }
      loadOfficialData(gameId);
    } else {
      $('#value').remove();
      loadCreditData(gameId);
    }
  }

  function loadOfficialData(gameId) {
    var tbody = $('#table>tbody').empty();
    $.getJSON($.toFullPath('/data/json/official/' + gameId + '.json'), null,
        function (response) {
          if (!response || !response.playMap) {
            tbody.renderEmptyTbody('暂无记录', 4);
            return;
          }
          for (var key in response.playMap) {
            var playCate = response.plyCateByCodeMap[key];
            var plays = response.playMap[key];
            if (!plays === false && plays.length !== 0) {
              $.each(plays, function (i, play) {
                if (playCate.name !== play.value) {
                  play.desc = !play.alias === false ? play.alias : play.value;
                } else {
                  play.desc = '';
                }
                if (i === 0) {
                  tbody.append('<tr><td' + (plays.length > 1 ? ' rowspan="'
                          + plays.length + '"' : '')
                      + ' style="vertical-align: middle;">' + playCate.name
                      + '</td><td>' + play.desc + '</td><td>' + $.toFixed(
                          play.maxOdds)
                      + '</td><td>' + $.userRebate + '</td></tr>');
                } else {
                  tbody.append('<tr><td>' + play.desc + '</td><td>' + $.toFixed(
                          play.maxOdds)
                      + '</td><td>' + $.userRebate + '</td></tr>');
                }
              });
            }
          }
          if (tbody.children('tr').length === 0) {
            tbody.renderEmptyTbody('暂无记录', 4);
          }
          $.loaded();
        }).error($.errorHandler(function () {
      tbody.renderEmptyTbody('暂无记录', 4);
    }));
  }

  function loadCreditData(gameId) {
    var tbody = $('#table>tbody').empty();
    $.getJSON($.toFullPath('/data/json/' + gameId + '.json'), null,
        function (response) {
          if (!response || !response.playMap) {
            tbody.renderEmptyTbody('暂无记录', 4);
            return;
          }
          for (var key in response.playMap) {
            var playCate = response.plyCateByCodeMap[key];
            var plays = response.playMap[key];
            if (!plays === false && plays.length !== 0) {
              tbody.append(
                  '<tr><td>' + playCate.name + '</td><td>' + $.toFixed(
                      plays[0].maxOdds)
                  + '</td><td>' + $.userRebate + '</td></tr>');
            }
          }
          if (tbody.children('tr').length === 0) {
            tbody.renderEmptyTbody('暂无记录', 3);
          }
          $.loaded();
        }).error($.errorHandler(function () {
      tbody.renderEmptyTbody('暂无记录', 3);
    }));
  }

})(jQuery);