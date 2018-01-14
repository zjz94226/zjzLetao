/**
 * Created by Administrator on 2018/1/13.
 */

$(function () {
    var page = 1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data: {
                page:page,
                pageSize:pageSize
            },
            success: function (info) {
                console.log(info);
                $('tbody').html(template('tpl',info));
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    //size:"small",//设置控件的大小，mini, small, normal,large
                    useBootstrapTooltip:true,
                    tooltipTitles: function (type,page,current) {
                        switch(type){
                            case 'first':
                                return '首页';
                            case 'last':
                                return '末页';
                            case 'page':
                                return '去第'+page+'页';
                            case 'prev':
                                return '上一页';
                            case 'next':
                                return  '下一页';
                        }
                    },
                    itemTexts: function (type,page,current) {
                        switch(type){
                            case 'first':
                                return '首页';
                            case 'last':
                                return '末页';
                            case 'page':
                                return page;
                            case 'prev':
                                return '上一页';
                            case 'next':
                                return  '下一页';
                        }
                    },
                    onPageClicked:function(event, originalEvent, type,p){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page = p;
                        render();
                    }
                });
            }
        });
    }

    //添加分类按钮

    $('.btn_add').on('click', function () {
        $('.addModal').modal('show');
    });
    //表单验证
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-hand-left'
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '一级分类名不能为空哟 主人'
                    }
                }
            }
        }
    });
    //提交
    $('form').on('success.form.bv', function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            data: $('form').serialize(),
            url:'/category/addTopCategory',
            success: function (info) {

                if(info.success){
                    $('.addModal').modal('hide');
                    $('form').data('bootstrapValidator').resetForm(true);
                    page = 1;
                    render();
                }
            }
        });
    });
    $('.modal-footer [type="reset"]').on('click',function(){
        $('form').data('bootstrapValidator').resetForm(true);

    });
});
