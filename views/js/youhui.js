/**
 * Created by tpd on 2017/7/28.
 */
$(function () {
    // 优惠 活动
    $(".activities-tr").bind('click', function () {
      var _this = $(this),
          _staus = _this.parent().find(".yHide-content").css('display');
      $('.yHide-content').slideUp(300)
      if (_staus == 'none') {
        _this.parent().find(".yHide-content").slideDown(300)
      }
      if (_staus == 'block') {
        _this.parent().find(".yHide-content").slideUp(300)
      }
    })
})
