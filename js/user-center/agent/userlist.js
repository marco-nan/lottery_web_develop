(function ($) {
  var hisArr = [];
  var queryMap = {};
  var account;

  var rebateMode;
  $.ajax({
    url: $.toFullPath('/data/json/config.json'),
    async: false,
    dataType: 'json',
    success: function (response) {
      var systemConfig = response['system_config'];
      for (var i = 0; i < systemConfig.length; i++) {
        var config = systemConfig[i];
        if (config.configKey === 'site_rebate_model') {
          rebateMode = config.configValue;
        }
      }
    },
    error: function () {
      rebateMode = '1';
    }
  });

  $.extend({
    openRebate: function (userId) {
      hisArr.push($("#subAccount").val());//把上一次放入历史操作数组
      window.location.href = '/page/user-center/agent/rebate-setting.html?'
          + new Date().getTime() + '&hisArr=' + hisArr.toString()
          + '&subUserId=' + userId + '&queryMap=' + queryMapFormat(
              JSON.stringify(queryMap));
    },
    openTeam: function (userId, account) {
      hisArr.push($("#subAccount").val());//把上一次放入历史操作数组
      window.location.href = '/page/user-center/agent/team-overviews.html?'
          + new Date().getTime() + '&hisArr=' + hisArr.toString()
          + '&subUserId=' + userId + '&account=' + account + '&queryMap='
          + queryMapFormat(JSON.stringify(queryMap));
    },
    openDetail: function (userId) {
      hisArr.push($("#subAccount").val());//把上一次放入历史操作数组
      window.location.href = '/page/user-center/agent/sub-detail.html?'
          + new Date().getTime() + '&hisArr=' + hisArr.toString()
          + '&subUserId=' + userId + '&queryMap=' + queryMapFormat(
              JSON.stringify(queryMap));
    },
    openBill: function (userId) {
      hisArr.push($("#subAccount").val());//把上一次放入历史操作数组
      window.location.href = '/page/user-center/report/bill_report.html?'
          + new Date().getTime() + '&hisArr=' + hisArr.toString()
          + '&subUserId=' + userId + '&queryMap=' + queryMapFormat(
              JSON.stringify(queryMap));
    }
  })

  if ($.getUrlParam('hisArr') != null) {
    hisArr = $.getUrlParam('hisArr').split(",");
  }

  if (isNotEmpty($.getUrlParam('queryMap'))) {
    queryMap = JSON.parse(queryMapResotre($.getUrlParam('queryMap')));
  }

  $(function () {

    account = loadCurrAccount();//初始隐藏currAccount值

    //设置默认查询时间 最近半年
    $('#startDatePicker').datepicker({el: 'startDate'}).children('#startDate');//.val(minusMonth(6));
    $('#endDatePicker').datepicker({el: 'endDate'}).children('#endDate');//.val($.dateformat(new Date(), 'yyyy-MM-dd'));

    //查询按钮
    $('#queryBtn').on('click', function (e) {
      $('#page').val(1);
      $('#rows').val(10)
      $('#subAccount').val(account);
      queryMap = $('#queryForm').serializeObject();
      loadData(queryMap, false);
    });

    //重置按钮
    $('#resetBtn').on('click', function () {
      $('#account').val(null);
      $('#moneyFrom').val(null);
      $('#moneyTo').val(null);
      $('#startDatePicker').datepicker({el: 'startDate'}).children(
          '#startDate').val("");//.val(minusMonth(6));
      $('#endDatePicker').datepicker({el: 'endDate'}).children('#endDate').val(
          "");//.val($.dateformat(new Date(), 'yyyy-MM-dd'));
      $('#page').val(1);
      $('#rows').val(10);
      $('#subAccount').val(account);
      loadData($('#queryForm').serializeObject(), false);
    });

    //第一次返回页面条件判断
    if (hisArr.length == 0 && isEmpty(queryMap)) {
      //加载数据
      loadData($('#queryForm').serializeObject(), false);
    } else {
      if (hisArr.length == 1 && isNotEmpty(queryMap)) {//最后一次，带上查询条件
        loadData(queryMap, true);
        //回填查询条件
        loadQuery(queryMap)
        queryMap = {};
      } else {
        var lastAccount = hisArr.pop();
        if (lastAccount) {
          $("#subAccount").val(lastAccount);
        }
        loadData({subAccount: lastAccount}, true);
      }
    }

  });

  function loadData(objectArr, isSub) {
    $.loading();
    $.getJSON($.toFullPath('/api/dl/querySubUsers'), objectArr,
        function (response) {
          var items = response.data,
              keys = ['account', 'type', 'addTime','online', 'loginTime', 'money',
                'rebate', 'state', 'operations'],
              currAccount = $('#subAccount').val(),
              tbodyOptions = {
                preHandler: function (item) {
                  var commonStr =
                      '<a href="javascript:void(0)" onclick="jQuery.openDetail(\''
                      + item.userId + '\')">详情</a>' +
                      '<a href="javascript:void(0)" onclick="jQuery.openTeam(\''
                      + item.userId + '\',\'' + item.account + '\')">团队总览</a>';
                  var rebateStr = rebateMode !== '1'
                      ? '<a href="javascript:void(0)" onclick="jQuery.openRebate(\''
                      + item.userId + '\')">返点设定</a>' : '';
                  var billStr =
                      '<a href="javascript:void(0)" onclick="jQuery.openBill(\''
                      + item.userId + '\')">账变记录</a>';

                  //用户类型
                  if (item.type === 'HY') {
                    var isDl = item.isDl === true;
                    var isSelf = item.account === currAccount;
                    item.type = isDl ? '代理' : '会员';
                    item.operations = isSelf ? commonStr + billStr : commonStr + rebateStr + billStr;
                    if (!isSelf && isDl) {
                      item.account = '<a class="sub" href="javascript:void(0)">' + item.account + '</a>';
                    }
                  } else {
                    item.type = '试玩会员';
                  }

                  //状态
                  switch (item.state) {
                    case 0:
                      item.state = '待审核';
                      break;
                    case 1:
                      item.state = '启用';
                      break;
                    case 2:
                      item.state = '停用';
                      break;
                    default:
                      item.state = '';
                      break;
                  }

                  //返点级别
                  item.rebate = (item.rebate).toFixed(1) + '%';

                  //最后登录时间
                  if (item.daysWithoutLogin >= 1) {
                    item.loginTime = item.loginTime + '(' + item.daysWithoutLogin + '天前)';
                  }
                    //用户登录状态
                    if(item.online==true){
                        item.online='在线';
                    }else{
                        item.online='离线'
                    };
                  //余额
                  item.money = $.toFixed(item.money);
                }
              },
              totalRecords = response.totalCount,
              paginationOptions = {
                pageNo: parseInt($('#page').val()),
                pageSize: parseInt($('#rows').val()),
                callback: function (pageNo) {
                  $('#page').val(pageNo);
                  loadData($('#queryForm').serializeObject(), true);
                }
              };
          $('#table>tbody').renderTbody(items, keys, tbodyOptions);
          $('#pagination').pagination(totalRecords, paginationOptions)
          afterLoad(isSub);
          $.loaded();
        }).error(function () {
      $('#table>tbody').renderEmptyTbody('加载失败', 12);
      $('#pagination').pagination();
      $.loaded();
    });

  }

  function afterLoad(isSub) {
    if (isSub == false) {
      $("#subAccount").val(account);
      hisArr = [];
    }

    //返回按钮事件
    if (hisArr.length != 0) {
      if ($('#backQuery').length <= 0) {
        $('<span>&nbsp&nbsp</span><button id="backQuery" type="button" class="btn btn-primary btn-sm m-b-xs">返回</button>').insertAfter(
            $('#resetBtn'));
        $('#backQuery').on('click', function () {

          if (hisArr.length == 1 && isNotEmpty(queryMap)) {//最后一次，带上查询条件
            loadData(queryMap, true);
            loadQuery(queryMap)//回填查询条件
            queryMap = {};
          } else {
            if (hisArr.length == 1 && isEmpty(queryMap)) {
              reset();
            } else {
              var lastAccount = hisArr.pop()
              $("#subAccount").val(lastAccount);
              loadData({subAccount: lastAccount}, true);
            }
          }

        });
      }
    } else {
      $('#backQuery').remove();
    }

    $('.sub').on('click', function () {
      hisArr.push($("#subAccount").val());//把上一次放入历史操作数组
      var subAccount = $(this).text();
      $("#subAccount").val(subAccount);
      loadData({subAccount: subAccount}, true);
      //点击下级	清空查询
      cleanQueryForm();
    });

  }

  function loadCurrAccount() {
    var account;
    $.ajax({
      url: "/api/user/info",
      dataType: 'json',
      async: false,
      cache: false,
      success: function (response) {
        $('#subAccount').val(response.userInfo.account);
        account = response.userInfo.account;
      }
    }).error(function (XMLHttpRequest) {
      var responseText = xhr.responseText;
      try {
        responseText = JSON.parse(responseText);
      } catch (e) {
      }
      if (responseText.code === 'UC/TOKEN_INVALID') {
        alert('网络连接超时，请重新登陆！');
        $.cookie('token', null, {path: '/'});
        window.location.href = '/views/main.html';
      }
    });

    return account;
  }

  function cleanQueryForm() {
    $('#account').val(null);
    $('#moneyFrom').val(null);
    $('#moneyTo').val(null);
    $('#startDatePicker').datepicker({el: 'startDate'}).children(
        '#startDate').val("");//.val(minusMonth(6));
    $('#endDatePicker').datepicker({el: 'endDate'}).children('#endDate').val(
        "");//.val($.dateformat(new Date(), 'yyyy-MM-dd'));
  }

  function reset() {
    cleanQueryForm();
    $('#page').val(1);
    $('#rows').val(10);
    $('#subAccount').val(account);
    loadData($('#queryForm').serializeObject(), false);
  }

  function loadQuery(queryMap) {
    $('#account').val(queryMap.account);
    $('#moneyFrom').val(queryMap.moneyFrom);
    $('#moneyTo').val(queryMap.moneyTo);
    $('#startDate').val(queryMap.startDate);
    $('#endDate').val(queryMap.endDate);
    $('#page').val(queryMap.page);
    $('#rows').val(queryMap.rows);
    $('#subAccount').val(account);
  }

  function isEmpty(obj) {
    for (var name in obj) {
      return false;
    }
    return true;
  };

  function isNotEmpty(obj) {
    for (var name in obj) {
      return true;
    }
    return false;
  };

  function queryMapFormat(queryStr) {
    return queryStr.replace("}", ']').replace("{", '[');
  }

  function queryMapResotre(queryStr) {
    return queryStr.replace("]", '}').replace("[", '{');
  }

  function getProtocolPrefix() {
    return (window.location.protocol || document.location.protocol) + '//';
  }

  function toFullPath(url) {
    var protocol = getProtocolPrefix();
    if (url.indexOf(protocol) === -1) {
      return protocol + window.location.host + url;
    }
    return url;
  }

  //n个月以前
  function minusMonth(n) {
    var date = new Date();
    date.setMonth(date.getMonth() - n);

    var s = date.getFullYear().toString()
        + '-' + addzero(date.getMonth() + 1)
        + '-' + addzero(date.getDate() + 1);
    return s;
  }

  //月份 日期 填充0
  function addzero(v) {
    if (v < 10) {
      return '0' + v;
    }
    return v.toString();
  }
})(jQuery);