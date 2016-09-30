var app = angular.module('myApp');
app.service('bookingServiceInfo', function ($http) {
	return {
		nowBooking: function(){
			return $http.post(API_URL+"/customer/ordermaster/currentOrderDetail?token=7c04373947eec88700c292c25aefc0a8");
		},
		nowBookingAdd: function(){
			return $http.post(API_URL+"/customer/project/quick?token=7c04373947eec88700c292c25aefc0a8&localCarId=19");
		},
		newBookingAdd:function(){
			return $http.post(API_URL+"/customer/project/book?token=7c04373947eec88700c292c25aefc0a8&localCarId=19");
		}
	}
});
