$(function(){
  $(document).ajaxStart(function () {
    NProgress.start();
  });
  $(document).ajaxStop(function () {
    NProgress.done();
  });
})

//公共样式功能
$(function(){
  //二级菜单的功能
  $('.category').on('click',function(){
    $(this).next().stop().slideToggle();
  })
  //头部按钮隐藏侧边栏功能
  $('.icon_left').on('click',function(){
    $('.lt_aside').toggleClass('hidemenu')
    $('.lt_main').toggleClass('hidemenu')
    $('.topbar').toggleClass('hidemenu')
  })
  //退出功能 模态框 退出按钮调用出模态框
  $('.icon_right').on('click',function(){
    $('#lt_modal').modal('show')
  })
  //点击退出按钮发送ajax请假清除登录并且退回登录页面
  $('.btn-logout').on('click',function(){
    $.ajax({
      url:'/employee/employeeLogout',
      dataType:'json',
      success:function(info){
        if(info.success){
          location.href='login.html';
        }        
      }
    });
  })
})