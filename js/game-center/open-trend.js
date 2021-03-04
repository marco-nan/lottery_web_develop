/**
 * Created by Zelei on 2017/5/9.
 */
(function ($) {
  $.extend({
    getProtocolPrefix: function () {
      return (window.location.protocol || document.location.protocol) + '//';
    },
    toFullPath: function (url) {
      var protocol = $.getProtocolPrefix();
      if (url.indexOf(protocol) === -1) {
        return protocol + window.location.host + url;
      }
      return url;
    },
    getQueryParameter: function (parameterName) {
      if (!parameterName) {
        return null;
      }
      var reg = new RegExp('(^|&)' + parameterName + '=([^&]*)(&|$)');
      var r = decodeURI(window.location.search.substr(1)).match(reg);
      return r != null ? r[2] : null;
    },
    dateformat: function (date, pattern) {
      var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
      };
      var week = {
        '0': '/u65e5',
        '1': '/u4e00',
        '2': '/u4e8c',
        '3': '/u4e09',
        '4': '/u56db',
        '5': '/u4e94',
        '6': '/u516d'
      };
      if (/(y+)/.test(pattern)) {
        pattern = pattern.replace(RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      if (/(E+)/.test(pattern)) {
        pattern = pattern.replace(RegExp.$1,
            ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f'
                : '/u5468') : '') + week[date.getDay() + '']);
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(pattern)) {
          pattern = pattern.replace(RegExp.$1,
              (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(
                  ('' + o[k]).length)));
        }
      }
      return pattern;
    },
    jsk3TypeDict: {
      4: '对子',
      5: '豹子',
      6: '三不同'
    },
    loading: function (id) {
      var loadingEl = $('<div class="loading-default"><div></div></div>');
      if (!id === false) {
        loadingEl.attr('id', id);
      }
      $(document.body).append(loadingEl);
      return loadingEl;
    },
    loaded: function (id) {
      if (!id === false) {
        $('#' + id).remove();
      } else {
        $(document.body).children('.loading-default').remove();
      }
    }
  });

  function initialLotteryTrend(settings) {
    var digitRange = settings.digitRange.slice().reverse();
    if (settings.showDistri) {
      digitRange.push('号码分布');
    }
    var ths1 = '<th rowspan="2" class="issue">期数</th><th rowspan="2" colspan="'
        + settings.digitCount + '">开奖号码</th>';
    var ths2 = '';
    var ths3 = '';
    for (var i = 0; i < digitRange.length; i++) {
      ths2 += '<th colspan="' + settings.numCount + '" class="separate">'
          + digitRange[i]
          + '</th>';
      for (var j = 0; j < settings.numCount; j++) {
        ths3 += '<th' + (j === 0
                ? ' class="separate"' : '')
            + '>' + settings.numRange[j] + '</th>';
      }
    }
    var thead = '<thead><tr>' + ths1 + ths2 + '</tr><tr>' + ths3
            + '</tr></thead>',
        tbody = '<tbody></tbody>',
        tfoot = '<tfoot><tr>' + ths1 + ths3 + '</tr><tr>' + ths2
            + '</tr></tfoot>';
    $(settings.tableContainer).html(
        '<table class="trend-table" cellpadding="0" cellspacing="0">' + thead
        + tbody + tfoot + '</table>');
  }

  function generateK3StatisticsTrs(options) {
    var tr = '', distriDigit;
    $.each(options.items, function (i, item) {
      tr += '<tr class="sum ' + item.cssClass + '"><td colspan="'
          + (options.digitCount + 1) + '">' + item.name + '</td>';
      $.each(item.dataArr, function (j, e) {
        distriDigit = j % options.numCount;
        e = Math.abs(e);
        if (e > 99) {
          tr += '<td class="small' + (distriDigit === 0 ? ' separate' : '')
              + '">' + e
              + '</td>';
        } else {
          tr += '<td' + (distriDigit === 0 ? ' class="separate"' : '') + '>' + e
              + '</td>';
        }
      });
      if (options.showDistri) {
        for (var j = 0; j < options.numCount; j++) {
          tr += '<td' + (j === 0 ? ' class="separate"' : '') + '>-</td>';
        }
      }
      tr += '</tr>';
    });
    return tr;
  }

  function loadLotteryTrend(response, settings) {
    var tbody = $(settings.tableContainer + ' tbody'), tr, leftSeperate,
        bottomSeperate, distri, distriDigit, digit,
        temp = response.bodyList.length % 5;
    $.each(response.bodyList, function (i, line) {
      bottomSeperate = (i - temp) % 5 === 0;
      distri = new Array();
      tr = $('<tr data-issue="' + line.issue + '"' + (bottomSeperate
              ? ' class="separate"'
              : '') + '></tr>').append(
          '<td class="issue"><span  style="width: ' + settings.issueWidth
          + 'px; display: inline-block">' + line.issue + '</span></td>');
      $.each(line.openNum, function (j, e) {
        tr.append(
            '<td class="open-num no-line"><span>' + e + '</span></td>');
      });
      $.each(line.bodyArr, function (j, e) {
        e = parseInt(e);
        distriDigit = j % settings.numCount;
        leftSeperate = distriDigit === 0;
        if (!distri[distriDigit]) {
          distri[distriDigit] = e < settings.minNum ? e : 1;
        } else {
          if (e < settings.minNum) {
            distri[distriDigit] = Math.max(e, distri[distriDigit]);
          } else {
            distri[distriDigit] = distri[distriDigit] < settings.minNum
                ? 1
                : distri[distriDigit] + 1;
          }
        }
        digit = parseInt(j / settings.numCount);
        if (e < settings.minNum) {
          tr.append(
              '<td class="missing-count' + (leftSeperate ? ' separate'
                  : '') + (e < -99 ? ' small' : '') + '"><span>' + (0 - e)
              + '</span></td>');
        } else {
          tr.append(
              '<td class="open-num ' + (leftSeperate ? 'separate ' : '')
              + (digit % 2 === 0 ? 'odd' : 'even') + '"><span>' + e
              + '</span></td>');
        }
      });
      if (settings.showDistri) {
        $.each(distri, function (j, e) {
          if (e < settings.minNum) {
            tr.append(
                '<td class="missing-count' + (j === 0 ? ' separate' : '')
                + '"><span>'
                + (0 - e) + '</span></td>');
          } else {
            tr.append(
                '<td class="open-num-distri' + (e > 1 ? ' multiple' : '')
                + (j === 0 ? ' separate' : '') + '"><span>'
                + settings.numRange[j]
                + '</span></td>');
          }
        });
      }
      tbody.prepend(tr);
    });
    tbody.append(generateK3StatisticsTrs({
      items: [{
        cssClass: 'appear-count',
        name: '出现总次数',
        dataArr: response.appearCountArr
      }, {
        cssClass: 'missing-count-avg',
        name: '平均遗漏',
        dataArr: response.averageMissingArr
      }, {
        cssClass: 'missing-count-max',
        name: '最大遗漏',
        dataArr: response.maxMissingArr
      }, {
        cssClass: 'appear-count-max',
        name: '最大连出',
        dataArr: response.maxAppearArr
      }],
      digitCount: settings.digitCount,
      numRange: settings.numRange,
      numCount: settings.numCount,
      showDistri: settings.showDistri
    }));
    var container = $(settings.tableContainer);
    var table = container.children('table');
    var trs = table.find('tbody tr:not(.sum)');
    $.each(response.appearCountArr, function (i, e) {
      if (e < 5) {
        return;
      }
      trs.each(function (j, tr) {
        $(tr).children(
            'td:eq(' + (i + settings.digitCount + 1) + ')').addClass(
            'hot');
      });
    });
    var trsLength = trs.length;
    $.each(response.currentMissingArr, function (i, e) {
      if (e >= 0) {
        return;
      }
      e = Math.abs(e);
      trs.each(function (j, tr) {
        if (trsLength - j <= e) {
          $(tr).children(
              'td:eq(' + (i + settings.digitCount + 1) + ')').addClass(
              'current-missing');
        }
      });
    });
    container.css({width: 'auto'}).width(table.outerWidth());
    $.lineCanvas.attr('width', table.outerWidth());
    $.lineCanvas.attr('height', table.outerHeight());
  }

  function generateK3StasticTrs(options) {
    var tr = '';
    $.each(options.items, function (i, item) {
      tr += '<tr class="sum ' + item.cssClass + '"><td colspan="4">' + item.name
          + '</td>';
      for (var j = 9; j < 25; j++) {
        var num = Math.abs(item.dataArr[j]);
        if (num > 99) {
          tr += '<td class="small' + (j === 9 ? ' separate' : '')
              + '">' + num
              + '</td>';
        } else {
          tr += '<td' + (j === 9 ? ' class="separate"' : '') + '>' + num
              + '</td>';
        }
      }
      for (var j = 6; j < 9; j++) {
        var num = Math.abs(item.dataArr[j]);
        if (num > 99) {
          tr += '<td class="small' + (j === 6 ? ' separate' : '')
              + '">' + num
              + '</td>';
        } else {
          tr += '<td' + (j === 6 ? ' class="separate"' : '') + '>' + num
              + '</td>';
        }
      }
      if (options.showDistri) {
        for (var j = 0; j < 6; j++) {
          tr += '<td' + (j === 0 ? ' class="separate"' : '') + '>-</td>';
        }
      }
      tr += '</tr>';
    });
    return tr;
  }

  function generateK3Trend(response, settings) {
    var digitRange = settings.digitRange.slice().reverse();
    var ths1 = '<th rowspan="2" class="issue">期数</th><th rowspan="2" colspan="'
        + settings.digitCount
        + '">开奖号码</th>';
    var ths2 = '<th colspan="16" class="separate">和值走势</th><th colspan="3" class="separate">号码形态</th>';
    var ths3 = '';
    for (var i = 3; i <= 18; i++) {
      ths3 += '<th' + (i === 3 ? ' class="separate"' : '') + '>' + i + '</th>';
    }
    ths3 += '<th class="num-type separate">对子</th><th class="num-type">豹子</th><th class="num-type">三不同</th>';

    if (settings.showDistri) {
      ths2 += '<th colspan="6" class="separate">号码分布</th>';
      for (var i = 1; i <= 6; i++) {
        ths3 += '<th' + (i === 1 ? ' class="separate"' : '') + '>' + i
            + '</th>';
      }
    }
    var thead = '<thead><tr>' + ths1 + ths2 + '</tr><tr>' + ths3
            + '</tr></thead>',
        tbody = '<tbody></tbody>',
        tfoot = '<tfoot><tr>' + ths1 + ths3 + '</tr><tr>' + ths2
            + '</tr></tfoot>';
    var container = $(settings.tableContainer).html(
        '<table class="trend-table" cellpadding="0" cellspacing="0">' + thead
        + tbody + tfoot + '</table>');

    var table = container.children('table');
    var tbody = table.children('tbody'), tr, num;
    var temp = response.bodyList.length % 5, bottomSeperate;
    $.each(response.bodyList, function (i, e) {
      bottomSeperate = (i - temp) % 5 === 0;
      tr = $('<tr data-issue="' + e.issue + '"' + (bottomSeperate
              ? ' class="separate"'
              : '') + '></tr>').append(
          '<td class="issue"><span  style="width: ' + settings.issueWidth
          + 'px; display: inline-block">' + e.issue + '</span></td>');
      var numCount = {};
      $.each(e.openNum, function (j, num) {
        tr.append('<td class="open-num"><span>' + num + '</span></td>');
        if (numCount[num] === undefined) {
          numCount[num] = 1;
        } else {
          numCount[num] += 1;
        }
      });
      for (var j = 9; j < 25; j++) {
        var sum = e.bodyArr[j];
        if (sum < 0) {
          tr.append('<td class="missing-count' + (j === 9 ? ' separate' : '')
              + '"><span>' + Math.abs(sum) + '</span></td>');
        } else {
          tr.append(
              '<td class="open-num' + (j === 9 ? ' separate' : '')
              + '"><span>'
              + sum + '</span></td>');
        }
      }
      for (var j = 6; j < 9; j++) {
        var type = e.bodyArr[j];
        if (type < 0) {
          tr.append(
              '<td class="jsk3-type missing-count' + (j === 6 ? ' separate'
                  : '')
              + '"><span>' + Math.abs(type) + '</span></td>');
        } else {
          tr.append(
              '<td class="jsk3-type open-num no-line' + (j === 6 ? ' separate'
                  : '')
              + '"><span>' + $.jsk3TypeDict[type] + '</span></td>');
        }
      }
      if (settings.showDistri) {
        for (var j = 0; j < 6; j++) {
          var num = e.bodyArr[j];
          if (num < 1) {
            tr.append('<td class="missing-count' + (j === 0 ? ' separate' : '')
                + '"><span>' + Math.abs(num) + '</span></td>');
          } else {
            var multiple = numCount[num] > 1;
            tr.append(
                '<td class="open-num-distri' + (j === 0 ? ' separate' : '')
                + (multiple ? ' multiple' : '')
                + '"><span>'
                + num + '</span></td>');
          }
        }
      }
      tbody.prepend(tr);
    });
    tbody.append(generateK3StasticTrs({
      items: [{
        cssClass: 'appear-count',
        name: '出现总次数',
        dataArr: response.appearCountArr
      }, {
        cssClass: 'missing-count-avg',
        name: '平均遗漏',
        dataArr: response.averageMissingArr
      }, {
        cssClass: 'missing-count-max',
        name: '最大遗漏',
        dataArr: response.maxMissingArr
      }, {
        cssClass: 'appear-count-max',
        name: '最大连出',
        dataArr: response.maxAppearArr
      }],
      showDistri: settings.showDistri
    }));
    var trs = tbody.children('tr:not(.sum)');
    var trsLength = trs.length;
    for (var i = 6; i < 25; i++) {
      var idx = i < 9 ? i + 14 : i - 5;
      var appear = Math.abs(response.appearCountArr[i]);
      var curMissing = response.currentMissingArr[i];
      if (appear >= 5) {
        trs.each(function (j, tr) {
          $(tr).children('td:eq(' + idx + ')').addClass('hot');
        });
      }
      if (curMissing < 0) {
        curMissing = Math.abs(curMissing);
        trs.each(function (j, tr) {
          if (trsLength - j <= curMissing) {
            $(tr).children('td:eq(' + idx + ')').addClass(
                'current-missing');
          }
        });
      }
    }
    container.css({width: 'auto'}).width(table.outerWidth());
    $.lineCanvas.attr('width', table.outerWidth());
    $.lineCanvas.attr('height', table.outerHeight());
    localCanvas();
    if ($('#toolbar input:checkbox[value="show-line"]').is(':checked')) {
      drawLines();
    }
  }

  function generateLotteryTrend(options) {
    $.loading();
    var settings = $.extend({
      dateOrRows: $.dateformat(new Date(), 'yyyy-MM-dd'),
      numRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      issueWidth: 120,
      digitRange: ['个位', '十位', '百位', '千位', '万位']
    }, options || {});
    settings.numCount = settings.numRange.length;
    settings.digitCount = settings.digitRange.length;
    settings.minNum = settings.numRange[0];
    $(settings.tableContainer).empty();
    clearLines();
    $.getJSON("/api/config/getOne?configName=system_config&configKey=analysis_api_url", function (response) {
  	  $.loaded();
  	  if (!response) {
      	  return;
      }
  	  var apiUrl = response.configValue + (settings.isJs ? '/js' : '') + '/anls-api/data/' + settings.gameCode + '/numTrend/' + settings.dateOrRows + '.do';
  	  $.getJSON(apiUrl, function (response) {
		  if (settings.gameType === 'k3') {
		    // 快三
		    generateK3Trend(response, settings);
		    $.loaded();
		    return;
		  }
		  initialLotteryTrend(settings);
		  loadLotteryTrend(response, settings);
		  localCanvas();
		  if ($('#toolbar input:checkbox[value="show-line"]').is(':checked')) {
		    drawLines();
		  }
		  $.loaded();
		}).error(function () {
		  $.loaded();
		});
    }).error(function () {
        $('.infos-table>tbody').__renderTbodyEmpty();
        $.loaded();
      });
  }

  function isJsonDateOrRows(target) {//最近三天，30,50,100	请求json数据
    if (target.length !== 10 && target) {
      return true;
    }

    var diffNum = DateDiff($.dateformat(new Date(), 'yyyy-MM-dd'), target);//相差天数;
    if (diffNum === 0 || diffNum === 1 || diffNum === 2) {
      return true;
    } else {
      return false;
    }
  }

  function localCanvas() {
    var table = $('#trend-container table');
    if (!table || table.length === 0) {
      return;
    }
    var offset = table.offset();
    $.lineCanvas.css({
      left: offset.left,
      top: offset.top
    });
    $.extend({
      lineCanvasLeft: offset.left,
      lineCanvasTop: offset.top
    })
  }

  function getDateOrRows(dateOrRowsLi) {
    if (!dateOrRowsLi) {
      dateOrRowsLi = $('#rows .active');
    }
    var dateOrRows = dateOrRowsLi.attr('data-rows');
    if (!dateOrRows) {
      var now = new Date();
      dateOrRows = parseInt(dateOrRowsLi.attr('data-date'));
      now.setDate(now.getDate() - dateOrRows);
      dateOrRows = $.dateformat(now, 'yyyy-MM-dd');
    }
    return dateOrRows;
  }

  function toggleShowLine(show) {
    if (show) {
      drawLines();
    } else {
      clearLines();
    }
  }

  function clearLines() {
    $.lineCanvasCtx.clearRect(0, 0, $.lineCanvas.attr('width'),
        $.lineCanvas.attr('height'));
  }

  function cal(ax, ay, bx, by, r) {
    var x = Math.abs(ax - bx), y = Math.abs(ay - by), z, fx, fy;
    z = Math.sqrt(x * x + y * y);
    fx = x / z * r;
    fy = y / z * r;
    return {
      x: fx,
      y: fy
    }
  }

  function drawLine(spanFrom, spanTo, odd) {
    var numFrom = parseInt(spanFrom.text()), numTo = parseInt(spanTo.text()),
        offsetFrom = spanFrom.offset(), offsetTo = spanTo.offset(),
        widthFrom = spanFrom.outerWidth(), widthTo = spanTo.outerWidth(),
        heightFrom = spanFrom.outerHeight(), heightTo = spanTo.outerHeight(),
        xFrom, yFrom, xTo, yTo, offset;
    if (numFrom === numTo) {
      xFrom = offsetFrom.left - $.lineCanvasLeft + widthFrom / 2;
      xTo = offsetTo.left - $.lineCanvasLeft + widthTo / 2;
      yFrom = offsetFrom.top - $.lineCanvasTop + heightFrom;
      yTo = offsetTo.top - $.lineCanvasTop;
    } else {
      xFrom = offsetFrom.left - $.lineCanvasLeft + widthFrom / 2;
      xTo = offsetTo.left - $.lineCanvasLeft + widthTo / 2;
      yFrom = offsetFrom.top - $.lineCanvasTop + heightFrom / 2;
      yTo = offsetTo.top - $.lineCanvasTop + heightTo / 2;
      offset = cal(xFrom, yFrom, xTo, yTo, widthFrom / 2);
      if (numFrom > numTo) {
        xFrom -= offset.x;
        yFrom += offset.y;
        xTo += offset.x;
        yTo -= offset.y;
      } else {
        xFrom += offset.x;
        yFrom += offset.y;
        xTo -= offset.x;
        yTo -= offset.y;
      }
    }
    $.lineCanvasCtx.beginPath();
    $.lineCanvasCtx.strokeStyle = odd ? $.strokeColorOdd : $.strokeColorEven;
    $.lineCanvasCtx.moveTo(xFrom, yFrom);
    $.lineCanvasCtx.lineTo(xTo, yTo);
    $.lineCanvasCtx.stroke();
    $.lineCanvasCtx.lineWidth = 2;
  }

  function drawLines() {
    var trs = $('#trend-container table>tbody>tr:not(.sum)'), nextSpans;
    var lastIndex = trs.length - 1;
    trs.each(function (i, tr) {
      if (i === lastIndex) {
        return;
      }
      nextSpans = $(trs.get(i + 1)).find('td.open-num:not(.no-line) span');
      $(tr).find('td.open-num:not(.no-line) span').each(function (j, span) {
        drawLine($(span), $(nextSpans.get(j)), j % 2 === 0);
      });
    });
  }

  function initializeTrendConfig() {
    var config = {};
    $.ajax({
      url: $.toFullPath('/data/json/official/config_trend.json'),
      async: false,
      dataType: 'json',
      method: 'GET',
      success: function (response) {
        config = response;
      }
    });
    $.extend({
      trendConfig: config
    });
  }

  function getTrendConfig(gameType) {
    return $.trendConfig[gameType];
  }

  $(function () {
    initializeTrendConfig();
    $.getJSON($.toFullPath('/data/json/games.json'), function (response) {
      var tabPanel;
      $.each(response, function (i, game) {
        if (game.open !== 0) {
          return;
        }
        tabPanel = $(
            '#game-tab-container>.tab-contents>.tab-panel[data-game-cate="-1"], #game-tab-container>.tab-contents>.tab-panel[data-game-cate="'
            + game.cate + '"]');
        tabPanel.append(
            $('<li class="link" data-game-id="' + game.id + '" data-game-code="'
                + game.code + '" data-game-official="' + (game.isOffcial === 1)
                + '" data-game-js="' + (game.jsType === 1)
                + '" data-game-type="' + game.type + '">' + game.name
                + '</li>').on('click', function (e) {
              var $this = $(this);
              if ($this.attr('data-game-official') === 'false' || $this.attr(
                      'data-game-type') === 'bjkl8') {
                return window.location.href = '/page/game-center/open-infos.html?officialMode=true&gameCode='
                    + $this.attr('data-game-code');
              }
              if ($this.hasClass('active')) {
                return;
              }
              $this.addClass('active').siblings('.active').removeClass(
                  'active');
              $this.parent().siblings().children('.active').removeClass(
                  'active');
              var gameCode = $this.attr('data-game-code'),
                  isJs = $this.attr('data-game-js') === 'true',
                  gameType = $this.attr('data-game-type');
              generateLotteryTrend(
                  $.extend({
                    gameCode: gameCode,
                    isJs: isJs,
                    gameType: gameType,
                    tableContainer: '#trend-container',
                    initialize: true,
                    dateOrRows: getDateOrRows()
                  }, getTrendConfig(gameType) || {}));
            }));
      });
      var gameCode = $.getQueryParameter('gameCode');
      var activeTabPanel;
      if (!gameCode === false) {
        activeTabPanel = $(
            ' #game-tab-container>.tab-contents>.tab-panel>li[data-game-code="'
            + gameCode + '"]:eq(0)').click().parent();
      }
      if (!gameCode || activeTabPanel.length === 0) {
        activeTabPanel = $(
            ' #game-tab-container>.tab-contents>.tab-panel>li:eq(0)').click().parent();
      }
      $('#game-tab-container>.tabs>li[data-game-cate="' + activeTabPanel.attr(
              'data-game-cate') + '"]').click();
    });
    $('#game-tab-container>.tabs>li').on('click', function (e) {
      var $this = $(this);
      if ($this.hasClass('active')) {
        return;
      }
      $this.addClass('active').siblings('.active').removeClass('active');
      $('#game-tab-container>.tab-contents>.tab-panel[data-game-cate="'
          + $this.attr('data-game-cate') + '"]').show().siblings(
          ':visible').hide();
      localCanvas();
    });
    $('#rows li').on('click', function (e) {
      var $this = $(this);
      if ($this.hasClass('active')) {
        return;
      }
      $this.addClass('active').siblings('.active').removeClass('active');
      var el = $('#game-tab-container .tab-contents li.active');
      var gameCode = el.attr('data-game-code'),
          isJs = el.attr('data-game-js') === 'true',
          gameType = el.attr('data-game-type');
      generateLotteryTrend(
          $.extend({
            gameCode: gameCode,
            isJs: isJs,
            gameType: gameType,
            tableContainer: '#trend-container',
            initialize: true,
            dateOrRows: getDateOrRows()
          }, getTrendConfig(gameType) || {}));
    });
    $('#toolbar input:checkbox').on('change', function (e) {
      var $this = $(this);
      var val = $this.val();
      var checked = $this.is(':checked');
      if (val === 'show-line') {
        toggleShowLine(checked);
      } else {
        $('#trend-container').toggleClass(val, checked);
      }
    });
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    $.extend({
      lineCanvas: $(canvas),
      lineCanvasCtx: ctx,
      strokeColorOdd: 'rgb(70, 150, 150)',
      strokeColorEven: 'rgb(220, 150, 150)'//'rgb(227, 13, 13)'
    });
    window.onresize = function (e) {
      localCanvas();
    };
  });
})(jQuery);