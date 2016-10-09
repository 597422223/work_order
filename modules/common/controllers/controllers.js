var app = angular.module('myApp');
app.controller('commonCtrl', ['$scope','$rootScope','$http','RequestService','myService',function($scope,$rootScope,$http,RequestService,myService) {


	//$rootScope.vipNo = 12345678;
	//根据会员账号查找客户信息
	$scope.scan = function(){
		if($scope.vipNo)
		{	
			$scope.RequestUrl ='/customer/customer/exists';
			$scope.Parameter = $.param({
				'token':$rootScope.token,
				'vipNo':$scope.vipNo,
			});
			$scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
			$scope.data.success(function(data) {
				if( data.status == 1 )
				{
					$.each(data.data[0],function(index,value){
						$scope[index] = value;
					})
					$scope.VCITypesChecked = $scope.vCIType.split(",");
					$.each($scope.VCITypesChecked,function(index,value){
						$scope.VCITypesCheckedVal = value;
						$('#VCITypes input[type=checkbox]').each(function(){
							$scope.VCITypesAll = this.value;
							if( $scope.VCITypesCheckedVal  == $scope.VCITypesAll )
							{
									$(this).prop('checked','true');
							}
						})
					})


					//送修人信息
					$.each(data.data[0].history,function(index,value){
						if( index == 'orderSourceId' )
						{
							if( value == 0 )
							{
								value = '';
							}
							if( value ==3 )
							{
								value = '员工';
							}
							if( value ==4 )
							{
								value = '老带新';
							}
							if( value ==7 )
							{
								value = 'ewvev';
							}
						}
						$scope[index] = value;
					})
					
					//违章、年检、保险、保养
					$rootScope.IllegalAll($scope.localCarId,$scope.customerId);
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
	$rootScope.IllegalAll = function(localCarId,customerId)
	{
		$scope.RequestUrl ='/car/chewu/summary';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
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
				//违章详情
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
					$.each(data.data['keep'],function(index,value){
						$scope[index] = value;
					})
				}

				//上次完工备注
				if( data.data['history'].order )
				{
					$.each(data.data['history'].order,function(index,value){

						if( index == 'remark')
						{
							if( value != '' )
							{
								$scope.WgRemark= value;
							}
							else
							{
								$scope.WgRemark = '上次完工无备注';
							}
						}
						
					})
				}
				else
				{
					$scope.WgRemark = '上次完工无备注';
				}
			}
			else
			{
				alert('不存在违章信息');
			}
		});
	}
	
	//vip账号联想
	$scope.VipKeyUp = function ()
	{
		if( $scope.vipNo )
		{
			$scope.RequestUrl ='/customer/customer/exists';
			$scope.Parameter = $.param({
				'token':$rootScope.token,
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
	

	//配置信息
	$scope.cartype =function()
	{
		$scope.RequestUrl ='/customer/configure/index';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
		});
		$scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
		$scope.data.success(function(data) {
			if( data.status == 1 )
			{
				//员工
				$scope.EmployeeItime =data.data.employee;
				//车辆颜色
				$scope.CarColorItime =data.data.color;
				//车牌类型
				$scope.CarPlateNumberType =data.data.plateNumberType;
				//客户来源
				$scope.CustomerorderSource =data.data.orderSource;
				//保险投保公司
				$scope.InsuranceItme = data.data.insurance.vci;
				//保投险种
				$scope.InsuranceItmeType= data.data.insurance.vciType;
			}
			
		})
	}

	$scope.IfCustomerSource = false;
	//客户来源  
	$scope.CustomerSourceLi = function(CustomerSource,typeSource)
	{
		if( typeSource == 1 )
		{
			$scope.IfCustomerSource = true;
			if(  CustomerSource == 'ewvev')
			{
				$scope.orderSourceInfo = '无';
				$scope.IfCustomerSource = false;
			}

			if( CustomerSource == '员工')
			{
				$scope.orderSourceInfo = "";
				$scope.CustomerName(1);
			}

			if( CustomerSource == '老带新' )
			{
				$scope.orderSourceInfo = "";
				$scope.CustomerName(2);
			}
			$scope.orderSourceId =  CustomerSource;
		}
		else
		{
			$scope.orderSourceInfo =  CustomerSource;
		}

	}



	//客户员工
	$scope.CustomerName = function(type)
	{
		$scope.RequestUrl ='/customer/configure/employee';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'type':type,
		});
		$scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
		$scope.data.success(function(data) {
			$scope.orderSourceInfoItme =data.data;
			
		})
		
	}
	
	//初始化信息
	$scope.$on('$viewContentLoaded', function() {  
        $scope.cartype();
    });
	


//快速开单
  var fastbill=function(){
    var fastAry=[];//项目
    var fastNameary=[];//项目名称
    var jsondata={};
    var unmInedx;
    $scope.RequestUrl ='/customer/project/quick';
    $scope.Parameter = $.param({
      "token":"3c25a936a9e06c16f62cecb0d13c6282",
      'localCarId':18,
      'carDis':2.4,
    });
    $scope.data=RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
    $scope.data.success(function(data){
        $scope.fastName=data.data.list;            
        $scope.fast_project=function(index){
          fastNameary.push(data.data.list[index].projectName);        
          $.each(fastNameary,function(key,value){
            if(!jsondata[fastNameary[key]]){
                         fastAry.push(data.data.list[index])
                       jsondata[fastNameary[key]]=1;
                       unmInedx=1;
                     }
          });
          myService.set(fastAry);
          
        }
    });
  }
  fastbill();
  
}]);















