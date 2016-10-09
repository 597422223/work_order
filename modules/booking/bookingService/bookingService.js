var app = angular.module('myApp');
app.service('bookingServiceInfo', function ($http) {
	return {
		nowBooking: function(){
			return $http.post(API_URL+"/customer/ordermaster/currentOrderDetail?token=3c25a936a9e06c16f62cecb0d13c6282");
		},
		nowBookingAdd: function(){
			return $http.post(API_URL+"/customer/project/quick?token=3c25a936a9e06c16f62cecb0d13c6282&localCarId=19");
		},
		newBookingAdd:function(){
			return $http.post(API_URL+"/customer/project/book?token=3c25a936a9e06c16f62cecb0d13c6282&localCarId=19");
		}
	}
});
