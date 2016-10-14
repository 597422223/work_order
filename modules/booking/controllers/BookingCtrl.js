var app = angular.module('myApp');
app.controller('BookingCtrl', ["$scope",'$rootScope',"$location","$http","bookingServiceInfo",'RequestService',"myService",function($scope,$rootScope,$location,$http,bookingServiceInfo,RequestService,myService) {
          // 当前预约
            $scope.RequestUrl ='/customer/ordermaster/currentOrderDetail';
            $scope.Parameter = $.param({
              'token':$rootScope.token,
            });
            $scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
            $scope.data.success(function(data) {
            // 时间戳函数 begin
             function getLocalTime(nS) {     
              return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
           }
           // 时间戳函数 end 
              if(data.status ==1){
                $rootScope.toShopTime = data.data.order.bookGetInTime; //预约到店时间
                $rootScope.openOrder = getLocalTime(data.data.order.cTime); //预约开单时间 
                $rootScope.bookingStyle = data.data.order.bookTypeName; //预约方式
                $rootScope.bookingMark = data.data.order.desc; //预约备注
                $rootScope.exceptedEndTime=data.data.order.exceptedEndTime//期望完成时间
                $rootScope.bookPeople=data.data.order.bookPeople//预约人id
                $rootScope.bookPeopleName=data.data.order.bookPeopleName//预约操作人姓名
                $rootScope.bookTypeName = data.data.order.bookTypeName//预约类型名称
               //    // 获取已生成的工单号--取消预约接口参数  'RequestService',???
                $rootScope.orderNoNew = data.data.order.orderNo;  
               // console.log($rootScope.bookTypeName) // 服务获取数据

                $scope.cancelOrder = function(){
                 // 清空数据
                  $scope.toShopTime = $scope.openOrder =$scope.bookingStyle=$scope.bookTypeName = $scope.bookingMark = "";
                  $scope.hideCtrl = true;
                 // 取消预约 接口
                 $scope.RequestUrl ='/customer/ordermaster/cancel';
                 $scope.Parameter = $.param({
                   'token':$rootScope.token,
                   'orderNo':$rootScope.orderNoNew,
                 });
                 $scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
                 // var cancelBooking = bookingServiceInfo.cancelBooking();
                $scope.data.success(function(res){
                  console.log(res)
                  // 10-12取消成功
                 })
                }

              }

            })  
   // 转出工单、修改、保存post提交数据
   $scope.transformOrder=function(){
     $scope.RequestUrl ='/customer/ordermaster/transTo';
     $scope.Parameter = $.param({
       'token':$rootScope.token,
       'orderNo':$rootScope.orderNoNew,
     });
     $scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
     $scope.data.success(function(data) {
       // 服务获取数据
       console.log(data)
       $location.url('/index/overtime/yixuan?orderNo=$rootScope.orderNoNew');
     })
   }
   // 转出工单end
  // 当前预约保存 判断工单号存在 


    // 新建预约 保存按钮
         $scope.newBookingSave=function(){
           //获取新建预约单数据 
            var Addarr = [];
            // var newAddarr = [];
            var AppointTime =  $('.Appointment_time input').val();//获取预约到店时间
            var AppointWay = $('.Appointment_way option:selected').text();//获取预约方式
            var AppointRemark = $('.Appointment_notes textarea').val()//获取预约备注
              if (AppointWay=="主动") {
                var bookType=1
              }else{
                var bookType=0
              }
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
                var jsonArr = {
                  "projectAdd":jsonArr
                }
               console.log(jsonArr)//测试数据

            // console.log(AppointTime)
            // console.log(AppointWay)
            // console.log(AppointRemark)
            // 处理新建预约数据
            $rootScope.status=4;//??
            $rootScope.flag = 2;
            $rootScope.bookTypeName=AppointWay;
            $rootScope.bookGetInTime=AppointTime;
            $rootScope.bookType=bookType;
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
  // 新建预约保存结束



   // 当前预约  全部已存在项目
   $scope.RequestUrl ='/customer/project/quick';
   $scope.Parameter = $.param({
     'token':$rootScope.token,
     "localCarId":19,
   });
   $scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
   $scope.data.success(function(res) {
    if (res.status == 1) {
       $scope.project =res.data.list;
    }
   })
  // 当前预约end


   // 新建预约 服务项目
   $scope.RequestUrl ='/customer/project/book';
   $scope.Parameter = $.param({
     'token':$rootScope.token,
     "localCarId":19,
   });
   $scope.data =RequestService.ReturnData($scope.RequestUrl,$scope.Parameter);
   $scope.data.success(function(res) {
    if (res.status == 1) {
       $scope.project =res.data.list;
    }
   })



  // set当前预约新建客户已选项目数据服务

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
         console.log(jsonArr)//测试数据
         myService.set(jsonArr); 
         $scope.projectAdd=myService.get();
    })




// 样式
    // 项目点击变色
    $scope.projectClick=function(index){
        var isActive = 'isActive'+index;
        if($rootScope[isActive])
        {
          $rootScope[isActive] = '';
        }
        else
        {
          $rootScope[isActive] = 'list-border';
        }
    }
    // 当前预约项目点击变色
    $scope.projectClick1=function(index){
        var isActive = 'isActive'+index;
        if($rootScope[isActive])
        {
          $rootScope[isActive] = '';
        }
        else
        {
          $rootScope[isActive] = 'list-border';
        }
    }


}]);


