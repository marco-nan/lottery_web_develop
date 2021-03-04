/**
 * Created by autumn on 2017/11/20.
 */

(function ($) {
  'use strict';

  var params = {};
  function initDateRange() {
    var date = new Date(), now = $.dateformat(date, 'yyyy-MM-dd');
    date.setTime(date.getTime() - (1000 * 60 * 60 * 24 * 7));
    var minDate = $.dateformat(date, 'yyyy-MM-dd');

    $('#startDatePicker').datepicker({
      el: 'startDate',
      minDate: minDate,
      maxDate: now
    }).children('#startDate').val(now);
    $('#endDatePicker').datepicker({
      el: 'endDate',
      minDate: minDate,
      maxDate: now
    }).children('#endDate').val(now);
  }

  function renderTable(pageData, pageNo) {
    var totalMoney = 0,totalCanWin = 0,itemSize = 0,currentMoney = 0,currentCanWin=0,totalItemSize=0,totalResult = 0,currentResult = 0;
    var otherData = pageData.otherData;
    if(!!otherData ){
        totalMoney = otherData.money;
        totalCanWin = otherData.canWin;
        totalItemSize = otherData.totalNum;
        totalResult = otherData.result + 0;
    }

    $('#pagination').pagination(pageData.totalCount, {
      pageNo: pageNo,
      pageSize: 10,
      callback: function (p) {
        loadPage(p);
      }
    });



    var keys = ['orderDate', 'orderID', 'sportsType', 'money', 'canWin','result','resultStatus',
      'status'], tbodyOptions = {
      preHandler: function (item) {

        if(!item.result && item.result != 0){
          item.result = '-'
        }else{
            currentResult+=item.result;
        }

        currentMoney+=item.money;
        currentCanWin += item.canWin;
        itemSize++;

        var settleStatus = item.status;

        if(item.status  == 18 || item.status == 1){
          item.status = '<span class="text-success">已结算</span>';
        }else{
          item.status = '<span class="text-danger">待结算</span>';
        }
        
        var flag = true;
        //综合过关订单根据派彩判断输赢状态
        switch(item.sportsType){
    	  case 2:
    	  case 4:
    	  case 8:
    	  case 14:
    		flag = false;
        	if(item.result > item.money && settleStatus != 26){
        		item.resultStatus = '<span class="text-success">赢</span>';
        	}else if(item.result < item.money && settleStatus != 26){
        		item.resultStatus = '<span class="text-danger">输</span>';
        	}else if(item.result == item.money && settleStatus != 26){
        		item.resultStatus = '<span class="text-info">打平</span>';
        	}else if(settleStatus == 26){
                item.resultStatus = '<span class="text-info">-</span>';
                item.result = '-'
            }
    	}
        
        if(item.sportsType < 6){
          item.sportsType = '<span>篮球</span>'
        }else{
          item.sportsType = '<span>足球</span>'
        }
        if(flag){
          switch (item.resultStatus){
            case 0:
              item.resultStatus = '<span class="text-info">打平</span>';
              break;
            case 1:
              item.resultStatus = '<span class="text-success">赢</span>';
              break;
            case 2:
              item.resultStatus = '<span class="text-success">赢一半</span>';
              break;
            case 3:
              item.resultStatus = '<span class="text-danger">输</span>';
              break;
            case 4:
              item.resultStatus = '<span class="text-danger">输一半</span>';
              break;
            default:
              item.resultStatus = '-';
          }
        }
      }
    };

    var tbody =  $('#table>tbody').renderTbody(pageData.data, keys, tbodyOptions);
    if(itemSize > 0){
      tbody.append(
          '<tr>' +
          '<td colspan="3">小计' + itemSize + '笔</td>' +
          '<td>' + $.toFixed(currentMoney) + '</td>' +
          '<td>' + $.toFixed(currentCanWin) + '</td>' +
          '<td>' + (currentResult?$.toFixed(currentResult):'-') +'</td>' +
          '<td></td>' +
          '</tr>'
      ).append(
          '<tr>' +
          '<td colspan="3">总计' + totalItemSize + '笔</td>' +
          '<td>' + $.toFixed(totalMoney) + '</td>' +
          '<td>' + $.toFixed(totalCanWin)+'</td>'+
          '<td>' + (totalResult? $.toFixed(totalResult):'-')+'</td>' +
          '<td></td>' +
          '</tr>'
      );
      $.loaded();
    }

  }

  function loadPage(pageNo) {
    $.loading();
    $.getJSON('/api/sports/queryBetForUserCenter', $.extend({
      page: pageNo,
      rows: 10
    }, params), function (response) {
      renderTable(response, pageNo);
      $.loaded();
    }).error($.errorHandler);
  }

  function search() {
     params = {
      start: $('#startDate').val() + ' 00:00:00',
      end: $('#endDate').val() + ' 23:59:59',
      status:$("#status").val()
    }
    loadPage(1);
  }

  function getSportBets() {
    $.loading();
    search();
  }

  $(function () {

    $("#query").on('click',function () {

      search();

    });
    loadGameNav(function () {

    }, function () {

    }).error(function () {
       $.errorHandler.apply(null, arguments)
    });
    initDateRange();
    getSportBets();

  })

})(jQuery);
