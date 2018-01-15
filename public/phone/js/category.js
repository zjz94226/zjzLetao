/**
 * Created by Administrator on 2018/1/15.
 */
$(function () {
    function renderLeft(){
        $.ajax({
            type: 'get',
            url:'/category/queryTopCategory',
            success: function (info) {
                console.log(info);
                $('.main_left ul').html(template('tpl_left',info));
                //默认渲染第一个的二级分类
                renderRight(info.rows[0].id);
            }
        });
    }
    function renderRight(id){
        $.ajax({
            type: 'get',
            url:'/category/querySecondCategory',
            data: {
                id:id
            },
            success: function (info) {

                console.log(info);
                $('.main_right ul').html(template('tpl_right',info));
            }
        });
    }
    renderLeft();


    //左侧点击事件
    $('.main_left ul').on('click','li', function () {
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,500);
        var id = $(this).data('id');
        $(this).addClass('now').siblings().removeClass('now');
        renderRight(id);
    })
});