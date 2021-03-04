/**
 * 红包雨
 */
(function ($) {
  $(function () {
    $('#startDatePicker').datepicker({el: 'startDate'}).children('#startDate').val();
    $('#endDatePicker').datepicker({el: 'endDate'}).children('#endDate').val($.dateformat(new Date(), 'yyyy-MM-dd'));
    $('#queryBtn').on('click', function (e) {
      $('#page').val(1);
      $('#rows').val(10);
      loadData();
    });
    loadData();
    $.extend({
      loadActivityDetails: function (activityNo) {
       alert("正在审核中，请耐心等待");
      }
    });
    $.getJSON($.toFullPath('/api/user/info'), null, function (response) {
      if (response.userInfo.isDl) {
        $(
            '<div class="form-group m-r-md m-b-xs">' +
            '<label for="subAccount">帐号：</label>' +
            '<input id="subAccount" name="subAccount" class="form-control input-sm field-sm">'+
            '</div>'
        ).insertBefore($('#queryBtn'));
      }
    }).error($.errorHandler);
  });

  function loadData() {
    $.loading();
    var data = $('#queryForm').serializeObject();
    if (!data.gameId === false) {
      data.gameId = $('#gameId').val().split('@')[0];
      data.model = $('#gameId').val().split('@')[1];
    }

    $.getJSON($.toFullPath('/api/activity/queryMyWelfareDetailList'), data,
        function (response) {
          var pageCount = 0;
          var items = response.data,
              keys = ['num', 'activityRecordName', 'money','createDatetime','statusDesc','settlementCreatetime'],
              tbodyOptions = {
                preHandler: function (item) {
                  pageCount += 1;
                  item.num=pageCount;
                  switch (item.status) {
                    case "0":
                      item.statusDesc = '未结算';
                      break;
                    case "1":
                      item.statusDesc = '已结算';
                      break;
                    default:
                      item.statusDesc = '未知';
                  }
                }
              },
              totalRecords = response.totalCount,
              paginationOptions = {
                pageNo: parseInt($('#page').val()),
                pageSize: parseInt($('#rows').val()),
                callback: function (pageNo) {
                  $('#page').val(pageNo);
                  loadData();
                }
              };
          var tbody = $('#table>tbody').renderTbody(items, keys, tbodyOptions);
          tbody.setColWidth(10, 180).setColWidth(5, 200);
          if (!items === false && items.length !== 0) {
          }
          $('#pagination').pagination(totalRecords, paginationOptions);
          $.loaded();
        }).error(function (xhr, errorText, errorType) {
      $.errorHandler(xhr, errorText, errorType);
      $('#table>tbody').renderEmptyTbody('加载失败', 12);
      $('#pagination').pagination();
    });
  }

})(jQuery);