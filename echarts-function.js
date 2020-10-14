//画仪表盘的函数配置
function drawYibiao(data, title) {
    var option = {
        title: {
            text: title,
            top: 20,
            left: 'center',
            textStyle: {
                fontSize: 30,
            }
        },
        animation: false,
        series: [{
            name: '业务指标',
            type: 'gauge',
            radius: '90%',
            center: ['50%', '75%'],
            splitNumber: 3,
            startAngle: 180,
            endAngle: 0,
            axisLine: {
                lineStyle: {
                    width: 34,
                    color: [
                        [0.33, '#F85A5A'],
                        [0.66, '#FCCA38'],
                        [1, '#80EC46']
                    ]
                }
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            pointer: {
                length: '70%',
                width: 8
            },
            markPoint: {
                symbol: 'circle'
            },
            detail: {
                formatter: (value) => {
                    // 判断
                    if (0 < value && value <= 33) {
                        return '偏低'
                    } else if (33 < value && value <= 66) {
                        return '中等'
                    } else if (value > 66) {
                        return '优秀'
                    }
                },
                offsetCenter: [0, '20%'],
                fontSize: 48
            },
            data: [{ value: data }]
        }]
    }
    return echarts_base64(option, '')
}

//画饼图的函数配置
function drawbingtu(data, title, money) {
    var option = {
        title: {
            text: title,
            left: 'center',
            top: 20,
            textStyle: {
                fontSize: 30,
            }
        },
        animation: false,
        legend: {
            // orient: 'vertical',
            left: 'center',
            top: 'bottom',
            itemWidth: 20,
            itemHeight: 16,
            textStyle: {
                fontSize: 28
            },
            data: data.map ? Object.keys(data.map) : ''
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            minAngle: 12, //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
            avoidLabelOverlap: true,   //是否启用防止标签重叠策略
            center: ['50%', '50%'],
            label: {
                textStyle: {
                    color: '#000',  // 改变标示文字的颜色
                    fontSize: 28
                },
                formatter: function (value) {
                    let fanwei = value.data.name.split('万')[0];
                    let moneys = money.split('万')[0];
                    if (fanwei.indexOf('-') > -1) {
                        let arr = fanwei.split('-');
                        if (Number(moneys) >= arr[0] && Number(moneys) < arr[1]) {
                            return `${value.percent}%（当前企业地位）`
                        } else {
                            return `${value.percent}%`
                        }
                    } else {
                        if (Number(moneys) > Number(fanwei)) {
                            return `${value.percent}%（当前企业地位）`
                        } else {
                            return `${value.percent}%`
                        }
                    }
                },
                rich: {}
            },
            color: ['#6395ff', '#d0dffe', '#62daac', '#d0f4e6', '#647798', '#d2d6e1', '#f8c021', '#fcebbd', '#e96c5a', '#f9d4ce', '#75cbee', '#d6eefa'],
            data: data.map ? tool.key_objs(data.map) : []
        }]
    };
    return echarts_base64(option, '');
}

//画饼图
function drawbingtuNormol(data, title, arr) {
    var option = {
        title: {
            text: title,
            left: 'center',
            top: 10,
            textStyle: {
                fontSize: 28,
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            bottom: 10,
            left: 'center',
            data: arr
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                minAngle: 12, //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
                avoidLabelOverlap: true,   //是否启用防止标签重叠策略
                center: ['50%', '50%'],
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    return echarts_base64(option, '');
}

//画折线图的函数配置
function drawZhe(data, title, rotate, Isshow) {
    var option = {
        title: {
            text: title,
            left: 'center',
            top: 20,
            textStyle: {
                fontSize: 30,
            }
        },
        animation: false,
        grid: {
            left: '0%',
            right: '8%',
            bottom: '10%',
            top: '30%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#ddd',
                    type: 'dashed'
                },
            },
            axisLabel: {
                textStyle: {
                    color: '#333',
                    fontSize: 24
                },
                rotate: rotate,
            },
            axisTick: {
                show: false
            },
            data: Object.keys(data)
        },
        yAxis: {
            // type: 'value',
            show: false
        },
        series: [{
            data: Object.values(data),
            symbolSize: 14,
            type: 'line',
            color: '#7EBAF6',
            lineStyle: {
                width: 3.0
            },
            label: {
                normal: {
                    show: Isshow,
                    position: 'top',
                    formatter: '{c}',
                    textStyle: {
                        color: '#3399ea',  // 改变标示文字的颜色
                        fontSize: 18
                    },
                }
            },
        }]
    };
    return echarts_base64(option, '');
}

//画地图的函数配置
// type：图例的类型 布尔型  true：柱状图图例  false：范围图例
function drawMap(data, type, name) {
    var max_min = [];
    data.forEach(e => {
        max_min.push(e.value)
    });
    var minVal,//最小值
        maxVal,//最大值
        maxNum;//最大值位数

    minVal = Math.min.apply(Math, max_min);
    maxVal = Math.max.apply(Math, max_min);
    maxNum = parseInt(maxVal).toString().length;
    var a = parseInt(maxVal.toString().substring(0, 1)) + 1;
    for (let i = 0; i < maxNum - 1; i++) {
        a += '0'
    }
    var int_a_num = parseInt(a) / 5;
    var visualData = [
        {
            gt: 0 * int_a_num,
            lte: 1 * int_a_num,
            label: 0 + '-' + tool.numberFormat(1 * int_a_num) + '家该企业'
        }, {
            gt: 1 * int_a_num,
            lte: 2 * int_a_num,
            label: tool.numberFormat(1 * int_a_num) + '-' + tool.numberFormat(2 * int_a_num) + '家该企业'
        }, {
            gt: 2 * int_a_num,
            lte: 3 * int_a_num,
            label: tool.numberFormat(2 * int_a_num) + '-' + tool.numberFormat(3 * int_a_num) + '家该企业'
        }, {
            gt: 3 * int_a_num,
            lte: 4 * int_a_num,
            label: tool.numberFormat(3 * int_a_num) + '-' + tool.numberFormat(4 * int_a_num) + '家该企业'
        }, {
            gt: 4 * int_a_num,
            label: tool.numberFormat(4 * int_a_num) + '家该企业'
        }
    ]
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: name,
            left: 'center',
            top: 20,
            textStyle: {
                fontSize: 30,
            }
        },
        animation: false,
        backgroundColor: '#ffffff',
        tooltip: {
            trigger: 'item',
            formatter: function (param) {
                var html = param.seriesName;
                if (param.data) {
                    html += '<br>' + param.data.name + '：' + (param.data.value || '-');
                }
                return html;
            }
        },
        visualMap: [
            {
                // min: 0,
                // max: maxVal,
                show: type,
                left: 40,
                itemWidth: 20, //图形的宽度，即长条的宽度。
                itemHeight: 150, //图形的高度，即长条的高度。
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                inRange: {
                    color: ["#e0ffff", "#006edd"]
                },
                textStyle: {
                    fontSize: 20
                }
            },
            {
                calculable: true,
                realtime: false,
                splitNumber: 16,
                show: !type,
                type: 'piecewise',
                bottom: 20,
                left: 13,
                itemWidth: 28,
                inRange: {
                    color: ['#e0ffff', '#006edd'],
                },
                textStyle: {
                    fontSize: 20
                },
                pieces: visualData
            }
        ],
        series: [{
            name: name,
            type: 'map',
            top: 60,
            left: 160,
            right: 100,
            zoom: 0.9,   //这里是关键，一定要放在 series中
            mapType: 'china',
            itemStyle: {
                emphasis: {
                    areaColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0, color: '#00EEEE' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#00FF7F' // 100% 处的颜色
                    }], false),
                },
                normal: {
                    borderWidth: .5, //区域边框宽度
                    borderColor: '#009fe8', //区域边框颜色
                },
            },
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            data: data

        }]
    };
    return echarts_base64(option, '');
}

//法院公告统计分析图
//1
function fayuan1(e, title) {

    const arre = Object.keys(e).map(key => key === 'beiGao' ? '被告' : '原告');
    // 指定相关的配置项和数据
    var option = {
        title: {
            text: title,
            left: 'center',
            top: 20,
            textStyle: {
                fontSize: 30,
            }
        },
        legend: {
            left: 'center',
            top: 'bottom',
            itemWidth: 20,
            itemHeight: 16,
            textStyle: {
                fontSize: 24
            },
            data: arre
        },
        animation: false,
        series: [{
            name: '访问来源',
            type: 'pie',
            minAngle: 12, //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
            avoidLabelOverlap: true,   //是否启用防止标签重叠策略
            radius: ['30%', '50%'],
            color: ['#C23531', '#FFA500'],
            label: {
                textStyle: {
                    color: '#000',  // 改变标示文字的颜色
                    fontSize: 24
                },
                formatter: '{b} : {c}',
            },

            labelLine: {
                normal: {
                    show: true
                }
            },
            data: tool.fayuandata(e)
        }]
    };
    console.log('specil draw');
    return echarts_base64(option, '');
}

//2
function fayuan2(gaoData, yuanGao, beiGao, title) {
    var option = {
        title: {
            text: title,
            left: 'center',
            top: 20,
            textStyle: {
                fontSize: 30,
            }
        },
        animation: false,
        grid: {
            top: '25%',
            left: '15%',
            bottom: "15%"
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#ddd'
                }
            },
            axisLabel: {
                color: '#333',
                fontSize: 24
            },
            axisTick: {
                show: false
            },
            data: Object.keys(gaoData)
        },
        yAxis: {
            type: 'value',

            //与x轴平行的线样式
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#ddd',
                    width: 1,
                    type: 'dashed'
                }
            },
            axisLabel: {
                color: '#333',
                fontSize: 24
            },
            axisLine: {
                lineStyle: {
                    color: '#ddd',

                }
            },
            axisTick: {
                show: false
            },
        },
        legend: {
            orient: 'horizontal',
            x: 'center',
            y: 'bottom',
            itemWidth: 20,
            itemHeight: 16,
            textStyle: {
                fontSize: 24
            },
            data: gaoData.length || yuanGao.length ? ['原告', '被告'] : []
        },
        series: [{
            name: "原告",
            data: yuanGao,
            type: 'line',
            showSymbol: false,
            smooth: true,
            itemStyle: {
                //线的颜色
                color: "#C23531",
                fontSize: 24
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1, //变化度
                    //三种由深及浅的颜色
                    [{
                        offset: 0,
                        color: "#C23531"
                    },

                    {
                        offset: 0.5,
                        color: "#fff"
                    }
                    ]
                )
            }
        },
        {
            name: "被告",
            data: beiGao,
            type: 'line',
            smooth: true,
            showSymbol: false,
            itemStyle: {
                //线的颜色
                color: "#FFA500"
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1, //变化度
                    //三种由深及浅的颜色
                    [{
                        offset: 0,
                        color: "#FFA500"
                    },
                    {
                        offset: 0.5,
                        color: "#fff"
                    }
                    ]
                )
            }
        }
        ]
    };
    return echarts_base64(option, '');
}

//招投标
function zhaotoubiao(e) {
    // 指定相关的配置项和数据
    var option = {
        title: {
            text: '招投标统计分析图',
            left: 'center',
            top: 20,
            textStyle: {
                fontSize: 30
            }
        },
        animation: false,
        grid: {
            top: '25%',
            left: '15%'
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#ddd'
                }
            },
            axisLabel: {
                fontSize: 22,
                color: '#333'
            },
            axisTick: {
                show: false
            },
            data: Object.keys(e)
        },
        yAxis: {
            type: 'value',
            //与x轴平行的线样式
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#ddd',
                    width: 1,
                    type: 'dashed'
                }
            },
            axisLabel: {
                fontSize: 22,
                color: '#333'
            },
            axisLine: {
                lineStyle: {
                    color: '#ddd'
                }
            },
            axisTick: {
                show: false
            },
        },
        // legend: {
        //     orient: 'horizontal',
        //     x: 'center',
        //     y: 'bottom',
        //     data: ['发明公开', '外观设计', '实用新型']
        // },
        series: [{
            // name: "发明公开",
            data: Object.values(e),
            type: 'line',
            showSymbol: false,
            smooth: true,
            itemStyle: {
                fontSize: 24,
                //线的颜色
                color: "#7FB7F8"
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1, //变化度
                    //三种由深及浅的颜色
                    [{
                        offset: 0,
                        color: "#7FB7F8"
                    },

                    {
                        offset: 0.5,
                        color: "#fff"
                    }
                    ]
                )
            }
        },

        ]
    };
    return echarts_base64(option, '');
}

//画柱状图
// data：数据// domId：DOM-id// rotate：X坐标旋转角度// title1：一级标题// title2：二级标题// Isshow：柱状图数量// barWidth：柱状图宽度
function drawZhu(data, rotate, title1, title2, Isshow, barWidth) {
    // 指定相关的配置项和数据
    var option = {
        title: [{
            text: title1,
            top: 20,
            left: 'center',
            textStyle: {
                fontSize: 30,
            }
        }, {
            text: title2,
            top: 55,
            left: '5%',
            show: true,
            textStyle: {
                fontSize: 25,
                fontWeight: '400'
            }
        }],
        animation: false,
        xAxis: {
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontSize: 24,
                    color: '#333'
                },
                rotate: rotate,
            },
            axisLine: {
                lineStyle: {
                    color: '#ddd',
                    type: 'dashed',
                    width: '2.4'
                }
            },

            type: 'category',
            data: Object.keys(data),
        },
        yAxis: {
            show: false, //不显示y轴
        },
        grid: {
            left: '3%',
            right: '8%',
            bottom: '10%',
            top: '30%',
            containLabel: true
        },
        series: [
            // 柱状图
            {
                data: Object.values(data),
                type: 'bar',
                barWidth: barWidth * 2,
                label: {
                    show: Isshow,
                    position: 'top',
                    color: '#333',
                    fontSize: 24
                },
                itemStyle: {
                    normal: {
                        fontSize: 24,
                        color: function (params) {
                            if (params.value >= 0) {
                                return '#3398DB';
                            } else {
                                return 'red';
                            }
                        }
                    }
                }

            }

        ]
    };
    return echarts_base64(option, '');
}

//对外投资行业分析饼状图
function drawhangyebing(e) {
    // 指定相关的配置项和数据
    var option = {
        title: {
            text: '对外投资行业统计分析图（全国）',
            left: 'center',
            top: 20,
            textStyle: {
                fontSize: 30,
            }
        },
        animation: false,
        legend: {
            left: 'center',
            top: 'bottom',
            itemWidth: 20,
            itemHeight: 16,
            textStyle: {
                fontSize: 24
            },
            data: Object.keys(e)
        },
        series: [{
            name: '面积模式',
            type: 'pie',
            radius: [0, 200],
            roseType: 'area',
            label: {
                normal: {
                    textStyle: {
                        fontSize: 22,
                        color: '#000'  // 改变标示文字的颜色
                    }
                }
            },
            color: ['#6395ff', '#d0dffe', '#62daac', '#d0f4e6', '#647798', '#d2d6e1', '#f8c021', '#fcebbd', '#e96c5a', '#f9d4ce', '#75cbee', '#d6eefa'],
            data: tool.key_objs(e),
            labelLine: {
                normal: {
                    show: true,
                    length: 1
                }
            },
        }]
    };
    return echarts_base64(option, '');
}

//投资收益分析
function drawtouzishou(vendInc, arr) {
    // 指定相关的配置项和数据
    var option = {
        title: {
            text: '投资收益分析统计分析图',
            left: 'center'
        },
        animation: false,
        legend: {
            // left: 'right',
            right: '20%',
            top: 50,
            bottom: 100,
            width: '10%',
            orient: '',
            data: arr
        },
        grid: {
            top: 'center',
            left: '10%'
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: '45%',
            center: ['30%', '50%'],
            color: ['#6395ff', '#d0dffe', '#62daac', '#d0f4e6', '#647798', '#d2d6e1', '#f8c021', '#fcebbd', '#e96c5a', '#f9d4ce', '#75cbee', '#d6eefa'],
            label: {
                formatter: '{per|{d}%}',
                rich: {}
            },
            itemStyle: {
                color: function (value) {
                    return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);

                },
            },
            data: tool.key_objs(vendInc),
        }]
    };
    return echarts_base64(option, 1010);
}

//净利率函数柱状图
function drawjinglilv(e) {
    // 指定相关的配置项和数据
    var option = {
        title: [{
            text: '净利率趋势分析图',
            top: 20,
            left: 'center',
            textStyle: {
                fontSize: 28,
            }
        }, {
            text: `净利率区间`,
            top: 55,
            left: '5%',
            textStyle: {
                fontSize: 24,
                fontWeight: '400'
            }
        }],
        animation: false,
        xAxis: {
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontSize: 24,
                    color: "#333"
                },
                rotate: 45,
            },
            axisLine: {
                lineStyle: {
                    color: "#ddd",
                    type: "dashed",
                    width: "2.4"
                }
            },
            type: "category",

            data: Object.keys(e)
        },
        yAxis: {
            show: false, //不显示y轴
        },
        grid: {
            left: "0%",
            right: "4%",
            bottom: "10%",
            top: "25%",
            containLabel: true
        },
        series: [
            // 柱状图
            {
                data: Object.values(e).map((val) => {
                    return val.slice(0, -1)
                }),
                type: "bar",
                barWidth: "34",
                itemStyle: {
                    normal: {
                        fontSize: 24,
                        color: function (params) {
                            if (params.value >= 0) {
                                return "#3398DB";
                            } else {
                                return "red";
                            }
                        }
                    }
                }
            }
        ]
    };
    return echarts_base64(option, '');
}

//专利公布趋势统计图
function drawzhuanliqushi(e) {
    var option = {
        title: {
            text: '专利公布趋势统计分析图',
            left: 'center',
            top: 20,
            textStyle: {
                fontSize: 28,
            },
        },
        animation: false,
        grid: {
            top: '25%',
            left: '15%',
            bottom: "15%"
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#ddd'
                }
            },
            axisLabel: {
                fontSize: 24,
                color: '#333'
            },
            axisTick: {
                show: false
            },
            data: tool.uniqueData(e)
        },
        yAxis: {
            type: 'value',
            //与x轴平行的线样式
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#ddd',
                    width: 1,
                    type: 'dashed'
                }
            },
            axisLabel: {
                fontSize: 24,
                color: '#333'
            },
            axisLine: {
                lineStyle: {
                    color: '#ddd'
                }
            },
            axisTick: {
                show: false
            },
        },
        legend: {
            // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
            orient: 'horizontal',
            // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
            x: 'center',
            // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
            y: 'bottom',
            itemWidth: 20,
            itemHeight: 16,
            textStyle: {
                fontSize: 22
            },
            data: ['发明专利', '外观设计专利', '实用新型专利']
        },
        series: [{
            name: "发明专利",
            data: e.发明专利 ? Object.values(e.发明专利) : '',
            type: 'line',
            showSymbol: false,
            smooth: true,
            itemStyle: {
                fontSize: 24,
                //线的颜色
                color: "#7FB7F8"
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1, //变化度
                    //三种由深及浅的颜色
                    [{
                        offset: 0,
                        color: "#7FB7F8"
                    },

                    {
                        offset: 0.5,
                        color: "#fff"
                    }
                    ]
                )
            }
        },
        {
            name: "外观设计专利",
            data: e.外观设计专利 ? Object.values(e.外观设计专利) : '',
            type: 'line',
            smooth: true,
            showSymbol: false,
            itemStyle: {
                fontSize: 24,
                //线的颜色
                color: "#67C23B"
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1, //变化度
                    //三种由深及浅的颜色
                    [{
                        offset: 0,
                        color: "#67C23B"
                    },
                    {
                        offset: 0.5,
                        color: "#fff"
                    }
                    ]
                )
            }
        },
        {
            name: "实用新型专利",
            data: e.实用新型专利 ? Object.values(e.实用新型专利) : '',
            type: 'line',
            smooth: true,
            showSymbol: false,
            itemStyle: {
                fontSize: 24,
                //线的颜色
                color: "#BDA5E8",
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1, //变化度
                    //三种由深及浅的颜色
                    [{
                        offset: 0,
                        color: "#BDA5E8"
                    },

                    {
                        offset: 0.5,
                        color: "#fff"
                    }
                    ]
                )
            }
        }
        ]
    };
    return echarts_base64(option, '');
}

//工资分布统计分析图
function drawGongZi(e, map) {
    var option = {
        title: [{
            text: '工资分布统计分析图',
            top: 20,
            left: 'center',
            textStyle: {
                fontSize: 30
            }
        }, {
            text: `平均工资：￥${e.description}`,
            top: 100,
            left: '5%',
            textStyle: {
                fontSize: 24,
                fontWeight: '400'
            }
        }],
        animation: false,
        xAxis: {
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontSize: 22,
                    color: '#333'
                },
            },
            axisLine: {
                lineStyle: {
                    color: '#ddd',
                    type: 'dashed',
                    width: '1.2'
                }
            },
            type: 'category',

            data: ['0-5k', '5-10k', '10-15k', '15-20k', '20-25k', '25k以上']
        },
        yAxis: {
            show: false, //不显示y轴
        },
        grid: {
            left: '0%',
            right: '4%',
            bottom: '10%',
            top: '25%',
            containLabel: true
        },
        series: [
            // 柱状图
            {
                data: [map['0-5k'], map['5-10k'], map['10-15k'], map['15-20k'], map['20-25k'], map['25k以上'], map['面议']],
                type: 'bar',
                barWidth: '34',

                itemStyle: {
                    normal: {
                        color: function (params) {
                            if (params.value >= 0) {
                                return '#3398DB';
                            } else {
                                return 'red';
                            }
                        },
                        label: {
                            show: true,
                            position: 'top',
                            color: '#333',
                            fontSize: 22,
                            formatter: (value) => {
                                // return
                                let sum = 0;
                                // for (let i = 0; i < Object.values(gongziInfo).length; i++) {
                                //     sum += Object.values(gongziInfo)[i];
                                // }
                                Object.values(map).forEach((val) => {
                                    sum += val;
                                })

                                return Math.round((value.data / sum) * 100) + '%'
                                // return value.data100|
                            }
                        }
                    }
                }

            }

        ]
    };
    return echarts_base64(option, '');
}

//招聘行业占比统计分析图
function drawZhaoPin() {
    // 指定相关的配置项和数据
    var option = {
        title: {
            text: '招聘行业占比统计分析图',
            left: 'center',
            top: 20,
            textStyle: {
                fontSize: 28
            },
        },
        animation: false,
        legend: {
            left: 'center',
            top: 'bottom',
            itemWidth: 20,
            itemHeight: 16,
            textStyle: {
                fontSize: 22
            },
            data: ['互联网IT', '金融', '房地产/建筑', '贸易/零售/物流', '教育/传媒/广告', '服务业', '市场/销售', '人事/财务/行政']
        },
        series: [{
            name: '面积模式',
            type: 'pie',
            radius: ['20%', '60%'],
            // center: ['50%', '50%'],
            roseType: 'area',
            color: ['#6395ff', '#d0dffe', '#62daac', '#d0f4e6', '#647798', '#d2d6e1', '#f8c021', '#fcebbd', '#e96c5a', '#f9d4ce', '#75cbee', '#d6eefa'],
            label: {
                textStyle: {
                    fontSize: 22,
                    color: '#000'  // 改变标示文字的颜色
                },
                formatter: '{per|{d}%}',
                rich: {}
            },

            data: [
                { value: 40, name: '人事/财务/行政' },
                { value: 80, name: '市场/销售' },
                { value: 50, name: '服务业' },
                { value: 70, name: '教育/传媒/广告' },
                { value: 60, name: '贸易/零售/物流' },
                { value: 40, name: '房地产/建筑' },
                { value: 50, name: '金融' },
                { value: 60, name: '互联网IT' },

            ]
        }]
    };
    return echarts_base64(option, '');
}

//画雷达图
function drawLeida(e) {
    var option = {
        legend: {
            x: "center",
            y: "bottom",
            itemWidth: 20,
            itemHeight: 16,
            data: ["2017"]
        },
        grid: {
            left: '3%',
            right: '20%',
            bottom: '3%',
            containLabel: true
        },
        radar: {
            splitNumber: 5, //圈数
            name: {
                textStyle: {
                    color: "#999",
                    fontSize: 24
                }
            },
            indicator: [
                {
                    name: "营商能力",
                    max: 5,
                    radius: 20,
                    center: ["50%", "50%"],
                    axisLabel: {
                        show: true,
                        fontSize: 22,
                        color: "#333"
                    }
                },
                { name: "安全性", max: 5 },
                { name: "成长性", max: 5 },
                { name: "收益性", max: 5 },
                { name: "资本效率", max: 5 }
            ],
            splitArea: {
                show: true,
                areaStyle: {
                    color: [
                        "rgba(51, 152, 219, 0.2)",
                        "rgba(51, 152, 219, 0.4)",
                        "rgba(51, 152, 219, 0.6)",
                        "rgba(51, 152, 219, 0.8)",
                        "rgba(51, 152, 219, 1)"
                    ],
                    shadowBlur: 0
                }
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(255, 255, 255, 0.5)"
                }
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255, 255, 255, 0.5)"
                }
            }
        },
        series: [
            {
                // name: '2017',
                type: "radar",
                symbol: "circle",
                symbolSize: 7,
                tooltip: {
                    trigger: "item"
                },

                itemStyle: {
                    normal: {
                        fontSize: 22,
                        color: "#e8bd00",
                        lineStyle: {
                            width: 2,
                            color: "#e8bd00"
                        }
                    }
                },
                data: [
                    {
                        value: e
                    }
                ]
            }
        ]
    };
    return echarts_base64(option, '');
}

//绘制无数据的图
function drawNoData(text) {
    var imageData = fs.readFileSync("./img/zanwu.png"); // 例：fileUrl="D:\\test\\test.bmp"
    var w = 964,
        h = 624;
    const canvas = createCanvas(w, h) // 按照微信官方要求，长宽比5:4
    const ctx = canvas.getContext('2d')
    //绘制文本
    ctx.beginPath();
    ctx.font = 'normal normal 200 28px "Noto Sans CJK SC Regular"';
    ctx.fillStyle = "#333333";
    //水平对齐方式
    ctx.textAlign = "center";
    ctx.fillText(text, (w - (text.length) * 3) / 2, 30);
    const backgroundImg = new Image();
    backgroundImg.src = imageData;
    ctx.drawImage(backgroundImg, w / 4, 120, 404, 440);
    var a = canvas.toDataURL("image/png", 1);
    return '1' + a;
}

/*===============================================================================================*/

//新增甜甜圈图
function drawTianTu(e, title) {
    var option = {
        title: {
            text: title,
            left: 'center',
            top: 20,
            textStyle: {
                fontSize: 28,
            }
        },
        legend: {
            left: 'center',
            top: 'bottom',
            textStyle: {
                fontSize: 22,
            },
            data: e ? Object.keys(e) : ''
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                minAngle: 12, //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
                avoidLabelOverlap: true,   //是否启用防止标签重叠策略
                radius: ['30%', '50%'],
                color: ['#6395ff', '#d0dffe', '#62daac', '#d0f4e6', '#647798', '#d2d6e1', '#f8c021', '#fcebbd', '#e96c5a', '#f9d4ce', '#75cbee', '#d6eefa'],
                label: {
                    normal: {
                        formatter: '{d}%',
                        show: true,
                        textStyle: {
                            color: 'black',
                            fontSize: 24
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold',
                            color: "#333"
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: "#FFFFFF", borderWidth: 5,
                    }
                },
                data: e ? tool.key_objs(e) : []
            }
        ]
    };
    return echarts_base64(option, '');
}

//新增面积形饼图
function drawMi0Tu(e, title) {
    var option = {
        title: {
            text: title,
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            left: 'center',
            top: 'bottom',
            data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                name: '面积模式',
                type: 'pie',
                radius: [0, 110],
                // center: ['75%', '50%'],
                color: ['#6395ff', '#d0dffe', '#62daac', '#d0f4e6', '#647798', '#d2d6e1', '#f8c021', '#fcebbd', '#e96c5a', '#f9d4ce', '#75cbee', '#d6eefa'],
                roseType: 'area',
                data: [
                    { value: 10, name: 'rose1' },
                    { value: 5, name: 'rose2' },
                    { value: 15, name: 'rose3' },
                    { value: 25, name: 'rose4' },
                    { value: 20, name: 'rose5' },
                    { value: 35, name: 'rose6' },
                    { value: 30, name: 'rose7' },
                    { value: 40, name: 'rose8' }
                ]
            }
        ]
    };
    return echarts_base64(option, '');
}




//  画横装的柱状图
function drawHengZhu(data, title) {
    var a = data.slice(0, 6).sort(tool.sortAsc("value"))
    var b = [],
        c = [];
    for (let i = 0; i < a.length; i++) {
        b.push(a[i].name)
        c.push(a[i].value)
    }
    var l = data.length;
    if (l < 6) {
        return;
    }
    var option = {
        title: {
            subtext: title,
            left: 10,
            top: 0,
            subtextStyle: {
                color: '#333',
                fontSize: 14,
                lineHeight: 25
            }
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '18%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            show: false,

        },
        yAxis: {
            type: 'category',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                interval: 0,
                formatter: function (params) {

                    var params = params.substring(0, 7);
                    // return params;
                    var newParamsName = "";
                    var paramsNameNumber = params.length;
                    if (paramsNameNumber < 5) {
                        return params;
                    }
                    var provideNumber = 4; //一行显示几个字
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                    if (paramsNameNumber > provideNumber) {
                        for (var p = 0; p < rowNumber; p++) {
                            var tempStr = "";
                            var start = p * provideNumber;
                            var end = start + provideNumber;
                            if (p == rowNumber - 1) {
                                tempStr = params.substring(start, paramsNameNumber);
                            } else {
                                tempStr = params.substring(start, end) + "\n";
                            }
                            newParamsName += tempStr;
                        }

                    } else {
                        newParamsName = params;
                    }
                    return newParamsName + '...'
                },
            },
            data: b
        },
        series: [{
            type: 'bar',
            barMaxWidth: 20,
            label: {
                show: true, //开启显示
                position: 'right', //在右方显示
                distance: 10, //距离图形距离
                verticalAlign: 'middle',
                textStyle: {
                    color: 'black',
                    fontSize: 12
                }
            },
            data: c,
            itemStyle: { normal: { color: '#3398DB' } }
        }]
    }
    return echarts_base64(option, '');
}

/*===============================================================================================*/

// 画图函数
function echarts_base64(option, WITH) {
    var W = 964;
    WITH ? W = 2020 : W = 964;
    var buffer = node_echarts({
        width: W, // Image width, type is number.
        height: 624, // Image height, type is number.
        font: '28px',
        option: option, // Echarts configuration, type is Object.
        // path: path.join(__dirname, "./img.png" ), // Path is filepath of the image which will be created.
        enableAutoDispose: false //Enable auto-dispose echarts after the image is created.
    });
    var img_base64 = "data:image/png;base64," + buffer.toString('base64');
    return img_base64;
}

//画企业信用
function drawQiyong(data, avg_companyDevelopAppraiseScore, companyCreditAppraise) {
    // console.log(data);

    // ifup 三角形是不是向上 x1 y1 顶点坐标
    var draw = function (x1, y1, color, type, ifup) {
        ctx.beginPath();
        if (ifup) {
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 - 5, y1 + 5);
            ctx.lineTo(x1 + 5, y1 + 5);
        } else {
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 - 5, y1 - 5);
            ctx.lineTo(x1 + 5, y1 - 5);
        }
        ctx[type + 'Style'] = color;
        ctx.closePath();
        ctx[type]();
    };

    // 信用分值移动坐标函数
    function xingyong(arr) {
        ctx.font = '10px "Noto Sans CJK SC Regular"';
        ctx.textBaseline = 'middle'; //设置文本的垂直对齐方式
        ctx.textAlign = 'center';//设置文本的水平对齐方式
        for (let i = 0; i < arr.length; i++) {
            draw(arr[i].num / 100 * 1000 + 30, 40 + upheight, '#009187', 'fill', false);
            ctx.fillStyle = "#009187";
            ctx.fillText(arr[i].text, arr[i].num / 100 * 1000 + 28, 25 - i * 12 + upheight);


            ctx.beginPath();
            ctx.moveTo(arr[i].num / 100 * 1000 + 30, 25 - i * 8 + upheight);
            ctx.lineTo(arr[i].num / 100 * 1000 + 30, 95);
            ctx.strokeStyle = "#009187";
            ctx.stroke();
            ctx.closePath();


            ctx.fillStyle = "red";
            ctx.fillText(arr[i].num, arr[i].num / 100 * 1000 + 60, 25 - i * 12 + upheight);
        }
    }

    // 发展分值移动坐标函数
    function develop(arr) {
        ctx.font = '10px "Noto Sans CJK SC Regular"';
        ctx.textBaseline = 'middle'; //设置文本的垂直对齐方式
        ctx.textAlign = 'center';//设置文本的水平对齐方式
        for (let i = 0; i < arr.length; i++) {
            draw(arr[i].num / 100 * 1000 + 30, 115 + upheight, '#009187', 'fill', true);
            ctx.fillStyle = "#009187";
            ctx.fillText(arr[i].text, arr[i].num / 100 * 1000 + 28, 130 + i * 12 + upheight);

            ctx.beginPath();
            ctx.moveTo(arr[i].num / 100 * 1000 + 30, 130 + i * 8 + upheight);
            ctx.lineTo(arr[i].num / 100 * 1000 + 30, 120 + upheight);
            ctx.strokeStyle = "#009187";
            ctx.stroke();
            ctx.closePath();

            ctx.fillStyle = "red";
            ctx.fillText(arr[i].num, arr[i].num / 100 * 1000 + 60, 130 + i * 12 + upheight);
        }
    }

    // 距离顶部的距离
    let upheight = 60;
    var w = 1050,
        h = 250;
    const canvas = createCanvas(w, h) // 按照微信官方要求，长宽比5:4
    const ctx = canvas.getContext('2d')
    // 头部标题
    ctx.font = '17px  "Noto Sans CJK SC Regular"';
    ctx.fillStyle = "#009187";
    //   ctx.fillText('信用分值', 0, 40);  // 信用分值
    //   ctx.fillText('发展分值', 0, 240);  // 信用分值
    ctx.fillText('信用分值', 0, 55);  // 信用分值
    ctx.fillText('发展分值', 0, 225);  // 信用分值

    var gra = ctx.createLinearGradient(0, 0, 1000, 130);
    gra.addColorStop(0, "#09fd00");
    gra.addColorStop(0.5, "#759000");
    gra.addColorStop(1, "red");
    // 长方形background
    ctx.fillStyle = gra;
    // 43+107
    ctx.fillRect(30, 43 + upheight, 1000, 50);

    // 横坐标
    ctx.beginPath();
    // 100+107
    ctx.moveTo(30, 100 + upheight);
    ctx.lineTo(1030, 100 + upheight);
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.closePath();

    // 横坐标数量
    let Xwidth = 1000; // 横坐标的长度
    let Xfen = 10; // 横坐标的分的份数
    for (var i = 0; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(Xwidth / Xfen * i + 30, 95 + upheight);
        ctx.lineTo(Xwidth / Xfen * i + 30, 100 + upheight);
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.closePath();
    };

    for (var i = 0; i <= 10; i++) {
        ctx.font = '10px "Noto Sans CJK SC Regular"';
        ctx.textBaseline = 'middle'; //设置文本的垂直对齐方式
        ctx.textAlign = 'center';//设置文本的水平对齐方式
        ctx.fillStyle = "#000";
        ctx.fillText(i * 10, Xwidth / Xfen * i + 30, 110 + upheight);
    }
    ;

    //   ctx.font = '12px sans-serif';
    //   ctx.fillStyle = "#009187";
    //   ctx.fillText('信用分值', 25, 0+upheight);  // 信用分值
    //   ctx.fillText('发展分值', 25, 105+upheight+50); // 发展分值

    // 信用分值移动的坐标
    let xinyongarr = [
        { text: "行业最小值", num: data.min_companyCreditAppraiseScore.toFixed(2) },
        { text: "目标行业", num: companyCreditAppraise.toFixed(2) },
        { text: "行业最大值", num: data.max_companyCreditAppraiseScore.toFixed(2) }
    ];

    xingyong(xinyongarr);


    // 发展分值移动的坐标
    let developarr = [
        { text: "行业最小值", num: data.min_companyDevelopAppraiseScore.toFixed(2) },
        { text: "目标行业", num: avg_companyDevelopAppraiseScore.toFixed(2) },
        { text: "行业最大值", num: data.max_companyDevelopAppraiseScore.toFixed(2) }
    ];

    develop(developarr);


    var a = canvas.toDataURL("image/png", 1);
    return a;
}


//投资收益的靓图合一
function drawTouziTwo(data1, data2, title1, title2, title3, name) {
    function arr(a, type) {
        var b = [];
        a.forEach(e => {
            type == 'key' ? b.push(e.name) : b.push(parseInt(e.value))
        });
        return b;
    }

    var option = {
        title: [{
            text: title1,
            left: 'center',
            top: '20',
            textStyle: {
                fontSize: 28,
            }
        }, {
            text: title2,
            top: '100',
            left: '30',
            textStyle: {
                fontSize: 24,
                fontWeight: '400'
            }
        }, {
            text: title3,
            top: '100',
            right: '760',
            textStyle: {
                fontSize: 24,
                fontWeight: '400'
            }
        }, {
            text: `数据翎基于大数据分析${name}投资收益主要来源于本公司`,
            left: 'center',
            bottom: '10',
            textStyle: {
                fontSize: 20,
                fontWeight: '400'
            }
        }],
        grid: {
            left: '50%',
            right: '10%',
            bottom: '10%',
            top: '30%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            show: false,
        },
        yAxis: {
            type: 'category',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            data: arr(data1, 'key').slice(0, 6).reverse(),
            axisLabel: {
                show: true,
                interval: 0,
                fontSize: 24,
                formatter: function (params) {

                    var params = params.substring(0, 7);
                    // return params;
                    var newParamsName = "";
                    var paramsNameNumber = params.length;
                    if (paramsNameNumber < 5) {
                        return params;
                    }
                    var provideNumber = 4; //一行显示几个字
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                    if (paramsNameNumber > provideNumber) {
                        for (var p = 0; p < rowNumber; p++) {
                            var tempStr = "";
                            var start = p * provideNumber;
                            var end = start + provideNumber;
                            if (p == rowNumber - 1) {
                                tempStr = params.substring(start, paramsNameNumber);
                            } else {
                                tempStr = params.substring(start, end) + "\n";
                            }
                            newParamsName += tempStr;
                        }

                    } else {
                        newParamsName = params;
                    }
                    return newParamsName + '...'
                },
            },
        },
        series: [
            {
                name: '2011年',
                center: ['25%', '50%'],
                color: ['#3FA7DC'],
                fontSize: 24,
                type: 'bar',
                label: {
                    show: true,
                    position: 'right',
                    textStyle: {
                        fontSize: 22,
                        color: "#333"
                    }
                },
                data: arr(data1, 'value').slice(0, 6).reverse()
            }, {
                name: '访问来源',
                type: 'pie',
                minAngle: 12, //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
                avoidLabelOverlap: true,   //是否启用防止标签重叠策略
                radius: '40%',
                center: ['25%', '55%'],
                labelLine: {
                    normal: {
                        length: 3
                    }
                },
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            fontSize: 24,
                            formatter: function (val) {
                                if (val.name.length > 6) {
                                    return `${val.name.slice(0, 6)}...${val.percent}%`
                                } else {
                                    return `${val.name}${val.percent}%`
                                }
                            }

                        }
                    }
                },
                data: data2,
                color: ['#6395ff', '#d0dffe', '#62daac', '#d0f4e6', '#647798', '#d2d6e1', '#f8c021', '#fcebbd', '#e96c5a', '#f9d4ce', '#75cbee', '#d6eefa'],
                label: {
                    normal: {
                        textStyle: {
                            color: '#000'  // 改变标示文字的颜色
                        }
                    }
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    return echarts_base64(option, '1000');
}


//画专利极北图形
function drawquan(data, title) {
    var dataStyle = {
        normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
        }
    };
    var placeHolderStyle = {
        normal: {
            color: 'rgba(0,0,0,0)',
            label: {
                show: false
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: 'rgba(0,0,0,0)'
        }
    };
    var arrayinf = [];
    var titleinf = [];

    function sortAsc(property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value2 - value1;
        }
    }

    function key_obj(data) {
        if (!data) {
            return;
        }
        var key = Object.keys(data);
        var value = Object.values(data);
        var b = [];
        for (let i = 0; i < key.length; i++) {
            var a = { num: '', title: '' }
            a.num = value[i]
            a.title = key[i]
            b.push(a)
        }
        return b.sort(sortAsc('num'));
    }

    function abc() {
        var inf = key_obj(data);
        var nummax = 0;
        for (let i = 0; i < inf.length; i++) {
            titleinf.push(inf[i].title + " " + inf[i].num + ' ');
            nummax = nummax + inf[i].num
            var obj = {
                name: 'Line 4',
                type: 'pie',
                clockWise: true,
                hoverAnimation: false,
                radius: [80 - 1 * 5 + "%", 80 - 0 * 5 + "%"],
                itemStyle: dataStyle,
                data: [{
                    value: inf[i].num,
                    name: inf[i].title + " " + inf[i].num + ' '
                }, {
                    value: inf[i].num / 0.75,
                    name: '总数',
                    tooltip: {
                        show: false
                    },
                    itemStyle: placeHolderStyle
                }

                ]
            };
            if (i == 1) {
                obj.radius = [80 - (i + 1) * 6 + "%", 80 - i * 6 + "%"];
            } else {
                obj.radius = [80 - (i + 1) * 6 - (i - 1) * 5 + "%", 80 - i * 6 - (i - 1) * 5 + "%"];
            }

            arrayinf.push(obj);
        }


        for (let i = 0; i < arrayinf.length; i++) {
            arrayinf[i].data[1].value = nummax / arrayinf.length
        }
    }
    abc();
    console.log(titleinf);
    var option = {
        title: {
            text: title,
            left: 'center',
            textStyle: {
                fontSize: 28,
            }
        },
        grid: {
            left: '50%',
            right: '10%',
            bottom: '10%',
            top: '30%',
            containLabel: true
        },
        color: ['#3FA7DC'],
        legend: {
            top: "6%",
            x: 'right',
            right: "20%",
            itemWidth: 470,
            itemHeight: 0,
            data: titleinf,
            itemGap: 2,
            textStyle: {
                width: "100%",
                color: '#000',
                align: 'right',
                x: 'left',
                textAlign: 'left',
                fontSize: 24,
            },
            selectedMode: true,
            orient: "vertical",

        },
        series: arrayinf
    };
    return echarts_base64(option, '');
}