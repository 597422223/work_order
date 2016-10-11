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
	$scope.BrandPart = function(standardName,brandName,page,pagesize)
	{

		$scope.RequestUrl ='/customer/stock/searchStockPartInfo';
		$rootScope.standardNameP = standardName;
		$rootScope.brandNameP = brandName;
		
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'customerId':$rootScope.customerId,
			'standardName':$rootScope.standardNameP,
			'vinNo':$rootScope.vinNo,
			'car_code':$rootScope.car_code,
			'brandName':$rootScope.brandNameP,
			'page':page,
			'pagesize':pagesize,

		});
		var partdata =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
		partdata.success(function(data){
			if( data.status == 1 )
			{
				$scope.brandNameList = data.data.list;
				console.log($scope.brandNameList);
				$rootScope.PageNoF(data.data.total,page); //分页

				if( $scope.brandNameList.length >= 1)
				{
					$scope.PartListNo= 1;
					$scope.IsPage = 1;
				}
				else
				{
					$scope.PartListNo= 0;
					$scope.IsPage = 0;
				}
			}
			else
			{
				$scope.brandNameList =[];
				$scope.PartListNo= 0;
				$scope.IsPage = 0;
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
	$scope.brandsearch= function(standardName,brandName)
	{
		$scope.standardName = standardName;
		$scope.RequestUrl ='/customer/stock/stockBrandName';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'standardName':standardName
		});
		var branddata =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);

		branddata.success(function(data){
			if( data.status == 1 )
			{
				$scope.UsuallyPartBrand = data.data.list;
			}
			else
			{
				$scope.UsuallyPartBrand = [];
			}
		})

		$scope.BrandPart(standardName,brandName);

	}
	$scope.brandsearch();

	
	

	





	








}]);








