//项目工时js
  $(".tit-search-list input").focus(function(){
    $(this).siblings(".tit-search-xia").css("display","block");
  });
  $('.tit-search-list input').blur(function(){
    var self=this;
      var hiddenColor=function (){
    $(self).siblings(".tit-search-xia").css("display","none");
    }
    setTimeout(hiddenColor,200);
  });

  $(".tit-search-xia li").click(function(){
    $(this).parent().prev().val($(this).text());
    $(this).parent().css("display","none");
  });

  // 添加项目类型
    $('.content2-add').click(function(){
      $('.choose-project-pop').show();
    })
   $('.mask').click(function(){
    $('.choose-project-pop').hide();
  })
  $('.ctr-off').click(function(){
    $('.choose-project-pop').hide();
  })
    
