(function() {
      "use strict";
  var exclusive = {
      js_ver          : '',
      exclusive_type  : '1',         //文字  圖文  dialog
      promotions_type : 'Y',
      ExclusiveNo     : '', // 優惠傳值，開指定序號
      showevents      : [] ,                           // 目前顯示的優惠 (dialog 使用)
      dialog_width    : '',           //dialog內容-寬度
      

      init : function () {
          var _self = this;

          //滑入滑出opacity效果
          $('#MemberExclusive_area .memExclusive a, #ele-mem-exclusive-dialog-area .eventcontent-dialog a').css('opacity', 0).on({
              mouseenter: function(){
                  $(this).stop().animate({'opacity': 1}, 650);
              },
              mouseleave: function(){
                  $(this).stop().animate({'opacity': 0}, 650);
              }
          });
          
          switch(_self.exclusive_type) { 
              case "2": 
                  _self.exclusive_dialog_init();
                  break; 
              case "1": 
                  _self.exclusive_expand_init();
                  break; 
              default: 
                  break; 
          } 
          
          // 優惠類別
          if (_self.promotions_type === 'Y') {
              _self.promotions_type_init();
          }
          
          // 優惠傳值，開指定序號
          if (_self.ExclusiveNo) {
              $(window).load(function(){
                _self.open_num();
              });
          }
          
      },

      /**
       * 優惠頁籤開啟 - 此為預設，每個優惠顯示樣式會做覆蓋動作
       */
      open_num : function () { },
      
      
      /**
       * 優惠展開 設定
       */
      exclusive_expand_init : function(){
          var _self = this;
            var lang = 0;
            var oneheight = 0;
          //優惠活動展開
          $('#MemberExclusive_area').on('click.targetP', '.memExclusive', function(e) {
              e.preventDefault();

              $('#MemberExclusive_area .eventtext').not(':hidden').not($(this).next()).css('display','none');
                
              $(this).next().slideToggle();
          });
          
          _self.open_num = function () {
              $('#memExclusive_' + _self.ExclusiveNo, $('#MemberExclusive_area') ).siblings('.eventtext').show();
          }
      },
      /**
       * 優惠dialog 設定
       */
      exclusive_dialog_init : function(){
          var _self = this,
              count = 0,
              loc = "",
              winbox = $('#js-mem-exclusive-box'),
              data = "";
         
          
          $('body').after("<div id=\"js-mem-exclusive-box\" class=\"promotion-style\" style=\"overflow:visible\"><div id=\"js-mem-exclusive-box-up\"></div><div id=\"js-mem-exclusive-box-down\"></div><div id=\"js-mem-exclusive-box-content\" style=\"width:"+_self.dialog_width+"px;\"></div></div>");

          winbox = $('#js-mem-exclusive-box');
          
          //卷軸套件
          winbox.find("#js-mem-exclusive-box-content").mCustomScrollbar({theme:"minimal-dark", scrollInertia:300,mouseWheel:{ preventDefault: true }});
          
          var winboxObj = {
              up   : winbox.find("#js-mem-exclusive-box-up"),
              down : winbox.find("#js-mem-exclusive-box-down"),
              content : (winbox.find("#js-mem-exclusive-box-content").find(".mCSB_container").length === 1 ?
                          winbox.find("#js-mem-exclusive-box-content").find(".mCSB_container"):
                          winbox.find("#js-mem-exclusive-box-content")
                        )
          };
          
          /**
           * dialog 效果
           */
          var do_exclusive_dialog = function(obj){
              var _win_height;
              data = _self.showevents;
              count = data.length;
              loc = $.inArray($(obj).prop("id"), data);
              
              if (count == 1) {
                  winboxObj.up.hide();
                  winboxObj.down.hide();
              } else {
                  winboxObj.up.show();
                  winboxObj.down.show();
              }
              winboxObj.content.empty();
              var title = ( typeof($(obj).next().data("title")) !== "undefined" ? 
                            $(obj).next().data("title") :"&nbsp");

              if (count === 0) {
                  winboxObj.content.html('');
                  return;
              }
              
              _win_height = win_height($(obj).next());
              winboxObj.up.css('top', _win_height.icon_height);
              winboxObj.down.css('top', _win_height.icon_height);

              var setting = {
                  title : title,
                  modal: true,
                  resizable: false,
                  width: _self.dialog_width - 0 + 32,
                  height: _win_height.height,
                  minHeight: _win_height.height,
                  draggable: 1,
                  dialogClass : "exclusive-dialog-style"
              };
              
              winbox.dialog(setting);
              winboxObj.content.html($(obj).next().html());

              change_dialog_set();

              //overlay opacity
              $(".ui-widget-overlay").css("opacity","0.3");
          };
          
          var change_dialog_set = function () {

              //dialog視窗位置
              var _dialog_width = ( ($('#mainBody').length > 0 && $('#mainBody').width() > $(window).width())
                  ? $('#mainBody').width() : $(window).width() );
              winbox.parents(".ui-dialog").css("left", Math.floor((_dialog_width - winbox.parents(".ui-dialog").width())/2));

              //遮罩寬度
              $('.ui-widget-overlay').width(_dialog_width);
          };

          $(window).resize(change_dialog_set);

          var win_height = function (item) {
              var window_height = $(window).height() * 0.8,
                  obj_height = item.height(),
                  height = ( (obj_height > window_height) ? window_height : obj_height),
                  icon_height = ( (height - winboxObj.up.height())/2 - 15 );

              return {
                  height : height + 65,
                  icon_height : ( icon_height < 0 ? 0 : icon_height)
              }
          }
          
          $("#ele-mem-exclusive-dialog-area").fadeIn( "slow" );
          
          $(".js-mem-exclusive-dialog").each(function(){
              _self.showevents.push($(this).children(".eventcontent-dialog").prop("id"));
          }); 
          
          //優惠活動,dialog效果
          $('#ele-mem-exclusive-dialog-area').on('click', '.eventcontent-dialog', function(e) {
              do_exclusive_dialog($(this));
              
          });
          
          //左右鍵 滑入滑出效果
          winbox.on({
              mouseenter: function(){
                
                  winboxObj.up.stop().animate({'opacity': .8});
                  winboxObj.down.stop().animate({'opacity': .8});
                  
              },
              mouseleave: function(){
                
                  winboxObj.up.stop().animate({'opacity': 0});
                  winboxObj.down.stop().animate({'opacity': 0});
                  
              }
          });
          //上一則
          winboxObj.up.on("click",function(){
              loc --;
              if (loc<0) {
                  loc = count-1 ; 
              }
              var title = ( typeof($("#"+data[loc]).next().data("title")) !== "undefined" ? 
                            $("#"+data[loc]).next().data("title") : "&nbsp"),
                  _win_height;
              $("#ui-dialog-title-js-mem-exclusive-box").html(title);

              _win_height = win_height($("#"+data[loc]).next());
              winboxObj.up.css('top', _win_height.icon_height);
              winboxObj.down.css('top', _win_height.icon_height);
              winbox.dialog({
                  height: _win_height.height,
                  minHeight: _win_height.height
              });

              winboxObj.content.html($("#"+data[loc]).next().html());
              
              //dialog視窗位置
              var _dialog_height = ($(window).height() - winbox.parents(".ui-dialog").height()),
                  dialog_height = ( (_dialog_height < 0) ? $(window).scrollTop() :
                  Math.floor(_dialog_height/2)+$(window).scrollTop() );
              winbox.parents(".ui-dialog").css("top",dialog_height);
              
          });
          
          //下一則
          winboxObj.down.on("click",function(){
              loc ++;
              if (loc > count-1) {
                  loc = 0 ;
              }
              var title = ( typeof($("#"+data[loc]).next().data("title")) !== "undefined" ? 
                            $("#"+data[loc]).next().data("title") : "&nbsp"),
                  _win_height;
              $("#ui-dialog-title-js-mem-exclusive-box").html(title);

              _win_height = win_height($("#"+data[loc]).next());
              winboxObj.up.css('top', _win_height.icon_height);
              winboxObj.down.css('top', _win_height.icon_height);
              winbox.dialog({
                  height: _win_height.height,
                  minHeight: _win_height.height
              });

              winboxObj.content.html($("#"+data[loc]).next().html());
              
              //dialog視窗位置
              var _dialog_height = ($(window).height() - winbox.parents(".ui-dialog").height()),
                  dialog_height = ( (_dialog_height < 0) ? $(window).scrollTop() :
                  Math.floor(_dialog_height/2)+$(window).scrollTop() );
              winbox.parents(".ui-dialog").css("top",dialog_height);
          });
          
          _self.open_num = function () {
              if($('#eventcontent-dialog-' + _self.ExclusiveNo).length){
                  do_exclusive_dialog($('#eventcontent-dialog-' + _self.ExclusiveNo));
              }
          }
      },
      
      /**
       * 優惠項目分類
       */
      promotions_type_init : function(){
          var _self = this;
          var pt = {
              showType: $("#PT-switcher-wrap .mtab").prop("id"),
              type_btn: $("#PT-switcher-wrap > li"),  //所有分類按鈕
              events: $("#MemberExclusive_area > div, #ele-mem-exclusive-dialog-area > div"),  //所有優惠項目
              totalTypes: [],  //所有優惠項目分類集合
              existBtns: [],  //應顯示之優惠項目     
          }
          
          $('.mtab-menual').show();

          //取得所有優惠項目所有分類
          pt.events.each(function() {
              var all_types = $(this).data("type").split(",");
              pt.totalTypes = pt.totalTypes.concat(all_types);
          });
          
          //過濾重複分類
          for(var i = pt.totalTypes.length; i--;) {
              var val = pt.totalTypes[i];
              if ($.inArray(val, pt.existBtns) === -1) {
                  pt.existBtns.unshift(val);
              }
          }
          
          //無該分類項目之 tab 移除
          pt.type_btn.each(function() {
              if($.inArray(this.id, pt.existBtns) === -1) {
                  $(this).remove();
              }
          });
          
          //update value
          pt.type_btn = $("#PT-switcher-wrap > li");
          if(pt.type_btn.length <= 1) {
              $("#PT-switcher-wrap").remove();
              pt.events.show();
              //_self.getHeight(0,0);
          } else {
              //點擊分類
              pt.type_btn.click(function() {
                  var clickType = this;
                  _self.showevents = [];
                  if(!$(this).hasClass("mtab")) {
                      $(".mtab").removeClass("mtab");
                      $(this).addClass("mtab");
                  }
                  pt.events.each(function() {
                      var reg = new RegExp(clickType.id, "g");
                      if(reg.test($(this).data("type")) === true) {
                          $(this).fadeIn( "slow" ).css('display','inline-block').find(".eventtext").hide();
                          if(_self.exclusive_type ==='2'){
                              _self.showevents.push($(this).children(".eventcontent-dialog").prop("id"));
                          }
                      } else {
                          $(this).hide().find(".eventtext").hide();
                      }
                  });
                //_self.getHeight(0,0);
              });
              
              //顯示當前類別
              $("#" + pt.showType).trigger('click'); 
          }
      }
  };

  //開始
  exclusive.init();
  })();