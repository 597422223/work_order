
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


	
	// 新增服务内容弹窗
		$('.newAddBespeak-pop .list-FastBilling').click(function(){
			$(this).toggleClass('list-border')
		})
	// 弹窗选中新增
		$('.newAddBespeakbtn').click(function(){
			// var service = $('.newAddBespeak-pop').find('.list-border');
			var pVal = $('.newAddBespeak-pop .list-border p');
			$('.newAddBespeak-pop').hide();
			$('.newAddBespeak-pop .list-border p').each(function(){
				var pText = $(this).text()
				var liText = '<li><span class="service-con">'+pText+'</span> <span class="book-blue delete-book">删除</span></li>' ;
				 $('.service-list ol').append(liText)	
			})
		})
	// 删除预约服务内容
		$(document).on("click",".delete-book",function(){
			$(this).parent('li').remove();
		})
  	
			

})
