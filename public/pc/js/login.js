/**
 * Created by Administrator on 2018/1/11.
 */
$(function () {
    //初始化表单校验插件
    var $form = $('form');
    //不能空 6-12
    console.log($form);
    $form.bootstrapValidator({
        //配置规则
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空 哟哟哟哟'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '用户名长度6-12位 哟哟哟哟'
                    }
                    //正则校验
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空 哟哟哟哟'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度6-12位 哟哟哟哟'
                    }
                    //正则校验
                }
            }
        }
    });
});