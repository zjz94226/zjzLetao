/**
 * Created by Administrator on 2018/1/16.
 */
$(function () {

    render();
    function render(){
        var pduId = getParam()['pduId'];
        console.log(pduId);
        $.ajax({
            type:'get',
            url: '/product/queryProductDetail',
            data:{
                id:pduId
            },
            success: function (info) {
                console.log(info);
                $('.mui-scroll').html(template('tpl',info));
                mui('.mui-slider').slider({
                    interval:2000
                });
                mui('.mui-numbox').numbox()
            }
        });
    }
    //给尺码注册点击
    $('.mui-scroll').on('click','.pdu_size span', function () {
        $(this).addClass('now').siblings().removeClass('now');
    });
});