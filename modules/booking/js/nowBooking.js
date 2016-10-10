
// document.write('<script src="common/config.js"><\/script>');

$(function(){

// 新增预约服务弹窗
	// 预约
	$(".qx-book").click(function(){
			$(".qx-book-pop").css("display","block");
		});
	$('.qx-book-ture').click(function(){
		$('.service-list li').remove()
		$(".qx-book-pop").css("display","none");
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
	
	
<<<<<<< HEAD
	
	
=======
	// 弹窗选中新增
		$('.newAddBespeakbtn').click(function(){

			$('.newAddBespeak-pop').hide();//弹窗隐藏

				// 获取选中服务项目
				var pVal = $('.newAddBespeak-pop .list-border p');
				var nowObj={}
				var jsonArr =[]
				pVal.each(function(index){
					// 获取选中的项目名称和id
					var pText = $(this).text();
					var idText = $(this).attr('id')

					/*[{}]数组对象*/
						nowObj[index]={
							projectID:idText,
							projectName:pText
						}
					jsonArr[index]=nowObj[index]//将对象添加到数组
				})

				// console.log(jsonArr)
				// 删除页面已有
				$('.service-con').each(function(){
					var pText = $(this).text();
					$('.service-list li').has('.service-con').text(pText).remove()
				})
				// 重新添加对象 服务内容到页面
				$(jsonArr).each(function(index){
					// console.log(jsonArr[index].projectID)
					var liText = '<li><span class="service-con" id='+jsonArr[index].projectID+'>'+jsonArr[index].projectName+'</span> <span class="book-blue delete-book">删除</span></li>' 
						$('.service-list ol').append(liText)
				})
				$(jsonArr).each(function(index){
					var a = jsonArr[index].projectName;
					$('.workvalue').css('background','red')
					$('.workvalue').val(a)
					console.log(a)
				})
		})
	// 确认转出跳转页面 获取数据
		// $('.qx-book-ture').click(function(){
		// 	var spVal = $('.service-con');
		// 	var nowObj={}
		// 	var jsonArr =[]
		// 	spVal.each(function(index){
		// 		// 获取选中的项目名称和id
		// 		var pText = $(this).text();
		// 		var idText = $(this).attr('id')

		// 		/*[{}]数组对象*/
		// 			nowObj[index]={
		// 				projectID:idText,
		// 				projectName:pText
		// 			}
		// 		jsonArr[index]=nowObj[index]//将对象添加到数组
		// 	})
		// })
>>>>>>> 0f9cd0c5c73b91d15de971cb6cea89a1ed3e5a66
	// 删除预约服务内容
		$(document).on("click",".delete-book",function(){
			$(this).parent('li').remove();
		})	 

})
