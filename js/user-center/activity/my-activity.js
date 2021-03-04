/**
 * 我的活动
 */
(function ($) {
  $(function () {
    $('#startDatePicker').datepicker({el: 'startDate'}).children('#startDate').val($.dateformat(new Date(), 'yyyy-MM-dd'));
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

    $.getJSON($.toFullPath('/api/activity/queryMyActivityQualification'), data,
        function (response) {
          var pageCount = 0;
          var items = response.data,
              keys = ['num', 'activityRecordName','activityRecordTitle','createDatetime','statusDesc', 'auditInfo','auditDate','operaction'],
              tbodyOptions = {
                preHandler: function (item) {
                  pageCount += 1;
                  item.num=pageCount;
                  var operaction = '';
                  switch (item.status) {
                    case "0":
                      item.statusDesc = '申请中';
                      //如果在审核中，则可以查询审核进度
                      operaction = '<a onclick="jQuery.loadActivityDetails(\''+ item.id + '\')" class="text-primary" role="button">审核进度</a>';
                      break;
                    case "1":
                      item.statusDesc = '审核通过';
                      if(item.activityRecordName=='转盘抽奖'){
                        operaction = '<a href="/activity/zhuanpan.html" target="_blank" class="text-primary" role="button">抽奖</a>';
                      }
                      if(item.activityRecordName=='红包雨'){
                        operaction = '<a href="/activity/hongbao.html" target="_blank" class="text-primary" role="button">抽奖</a>';
                      }

                      break;
                    case "2":
                      item.statusDesc = '已使用';
                      break;
                    case "3":
                      item.statusDesc = '失效';
                      break;
                    case "4":
                      item.statusDesc = '拒绝';
                      break;
                    default:
                      item.statusDesc = '未知';
                  }
                  // operaction += '&nbsp;<a onclick="jQuery.applyActivity(\''+ item.id + '\')" class="text-primary" role="button">撤销</a>';
                  item.operaction =operaction;
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

  function loadDetails(orderNo) {

    for (var key in bet) {
      var p = $('#detailContainer form .form-group p#' + key);
      if (p.length !== 0) {
        p.html(bet[key]);
      }
    }

    var items = new Array();
    if (bet.canWinList != null) {
      $.each(bet.canWinList, function (i, canWinInfo) {
        items.push({
          rewardLevelDesc: canWinInfo.name,
          betInfo: (canWinInfo.betInfo.length > 20 ? canWinInfo.betInfo.substr(0, 15)+"..." : canWinInfo.betInfo),
          multiple: bet.multiple,
          rewardLevel: (i + 1),
          reward: canWinInfo.odds,
          winMoney: $.toFixed(bet.multiple * canWinInfo.odds)
        });
      });

      $('#detailContainer table>tbody').renderTbody(items,['rewardLevelDesc', 'betInfo', 'multiple', 'rewardLevel', 'reward', 'winMoney']);
    }

    //撤销按钮
    var curTimestamp = new Date().getTime();
    if (curTimestamp < new Date(bet.betEndTime).getTime() && bet.status == 0) {
      if ($('#cancelBtn').length <= 0) {
        $('<button id="cancelBtn" onclick="jQuery.cancelBet(\'' + bet.orderNo+ '\')" class="btn btn-primary m-r-md">申请</button>').insertBefore('#goBackBtn');
      }
    }

  }
})(jQuery);