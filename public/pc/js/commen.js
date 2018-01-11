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

    $('.second').prev().on('click', function () {
        $(this).next().slideToggle();
    });

    $('.icon_menu').on('click', function () {
        $('.lt_main').toggleClass('now');
        $('.lt_aside').toggleClass('now');
    });

    $('.icon_out').on('click', function () {
        $('.myModal').modal('show');
        console.log(111)
    });
