/**
 * Created by Administrator on 2018/1/11.
 */
//进度条
    NProgress.configure({ showSpinner: false });
    $(document).ajaxStart(function () {
        NProgress.start();
    });
    $(document).ajaxStop(function () {
        NProgress.done();
    });

    //判断是否登录
    if(location.href.indexOf('login.html') < 0){
        $.ajax({
            type:'get',
            url: '/employee/checkRootLogin',
            datatype:'json',
            success: function (info) {
                if(info.error){
                    location.href = 'login.html';
                }
            }
        });
    }


    //分类管理菜单收缩
    $('.second').prev().on('click', function () {
        $(this).next().slideToggle();
    });
    //菜单按钮 点击收缩
    $('.icon_menu').on('click', function () {
        $('.lt_main').toggleClass('now');
        $('.lt_aside').toggleClass('now');
    });
    //退出图标按钮
    $('.icon_out').on('click', function () {
        $('.myModal').modal('show');
    });

    //点击退出 退出登录
    $('.btn_logout').on('click',function () {
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            datatype: 'json',
            success:function(info) {
                if(info.success){
                    location.href = 'login.html';
                }
                //console.log(info);
            }

        });
    });
