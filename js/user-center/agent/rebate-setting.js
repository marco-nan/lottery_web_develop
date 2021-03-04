(function ($) {
  $(function () {
    var subUserId = $.getUrlParam('subUserId');
    var hisArr = $.getUrlParam('hisArr');
    var queryMap = $.getUrlParam('queryMap');

    $('#backBtn').on('click', function () {
      window.location.href = '/page/user-center/agent/user_list.html?'
          + new Date().getTime() + '&hisArr=' + hisArr + '&queryMap='
          + queryMap;
    });

    $('#rebateSetForm').validate({
      messages: {
        rebate: {
          min: '不能下调且不能小于最低返点限制',
          max: '必须小于您自身的返水比率'
        }
      },
      submitHandler: function (form) {
        $.loading();
        $.get($.toFullPath('/api/dl/updateRebate'), {
          userId: subUserId,
          rebate: $('#rebate').val()
        }, function (response) {
          $.loaded();
          $.info('保存成功！');
        }, 'text').error($.errorHandler);
      }
    });

    $.getJSON($.toFullPath('/api/dl/getRebateRange?userId=' + subUserId),
        function (response) {
          if (!response) {
            return;
          }
          var max = $.toFixed(response[1], 4);
          $.extend({
            maxRebate: max,
            maxRebatePercent: max
          });
          max = max / 0.1;
          var min = $.toFixed(response[0], 4) / 0.1;
          var rebate = $('#rebate');
          for (var i = max; i >= min; i--) {
            var r = $.toFixed($.maxRebate - (max - i) * 0.1);
            var l = 1800 + i * 2;
            var option = '<option value="' + r + '">' + $.toFixed(r, 2)
                + '% ----- ' + l + '</option>';
            if (i === max - 1) {
              option = $(option).attr('selected', 'selected');
            }
            rebate.append(option);
          }
          $.getJSON($.toFullPath('/api/dl/queryUser'), {userId: subUserId},
              function (response) {
                if (!response || !response.userInfo) {
                  return;
                }
                var userInfo = response.userInfo;
                $('#subUserId').val(subUserId);
                $('#account').val(userInfo.account);
                $('#accountText').text(userInfo.account);
                if (!userInfo.nickname) {
                  $('#subNickname').parent().parent().remove();
                } else {
                  $('#subNickname').text(userInfo.nickname);
                }
                $('#rebate').val($.toFixed(userInfo.rebate));
              }).error($.errorHandler);
        }).error($.errorHandler);

  });
})(jQuery);