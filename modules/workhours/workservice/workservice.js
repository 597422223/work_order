var app = angular.module('myApp');
app.service('workServicUserInfo', function ($http) {
	return {
		workInfo:function(){
			return  $http.post(API_URL+"/customer/project/query?token=3c25a936a9e06c16f62cecb0d13c6282&projectType=0&keyWord");
		},
		projectName:function(){
	        return $http.post(API_URL+"/customer/project/query?token=3c25a936a9e06c16f62cecb0d13c6282&projectType=0&keyWord");
		}
	}

});