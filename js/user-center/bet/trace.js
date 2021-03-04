
(function ($) {
  $(function () {
    
	$.extend({
		games:{},
		viewBet: function (orderNo) {
			  	
		        $.get($.toFullPath('/api/trace/turn'), {'traceOrderNo':orderNo},function (data) {
		        	$.get($.toFullPath('/page/user-center/bet/trace-details.html'), null,function (response) {
		        		$('#mainContainer').hide();
		        		$(document.body).append(response);
		        		$('#goBackBtn').on('click', function (e) {
				            $(document.body).children(':not(#mainContainer)').remove();
				            $('#mainContainer').show();
		        		});
			           
			           loadDetails(orderNo,data);
			         }, 'html').error($.errorHandler);
		        	
		        }).error($.errorHandler);
		  },
	});
	  
	  
	$('#startDatePicker').datepicker({el: 'startDate'}).
    	children('#startDate').val($.dateformat(new Date(), 'yyyy-MM-dd'));
    $('#endDatePicker').datepicker({el: 'endDate'}).
    	children('#endDate').val($.dateformat(new Date(), 'yyyy-MM-dd'));
    $('#queryBtn').on('click', function (e) {
    	$('#page').val(1);
    	$('#rows').val(10)
    	loadData();
    });
    
    //加载彩种数据
    $.getJSON($.toFullPath('/data/json/games.json'), function (response) {
        var gameId = $('#gameId');
        $.each(response, function (i, e) {
            if (e.isOffcial === 1) {
                gameId.append($('<option value="' + e.id + '@' + 0 + '">' + e.name
                    + ' [官]</option>'));
                $.games[e.id + '@0'] = e.name + ' [官]';
            }
            if (e.isCredit === 1) {
                gameId.append($('<option value="' + e.id + '@' + 1 + '">' + e.name
                    + ' [信]</option>'));
                $.games[e.id + '@1'] = e.name + ' [信]';
            }
        });
        loadData();
      }).error($.errorHandler);
    
    $.getJSON($.toFullPath('/api/user/info'), null, function (response) {
        if (response.userInfo.isDl) {
            $(
                    '<div class="form-group m-r-md m-b-xs">' +
                    '<label for="subAccount">帐号：</label>' +
                    '<input id="subAccount" name="subAccount" class="form-control input-sm field-sm">'
                    +
                    '</div>').insertBefore($('#queryBtn'));
        }
      }).error($.errorHandler);
    
  });
  
  function loadData() {
    $.loading();
    var data = $('#queryForm').serializeObject();
    if (!data.gameId === false) {
    	data.gameId = $('#gameId').val().split('@')[0];
    	data.model =  $('#gameId').val().split('@')[1];
    }
    $.extend({
      bets: {}
    });
    $.getJSON($.toFullPath('/api/trace/query'), data,
        function (response) {
    		var now = new Date(), pageCount = 0, 
    			totalMoneySum = 0,finishMoneySum = 0, 
              totalSum = (response.otherData==null?0:response.otherData.totalSum);
          var items = response.data,
              keys = ['orderNoDesc', 'addTime', 'account', 'gameName',
                'cateName',
                'turnNum', 'betInfoDesc','totalMoney', 'finishMoney', 'traceCount',
                'finishCount', 'statusDesc'],
              tbodyOptions = {
                preHandler: function (item) {
                  pageCount += 1;
                  
                  totalMoneySum += (item.traceTotalMoney);
                  item.totalMoney = $.toFixed(item.traceTotalMoney);
                  finishMoneySum += item.finishMoney;
                  item.finishMoney = $.toFixed(item.finishMoney);
                 
                  item.gameName = $.games[item.gameId + '@' + (item.model
                  !== undefined && item.model !== null ? item.model : 1)];
                  
//                  item.betInfoDesc = item.betInfo.length > 9 ? '<span title="'
//                      + item.betInfo + '">'
//                      + item.betInfo.substr(0, 6) + '...</span>'
//                      : item.betInfo;
                  
                  if(item.poschooseName){
//                	  item.betInfoDesc = item.betInfo +"("+item.poschooseName+")";
                      item.betInfoDesc = item.betInfo.length > 20 ? '<span title="'
                      		+ item.betInfo + "(" + item.poschooseName+ ")" + '">'
                      		+ item.betInfo.substr(0, 15) + '...</span>'
                      		: item.betInfo + "(" + item.poschooseName+ ")";
                  }else{
//                	  item.betInfoDesc = item.betInfo;
                      item.betInfoDesc = item.betInfo.length > 20 ? '<span title="'
                      		+ item.betInfo + '">'
                      		+ item.betInfo.substr(0, 15) + '...</span>'
                      		: item.betInfo;
                  }
                  
                  item.orderNoDesc = '<a onclick="jQuery.viewBet(\''
                      + item.orderNo + '\')" role="button" class="text-primary">'
                      + item.orderNo + '</a>';
             
                  if (!item.betModel) {
                    item.betModel = 0;
                  }
                  if (!item.multiple) {
                    item.multiple = 1;
                  }
                  switch (item.betModel) {
                  case 0:
                	  item.betModelDesc = '元';
                	  break;
                  case 1:
                	  item.betModelDesc = '角';
                      break;
                  case 2:
                	  item.betModelDesc = '分';
                	  break;
                  default:
                	  item.betModelDesc = '元';
                  }
                  
                  switch (item.status){
                  case 0:
                	  item.statusDesc = "进行中";
                	  break;
                  case 1:
                	  item.statusDesc ="已完成";
                	  break;
                  case 2:
                	  item.statusDesc ="撤销";
                	  break;
                  }
                  
                  switch (item.stopAfterWin){
                  case 0:
                	  item.stopAfterWinDesc = "否";
                	  break;
                  case 1:
                	  item.stopAfterWinDesc = "是";
                	  break;
                  }
                  
                  item.multipleAndBetModel = item.multiple + '倍，'
                      + item.betModelDesc;
                  $.bets[item.orderNo] = item;
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
          tbody.setColWidth(6,180);
          
          if (!items === false && items.length !== 0) {
            tbody.append(
                '<tr>' +
                '<td colspan="7">小计' + pageCount + '笔</td>' +
                '<td>' + $.toFixed(totalMoneySum) + '</td>' +
                '<td>' + $.toFixed(finishMoneySum) + '</td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '</tr>'
            ).append(
                '<tr>' +
                '<td colspan="7">总计' + totalRecords + '笔</td>' +
                '<td>' + $.toFixed(totalSum.traceTotalMoney) + '</td>' +
                '<td>' + $.toFixed(totalSum.finishMoney) + '</td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '</tr>'
            );
          }
          $('#pagination').pagination(totalRecords, paginationOptions)
          $.loaded();
        }).error(function (xhr, errorText, errorType) {
        	$.errorHandler(xhr, errorText, errorType);
        	$('#table>tbody').renderEmptyTbody('加载失败', 12);
        	$('#pagination').pagination();
    });
  }
  
  function loadDetails(orderNo,data) {
	  var bet = $.bets[orderNo];
	  if(bet.poschooseName){
		  bet.betInfo = bet.betInfo + "(" + bet.poschooseName + ")";
	  }else{
		  bet.betInfo = bet.betInfo;
	  }
	  for (var key in bet) {
		  var p = $('#detailContainer form .form-group p#' + key);
		  if (p.length !== 0) {
			  p.html(bet[key]);
		  }
	  }
  

	  if (data != null) {
		  var items = new Array();
		  var statusDesc;
		  $.each(data,function(i,turnInfo){
			  switch(turnInfo.status){
			  case 0:
				  statusDesc = "进行中";
				  break;
			  case 1:
				  statusDesc = "已完成";
				  break;
			  case 2:
				  statusDesc = "撤销";
				  break;
			  }
			  items.push({
				  turnNum: turnInfo.turnNum,
				  multiple: turnInfo.multiple,
				  status: statusDesc,
			  });
		  });
    
		  $('#detailContainer table>tbody').renderTbody(items,
				  ['turnNum', 'multiple', 'status']);
	  }
  }
  
  function toDate(str) {
	    return !str === false ? new Date(Date.parse(str.replace(/-/g, '/'))) : null;
  }
  
})(jQuery);