
// document.write('<script src="common/config.js"><\/script>');

$(function(){
	var page = {
		init: function(){
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

		}
	}
	page.init();

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
	// 点击售卡 弹窗出现
	// $('.sellingTicket-s').click(function(){
	// 	$('.pay_cardwin-pop').show();
	// })
	$('.mask').click(function(){
		$('.pay_cardwin-pop').hide();
	})
	$('.ctr-off').click(function(){
		$('.pay_cardwin-pop').hide();
	})

	// 售卡弹窗   售卡人
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