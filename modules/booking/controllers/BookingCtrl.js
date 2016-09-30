var app = angular.module('myApp');
app.controller('BookingCtrl', ["$scope","$http","bookingServiceInfo",function($scope,$http,bookingServiceInfo) {
   var data=bookingServiceInfo.nowBooking();	 
   data.success(function(data){
   	// console.log(data)
   	// 时间戳函数 begin
   	 function getLocalTime(nS) {     
       return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
    }
    // 时间戳函数 end 

   		if(data.status ==1){
   			$scope.toShopTime = data.data.order.bookGetInTime; //预约到店时间
   			$scope.openOrder = getLocalTime(data.data.order.cTime); //预约开单时间 
   			$scope.bookingStyle = data.data.order.bookTypeName; //预约方式
   			$scope.bookingMark = data.data.order.desc; //预约备注

   			$scope.cancelOrder = function(){
   				$scope.toShopTime = $scope.openOrder =$scope.bookingStyle=$scope.bookTypeName = $scope.bookingMark = "";
   				$scope.hideCtrl = true;
   			}
   		}
   })

   var serviceData = bookingServiceInfo.nowBookingAdd();
   serviceData.success(function(res){
    if (res.status == 1) {
       $scope.project =res.data.list;
    }
     // console.log(res.data.list[0])
     // $scope.projectName=function(index){
     //    $scope.[listService]='list-border';
     //  }
   })

   // 新建预约
   var newServiceData=bookingServiceInfo.newBookingAdd();
   newServiceData.success(function(res){
    if (res.status==1) {
      $scope.newProject=res.data.list;
    }
     // console.log( $scope.newProject[0])
   })

}]);
