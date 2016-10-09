var app = angular.module('myApp');  
app.controller('AllCtrl', ['$scope','$rootScope','$http','RequestService','$location',function($scope,$rootScope,$http,RequestService,$location) {
	$rootScope.orderNo = $location.search().orderNo; 
	$rootScope.token = RequestService.getCookie('token');
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
				//console.log(data.data);
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

				$rootScope.IllegalAll($scope.localCarId,$scope.customerId);
			}

		})
	}  

}]);

