$(function(){
  //获取数据渲染列表页
  $.ajax({
    url:'/category/queryTopCategory',
    dataType:'json',
    success:function(info){
      var htmlStr = template('leftTpl',info);
      $('.category_left ul').html(htmlStr);
      secRender(info.rows[0].id)
    }
  })
  //左侧列表点击事件
  $('.category_left ul').on('click','a',function(){
    $('.category_left ul li a').removeClass('current');
    $(this).addClass('current');
    secRender($(this).data('id'));
  }) 
})

//右边渲染的封装函数
function secRender( id ){
  $.ajax({
    url:'/category/querySecondCategory',
    data:{
      id:id
    },
    success:function(info){
      var htmlStr=template('rightTpl',info);
      $('.category_right ul').html(htmlStr);
    }
  });
}