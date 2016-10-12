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








