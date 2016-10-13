var app = angular.module('myApp');  
app.controller('SelectedPart', ['$scope','$rootScope','$http','$location','RequestService',function($scope,$rootScope,$http,$location,RequestService) {

	//查询已选插件数据
	$rootScope.searchSelectData =function()
	{
			var Selected_list =
				{
					"list":[]	
				};

			var discountPrice =0;  //所有配件总金额

			$.each($rootScope.selectedData,function(index,value){
				var each_list = {};
				$.each($rootScope.selectedData[index],function(index,value){
					if( index == 'status' )
					{
						if( value == 1 )
						{
							value='已保存';
						}
						if( value == 2 )
						{
							value='已出库';
						}
						if(  value == 0)
						{
							value='未出库';
						}
					}
					if( index == 'discountPrice'  )
					{
						discountPrice = discountPrice + value
					}
					each_list[index] = value;
				})
				Selected_list.list.push(each_list);
			})

			$scope.selectedLength =  Selected_list.list.length;
			$scope.discountPrice = discountPrice.toFixed(2);
			$scope.SelectedList = Selected_list.list;

			//向GoodArr数组提交
			console.log($rootScope.selectedData);
			// if( $rootScope.selectedData.length >= 1 )
			// {
			// 	$rootScope.SubmitGoodInfo (); //配件(good)参数
			// 	$.each($rootScope.selectedData,function(index,value){
			// 		$rootScope.GoodArrList['fittingsId']= $rootScope.selectedData[index]['fittingsId'] ;   
			// 		$rootScope.GoodArrList['goodName'] = $rootScope.selectedData[index]['goodsName'] ; 
			// 		$rootScope.GoodArrList['goodsId']= $rootScope.selectedData[index]['goodsId'];  
			// 		$rootScope.GoodArrList['goodCode']= $rootScope.selectedData[index]['goodsCode'];  
			// 		$rootScope.GoodArrList['brandId']= $rootScope.selectedData[index]['brandId'];  
			// 		$rootScope.GoodArrList['model'] = $rootScope.selectedData[index]['model']; 
			// 		$rootScope.GoodArrList['brandName']= $rootScope.selectedData[index]['brandName']; 
			// 		$rootScope.GoodArrList['wp']= $rootScope.selectedData[index]['wp'];  
			// 		$rootScope.GoodArrList['price']= $rootScope.selectedData[index]['price'];  
			// 		$rootScope.GoodArrList['purchasePrice']= $rootScope.selectedData[index]['purchasePrice'];  
			// 		$rootScope.GoodArrList['buyNum']= $rootScope.selectedData[index]['buyNum']; 
			// 		$rootScope.GoodArrList['discountPrice']= $rootScope.selectedData[index]['discountPrice'];  
			// 		$rootScope.GoodArrList['orderPeople']= $rootScope.selectedData[index]['orderPeople'];  
			// 		$rootScope.GoodArrList['twiceSalePeople']= $rootScope.selectedData[index]['twiceSalePeople']; 
			// 		$rootScope.GoodArrList['desc']= $rootScope.selectedData[index]['desc']; 
			// 		$rootScope.GoodArrList['urgent']= $rootScope.selectedData[index]['urgent'];
			// 		$rootScope.GoodArrList['putoutNum']= $rootScope.selectedData[index]['putoutNum']; 
			// 		$rootScope.GoodArr.push($rootScope.GoodArrList);
			// 		console.log($rootScope.GoodArr);
			// 		return;

			// 	})
			// }

	}



	if( $rootScope.orderNo &&  $rootScope.selectedReady == 1)  //判断有无工单号
	{
		$rootScope.NoOrderNo = 1;
		$scope.RequestUrl ='/customer/ordermaster/fittings';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'orderNo':$rootScope.orderNo,
		});
		$scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
		$scope.data.success(function(data) {
			if( data.status == 1 )
			{
				$rootScope.selectedData = data.data;
				alert($rootScope.orderNo);
				$rootScope.searchSelectData();
				$rootScope.selectedReady = 0;
			}
		})
	}
	else  //无工单号
	{

		if($rootScope.selectedData.length >=1) //selectedData数组有数据
		{
			$rootScope.NoOrderNo = 1;
			$rootScope.searchSelectData();
		}
		else //selectedData数组无数据
		{
			$rootScope.NoOrderNo = 0;
		}

	}



	//删除已选项目
	$scope.SelectedDel = function(index)
	{

		$('.overtime-content1 table tbody tr[lang = '+index+']').remove();
		$rootScope.selectedData.splice(index,1); 
		$scope.selectedLength = $('.overtime-content1 table tbody tr').length;
		var SumMoney = 0;
		$('.SumMoney').each(function(){
			SumMoney = SumMoney + parseFloat(this.value);
		})
		$scope.discountPrice = SumMoney;

		if( $scope.selectedLength == 0 )
		{
			$rootScope.NoOrderNo = 0; 
		}
		else
		{
			$rootScope.NoOrderNo = 1; 
		}

	}


	//修改已选配件信息
	$rootScope.selectedModify = function(index,name,value)
	{		
		$rootScope.selectedData[index][name]=value; 
		console.log($rootScope.selectedData[index][name]);
	}

	//获取员工名称
	$rootScope.CustomerName(1);


	








}]);








