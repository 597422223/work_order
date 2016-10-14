var app = angular.module('myApp');  
app.controller('StockContrl', ['$scope','$rootScope','$http','$location','RequestService',function($scope,$rootScope,$http,$location,RequestService) {

	//分类
	$rootScope.StockClass = function()
	{
		$scope.RequestUrl ='/customer/stock/stockBrandName';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'orderNo':$rootScope.orderNo,
		});
		$scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
	}
	








}]);








