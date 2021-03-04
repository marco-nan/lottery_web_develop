/**
 * Created by Zelei on 2017/4/21.
 */
/**
 * Created by Houlh on 2017/3/31.
 */
(function ($) {
  $.extend({
    getPrototype: function (object) {
      var prototype = Object.prototype.toString.call(object);
      return prototype.substring(8, prototype.length - 1);
    },
    isString: function (str) {
      return $.getPrototype(str) === 'String';
    },
    getAttr: function (object, path) {
      if (!object || !$.isString(path) || path.length === 0) {
        return undefined;
      }
      if (path.indexOf('.') === -1) {
        try {
          return object[path];
        } catch (e) {
          return undefined;
        }
      }
      var paths = path.split('.');
      var temp = object, i = 0, length = paths.length;
      try {
        while (!temp === false && i < length) {
          temp = temp[paths[i]];
          i++;
        }
        return temp;
      } catch (e) {
        return undefined
      }
    },
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
    fromFullPath: function (url) {
      var index = url.indexOf('?');
      url = url.substring(0, index);
      var protocol = $.getProtocolPrefix();
      if (url.indexOf(protocol) === -1) {
        return url;
      }
      return url.substring((protocol + window.location.host).length,
          url.length);
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
    },
    alert: function (context, title, message, callback, afterDispear, timeout) {
      var content = '';
      if (!title === false && !message === false) {
        content += '<strong class="p-r-md">' + title + '</strong>' + message;
      } else if (!title === false) {
        content += '<strong>' + title + '</strong>';
      } else if (!message === false) {
        content += message;
      }
      var margin = 5;
      var top = 75;
      $('[data-alert]').each(function (i, e) {
        top += margin + $(e).outerHeight();
      });
      var alert = $(
          '<div data-alert class="alert alert-' + context
          + ' alert-dismissible fade in alert-flopy hidden" role="alert">' +
          '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
          +
          '<span aria-hidden="true">&times;</span>' +
          '</button>' +
          content +
          '</div>').appendTo(document.body);
      var left = ($(document.body).width() - alert.width()) / 2;
      if (window.parent !== window) {
        left -= ($(window.parent.document.body).width() - $(
                document.body).width()) / 2;
      }
      alert.css({
        position: 'fixed',
        top: top + 'px',
        left: left
      }).removeClass('hidden');
      if (afterDispear === true) {
        setTimeout(function () {
          alert.remove();
          if ($.isFunction(callback)) {
            callback();
          }
        }, !timeout === false ? timeout : 1000);
      } else {
        if ($.isFunction(callback)) {
          callback();
        }
        setTimeout(function () {
          alert.remove();
        }, !timeout === false ? timeout : 1000);
      }
      return alert;
    },
    info: function (title, message, callback, afterDispear, timeout) {
      return $.alert('success', title, message, callback, afterDispear,
          timeout);
    },
    warn: function (title, message, callback, afterDispear, timeout) {
      return $.alert('danger', title, message, callback, afterDispear, timeout);
    },
    modal: function (options) {
      var settings = $.extend({
        size: '',
        title: '',
        content: '',
        cancelContext: 'secondary',
        cancelText: '关闭'
      }, options || {});
      var modal = $(
          '<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'
          +
          '<div class="modal-dialog modal-' + settings.size
          + '" role="document">' +
          '<div class="modal-content">' +
          '<div class="modal-header">' +
          '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
          +
          '<span aria-hidden="true">&times;</span>' +
          '</button>' +
          '<h4 class="modal-title" >' + settings.title + '</h4>' +
          '</div>' +
          '<div class="modal-body text-center">' + settings.content + '</div>' +
          '<div class="modal-footer">' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>').appendTo(document.body);
      var modalFooter = modal.find('.modal-footer');
      if ($.isArray(settings.extendActions)) {
        $.each(settings.extendActions, function (i, e) {
          var button = $(
              '<button type="' + (!e.type === false ? e.type : 'button')
              + '" class="btn btn-' + e.context + '">' + e.text + '</button>');
          if ($.isFunction(e.callback)) {
            button.on('click', function (event) {
              e.callback(modal, event);
            });
          }
          modalFooter.append(button);
        });
      }
      var button = $(
          '<button type="button" class="btn btn-' + settings.cancelContext
          + '" data-dismiss="modal">' + settings.cancelText + '</button>');
      modalFooter.append(button);
      if ($.isFunction(settings.cancelCallback)) {
        button.on('click', function (event) {
          settings.cancelCallback(modal, event);
        });
      }
      modal.on('hidden.bs.modal', function (event) {
        modal.remove();
      });
      return modal.modal('show');
    },
    confirm: function (options) {
      var settings = $.extend({
        size: '',
        title: '',
        content: '',
        confirmContext: 'primary',
        confirmText: '确定',
        cancelContext: 'secondary',
        cancelText: '关闭'
      }, options || {});
      return $.modal({
        size: settings.size,
        title: settings.title,
        content: settings.content,
        cancelContext: settings.cancelContext,
        cancelText: settings.cancelText,
        cancelCallback: settings.onDenied,
        extendActions: [{
          context: settings.confirmContext,
          text: settings.confirmText,
          callback: settings.onConfirmed
        }]
      });
    },
    errorPlacement: function (error, element) {
      if (element.is(':checkbox') || element.is(':radio')
          || element.parent().is('.input-group')) {
        error.appendTo(element.parent().parent());
      } else {
        error.insertAfter(element);
      }
    },
    errorHandlerBase: function (xhr, errorText, errorType) {
      var responseText = xhr.responseText;
      try {
        responseText = $.parseJSON(responseText);
      } catch (e) {
      }
      $.loaded();
      if (responseText.code === 'UC/TOKEN_INVALID') {
        $.modal({
          title: '请求失败',
          content: $.isString(responseText) ? responseText : responseText.msg,
          cancelCallback: function (modal, event) {
            var target = !window.parent === false && window.parent !== window ? window.parent : window;
            target.location.href = $.toFullPath('/views/main.html');
          }
        });
      } else {
        var message;
        if (xhr.status === 404) {
          message = '资源不存在';
        } else {
          message = $.isString(responseText) ? responseText : responseText.msg;
        }
        $.warn('请求失败！', message);
      }
    },
    errorHandler: function (_xhr, errorText, errorType) {
      if ($.isFunction(_xhr)) {
        return function (xhr, errorText, errorType) {
          $.errorHandlerBase(xhr, errorText, errorType);
          _xhr(xhr, errorText, errorType);
        }
      }
      $.errorHandlerBase(_xhr, errorText, errorType);
    },
    getUrlParam: function (name) {
      if (!name) {
        return null;
      }
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');//构造一个含有目标参数的正则表达式对象
      var r = decodeURI(window.location.search.substr(1)).match(reg);//匹配目标参数
      return r != null ? r[2] : null;//返回参数值
    },
    toFixed: function (number, digits) {
      if (!number) {
        return 0;
      }
      if (!digits) {
        digits = 4;
      }
      return parseFloat(number.toFixed(digits));
    }
  });
  $.fn.extend({
    serializeObject: function () {
      var object = {};
      var array = this.serializeArray();
      for (var i = 0; i < array.length; i++) {
        var item = array[i];
        object[item.name] = item.value;
      }
      return object;
    },
    onEnter: function (handler) {
      this.on('keydown', function (e) {
        if (e.which === 13) {
          handler(e);
        }
      });
    }
  });
})(jQuery)