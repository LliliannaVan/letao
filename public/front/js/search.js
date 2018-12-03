$(function () {
  //封装获取的方法
  function getList() {
    //将json字符串转换成数组返回
    var arr = JSON.parse(localStorage.getItem('search_list')) || [];
    return arr;
  }
  //封装渲染的方法
  function render() {
    //获取数据
    var arr = getList();
    //模板引擎渲染
    var htmlStr = template('historyTpl', { list: arr });
    $('.lt_history').html(htmlStr)
  }
  render();
  //清空记录
  //注册点击事件
  $('.btn-delete').on('click', function () {
    //调用模态框
    mui.confirm('你确定要清空历史记录吗?', '温馨提示', ['取消', '确定'], function (e) {
      if (e.index === 1) {
        localStorage.removeItem('search_list');
        render();
      }
    });

  })
  //删除单个
  //点击单个删除根据下标来删除
  $('.lt_history').on('click', '.btn_delete', function () {
    //获取对应下标
    var index = $(this).data('index');
    //获取储存的数据
    var arr = getList();
    //删除选中的单条历史
    arr.splice(index, 1);
    //转换成json字符串
    var jsonStr = JSON.stringify(arr);
    //储存进localstorage
    localStorage.setItem('search_list', jsonStr);
    //重新渲染历史
    render();
  })
  //添加历史功能
  //注册点击事件
  $('.btn-search').on('click',function(){
    //获取数据为数组
    var arr = getList();
    var val = $('#searchIpt').val().trim();
    //判断如果输入为空 提示用户输入
    if($('#searchIpt').val().trim().length===0){
      mui.toast('请输入关键字进行搜索',{ duration:'long', type:'div' });
      return;
    }
    //判断如果有重复的了 删掉对应的 放入最新输入的
    var index = arr.indexOf(val);
    if(index!==-1){
      arr.splice(index,1);
    }
    //最多只有10个 如果超过10个就删除掉尾部的
    console.log(arr.length);
    
    if(arr.length>=10){
      arr.pop();
    }
    //在头部添加数据
    arr.unshift(val);
    var jsonStr = JSON.stringify(arr);
    localStorage.setItem('search_list',jsonStr);
    render();
    //重置搜索框
    $('#searchIpt').val('');
    //跳转到搜索的产品页面
    location.href='searchList.html?key='+val;
  })
})