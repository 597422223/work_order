var app = angular.module('myApp');
app.controller('cardCtrl', ['$scope','$rootScope','$http','RequestService',function($scope,$rootScope,$http,RequestService) {
	// 10-11 韩盼盼 共共尾部隐藏
	// alert($rootScope.customerId);
		 // if ($rootScope.orderNo){
			 	$scope.RequestUrl ='/customer/card/cardList';
			 	$scope.Parameter = $.param({
			 		'token':$rootScope.token,
			 		// 'customerId':$rootScope.customerId,
			 		'customerId':1,
			 	});
			 	$scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
			 	$scope.data.success(function(data) {
			 		$scope.xianyou = data.data.valuecard;
			 		$scope.ticketcard = data.data.ticketcard;
			 		$scope.onecard = data.data.onecard;
			 		// console.log($scope.xianyou)
					// $rootScope.CardprojectAdd=;??  获取到操作勾选的项目
					// 	$.each($scope.onecard,function(index,value){
					// 		$rootScope[index] = value;
					// 		$rootScope.cardId=$rootScope[index].cardId;
					// 		$rootScope.typeId=$rootScope[index].typeId;
					// 	})

					// $rootScope.cardProjectAdd()

			 	})	

			 	// 充值弹窗
			 	$scope.chargeClick=function(type,scale,value,payAmount){
			 		$('.charge-pop').show();

			 		if(type ==0){
			 			$scope.card_pay_money = scale*value;

			 		}else if(type ==1){
			 			$scope.card_pay_money = payAmount;
			 			$scope.card_get_money = value;

			 			$scope.expression = true;
			 		}

			 	}
			 	// 优惠券点击变色
			 	$scope.ticketClick=function(index){
			 	    var isActive = 'isActive'+index;
			 	    if($rootScope[isActive] )
			 	    {
			 	    	$rootScope[isActive] = '';
			 	    }
			 	    else
			 	    {
			 	    	$rootScope[isActive] = 'active-coupon';
			 	    }
			 	}
		 // }

		// 售卡部分  sellingTicket-active-green 已购类
		$scope.RequestUrl ='/customer/card/onecardSaleList';
		$scope.Parameter = $.param({
			'token':$rootScope.token,
			'customerId':$rootScope.customerId,
		});
		$scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
		$scope.data.success(function(data) {
			$scope.svaluecard = data.data.valuecard;
			$scope.sonecard = data.data.onecard;
			// console.log($scope.sonecard)
		})	
		// 售卡弹窗
		$scope.sellingTickets=function(payAmount,projectCategory,endTime){
			$('.pay_cardwin-pop').show();
			$scope.card_get_payAmount=payAmount;
			if (projectCategory=="储值卡") {
				// console.log(projectCategory)
				$scope.hideTime = true;
			}else{
				$scope.hideTime = false;
				// console.log(projectCategory)
			}
		}
	
		// 售卡人列表
			$rootScope.CustomerName(1)

			// console.log($rootScope.orderSourceInfoItme)
}])
