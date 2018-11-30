$(function(){
  var currentPage = 1;
  var pageSize=5;
  //渲染页面
  render();
  function render(){
    $.ajax({
      url:'/user/queryUser',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        var htmlStr = template('user_TPL',info);
        $('tbody').html(htmlStr);

        $("#pagintor").bootstrapPaginator({
          currentPage:info.page,
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          totalPages:Math.ceil(info.total/info.size),//总页数
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage=page;
            render();            
          }
        });
      }
    })
  };
  //给按钮注册点击事件
  $('tbody').on('click','button',function(){
    $('#userModal').modal('show')
  })
})