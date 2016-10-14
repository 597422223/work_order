var app = angular.module('myApp');
app.controller('workconl', ["$scope",'$rootScope',"$http","workServicUserInfo",'myService',function($scope,$rootScope,$http,workServicUserInfo,myService) {
	var newdataLen=[];//项目名称和项目ID
	var Arry=[];//模糊判断数组
	var jsondata={};//去重对象
	var dataname=[];//项目名称
	var unmInedx;//是否存在的条件
	var TypeArry=[];//选择项目添加
	$scope.setValue=function(index){
		var val=$.trim($(".tit-search-xia li").eq(index).text());
		$scope.entryName=val;
	};
	// 已有项目
	if ($rootScope.orderNo){
		$scope.RequestUrl ='/customer/ordermaster/projects';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'orderNo':$rootScope.orderNo,
		});
		if($rootScope.gongshiReady == 1 )
		{
			$scope.data =myService.ReturnData($scope.RequestUrl,$scope.Parameter);
			$scope.data.success(function (data) {
				if (data.status==1){
					$.each(data.data,function (key,value) {
						$rootScope.newdata.data.push(value);
						$scope.howMany=$rootScope.newdata.data.length
					});
					$.each($rootScope.newdata.data,function (key,value) {
						$scope.HowMuch=parseInt($rootScope.newdata.data[key].discountPrice);

					})

				}
			});
			$rootScope.gongshiReady = 0;
		}
	}else {

	}
	//点击搜索
	$scope.addbtn=function(){
		console.log($rootScope.priceTypes);
		$scope.RequestUrl ='/customer/project/query';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'projectType':0,
		});
		$scope.data =myService.ReturnData($scope.RequestUrl,$scope.Parameter);
		$scope.data.success(function(data){
				if(data.status==1){
					$.each(data.data.list, function (i, v){
						if($scope.entryName==v.projectName||$scope.entryName==v.projectID){
							newdataLen.push(v.projectName+v.projectID);
							dataname.push(data.data.list[i]);
						}
					});
					$.each(newdataLen, function(k,n) {
						if(!jsondata[newdataLen[k]]){
							$rootScope.newdata.data.push(dataname[k]);
							jsondata[newdataLen[k]]=1;
						}else{
							unmInedx=0;
						}
					});
					if(unmInedx==0){
						alert("项目已添加");
					}
				}

			}
		)};
	//其他页面传来的数据
	function Passsuccess() {
		$scope.howMany=$rootScope.newdata.data.length
		$.each($rootScope.newdata.data, function(k,n) {
			if(!jsondata[n.projectID]){
				$rootScope.test.push(n);
				jsondata[n.projectID]=1;
			}
		});
		$scope.names=$rootScope.newdata.data;
	}
	Passsuccess();
	$scope.shanchu=function (index) {
		$rootScope.newdata.data.splice(index,1);
		console.log(1);
	};
	//数据修改
	$rootScope.workHours = function(index,name,value)
	{
		$rootScope.newdata.data[index][name]=value;
		console.log(value);
	};
	//施工人员
	$(document).on("change",".onePeople",function () {
		var self=this;
		console.log($(this).val());
		$.each($rootScope.newdata.data,function (key,value) {
			$rootScope.newdata.data[key].onePeople=$(self).val()
		})
	});
	//二次销售
	$(document).on("change",".twiceSalePeople",function () {
		var self=this;
		console.log($(this).val());
		$.each($rootScope.newdata.data,function (key,value) {
			$rootScope.newdata.data[key].twiceSalePeople=$(self).val()
		})
	});
	//施工提成人
	$(document).on("change",".orderPeople",function () {
		var self=this;
		console.log($(this).val());
		$.each($rootScope.newdata.data,function (key,value) {
			$rootScope.newdata.data[key].orderPeople=$(self).val()
		})
	});
	//END

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
	//点击搜索
	$scope.Worksearch=function(){
		var data=workServicUserInfo.workInfo();
		data.success(function(data){
				if(data.status==1){
					$scope.projectTy=[];
					$.each(data.data.list, function (i, v){
						$.each(data.data.list[i],function(index,value){
							if( index == 'projectName')
							{
								Arry.push(value);
								dataname.push(data.data.list[i]);
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
							$rootScope.newdata.data.push(n);
							jsondata[n.projectID]=1;
						}
					});
					$scope.projectTy=$rootScope.newdata.data;
				}
			}
		)};
//	项目列表
	//1,列表按钮
	$scope.TypeList=function () {
		$scope.RequestUrl ='/customer/project/query';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'projectType':0,
		});
		$scope.data =myService.ReturnData($scope.RequestUrl,$scope.Parameter);
		$scope.data.success(function (data) {
			if (data.status==1){
				$scope.projectTy=data.data.list;
			}
		})
	};
	//保养
	if ($rootScope.orderNo){
		$scope.projectTypebaoyang=function () {
			$scope.RequestUrl ='/customer/project/query';
			$scope.Parameter = $.param({
				'token':$rootScope.token,
				'projectType':1,
			});
			$scope.data =myService.ReturnData($scope.RequestUrl,$scope.Parameter);
			$scope.data.success(function (data) {
				if (data.status==1){
					$scope.projectTy=data.data.list;
				}
			})
		};
	}
	//点击列表搜索和传输数据
	var projectTypeId=function () {
		var name=[];
		var num=[];

		$scope.RequestUrl ='/customer/configure/project';
		$scope.Parameter = $.param({
			'token':$rootScope.token
		});
		$scope.data =myService.ReturnData($scope.RequestUrl,$scope.Parameter);
		$scope.data.success(function (data) {
			if (data.status==1){
				$.each(data.data.type,function (key,value) {
					name.push(value);
					num.push(key);
				});
				$scope.projectTypeId=name;
				$scope.projectTypeAddnew=name;
				$scope.projectTypeName=function (index) {
					$scope.RequestUrl ='/customer/project/query';
					$scope.Parameter = $.param({
						'token':$rootScope.token,
						"projectTypeId":num[index],
						'projectType':0
					});
					$scope.data =myService.ReturnData($scope.RequestUrl,$scope.Parameter);
					$scope.data.success(function (data) {
						if (data.status == 1) {
							myService.give(data.data.list);
						}
						$scope.projectTy=myService.pass();
						$(document).on('click',".overtime_blue",function (){
							var Index=$(this).parent().index();
							dataname.push(data.data.list[Index]);
							$.each(dataname, function(k,n) {
								if(!jsondata[n.projectID]){
									$rootScope.newdata.data.push(n);
									console.log($rootScope.newdata.data);
									jsondata[n.projectID]=1;
								}
							});

						})
					});
				};
				$scope.projectTy=myService.pass();
				var jumpDiv=function () {
					var numtwo=0;
					var projectName;
					$(document).on("click",".categroy .tit-search-xia li ",function(numtwo){
						numtwo=$(this).index();
						console.log($(this).index())
						console.log(num[numtwo]);
					});
					$scope.projectNa=function (projectName) {
						$scope.projectNam
						console.log($scope.projectNam);
					};
					$scope.newAdd=function () {

					};


					// $scope.RequestUrl ='/customer/project/batchCreate';
					// $scope.Parameter = $.param({
					// 	'token':$rootScope.token,
					// 	"projectTypeId":num[numtwo],
					// 	"name":$rootScope.projectName,
					// 	"types":types,
					// });
					// $scope.data =myService.ReturnData($scope.RequestUrl,$scope.Parameter);
				};
				jumpDiv()
			}
		});
	};
	projectTypeId();

	// 韩盼盼 当前预约数据添加10-9
	// $scope.projectAdd=myService.get().projectAdd;
	// $scope.CardprojectAdd=myService.get().CardprojectAdd;
	// end
	//人员
	// $rootScope.selectedModify = function(index,name,value)
	// {
	// 	$rootScope.newdata.data[index][name]=value;
	// }
	//人员信息
	$rootScope.CustomerName(2);
	//工时倍数判断
	$rootScope.carPicerFun();

	if($rootScope.carPrice){
		if (0<$rootScope.carPrice<=50){
			$.each($rootScope.newdata.data,function (kay,value) {
				$rootScope.newdata.data[kay].multiple=$rootScope.priceTypes.multiple;
				$rootScope.muitiple=1;
			})
		}else {
			if (50<$rootScope.carPrice<=100) {
				$.each($rootScope.newdata.data,function (kay,value) {
					$rootScope.newdata.data[kay].multiple=2
				})
			}
		}
	}else{
		$.each($rootScope.newdata.data,function (kay,value) {
			$rootScope.newdata.data[kay].multiple=1
			console.log($rootScope.priceTypes.minPrice)
		})
	}
//弹出框

}]);