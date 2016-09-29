var app = angular.module('myApp');
app.service('workServicUserInfo', function ($http) {
	return {
		workInfo:function(){
			return  $http.post(API_URL+"/customer/ordermaster/projects?token=7c04373947eec88700c292c25aefc0a8&orderNo=GD16071817103051");
		},
		projectName:function(){
	        return $http.post(API_URL+"/customer/project/query?token=7c04373947eec88700c292c25aefc0a8&projectType&localCarId");
		}
	}
});