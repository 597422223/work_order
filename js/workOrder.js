
// document.write('<script src="common/config.js"><\/script>');

$(function(){

	var page = {
		init: function(){
			//公共使用
			// 日历插件
			page.setDateTime();
			// 数量+-   库存配件table
			$(".moveBtn").click(function(){  //减
				var num_b = Number($(this).parent().find(".showNum").val());
				if(num_b ==0){
					num_b =0;
					alert("已是最小值")
				}else{
					num_b -= 1;
					$(this).parent().find(".showNum").val(num_b);
				}
				
			})
			$(".addBtn").click(function(){ //加
				var num_b = Number($(this).parent().find(".showNum").val());
				num_b += 1;
				$(this).parent().find(".showNum").val(num_b);
			})
			// // tab模块一级菜单切换
			// $(".tab-menu>ul>li").click(function(){
			// 	var _this = $(this);
			// 	page.tabMenuChoice(_this)
			// })

			// // tab模块二级菜单切换
			// $(".tab-menu-second li").click(function(){
			// 	var _this = $(this);
			// 	var index = $(this).parent().parent().parent().index();

			// 	console.log(index)
			// 	page.tabSecondMenuChioce(_this,index);

			// })
			/**********************main 公共部分*************************/ 
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
			//违章弹窗
			$('.order-car-info .car-info-list1>a').click(function(){

				$('.illicitly-pop').show()
			})
				$('.ctr-off').click(function(){
				$('.illicitly-pop').hide();
			})
		/**********************tab切换*************************/ 
			// tab切换 -快速开单切换
			$('#FastBillingOrder>div').click(function(){
				var _this = $(this);
				var id = $("#FastBillingOrder");
				page.FastBillingFun(_this,id);
			})
			// tab切换 - 预约 - 新建预约
			$(document).on("click","#FastBillingBooking>div",function(){
				var val = $(this).find("input").val();
				var _html = '<div class="list-FastBilling"><p>' + val + '</p><i></i></div>'
				var _this = $(this);
				var id = $("#FastBillingBooking");
				page.FastBillingFun(_this,id);
			})

			//tab切换 - 预约 - 新建预约 点击新增
			$('.Appointment_project>input').click(function(){
				var _html = '<div class="list-FastBilling"><input type="text" name=""><i></i></div>';
				$('#FastBillingBooking').append(_html);
			}) 
			
		/**********************配件*************************/ 
			//常用配件
			$('.bar-lsit-left li').click(function(){
				var _this = $(this);
				page.barActive(_this);
			}) 
			
			//常用配件滚动
			$('.ctrl-bar-up').click(function(){  //向上按钮
				page.gotopage(page.getCurrentPage() + 1);

			});

			$('.ctrl-bar-down').click(function(){  //向下按钮
				page.gotopage(page.getCurrentPage() - 1);

			});

			$(".ulBox li").click(function(){ //点击li
				var _this = $(this)
				page.barActive(_this);

			})
			// 从全车购采购其他品牌
			$('.info-more-shop-btn').click(function(){
				page.addTr()
			})
			//询价成功
			$('.noparts span').click(function(){
				page.xunjiaAccess()
			})
			
			
			
			//弹窗页面出现
			$('.content2-add').click(function(){
				$('.choose-project-pop').show();
			})
			$('.ctr-off').click(function(){
				$('.choose-project-pop').hide();
			})
			
		},
		setDateTime:function(){
			// $('.datetimepicker').datetimepicker({lang:'ch'});
			$.datetimepicker.setLocale('ch');
			$('.datetimepicker').datetimepicker({
			      lang:"ch",           //语言选择中文
			      format:"Y-m-d",      //格式化日期
			      timepicker:false,    //关闭时间选项
			      yearStart:1900,     //设置最小年份
			      yearEnd:2020,        //设置最大年份
			      todayButton:false    //关闭选择今天按钮
			});


			$('.AppointmentTime').datetimepicker({
			      lang:"ch",           //语言选择中文
			      format:"Y-m-d h:00",      //格式化日期
			      timepicker:true,    //关闭时间选项
			      yearStart:1900,     //设置最小年份
			      yearEnd:2020,        //设置最大年份
			      todayButton:false    //可以选择今天按钮
			})

		},
		tabMenuChoice: function(_this){
			// debugger;
			var index = _this.index()
			_this.addClass("tab-menu-active").siblings().removeClass("tab-menu-active");
			$(".tab-module>div").eq(index).show().siblings().hide();

			$(".tab-menu-second").hide();

			// 控制二级菜单
			if(index == 1|| index==2 || index == 3 || index==4){
				_this.find(".tab-menu-second").show();
			}else{
				$(".tab-menu-second").hide();
			}
		},
		tabSecondMenuChioce: function(_this,index){
			var _index = index; //第几个一级菜单
			var index = _this.index(); //第几个二级菜单

			var activeSecond = $(".tab-module>div").eq(_index);
			_this.addClass("tab-menu-second-active").siblings().removeClass("tab-menu-second-active");
			activeSecond.find(".mark-secondContent").eq(index).show().siblings().hide();
			
		},
		FastBillingFun:function(_this,id){
			id.find("i").eq(_this.index()).toggle();
			id.find(".list-FastBilling").eq(_this.index()).toggleClass('list-border');
		},
		barActive:function(_this){
			var index = _this.index()
			_this.addClass('bgred').siblings().removeClass('bgred')
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

		},
		addTr:function(){
			var _html ='<tbody><tr class="VisbleTr"><td ><img src="../images/workOrder/pic.png"></td><td><span>清洗车顶内饰</span></td><td><span>AC德科</span></td><td><span>A3318H</span></td><td></td><td></td><td>2</td><td>¥235.00</td><td class="overtime_red"><input type="text" name=""></td><td class="ctr-num-td" width="11.3%"><div class="ctr-nunm"><span class="moveBtn">-</span><input type="text" value="2" class="showNum"><span class="addBtn">+</span></div></td><td><span class="overtime_blue">添加</span><span class="overtime_red xialaView">采购</span></td></tr></tbody>'
			$('.project_parts table ').append(_html)
		},
		xunjiaAccess:function(){
			alert('询价成功')
		}
	}

	page.init();

 
/*******************操作******************************/ 
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



  //9-22赵飞翔


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
  $(".colorjs li").click(function(){
    $('.listjs input').val($(this).text());
    $(".colorjs").css("display","none")
  });
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
	  $(".list-company-lists li").click(function(){
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
	$('#VCITypes li').click(function(event){
			
			check_val.checkval();			
			event.stopPropagation();
	})	
// 险种
	 $('[data-type="checkbox"]').click(function() {
			var data_value = $(this).attr('data-value'),
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
	  $(".list_WorkUl li").click(function(){
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
/*********************公共部分结束************************/



	// 卡券现有
	$('.Coupon li').click(function(){
		$(this).toggleClass('active-coupon')
	})





//项目工时js
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

// 项目工时 已选项目
  $(".tit-search-xia li").click(function(){
    $(this).parent().prev().val($(this).text());
    $(this).parent().css("display","none");
  });
	  




// 配件 - 适配配件
//table表格下拉
$('.alltbody .VisbleTr .xialaView').click(function(){
	$(this).parent().parent().parent().find('.selectVisble').toggle();
})

$('.jiaohuoTime').click(function(){
	$(this).addClass('jiaohuoTimeActive').siblings().removeClass('jiaohuoTimeActive')
})




//9-22修改
	/*******************弹窗******************/ 

$('.mask').click(function(){
	$('.illicitly-pop').hide()
	$('.pay_cardwin-pop').hide();
	$('.charge-pop').hide();
	$('.newAddBespeak-pop').hide();
	$('.choose-project-pop').hide();
	$('.despatch-pop').hide();
})

$('.ctr-off').click(function(){
	$('.pay_cardwin-pop').hide();
	$('.charge-pop').hide();
	$('.newAddBespeak-pop').hide();
	$('.despatch-pop').hide();
})
$('.sellingTicket-s').click(function(){
	$('.pay_cardwin-pop').show();
})

// 预约弹窗
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
//确认出现弹窗
$('.chargeClick').click(function(){
	$('.charge-pop').show();
})

// 新增预约服务
$('.add-book').click(function(){
	$('.newAddBespeak-pop').show()
})
// 
$('.newAddBespeak-pop .list-FastBilling').click(function(){
	$(this).toggleClass('list-border')
})
//急件出入库弹窗出现
$('.dispatch-warehouse').click(function(){
	$('.despatch-pop').show()
})
// 售卡弹窗
	$('.pay_cardwin_sevenli input').focus(function(){
				    $("#pay_carPle").css("display","block");
				  });
				  
				  $('.pay_cardwin_sevenli input').blur(function(){
				    var hiddenColor=function (){
				      $("#pay_carPle").css("display","none");
				    }
				    setTimeout(hiddenColor,200);
				  });
				  $("#pay_carPle li").click(function(){
				    $('.pay_cardwin_sevenli input').val($(this).text());
				    $("#pay_carPle").css("display","none");
				  });
})
//