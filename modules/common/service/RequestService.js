var app = angular.module('myApp');
app.service('RequestService',['$http', function ($http) {

		function ReturnData(RequestUrl,Parameter)
		{
			return $http.post(API_URL+RequestUrl+"?"+Parameter);
		}

		function ReturnData1(RequestUrl,Parameter)
		{
			return $http.post(API_URL+RequestUrl,Parameter);
		}

		function getCookie(name)
		{
			var strCookie=document.cookie; 
			var arrCookie=strCookie.split("; "); 
			var url; 
			for(var i=0;i<arrCookie.length;i++){ 
				var arr=arrCookie[i].split("="); 
				//找到名称为userId的cookie，并返回它的值 
				if(name==arr[0]){ 
					url=arr[1]; 
					break; 
				} 
			} 
			return url;
		}

		

		return {
			ReturnData :ReturnData,
			getCookie:getCookie,
			ReturnData1:ReturnData1,
		}

		//获取cook值
		/*
*/

}]);


app.service('myService',["$http" ,function($http) {
	function ReturnData(RequestUrl,Parameter)
	{
		return $http.post(API_URL+RequestUrl+"?"+Parameter);
	}
	var savedData = {};
	var projactList={};
	var TypeArry={};
	var delArry={};
	function delIn(data) {
		delArry = data;
	};
	function delOut() {
		return delArry;
	};
	function putIn(data) {
		TypeArry = data;
	};
	function putOut() {
		return TypeArry;
	};
	function give(data) {
		projactList = data;
	};
	function pass() {
		return projactList;
	};
	function set(data) {
		savedData = data;
	};
	function get() {
		return savedData;
	};
	return {
		ReturnData:ReturnData,
		set: set,
		get: get,
		give:give,
		pass:pass,
		putIn:putIn,
		putOut:putOut,
		delIn:delIn,
		delOut:delOut
	}
}]);




