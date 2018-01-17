/**
 * Created by Administrator on 2018/1/16.
 */
$(function () {
    //填充文本框
    var key = getParam()['key'];
    $('.search_text').val(key);

    function render(){
        var param ={
            proName: $('.search_text').val(),
            page:1,
            pageSize: 1000
        };
    //判断 排序链接是否点击
        if($('.search_nav a').hasClass('now')){
            var type = $('.search_nav a.now').data('type');
            if($('.search_nav a.now').find('span').hasClass('fa-angle-down')){
               param[type] = 2;
            }else{
                param[type] = 1;
            }
        }

        console.log(param);
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: param,
            success: function (info) {
                console.log(info);
                $('.lt_product').html(template('tpl',info));
            }
        });

    }
    render();

    //搜索按钮
    $('.search_btn').on('click', function () {
        render();

    });
    //给价格 库存注册事件  可以进行排序
    $('.search_nav a[data-type]').on('click',function(){
        //若没有now 则 添加 其他人清楚now
        if($(this).hasClass('now')){
            //把箭头88
            $(this).find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
        }else{
            $(this).addClass('now');
            $(this).siblings().removeClass('now');
            $(this).siblings().find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
        render();
    })
});