/**
 * Created by Administrator on 2018/1/13.
 */
$(function () {

    var page = 1;
    var pageSize = 3;
    render();
    function render(){
        $.ajax({
            type: 'get',
            url:'/product/queryProductDetailList',
            data:{
                page:page,
                pageSize:pageSize
            },
            success: function (info) {
                console.log(info);
                $('tbody').html(template('tpl',info));
                $('#pagintor').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    current:page,
                    totalPages: Math.ceil(info.total/info.size),
                    onPageClicked: function (a,s,d,p) {
                        page = p;
                        render();
                    }
                })
            }
        });
    }
    ////下架 上架按钮
    //
    //$('tbody').on('click','.btn', function () {
    //
    //});
    //添加商品按钮
    $('.btn_add').on('click', function () {
        $('.addModal').modal('show');
    });
});