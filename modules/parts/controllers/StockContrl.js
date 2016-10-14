var app = angular.module('myApp');  
app.controller('StockContrl', ['$scope','$rootScope','$http','$location','RequestService',function($scope,$rootScope,$http,$location,RequestService) {
	//本地库存查询
	$scope.StockKuCun = function(StockFenlei,standardName,brandName,page)
	{
		
		$scope.brandName = brandName;
		$scope.page = page;

		$scope.brandName = '';	
		$scope.RequestUrl ='/customer/stock/searchStockPartInfo';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'customerId':$rootScope.customerId,
			'brandId':$scope.brandId,
			'standardName':$scope.standardName,
			'goods_class':$scope.goods_class,
			'brandName':$scope.brandName,
			'car_code':$scope.car_code,
			'vinNo':$rootScope.vinNo,
			'keyWord':$scope.keyWord,
			'page':$scope.page,
			'pagesize':10,
		});
		$scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
		$scope.data.success(function(data) {
			if( data.status == 1 )
			{
				if( data.data.list.length >= 1 )
				{
					$scope.StockStock = data.data.list;
					$rootScope.PageNoF(data.data.total,page); //分页
					$scope.StockIf = 1;
				}
				else
				{
					$scope.StockIf = 0
				}
			}
		})
	}

	//品牌
	$scope.StockBrand = function(standardName)
	{
		$scope.standardName = standardName;
		$scope.brandName = '';


		$scope.RequestUrl ='/customer/stock/stockBrandName';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'standardName':$scope.standardName,
			'goods_class':$scope.goods_class,
			'car_code':$scope.car_code,
			'vinNo':$rootScope.vinNo,
		});
		$scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
		$scope.data.success(function(data) {
			if( data.status == 1 )
			{
				$scope.StockPingPai = data.data.list;
			}
			
		})
		$scope.StockKuCun();  //本地库存查询
		
	}


	//类型
	$scope.StockLeiXingF = function(StockFenlei)
	{
		

		$scope.goods_class = StockFenlei;  //分类名称
		$scope.standardName = '';
		$scope.brandName = '';



		$scope.RequestUrl ='/customer/stock/stockStandardName';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'goods_class':$scope.goods_class,
			'car_code':$scope.car_code,
			'vinNo':$rootScope.vinNo,
		});
		$scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
		$scope.data.success(function(data) {
			if( data.status == 1 )
			{
				$scope.StockLeiXing = data.data.list;
			}
			
		})
		$scope.StockBrand();  //品牌
		
	}

	
	//分类
	$scope.StockClass = function()
	{

		$scope.RequestUrl ='/goods/category/all';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
		});
		$scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
		$scope.data.success(function(data) {
			if( data.status == 1 )
			{
				$scope.StockFenlei = data.data;
			}
			
		})

		$scope.StockLeiXingF();  //类型


	}
	$scope.StockClass();



	//添加新配件到已选
	$scope.AddSelectedArr = [];  //将已添加的配件下标加入数组
	$rootScope.AddSelectedData = function(index)
	{

		var yi = true;
		$.each($scope.AddSelectedArr,function(xia,value){

			if( index == $scope.AddSelectedArr[xia] )
			{
				$scope.StockStock[index]['buyNum'] =parseInt($scope.StockStock[index]['buyNum'])+  1;
				$scope.StockStock[index]['discountPrice'] =  $scope.StockStock[index]['buyNum'] *$scope.StockStock[index]['goodsSalePrice'] ;
				yi = false;
			}
		})
		if(yi)
		{
			$scope.StockStock[index]['status'] = 0; 
			$scope.StockStock[index]['fittingsId'] = 0;
			$scope.StockStock[index]['urgent'] = 0;
			$scope.StockStock[index]['orderPeople'] = $rootScope.pickPeople;
			$scope.StockStock[index]['twiceSalePeople'] = $rootScope.pickPeople;
			$scope.StockStock[index]['putoutNum'] = 0;
			$rootScope.selectedData.push( $scope.StockStock[index]);
			$scope.AddSelectedArr.push(index);
		}
		
	}


	

	








}]);








