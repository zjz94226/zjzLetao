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
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success: function (info) {
                console.log(info);
                $('tbody').html(template('tpl',info));
                $('#pagintor').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage:page,
                    totalPages: Math.ceil(info.total/info.size),
                    onPageClicked: function (a,s,d,p) {
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
        //获得一级分类
        $.ajax({
            type: 'get',
            url:'/category/queryTopCategoryPaging',
            data: {
                page:1,
                pageSize: 1000
            },
            success: function (info) {
                    $('ul.dropdown-menu').html(template('tpl_drop',info))
            }
        });
    });

    //给每个a注册
    $('ul.dropdown-menu').on('click','a', function () {
        $('.choose_first').text($(this).text());
        $('#categoryId').val($(this).data('id'));
        $('form').data('bootstrapValidator').updateStatus('categoryId','VALID')
    });


    //上传图片
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            $('.fileImg').attr('src',data.result.picAddr);
            $('#brandLogo').val(data.result.picAddr);
            $('form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
        }
    });

    //表单校验
    $('form').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-hand-left'
        },
        fields: {
            categoryId : {
                validators: {
                    notEmpty: {
                        message: '一级分类不能为空'
                    }
                }
            },
            brandLogo : {
                validators: {
                    notEmpty: {
                        message: '图片不能为空'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '二级分类不能为空'
                    }
                }
            }
        }

    });
    //表单提交
    $('form').on('success.form.bv', function (e) {
        e.preventDefault();
        //console.log('haha')
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$('form').serialize(),
            success: function (info) {
                if(info.success){
                    $('.choose_first').text('请选择一级分类');
                    $('.fileImg').attr('src','./images/none.png');
                    $('form').data('bootstrapValidator').resetForm(true);
                    $('.addModal').modal('hide');
                    page = 1;
                    render();
                }
            }
        });
    });

    $('.modal-footer [type="reset"]').on('click',function(){
        $('.choose_first').text('请选择一级分类');
        $('.fileImg').attr('src','./images/none.png');
        $('form').data('bootstrapValidator').resetForm(true);
        //$('.addModal').modal('hide');
    });
});