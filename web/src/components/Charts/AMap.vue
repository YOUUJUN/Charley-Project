<template>
    <div class="chart" ref="chart-wrap" id="chart-wrap"></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-extension-amap";

export default {
    props: {
        //这个是地图中心点的坐标哈 写props里方便改，写data里也行。不用非得跟我一样。
        center: {
            type: Array,
            default: () => {
                return [113.74947682142859, 22.835607857142858];
            },
        },
    },

    data() {
        return {};
    },

    mounted() {
        this.initMap();
    },
    methods: {
        async initMap() {
            let json = await import("./data.json");
            const option = {
                //amap地图配置
                amap: {
                    center: this.center,
                    resizeEnable: true,
                    mapStyle: "amap://styles/whitesmoke", //地图样式白色
                    rotation: 10,
                    zoom: 10, //缩放
                    viewMode: "3D", //是否启用3d地图
                    pitch: 35, //视角高度
                    skyColor: "#33216a",
                },
                animation: true,

                series: [
                    {
                        name: "Les Miserables",
                        type: "graph",
                        layout: "none",
                        coordinateSystem: "amap",
                        data: json.nodes,
                        // markPoint: {
                        //     // markLine 也是同理
                        //     data: [
                        //         {
                        //             coord: [0.4383, 40.1471], // 其中 5 表示 xAxis.data[5]，即 '33' 这个元素。
                        //             // coord: ['5', 33.4] // 其中 '5' 表示 xAxis.data中的 '5' 这个元素。
                        //             // 注意，使用这种方式时，xAxis.data 不能写成 [number, number, ...]
                        //             // 而只能写成 [string, string, ...]
                        //         },
                        //     ],
                        // },
                        links: [],
                        categories: json.categories,
                        roam: false,
                        label: {
                            show: true,
                            position: "right",
                            formatter: "{b}",
                        },
                        labelLayout: {
                            hideOverlap: true,
                        },
                        scaleLimit: {
                            min: 0.4,
                            max: 2,
                        },
                        lineStyle: {
                            color: "source",
                            opacity: 1,
                            curveness: 0.3,
                        },

                        emphasis: {
                            // focus: "self",
                            lineStyle: {
                                color: "source",
                                opacity: 1,
                                curveness: 0.3,
                            },
                        },
                    },

                    // {
                    //     type: "scatter",
                    //     zlevel: 2,
                    //     // 使用高德地图坐标系
                    //     coordinateSystem: "amap",
                    //     // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
                    //     data: [], //数据格式[y,x,name]
                    //     symbolSize: 5, //小点的大小
                    //     encode: {
                    //         //维度
                    //         value: 2,
                    //     },
                    //     label: {
                    //         normal: {
                    //             formatter: "{@[2]}", //title提示的文字@后为索引
                    //             position: "right", //显示位置
                    //             show: false,
                    //         },
                    //         emphasis: {
                    //             //重点显示
                    //             show: true,
                    //         },
                    //     },
                    //     itemStyle: {
                    //         normal: {
                    //             color: "#00c1de", //颜色
                    //         },
                    //     },
                    // },

                    // //攻击线图层
                    // {
                    //     type: "lines",
                    //     zlevel: 1,
                    //     coordinateSystem: "amap",
                    //     effect: {
                    //         show: true,
                    //         constantSpeed: 30,
                    //         symbol: "pin",
                    //         symbolSize: 5,
                    //         trailLength: 0,
                    //     },
                    //     label: {
                    //         normal: {
                    //             formatter: function (params) {
                    //                 let data = params.data;
                    //                 return `从${data.fromName}到${data.endName}`;
                    //             },
                    //             position: "right", //显示位置
                    //             show: false,
                    //         },
                    //         emphasis: {
                    //             //重点显示
                    //             show: true,
                    //         },
                    //     },
                    //     lineStyle: {
                    //         normal: {
                    //             width: 1, //尾迹线条宽度
                    //             opacity: 1, //尾迹线条透明度
                    //             curveness: 0.3, //尾迹线条曲直度
                    //         },
                    //     },
                    //     //数据格式[
                    //     data: {
                    //         fromName: "111",
                    //         endName: "222",
                    //         coords: [
                    //             // [坐标, 坐标, 名称],
                    //             // [坐标, 坐标, 名称],
                    //             [116.32723, 40.007623],
                    //             [116.032873, 39.553378],
                    //         ],
                    //     },
                    // },

                    //攻击线图层2
                    // {
                    //     type: "lines",
                    //     zlevel: 1,
                    //     coordinateSystem: "amap",
                    //     effect: {
                    //         show: true,
                    //         constantSpeed: 30,
                    //         symbol: "pin",
                    //         symbolSize: 5,
                    //         trailLength: 0,
                    //     },
                    //     label: {
                    //         normal: {
                    //             formatter: function (params) {
                    //                 let data = params.data;
                    //                 return `从${data.fromName}到${data.endName}`;
                    //             },
                    //             position: "right", //显示位置
                    //             show: false,
                    //         },
                    //         emphasis: {
                    //             //重点显示
                    //             show: true,
                    //         },
                    //     },
                    //     lineStyle: {
                    //         normal: {
                    //             width: 1, //尾迹线条宽度
                    //             opacity: 1, //尾迹线条透明度
                    //             curveness: 0.3, //尾迹线条曲直度
                    //         },
                    //     },
                    //     data: [], //和攻击线图层1的数据格式一样
                    // },
                ],
            };

            var chart = echarts.init(document.getElementById("chart-wrap"));
            chart.setOption(option);
            // get amap instance
            var amap = chart.getModel().getComponent("amap").getAMap();
            // operations below are the same as amap
            //   amap.addControl(new AMap.Scale());
            //   amap.addControl(new AMap.ToolBar());
            // add layers
            //   var satelliteLayer = new AMap.TileLayer.Satellite();//卫星图层
            //   var roadNetLayer = new AMap.TileLayer.RoadNet();//道路图层
            //   amap.add([satelliteLayer, roadNetLayer]);

            var cluster,
                markers = [];

            console.log("points", points);

            let cache = [
                [116.32723, 40.010623],
                [116.32723, 40.007623],
                [116.032873, 39.553378],
                [108.968311, 34.329368],
                [90.93896, 29.755645],
            ];

            for (var i = 0; i < cache.length; i += 1) {
                markers.push(
                    new AMap.Marker({
                        position: cache[i],
                        content:
                            '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 0px; width: 0px; border: 0px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
                        offset: new AMap.Pixel(-15, -15),
                    })
                );
            }

            var count = markers.length;
            var _renderClusterMarker = function (context) {
                var factor = Math.pow(context.count / count, 1 / 18);
                var div = document.createElement("div");
                var Hue = 180 - factor * 180;
                var bgColor = "hsla(" + Hue + ",100%,50%,0.7)";
                var fontColor = "hsla(" + Hue + ",100%,20%,1)";
                var borderColor = "hsla(" + Hue + ",100%,40%,1)";
                var shadowColor = "hsla(" + Hue + ",100%,50%,1)";
                div.style.backgroundColor = bgColor;
                var size = Math.round(
                    30 + Math.pow(context.count / count, 1 / 5) * 20
                );
                div.style.width = div.style.height = size + "px";
                div.style.border = "solid 1px " + borderColor;
                div.style.borderRadius = size / 2 + "px";
                div.style.boxShadow = "0 0 1px " + shadowColor;
                div.innerHTML = context.count;
                div.style.lineHeight = size + "px";
                div.style.color = fontColor;
                div.style.fontSize = "14px";
                div.style.textAlign = "center";
                context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
                context.marker.setContent(div);
            };

            addCluster(2, amap);

            function addCluster(tag, map) {
                if (cluster) {
                    cluster.setMap(null);
                }
                if (tag == 2) {
                    //完全自定义
                    cluster = new AMap.MarkerClusterer(map, markers, {
                        gridSize: 80,
                        renderClusterMarker: _renderClusterMarker,
                    });

                    cluster.on('click', (e) => {
                        console.log('e', e)
                    })
                } else if (tag == 1) {
                    //自定义图标
                    var sts = [
                        {
                            url: "https://a.amap.com/jsapi_demos/static/images/blue.png",
                            size: new AMap.Size(32, 32),
                            offset: new AMap.Pixel(-16, -16),
                        },
                        {
                            url: "https://a.amap.com/jsapi_demos/static/images/green.png",
                            size: new AMap.Size(32, 32),
                            offset: new AMap.Pixel(-16, -16),
                        },
                        {
                            url: "https://a.amap.com/jsapi_demos/static/images/orange.png",
                            size: new AMap.Size(36, 36),
                            offset: new AMap.Pixel(-18, -18),
                        },
                        {
                            url: "https://a.amap.com/jsapi_demos/static/images/red.png",
                            size: new AMap.Size(48, 48),
                            offset: new AMap.Pixel(-24, -24),
                        },
                        {
                            url: "https://a.amap.com/jsapi_demos/static/images/darkRed.png",
                            size: new AMap.Size(48, 48),
                            offset: new AMap.Pixel(-24, -24),
                        },
                    ];
                    cluster = new AMap.MarkerClusterer(map, markers, {
                        styles: sts,
                        gridSize: 80,
                    });
                } else {
                    //默认样式
                    cluster = new AMap.MarkerClusterer(map, markers, {
                        gridSize: 80,
                    });
                }

                chart.on("mouseover", function (params) {
                    console.log(params);
                    let category = params.data.category;
                    console.log("category", category);
                    let links = json.links.reduce((preValue, item) => {
                        if (item.target == category) {
                            preValue.push(item);
                        }
                        return preValue;
                    }, []);
                    console.log("links", links);
                    chart.setOption({
                        series: [
                            {
                                name: "Les Miserables",
                                links: links,
                                lineStyle: {
                                    color: "source",
                                    opacity: 1,
                                    curveness: 0.3,
                                },
                            },
                        ],
                    });
                });

                chart.on("mouseout", function (params) {
                    console.log(params);
                    chart.setOption({
                        series: [
                            {
                                name: "Les Miserables",
                                links: [],
                                lineStyle: {
                                    color: "source",
                                    opacity: 0,
                                    curveness: 0.3,
                                },
                            },
                        ],
                    });
                });
            }
        },
    },
};
</script>

<style scoped>
.chart {
    width: 100%;
    /* height: 50rem; */
    height: 500px;
}
</style>