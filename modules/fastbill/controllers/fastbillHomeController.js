var app=angular.module("myApp",[]);
app.controller("FastCtrl",['$scope','$rootScope','$http','RequestService',"myService",function($scope,$rootScope,$http,RequestService,myService){
	var fastbill=function() {
		var fastAry = [];//项目
		var fastNameary = [];//项目名称
		var jsondata = {};
		var unmInedx;
		$scope.RequestUrl = '/customer/project/quick';
		$scope.Parameter = $.param({
			"token": "3c25a936a9e06c16f62cecb0d13c6282",
			'localCarId': 18,
			'carDis': 2.4,
		});
		$scope.data = RequestService.ReturnData($scope.RequestUrl, $scope.Parameter);

		$scope.data.success(function (data) {
			$scope.fastName = data.data.list;

			$scope.fast_project = function (index) {
				var unm=data.data.list[index];
				fastNameary.push(data.data.list[index].projectName);
					var isActive = 'isActive' + index;
					if ($rootScope[isActive]) {
						$rootScope[isActive] = '';
						$rootScope.haveClass = 0;
					}
					else {
						$rootScope[isActive] = 'list-border';
						$rootScope.haveClass = 1;
					}
					if ($rootScope.haveClass = 1) {
						fastAry.splice(index, 1);
					}
					$(document).on("click","#FastBillin .list-FastBilling",function (index) {
						// console.log($(this).hasClass("list-border"));
						if ($(this).hasClass("list-border")){
							$.each(fastNameary, function (key, value) {
								if (!jsondata[fastNameary[key]]) {
									fastAry.push(unm);
									jsondata[fastNameary[key]] = 1;
								}});
							console.log(fastAry);
						}
					});

					// myService.set($rootScope.fastAry);
			}
		});
	}
	fastbill();
}]);
