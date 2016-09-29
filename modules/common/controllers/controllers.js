var app = angular.module('myApp');
app.controller('commonCtrl', ['$scope','$http','RequestService',function($scope,$http,RequestService) {
	//根据会员账号查找客户信息
	$scope.token = $('.list-cardNum').attr('token');
	$scope.vipNo = 12345678;
	$scope.scan = function(){
		if($scope.vipNo)
		{	
			$scope.RequestUrl ='/customer/customer/exists';
			$scope.Parameter = $.param({
				'token':$scope.token,
				'vipNo':$scope.vipNo,
			});
			$scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
			$scope.data.success(function(data) {
				if( data.status == 1 )
				{
					
					$.each(data.data[0],function(index,value){
						$scope[index] = value;
					})
					//送修人信息
					$.each(data.data[0].history,function(index,value){
						$scope[index] = value;
					})
					//违章、年检、保险、保养
					$scope.IllegalAll($scope.localCarId,$scope.customerId);
				}
				else
				{
					alert('不存在此会员');
				}
			});
		}
		
		$scope.VipVal = false;
	}
	
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
				//违章次数
				$scope.wz_total = data.data['wz']['wz_total'];
				var wz_list =
				{
					"list":[
						
					]	
				}
				$.each(data.data['wz'].wz_list,function(index,value){
					var each_list = {};
					$.each(data.data['wz'].wz_list[index],function(index,value){
						if(	index == 'handled' )
						{
							if( value == 0 )
							{
								value='未处理';
							}
							if( value == 1 )
							{
								value='处理';
							}
							if( value == 2 )
							{
								value='未知';
							}
						}
						if(	index == 'code' )
						{
							if(value == '')
							{
								value='/';
							}
						}
						
						each_list[index] = value;
					})
					wz_list.list.push(each_list);
					
				})
				$scope.wzlist = wz_list.list;
				console.log($scope.wzlist);

				//年检
				$.each(data.data['inspection'].data,function(index,value){
					$scope[index] = value;
				})

				//保险
				$.each(data.data['insurance'].data,function(index,value){
					$scope[index] = value;
				})

				//保养
				if( data.data['keep'].status == 1 )
				{
					$.each(data.data['keep'].data,function(index,value){
						$scope[index] = value;
					})
				}
				
				
		
			}
			else
			{
				alert('不存在违章信息');
			}
		});
	}
	
	//vip账号联想
	$scope.VipKeyUp = function()
	{
		if( $scope.vipNo )
		{
			$scope.RequestUrl ='/customer/customer/exists';
			$scope.Parameter = $.param({
				'token':$scope.token,
				'vipNo':$scope.vipNo,
			});
			$scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
			$scope.data.success(function(data) {
				if( data.status == 1 )
				{
					$scope.ItemVIpNo = [];
					$.each(data.data,function(index,value){
						$.each(data.data[index],function(index,value){
							if( index == 'vipNo' )
							{
								$scope.ItemVIpNo.push(value);
							}
						})
					})
					$scope.VipVal = true;
				}
				else
				{
					$scope.VipVal = false;
				}
			});
		}
		else
		{
			$scope.VipVal = false;
		}
	}
	
	
}]);

