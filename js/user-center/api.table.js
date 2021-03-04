/**
 * Created by Zelei on 2017/4/22.
 */
(function ($) {
  $.fn.extend({
    renderEmptyTbody: function (emptyText, headerLength, cssClass) {
      if (!emptyText) {
        emptyText = '暂无记录';
      }
      if (!cssClass) {
        cssClass = '';
      }
      return $(this).html(
          '<tr class="' + cssClass + '"><td colspan="' + headerLength
          + '" class="text-center p-y-md">' + emptyText + '</td></tr>');
    },
    renderTbody: function (items, keys, options) {
    	var settings = $.extend({
    		emptyText: '暂无记录',
    		cssClass: ''
    	}, options || {});
    	
    	return $(this).each(function (i, e) {
    		e.getCssClass = function (row, item) {
    			return $.isFunction(settings.cssClass) ? settings.cssClass(row, item)
    					: settings.cssClass;
    		}
	        if (!$.isArray(items) || items.length === 0) {
	        	$(e).renderEmptyTbody(settings.emptyText, keys.length,e.getCssClass());
	        	return;
	        }
	        $(e).empty();
	        $.each(items, function (row, item) {
	        	if ($.isFunction(settings.preHandler)) {
	        		settings.preHandler(item, row);
	        	}
	        	var tr = '<tr class="' + e.getCssClass(row, item) + '">';
	        	$.each(keys, function (idx, key) {
	        		var val = item[key];
		            if (val === undefined || val === null) {
		              val = '';
		            }
		            tr += '<td>' + val + '</td>';
	        	});
	        	tr += '</tr>';
	        	$(e).append(tr);
	        });
    	});
    },
    setColWidth:function(col,width){
    	$(this).children('tr').each(function(i,tr){
    		var td =  $(tr).children('td:eq('+col+')').css({
    			'max-width':width+"px",
    			'word-wrap': 'break-word'
    		});
    	});
    	return $(this);
    },
    pagination: function (totalRecords, options) {
      if (!totalRecords || totalRecords <= 0) {
        return $(this).empty();
      }
      var settings = $.extend({
        pageNoZeroBase: false,
        pageNo: 1,
        pageSize: 10,
        rangeCount: 8,
        cssClass: 'pagination-sm pull-right'
      }, options || {});
      var totalPages = Math.ceil(totalRecords / settings.pageSize);
      var rangeStart;
      var rangeEnd;
      var _pageNo = settings.pageNoZeroBase ? settings.pageNo + 1
          : settings.pageNo;
      if (totalPages <= settings.rangeCount) {
        rangeStart = 1;
        rangeEnd = totalPages;
      } else {
        var leftCount = Math.floor((settings.rangeCount - 1) / 2);
        var rightCount = Math.ceil((settings.rangeCount - 1) / 2);
        if (_pageNo - leftCount < 1) {
          rangeStart = 1;
          rangeEnd = rangeStart + settings.rangeCount - 1;
        } else if (_pageNo + rightCount > totalPages) {
          rangeEnd = totalPages;
          rangeStart = rangeEnd - settings.rangeCount + 1;
        } else {
          rangeStart = _pageNo - leftCount;
          rangeEnd = _pageNo + rightCount;

        }
      }
      var html = '<nav>' +
          '<ul class="pagination ' + settings.cssClass + '">' +
          '<li data-previous data-first>' +
          '<a href="javascript:void(0);" aria-label="First">' +
          '<span aria-hidden="true">&laquo;</span>' +
          '</a>' +
          '</li>' +
          '<li data-previous>' +
          '<a href="javascript:void(0);" aria-label="Previous">' +
          '<span aria-hidden="true">‹</span>' +
          '</a>' +
          '</li>';
      for (var i = rangeStart; i <= rangeEnd; i++) {
        if (i === _pageNo) {
          html += '<li class="active"><a href="javascript:void(0);">' + i
              + '</a></li>'
        } else {
          html += '<li><a href="#">' + i + '</a></li>'
        }
      }
      html +=
          '<li data-next>' +
          '<a href="javascript:void(0);" aria-label="Next">' +
          '<span aria-hidden="true">›</span>' +
          '</a>' +
          '</li>' +
          '<li data-next data-last>' +
          '<a href="javascript:void(0);" aria-label="Last">' +
          '<span aria-hidden="true">&raquo;</span>' +
          '</a>' +
          '</li>' +
          '</ul>' +
          '</nav>';
      return $(this).each(function (i, e) {
        e.checkStatus = function () {
          var p = parseInt($(this).find('ul>li.active>a').text());
          var previous = $(this).find('ul>li[data-previous]');
          var next = $(this).find('ul>li[data-next]');
          if (p === 1 && !previous.hasClass('disabled')) {
            previous.addClass('disabled');
          }
          if (p === totalPages && !next.hasClass('disabled')) {
            next.addClass('disabled');
          }
        }
        var nav = $(html);
        nav.find('li:not([data-previous]):not([data-next])').on('click',
            function (event) {
              if ($(this).hasClass('active')) {
                return;
              }
              $(this).addClass('active').siblings('.active').removeClass(
                  'active');
              e.checkStatus();
              if ($.isFunction(settings.callback)) {
                var p = parseInt($(this).children('a').text());
                settings.callback(settings.pageNoZeroBase ? p - 1 : p);
              }
            });
        nav.find('li[data-previous]').on('click', function (event) {
          if ($(this).hasClass('disabled')) {
            return;
          }
          var cur = nav.find('li.active');
          cur.removeClass('active');
          var active;
          var p;
          if ($(this).is('[data-first]')) {
            active = nav.find('li:not([data-previous]):not([data-next]):first');
            p = settings.pageNoZeroBase ? 0 : 1;
          } else {
            active = nav.find(
                'li:not([data-previous]):not([data-next]):eq(' + (cur.index()
                - 1) + ')');
            p = settings.pageNoZeroBase ? parseInt(cur.children('a').text()) - 2
                : parseInt(cur.children('a').text()) - 1;
          }
          active.addClass('active');
          e.checkStatus();
          if ($.isFunction(settings.callback)) {
            settings.callback(p);
          }
        });
        nav.find('li[data-next]').on('click', function (event) {
          if ($(this).hasClass('disabled')) {
            return;
          }
          var cur = nav.find('li.active');
          cur.removeClass('active');
          var active;
          var p;
          if ($(this).is('[data-last]')) {
            active = nav.find('li:not([data-previous]):not([data-next]):last');
            p = settings.pageNoZeroBase ? totalPages - 1 : totalPages;
          } else {
            active = nav.find(
                'li:not([data-previous]):not([data-next]):eq(' + (cur.index()
                + 1) + ')');
            p = settings.pageNoZeroBase ? parseInt(cur.children('a').text()) + 2
                : parseInt(cur.children('a').text()) + 1;
          }
          active.addClass('active');
          e.checkStatus();
          if ($.isFunction(settings.callback)) {
            settings.callback(p);
          }
        });
        $(e).html(nav);
        e.checkStatus();
      });
    }
  });
})(jQuery)