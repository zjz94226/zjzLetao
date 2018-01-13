/**
 * Created by Administrator on 2018/1/13.
 */
$(function () {
    var page = 1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            datatype: 'json',
            data: {
                page:page,
                pageSize:pageSize
            },
            success: function (info) {
                $('tbody').html(template('tpl',info));
                console.log(info);
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    //size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,p){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page = p;
                        render();
                    }
                });
            }
        });
    }

    //按钮绑定事件
    $('tbody').on('click','.btn', function () {
        var isDelete = $(this).parent().data('del');
        var id = $(this).parent().data('id');
        console.log(isDelete,id);
        $.ajax({
            type: 'post',
            url:'/user/updateUser',
            data: {
                id:id,
                isDelete:isDelete===0?1:0
            },
            success: function (info) {
                //console.log(info);
                if(info.success){
                    render();
                }
            }
        });
    });
});