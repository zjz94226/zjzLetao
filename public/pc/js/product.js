/**
 * Created by Administrator on 2018/1/13.
 */
$(function () {
    var $form = $('form');
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
        //获取二级分类
        $.ajax({
            data: {
                page:1,
                pageSize: 1000
            },
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            success: function (info) {
                console.log(info);
                $('.dropdown-menu').html(template('tpl_drop',info));
            }
        });
    });

    //给下拉a点击事件
    $('.dropdown-menu').on('click','a', function () {
        $('.choose_second').text($(this).text());
        $('#brandId').val($(this).data('id'));
        $form.data('bootstrapValidator').updateStatus('brandId','VALID');
    });


    var imgArr = [];
    //表单验证
    $form.bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-hand-left'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '主人   二级分类要记得选哟'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '主人   商品名称要记得写哟'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '主人   商品描述要记得写哟'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '主人   商品库存要记得写哟'
                    },
                    regexp: {
                        regexp: /^\d*$/,
                        message: '主人  商品库存要为数字哟'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '主人   商品尺码要记得写哟'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '主人  商品尺码不对哟(例如 32-44 )'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '主人   商品原价要记得写哟'
                    },
                    regexp: {
                        regexp: /^\d*$/,
                        message: '主人  商品原价要为数字哟'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '主人   商品现价要记得写哟'
                    },
                    regexp: {
                        regexp: /^\d*$/,
                        message: '主人  商品现价要为数字哟'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '主人   请上传 3 张照片哟'
                    }
                }
            }

        }
    });

    //上传图片
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            //console.log(data.result.picAddr)

            imgArr.push(data.result);
            if(imgArr.length > 3){
                return;
            }
            $('.img_box').append('<img src="'+data.result.picAddr +'" alt="" width="100" height="100">')
            if(imgArr.length === 3){
                $form.data('bootstrapValidator').updateStatus('brandLogo','VALID');

            }else{
                $form.data('bootstrapValidator').updateStatus('brandLogo','INVALID');
            }
        }
    });

    //表单验证通过
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        var param = $form.serialize();
        param += "&picName1="+ imgArr[0].picName  +"&picAddr1=" + imgArr[0].picAddr +
                       "&picName2="+ imgArr[1].picName  +"&picAddr2=" + imgArr[1].picAddr +
                        "&picName3="+ imgArr[2].picName  +"&picAddr3=" + imgArr[2].picAddr ;
        $.ajax({
            data:param,
            type:'post',
            url: '/product/addProduct',
            success: function (info) {
                if(info.success){
                    page = 1;
                    render();
                    $form.data('bootstrapValidator').resetForm(true);
                    $('.choose_second').text('请选择二级分类');
                    $('.img_box img').remove();
                    $('#brandLogo').val('');
                    $('.addModal').modal('hide');
                }
            }
        });
    });
});