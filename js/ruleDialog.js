var ruleDialog = function () {
    var defaultOptions = {
        title: '规则说明',
        content: '',
    };
    var dialogOption, showDialog = function (opt) {
        dialogOption = $.extend({}, defaultOptions, opt);
        if ($('#ruleDialog').length != 0) {
            $('#ruleDialogMask').remove();
            $('#ruleDialog').remove();
        }

        $('body').append('<div id="ruleDialogMask" tabindex="0" style="opacity: 0.7; background: rgb(0, 0, 0); position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; user-select: none; z-index: 1026;display: none;"></div>');
        $('body').append('<div id="ruleDialog" tabindex="-1" class="official-dialog" style="position: absolute; outline: 0px; left: 50%;margin-left: -425px; top: 50%;margin-top: -420px; z-index: 1027; "><div i="dialog" class="dialog-custom" style="width: 850px;height: 600px;"><table class="ui-dialog-grid"  style="width: 850px;height: 600px"><tbody><tr style="height: 40px;"><td i="header" class="ui-dialog-header"><button i="close" class="ui-dialog-close" title="取消">×</button><div i="title" class="ui-dialog-title">操作提示</div></td></tr><tr><td i="body" class="ui-dialog-body" style="padding: 00px;"><div i="content" style="height: 560px;text-align: left" class="ui-dialog-content"><span class="content">号码选择不完整，请重新选择</span></div></td></tr></tbody></table></div></div>')
        function cancelClick() {
            var canClose = true;
            if (canClose) {
                closeDialog();
            }
        }

        $('#ruleDialog .ui-dialog-close').on('click', cancelClick);
        $('#ruleDialog button[i-id=cancel]').on('click', cancelClick);
        $('#ruleDialog .ui-dialog-autofocus[i-id=ok]').on('click', function () {
            closeDialog();
        });

        if (dialogOption.showCancel) {
            $('#ruleDialog button[i-id=cancel]').show();
        } else {
            $('#ruleDialog button[i-id=cancel]').hide();
        }
        $('#ruleDialog .content').html(dialogOption.content);
        $('#ruleDialog .ui-dialog-title').html(dialogOption.title);
        $('#ruleDialog').show();
        $('#ruleDialogMask').show();
    }, closeDialog = function () {
        $('#ruleDialog').hide();
        $('#ruleDialogMask').hide();
    };
    return {
        show: showDialog,
        hide: closeDialog
    }
}();