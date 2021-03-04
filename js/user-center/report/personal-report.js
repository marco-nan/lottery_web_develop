/**
 * Created by Zelei on 2017/4/26.
 */
(function ($) {

  $(function () {
    $('#dateFromPicker').datepicker({el: 'dateFrom',minDate:'%y-{%M-1}-%d',maxDate:'%y-%M-%d'}).children('#dateFrom').val(
        $.dateformat(new Date(), 'yyyy-MM-dd'));
    $('#dateToPicker').datepicker({el: 'dateTo',minDate:'%y-{%M-1}-%d',maxDate:'%y-%M-%d'}).children('#dateTo').val(
        $.dateformat(new Date(), 'yyyy-MM-dd'));
    $('#queryBtn').on('click', function (e) {
      loadData();
    });
    loadData();
  });

  function loadData() {
    $.loading();
    $.getJSON($.toFullPath('/api/report/personalReport'),
        $('#queryForm').serializeObject(), function (response) {
          var temp, rechMoneySum = 0, withdrawMoneySum = 0,
          		cpBetMoneySum = 0,  cpWinMoneySum = 0, 
          		sportBetMoneySum = 0,sportWinMoneySum = 0, 
          		liveBetMoneySum = 0, liveWinMoneySum = 0,
          		rebateMoneySum = 0, dlRebateMoneySum = 0,
          		discountSum = 0,  winLoseSum = 0;
          
          var items = [];
          $.each(response, function(i, item) {
              item.statTime=i;
        	  items.push(item);
          });
        var keys = ['statTimeDesc', 'rechMoneyDesc', 'withdrawMoneyDesc',
                'cpBetMoney', 'cpWinMoney', 'rebateMoney', 'dlRebateMoney',
                'discountDesc', 'winLoseDesc'];
        if(common_config.isDP){
            keys = ['statTimeDesc', 'rechMoneyDesc', 'withdrawMoneyDesc',
                    'cpBetMoney', 'cpWinMoney','spBetMoney','spWinMoney', 'liveBetMoney','liveWinMoney', 'rebateMoney', 'dlRebateMoney',
                    'discountDesc', 'winLoseDesc'];
        }

          tbodyOptions = {
            preHandler: function (item) {
              item.statTimeDesc = !item.statTime === false
                  ? item.statTime.split(' ')[0] : '';    //日期
              item.rechMoneyDesc = $.toFixed(item.bankMoney + item.handRechMoney + item.onlineMoney);   //充值金额   = 银行入款+人工存款+在线入款
              rechMoneySum  +=  item.rechMoneyDesc  //充值总计
              item.withdrawMoneyDesc  = $.toFixed(item.handWithdrawMoney + item.withdrawMoney);     //提现金额  = 会员出款+ 人工出款
              withdrawMoneySum += item.withdrawMoneyDesc   //提现总计
              item.cpBetMoney  = $.toFixed(item.cpBetMoney);     //彩票投注
              cpBetMoneySum += item.cpBetMoney;     //彩票投注总计
              item.cpWinMoney  = -$.toFixed(item.cpWinMoney);     //彩票输赢
              cpWinMoneySum  += item.cpWinMoney;    //彩票中奖总计
              item.spBetMoney   = $.toFixed(item.spBetMoney);    //体育投注
              sportBetMoneySum += item.spBetMoney   //体育投注总计
              item.spWinMoney  = -$.toFixed(item.spWinMoney);    //体育输赢
              sportWinMoneySum += item.spWinMoney;   //体育中奖总计
              item.liveBetMoney  = $.toFixed(item.liveBetMoney);    //真人投注
              liveBetMoneySum += item.liveBetMoney;   //真人投注总计
              item.liveWinMoney = -$.toFixed(item.liveWinMoney);   //真人输赢
              liveWinMoneySum += item.liveWinMoney;   //真人中奖总计
              item.rebateMoney = $.toFixed(item.cpRebateMoney +  item.spRebateMoney + item.liveRebateMoney);    //投注返点 = 体育返点 + 彩票返点 + 真人返点
              rebateMoneySum +=  item.rebateMoney;  //投注返点总计

              item.dlRebateMoney =  $.toFixed(item.dlRebateMoney);    //代理返点
              dlRebateMoneySum += item.dlRebateMoney;
              item.discountDesc  = $.toFixed(item.rechDiscount + item.otherDiscount);    //活动奖金   = 入款优惠 + 其他优惠
              discountSum += item.discountDesc;  //活动奖金总计
              item.winLoseDesc  = $.toFixed(item.cpWinMoney +  item.spWinMoney + item.liveWinMoney+ item.liveRebateMoney);   //盈亏  = 彩票盈亏+体育盈亏+真人盈亏
              winLoseSum += item.winLoseDesc ;  //盈亏总计
            }
          },
          totalRecords = response.totalCount,
          paginationOptions = { };
          var tbody = $('#table>tbody').renderTbody(items, keys, tbodyOptions);
          if (!items === false && items.length !== 0) {
            if (winLoseSum < 0) {
              winLoseSum = '<span class="text-primary">' + $.toFixed(winLoseSum)
                  + '</span>';
            } else if (winLoseSum > 0) {
              winLoseSum = '<span class="text-success">+' + $.toFixed(
                      winLoseSum)
                  + '</span>';
            } else {
              winLoseSum = '<span class="text-muted">' + $.toFixed(winLoseSum)
                  + '</span>';
            }


            var resultHtml =   '<tr>' +
                '<td class="p-y-sm"><strong>本页合计</strong></td>' +
                '<td class="p-y-sm"><strong>' + $.toFixed(rechMoneySum)   //充值总额
                + '</strong></td>' +
                '<td class="p-y-sm"><strong>' + $.toFixed(withdrawMoneySum) //提现总额
                + '</strong></td>' +
                '<td class="p-y-sm"><strong>' + $.toFixed(cpBetMoneySum)   //彩票投注总额
                + '</strong></td>' +
                '<td class="p-y-sm"><strong>' + $.toFixed(cpWinMoneySum)    //彩票中奖总额
                + '</strong></td>' ;




            if(common_config.isDP){
              resultHtml +=  '<td class="p-y-sm"><strong>' + $.toFixed(sportBetMoneySum) //体育投注总额
                  + '</strong></td>' +
                  '<td class="p-y-sm"><strong>' + $.toFixed(sportWinMoneySum) //体育中奖总额
                  + '</strong></td>' +
                  '<td class="p-y-sm"><strong>' + $.toFixed(liveBetMoneySum)   //真人投注总额
                  + '</strong></td>' +
                  '<td class="p-y-sm"><strong>' + $.toFixed(liveWinMoneySum)   //真人中奖总额
                  + '</strong></td>' ;
            }

            resultHtml +=  '<td class="p-y-sm"><strong>' + $.toFixed(rebateMoneySum)    //投注返点
                + '</strong></td>' +
                '<td class="p-y-sm"><strong>' + $.toFixed(dlRebateMoneySum)   //代理投注返点
                + '</strong></td>' +
                '<td class="p-y-sm"><strong>' + $.toFixed(discountSum)      //活动奖金
                + '</strong></td>' +
                '<td class="p-y-sm"><strong>' + winLoseSum
                + '</strong></td>' +
                '</tr>';


            tbody.append(
                resultHtml
            );
          }
          $('#pagination').pagination(totalRecords, paginationOptions)
          $.loaded();
        }).error(function (xhr, errorText, errorType) {
		     $.errorHandler(xhr, errorText, errorType);
		     $('#table>tbody').renderEmptyTbody('加载失败', 9);
		     $('#pagination').pagination();
    });
  }
})(jQuery); 