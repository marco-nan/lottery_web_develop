/**
 * 活动大厅
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
      activityInfo:{},
      loadActivityDetails: function (activityNo) {
        if(!activityNo){
          alert("无活动id");
          return;
        }
        //展示html
        $.get($.toFullPath('/page/user-center/activity/activity-detail.html'), null,
            function (response) {
              $('#mainContainer').hide();
              $(document.body).append(response);
              $('#goBackBtn').on('click', function (e) {
                $(document.body).children(':not(#mainContainer)').remove();
                $('#mainContainer').show();
              });

              //加载具体信息
              loadDetails(activityNo);
            }, 'html').error($.errorHandler);
      },
      applyActivity: function (activityNo) {
        if(!activityNo){
          alert("无活动id");
          return;
        }
        $.confirm({
          title: '操作提示',
          confirmContext: 'primary',
          content: '您确定要申请参加该活动吗?',
          onConfirmed: function (modal) {
            modal.modal('hide');
            $.post($.toFullPath('/api/activity/applyActivityRecord'), {id: activityNo},
                function (response) {
                  var msg='申请成功';
                  if(response){
                    var obj = jQuery.parseJSON( response );
                    if(obj.code==500){
                      msg=obj.message;
                    }
                  }
                  $.info(msg, '', function () {});
                },'text').error($.errorHandler);
            }
        });
      }
    });
    $.getJSON($.toFullPath('/api/user/info'), null, function (response) {
      if (response.userInfo.isDl) {
        $('<div class="form-group m-r-md m-b-xs">' +
            '<label for="subAccount">帐号：</label>' +
            '<input id="subAccount" name="subAccount" class="form-control input-sm field-sm">'+
            '</div>'
        ).insertBefore($('#queryBtn'));
      }
    }).error($.errorHandler);
  });

  function loadData() {
    $.loading();
    //序列化查询条件
    var data = $('#queryForm').serializeObject();

    $.getJSON($.toFullPath('/api/activity/queryMyActivityRecord'), data,
        function (response) {
          var pageCount = 0;
          var items = response.data,
              keys = ['num', 'activityRecordName', 'activityRecordTitle','beginDatetime', 'endDatetime','operaction'],
              tbodyOptions = {
                preHandler: function (item) {
                  pageCount += 1;
                  item.num=pageCount;
                  var operaction = '<a onclick="jQuery.loadActivityDetails(\''+ item.id + '\')" class="text-primary" role="button">详情</a>';
                  //如果活动为手动申请
                 // if(item.activityType==1){
                    //operaction += '&nbsp;<a onclick="jQuery.applyActivity(\''+ item.id + '\')" class="text-primary" role="button">申请</a>';
                 // }
                  item.operaction =operaction;
                  $.activityInfo[item.id]=item;
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

  function loadDetails(activityNo) {
    var data={};
    data.id=activityNo;
    //查询规则信息，包含了活动信息
    $.getJSON($.toFullPath('/api/activity/getActivityRecord'), data,
        function (response) {
          var activityType=0;
          var ruleList=response.ruleList;
          var activityRecord=response.activityRecord;
          activityType=activityRecord.activityType;
          for (var key in activityRecord) {
            var p = $('#detailContainer form .form-group p#' + key);
            if (p.length !== 0) {
              p.html(activityRecord[key]);
            }
          }
        // if(activityType!=0){
         //  $('<button id="applyBtn" onclick="jQuery.applyActivity(\'' + activityNo+ '\')" class="btn btn-primary m-r-md">申请</button>').insertBefore('#goBackBtn');
       //  }
          var block="";
          block="<table class=\"table table-bordered\">";
          // block += "<tr><td>编号</td><td>日总存款金额</td><td>抽奖次数</td><td>最大金额</td></tr>";
          block += "<tr><td>编号</td><td>日总存款金额</td><td>抽奖次数</td></tr>";
          var index=1;
          $.each(JSON.parse(ruleList[0].block), function(index,data){
            if(data.maxMoney && data.maxMoney>0){
              block+="<tr>";
              block+="<td>"+ (index + 1)+"</td>";
              block+="<td>"+data.money+"</td>";
              block+="<td>"+data.count+"</td>";
              // block+="<td>"+data.maxMoney+"</td>";
              block+="</tr>";
              index++;
            }
          });
          block+="</table>";
          $('#activityRecordDesc').html(block);

        }, 'html').error($.errorHandler);
  }
})(jQuery);
