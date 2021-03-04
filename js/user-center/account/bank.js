/**
 * Created by Zelei on 2017/4/22.
 */
(function ($) {
  var bankAddressLimit;
  $(function () {
    $.getJSON($.toFullPath('/api/user/info'), null, function (response) {
      if (response.userBank) {
        tryShowUserBankOperations();
      }
      if (!response || !response.userInfo || !response.userInfo.type
        || response.userInfo.type === 'TEST') {
        $.confirm({
          title: '试玩帐号无法提现',
          content: '马上注册成为会员？',
          onConfirmed: function (modal, event) {
            var target = !window.parent === false && window.parent !== window
              ? window.parent : windown;
            target.location.href = $.toFullPath(
              '/views/html/register.html');
          },
          onDenied: function (modal, event) {
            window.location.href = $.toFullPath(
              '/page/user-center/account/overviews.html');
          }
        });
      }

      var fullName = response.userInfo.fullName;
      if (!fullName === false) {
        $('#fullNameStatic').text(fullName).show();
        $('#fullName, #fullNameTips').hide();
        $('#fullName').val(fullName);
      } else {
        $('#fullNameStatic').text(fullName).hide();
        $('#fullName, #fullNameTips').show();
        $('#fullName').val(fullName);
      }

      if (!response.userBank === false) {
        renderDisplayForm(response.userBank);
      } else {
        renderInputForm();
      }
    }).error($.errorHandler);

    $.getJSON($.toFullPath('/data/json/limit/userWithdrawLimit.json'), null,
      function (response) {
        if (response) {
          bankAddressLimit = response.bankAddressLimit || 0;
          if (bankAddressLimit == 2) {
            $("#AddressInfo").hide();
          } else if (bankAddressLimit == 1) {
            $("#AddressInfo .m-r-xs").show();
          } else if (bankAddressLimit == 0) {
            $("#AddressInfo .m-r-xs").hide();
          }
        }
      }).error($.errorHandler);
  });

  function renderInputForm() {
    $('#userBankForm').removeClass('hidden');
    $.getJSON($.toFullPath('/data/json/config.json'), null,
      function (response) {
        $.each(response.rech_bank, function (i, e) {
          if (e.configKey !== '支付宝' && e.configKey !== '微信支付' && e.configKey
            !== '财付通') {
            $('#bankName').append(
              '<option value="' + e.configKey + '">' + e.configKey
              + '</option>');
          }
        });
      }).error($.errorHandler);
    $('#city').citySelect({prov: '北京', city: '东城区', dist: ''});
    $('#userBankForm').validate({
      rules: {
        fullName: {
          pattern: /([0-9\u4e00-\u9fa5]{2,15})/,
          remote: {
            url: $.toFullPath('/v/user/checkUnique2'),
            type: 'get',
            data: {
              type: 1,
              val: function () {
                return $('#fullName').val();
              }
            }
          }
        },
        cardNo: {
          pattern: /^(\d{16,19})$/
        }
      },
      messages: {
        fullName: {
          pattern: '姓名由2-15个汉字或数字组成',
          remote: '姓名已存在'
        },
        cardNo: {
          pattern: '卡号由16到19位数字组成'
        }
      },
      submitHandler: function (form) {
        if (bankAddressLimit == 1 && $("#bankAddress").val().replace(/^\s+|\s+$/g, "").length == 0) {
          layer.msg("详细地址为必填项！", {icon: 5}, 1200);
          return false;
        }
        $.loading();
        var data = $(form).serializeObject();
        data.bankAddress = data.bankAddress.replace(/^\s+|\s+$/g, "");
        $.post($.toFullPath('/api/user/modifyUserInfo'), data,
          function (response) {
            $.loaded();
            $.info('保存成功！', null, function () {
              window.location.reload(true)
            });
            $.loaded();
          }, 'text').error($.errorHandler);
      },
      errorPlacement: $.errorPlacement
    });
  }

  function renderDisplayForm(userBank) {
    $('#tip').remove();
    $('#bankName').parent().html(
      '<p id="bankName" class="form-control-static">' + userBank.bankName
      + '</p>');
    $('#cardNo').parent().html(
      '<p id="cardNo" class="form-control-static">' + userBank.cardNo
      + '</p>');
    $('#city').children('div').remove();
    $('#city').append(
      '<div class="col-lg-10"><p id="subAddress" class="form-control-static">'
      + userBank.subAddress + '</p></div>')
    $('#bankAddress').parent().parent().remove();
    $('#userBankForm .fa-required').removeClass('fa-required');
    $('#buttons').hide();
    $('#userBankForm').removeClass('hidden');
  }

  // 判断是否可以解绑或者修改银行卡信息
  function tryShowUserBankOperations() {
    $.ajax({
      url: '/data/json/config.json?_t=' + new Date().getTime(),
      dataType: 'json',
      success: function (response) {
        var systemConfig = response['system_config'];
        for (var i = 0; i < systemConfig.length; i++) {
          var config = systemConfig[i];
          if (config.configKey === 'is_user_bank_modifiable' && config.configValue === '1') {
            $('#removeWrapper').show();
            return;
          }
        }
        $('#removeWrapper').hide();
      }
    });
  }
})(jQuery);

$(function () {
  // 解绑银行卡
  $("#removeCard").click(function () {
    layer.prompt({title: '输入提款密码以确认解绑', formType: 1}, function (pass, index) {
      $.post($.toFullPath('/api/user/releaseBindBankCard?cashPassword=' + pass),
        function (response) {
          $.loaded();
          $.info('银行卡解绑成功！', null, function () {
            window.location.reload(true)
          });
          $.loaded();
        }, 'text').error($.errorHandler);
      layer.close(index);
    });
  })

  // 编辑银行卡
  $("#updateCard").click(function () {
    $(".text-danger").html('<span class="fa fa-warning p-r-sm"></span>修改银行卡信息');
    $("#drawWith,#AddressInfo").show();
    $("#removeWrapper").hide();
    $("#buttons").show().html('<div class="col-lg-12">\n' +
      '          <button type="button" id="submit" class="btn btn-danger m-r-md">提交</button>\n' +
      '          <button type="reset" class="btn btn-default m-r-md">重置</button>\n' +
      '        </div>')
    $("#bankName").parent().html(' <select id="bankName" name="bankName" class="form-control" required></select>')
    $.getJSON($.toFullPath('/data/json/config.json'), null,
      function (response) {
        $.each(response.rech_bank, function (i, e) {
          if (e.configKey !== '支付宝' && e.configKey !== '微信支付' && e.configKey
            !== '财付通') {
            $('#bankName').append(
              '<option value="' + e.configKey + '">' + e.configKey
              + '</option>');
          }
        });
      }).error($.errorHandler);
    $("#cardNo").parent().html('<input onkeyup="this.value=this.value.replace(/\\D/g,\'\')" id="cardNo" name="cardNo" class="form-control"\n' +
      '                 placeholder="请输入银行卡号" required\n' +
      '                 autocomplete="off">')
    $("#city .col-lg-10").html('<div class="sm">\n' +
      '          <select id="bankProvince" name="bankProvince" class="form-control prov" required>\n' +
      '            <option></option>\n' +
      '          </select>\n' +
      '        </div>\n' +
      '        <div class="sm">\n' +
      '          <select id="bankCity" name="bankCity" class="form-control city" required\n' +
      '                  disabled></select>\n' +
      '        </div>\n' +
      '        <div class="sm">\n' +
      '          <select id="bankArea" name="bankArea" class="form-control dist" required\n' +
      '                  disabled></select>\n' +
      '        </div>')
    $('#city').citySelect({prov: '北京', city: '东城区', dist: ''});
    $('#city').after('<div id="AddressInfo" class="form-group row">\n' +
      '        <label for="bankAddress" class="control-label"><span\n' +
      '          class="fa fa-required m-r-xs"></span>详细地址：</label>\n' +
      '        <div class="lg">\n' +
      '          <textarea id="bankAddress" name="bankAddress" class="form-control" placeholder="请输入详细地址"></textarea>\n' +
      '        </div>\n' +
      '      </div>')
  });

  $("body").on("click", "#submit", function () {
    var data = {
      cashPassword: $cashPassword = $("#cashPassword").val(),
      bankName: $("#bankName").val(),
      cardNo: $("#cardNo").val(),
      bankProvince: $("#bankProvince").val(),
      bankCity: $("#bankCity").val(),
      bankArea: $("#bankArea").val(),
      bankAddress: $("#bankAddress").val()
    }
    if (data.cardNo == null || data.cardNo == '') {
      layer.msg('请输入卡号')
      return
    } else if (/^\d{16,19}$/.test(data.cardNo) == false) {
      layer.msg('卡号由16到19位数字组成')
      return
    } else if (data.bankProvince == '' || data.bankProvince == null) {
      layer.msg('请选择银行卡所在省份')
      return
    } else if (data.bankCity == '' || data.bankCity == null) {
      layer.msg('请选择银行卡所在城市')
      return
    } else if (data.cashPassword == '' || data.cashPassword == null) {
      layer.msg('请输入取款密码')
      return
    } else {
      $.ajax({
        url: $.toFullPath('/api/user/modifyBankCard'),
        data: data,
        type: 'POST',
        dataType: 'text',
        success: function () {
          $.info('银行卡修改成功！', null, function () {
            window.location.reload(true)
          });
        },
        error: function (error) {
          var errorMsg = JSON.parse(error.responseText);
          layer.alert(errorMsg.msg)
        }
      })
    }
  })
})