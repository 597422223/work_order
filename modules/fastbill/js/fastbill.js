
// tab切换 -快速开单切换
$(function(){

	var page = {
		init: function(){
			$('#FastBillingOrder>div').click(function(){
				var _this = $(this);
				var id = $("#FastBillingOrder");
				page.FastBillingFun(_this,id);
			})
		},
		FastBillingFun:function(_this,id){
			id.find("i").eq(_this.index()).toggle();
			id.find(".list-FastBilling").eq(_this.index()).toggleClass('list-border');
		}
	}
	page.init();
	
	$(document).on("click",".list-FastBilling",function(){
		$(this).toggleClass('list-border');
	})
})
