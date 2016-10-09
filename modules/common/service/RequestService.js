var app = angular.module('myApp');
app.service('RequestService',['$http', function ($http) {

		function ReturnData(RequestUrl,Parameter)
		{
			return $http.post(API_URL+RequestUrl+"?"+Parameter);
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
		}

		//获取cook值
		/*
*/

}]);


//赵飞扬
app.service('myService', function() {
   var savedData = {}
   function set(data) {
     savedData = data;
   };
   function get() {
    return savedData;
   };  
   return {
    set: set,
    get: get
   }  
});

