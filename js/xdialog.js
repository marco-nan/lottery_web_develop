var xdialog = function () {
    var defaultOptions = {
        title: '操作提示',
        content: '',
        showCancel: false,
        okName:'',
        cancelClick: function () {},
        okClick: function () {}
    };
    var dialogOption, showDialog = function (opt) {
        dialogOption = $.extend({}, defaultOptions, opt);
        if(!opt.okName){
            dialogOption.okName = "确定"
        }
        if ($('#officialDialog').length === 0) {
            $('body').append('<div id="officialDialogMask" tabindex="0" style="opacity: 0.7; background: rgb(0, 0, 0); position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; user-select: none; z-index: 1026;display: none;"></div>');
            $('body').append('<div id="officialDialog" tabindex="-1" class="official-dialog" style="position: absolute; outline: 0px; left: 0; top: 0; z-index: 1027;"><div i="dialog" class="dialog-custom"><table class="ui-dialog-grid"><tbody><tr><td i="header" class="ui-dialog-header"><button i="close" class="ui-dialog-close" title="取消">×</button><div i="title" class="ui-dialog-title">操作提示</div></td></tr><tr><td i="body" class="ui-dialog-body" style="padding: 12px 30px;"><div i="content" class="ui-dialog-content"><span class="content">号码选择不完整，请重新选择</span></div></td></tr><tr><td i="footer" class="ui-dialog-footer"><div i="button" class="ui-dialog-button"><button type="button" i-id="ok" autofocus="" class="ui-dialog-autofocus">确定</button><button type="button" i-id="cancel">取消</button></div></td></tr></tbody></table></div></div>')
            function cancelClick() {
                var canClose = true;
                if (dialogOption.cancelClick) {
                    canClose = dialogOption.cancelClick(dialogOption) || true;
                }
                if (canClose) {
                    closeDialog();
                }
            }
            $('#officialDialog .ui-dialog-close').on('click', cancelClick);
            $('#officialDialog button[i-id=cancel]').on('click', cancelClick);
            $('#officialDialog .ui-dialog-autofocus[i-id=ok]').on('click', function () {
                closeDialog();
                if (dialogOption.okClick) {
                    dialogOption.okClick(dialogOption);
                }
            });
        }
        if(dialogOption.okName){
            $('#officialDialog .ui-dialog-autofocus[i-id=ok]').html(dialogOption.okName)
        }
        if (dialogOption.showCancel) {
            $('#officialDialog button[i-id=cancel]').show();
        } else {
            $('#officialDialog button[i-id=cancel]').hide();
        }
        $('#officialDialog .content').html(dialogOption.content);
        $('#officialDialog .ui-dialog-title').html(dialogOption.title);
        $('#officialDialog').css({
            top: document.body.scrollTop + window.innerHeight / 2 - $('#officialDialog').height() / 2,
            left: document.body.scrollLeft + window.innerWidth / 2 - $('#officialDialog').width() / 2
        })
        $('#officialDialog').show();
        $('#officialDialogMask').show();
    }, closeDialog = function() {
        $('#officialDialog').hide();
        $('#officialDialogMask').hide();
    };
    return {
        show: showDialog,
        hide: closeDialog
    }
}();