$(function(){
  // 基于准备好的dom，初始化echarts实例
  var echLeft=document.querySelector('.echarts_left')
  var echRight=document.querySelector('.echarts_right')
  var myChart = echarts.init(echLeft);
  
  //销量的柱状图
  // 指定图表的配置项和数据
  var option = {
      title: {
          text: '2018年注册人数'
      },
      tooltip: {},
      legend: {
          data:['销量','人数'],
      },
      xAxis: {
          data: ["1月","2月","3月","4月","5月","6月"],
          data: ["1月","2月","3月","4月","5月","6月"]
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [175, 121, 256, 98, 167, 242]
      },
       {
          name:'人数',
          type:'bar',
          data:[200,158,345,198,247,320]
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);

  //右边品牌的饼状图
    // 指定图表的配置项和数据
    var myChart2 = echarts.init(echRight);
    var option2 = {
      title : {
          text: '热门品牌销售',
          subtext: '2018年11月',
          x:'center',
          textStyle:{
              
          }
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data: ['阿迪','耐克','新百伦','意尔康','回力']
      },
      series : [
          {
              name: '热门品牌',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                  {value:335, name:'阿迪'},
                  {value:310, name:'耐克'},
                  {value:234, name:'新百伦'},
                  {value:135, name:'意尔康'},
                  {value:1548, name:'回力'}
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
  
  // 使用刚指定的配置项和数据显示图表。
  myChart2.setOption(option2);
});