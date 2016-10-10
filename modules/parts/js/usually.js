//常用配件
	var page = {
		init:function(){
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

			$(document).on('click','.ulBox li', function(){//点击li
				var _this = $(this)
				page.barActive(_this);

			})
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

		}
	}
	page.init()
		

			
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