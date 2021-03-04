/**
 * Created by Zelei on 2017/4/24.
 */
(function ($) {
  var rebateMode = systemConfig.site_rebate_model;

  // https://github.com/zenorocha/clipboard.js/issues/155#issuecomment-217372642
  // clicpboard 和 bootstrap modal 产生的复制无效bug
  $.fn.modal.Constructor.prototype.enforceFocus = function () {
  };

  var clipboard = null;
  $.extend({
    spreadInfo: {
      view: function (id) {
        $.getJSON($.toFullPath('/api/spreadInfo/getByAgentId'), {id: id},
            function (response) {
              if (!response) {
                return $.warn('不存在的记录！');
              }
              preHandleSpreadInfo(response);
              var content =
                  '<form class="form-horizontal form-text-right">' +
                  '<div class="form-group row m-b-0">' +
                  '<label class="col-lg-4 control-label">推广渠道链接：</label>' +
                  '<div class="col-lg-8"><p class="form-control-static text-left">'
                  + response.url + '</p></div>' +
                  '</div>' +
                  '<div class="form-group row m-b-0">' +
                  '<label class="col-lg-4 control-label">推广码：</label>' +
                  '<div class="col-lg-8"><p class="form-control-static text-left">'
                  + response.code + '</p></div>' +
                  '</div>' +
                  '<div class="form-group row m-b-0">' +
                  '<label class="col-lg-4 control-label">推广页面：</label>' +
                  '<div class="col-lg-8"><p class="form-control-static text-left">'
                  + response.spreadTypeName + '</p></div>' +
                  '</div>' +
                  '<div class="form-group row m-b-0">' +
                  '<label class="col-lg-4 control-label">发布时间：</label>' +
                  '<div class="col-lg-8"><p class="form-control-static text-left">'
                  + response.addTime + '</p></div>' +
                  '</div>' +
                  '<div class="form-group row m-b-0">' +
                  '<label class="col-lg-4 control-label">访问量：</label>' +
                  '<div class="col-lg-8"><p class="form-control-static text-left">'
                  + response.visitCount + '</p></div>' +
                  '</div>' +
                  '<div class="form-group row m-b-0">' +
                  '<label class="col-lg-4 control-label">注册数：</label>' +
                  '<div class="col-lg-8"><p class="form-control-static text-left">'
                  + response.registCount + '</p></div>' +
                  '</div>' +
                  '<div class="form-group row m-b-0">' +
                  '<label class="col-lg-4 control-label">推广目标：</label>' +
                  '<div class="col-lg-8"><p class="form-control-static text-left">'
                  + response.userTypeDesc + '</p></div>' +
                  '</div>' +
                  '<div class="form-group row m-b-0">' +
                  '<label class="col-lg-4 control-label">返水比率：</label>' +
                  '<div class="col-lg-8"><p class="form-control-static text-left">'
                  + response.rebateDesc + '</p></div>' +
                  '</div>' +
                  '</form>';
              $.modal({
                title: '详情',
                content: content
              });
            }).error($.errorHandler);
      },
      edit: function (id) {
        $.loading();
        $.getJSON($.toFullPath('/api/spreadInfo/getByAgentId'), {id: id},
            function (response) {
              $.loaded();
              if (!response) {
                return $.warn('不存在的记录！');
              }
              preHandleSpreadInfo(response);
              var rebateDiv = '';
              if (rebateMode !== '1') {
                rebateDiv = '<div class="form-group row">' +
                    '<label class="col-lg-4 control-label">奖金设置：</label>' +
                    '<div class="col-lg-8">' +
                    '<div class="input-group field-md">' +
                    '<input name="rebatePercent" min="'
                    + $.minRebatePercent + '" max="'
                    + $.maxRebatePercent
                    + '" class="form-control number" required/>' +
                    '<span class="input-group-addon">%</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
              }

              var content =
                  '<form class="form-horizontal form-text-right">' +
                  '<input type="hidden" name="id" value="' + response.id
                  + '" required/>' +
                  '<div class="form-group row m-b-0">' +
                  '<label class="col-lg-4 control-label">推广渠道链接：</label>' +
                  '<div class="col-lg-8"><p class="form-control-static text-left">'
                  + response.url + '</p></div>' +
                  '</div>' +
                  '<div class="form-group row">' +
                  '<label class="col-lg-4 control-label">推广码：</label>' +
                  '<div class="col-lg-8"><p class="form-control-static text-left">'
                  + response.code + '</p></div>' +
                  '</div>' +
                  '<div class="form-group row">' +
                  '<label class="col-lg-4 control-label">推广页面：</label>' +
                  '<div class="col-lg-8">' +
                  '<select name="spreadType" value="' + response.spreadType
                  + '" class="form-control field-md" required>' + $(
                  '#spreadType').html() +
                  '</select>' +
                  '</div>' +
                  '</div>' +
                  '<div class="form-group row m-b-0">' +
                  '<label class="col-lg-4 control-label">发布时间：</label>' +
                  '<div class="col-lg-8"><p class="form-control-static text-left">'
                  + response.addTime + '</p></div>' +
                  '</div>' +
                  '<div class="form-group row m-b-0">' +
                  '<label class="col-lg-4 control-label">访问量：</label>' +
                  '<div class="col-lg-8"><p class="form-control-static text-left">'
                  + response.visitCount + '</p></div>' +
                  '</div>' +
                  '<div class="form-group row m-b-0">' +
                  '<label class="col-lg-4 control-label">注册数：</label>' +
                  '<div class="col-lg-8"><p class="form-control-static text-left">'
                  + response.registCount + '</p></div>' +
                  '</div>' +
                  '<div class="form-group row">' +
                  '<label class="col-lg-4 control-label">推广目标：</label>' +
                  '<div class="col-lg-8">' +
                  '<select name="userType" value="' + response.userType
                  + '" class="form-control field-md" required>' +
                  '<option value="0">用户</option><option value="1">代理</option>' +
                  '</select>' +
                  '</div>' +
                  '</div>' +
                  rebateDiv +
                  '</form>';
              var modal = $.modal({
                title: '编辑',
                content: content,
                extendActions: [{
                  text: '提交',
                  context: 'primary',
                  callback: function (modal) {
                    modal.find('form').submit();
                  }
                }]
              });
              modal.find('select[name="spreadType"]>option[value="'
                  + response.spreadType + '"]').attr('selected', 'selected');
              modal.find('select[name="userType"]>option[value="'
                  + response.userType + '"]').attr('selected', 'selected');
              modal.find('select[name="effectiveDays"]>option[value="'
                  + response.effectiveDays + '"]').attr('selected', 'selected');
              modal.find('form').validate({
                submitHandler: function (form) {
                  $.loading();
                  var data = $(form).serializeObject();
                  data.rebate = $.toFixed(parseFloat(data.rebatePercent), 2);
                  delete data.rebatePercent;
                  $.post($.toFullPath('/api/spreadInfo/updateByAgentId'), data,
                      function (reponse) {
                        $.loaded();
                        $.info('保存成功！');
                        modal.modal('hide');
                        loadData();
                      }, 'text').error($.errorHandler($.loaded));
                },
                errorPlacement: $.errorPlacement
              });
              modal.find('input[name="rebatePercent"]').val(
                  response.rebatePercent).focus().select();
            }).error($.errorHandler);
      },
      remove: function (id) {
        $.confirm({
          title: '温馨提醒',
          confirmContext: 'primary',
          content: '删除的数据将不可恢复，确认删除？',
          onConfirmed: function (modal) {
            modal.modal('hide');
            $.loading();
            $.post($.toFullPath('/api/spreadInfo/removeByAgentId'), {id: id},
                function (response) {
                  $.loaded();
                  $.info('删除成功！', '', function () {
                    loadData($.paginationInfo);
                  });
                }, 'text').error($.errorHandler);
          }
        });
      }
    }
  });
  $(function () {
    $.getJSON($.toFullPath("/api/spreadInfo/spreadTypes"), null,
        function (response) {
          var spreadTypesHtml = ''
          $.each(response, function (index, spreadType) {
            spreadTypesHtml += '<option value="' + spreadType.id + '">'
                + spreadType.name + '</option>';
          });
          $('#spreadType').html(spreadTypesHtml);
        });
    if (systemConfig.dl_can_create_dl === '0') {
      $('#userType-container').remove()
    }
    if (rebateMode === '1') {
      $('#rebate-container').remove();
    } else {
      $.getJSON($.toFullPath('/api/dl/getDlSubRebateRange'), null,
          function (response) {
            if (!response) {
              return;
            }
            var max = $.toFixed(response[1], 4);
            var min = $.toFixed(response[0], 4);
            $.extend({
              minRebate: min,
              minRebatePercent: min,
              maxRebate: max,
              maxRebatePercent: max
            });
            max = max / 0.1;
            min = min / 0.1;
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
          }).error($.errorHandler);
    }
    loadData();
    $('#useExternalUrl').on('change', function (e) {
      if ($(this).is(':checked')) {
        $(
            '<div class="form-group">' +
            '<input id="externalUrl" name="externalUrl" class="form-control" style="width: 20.75rem;">'
            +
            '</div>').insertBefore($('#createBtn'));
      } else {
        $('#externalUrl').parent().remove();
      }
    })
    $('#createBtn').on('click', function (e) {
      var obj = $('#spreadInfoForm').serializeObject();
      obj.type = 0;
      $.post($.toFullPath('/api/spreadInfo/createByAgentId'),
          obj, function (response) {
            $.info('保存成功！', '', loadData);
          }, 'text').error($.errorHandler);
    });
    $('#createWxBtn').on('click', function (e) {
      var obj = $('#spreadInfoForm').serializeObject();
      obj.type = 1;
      $.post($.toFullPath('/api/spreadInfo/createByAgentId'),
          obj, function (response) {
            $.info('保存成功！', '', loadData);
          }, 'text').error($.errorHandler);
    });
  });

  function preHandleSpreadInfo(spreadInfo) {
    spreadInfo.url = !!spreadInfo.externalUrl ? spreadInfo.externalUrl + '/'
        + spreadInfo.id : $.toFullPath('/' + spreadInfo.id);
    var url = spreadInfo.url;
    spreadInfo.spreadUrl = url;
    spreadInfo.url = "<a role=\"button\" id='" + spreadInfo.id
        + "'class='copy none-underline' data-clipboard-text='" + url + "'>"
        + url + "<span class='fa fa-files-o m-l-xs text-muted'></span></a>";
    spreadInfo.userTypeDesc = spreadInfo.userType === 0 ? '用户' : '代理';
    spreadInfo.effectiveDaysDesc = spreadInfo.effectiveDays === 0 ? '永久有效'
        : spreadInfo.effectiveDays + '天';
    spreadInfo.effectiveDesc = spreadInfo.effective ? '有效' : '失效';
    spreadInfo.rebatePercent = $.toFixed(spreadInfo.rebate, 2);
    spreadInfo.rebateDesc = spreadInfo.rebatePercent + '%';
    if (clipboard == null) {
      clipboard = new Clipboard('.copy');//剪贴板
      clipboard.on('success', function (e) {
        $.info("复制链接成功！");
      });
    }
  }

  function loadData(params) {
    var data = $.extend({
      page: 1,
      rows: 10
    }, params);
    $.loading();
    $.getJSON($.toFullPath('/api/spreadInfo/queryPageByAgentId'), data,
        function (response) {
          $.extend({
            paginationInfo: params
          })
          var items = response.data,
              keys = ['url', 'code', 'spreadTypeName', 'userTypeDesc',
                'rebateDesc', 'visitCount', 'registCount',
                'addTime', 'operations'],
              tbodyOptions = {
                preHandler: function (item) {
                  preHandleSpreadInfo(item);
//                  if (item.url.length > 50) {
//                    item.url = '<span title="' + item.url + '">'
//                        + item.url.substr(0, 47) + '...</span>';
//                  }
                  item.operations = '<a class="text-muted" role="button" onclick="window.open(\'/api/qrcode?content='
                      + item.spreadUrl + '\')">二维码</a>'
                      + '<a onclick="jQuery.spreadInfo.view(\''
                      + item.id
                      + '\')" class="text-muted m-l-sm" role="button">详情</a>'
                      + '<a onclick="jQuery.spreadInfo.edit(\'' + item.id
                      + '\')" class="text-muted m-l-sm" role="button">编辑</a>'
                      + '<a onclick="jQuery.spreadInfo.remove(\'' + item.id
                      + '\')" class="m-l-sm" role="button"><span class="fa fa-times"></span></a>';
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
          $('#pagination').pagination(totalRecords, paginationOptions)
          $.loaded();
        }).error(function (xhr, errorText, errorType) {
      $.errorHandler(xhr, errorText, errorType);
      $('#table>tbody').renderEmptyTbody('加载失败', 9);
      $('#pagination').pagination();
    });
  }
})(jQuery);