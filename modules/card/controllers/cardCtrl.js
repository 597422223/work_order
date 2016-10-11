var app = angular.module('myApp');
app.controller('cardCtrl', ['$scope','$rootScope','$http','RequestService',function($scope,$rootScope,$http,RequestService) {


		$scope.RequestUrl ='/customer/card/cardList';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'customerId':189,
		});
		$scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
		$scope.data.success(function(data) {
			$scope.xianyou = data.data.valuecard;
			$scope.ticketcard = data.data.ticketcard;
			$scope.onecard = data.data.onecard;
			console.log($scope.onecard)
		})	

		// 充值弹窗
		$scope.chargeClick=function(){
			$('.charge-pop').show();
		}
			

}])
