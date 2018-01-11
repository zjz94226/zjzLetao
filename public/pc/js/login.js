/**
 * Created by Administrator on 2018/1/11.
 */
$(function () {
    NProgress.configure({ showSpinner: false });
    $(document).ajaxStart(function () {
        NProgress.start();
    });
    $(document).ajaxStop(function () {
        NProgress.done();
    });


    //初始化表单校验插件
    var $form = $('form');
    //不能空 6-12
    $form.bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        //excluded: [':disabled', ':hidden', ':not(:visible)'],

        ////2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
      fields: {
          username: {
              validators: {
                  notEmpty: {
                      message: '用户名不能为空 哟哟哟哟'
                  },
                  stringLength: {
                      min: 3,
                      max: 12,
                      message: '用户名长度为 3~12位 哟哟哟哟'
                  },
                  callback: {
                      message: '用户名不存在 哟哟哟哟'
                  }
              }
          },
          password: {
              validators: {
                  notEmpty: {
                      message: '密码不能为空 哟哟哟哟'
                  },
                  stringLength: {
                      min: 3,
                      max: 12,
                      message: '密码长度为 3~12位 哟哟哟哟'
                  },
                  callback: {
                      message: '密码错误 哟哟哟哟'
                  }
              }
          }
      }

    });

    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            datatype: 'json',
            data: $form.serialize(),
            url: '/employee/employeeLogin',
            success: function (info) {
                if(info.success){
                    location.href = 'index.html';
                }
                if(info.error === 1000){
                    $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                    console.log(1000);
                }
                if(info.error === 1001){
                    $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                    console.log(1001);
                }
            }
        });
        //使用ajax提交逻辑
    });
});