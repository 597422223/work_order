var app = angular.module('myApp');  
app.controller('SelectedPart', ['$scope','$rootScope','$http','$location','RequestService',function($scope,$rootScope,$http,$location,RequestService) {
	
	//已有工单号
	if( $rootScope.orderNo )
	{
		$rootScope.NoOrderNo = 1;  //工单号是否存在
		$scope.RequestUrl ='/customer/ordermaster/fittings';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'orderNo':$rootScope.orderNo,
		});
		$scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
		$scope.data.success(function(data) {
			if( data.status == 1 )
			{
				//已选配件
				var Selected_list =
				{
					"list":[
						
					]	
				}
				$.each(data.data,function(index,value){
					var each_list = {};
					$.each(data.data[index],function(index,value){
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
						}
						each_list[index] = value;
					})
					Selected_list.list.push(each_list);
				})
				$scope.SelectedList = Selected_list.list;



			}
		})
	}
	else
	{
		$rootScope.NoOrderNo = 0; //工单号是否存在
	}


	$scope.$on('$viewContentSelected', function() {  
        alert(111);
    });


}]);



