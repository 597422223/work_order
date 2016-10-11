
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




		  	//获取新建预约单数据 
						

					$('.newBookSave').click(function(){
						var Addarr = [];
						var newAddarr = [];
						var AppointTime =  $('.Appointment_time input').val();//获取预约到店时间
						var AppointWay = $('.Appointment_way option:selected').text();//获取预约方式
						var AppointRemark = $('.Appointment_notes textarea').val()//获取预约备注


						$('.Appointment_project .list-border p').each(function(){
							var pText = $(this).text()
							Addarr.push(pText)
						})


						$('.Appointment_project .list-border input').each(function(){
							var pText = $(this).val().replace(/\s+/g,"")
							// 去掉空格正则
							// console.log(pText)

							// 为空不添加数组
							if (pText=='') {
								return;
							}else{
								newAddarr.push(pText)
							}
						})

						// 获取到新建新增服务项目
						var	allArr = newAddarr.concat(Addarr)

						//数组去重
						function unique(arr){
						  var tmpArr = [];
						  for(var i=0; i<arr.length; i++){
						    //如果当前数组的第i已经保存进了临时数组，那么跳过，
						    //否则把当前项push到临时数组里面
						    if(tmpArr.indexOf(arr[i]) == -1){
						      tmpArr.push(arr[i]);
						    }
						  }
						  return tmpArr;
						}
						unique(allArr)
						// console.log(AppointTime)
						// console.log(AppointWay)
						// console.log(AppointRemark)
						// console.log(unique(allArr))
						// 处理新建预约数据
					})
	})
	