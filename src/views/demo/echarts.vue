<template>
  <div class="mod-demo-echarts">
    <el-alert
      title="提示："
      type="warning"
      :closable="false">
      <div slot-scope="description">
        <p class="el-alert__description">1.
          此Demo只提供ECharts官方使用文档，入门部署和体验功能。具体使用请参考：http://echarts.baidu.com/index.html</p>
      </div>
    </el-alert>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div id="J_chartLineBox" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <div id="J_chartBarBox" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="J_chartPieBox" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="J_chartScatterBox" class="chart-box"></div>
        </el-card>
      </el-col>

      <el-col :span="24">
        <el-card>
          <div id="J_chartMapBox" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import '../../assets/map/china.js'

export default {
  data() {
    return {
      chartLine: null,
      chartBar: null,
      chartPie: null,
      chartScatter: null,
      chartMap: null
    }
  },
  mounted() {
    this.initChartLine()
    this.initChartBar()
    this.initChartPie()
    this.initChartScatter()
    this.initChartMap("china", "中国")
  },
  activated() {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    if (this.chartLine) {
      this.chartLine.resize()
    }
    if (this.chartBar) {
      this.chartBar.resize()
    }
    if (this.chartPie) {
      this.chartPie.resize()
    }
    if (this.chartScatter) {
      this.chartScatter.resize()
    }
    if (this.chartMap) {
      this.chartMap.resize()
    }
  },
  methods: {
    // 折线图
    initChartLine() {
      let colors = ['#5793f3', '#d14a61', '#675bba'];
      let option = {
        color: colors,

        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['2015 降水量', '2016 降水量']
        },
        grid: {
          top: 70,
          bottom: 50
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[1]
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return '降水量  ' + params.value
                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                }
              }
            },
            data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[0]
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return '降水量  ' + params.value
                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                }
              }
            },
            data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '2015 降水量',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          },
          {
            name: '2016 降水量',
            type: 'line',
            smooth: true,
            data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
          }
        ]
      };

      this.chartLine = echarts.init(document.getElementById('J_chartLineBox'))
      this.chartLine.setOption(option)
      window.addEventListener('resize', () => {
        this.chartLine.resize()
      })
    },
    // 柱状图
    initChartBar() {
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '邮件营销',
            type: 'bar',
            stack: '广告',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'bar',
            stack: '广告',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'bar',
            stack: '广告',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '搜索引擎',
            type: 'bar',
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            markLine: {
              lineStyle: {
                normal: {
                  type: 'dashed'
                }
              },
              data: [
                [{type: 'min'}, {type: 'max'}]
              ]
            }
          },
          {
            name: '百度',
            type: 'bar',
            barWidth: 5,
            stack: '搜索引擎',
            data: [620, 732, 701, 734, 1090, 1130, 1120]
          },
          {
            name: '谷歌',
            type: 'bar',
            stack: '搜索引擎',
            data: [120, 132, 101, 134, 290, 230, 220]
          },
          {
            name: '必应',
            type: 'bar',
            stack: '搜索引擎',
            data: [60, 72, 71, 74, 190, 130, 110]
          },
          {
            name: '其他',
            type: 'bar',
            stack: '搜索引擎',
            data: [62, 82, 91, 84, 109, 110, 120]
          }
        ]
      }
      this.chartBar = echarts.init(document.getElementById('J_chartBarBox'))
      this.chartBar.setOption(option)
      window.addEventListener('resize', () => {
        this.chartBar.resize()
      })
    },
    // 饼状图
    initChartPie() {
      let option = {
        backgroundColor: '#2c343c',
        title: {
          text: 'Customized Pie',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 274, name: '联盟广告'},
              {value: 235, name: '视频广告'},
              {value: 400, name: '搜索引擎'}
            ].sort(function (a, b) {
              return a.value - b.value
            }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            }
          }
        ]
      }
      this.chartPie = echarts.init(document.getElementById('J_chartPieBox'))
      this.chartPie.setOption(option)
      window.addEventListener('resize', () => {
        this.chartPie.resize()
      })
    },
    // 散点图
    initChartScatter() {
      let option = {
        backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
          {offset: 0, color: '#f7f8fa'},
          {offset: 1, color: '#cdd0d5'}
        ]),
        title: {
          text: '1990 与 2015 年各国家人均寿命与 GDP'
        },
        legend: {
          right: 10,
          data: ['1990', '2015']
        },
        xAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          scale: true
        },
        series: [
          {
            name: '1990',
            data: [
              [28604, 77, 17096869, 'Australia', 1990],
              [31163, 77.4, 27662440, 'Canada', 1990],
              [1516, 68, 1154605773, 'China', 1990],
              [13670, 74.7, 10582082, 'Cuba', 1990],
              [28599, 75, 4986705, 'Finland', 1990],
              [29476, 77.1, 56943299, 'France', 1990],
              [31476, 75.4, 78958237, 'Germany', 1990],
              [28666, 78.1, 254830, 'Iceland', 1990],
              [1777, 57.7, 870601776, 'India', 1990],
              [29550, 79.1, 122249285, 'Japan', 1990],
              [2076, 67.9, 20194354, 'North Korea', 1990],
              [12087, 72, 42972254, 'South Korea', 1990],
              [24021, 75.4, 3397534, 'New Zealand', 1990],
              [43296, 76.8, 4240375, 'Norway', 1990],
              [10088, 70.8, 38195258, 'Poland', 1990],
              [19349, 69.6, 147568552, 'Russia', 1990],
              [10670, 67.3, 53994605, 'Turkey', 1990],
              [26424, 75.7, 57110117, 'United Kingdom', 1990],
              [37062, 75.4, 252847810, 'United States', 1990]
            ],
            type: 'scatter',
            symbolSize: function (data) {
              return Math.sqrt(data[2]) / 5e2
            },
            label: {
              emphasis: {
                show: true,
                formatter: function (param) {
                  return param.data[3]
                },
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(120, 36, 50, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {offset: 0, color: 'rgb(251, 118, 123)'},
                  {offset: 1, color: 'rgb(204, 46, 72)'}
                ])
              }
            }
          },
          {
            name: '2015',
            data: [
              [44056, 81.8, 23968973, 'Australia', 2015],
              [43294, 81.7, 35939927, 'Canada', 2015],
              [13334, 76.9, 1376048943, 'China', 2015],
              [21291, 78.5, 11389562, 'Cuba', 2015],
              [38923, 80.8, 5503457, 'Finland', 2015],
              [37599, 81.9, 64395345, 'France', 2015],
              [44053, 81.1, 80688545, 'Germany', 2015],
              [42182, 82.8, 329425, 'Iceland', 2015],
              [5903, 66.8, 1311050527, 'India', 2015],
              [36162, 83.5, 126573481, 'Japan', 2015],
              [1390, 71.4, 25155317, 'North Korea', 2015],
              [34644, 80.7, 50293439, 'South Korea', 2015],
              [34186, 80.6, 4528526, 'New Zealand', 2015],
              [64304, 81.6, 5210967, 'Norway', 2015],
              [24787, 77.3, 38611794, 'Poland', 2015],
              [23038, 73.13, 143456918, 'Russia', 2015],
              [19360, 76.5, 78665830, 'Turkey', 2015],
              [38225, 81.4, 64715810, 'United Kingdom', 2015],
              [53354, 79.1, 321773631, 'United States', 2015]
            ],
            type: 'scatter',
            symbolSize: function (data) {
              return Math.sqrt(data[2]) / 5e2
            },
            label: {
              emphasis: {
                show: true,
                formatter: function (param) {
                  return param.data[3]
                },
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(25, 100, 150, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {offset: 0, color: 'rgb(129, 227, 238)'},
                  {offset: 1, color: 'rgb(25, 183, 207)'}
                ])
              }
            }
          }
        ]
      }
      this.chartPie = echarts.init(document.getElementById('J_chartScatterBox'))
      this.chartPie.setOption(option)
      window.addEventListener('resize', () => {
        this.chartPie.resize()
      })
    },
    //地图
    initChartMap(pName, Chinese_) {
      var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'];

      var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门'];

      var seriesData = [{
        name: '北京',
        value: 100
      }, {
        name: '天津',
        value: 0
      }, {
        name: '上海',
        value: 60
      }, {
        name: '重庆',
        value: 0
      }, {
        name: '河北',
        value: 60
      }, {
        name: '河南',
        value: 60
      }, {
        name: '云南',
        value: 0
      }, {
        name: '辽宁',
        value: 0
      }, {
        name: '黑龙江',
        value: 0
      }, {
        name: '湖南',
        value: 60
      }, {
        name: '安徽',
        value: 0
      }, {
        name: '山东',
        value: 60
      }, {
        name: '新疆',
        value: 0
      }, {
        name: '江苏',
        value: 0
      }, {
        name: '浙江',
        value: 0
      }, {
        name: '江西',
        value: 0
      }, {
        name: '湖北',
        value: 60
      }, {
        name: '广西',
        value: 60
      }, {
        name: '甘肃',
        value: 0
      }, {
        name: '山西',
        value: 60
      }, {
        name: '内蒙古',
        value: 0
      }, {
        name: '陕西',
        value: 0
      }, {
        name: '吉林',
        value: 0
      }, {
        name: '福建',
        value: 0
      }, {
        name: '贵州',
        value: 0
      }, {
        name: '广东',
        value: 597
      }, {
        name: '青海',
        value: 0
      }, {
        name: '西藏',
        value: 0
      }, {
        name: '四川',
        value: 60
      }, {
        name: '宁夏',
        value: 0
      }, {
        name: '海南',
        value: 60
      }, {
        name: '台湾',
        value: 0
      }, {
        name: '香港',
        value: 0
      }, {
        name: '澳门',
        value: 0
      }];


      var tmpSeriesData = pName === "china" ? seriesData : [];
      var option = {
        title: {
          text: Chinese_ || pName,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (p / km2)'
        },
        series: [
          {
            name: Chinese_ || pName,
            type: 'map',
            mapType: pName,
            roam: false,//是否开启鼠标缩放和平移漫游
            data: tmpSeriesData,
            top: "3%",//组件距离容器的距离
            zoom:1.3,
            selectedMode : 'single',

            label: {
              normal: {
                show: true,//显示省份标签
                textStyle: {color: "#fbfdfe"}//省份标签字体颜色
              },
              emphasis: {//对应的鼠标悬浮效果
                show: true,
                textStyle: {color: "#323232"}
              }
            },
            itemStyle: {
              normal: {
                borderWidth: .9,//区域边框宽度
                borderColor: '#0550c3',//区域边框颜色
                areaColor: "#101922",//区域颜色

              },

              emphasis: {
                borderWidth: .1,
                borderColor: '#23cf09',
                areaColor: "#ea7126",
              }
            },
          }
        ]

      };

      this.chartMap = echarts.init(document.getElementById('J_chartMapBox'))
      this.chartMap.setOption(option)
      this.chartMap.off("click");

      if (pName === "china") { // 全国时，添加click 进入省级
        this.chartMap.on('click', (param) => {

          // 遍历取到provincesText 中的下标  去拿到对应的省js
          for (var i = 0; i < provincesText.length; i++) {
            if (param.name === provincesText[i]) {

              //显示对应省份的方法
              this.showProvince(provinces[i], provincesText[i]);
              break;
            }
          }
          if (param.componentType === 'series') {
            var provinceName = param.name;
            // $('#box').css('display', 'block');
            // $("#box-title").html(provinceName);

          }
        });
      } else { // 省份，添加双击 回退到全国
        this.chartMap.on("dblclick", () => {
          this.initChartMap("china", "中国");
        });
      }

      window.addEventListener('resize', () => {
        this.chartMap.resize()
      })
    },

    // 展示对应的省
    showProvince(pName, Chinese_) {
      //这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
      this.loadBdScript('$' + pName + 'JS', 'src/assets/map/province/' + pName + '.js', () => {
        this.initChartMap(Chinese_);
      });
    },

    // 加载对应的JS
    loadBdScript(scriptId, url, callback) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      if (script.readyState) {  //IE
        script.onreadystatechange =  () =>{
          if (script.readyState === "loaded" || script.readyState === "complete") {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {  // Others
        script.onload =  ()=> {
          callback();
        };
      }
      script.src = url;
      script.id = scriptId;
      document.getElementsByTagName("head")[0].appendChild(script);
    }

  }
}
</script>

<style lang="scss">

.mod-demo-echarts {
  > .el-alert {
    margin-bottom: 10px;
  }

  > .el-row {
    margin-top: -10px;
    margin-bottom: -10px;

    .el-col {
      padding-top: 10px;
      padding-bottom: 10px;

      > div {
        background-image: url("../../assets/img/index_bg.png");
      }
    }
  }

  .chart-box {
    min-height: 400px;
  }
}
</style>
