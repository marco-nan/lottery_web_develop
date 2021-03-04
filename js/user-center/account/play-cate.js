/**
 * Created by Zelei on 2017/4/27.
 */
(function ($) {
  $(function () {
    $('#gameId').on('change', function (e) {
      loadData()
    });
    $.getJSON($.toFullPath('/api/user/info'), null, function (response) {
      $.extend({
        userRebate: $.toFixed(response.userInfo.rebate, 1) + '%'
      });
      loadGames();
    }).error($.errorHandler);

  });

  function loadGames() {
    $.getJSON($.toFullPath('/data/json/games.json'), function (response) {
      var gameId = $('#gameId');
      $.each(response, function (i, e) {
        if (e.isOffcial === 1) {
          gameId.append($('<option value="' + e.id + '@' + 0 + '">' + e.name
              + ' [官]</option>'));
        }
        if (e.isCredit === 1) {
          gameId.append($('<option value="' + e.id + '@' + 1 + '">' + e.name
              + ' [信]</option>'));
        }
      });
      loadData();
    }).error($.errorHandler);
  }

  function loadData() {
    $.loading();
    var gameInfo = $('#gameId').val().split('@');
    var gameId = gameInfo[0];
    var model = gameInfo[1];
    if (model === '0') {
      if ($('#value').length === 0) {
        $('<th id="value">玩法分类</th>').insertAfter('#name');
      }
      loadOfficialData(gameId);
    } else {
      $('#value').remove();
            $('#sPlay').remove();
            $('#prizeName').remove();
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
                } else if (gameId == 21||gameId == 25||gameId == 26||gameId == 43||gameId == 44||gameId == 47) {//重庆时时彩官方,一分时时彩,北京时时彩,天津时时彩,新疆时时
                    if ($('#sPlay').length === 0) {
                        $('<th id="sPlay">玩法</th><th id="prizeName">名称</th>').insertAfter('#value');
                    }
                    renderPlay(response, gameId);
                    return;
                } else {
                    $('#sPlay').remove();
                    $('#prizeName').remove();
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
                          play.minOdds)
                      + '</td><td>' + $.userRebate + '</td></tr>');
                } else {
                  tbody.append('<tr><td>' + play.desc + '</td><td>' + $.toFixed(
                          play.minOdds)
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

    /**
     * @Description: 重庆时时彩官方,一分时时彩,北京时时彩,天津时时彩,新疆时时
     * @author Leon
     * @Date 2018/6/7
     *
     */
    function renderPlay(data, gameId) {
        var tbody = $('#table>tbody').empty();
        if (!data || !data.playCateMap || !data.playMap || !data.playCateMap) {
            tbody.renderEmptyTbody('暂无记录', 6);
            return;
        }
        var colsInfo = {};//计算跨行
        $.each(data.playCateMap[gameId], function (idx1, gameL1) {
            var codeL1 = gameL1['code'];
            var play1 = data.playCateMap[codeL1];
            var rowCos1 = 0;
            $.each(play1, function (idx2, gameL2) {
                var codeL2 = gameL2['code'];
                var play2 = data.playCateMap[codeL2];
                var rowCos2 = 0;
                $.each(play2, function (idx3, gameL3) {
                    var codeL3 = gameL3['code'];
                    var play3 = data.playMap[codeL3];
                    var rowCos3 = play3.length;
                    /*$.each(play3, function (idx4, gameL4) {
                    });*/
                    rowCos2 += rowCos3;
                    colsInfo[codeL3] = {level: 3, cross: rowCos3, name: gameL3.name};
                });
                rowCos1 += rowCos2;
                colsInfo[codeL2] = {level: 2, cross: rowCos2, name: gameL2.name};
            });
            colsInfo[codeL1] = {level: 1, cross: rowCos1, name: gameL1.name};
        });
        //dom生成
        $.each(data.playCateMap[gameId], function (idx1, gameL1) {
            var codeL1 = gameL1['code'];
            var playL1 = data.playCateMap[codeL1];
            $.each(playL1, function (idx2, gameL2) {
                var codeL2 = gameL2['code'];
                var playL2 = data.playCateMap[codeL2];
                $.each(playL2, function (idx3, gameL3) {
                    var codeL3 = gameL3['code'];
                    var playL3 = data.playMap[codeL3];
                    $.each(playL3, function (idx4, gameL4) {
                        var html = '<tr>';
                        if (idx2 === 0 && idx3 === 0 && idx4 === 0) {
                            html += '<td index="1" rowspan="' + colsInfo[codeL1].cross + '">' + gameL1.name + '</td>';
                        }
                        if (idx3 === 0 && idx4 === 0) {
                            html += '<td index="2" rowspan="' + colsInfo[codeL2].cross + '">' + gameL2.name + '</td>';
                        } else if (colsInfo[codeL2].cross <= 1) {
                            html += '<td index="2">' + gameL2.name + '</td>'
                        }
                        if (idx4 === 0) {
                            html += '<td index="3" rowspan="' + colsInfo[codeL3].cross + '">' + gameL3.name + '</td>';
                        } else if (colsInfo[codeL3].cross <= 1) {
                            html += '<td index="3">' + gameL3.name + '</td>'
                        }
                        html += '<td index="4">' + gameL4.alias + '</td>' +
                            '<td index="5">' + $.toFixed(gameL4.minOdds) + '</td>' +
                            '<td index="6">' + $.userRebate + '</td>';
                        html += '</tr>';
                        tbody.append(html);
                    });
                });
            });
        });
        $.loaded();
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
                      plays[0].minOdds)
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