// 优惠券js
	$('.Coupon li').click(function(){
		$(this).toggleClass('active-coupon')
	})

// 充值弹窗
	$('.chargeClick').click(function(){
		$('.charge-pop').show();
	})
	$('.mask').click(function(){
		$('.charge-pop').hide();
	})
	$('.ctr-off').click(function(){
		$('.charge-pop').hide();
	})
