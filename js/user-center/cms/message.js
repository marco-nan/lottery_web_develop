/**
 * Created by Zelei on 2017/4/25.
 */
(function ($) {
  $.extend({
    message: {
      view: function (btn, id) {
        var tr = $(btn).parents('tr');
        var readStatus = tr.find('span[data-read-status]');
        if (readStatus.text() === '已读') {
          return;
        }
        tr.removeClass('text-primary').addClass('text-muted');
        readStatus.text('已读');
        $.get($.toFullPath('/api/pushMessage/modifyReadStatus'), {id: id});
      },
      remove: function (id) {
        $.loading();
        $.get($.toFullPath('/api/pushMessage/remove'), {id: id},
            function (response) {
              $.loaded();
              $.info('删除成功！', '', function () {
                loadData($.paginationInfo);
              });
            }, 'text').error($.errorHandler);
      }
    }
  });

  $(function () {
    loadData();
  });

  function loadData(params) {
    var data = $.extend({
      page: 1,
      rows: 10
    }, params);
    $.loading();
    $.getJSON($.toFullPath('/api/pushMessage/queryPage'), data,
        function (response) {
          $.extend({
            paginationInfo: params
          })
          var items = response.data,
              keys = ['messageTitleWithView', 'readStatusDesc', 'addTime',
                'operations'],
              tbodyOptions = {
                cssClass: function (row, item) {
                  return !item ? '' : item.readStatus === 0
                      ? 'text-primary'
                      : 'text-muted';
                },
                preHandler: function (item) {
                  item.messageTitleWithView =
                      '<a tabindex="0" onclick="jQuery.message.view(this, \''
                      + item.id
                      + '\')" class="bd-popover" role="button" title="详情" data-content="'
                      + item.messageContent + '" style="color: inherit;">' +
                      item.messageTitle
                      + '<span class="fa fa-search p-l-xs"></span>' +
                      '</a>';
                  item.readStatusDesc = '<span data-read-status>'
                      + (item.readStatus === 0 ? '未读' : '已读') + '</span>';
                  item.operations =
                      '<a onclick="jQuery.message.remove(\'' + item.id
                      + '\')" class="fa fa-times bd-popover" role="button" title="删除" style="color: inherit;"></a>';
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