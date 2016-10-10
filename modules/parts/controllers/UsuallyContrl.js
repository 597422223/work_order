var app = angular.module('myApp');  
app.controller('UsuallyContrl', ['$scope','$rootScope','$http','RequestService',function($scope,$rootScope,$http,RequestService) {
	
	//常用配件
	$scope.RequestUrl ='/customer/configure/standards';
	$scope.Parameter = $.param({
		'token':$rootScope.token,
	});
	var comdata =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
	comdata.success(function(data){
		$scope.UsuallyPartName = data.data.recommend;  //常用配件名称
	})




	//选择品牌配件
	$scope.BrandPart = function(brandName,standardName)
	{
		$scope.RequestUrl ='/customer/stock/searchStockPartInfo';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'customerId':$rootScope.customerId,
			'standardName':brandName,
			'vinNo':$rootScope.vinNo,
			'car_code':$rootScope.car_code,
		});
		var partdata =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
		partdata.success(function(data){
			if( data.status == 1 )
			{
				$scope.brandNameList = data.data.list;
				if( $scope.brandNameList.length >= 1)
				{
					$scope.PartListNo= 1;
				}
				else
				{
					$scope.PartListNo= 0;
				}
			}
		})
	}
	$scope.BrandPart();


	//选择配件品牌
	$scope.PartCheckBrand = function(standardName)
	{
		$scope.brandsearch(standardName);
	}


	//品牌查询
	$scope.brandsearch= function(standardName)
	{
		$scope.RequestUrl ='/customer/stock/stockBrandName';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'standardName':standardName
		});
		var branddata =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
		branddata.success(function(data){
			$scope.UsuallyPartBrand = data.data.list;
			console.log($scope.UsuallyPartBrand);
		})

		$scope.BrandPart(standardName,standardName);

	}
	$scope.brandsearch();


	

	





	








}]);








