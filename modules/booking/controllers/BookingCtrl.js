var app = angular.module('myApp');
app.controller('BookingCtrl', ["$scope",'$rootScope',"$http","bookingServiceInfo",'RequestService',"myService",function($scope,$rootScope,$http,bookingServiceInfo,RequestService,myService) {
    // alert($rootScope.orderNo)
    // 判断是否有工单存在v
    if ($rootScope.orderNo) {
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


           //    // 获取已生成的工单号--取消预约接口参数  'RequestService',???
           // $scope.orderNo = data.data.order.orderNo;  
           // // console.log(orderNo)  服务获取数据
             

            $scope.cancelOrder = function(){
             // 清空数据
              $scope.toShopTime = $scope.openOrder =$scope.bookingStyle=$scope.bookTypeName = $scope.bookingMark = "";
              $scope.hideCtrl = true;

             // 取消预约 接口
             var cancelBooking = bookingServiceInfo.cancelBooking();
             cancelBooking.success(function(res){
              console.log(res)
             })
            }
          }
      })
    }
  

   // 转出工单、修改、保存post提交数据


   // 当前预约  全部已存在项目
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


   // 新建预约 服务项目
   var newServiceData=bookingServiceInfo.newBookingAdd();

   newServiceData.success(function(res){
    if (res.status==1) {
      $scope.newProject=res.data.list;
    }
     // console.log( $scope.newProject[0])
   })


  // set当前预约客户已选项目数据服务

  // 弹窗选中新增
    $('.newAddBespeakbtn').click(function(){

      $('.newAddBespeak-pop').hide();//弹窗隐藏

        // 获取选中服务项目
        var pVal = $('.newAddBespeak-pop .list-border p');
        var nowObj={}
        var jsonArr =[]
        pVal.each(function(index){
          // 获取选中的项目名称和id
          var pText = $(this).text();
          var idText = $(this).attr('id')

          /*[{}]数组对象*/
            nowObj[index]={
              projectID:idText,
              projectName:pText
            }
          jsonArr[index]=nowObj[index]//将对象添加到数组
        })

        // console.log(jsonArr)
        // 删除页面已有
        $('.service-con').each(function(){
          var pText = $(this).text();
          $('.service-list li').has('.service-con').text(pText).remove()
        })
        // 重新添加对象 服务内容到页面
        $(jsonArr).each(function(index){
          // console.log(jsonArr[index].projectID)
          var liText = '<li><span class="service-con" id='+jsonArr[index].projectID+'>'+jsonArr[index].projectName+'</span> <span class="book-blue delete-book">删除</span></li>' 
            $('.service-list ol').append(liText)
        })
        // console.log(jsonArr) 当前预约 客户已选项目
        // 当前预约 客户已选项目  
          // var jsonArr1 ={"projectAdd":[{
          //   "projectID":"2",
          //   "projectName":"5"
          // }]}  //测试数据
          var jsonArr = {
            "projectAdd":jsonArr
          }
         // console.log(jsonArr)//测试数据
         myService.set(jsonArr); 
         $scope.projectAdd=myService.get();
    })


}]);


