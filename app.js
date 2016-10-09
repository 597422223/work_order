var myApp = angular.module('myApp', ['ui.router','oc.lazyLoad']);
myApp.config(function($stateProvider, $urlRouterProvider) {
	  $urlRouterProvider.otherwise("/index");
	  $stateProvider
	  .state('index', {
		  url: '/index',
		  views: {
			  '': {
				  templateUrl: 'modules/common/tpl/common.html',
				  resolve:{
					  loadMyCtrl:function ($ocLazyLoad) {
						  return $ocLazyLoad.load([
						   	'modules/common/controllers/AllCtrl.js',
						   ])
					   }
				   }
			  },
			  'main@index': {
				  templateUrl: 'modules/common/tpl/main.html',
				  controller: 'commonCtrl',
				  resolve:{
					  loadMyCtrl:function ($ocLazyLoad) {
						  return $ocLazyLoad.load([
						   	'modules/common/controllers/controllers.js',
						   	'modules/workhours/workservice/workservice.js',
						   	'modules/workhours/controllers/workhours.js',
						   	'modules/booking/controllers/BookingCtrl.js',
						   	'modules/booking/bookingService/bookingService.js',
						   ])
					   }
				   }
			  },
			  'tbl@index': {
				  templateUrl: 'modules/common/tpl/tbl.html'
			  },
			  'tblmain@index': {
				  templateUrl: 'modules/fastbill/tpl/fastbill.html'
			  }
		  }
	  })
	  .state('index.tab-order',{
	  		url: '/fast',
            views: {
                'tblmain@index': {
                    templateUrl: 'modules/fastbill/tpl/fastbill.html',
				                    resolve:{
									  loadMyCtrl:function ($ocLazyLoad) {
										  return $ocLazyLoad.load([
										   	'modules/fastbill/controllers/fastbillHomeController.js',
										   	"modules/workhours/workservice/workservice.js",
										   	
										   ])
									   }
								   }
                }
            }
	  })
	  .state('index.tab-card',{
	  		url: '/card',
            views: {
                'tblmain@index': {
                    templateUrl: 'modules/card/tpl/card.html',
                },
				'index.tab-card.xianyou': {
                    templateUrl: 'modules/card/tpl/xianyou.html',
                }
            }
			
	  })
	  .state('index.tab-card.xianyou',{
	  		url: '/xianyou',
            templateUrl: 'modules/card/tpl/xianyou.html',
	  	
	  })
	  .state('index.tab-card.shouka',{
	  		url: '/shouka',
            templateUrl: 'modules/card/tpl/shouka.html',
	  })
	  .state('index.tab-overtime',{
        url: '/overtime',
            views: {
                'tblmain@index': {
                    templateUrl: 'modules/workhours/tpl/gongshi.html',
                },
              "index.tab-overtime.yixuan":{
                templateUrl: 'modules/workhours/tpl/yixuan.html',
              }
            }
	  })
	  .state("index.tab-overtime.yixuan",{
	  	controller: 'workconl',
		  url:"/yixuan",
			  templateUrl: 'modules/workhours/tpl/yixuan.html'  
	  })
	  .state("index.tab-overtime.tianjiaxiangmu",{
	  	controller: 'workconl',
		  url:"/tianjiaxiangmu",
			  templateUrl: 'modules/workhours/tpl/tianjiaxiangmu.html'  
	  })
	  .state('index.tab-parts',{ //配件
	  		url: '/parts',
            views: {
                'tblmain@index': {
                    templateUrl: 'modules/parts/tpl/parts.html',
                }
            }
	  })
	  .state('index.tab-parts.selected',{ //配件--已选配件
	  	url:'/selected',
		templateUrl: 'modules/parts/tpl/selected.html',
		resolve:{
			  loadMyCtrl:function ($ocLazyLoad) {
				  return $ocLazyLoad.load([
				   	'modules/parts/controllers/SelectedPart.js',
				   ])
			   }
		   }
	  })
	  .state('index.tab-parts.project',{ //配件--已选配件
	  	url:'/project',
		templateUrl: 'modules/parts/tpl/project.html',
	  })
	  .state('index.tab-parts.usually',{ //配件--常用配件
	  	url:'/usually',
		templateUrl: 'modules/parts/tpl/usually.html',
	  })
	  .state('index.tab-parts.stock',{ //配件--库存配件
	  	url:'/stock',
		templateUrl: 'modules/parts/tpl/stock.html',
	  })
	  .state('index.tab-book',{
	  		url: '/booking',
            views: {
                'tblmain@index': {
                    templateUrl: 'modules/booking/tpl/booking.html',
                }
            }
	  })
	  .state('index.tab-book.nowbook',{
	  	controller: 'BookingCtrl',
	  	url:'/nowBooking',
		templateUrl: 'modules/booking/tpl/nowBooking.html',
	  	
	  })
	  .state('index.tab-book.newbook',{
	  	controller:'BookingCtrl',
	  	url:'/newBooking',
		templateUrl: 'modules/booking/tpl/newBooking.html',
	  })
	  .state('index.tab-remarks',{
	  		url: '/remarks',
            views: {
                'tblmain@index': {
                    templateUrl: 'modules/remarks/tpl/remarks.html',
                }
            }
	  })
	  
});