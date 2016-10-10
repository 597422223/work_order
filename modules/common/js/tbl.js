$('.tab-menu li').click(function(){
	$(this).addClass('tab-menu-active').siblings().removeClass('tab-menu-active')
})


//分页
function PageCommon()
{
	$(document).on('click','.tab-module .ep-pages a',function(){
		alert(111);
		
	})
}


