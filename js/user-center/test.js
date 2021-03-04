(function($){
	$(function(){
		
		var time = 0, menuBox = $('#game-center-games');
        $("#gameListBtn,#game-center-games").hover(function () {
            menuBox.stop(true,true).slideDown(300);
            clearTimeout(time);
        }, function () {
            time = setTimeout(function () {
                menuBox.stop().slideUp(100);
            }, 300);
        })
        
        test();
        
	})
	
	function test(){

	}
	
	$.extend({
		getPrototype:function(obj){
			var prototype = Object.prototype.toString.call(obj)
			return prototype.substring(8,prototype.length-1);
		},
		isString:function(obj){
			return $.getPrototype(obj)==="String";
		},
		toFullPath:function(url){
			if(url.indexOf("http://")===-1){
				return "http://" + window.location.host + url;
			}
			return url;
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

	
})(jQuery)