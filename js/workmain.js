
// document.write('<script src="common/config.js"><\/script>');

$(function(){


// 新增预约服务弹窗
	// 预约
	$(".qx-book").click(function(){
			$(".qx-book-pop").css("display","block");
		});
	$(".qx-book-false").click(function(){
		$(".qx-book-pop").css("display","none");
	});
	//转出弹窗
	$(".zc-book").click(function(){
			$(".zc-book-pop").css("display","block");
		});
	$(".qx-book-false").click(function(){
		$(".zc-book-pop").css("display","none");
	});
	// 添加预约
	$('.add-book').click(function(){
		$('.newAddBespeak-pop').show()
	})
	$('.mask').click(function(){
		$('.newAddBespeak-pop').hide();
	})
	$('.ctr-off').click(function(){
		$('.newAddBespeak-pop').hide();
	})


})
//