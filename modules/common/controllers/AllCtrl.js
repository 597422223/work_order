var app = angular.module('myApp');  
app.controller('AllCtrl', ['$scope','$rootScope','$http','RequestService','$location',function($scope,$rootScope,$http,RequestService,$location) {

	// 10-11 韩盼盼 底部隐藏
	$rootScope.myShow=function(){
		// console.log(window.location.hash)
		if (window.location.hash == "#/index/card/xianyou"||window.location.hash == "#/index/card/shouka"||window.location.hash == "#/index/booking/nowBooking"||window.location.hash == "#/index/booking/newBooking") {
			$('.check_footer').hide()
		}else{
			$('.check_footer').show()
		}
			
	}

	// end
	

	$rootScope.plateNumberType1  =  '正式';
	$rootScope.orderNo = $location.search().orderNo; 
	$rootScope.token = RequestService.getCookie('token');
	$rootScope.selectedReady = 1;
	$rootScope.gongshiReady = 1;

	//获取当前时间
	//myDate.getFullYear();    //获取完整的年份(4位,1970-????)
	//myDate.getMonth();       //获取当前月份(0-11,0代表1月)
	//myDate.getDate();        //获取当前日(1-31)
	var myDate = new Date();
	$rootScope.getInTime = myDate.getFullYear()+'-'+parseInt(myDate.getMonth()+1)+'-'+myDate.getDate();






	if ($rootScope.orderNo) 
	{  
	    $scope.RequestUrl ='/customer/ordermaster/detail';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'orderNo':$rootScope.orderNo,
		});
		$scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
		$scope.data.success(function(data) {
			if( data.status == 1 )
			{
				//基本信息查询
				$.each(data.data.car,function(index,value){
					$rootScope[index] = value;
				})
				$.each(data.data.customer,function(index,value){
					$rootScope[index] = value;
				})
				$.each(data.data.insurance,function(index,value){
					$rootScope[index] = value;
				})
				$.each(data.data.order,function(index,value){
					$rootScope[index] = value;
				})
				$rootScope.IllegalAll($rootScope.localCarId,$rootScope.customerId);
			}

		})
	}  

	//工单信息(order)参数
	
	$rootScope.SubmitOrderInfo = function()
	{
		$rootScope.orderArr = {};
		$rootScope.orderArr['flag'] = $rootScope.flag;   //工单类型
		$rootScope.orderArr['status'] = $rootScope.status;  //状态
		$rootScope.orderArr['orderType'] = 1;  //默认1
		$rootScope.orderArr['senderName'] = $rootScope.senderName;   //送修人姓名
		$rootScope.orderArr['senderPhone'] = $rootScope.senderPhone;  //送修人电话
		$rootScope.orderArr['orderSourceId'] = $rootScope.orderSourceId1; //用户来源ID
		$rootScope.orderArr['orderSourceInfo'] = $rootScope.orderSourceInfo; //用户来源详情
		$rootScope.orderArr['orderSourceInfoId'] = $rootScope.orderSourceInfoId;  //用户来源详情ID   未知  
		$rootScope.orderArr['orderPeople'] = $rootScope.orderPeople;  //接单人ID
		$rootScope.orderArr['orderPeopleName'] = $rootScope.orderPeopleName;  // 接单人姓名
		$rootScope.orderArr['pickPeople'] = $rootScope.pickPeople;  //接车人ID
		$rootScope.orderArr['pickPeopleName'] = $rootScope.pickPeopleName;  //接车人ID
		$rootScope.orderArr['getInTime'] = $rootScope.getInTime;; //进场时间
		$rootScope.orderArr['desc']= $rootScope.desc; //施工备注
		$rootScope.orderArr['completeTime'] = $rootScope.completeTime; //完工时间
		$rootScope.orderArr['bookType'] = $rootScope.bookingStyle;  //预约类型
		$rootScope.orderArr['bookTypeName'] =  $rootScope.bookTypeName;  //预约类型名
		$rootScope.orderArr['bookPeople'] = $rootScope.bookPeople; //预约人ID
		$rootScope.orderArr['bookPeopleName'] = $rootScope.bookPeopleName; //预约人姓名
		$rootScope.orderArr['bookGetInTime'] = $rootScope.toShopTime; //预约到店时间
		$rootScope.orderArr['exceptedEndTime'] = $rootScope.exceptedEndTime; // 期望完成时间
		return $rootScope.orderArr;
	}


	//客户信息(customer)参数
	$rootScope.SubmitCustomerInfo = function()
	{
		$rootScope.customerArr = {};
		$rootScope.customerArr['customerId'] = $rootScope.customerId;   //客户ID
		$rootScope.customerArr['customerName'] = $rootScope.senderName;  //客户名
		$rootScope.customerArr['idno'] = $rootScope.idno;  //身份证号码
		$rootScope.customerArr['phone'] = $rootScope.senderPhone;  //手机号码
		$rootScope.customerArr['license'] = $rootScope.idno; //驾驶证号码
		$rootScope.customerArr['birth'] = $rootScope.birth; //生日
		$rootScope.customerArr['address'] = $rootScope.address;  // 地址
		$rootScope.customerArr['vipNo'] = $rootScope.vipNo;  //会员卡号
		
		return $rootScope.customerArr;
	}


	//信息(car)参数
	$rootScope.SubmitCarInfo = function()
	{

		if( $rootScope.plateNumberType1 == '正式'  )
		{
			$rootScope.plateNumberType1 = 0;
		}
		if( $rootScope.plateNumberType1 == '临时'  )
		{
			$rootScope.plateNumberType1 = 1;
		}
		if( $rootScope.plateNumberType1 == '军牌'  )
		{
			$rootScope.plateNumberType1 = 2;
		}
		$rootScope.CarArr = {};
		$rootScope.CarArr['localCarId'] = $rootScope.localCarId;   //车信息ID
		$rootScope.CarArr['plateNumberType'] = $rootScope.plateNumberType1;  //车牌类型
		$rootScope.CarArr['plateNumber'] = $rootScope.idno;  //车牌号
		$rootScope.CarArr['vinNo'] = $rootScope.vinNo;  //车架号/车型VIN码
		$rootScope.CarArr['ctids'] = $rootScope.ctids;  //车型号，车型ID，逗号分隔
		$rootScope.CarArr['carNo'] = $rootScope.carModelNo; //品牌型号
		$rootScope.CarArr['carModel'] = $rootScope.carModel; //车辆型号
		$rootScope.CarArr['carBrand'] = $rootScope.carBrand;  // 品牌(别克)
		$rootScope.CarArr['carSeries'] = $rootScope.carSeries;  //车系(君越)
		$rootScope.CarArr['carYear'] = $rootScope.carYear;  //年款
		$rootScope.CarArr['carDis'] = $rootScope.carDis;  //排量
		$rootScope.CarArr['price'] = $rootScope.carPrice;  //车辆价格
		$rootScope.CarArr['engineNo'] = $rootScope.engineNo;  //发动机号
		$rootScope.CarArr['currentMileage'] = $rootScope.lastMileage;  //当前里程数
		$rootScope.CarArr['regDate'] = $rootScope.carRegDate;  //车辆注册日期
		$rootScope.CarArr['carType'] = $rootScope.carType;  //车系(1=社会车, 2=公司车)
		$rootScope.CarArr['color'] = $rootScope.carColor;  //车辆颜色
		
		return $rootScope.CarArr;
	}

	//保险信息(insurance)参数
	$rootScope.SubmitInsuranceInfo = function()
	{
		$rootScope.InsuranceArr = {};
		$rootScope.InsuranceArr['insure'] = $rootScope.insure;   //交强险投保公司名
		$rootScope.InsuranceArr['insureOrderNo'] = $rootScope.insureOrderNo;  //交强险保单号
		$rootScope.InsuranceArr['insureEndTime'] = $rootScope.insureEndTime;  //交强险到期时间: YYYY-MM-DD
		$rootScope.InsuranceArr['VCI'] = $rootScope.vCI;  //商业险投保公司名
		$rootScope.InsuranceArr['VCIOrderNo'] = $rootScope.vCIOrderNo;  //商业险保单号
		$rootScope.InsuranceArr['VCIEndTime'] = $rootScope.vCIEndTime; //商业险到期时间: YYYY-MM-DD
		$rootScope.InsuranceArr['VCIType'] = $rootScope.vCIType; //商业险险种

		return $rootScope.InsuranceArr;
	}

	//项目(item)参数说明
	$rootScope.SubmitItemInfo = function()
	{
		$rootScope.ItemArr = [];
		$rootScope.ItemArrList={};
		$rootScope.ItemArrList['projectName'] = '';   //项目名
		$rootScope.ItemArrList['manHour'] = '';  //工时
		$rootScope.ItemArrList['multiple'] = '';  //工时倍数
		$rootScope.ItemArrList['manHourPrice'] = '';  //工时费
		$rootScope.ItemArrList['discountPrice'] = '';  //折扣金额
		$rootScope.ItemArrList['onePeople'] = ''; //施工人员
		$rootScope.ItemArrList['orderPeople'] = ''; //接单人员
		$rootScope.ItemArrList['twiceSalePeople'] = '';  // 二次销售人员
		$rootScope.ItemArrList['desc'] = '';  //备注
		$rootScope.ItemArrList['projectId'] = '';  //项目ID
		$rootScope.ItemArrList['projectType'] = '';  //项目类型
		$rootScope.ItemArrList['cardNo'] = '';  //卡号
		return $rootScope.CarArr;
	}

	//配件(good)参数
	$rootScope.SubmitGoodInfo = function()
	{
		$rootScope.GoodArr = [];

		$rootScope.GoodArrList = {};

		$rootScope.GoodArrList['fittingsId'] = $rootScope.localCarId;   //工单配件流水号
		$rootScope.GoodArrList['goodName'] = $rootScope.senderName; //配件名
		$rootScope.GoodArrList['goodsId'] = $rootScope.idno;  //配件流水号
		$rootScope.GoodArrList['goodCode'] = $rootScope.vinNo;  //配件编号
		$rootScope.GoodArrList['brandId'] = $rootScope.ctids;  //品牌唯一标识
		$rootScope.GoodArrList['model'] = $rootScope.carModelNo; //型号
		$rootScope.GoodArrList['brandName'] = $rootScope.carModel; //品牌名
		$rootScope.GoodArrList['wp'] = $rootScope.carBrand;  // 库位
		$rootScope.GoodArrList['price'] = $rootScope.carSeries;  //下单售价
		$rootScope.GoodArrList['purchasePrice'] = $rootScope.carYear;  //采购单价
		$rootScope.GoodArrList['buyNum'] = $rootScope.carDis;  //购买数量
		$rootScope.GoodArrList['discountPrice'] = $rootScope.carPrice;  //折扣金额
		$rootScope.GoodArrList['orderPeople'] = $rootScope.engineNo;  //接单人员
		$rootScope.GoodArrList['twiceSalePeople'] = $rootScope.lastMileage;  //二次销售人员
		$rootScope.GoodArrList['desc'] = $rootScope.carRegDate;  //备注
		$rootScope.GoodArrList['urgent'] = $rootScope.vipNo;;  //是否急件：1=急件; 0=普通
		$rootScope.GoodArrList['putoutNum'] = $rootScope.carColor;  //出库数量


		return $rootScope.CarArr;
	}

	//完工备注(remark)参数说明
	$rootScope.SubmitRemarkInfo = function()
	{
		$rootScope.RemarkArr = {};

		$rootScope.RemarkArr['nextUpkeepKilometer'] = '';   //下次保养里程
		$rootScope.RemarkArr['nextUpkeepDate'] = '';  //下次保养时间: YYYY-MM-DD
		$rootScope.RemarkArr['remark'] = '';  //本次完工备注

		return $rootScope.RemarkArr;
	}

	//完销售信息备注(sale)参数说明
	$rootScope.SubmitSaleInfo = function()
	{
		$rootScope.SalekArr = {};

		$rootScope.SalekArr['nextUpkeepKilometer'] = '';   //售卡金额, 售卡业务必传
		$rootScope.SalekArr['nextUpkeepDate'] = '';  //洗车金额
		

		return $rootScope.SalekArr;
	}

	// 工单所有回调方法
	$rootScope.OrderAllFun = function()
	{
		$rootScope.SubmitOrderInfo();
		$rootScope.SubmitCustomerInfo();
		$rootScope.SubmitCarInfo();
		$rootScope.SubmitInsuranceInfo();
		$rootScope.SubmitItemInfo();
		$rootScope.SubmitGoodInfo();
		$rootScope.SubmitRemarkInfo();
		$rootScope.SubmitSaleInfo();
	}
	//工单保存
	$scope.SaveOrder = function()
	{
		alert($rootScope.orderNo);
		$rootScope.status=1;
		$rootScope.flag = 0;
		$rootScope.OrderAllFun();
		$scope.RequestUrl =API_URL+'/customer/ordermaster/submit';
		$scope.Parameter = {
			'token': $rootScope.token,
			'order': $rootScope.orderArr,
			'customer': $rootScope.customerArr,
			'car': $rootScope.CarArr,
			'insurance': $rootScope.InsuranceArr,
			'item': $rootScope.ItemArr,
			'good': $rootScope.GoodArr,
			'remark': $rootScope.RemarkArr,
			'sale': $rootScope.SalekArr,
			'customerId': $rootScope.customerId,
			'localCarId': $rootScope.localCarId,
			'orderNo': $rootScope.orderNo,
			//'force':$rootScope.SubmitOrderInfo;
		};
		
		$.ajax({

		     type: 'POST',

		     url: $scope.RequestUrl ,

		    data: $scope.Parameter ,

		    success: function(data){
		    	console.log(data);
		    } ,

		});



	}


	//分页
	$rootScope.PageNoF = function(PageNoT,page)
	{

		$scope.PageNo = Math.ceil(PageNoT/10);  //总条数
		if( $scope.PageNo <= 1 )
		{
			$scope.IsPage = 0;
		}
		else
		{
			$scope.IsPage = 1;
		}
		$scope.RepeatArr = [];
		
		if( page == undefined )
		{
			page = 1;
		}
		page1= page+4;
		if( page1 > $scope.PageNo)
		{
			page1 = $scope.PageNo;
			page = $scope.PageNo -4;
			if( page <=0 )
			{
				page = 1;
			}
		}
		for (var i = page; i <= page1; i++) 
		{
			$scope.RepeatArr.push(i);
		}
		
		
	}

	//已选配件数组
	$rootScope.selectedData = [];
    //项目添加
    $rootScope.test=[];
	//最终结果数组
	$rootScope.newdata={'data':[]};
	$rootScope.stop=0;
	//新开工单重置
	$scope.changeNum=function () {
		$rootScope.stop=1;
		console.log(1)
	};
	$rootScope.ResetAllData = function(){
		$rootScope.selectedData.length = 0;
		//ocation.url('/index/');  //设置为起始页
	}




	
	
}]);

