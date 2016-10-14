
// document.write('<script src="common/config.js"><\/script>');

$(function(){

// 新增预约服务弹窗
	// 预约
	$(".qx-book").click(function(){
			$(".qx-book-pop").css("display","block");
		});
	$('.qx-book-ture').click(function(){
		$('.service-list li').remove()
		$(".qx-book-pop").hide();
		$('.book-time-controlClose').hide()
	})
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

	// 点击变红选中
		$(document).on("click",'.newAddBespeak_con>div',function(){
			$(this).toggleClass('list-border');
		})
	
	
	
	
	// 删除预约服务内容
		$(document).on("click",".delete-book",function(){
			$(this).parent('li').remove();
		})	 

})
