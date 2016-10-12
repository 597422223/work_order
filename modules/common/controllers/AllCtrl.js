var app = angular.module('myApp');  
app.controller('AllCtrl', ['$scope','$rootScope','$http','RequestService','$location',function($scope,$rootScope,$http,RequestService,$location) {
	$rootScope.orderNo = $location.search().orderNo; 
	$rootScope.token = RequestService.getCookie('token');
	$rootScope.selectedReady = 1;
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
				console.log($rootScope.customerId)
				$.each(data.data.insurance,function(index,value){
					$rootScope[index] = value;
				})
				$.each(data.data.order,function(index,value){
					$rootScope[index] = value;
				})
				$rootScope.IllegalAll($scope.localCarId,$scope.customerId);
			}

		})
	}  

	//工单信息(order)参数
	$rootScope.order = [];
	$rootScope.SubmitOrderInfo = function()
	{
		// order[''] = $rootScope.;
		$rootScope.order['flag'] = 0;   //工单类型
		$rootScope.order['status'] = 4;  //状态
		$rootScope.order['orderType'] = 1;  //默认1
		$rootScope.order['senderName'] = $rootScope.senderName;   //送修人姓名
		$rootScope.order['senderPhone'] = $rootScope.senderPhone;  //送修人电话
		$rootScope.order['orderSourceId'] = $rootScope.orderSourceId; //用户来源ID
		$rootScope.order['orderSourceInfo'] = $rootScope.orderSourceInfo; //用户来源详情
		$rootScope.order['orderSourceInfoId'] = $rootScope.orderSourceInfoId;  //用户来源详情ID   未知  
		$rootScope.order['orderPeople'] = '';  //接单人ID
		$rootScope.order['orderPeopleName'] = $rootScope.pickPeople;  // 接单人姓名
		$rootScope.order['pickPeople'] = '';  //接车人ID
		$rootScope.order['pickPeopleName'] = $rootScope.pickPeople;  //接车人ID
		$rootScope.order['getInTime'] = ''; //进场时间
		$rootScope.order['desc']= ''; //施工备注
		$rootScope.order['completeTime'] = ''; //完工时间
		$rootScope.order['bookType'] ='';  //预约类型
		$rootScope.order['bookTypeName'] = '';  //预约类型名
		$rootScope.order['bookPeople'] = ''; //预约人ID
		$rootScope.order['bookPeopleName'] = ''; //预约人姓名
		$rootScope.order['bookGetInTime'] = ''; //预约到店时间
		$rootScope.order['exceptedEndTime'] = ''; // 期望完成时间

		return $rootScope.order;
	}

	//工单保存
	$scope.SaveOrder = function()
	{
		$rootScope.order['status'] = 0;
		console.log($rootScope.SubmitOrderInfo());
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


	//新开工单重置
	$rootScope.ResetAllData = function(){
		$rootScope.selectedData.length = 0;
		$location.url('/index/parts/selected');  //设置为起始页
	}




	
	
}]);

