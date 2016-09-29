var app = angular.module('myApp');
app.controller('workconl', ["$scope","$http","workServicUserInfo",function($scope,$http,workServicUserInfo) {
   var newdata=[];
   var newdataLen=[];
   $scope.addbtn=function()	{  
   	var data=workServicUserInfo.workInfo();	 
	   	data.success(function(data){
	   		if(data.status==1){
				$.each(data.data, function (i, v){ 
					if($scope.entryName==v.projectName){
						newdataLen.push(v.projectName);
						if (newdataLen.length>1) {
							alert("项目已存在")
						} else{							
							newdata.push(data.data[i]);
						}						
					} 		
				})
				$scope.names=newdata;				
	   		}	   		
		}
   	)}

    $scope.Worksearch=function(){
	   	$scope.token = $('.tit-search-list').attr('token');	
		$scope.Parameter = $.param({
			'token':$scope.token,
			'localCarId':1,
			'projectType':0,
		});
		$scope.data =workServicUserInfo.projectaddName($scope.RequestUrl,$scope.Parameter);
		$scope.data.success(function(data) {	
			if( data.status == 1 )
			{
				$.each(data.data, function (i, v){ 
					if($scope.entryName==v.projectName){
						newdataLen.push(v.projectName);
						if (newdataLen.length>1) {
							alert("项目已存在")
						} else{							
							newdata.push(data.data[i])
						}						
					} 		
				})
				$scope.names=newdata;	
			}
			else
			{
				alert('不存在违章信息');
			}
		});
    }
}]);