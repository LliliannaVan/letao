$(function(){
  //封装获取的方法
  function getList(){
    var arr =JSON.parse(localStorage.getItem('search_list'))||[];
    return arr  ;
  }
  //封装渲染的方法
  function render(){
    var arr=getList();
    var htmlStr = template('historyTpl',{list:arr});
    $('.lt_history').html(htmlStr)
  }
  render();
  //清空记录
  $('.btn-delete').on('click',function(){
    localStorage.removeItem('search_list');
    render();
  })
  //点击单个删除功能
})