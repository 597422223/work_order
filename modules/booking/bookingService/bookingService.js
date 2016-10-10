var app = angular.module('myApp');
app.service('bookingServiceInfo', function ($http) {
	return {
		nowBooking: function(){
			return $http.post(API_URL+"/customer/ordermaster/currentOrderDetail?token=60b3cf23a9f1a75066a73509cf5ab03c");
		},
		nowBookingAdd: function(){
			return $http.post(API_URL+"/customer/project/quick?token=60b3cf23a9f1a75066a73509cf5ab03c&localCarId=19");
		},
		newBookingAdd:function(){
			return $http.post(API_URL+"/customer/project/book?token=60b3cf23a9f1a75066a73509cf5ab03c&localCarId=19");
		},
		cancelBooking:function(){
			return $http.post(API_URL+"/customer/ordermaster/cancel?token=60b3cf23a9f1a75066a73509cf5ab03c&orderNo=GD16062511252609")
		}
	}
});
