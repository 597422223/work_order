var app = angular.module('nowbook');
app.controller('nowbookCtrl', ['$scope','$http','RequestService',function($scope,$http,RequestService) {
	//根据会员账号查找客户信息
	$scope.token = $('.list-cardNum').attr('token');
	$scope.vipNo = 1;

	
	//违章、年检、保险、保养
	$scope.IllegalAll = function(localCarId,customerId)
	{
		$scope.RequestUrl ='/car/chewu/summary';
		$scope.Parameter = $.param({
			'token':$scope.token,
			'localCarId':$scope.localCarId,
			'customerId':$scope.customerId,
		});
		$scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
		$scope.data.success(function(data) {
			
			if( data.status == 1 )
			{
				//AddTree(data);
			}
			else
			{
				alert('不存在违章信息');
			}
		});
	}
	

	
}]);

