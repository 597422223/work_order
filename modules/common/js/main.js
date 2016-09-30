
/*************************/ 
// 时间插件不起作用
// 路径
/**********************/ 
$(function(){
	//9-21修改 自动填写进场时间为当前
	 function today(){//构建方法
        var today=new Date();//new 出当前时间
        var h=today.getFullYear();//获取年
        var m=today.getMonth()+1;//获取月
        var d=today.getDate();//获取日
        var H = today.getHours();//获取时
        var M = today.getMinutes();//获取分
        var S = today.getSeconds();//获取秒
        return h+"-"+m+"-"+d; //返回 年-月-日 时:分:秒
	}
	
	$('.today').val(today())
	//将获取到的 年-月-日 时:分:秒 赋给input文本输入框


	//车架号验证
	$('.list-carNo input').blur(function(){
	    var req=/[a-zA-Z0-9]{17}/; 
	    var val=$('.list-carNo input').val();
	    $(this).css("text-transform","uppercase");
	    if(!req.test(val)){
	      $(this).css({"border":"1px solid red","color":"red"})                           
	    }else{
	      $(this).css({"border":"1px solid #d8d8d8","color":"#555"})
	    }
	})

	// 车辆颜色
	  $('.listjs input').focus(function(){
	    $(".colorjs").css("display","block")
	  });
	  
	  $('.listjs input').blur(function(){
	    var hiddenColor=function (){
	      $(".colorjs").css("display","none")
	    }
	    setTimeout(hiddenColor,200)
	  });
	  $(document).on('click','.colorjs li',function(){
	    $('.listjs input').val($(this).text());
	    $(".colorjs").css("display","none")
	  });
	  //保险公司选择
	  	$(".list-company input").focus(function(){
	  		$(this).siblings(".list-company-lists").css("display","block");
	  	});
	  	$('.list-company input').blur(function(){
	  		var self=this;
	      	var hiddenColor=function (){
	  		$(self).siblings(".list-company-lists").css("display","none");
	      }
	      setTimeout(hiddenColor,200);
	    });
	    $(document).on('click','.list-company-lists li',function(){
	  	  $(this).parent().prev().val($(this).text());
	  	  $(this).parent().css("display","none");
	  	});

		  //险种选择
		  $(".list-company-goods input").click(function(event){
		  		event.stopPropagation();
				$("#VCITypes").css("display","block");			
			});
			
		  $('body').click(function(){
	  		if($('#VCITypes').is(':visible') )
	  		{
	  			$('#VCITypes').hide();
	  		}
		  });
		   $(document).on('click','#VCITypes li',function(event){			
				event.stopPropagation();
		})	

	  	// 险种多选框
	  	$(document).on('click','[data-type="checkbox"]',function(){
  				var data_value = $(this).attr('value'),
  					txtalso = $.trim($("#xinazhong").val());
  				if($(this).prop("checked")) {
  					if(txtalso.length > 0) {
  						if(txtalso.indexOf(data_value + ',') != -1) {
  							return;
  						} else {
  							txtalso += data_value + ',';
  						}
  					} else {
  						txtalso = data_value + ',';
  					}
  				} else {
  					if(txtalso.indexOf(data_value + ',') != -1) {
  						txtalso = txtalso.replace(data_value + ',', '');
  					}
  				}
  				$("#xinazhong").val(txtalso);
  		});
	  
  		 // 接车人 施工人 客户来源

		$(".list_Work input").focus(function(){
	  		$(this).siblings(".list_WorkUl").css("display","block");
		});
		$('.list_Work input').blur(function(){
	  		var self=this;
	      	var hiddenColor=function (){
		  		$(self).siblings(".list_WorkUl").css("display","none");
	        }
		    setTimeout(hiddenColor,200);
		});
		$(document).on('click','#where_come li',function(){
	  	    //$(this).parent().prev().val($(this).text().trim());
	  	    $(this).parent().css("display","none");
	  	});

	  	$(document).on('click','.list_WorkUl li',function(){
	  	    $(this).parent().prev().val($(this).text());
	  	    $(this).parent().css("display","none");
	  	});
	  	  $(".list-customer input").focus(function(){
	  		$(this).siblings(".list-company-lists").css("display","block");
	  	});
	  	$('.list-customer input').blur(function(){
	  		var self=this;
	      	var hiddenColor=function (){
	  		$(self).siblings(".list-company-lists").css("display","none");
	      }
	      setTimeout(hiddenColor,200);
	    });
	  	// 违章记录弹窗
	  	//违章弹窗
	  	$('.order-car-info .car-info-list1>a').click(function(){

	  		$('.illicitly-pop').show()
	  	})
	  		$('.ctr-off').click(function(){
	  		$('.illicitly-pop').hide();
	  	})
	    $('.mask').click(function(){
	    	$('.illicitly-pop').hide()
	    })

	    $('.ctr-off').click(function(){
	    	$('.illicitly-pop').hide()
	    })
		//会员，手机号，车牌号
		/*$(".list-cardmassage").prev().focus(function(){
			if($(this).val())
			{
				$(this).next().css("display","block");
			}
		})
		$(".list-cardmassage").prev().blur(function(){
			var self=this;
	      	var hiddenColor=function (){
	  		$(self).next().css("display","none");
	      }
	      setTimeout(hiddenColor,200);
		})*/
		 $(".list-cardmassage li").click(function(){
	  	    $(this).parent().prev().val($(this).text());
	  	    //$(this).parent().css("display","none");
	  	  });
/*******************操作结束******************************/ 

	var page = {
		init: function(){
			//  更多详情 
			$(".info-more-btn").click(function(){
				$(".order-cell-none").toggle();
				var len = $(".order-cell-none:visible").length;
				if(len){
					$(this).text("隐藏更多");
				}else{
					$(this).text("显示更多")
				}
			})

		// 日历插件
			page.setDateTime();
		},
		setDateTime:function(){
			$.datetimepicker.setLocale('ch');
			$('.datetimepicker').datetimepicker({
			      lang:"ch",           //语言选择中文
			      format:"Y-m-d",      //格式化日期
			      timepicker:false,    //关闭时间选项
			      yearStart:1900,     //设置最小年份
			      yearEnd:2020,        //设置最大年份
			      todayButton:false    //关闭选择今天按钮
			})

		},
		getCurrentPage: function(){

			var $container = $(".ulBox").find("ul");
			return -parseInt($container.css('top'))/35 +1;

		},
		gotopage: function(_page){
			var $containerBox = $(".ulBox")
			var $container = $(".ulBox").find("ul");
			var $containerHtml = $container.html();
			var pages = $container.find("li").length-3;

			if(_page ==0){

				$container.css('top','0');
				$container.children(':last').prependTo($container);

			}else if(_page > pages){
				console.log("last")
				$container.children(':first').appendTo($container);
			}
			else{
				var destinationTop = -(_page -1)* 35;
				$container.css(
					"top",destinationTop
				)
			}

		}
	}
	page.init();
	
	
	
})


