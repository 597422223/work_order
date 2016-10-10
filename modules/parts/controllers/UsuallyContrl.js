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
	$scope.BrandPart = function(standardName,brandName,page)
	{
		$scope.RequestUrl ='/customer/stock/searchStockPartInfo';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'customerId':$rootScope.customerId,
			'standardName':standardName,
			'vinNo':$rootScope.vinNo,
			'car_code':$rootScope.car_code,
			'brandName':brandName,
			'page':page,

		});
		var partdata =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
		partdata.success(function(data){
			if( data.status == 1 )
			{
				$scope.brandNameList = data.data.list;
				$scope.PageNo = data.data.total;  //总条数
				if( $scope.PageNo < 10 )
				{
					$scope.IsPage = 0;
				}
				else
				{
					$scope.IsPage = 1;
					$rootScope.PageNoF($scope.PageNo);
					

				}
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
	$scope.brandsearch= function(standardName,brandName)
	{
		console.log(standardName);
		$scope.standardName = standardName;
		$scope.RequestUrl ='/customer/stock/stockBrandName';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'standardName':standardName
		});
		var branddata =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
		branddata.success(function(data){
			$scope.UsuallyPartBrand = data.data.list;
		})

		$scope.BrandPart(standardName,brandName);

	}
	$scope.brandsearch();

	//分页
	$rootScope.PageNoF = function()
	{
		var AllPageNo = Math.ceil($scope.PageNo/10)
		if( AllPageNo >= 5 )
		{
			var a_html='';
			for (var i = 1; i < 6; i++) {
				a_html = a_html + '<a>'+i+'</a>'
			}
		}
		else
		{
			var a_html='';
			for (var i = 1; i < AllPageNo; i++) {
				a_html = a_html + '<a>'+i+'</a>'
			}
		}
		$('.tab-module .ep-pages section').html(a_html);
	}
	

	





	








}]);








