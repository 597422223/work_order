

//急件出入库弹窗出现
	$('.dispatch-warehouse').click(function(){
		$('.despatch-pop').show()
	});
	$('.mask').click(function(){
		$('.despatch-pop').hide();
	});

	$('.ctr-off').click(function(){
		$('.despatch-pop').hide();
	});


var SelectedPart = new Object({
	//总金额
	SumMoney : function()
	{
		var SumMoney= 0;
		$('.SumMoney').each(function(){
			if( this.value)
			{
				SumMoney  = SumMoney + parseFloat(this.value);
			}
		});
		$('.AllPrice').text(SumMoney);
	},

	//应付金额
	PayAble : function()
	{
		$('.overtime-content1 table tbody tr').each(function(){
			var SPriceNum = parseFloat($(this).find('.SUnitPrice').val())*parseFloat($(this).find('.SNumber').val());
			$(this).find('.SPriceNum').html(SPriceNum.toFixed(2));
		})
	},



});

$(document).on('keyup','.SumMoney',function(){
	SelectedPart.SumMoney();
});

$(document).on('keyup','.SkeyUp',function(){
	SelectedPart.PayAble();
});


$(".apaceAdd").focus(function () {
	$(this).next().css("display","block");
});
$(".apaceAdd").blur(function () {
	var self=this;
	function none() {
		$(self).next().css("display","none");
	}
	setTimeout(none,200);
});
$(".tit-search-xia2 li").click(function () {
	$(this).parent().prev().val($.trim($(this).html()));
	$(this).parent().css("display","none");
});
$(".tit-search-xia2").prev().focus(function () {
	$(this).next().css("display","block");
});
$(".tit-search-xia2").prev().blur(function () {
	var self=this;
	function none() {
		$(self).next().css("display","none");
	}
	setTimeout(none,200);
});



