//右下角弹窗
var popTips = function(opt){
    this.init(opt);
};

$.extend(popTips.prototype, {
    init: function(opt){
        this.body = $('body');
        this.obj = null;
        this._opt = $.extend({
            show: false,
            str: '',
            id : ''
        }, opt);
        this.bind();
    },
    bind: function(){
        this._add();
        this._close();
    },
    _add: function(){
        var template = '<div class="pop-btm-tips">\
                            <h3 class="pop-btm-tips-hd">提示</h3>\
                            <div class="pop-btm-tips-bd">';
            template += this._opt.str;
            template += '</div>\
                        <a href="javascript:;" class="btn-popbtm-close">&times;</a>\
                    </div>';
        this.obj = $(template);
        this.obj.attr('id',this._opt.id);
        this.body.append(this.obj);
        this._opt.show && this.show();
    },
    _close: function(){
        var _this = this;
        this.obj.on('click','.btn-popbtm-close',function(){
            _this.hide();
        })
    },
    //显示
    show: function(){
        this.obj.slideDown();
    },
    //隐藏
    hide: function(){
        var _this = this;
        this.obj.slideUp(function(){
            _this.obj.remove();
        });
    }
});

