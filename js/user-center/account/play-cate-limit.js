/**
 * Created by Zelei on 2017/4/27.
 */
(function ($) {
  $(function () {
    $('#gameId').on('change', function (e) {
      loadData()
    });
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
  });

  function loadData() {
    $.loading();
    var gameInfo = $('#gameId').val().split('@');
    var gameId = gameInfo[0];
    var model = gameInfo[1];
    var url = '/data/json/' + (model === '0' ? 'official/' : '') + gameId
        + '.json';
    $.getJSON($.toFullPath(url), null, function (response) {
      if (!response || !response.playMap) {
        $('#table>tbody').renderEmptyTbody('暂无记录', 4);
        return;
      }
      var items = new Array(),
          keys = ['name', 'minMoney', 'maxMoney', 'maxTurnMoney'],
          tbodyOptions = {
            preHandler: function (item, row) {
              item.minMoney = $.toFixed(item.minMoney);
              item.maxMoney = $.toFixed(item.maxMoney);
              item.maxTurnMoney = $.toFixed(item.maxTurnMoney);
            }
          };
      for (var key in response.playMap) {
        items.push(response.plyCateByCodeMap[key]);
      }
      $('#table>tbody').renderTbody(items, keys, tbodyOptions);
      $.loaded();
    }).error($.errorHandler(function () {
      $('#table>tbody').renderEmptyTbody('暂无记录', 4);
    }));
  }
})(jQuery);