/**
 * Created by Zelei on 2017/4/23.
 */
(function ($) {
  var allowCancel = false;
  function isAllowCancel() {
    $.getJSON("/data/json/web_system_config.json?t="+new Date().getTime(),function (data) {
      var hyCancel = data.hy_is_cancel;
      if(hyCancel!=null&&hyCancel==1){
        allowCancel = true;
      }else {
        allowCancel= false;
      }
    })
  }
  isAllowCancel();
  $(function () {
    $('#startDatePicker').datepicker({el: 'startDate'}).children(
        '#startDate').val($.dateformat(new Date(), 'yyyy-MM-dd'));
    $('#endDatePicker').datepicker({el: 'endDate'}).children('#endDate').val(
        $.dateformat(new Date(), 'yyyy-MM-dd'));
    $('#queryBtn').on('click', function (e) {
      $('#page').val(1);
      $('#rows').val(10)
      loadData()
    });
    $('#backBtn').on('click', function () {
       window.history.go(-1);
    });

    $.extend({
      games: {},
      viewBet: function (orderNo) {
        var bet = $.bets[orderNo]
        $.get($.toFullPath('/page/user-center/bet/bet-details.html'), null,
            function (response) {
              $('#mainContainer').hide();
              $(document.body).append(response);
              $('#goBackBtn').on('click', function (e) {
                $(document.body).children(':not(#mainContainer)').remove();
                $('#mainContainer').show();
              });

//  				if(bet.model==0){
//	    	  		$.get($.toFullPath('/data/json/official/config_' + bet.gameId + '.json'), null,function (data) {
//	    	  			var renderConfig = data;
//		  				makeBetOrderDetailCanWinList(bet,renderConfig);
//		  				loadDetails(orderNo);
//	    	  		}).error($.errorHandler);
//  				}else{
//	  				makeBetOrderDetailCanWinList(bet);
//	  				loadDetails(orderNo);
//  				}
              makeBetOrderDetailCanWinList(bet);
              loadDetails(orderNo);

            }, 'html').error($.errorHandler);
      },
      CPrint: function (ary, len) {
        var aryLen = ary.length;
        var script = "var arr=arguments[0],len=arguments[1],result=[];";
        var pushDataScript = "";
        var forEnd = "";
        for (var index = 0; index < len; index++) {
          pushDataScript += "arr[_" + index + "],";
          script += 0 === index ? "for(var _" + index + "=0;_" + index
              + "<len+1-" + (len - index) + ";_" + index + "++){" : "for(var _"
              + index + "=_" + (index - 1) + "+1;_" + index + "<len+1-" + (len
              - index) + ";_" + index + "++){";
          forEnd += "}";
        }
        script += "result.push([" + pushDataScript.slice(0, -1) + "])" + forEnd
            + "return result;";
        return new Function(script)(ary, aryLen)
      },
      cancelBet: function (orderNo) {
        var bet = $.bets[orderNo];
        $.confirm({
          title: '操作提示',
          confirmContext: 'primary',
          content: '即将撤销1笔注单，确定要继续操作吗？',
          onConfirmed: function (modal) {

            modal.modal('hide');
            $.post($.toFullPath('/api/bet/cancel'), {orderNo: bet.orderNo},
                function (response) {
                  $.info('撤销成功！', '', function () {
                    bet.status = 2;
                    bet.statusDesc = '<span class="text-warning">已撤单</span>';
                    $('#cancelBtn').remove();
                    loadDetails(bet.orderNo);
                    loadData();
                  });
                }, 'text').error($.errorHandler);
          }
        });
      }
    });
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

  function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
  }
  function loadData() {
    $.loading();
    var data = $('#queryForm').serializeObject();
    if (!data.gameId === false) {
      data.gameId = $('#gameId').val().split('@')[0];
      data.model = $('#gameId').val().split('@')[1];
    }
    var apiUrl = '/api/cp/records/todayList';
    var historyDate = getQueryString("date");
    if (historyDate) {
      apiUrl = "/api/cp/records/historyList";
      data.date = historyDate;
    }
    $.extend({
      bets: {}
    });
    $.getJSON($.toFullPath(apiUrl), data,
        function (response) {
          var now = new Date(), pageCount = 0, totalMoneySum = 0,
              rebateMoneySum = 0, rewardSum = 0, validMoneySum = 0,
              totalSum = response.otherData == null ? 0
                  : response.otherData.totalSum,
              validSum = response.otherData == null ? 0
                  : response.otherData.validSum;
          var items = response.data,
              keys = ['orderNoDesc', 'account', 'addTime', 'gameName',
                'cateName',
                'betInfoDesc', 'turnNum', 'totalMoney', 'validMoney',
                'rebateMoney', 'reward',
                'openNum', 'statusDesc'],
              tbodyOptions = {
                preHandler: function (item) {
                  pageCount += 1;
                  totalMoneySum += item.totalMoney;
                  item.totalMoney = $.toFixed(item.totalMoney);
                  rebateMoneySum += item.rebateMoney;
                  item.rebateMoney = $.toFixed(item.rebateMoney);
                  rewardSum += item.reward;
                  if (item.status !== 2 &&  item.status !== 4) {
                      validMoneySum += (item.totalMoney - item.drawMoney);
                  }
                  if(item.status === 2 || item.status === 4){
                      item.validMoney = 0;
                  }else{
                      item.validMoney = $.toFixed(item.totalMoney - item.drawMoney);//有效投注金额
                  }

                  item.reward = $.toFixed(item.reward);
                  item.gameName = $.games[item.gameId + '@' + (item.model
                  !== undefined && item.model !== null ? item.model : 1)];

                  if (item.poschooseName) {
//                    item.betInfoDesc = item.betInfo + "(" + item.poschooseName+ ")";
                    item.betInfoDesc = item.betInfo.length > 20 ? '<span title="'
                    		+ item.betInfo + "(" + item.poschooseName+ ")" + '">'
                    		+ item.betInfo.substr(0, 15) + '...</span>'
                    		: item.betInfo + "(" + item.poschooseName+ ")";
                  } else {
//                    item.betInfoDesc = item.betInfo;
                    item.betInfoDesc = item.betInfo.length > 20 ? '<span title="'
                    		+ item.betInfo + '">'
                    		+ item.betInfo.substr(0, 15) + '...</span>'
                    		: item.betInfo;
                  }
                          
                  item.orderNoDesc = '<a onclick="jQuery.viewBet(\''
                      + item.orderNo
                      + '\')" class="text-primary" role="button">'
                      + item.orderNo + '</a>';
                  switch (item.status) {
                    case 0:
                      if (toDate(item.betEndTime) > now && allowCancel) {
                        if (item.trackOrderNo != null && item.trackOrderNo
                            != "") {
                          item.statusDesc = '<span class="text-info">可撤销[追]</span>';
                        } else {
                          item.statusDesc = '<span class="text-info">可撤销</span>';
                        }
                      } else {
                        item.statusDesc = '<span class="text-success">未开奖</span>';
                      }
                      break;
                    case 1:
                      switch (item.result) {
                        case 0:
                          item.statusDesc = '<span class="text-muted">未中奖</span>';
                          break;
                        case 1:
                          item.statusDesc = '<span class="text-danger">已派奖</span>';
                          break;
                        case 2:
                          item.statusDesc = '<span class="text-danger">和局</span>';
                          break;
                        default:
                          item.statusDesc = '-';
                          break;
                      }
                      break;
                    case 2:
                      item.statusDesc = '<span class="text-warning">已撤单</span>';
                      break;
                    case 3:
                      item.statusDesc = '<span class="text-danger">删除</span>';
                      break;
                    case 4:
                      item.statusDesc = '<span class="text-success">追号停止</span>';
                      break;
                    default:
                      item.statusDesc = '-';
                      break;
                  }
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
          tbody.setColWidth(10, 180).setColWidth(5, 200);
          if (!items === false && items.length !== 0) {
            tbody.append(
                '<tr>' +
                '<td colspan="7">小计' + pageCount + '笔</td>' +
                '<td>' + $.toFixed(totalMoneySum) + '</td>' +
                '<td>' + $.toFixed(validMoneySum) + '</td>' +
                '<td>' + $.toFixed(rebateMoneySum) + '</td>' +
                '<td>' + $.toFixed(rewardSum) + '</td>' +
                '<td></td>' +
                '<td></td>' +
                '</tr>'
            ).append(
                '<tr>' +
                '<td colspan="7">总计' + totalRecords + '笔</td>' +
                '<td>' + $.toFixed(totalSum.totalMoney) + '</td>' +
                '<td>' + $.toFixed(validSum.totalMoney - totalSum.drawMoney)
                + '</td>' +
                '<td>' + $.toFixed(totalSum.rebateMoney) + '</td>' +
                '<td>' + $.toFixed(totalSum.reward) + '</td>' +
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

  function loadDetails(orderNo) {
    var bet = $.bets[orderNo];
//    bet.totalNums = bet.totalNums +"注";
//    bet.reward = bet.reward +"元";
//    bet.totalMoney = bet.totalMoney+"元";
//    bet.rebateMoney = bet.rebateMoney+"元";

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

      $('#detailContainer table>tbody').renderTbody(items,
          ['rewardLevelDesc', 'betInfo', 'multiple', 'rewardLevel', 'reward',
            'winMoney']);
    }

    //撤销按钮
    var curTimestamp = new Date().getTime();
    if (curTimestamp < new Date(bet.betEndTime).getTime() && bet.status == 0 && allowCancel) {
      if ($('#cancelBtn').length <= 0) {
        $('<button id="cancelBtn" onclick="jQuery.cancelBet(\'' + bet.orderNo
            + '\')" class="btn btn-primary m-r-md">撤销</button>').insertBefore(
            '#goBackBtn');
      }
    }

  }

//   function makeBetOrderDetailCanWinList(betOrder,renderConfig) {
//      var oddsAry = betOrder.odds.split(',');
//      var canWinList = []
//      
//      if (betOrder.poschoose) {
//          var tplConfig = renderConfig[betOrder.cateCode]
//          var posAry = betOrder.poschoose.split(',')
//          var postNames = tplConfig.posNames || tplConfig.sub[0];
//          var posNameAry = []
//          $.each(posAry, function (index, pos) {
//              posNameAry.push(postNames[pos])
//          })
//          betOrder.showContent = betOrder.cateName + '(' + posNameAry.join(',') + ')'
//		  canWinList.push({
//			  name: betOrder.showContent,
//			  odds: betOrder.odds,
//			  betInfo: betOrder.betInfo
//		  });
//      }else{
//    	  if (oddsAry.length > 1) {
//    		  var oddsNameAry = betOrder.oddsName.split(',')
//    		  $.each(oddsAry, function (i, odds) {
//    			  canWinList.push({
//    				  name: oddsNameAry[i],
//    				  odds: odds,
//    				  betInfo: betOrder.betInfo
//    			  })
//    		  })
//    	  } else {
//    		  canWinList.push({
//    			  name: betOrder.cateName,
//    			  odds: betOrder.odds,
//    			  betInfo: betOrder.betInfo
//    		  });
//    	  }
//      }
//      
//      betOrder.canWinList = canWinList;
//  }

  function makeBetOrderDetailCanWinList(betOrder) {
    var oddsAry = betOrder.odds.split(',');
    var canWinList = []

    if (betOrder.poschoose) {
      betOrder.showContent = betOrder.cateName + (betOrder.poschooseName ? '('
              + betOrder.poschooseName + ')' : '');
      canWinList.push({
        name: betOrder.showContent,
        odds: betOrder.odds,
        betInfo: betOrder.betInfo
      });
    } else {
      if (oddsAry.length > 1) {
        var oddsNameAry = betOrder.oddsName.split(',')
        $.each(oddsAry, function (i, odds) {
          canWinList.push({
            name: oddsNameAry[i],
            odds: odds,
            betInfo: betOrder.betInfo
          })
        })
      } else {
        canWinList.push({
          name: betOrder.cateName,
          odds: betOrder.odds,
          betInfo: betOrder.betInfo
        });
      }
    }

    betOrder.canWinList = canWinList;
  }

  function splitStr(str) {
    if (str.indexOf(",") != -1) {
      return str.split(',');
    } else {
      return [str];
    }
  }

  function toDate(str) {
    return !str === false ? new Date(Date.parse(str.replace(/-/g, '/'))) : null;
  }
})(jQuery);