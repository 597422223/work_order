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
			 		// 现有 -充值储值卡 点击充值工单接口
			 		$scope.chargeClickSure=function(){
			 			$rootScope.status=4;
			 			$rootScope.flag = 7;
			 			$rootScope.OrderAllFun();
			 			$scope.RequestUrl =API_URL+'/customer/ordermaster/submit';
			 			$scope.Parameter = {
			 				'token': $rootScope.token,
			 				'order': $rootScope.orderArr,
			 				'customer': $rootScope.customerArr,
			 				'car': $rootScope.CarArr,
			 				'insurance': $rootScope.InsuranceArr,
			 				'item': $rootScope.ItemArr,
			 				'good': $rootScope.GoodArr,
			 				'remark': $rootScope.RemarkArr,
			 				'sale': $rootScope.SalekArr,
			 				'customerId': $rootScope.customerId,
			 				'localCarId': $rootScope.localCarId,
			 				'orderNo': $rootScope.orderNo,
			 				'cardPrice':$scope.card_pay_money,//售卡金额
			 				//'force':$rootScope.SubmitOrderInfo;
			 			};
			 			$.ajax({

			 			     type: 'POST',

			 			     url: $scope.RequestUrl ,

			 			    data: $scope.Parameter ,

			 			    success: function(data){
			 			    	console.log(data);
			 			    	// 用户来源格式待修改  返回成功才可以10-12
			 			    } ,

			 			});

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
			// 售卡弹窗确认点击
			$scope.shoukaPopSure=function(){
				$rootScope.status=4;
				$rootScope.flag = 7;
				$rootScope.OrderAllFun();
				$scope.RequestUrl =API_URL+'/customer/ordermaster/submit';
				$scope.Parameter = {
					'token': $rootScope.token,
					'order': $rootScope.orderArr,
					'customer': $rootScope.customerArr,
					'car': $rootScope.CarArr,
					'insurance': $rootScope.InsuranceArr,
					'item': $rootScope.ItemArr,
					'good': $rootScope.GoodArr,
					'remark': $rootScope.RemarkArr,
					'sale': $rootScope.SalekArr,
					'customerId': $rootScope.customerId,
					'localCarId': $rootScope.localCarId,
					'orderNo': $rootScope.orderNo,
					'cardPrice':$scope.card_get_payAmount,//售卡金额
					//'force':$rootScope.SubmitOrderInfo;
				};
				$.ajax({

				     type: 'POST',

				     url: $scope.RequestUrl ,

				    data: $scope.Parameter ,

				    success: function(data){
				    	console.log(data);
				    	// 用户来源格式待修改  返回成功才可以10-12
				    } ,

				});
			}
		}
	
		// 售卡人列表
			$rootScope.CustomerName(1)

			// console.log($rootScope.orderSourceInfoItme)

		
		

}])
