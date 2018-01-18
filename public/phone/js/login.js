/**
 * Created by Administrator on 2018/1/18.
 */
$(function () {
    //登录按钮
    $('.btn_confirm').on('click', function (e) {
        e.preventDefault();
        var username = $('[type=text]').val();
        var password = $('[type=password]').val();
        var backURL = location.search;
        //console.log(backURL);
        if(!username){
            mui.toast('用户名不能为空哟');
            return;
        }
        if(!password){
            mui.toast('密码不能为空哟');
            return;
        }

        //
        $.ajax({
            type: 'post',
            url: '/user/login',
            data: {
                username:username,
                password:password
            },
            success: function (info) {
                console.log(info);
                if(info.error){
                    mui.toast(info.message);
                }
                if(info.success){
                    if(!backURL){
                        location.href = 'user.html';
                    }else{
                        location.href = backURL.replace('?backURL=','');
                    }
                }
            }
        });
    });
});