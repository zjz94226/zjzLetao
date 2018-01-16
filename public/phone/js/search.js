/**
 * Created by Administrator on 2018/1/16.
 */
$(function () {
    //渲染

    //console.log(arr);
    function getHistory(){
        var arr = JSON.parse(localStorage.getItem('lt_search_history'));
        return arr;
    }
    function setHistory(arr) {
        localStorage.setItem('lt_search_history',JSON.stringify(arr));
    }

    function render() {
        var arr = getHistory();
        $('.lt_history').html(template('tpl',{arr:arr}));
    }
    render();

    //删除一个
    $('.lt_history').on('click','.btn_del', function () {
        //获取第几个
        var index = $(this).data('id');
        //获得历史数组
        var arr = getHistory();
        //删除目标数组
        arr.splice(index,1);
        //将数组存入记录
        setHistory(arr);
        //重新渲染
        render();

    });


    //添加历史记录 搜索按钮
    $('.search_btn').on('click', function () {
        var arr = getHistory();
        var search = $('.search_text').val();
        //添加前 判断是否存在该记录
        var index = arr.indexOf(search);
        console.log(index);
        if(index < 0){
            arr.unshift(search);
        }else{
            arr.splice(index,1);
            arr.unshift(search);
        }
        //若记录大于10  删除最后一条
        if(arr.length > 10){
            arr.pop();
        }
        //存储
        setHistory(arr);
        //渲染
        render();
        //跳转页面
        location.href= 'searchList.html?key='+search;
    });

    //点击清空记录 弹出确认框
    $('.lt_history').on('click','.title_del', function () {
        mui.confirm('你确定要清空所有历史记录么','温馨提示', function (e) {
           if(e.index === 1){
               //清空所有
               var arr = [];
               setHistory(arr);
               render();
           }
        });
    });
});