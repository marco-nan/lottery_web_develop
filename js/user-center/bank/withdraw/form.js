/**
 * Created by Zelei on 2017/4/23.
 */
(function ($) {
  $.extend({
    flushValidateCode: function (img) {
      $(img).attr('src', $.toFullPath(
          '/v/vUserCode?t=' + Math.random() + (new Date).getTime()));
    }
  });
  $(function () {
      var withDrawNotice;
    $.ajax({
      async: false,
      url: $.toFullPath('/api/user/info'),
      type: 'get',
      dataType: 'json',
      success: function (response) {
        if (!response || !response.userInfo || !response.userInfo.type
            || response.userInfo.type === 'TEST') {
          $.confirm({
            title: '试玩帐号无法提现',
            content: '马上注册成为会员？',
            onConfirmed: function (modal, event) {
              var target = !window.parent === false && window.parent !== window
                  ? window.parent : window;
              target.location.href = $.toFullPath(
                  '/user_register.html');
            },
            onDenied: function (modal, event) {
              window.location.href = $.toFullPath(
                  '/page/user-center/account/overviews.html');
            }
          });
        }
        $.extend({
          userInfo: response.userInfo
        });
      },
      error: $.errorHandler
    });
    $.getJSON($.toFullPath('/api/userWithdraw/queryOutMoneyIndex'), null,
        function (response) {
          var counterFee = 0, sumDeductMoney = 0;
          if (!response.userInfo === false) {
            $('#account').text(response.userInfo.account);
            $('#fullName').text(response.userInfo.fullName);
          }
          if (!response.limit === false) {
              withDrawNotice = response.limit.withDrawNotice;
              var tip = '出款下限：<span class="text-primary">'
                  + $.toFixed(response.limit.singleMinLimit) + '元</span>，' +
                  '出款上限：<span class="text-primary">'
                  + $.toFixed(response.limit.singleMaxLimit) + '元</span>，' +
                  '当天提现总额度：<span class="text-primary">'
                  + $.toFixed(response.limit.dayMaxLimit) + '元</span>，' +
                  '剩余额度：<span class="text-primary">' + $.toFixed(
                      response.limit.dayMaxLimit
                      - response.sumMoney) + '元</span>。' +
                  '<br>' ;
              if(response.limit.dayMaxCount >0){
                  tip += '如果当天提现次数超过<span class="text-primary">'
                  + response.limit.dayMaxCount + '次</span>，';
                  if (response.limit.counterFeeMode === null) {
                      tip += '每次提现加收手续费<span class="text-primary">'
                          + response.limit.counterFee + '元</span>。'
                  } else {
                      if (response.limit.counterFeeMode == "0"){
                          tip += '每次提现加收手续费<span class="text-primary">'
                              + response.limit.counterFee + '元</span>。'
                      }
                      if (response.limit.counterFeeMode == "1"){
                          tip += '每次提现加收手续费为提现金额的<span class="text-primary">'
                              + response.limit.counterFee + '%</span>。'
                      }
                  }
              }


            $('#desc').html(tip);

            var min = $.toFixed(response.limit.singleMinLimit);
            $('#cashMoney').attr('min', min);
            var max=0;
            if(response.limit.dayMaxLimit!=0) {
                max = $.toFixed(Math.min(response.limit.singleMaxLimit,
                  response.limit.dayMaxLimit - response.sumMoney));
            }else{
              max=9999999
            }
            $('#cashMoney').attr('max', max);
            sumDeductMoney = response.sumDeductMoney;
          }
          $('#_dmlMoney').text($.toFixed(sumDeductMoney, 2) + '元');
          $('#cashMoney').on('input', function (e) {
            if (this.hasAttribute('max')) {
              var max = parseFloat($(this).attr('max'));
              if(max!=0) {
                if (parseFloat($(this).val()) > max) {
                  $(this).val(max);
                }
              }
            }
            var _cashMoney = parseFloat($(this).val());
            if (!$.isNumeric(_cashMoney)) {
              _cashMoney = 0;
            }
            if (response.count >= response.limit.dayMaxCount) {
                if (response.limit.counterFeeMode === null) {
                    counterFee = response.limit.counterFee;
                } else {
                    if (response.limit.counterFeeMode == "0") {
                        counterFee = response.limit.counterFee;
                    } else if (response.limit.counterFeeMode == "1") {
                        counterFee = _cashMoney * (parseFloat(response.limit.counterFee) / 100);
                    }
                }
              } else {
                  counterFee = 0;
            }
            $('#_counterFee').text($.toFixed(counterFee, 2) + '元');
            var _cashMoneyFinal = _cashMoney - counterFee - sumDeductMoney;
            $('#_cashMoney').text($.toFixed(_cashMoney, 2) + '元');
            $('#_cashMoneyFinal').text($.toFixed(_cashMoneyFinal, 2) + '元');
          }).focus().select();
          if (!response.userExtInfo === false) {
            $('#money').html(
                '<span class="text-primary">' + $.toFixed(
                    response.userExtInfo.money)
                + '元</span>' +
                '（今日已取款<span class="text-primary">' + response.count
                + '次</span>，' +
                '总计<span class="text-primary">' + $.toFixed(response.sumMoney)
                + '元</span>）');
          }
          if (!response.userBank === false) {
            $('#bankName').text(response.userBank.bankName);
            $('#cardNo').text(response.userBank.cardNo);
            $('#subAddress').text(response.userBank.subAddress);
          }
          if (response.limit.vCode === 1) {
            var validateCode = $(
                '<div id="validateCode" class="form-group row m-t-sm">' +
                '<label class="control-label"><span class="fa fa-required m-r-xs"></span>验&nbsp;&nbsp;证&nbsp;&nbsp;码：</label>'
                +
                '<div>' +
                '<input name="yzmNum" class="form-control" placeholder="请输入验证码" autocomplete="off" required>'
                +
                '</div>' +
                '<div>' +
                '<img style="width: 7.5rem;height: 2.375rem;" src="'
                + $.toFullPath(
                    '/images/yzm.gif')
                + '" onclick="jQuery.flushValidateCode(this);" alt="刷新">' +
                '</div>' +
                '</div>');
            $(validateCode).insertAfter($('#validateCodeAfterThis')).find(
                'input').on('focus', function (e) {
              var img = $(validateCode).find('img');
              if (img.attr('src') === $.toFullPath(
                      '/images/yzm.gif')) {
                $.flushValidateCode(img[0]);
              }
            });
          }
        }).error($.errorHandler);
    $('#withdrawForm').validate({
      submitHandler: function (form) {
        $.loading();
        $.post($.toFullPath('/api/userWithdraw/save'),
            $(form).serializeObject(), function (response) {
              $.loaded();
              $.modal({
                title: '提交成功',
                content: withDrawNotice !=null && withDrawNotice.length!=0?withDrawNotice:'财务将在15分钟内为您拨款！',
                cancelCallback: function (modal, event) {
                  window.location.href = '/page/user-center/report/bill_report.html';
                }
              });
            }, 'text').error($.errorHandler);
      },
      errorPlacement: $.errorPlacement
    });
  });
})(jQuery);