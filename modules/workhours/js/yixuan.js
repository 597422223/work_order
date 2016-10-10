	$(".tit-search-list input").keyup(function(){
		$(this).siblings(".tit-search-xia").css("display","block");
	});
	$('.tit-search-list input').blur(function(){
		var self=this;
    	var hiddenColor=function (){
		$(self).siblings(".tit-search-xia").css("display","none");
    }
    	setTimeout(hiddenColor,200);
	});
	
	$(document).on("click",".tit-search-xia li",function(){
		$(this).parent().prev().val($.trim($(this).html()));
	});
  $(".tit-search-xia li").click(function(){
  	   $(this).parent().prev().val($(this).text());
  })
	$(document).on("click",".overtime-shanchu",function(){
		$(this).parent().css("display","none");
	});
