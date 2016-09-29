	$(".tit-search-list input").focus(function(){
		$(this).siblings(".tit-search-xia").css("display","block");
	});
	$('.tit-search-list input').blur(function(){
		var self=this;
    	var hiddenColor=function (){
		$(self).siblings(".tit-search-xia").css("display","none");
    }
    setTimeout(hiddenColor,200);
  });
	