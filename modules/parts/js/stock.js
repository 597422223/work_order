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