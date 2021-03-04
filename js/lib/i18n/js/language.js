var LANGUAGE_Index = "zh_CN"; //标识语言
jQuery(document).ready(function () {
    console.log(11111)
    // LANGUAGE_Index = jQuery.i18n.normaliseLanguageCode({}); //获取浏览器的语言
    // loadProperties(LANGUAGE_Index);
});

$(".lang .lang-item").click(function () {
    console.log(11111)
    let currentLange = this.innerHTML;
    $(".lang>span").html(currentLange);
    if(currentLange === 'English') {
        LANGUAGE_Index = "en";
    } else {
        LANGUAGE_Index = "zh";
    }

    loadProperties(LANGUAGE_Index);

});


function loadProperties(type) {
    console.log(22222222)

    jQuery.i18n.properties({
        name: 'strings', // 资源文件名称
        path: 'js/', // 资源文件所在目录路径
        mode: 'map', // 模式：变量或 Map
        language: type, // 对应的语言
        callback: function () { // 回调方法
            console.log($.i18n.prop('username'))
            $('.sub_anniu').html($.i18n.prop('username'));
            // $('.reg_anniu').html($.i18n.prop('reg_anniu'));
        }
    });
}