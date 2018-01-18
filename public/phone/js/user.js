/**
 * Created by Administrator on 2018/1/18.
 */
$(function () {
    $.ajax({
        type: 'get',
        url :'/user/queryUserMessage',
        success: function (info) {
            console.log(info);
            if(info.error){
                location.href = 'login.html';
            }
            $('ul .mui-media').html(template('tpl',info));
        }
    });

    //退出按钮
    $('.btn_logout').on('tap', function () {
        mui.confirm('你确定要离开我吗  主人','温馨提示',['继续留下','残忍离开'], function (e) {
            if(e.index === 1){
                $.ajax({
                    type: 'get',
                    url: '/user/logout',
                    success: function (info) {
                        if(info.success){
                            location.href = 'login.html';
                        }
                        if(info.error){
                            mui.toast('退出失败,你注定是要留下来陪我的');
                        }
                    }
                });
            }
        });
    });
});