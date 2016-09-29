var app = angular.module('myApp');
app.service('RequestService',['$http', function ($http) {
	return {
		ReturnData:function(RequestUrl,Parameter)
		{
			return $http.post(API_URL+RequestUrl+"?"+Parameter);
		}
		
		
	}
}]);

