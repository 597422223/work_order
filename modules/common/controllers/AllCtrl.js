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

}]);

