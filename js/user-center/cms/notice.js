/**
 * Created by Zelei on 2017/4/25.
 */
(function ($) {
  $(function () {
    loadData();
  });

  function loadData(params) {
    var data = $.extend({
    	page: 1,
    	rows: 10
    }, params);
    $.loading();
    $.getJSON($.toFullPath('/api/notice/queryPage'), data,
        function (response) {
          $.extend({
            paginationInfo: params
          })
          var items = response.data,
              keys = ['noticeTitleView', 'noticeTypeView', 'beginDate', 'endDate'],
              tbodyOptions = {
                preHandler: function (item) {
                  item.noticeTitleView =
                      '<a tabindex="0" class="bd-popover" role="button" title="详情" data-content="'
                      + item.noticeContent + '" style="color: inherit;">' +
                      item.noticeTitle
                      + '<span class="fa fa-search p-l-xs"></span>' +
                      '</a>';
                  if(item.noticeType == 1) {
                	  item.noticeTypeView = '<span data-read-status>滚动公告</span>';
                  } else if(item.noticeType == 2) {
                	  item.noticeTypeView = '<span data-read-status>登录公告</span>';
                  } else if(item.noticeType == 4) {
                	  item.noticeTypeView = '<span data-read-status>注册公告</span>';
                  } else if(item.noticeType == 5) {
                	  item.noticeTypeView = '<span data-read-status>彩票公告</span>';
                  } else if(item.noticeType == 6) {
                	  item.noticeTypeView = '<span data-read-status>体育公告</span>';
                  }
                }
              },
              totalRecords = response.totalCount,
              paginationOptions = {
                pageNo: data.page,
                pageSize: data.rows,
                callback: function (pageNo) {
                  loadData({page: pageNo});
                }
              };
          $('#table>tbody').renderTbody(items, keys, tbodyOptions);
          $('.bd-popover').popover({
            trigger: 'focus',
            placement: 'right'
          });
          $('#pagination').pagination(totalRecords, paginationOptions)
          $.loaded();
        }).error(function (xhr, errorText, errorType) {
      $.errorHandler(xhr, errorText, errorType);
      $('#table>tbody').renderEmptyTbody('加载失败', 9);
      $('#pagination').pagination();
    });
  }
})(jQuery)