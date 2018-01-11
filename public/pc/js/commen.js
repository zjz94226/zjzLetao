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