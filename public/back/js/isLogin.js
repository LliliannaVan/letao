$(function(){
  //判断是否登陆过 没有就退回首页
$.ajax({
  url:'/employee/checkRootLogin',
  dataType:'json',
  success:function(info){
    console.log(info);
    if(info.error===400){
      location.href='login.html'
    }
  }
});
})