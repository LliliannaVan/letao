$(function(){
  //表单校验
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon glyphicon-heart',
      invalid: 'glyphicon glyphicon-heart-empty',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:'用户名不能为空！'
          },
          stringLength:{
            min:2,
            max:6,
            message: '用户名长度必须在2到6之间!'
          },
          callback:{
            message:'用户名错误！'
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:'密码不能为空！'
          },
          stringLength:{
            min:6,
            max:12,
            message:'密码长度必须在6到12之间！'
          },
          callback:{
            message:'密码错误！'
          }
        }
      }
    }
  });
  //bootstrap验证的实例对象
  var bootstrapValidator = $(form).data('bootstrapValidator');
  console.log(bootstrapValidator);
  
  //提交按钮注册事件 阻止默认行为并且发送ajax来获取数据
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url: "/employee/employeeLogin",
      data:$('#form').serialize(),
      dataTpye:'json',
      success:function(info){
        console.log(info);
          if(info.success){
          location.href='index.html'
        }
        if(info.error=='1000'){
          //调用更改状态方法 
          bootstrapValidator.updateStatus('username','INVALID','callback');
          return
        }
        if(info.error=='1001'){
          bootstrapValidator.updateStatus('password','INVALID','callback');
          return
        }
      }
    });
  })
   //重置按钮重置状态
   $('#reset').on('click',function(){
     bootstrapValidator.resetForm(true);
   })
})