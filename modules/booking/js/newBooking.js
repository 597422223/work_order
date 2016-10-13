
	$(function(){
		var newpage = {
			init: function(){
				//公共使用
				// 日历插件
				 newpage.setDateTime();
			//点击新增
				$('.Appointment_project>input').click(function(){
					if ($('.Appointment_project .list-FastBilling input:last').val()=="") {
						alert("请输入服务项目")
					}else{
						var _html = '<div class="list-FastBilling"><input type="text" name=""><i></i></div>';
						$('#FastBillingBooking').append(_html);
					}
				})  

			},
			setDateTime:function(){
				$.datetimepicker.setLocale('ch');
				$('.AppointmentTime').datetimepicker({
				      lang:"ch",           //语言选择中文
				      format:"Y-m-d h:00",      //格式化日期
				      timepicker:true,    //关闭时间选项
				      yearStart:1900,     //设置最小年份
				      yearEnd:2020,        //设置最大年份
				      todayButton:false    //可以选择今天按钮
				})
			}
		}

		 newpage.init();
		$(document).on("click",'#FastBillingBooking>div',function(){
			$(this).toggleClass('list-border');
		})




		  // 添加预约
	$('.add-book').click(function(){
		$('.newAddBespeak-pop').show()
	})
	
	})
	