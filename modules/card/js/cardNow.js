// 优惠券js
	$('.Coupon li').click(function(){
		$(this).toggleClass('active-coupon')
	})

// 充值弹窗
	// $('.chargeClick .btnRed').click(function(){
	// 	$('.charge-pop').show();
	// }) 10-11
	$('.mask').click(function(){
		$('.charge-pop').hide();
	})
	$('.ctr-off').click(function(){
		$('.charge-pop').hide();
	})
