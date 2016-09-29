$(window).resize(function(){
	frame();
})
/*主体框架*/
frame();
function frame()
{
	var window_height = $(window).height();
	var window_width = $(window).width();
	$('.left,.left .main').css('height',window_height+'px');
	$('#iframe-wrap').css('height',window_height-121+'px');
}
//左边导航
$('.nav-main .nav').click(function(){
	$(this).parent().addClass('active').siblings().removeClass('active');
	
	if(!$(this).next().is(':visible') )
	{
		$('.subnav-main').hide();
		$(this).next().slideDown();
	}
	else
	{
		$(this).next().slideUp();
	}
})

$('.left .main .nav-main .subnav').click(function(){
	$('.subnav').removeClass('active');
	$('.click-nav a i').show();
	$(this).addClass('active');
	var link_url= $(this).attr('link');
	var tongxing = true;
	$('.click-nav a').each(function(){
		if($(this).attr('link') == link_url )
		{
			$('.click-nav a').removeClass('active');
			$(this).addClass('active');
			$('#iframe-wrap').attr('src',$(this).attr('link'));
			tongxing = false;
		}
	})
	
	if( tongxing == true )
	{
		$('.click-nav a').removeClass('active');
		var a_html="<a class='tbl aopei-tiao-com active' link='"+link_url+"'>"+$(this).text()+"<i>X</i></a>";
		$('.click-nav').append(a_html);
		$('#iframe-wrap').attr('src',$(this).attr('link'));

	}
		
		
		
		
	
	
})
//左边公共
$('.click-nav a').click(function(){
	$(this).addClass('active').siblings().removeClass('active');
})
$(document).on('click','.click-nav a',function(){
	$(this).addClass('active').siblings().removeClass('active');
})
$('.click-nav a i').click(function(event){
	if( $(this).parent().hasClass('active') )
	{
		$(this).parent().prev().addClass('active');
		$('#iframe-wrap').attr('src',$(this).parent().prev().attr('link'));
	}
	$(this).parent().remove();
	
	if( $('.click-nav a').length <=1 )
	{
		$('.click-nav a i').hide();
	}
	else
	{
		$('.click-nav a i').show();
	}
	
	event.stopPropagation() ;
})
$(document).on("click", ".click-nav a i", function(event){ 
	if( $(this).parent().hasClass('active') )
	{
		$(this).parent().prev().addClass('active');
		$('#iframe-wrap').attr('src',$(this).parent().prev().attr('link'));
	}
	$(this).parent().remove();
	
	if( $('.click-nav a').length <=1 )
	{
		$('.click-nav a i').hide();
	}
	else
	{
		$('.click-nav a i').show();
	}
	
	event.stopPropagation() ;
}); 
$('.right .header .username').click(function(){
	if( $(this).find('ul').is(':visible') )
	{
		$(this).find('ul').hide();
	}
	else
	{
		$(this).find('ul').show();
	}
})
$('.exact-right .select i').click(function(){
	car_style($(this));
})
$('.exact-right .select input').click(function(){
	car_style($(this));
})
function car_style(dom)
{
	if( dom.parent().index() > 1 && dom.parent().prev().find('input').val()!= '' )
	{
		dom.parent().find('ul').slideToggle(200);
	}
	if( dom.parent().index()==1)
	{
		dom.parent().find('ul').slideToggle(200);
	}
}

$('.exact-right').delegate('.select ul li', 'click', function(){
	
	$(this).parent().hide().siblings('input').val($(this).text());
	for( var i = $(this).parent().parent().index();i<4;i++ )
	{
		$('.select').eq(i).find('input').val('');
	}
})

$('.exact-search .main .exact-left span').click(function(){
	$(this).addClass('active').siblings().removeClass('active');
	$('.exact-search .main .exact-left .serach input[type=text]').attr('placeholder','请输入'+$(this).text());
})

$('.jian-main span').click(function(){
	$(this).addClass('active').siblings().removeClass('active');
})

//换件table
$('.huanjian tbody tr.list').each(function(){
	var zhi = $(this).index()/2;
	if( zhi%2 == 0 )
	{
		$(this).addClass('white');
	}
})
$('.huanjian tbody tr.list').click(function(){
	
	if($(this).next().is(':visible'))
	{
		$(this).next().hide();
	}
	else
	{
		$('.loss-main table tr.tr-table-del').hide()
		$(this).next().show();
	}
})

$('.search-list tr.list').each(function(){
	var zhi = $(this).index()/2;
	if( zhi%2 == 0 )
	{
		$(this).addClass('white');
	}
})

$('.search-list tr.list').click(function(){
	
	if($(this).next().is(':visible'))
	{
		$(this).next().hide();
	}
	else
	{
		$('.search-list table tbody tr:nth-child(2n)').hide()
		$(this).next().show();
	}
})

$('.num .add').on('click', function(event){
	var i =$(this).prev().val();
	$(this).prev().val(++i);
	 event.stopPropagation();
})

$('.num .reduce').on('click', function(event){
	var i =$(this).next().val();
	if( i> 0 )
	{
		$(this).next().val(--i);
	}
	event.stopPropagation();
})
$(document).on('click','.num .add',function(event){
	var i =$(this).prev().val();
	$(this).prev().val(++i);
	event.stopPropagation();
})
$(document).on('click','.num .reduce',function(event){
	var i =$(this).next().val();
	if( i> 0 )
	{
		$(this).next().val(--i);
	}
	event.stopPropagation();
	
})
$('.express').on('click', function(event){
	$(this).addClass('active').siblings().removeClass('active');
	 event.stopPropagation();
})
$('.btn-shop').click(function(event){
	event.stopPropagation();
})
$('.btn-gongshi').click(function(){
	if($('.table-gongshi tbody').is(':visible'))
	{
		$('.table-gongshi tbody').hide();
		$(this).attr('src','images/jian_xia.png');
	}
	else
	{
		$('.table-gongshi tbody').show();
		$(this).attr('src','images/jian_shang.png');
	}
})

$('.loss-tbl span').click(function(){
	$(this).addClass('active').siblings().removeClass('active');
	$(this).css('border-right-color','#e3e3e3');
	if( $(this).index() < $('.loss-tbl span').length-1 )
	{
		$('.loss-tbl span').last().css('border-right-color','#fff');
	}
	$('.baoxian-list').hide().eq($(this).index()).show();
})

//配件商城
$('.carPar-item li').mouseover(function(){
	var id_val = $(this).find('a').attr('id');
	$('.icon-main a').each(function(){
		if( $(this).attr('id') == id_val  )
		{
			$(this).find('i').addClass('act');
		}
	})
}).mouseout(function(){
	var id_val = $(this).find('a').attr('id');
	$('.icon-main a').each(function(){
		if( $(this).attr('id') == id_val  )
		{
			$(this).find('i').removeClass('act');
		}
	})
})

$('.icon-main a').mouseover(function(){
	var id_val = $(this).attr('id');
	$('.carPar-item a').each(function(){
		if( $(this).attr('id') == id_val  )
		{
			$(this).parent().addClass('act');
		}
	})
}).mouseout(function(){
	var id_val = $(this).attr('id');
	$('.carPar-item a').each(function(){
		if( $(this).attr('id') == id_val  )
		{
			$(this).parent().removeClass('act');
		}
	})
})
/*查询弹框*/
$('.jian-search .btn-search').click(function(){
	
	if( $('.jian-search .search-box').is(':visible') )
	{
		$('.jian-search .search-box').hide();
	}
	else
	{
		$('.jian-search .search-box').show();
	}
})

$('.search-com .btn-search').click(function(){
	$('.jian-search .search-box').hide();
})
/*排序*/
$('.btn-sort i').click(function(){
	$(this).addClass('active').siblings().removeClass('active');
})

/*账户设置*/
$('.accout-left .accout-nav').click(function(){
	$(this).addClass('active').siblings().removeClass('active');
	$('.accout .accout-right').hide().eq($(this).index()).show();
})

$('.user-tbl span').click(function(){
	$(this).addClass('active').siblings().removeClass('active');
	$('.order-manage .user').hide().eq($(this).index()).show();
})

$('.user-order-status span').click(function(){
	$(this).addClass('active').siblings().removeClass('active');
})

//订单管理
$('.order-list-del .list').click(function(){
	if( $(this).next().is(':visible') )
	{
		$(this).next().hide();
	}
	else
	{
		$('.order-list-del .list').next().hide()
		$(this).next().show();
	}
})

$('.select-xiali input').click(function(){
	if( $(this).next().is(':visible') )
	{
		$(this).next().hide();
	}
	else
	{
		$('.select-xiali input').next().hide()
		$(this).next().show();
	}
})

$('.select-xiali ul li').click(function(){
	$(this).parent().prev().val($(this).text());
	$(this).parent().hide();
})

$('.btn-data-num').click(function(){
	$('.btn-data-num').removeClass('active');
	$(this).addClass('active');
})

/*找回密码*/
$('.find-pwd-three b.b-input-pwd-1').click(function(){
	
	if( !$(this).hasClass('active'))
	{
		$(this).addClass('active').parent().find('input').attr('type','text');
	}
	else
	{
		$(this).removeClass('active').parent().find('input').attr('type','password');
	}
})
/*购物车*/
/*$('.btn-shop-car').click(function(){
	if( $(this).find('.main').is(":visible") )
	{
		$(this).find('.main').hide();
	}
	else
	{
		$(this).find('.main').show();
	}
})*/

$('.btn-shop-car').mouseover(function(){
	$(this).find('.main').show();
})
$('.btn-shop-car').delegate('.main', 'mouseleave', function(){
	$(this).hide();
})

/*结算方式*/
$('.jiesuan .pay-type').click(function(){
	$('.jiesuan .pay-type').removeClass('active');
	$(this).addClass('active');
})
/*页面跳转*/
$('.aopei-tiao-com').click(function(){
	var url = $(this).attr('link');
	$('#iframe-wrap').attr('src',url);
	//将url写入cookei
	setCookie('url',url);
})
$(document).on('click','.aopei-tiao-com',function(){
	var url = $(this).attr('link');
	$('#iframe-wrap').attr('src',url);
	//将url写入cookei
	setCookie('url',url);
})
$('.aopei-tiao-del').click(function(){
	var url = $(this).attr('link');
	window.parent.document.getElementById('iframe-wrap').src= url;
	//将url写入cookei
	setCookie('url',url)
})
/*头部刷新*/
$('.right .header .shuaxing').click(function(){
	document.getElementById('iframe-wrap').contentWindow.location.reload();
})
//获取验证码
$('.btn-yzm').click(function(){
	$(this).next().show();	
	var setInte = setInterval(count,1000);
	function count()
	{
		var miao = $('.btn-noclick span').text();
		if( miao !=0 )
		{
			$('.btn-noclick span').text(--miao)
		}
		else
		{
			$('.btn-noclick').hide();
			clearInterval(setInte);
		}
	}
	
})

$('.input-focus').focus(function(){
	$(this).removeClass('active');
})


//登录验证
$('.login-submit').click(function(){
	login_yz();
})
function  login_yz()
{ 
	var current = true;
	$('.login input[type=text]').each(function(){
		if( $(this).val() == '' )
		{
			$(this).addClass('active');
			current = false;
		}
	})
	if(  checkMobile($('#logo-name').val())== false && isEmail($('#logo-name').val()) == false  )
	{
		$('#logo-name').addClass('active');
		current = false;
		
	}
	return current;
}
/*手机验证*/
function checkMobile(str){
    var re = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}
/*邮箱验证*/
function isEmail(str){ 
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	return reg.test(str); 
} 


function pwd_one()
{
	var current = true;
	if(  checkMobile($('.phone').val()) == false && isEmail($('.phone').val()) == false  )
	{
		$('.phone').addClass('active');
		current = false;
	}
	return current;
}


function pwd_two()
{
	var current = true;
	if(  checkMobile($('.second-phone').val()) == false && isEmail($('.second-phone').val()) == false  )
	{
		$('.second-phone').addClass('active');
		current = false;
	}
	if( $('.find-pwd .yanzhengma input[type=text]').val() == '' )
	{
		$('.find-pwd .yanzhengma input[type=text]').addClass('active');
		current = false;
	}
	return current;
}

function pwd_thre()
{
	var status = 0;
	$('.find-pwd-three input[name=pwd]').each(function(){
		if( $(this).val() == '' )
		{
			$(this).addClass('active');
			status = 1;
		}
	})

	if( $('#pwd-1').val() != $('#pwd-2').val() )
	{
		status = 2;
	}
	return status;
	
}

$("#accident-search").click(function(){
	if ( $.trim($("#validateno").val())=='' ){
		alert("请输入保单号!");
		$("#validateno").focus();
		return false;
	}else if ( $.trim($("#certificateno").val())=='' ){
		alert("请输入身份证号!");
		$("#certificateno").focus();
		return false;
	}

	$('#accident-form').submit();
});

//屏蔽刷新
function Refresh()
{
	var url = getCookie('url');
	document.getElementById('iframe-wrap').src=url;   
}

//写入cookei
function setCookie(name,value)
{
	var Days = 30*12*10;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
//获取cookei
function getCookie(name)
{
	var strCookie=document.cookie; 
	var arrCookie=strCookie.split("; "); 
	var url; 
	for(var i=0;i<arrCookie.length;i++){ 
		var arr=arrCookie[i].split("="); 
		//找到名称为userId的cookie，并返回它的值 
		if(name==arr[0]){ 
			url=arr[1]; 
			break; 
		} 
	} 
	return url;
}

//订单列表
$('.table-order-list .status-wait input').removeAttr('disabled');
$('.check-all-btn').click(function(){
	if( $(this).is(':checked') )
	{
		$('.table-order-list .status-wait input').attr("checked",true);
		$('.order-list .order-num .btn-return').addClass('active');
	}
	else
	{
		$('.table-order-list .status-wait input').attr("checked",false);
		$('.order-list .order-num .btn-return').removeClass('active');
	}
})
$('.table-order-list .status-wait input').click(function(){
	if( $('.table-order-list .status-wait input:checked').length >=2 )
	{
		$('.order-list .order-num .btn-return').addClass('active');
	}
	else
	{
		$('.order-list .order-num .btn-return').removeClass('active');
	}
	var wait_input = $('.table-order-list .status-wait input').length;
	if( $('.table-order-list .status-wait input:checked').length == wait_input )
	{
		$('.check-all-btn').attr("checked",true);
	}
	else
	{
		$('.check-all-btn').attr("checked",false);
	}
})

$('.order-list .order-num .btn-return').click(function(){
	if( $(this).hasClass('active') )
	{
		$(this).next().next().toggle();
	}
})

$('.btn-guanbi').click(function(){
	$(this).next().toggle();
})

$('.btn-close-false').click(function(){
	$(this).closest('div').hide();
})

//新增定损信息
$('.new-loss-table table tr td span').click(function(){
	$('.loss-main').show();
})

//订单详情
$('.btn-add-tr').click(function(){
	$(this).parent().parent().before($('.tr-info-add table tbody').html());
})
$('.phone-fujian .upload-img i').click(function(){
	$(this).parent().remove();
})
$('.order-del-caozuo .btn-save').click(function(){
	$('.box-save').toggle();
})
$('.order-del-caozuo .btn-sent-customer').click(function(){
	$('.box-customer').toggle();
})
$('.order-del-caozuo .box-btn .btn-true').click(function(){
	$(this).parent().hide();
})
$('.orderdel-info-table tr td .tianjia').click(function(){
	$('.box-add-peijian').show()
})
$('.close-box-btn').click(function(){
	$(this).parent().parent().hide();
})
$('.orderdel-info-table tr td .shanchu').click(function(){
	$(this).parent().find('.del-box').toggle();
})
$('.del-box .true,.del-box .close').click(function(){
	$(this).parent().hide();
})
$('.orderdel-info-table tr td .tihuan').click(function(){
	$('.tihua-box1').toggle();
})

$('.orderdel-info-table tr td .zhuandan ').click(function(){
	$('.zhuandan-box').toggle();
})

/*供应商*/
$('.supplier .main .info1 .btn-return').click(function(){
	$('.box-add-suppl').toggle();
})

$('.supplier .main .info .new-add-account').click(function(){
	$('.box-new-account').toggle();
})

/*全车配入库*/
$('.quanku-table thead tr td .check-all-btn').click(function(){
	if( $(this).is(':checked') )
	{
		$('.quanku-table input:checkbox').prop('checked',true);
	}
	else
	{
		$('.quanku-table input:checkbox').prop('checked',false);
	}
	
})

$('.quanku-table tbody tr td input:checkbox').click(function(){
	var check_length = $('.quanku-table tbody tr td input:checkbox').length;
	var num =0;
	$('.quanku-table tbody tr td input:checkbox').each(function() {
		if($(this).is(':checked'))
		{
			++num;
		}
	});
	if($(this).is(':checked'))
	{
		$(this).closest('tr').next('.td-hide').find('input').prop('checked',true);
	}
	else
	{
		$(this).closest('tr').next('.td-hide').find('input').prop('checked',false);
	}
	if( num >=  check_length)
	{
		$('.quanku-table thead tr td .check-all-btn').prop('checked',true);
	}
	else
	{
		$('.quanku-table thead tr td .check-all-btn').prop('checked',false);
	}
	
	if( num >= 1 )
	{
		$('.quan-ruku .quanku-list .order-num .btn-return').addClass('active');
	}
	else
	{
		$('.quan-ruku .quanku-list .order-num .btn-return').removeClass('active');
	}
})
$('.quanku-table tr td.bnt-show-table').click(function(){
	if( $(this).closest('tr').next().is(':visible') )
	{
		$(this).closest('tr').next().hide();
		$(this).html('+');
	}
	else
	{
		$(this).closest('tr').next().show();
		$(this).html('-');
	}
	
})

$('.td-tbale input:checkbox').click(function(){
	var check_length = $(this).closest('.td-tbale').find('input:checkbox').length;
	var num =0;
	$('.td-tbale input').each(function() {
		if($(this).is(':checked'))
		{
			++num;
		}
	});
	
	if( num >=  check_length)
	{
		$(this).closest('.td-hide').prev().find('input:checkbox').prop('checked',true);
	}
	else
	{
		$(this).closest('.td-hide').prev().find('input:checkbox').prop('checked',false);
	}
	
})

//用户
$('.user-data p a.btn-modify').click(function(){
	$(this).hide().prev().show();
	$(this).closest('p').next().find('input').addClass('active').removeAttr('readonly');
	$(this).closest('p').next().find('select').addClass('active').removeAttr('disabled');
})
$('.user-data p a.btn-save').click(function(){
	$(this).hide().next().show();
	$(this).closest('p').next().find('input').removeClass('active').attr('readonly',true);
	$(this).closest('p').next().find('select').removeClass('active').attr('disabled',true);;
})

//库位
$('#new-add-kuwei').click(function(){
	$('.finan-box').show();
})

$('.btn-close-finan').click(function(){
	$(this).closest('.finan-box').hide();
})