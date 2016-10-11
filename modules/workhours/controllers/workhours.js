var app = angular.module('myApp');
app.controller('workconl', ["$scope",'$rootScope',"$http","workServicUserInfo",'myService',function($scope,$rootScope,$http,workServicUserInfo,myService) {
   var newdata=[];//最终结果数组
   var newdataLen=[];//项目名称和项目ID
   var Arry=[];//模糊判断数组
   var jsondata={};//去重对象
   var dataname=[];//项目名称
   var unmInedx;//是否存在的条件
   $scope.setValue=function(index){
		var val=$.trim($(".tit-search-xia li").eq(index).text());		
		$scope.entryName=val;
	};
   $scope.addbtn=function()	{
	   $scope.RequestUrl ='/customer/project/query';
	   $scope.Parameter = $.param({
		   'token':$rootScope.token,
		   'projectType':0,
	   });
	   $scope.data =myService.ReturnData($scope.RequestUrl,$scope.Parameter);
	   $scope.data.success(function(data){
	   		if(data.status==1){
	   			console.log(data.data.list);
				$.each(data.data.list, function (i, v){					
					if($scope.entryName==v.projectName||$scope.entryName==v.projectID){
						newdataLen.push(v.projectName+v.projectID);
						dataname.push(data.data.list[i]);
					} 		
				});
				$.each(newdataLen, function(k,n) {
					if(!jsondata[newdataLen[k]]){
	                   newdata.push(dataname[k]);
	                   jsondata[newdataLen[k]]=1;
               		}else{
	               			unmInedx=0;
	               		}
					});
				if(unmInedx==0){
					alert("项目已添加");
				}
				$scope.names=newdata;
	   		}
	   		
		}	   	
   	)};
	$scope.names=myService.get();
    $scope.Worksearch=function(){
	   	var data=workServicUserInfo.projectName();
	   	data.success(function(data){
	   		console.log(data);
	   	});
    };
    $scope.shanchu=function(index){
    	var  delDate=$scope.names;
    	console.log(delDate[index]);
    	console.log()
    	
    };
    //联想    
    $scope.workeyup = function(){
		if( $scope.entryName )
		{
			var data=workServicUserInfo.workInfo();	 
			data.success(function(data) {
				if( data.status == 1 )
				{
					$scope.ItemProjact = [];
					$.each(data.data.list,function(index,value){
						$.each(data.data.list[index],function(index,value){							
							if( index == 'projectName')
							{
								Arry.push(value);
								
								$.each(Arry, function(k,v) {
									if(Arry[k].indexOf($scope.entryName)!=-1){
										$scope.ItemProjact.push(Arry[k]);
									}
								});
							}
						})
					});
					$scope.workPro = true;
				}
				else
				{
					$scope.workPro = false;
				}
			});
		}
		else
		{
			$scope.workPro = false;
		}
	};
	//选择项目
	$scope.Worksearch=function(){
		var data=workServicUserInfo.workInfo();
		data.success(function(data){
				if(data.status==1){
					$scope.projectTy=[];
					$.each(data.data.list, function (i, v){
						// if($scope.entryName==v.projectName||$scope.entryName==v.projectID){
						// 	newdataLen.push(v.projectName+","+v.projectID);
						// 	dataname.push(data.data.list[i]);
						// 	console.log(dataname);
						// }
						$.each(data.data.list[i],function(index,value){
							if( index == 'projectName')
							{
								Arry.push(value);
								dataname.push(data.data.list[i]);
								// console.log(Arry);
								$.each(Arry, function(k,v) {
									if(Arry[k].indexOf($scope.entryName)!=-1){
										if(dataname[k]!=undefined){
											newdataLen.push(dataname[k]);
										}
									}
								});
							}
						})
					});
					$.each(newdataLen, function(k,n) {
						if(!jsondata[n.projectID]){
							newdata.push(n);
							jsondata[n.projectID]=1;
						}
					});

					$scope.projectTy=newdata;
					console.log(newdata);
				}
			}
		)};
//	项目列表
	var projectTypeId=function () {
		var name=[];
		var num=[];
		$scope.RequestUrl ='/customer/configure/project';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
		});
		$scope.data =myService.ReturnData($scope.RequestUrl,$scope.Parameter);
		$scope.data.success(function (data) {
			if (data.status==1){
				$.each(data.data.type,function (key,value) {
					name.push(value);
					num.push(key);
				});
				$scope.projectTypeId=name;
				$scope.projectTypeName=function (index) {
					$scope.RequestUrl ='/customer/project/query';
					$scope.Parameter = $.param({
						'token':$rootScope.token,
						"projectTypeId":num[index],
						'projectType':0,
					});
					$scope.data =myService.ReturnData($scope.RequestUrl,$scope.Parameter);
					$scope.data.success(function (data) {
						if (data.status == 1) {
							$scope.projectTy=data.data.list
							console.log(data.data.list);
						}
					});
				}
			}
		});
	};
projectTypeId();


  // 韩盼盼 当前预约数据添加10-9
	// $scope.projectAdd=myService.get().projectAdd;
	// end

}]);