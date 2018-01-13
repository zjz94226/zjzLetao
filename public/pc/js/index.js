/**
 * Created by Administrator on 2018/1/11.
 */
$(function () {
    //图表生成
    var myChart1 = echarts.init(document.getElementById('ec1'));

    var option = {
        color: ['#3398DB'],
        title: {
            text: '2017年访问人数'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:['人数']
        },
        xAxis : [
            {
                type : 'category',
                data : ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'人数',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };
    myChart1.setOption(option);
    var myChart2 = echarts.init(document.getElementById('ec2'));

    var data = ['匡威','阿迪达斯','耐克','李宁','三叶草'];
    var option2 = {
        title : {
            text: '2017年度乐淘网鞋子销量',
            subtext: '火热销量',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: data
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : [50, 110],
                center: ['50%', '60%'],
                //roseType : 'area',
                data:[
                    {value:3435, name:data[0]},
                    {value:3150, name:data[1]},
                    {value:2364, name:data[2]},
                    {value:1335, name:data[3]},
                    {value:1548, name:data[4]}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    myChart2.setOption(option2);
});