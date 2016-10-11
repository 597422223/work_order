var app=angular.module("myApp",[]);
app.controller("FastCtrl",['$scope','$rootScope','$http','RequestService',"myService",function($scope,$rootScope,$http,RequestService,myService){
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
		                   	fastAry.push(data.data.list[index]);
		                   jsondata[fastNameary[key]]=1;
		                   unmInedx=1;
	               		}
					});
					var isActive = 'isActive'+index;
					if($rootScope[isActive] )
					{
						$rootScope[isActive] = '';
					}
					else
					{
						$rootScope[isActive] = 'list-border';
					}

					myService.set(fastAry);	
				}
		});
		
	};
	fastbill();


	
}]);
