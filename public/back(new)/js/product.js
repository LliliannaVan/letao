
$(function(){
  //渲染
  var currentPage=1;
  var pageSize=5;
  render();
  function render(){
    $.ajax({
      url:'/product/queryProductDetailList',
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        var htmlStr = template('proTml',info);
        $('tbody').html(htmlStr);
        //生成分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages: Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          }
        });
      }
    });
  }
  $('.addBtn').on('click',function(){
    $('#addModal').modal('show');
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      dataType:'json',
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        var htmlStr = template('dropTml',info);
        $('.dropdown-menu').html(htmlStr);
      }
    });
  })

  
  //表单验证
  $('#form').bootstrapValidator({
    excluded:[],
     //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message: '请选择二级分类',
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message: '请输入商品名称',
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message: '请输入商品描述',
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message: '请输入商品库存',
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '请输入开头非0的数字'
          }
        }
        
      },
      size:{
        validators:{
          notEmpty:{
            message: '请输入商品尺码',
          },
          regexp: {
          //正则校验
          // \d  0-9
          // ?   0次或1次
          // +   1次或多次
          // *   0次或多次
          // {n,m}  出现n次到m次
          // {n}  出现n次
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 xx-xx格式, xx为两位数字, 例如 36-44'
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message: '请输入商品原价',
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message: '请输入商品现价',
          }
        }
      },
      picStatus:{
        validators:{
          notEmpty:{
            message: '请上传三张图片',
          }
        }
      },
    }
  });
    //下拉框的点击验证
    var validator = $("#form").data('bootstrapValidator');
    
    $('.dropdown-menu').on('click','li a',function(){
      var text = $(this).text();
      var id = $(this).data('id');
      $('#dropText').text(text);
      $('[name="brandId"]').val(id);
      validator.updateStatus('brandId','VALID');
    })
    //上传图片按钮
    var fileArr=[];
    $("#fileupload").fileupload({
      dataType:"json",
      //e：事件对象
      //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
      done:function (e, data) {
        console.log(data);
        var picObj =data.result;
        fileArr.unshift(picObj);
        console.log(fileArr);
        $('#imgBox').prepend( '<img src="'+ data.result.picAddr +'" style="width: 100px;">' );
        if(fileArr.length>3){
          fileArr.pop();
          $('#imgBox img:last-of-type').remove();
        }
        if(fileArr.length==3){
          validator.updateStatus('picStatus','VALID');
        }
      }
});
    //校验完成功能 添加
    $("#form").on('success.form.bv', function (e) {
      e.preventDefault();
      var paramsStr = $('#form').serialize();
      console.log( paramsStr);
      paramsStr+='&picName1='+fileArr[0].picName+'&picAddr1='+fileArr[0].picAddr;
      paramsStr+='&picName2='+fileArr[1].picName+'&picAddr1='+fileArr[1].picAddr;
      paramsStr+='&picName3='+fileArr[2].picName+'&picAddr1='+fileArr[2].picAddr;
      //使用ajax提交逻辑
      $.ajax({
        url:'/product/addProduct',
        data:paramsStr,
        dataType:'json',
        type:'post',
        success:function(info){
          if(info.success){
            $('#addModal').modal('hide');
            currentPage=1;
            render();
            validator.resetForm(true);
            $('#imgBox').empty();
            $('#dropText').text('请选择二级分类');
          }
        }
      })
  });
})