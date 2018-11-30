$(function () {
  var currentPage = 1;
  var pageSize = 5;
  //渲染页面
  render();
  function render() {
    $.ajax({
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('user_TPL', info);
        $('tbody').html(htmlStr);

        $("#pagintor").bootstrapPaginator({
          currentPage: info.page,
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          totalPages: Math.ceil(info.total / info.size),//总页数
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    })
  };
  //给按钮注册点击事件
  var updateId;
  var isDelete;
  $('tbody').on('click', 'button', function () {
    $('#userModal').modal('show');
    updateId = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-success') ? 1 : 0;
    console.log(isDelete);
  })
  //更改状态
  $('#confirmBtn').on('click', function () {
    console.log(1);

    $.ajax({
      url: '/user/updateUser',
      data: {
        id: updateId,
        isDelete: isDelete
      },
      type: 'post',
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.success) {
          $('#userModal').modal('hide');
          render();
        }
      }
    });
  })
})