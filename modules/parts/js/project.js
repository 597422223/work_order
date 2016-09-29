// 配件 - 适配配件
//table表格下拉
$('.alltbody .VisbleTr .xialaView').click(function(){
	$(this).parent().parent().parent().find('.selectVisble').toggle();
})

$('.jiaohuoTime').click(function(){
	$(this).addClass('jiaohuoTimeActive').siblings().removeClass('jiaohuoTimeActive')
})

var page = {
	init: function(){
	// 从全车购采购其他品牌
		$('.info-more-shop-btn').click(function(){
			page.addTr()
		})
	//询价成功
		$('.noparts span').click(function(){
			page.xunjiaAccess()
		})
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