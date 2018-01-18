/**
 * Created by Administrator on 2018/1/18.
 */
$(function () {
    //获取验证码
    $('.get_vcode').on('click', function (e) {
        var $this = $(this);
        e.preventDefault();
        $.ajax({
            type:'get',
            url:'/user/vCode',
            beforeSend: function () {
                $this.prop('disabled',true).addClass('disabled');
                $this.text('发送中...');
                var num = 5;
                var timeId = setInterval(function () {
                    num--;
                    $this.text(num+'秒之后再次获取');
                    if(num == 0){
                        clearInterval(timeId);
                        $this.text('再次发送');
                        $this.prop('disabled',false).removeClass('disabled');
                    }
                },1000);
            },
            success: function (info) {
                console.log(info.vCode);
                //$('[name=vCode]').data('vcode',info.vCode);
            }
        });
    });

    $('.btn_reg').on('click', function (e) {
        e.preventDefault();
        var username = $('[name=username]').val().trim();
        var password = $('[name=password]').val().trim();
        var second_pwd = $('.second_pwd').val().trim();
        var mobile = $('[name=mobile]').val().trim();
        var vCode = $('[name=vCode]').val().trim();
        //var newc = $('[name=vCode]').data('vcode');

        if(!username){
            mui.toast('用户名不能为空哟');
            return;
        }
        if(!password){
            mui.toast('密码不能为空哟');
            return;
        }
        if(second_pwd != password){
            mui.toast('两次输入的密码不一致哟');
            return;
        }
        if(!mobile){
            mui.toast('手机号不能为空哟');
            return;
        }
        if(!/^1[3-9]\d{9}$/.test(mobile)){
            mui.toast('手机号格式不正确 哟');
            return;
        }

        $.ajax({
            type:'post',
            url:'/user/register',
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode:vCode
            },
            success: function (info) {
                if(info.success){
                    $('.btn_confirm').prop('disabled',true);
                    $('.btn_confirm').text('亲 注册成功,页面将在秒之后跳转到登录界面');
                    setTimeout(function () {
                        location.href='login.html';
                    },000);

                }
                if(info.error){
                    mui.toast(info.message);
                }
            }
        });
    })
});