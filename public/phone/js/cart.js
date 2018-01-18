/**
 * Created by Administrator on 2018/1/18.
 */
$(function () {


    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                callback :function(){
                    $.ajax({
                        url:'/cart/queryCart',
                        type: 'get',
                        success: function (info) {
                            console.log(info);
                            if(info.error==400){
                                location.href = 'login.html?backURL='+location.href;
                            }
                            setTimeout(function () {
                                $('#OA_task_2').html(template('tpl',{info:info}));
                                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh()
                            },1000);
                        }
                    });
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });


    $('#OA_task_2').on('tap','.btn_edit',function(){
        console.log(222);
        var $this = $(this);
        var id =$this.parent().data('id');
        var data = this.dataset;
        console.log(data);

        var html = template('tpl_edit',data).replace(/\n/g,'');

        mui.confirm(html,'编辑商品',['确定','取消'], function (e) {
            if(e.index === 0) {
                var size = $('.edit_size span.now').text();
                var num = $('.mui-numbox-input').val();
                $.ajax({
                    type: 'post',
                    url: '/cart/updateCart',
                    data: {
                        id:id,
                        size:size,
                        num:num
                    },
                    success: function (info) {
                        if(info.success){
                            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                        }
                    }
                });
                $('.money').text('00.00');
            }
        });
        mui('.mui-numbox').numbox();
        $('.edit_size span').on('tap', function () {
            $(this).addClass('now').siblings().removeClass('now');
        });

    });
    $('#OA_task_2').on('tap','.btn_del',function(){
        var $this = $(this);
        var id =$this.parent().data('id');
        mui.confirm('你要残忍的删除我吗 主人','温馨提示',['残忍删除','继续留下'], function (e) {
            if(e.index === 0){

                $.ajax({
                    type: 'get',
                    url :'/cart/deleteCart',
                    data: {
                        id:[id]
                    },
                    success: function (info) {
                        if(info.success){
                            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                        }

                    }
                });
            }
        });
    });
    $('#OA_task_2').on('change','.ck', function () {
        var $ck = $('.ck:checked');
        var total = 0;
        $ck.each(function (e,i) {
            var num = $(this).data('num');
            var price = $(this).data('price');
            total += num*price;
        });
        $('.money').text(total.toFixed(2));
    });
});