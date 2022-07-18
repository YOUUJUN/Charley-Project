<template>
    <div class="chart" ref="chart-wrap" id="chart-wrap"></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap.js";
// import * as bmap from "echarts/extension/bmap/bmap.js";
console.log("echarts", echarts);

const json = import("./data.json");

function renderItem(params, api) {
    var coords = [
        [116.7, 39.53],
        [103.73, 36.03],
        [112.91, 27.87],
        [120.65, 28.01],
        [119.57, 39.95],
    ];
    var points = [];
    for (var i = 0; i < coords.length; i++) {
        points.push(api.coord(coords[i]));
    }
    var color = api.visual("color");
    return {
        type: "polygon",
        shape: {
            points: echarts.graphic.clipPointsByRect(points, {
                x: params.coordSys.x,
                y: params.coordSys.y,
                width: params.coordSys.width,
                height: params.coordSys.height,
            }),
        },
        style: api.style({
            fill: color,
            stroke: echarts.color.lift(color),
        }),
    };
}

function getData(point) {
    var A = point[0],
        B = point[1],
        n = 30,
        arc = Math.PI / 4,
        points = [];

    function getCircleRadio(A, B, arc) {
        return (
            Math.sqrt(Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2)) /
            (2 * Math.sin(arc / 2))
        );
    }

    function getCircleOrigin(A, B, r) {
        var x0 = 0,
            y0 = 0;
        if (A[0] == B[0]) {
            x0 = A[0] - Math.sqrt(r * r - Math.pow(B[1] - A[1] / 2, 2));
            y0 = (A[1] + B[1]) / 2;
        } else if (A[1] == B[1]) {
            x0 = (A[0] + B[0]) / 2;
            y0 = A[1] + Math.sqrt(r * r - Math.pow(B[0] - A[0] / 2, 2));
        } else {
            var M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2],
                k = (A[0] - B[0]) / (B[1] - A[1]),
                a = 1.0 + k * k,
                b = -2 * M[0] - k * k * (A[0] + B[0]),
                c =
                    M[0] * M[0] +
                    (k * k * (A[0] + B[0]) * (A[0] + B[0])) / 4.0 -
                    (r * r -
                        ((M[0] - A[0]) * (M[0] - A[0]) +
                            (M[1] - A[1]) * (M[1] - A[1])));
            x0 = (-1.0 * b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
            y0 = k * x0 - k * M[0] + M[1];
        }
        return [x0, y0];
    }
    var R = getCircleRadio(A, B, arc);
    var Ori = getCircleOrigin(A, B, R);
    for (var i = 0; i < n; i++) {
        var angl = (arc * i) / n,
            arc0 = Math.asin((A[0] - Ori[0]) / R);
        var x = Ori[0] + Math.sin(arc0 + angl) * R;
        var y = Ori[1] + Math.cos(arc0 + angl) * R;
        points.push([x, y]);
    }
    return points;
}

console.log(
    "coord",
    getData([
        [116.4383, 40.1471],
        [120.5383, 23.1471],
    ])
);

var busLines = [
    {
        coords: getData([
            [116.4383, 40.1471],
            [120.5383, 23.1471],
        ]),
        lineStyle: {
            normal: {
                color: echarts.color.modifyHSL("#5A94DF", Math.round(350)),
            },
        },
    },
    {
        coords: getData([
            [116.4383, 40.1471],
            [114.5383, 25.1471],
        ]),
        lineStyle: {
            normal: {
                color: echarts.color.modifyHSL("#5A94DF", Math.round(160)),
            },
        },
    },
    {
        coords: getData([
            [116.4383, 40.1471],
            [118.5383, 33.1471],
        ]),
        lineStyle: {
            normal: {
                color: echarts.color.modifyHSL("#5A94DF", Math.round(140)),
            },
        },
    },
    {
        coords: getData([
            [116.4383, 40.1471],
            [123.5383, 28.1471],
        ]),
        lineStyle: {
            normal: {
                color: echarts.color.modifyHSL("#5A94DF", Math.round(250)),
            },
        },
    },
];

export default {
    data() {
        return {
            json: [],
            nodes: [],
            hiddenDots: [],
            links: [],
            polyLinks: [],
            clusterLinks: [],
            clusters : []
        };
    },

    props: {
        data: {
            default: [
                { name: "海门", value: 9 },
                { name: "鄂尔多斯", value: 12 },
                { name: "招远", value: 12 },
                { name: "舟山", value: 12 },
                { name: "齐齐哈尔", value: 14 },
                { name: "盐城", value: 15 },
                { name: "赤峰", value: 16 },
                { name: "青岛", value: 18 },
                { name: "乳山", value: 18 },
                { name: "金昌", value: 19 },
                { name: "泉州", value: 21 },
                { name: "莱西", value: 21 },
                { name: "日照", value: 21 },
                { name: "胶南", value: 22 },
                { name: "南通", value: 23 },
                { name: "拉萨", value: 24 },
                { name: "云浮", value: 24 },
                { name: "梅州", value: 25 },
                { name: "文登", value: 25 },
                { name: "上海", value: 25 },
                { name: "攀枝花", value: 25 },
                { name: "威海", value: 25 },
                { name: "承德", value: 25 },
                { name: "厦门", value: 26 },
                { name: "汕尾", value: 26 },
                { name: "潮州", value: 26 },
                { name: "丹东", value: 27 },
                { name: "太仓", value: 27 },
                { name: "曲靖", value: 27 },
                { name: "烟台", value: 28 },
                { name: "福州", value: 29 },
                { name: "瓦房店", value: 30 },
                { name: "即墨", value: 30 },
                { name: "抚顺", value: 31 },
                { name: "玉溪", value: 31 },
                { name: "张家口", value: 31 },
                { name: "阳泉", value: 31 },
                { name: "莱州", value: 32 },
                { name: "湖州", value: 32 },
                { name: "汕头", value: 32 },
                { name: "昆山", value: 33 },
                { name: "宁波", value: 33 },
                { name: "湛江", value: 33 },
                { name: "揭阳", value: 34 },
                { name: "荣成", value: 34 },
                { name: "连云港", value: 35 },
                { name: "葫芦岛", value: 35 },
                { name: "常熟", value: 36 },
                { name: "东莞", value: 36 },
                { name: "河源", value: 36 },
                { name: "淮安", value: 36 },
                { name: "泰州", value: 36 },
                { name: "南宁", value: 37 },
                { name: "营口", value: 37 },
                { name: "惠州", value: 37 },
                { name: "江阴", value: 37 },
                { name: "蓬莱", value: 37 },
                { name: "韶关", value: 38 },
                { name: "嘉峪关", value: 38 },
                { name: "广州", value: 38 },
                { name: "延安", value: 38 },
                { name: "太原", value: 39 },
                { name: "清远", value: 39 },
                { name: "中山", value: 39 },
                { name: "昆明", value: 39 },
                { name: "寿光", value: 40 },
                { name: "盘锦", value: 40 },
                { name: "长治", value: 41 },
                { name: "深圳", value: 41 },
                { name: "珠海", value: 42 },
                { name: "宿迁", value: 43 },
                { name: "咸阳", value: 43 },
                { name: "铜川", value: 44 },
                { name: "平度", value: 44 },
                { name: "佛山", value: 44 },
                { name: "海口", value: 44 },
                { name: "江门", value: 45 },
                { name: "章丘", value: 45 },
                { name: "肇庆", value: 46 },
                { name: "大连", value: 47 },
                { name: "临汾", value: 47 },
                { name: "吴江", value: 47 },
                { name: "石嘴山", value: 49 },
                { name: "沈阳", value: 50 },
                { name: "苏州", value: 50 },
                { name: "茂名", value: 50 },
                { name: "嘉兴", value: 51 },
                { name: "长春", value: 51 },
                { name: "胶州", value: 52 },
                { name: "银川", value: 52 },
                { name: "张家港", value: 52 },
                { name: "三门峡", value: 53 },
                { name: "锦州", value: 54 },
                { name: "南昌", value: 54 },
                { name: "柳州", value: 54 },
                { name: "三亚", value: 54 },
                { name: "自贡", value: 56 },
                { name: "吉林", value: 56 },
                { name: "阳江", value: 57 },
                { name: "泸州", value: 57 },
                { name: "西宁", value: 57 },
                { name: "宜宾", value: 58 },
                { name: "呼和浩特", value: 58 },
                { name: "成都", value: 58 },
                { name: "大同", value: 58 },
                { name: "镇江", value: 59 },
                { name: "桂林", value: 59 },
                { name: "张家界", value: 59 },
                { name: "宜兴", value: 59 },
                { name: "北海", value: 60 },
                { name: "西安", value: 61 },
                { name: "金坛", value: 62 },
                { name: "东营", value: 62 },
                { name: "牡丹江", value: 63 },
                { name: "遵义", value: 63 },
                { name: "绍兴", value: 63 },
                { name: "扬州", value: 64 },
                { name: "常州", value: 64 },
                { name: "潍坊", value: 65 },
                { name: "重庆", value: 66 },
                { name: "台州", value: 67 },
                { name: "南京", value: 67 },
                { name: "滨州", value: 70 },
                { name: "贵阳", value: 71 },
                { name: "无锡", value: 71 },
                { name: "本溪", value: 71 },
                { name: "克拉玛依", value: 72 },
                { name: "渭南", value: 72 },
                { name: "马鞍山", value: 72 },
                { name: "宝鸡", value: 72 },
                { name: "焦作", value: 75 },
                { name: "句容", value: 75 },
                { name: "北京", value: 79 },
                { name: "徐州", value: 79 },
                { name: "衡水", value: 80 },
                { name: "包头", value: 80 },
                { name: "绵阳", value: 80 },
                { name: "乌鲁木齐", value: 84 },
                { name: "枣庄", value: 84 },
                { name: "杭州", value: 84 },
                { name: "淄博", value: 85 },
                { name: "鞍山", value: 86 },
                { name: "溧阳", value: 86 },
                { name: "库尔勒", value: 86 },
                { name: "安阳", value: 90 },
                { name: "开封", value: 90 },
                { name: "济南", value: 92 },
                { name: "德阳", value: 93 },
                { name: "温州", value: 95 },
                { name: "九江", value: 96 },
                { name: "邯郸", value: 98 },
                { name: "临安", value: 99 },
                { name: "兰州", value: 99 },
                { name: "沧州", value: 100 },
                { name: "临沂", value: 103 },
                { name: "南充", value: 104 },
                { name: "天津", value: 105 },
                { name: "富阳", value: 106 },
                { name: "泰安", value: 112 },
                { name: "诸暨", value: 112 },
                { name: "郑州", value: 113 },
                { name: "哈尔滨", value: 114 },
                { name: "聊城", value: 116 },
                { name: "芜湖", value: 117 },
                { name: "唐山", value: 119 },
                { name: "平顶山", value: 119 },
                { name: "邢台", value: 119 },
                { name: "德州", value: 120 },
                { name: "济宁", value: 120 },
                { name: "荆州", value: 127 },
                { name: "宜昌", value: 130 },
                { name: "义乌", value: 132 },
                { name: "丽水", value: 133 },
                { name: "洛阳", value: 134 },
                { name: "秦皇岛", value: 136 },
                { name: "株洲", value: 143 },
                { name: "石家庄", value: 147 },
                { name: "莱芜", value: 148 },
                { name: "常德", value: 152 },
                { name: "保定", value: 153 },
                { name: "湘潭", value: 154 },
                { name: "金华", value: 157 },
                { name: "岳阳", value: 169 },
                { name: "长沙", value: 175 },
                { name: "衢州", value: 177 },
                { name: "廊坊", value: 193 },
                { name: "菏泽", value: 194 },
                { name: "合肥", value: 229 },
                { name: "武汉", value: 273 },
                { name: "大庆", value: 279 },
            ],
        },

        geoCoordMap: {
            default: {
                海门: [121.15, 31.89],
                鄂尔多斯: [109.781327, 39.608266],
                招远: [120.38, 37.35],
                舟山: [122.207216, 29.985295],
                齐齐哈尔: [123.97, 47.33],
                盐城: [120.13, 33.38],
                赤峰: [118.87, 42.28],
                青岛: [120.33, 36.07],
                乳山: [121.52, 36.89],
                金昌: [102.188043, 38.520089],
                泉州: [118.58, 24.93],
                莱西: [120.53, 36.86],
                日照: [119.46, 35.42],
                胶南: [119.97, 35.88],
                南通: [121.05, 32.08],
                拉萨: [91.11, 29.97],
                云浮: [112.02, 22.93],
                梅州: [116.1, 24.55],
                文登: [122.05, 37.2],
                上海: [121.48, 31.22],
                攀枝花: [101.718637, 26.582347],
                威海: [122.1, 37.5],
                承德: [117.93, 40.97],
                厦门: [118.1, 24.46],
                汕尾: [115.375279, 22.786211],
                潮州: [116.63, 23.68],
                丹东: [124.37, 40.13],
                太仓: [121.1, 31.45],
                曲靖: [103.79, 25.51],
                烟台: [121.39, 37.52],
                福州: [119.3, 26.08],
                瓦房店: [121.979603, 39.627114],
                即墨: [120.45, 36.38],
                抚顺: [123.97, 41.97],
                玉溪: [102.52, 24.35],
                张家口: [114.87, 40.82],
                阳泉: [113.57, 37.85],
                莱州: [119.942327, 37.177017],
                湖州: [120.1, 30.86],
                汕头: [116.69, 23.39],
                昆山: [120.95, 31.39],
                宁波: [121.56, 29.86],
                湛江: [110.359377, 21.270708],
                揭阳: [116.35, 23.55],
                荣成: [122.41, 37.16],
                连云港: [119.16, 34.59],
                葫芦岛: [120.836932, 40.711052],
                常熟: [120.74, 31.64],
                东莞: [113.75, 23.04],
                河源: [114.68, 23.73],
                淮安: [119.15, 33.5],
                泰州: [119.9, 32.49],
                南宁: [108.33, 22.84],
                营口: [122.18, 40.65],
                惠州: [114.4, 23.09],
                江阴: [120.26, 31.91],
                蓬莱: [120.75, 37.8],
                韶关: [113.62, 24.84],
                嘉峪关: [98.289152, 39.77313],
                广州: [113.23, 23.16],
                延安: [109.47, 36.6],
                太原: [112.53, 37.87],
                清远: [113.01, 23.7],
                中山: [113.38, 22.52],
                昆明: [102.73, 25.04],
                寿光: [118.73, 36.86],
                盘锦: [122.070714, 41.119997],
                长治: [113.08, 36.18],
                深圳: [114.07, 22.62],
                珠海: [113.52, 22.3],
                宿迁: [118.3, 33.96],
                咸阳: [108.72, 34.36],
                铜川: [109.11, 35.09],
                平度: [119.97, 36.77],
                佛山: [113.11, 23.05],
                海口: [110.35, 20.02],
                江门: [113.06, 22.61],
                章丘: [117.53, 36.72],
                肇庆: [112.44, 23.05],
                大连: [121.62, 38.92],
                临汾: [111.5, 36.08],
                吴江: [120.63, 31.16],
                石嘴山: [106.39, 39.04],
                沈阳: [123.38, 41.8],
                苏州: [120.62, 31.32],
                茂名: [110.88, 21.68],
                嘉兴: [120.76, 30.77],
                长春: [125.35, 43.88],
                胶州: [120.03336, 36.264622],
                银川: [106.27, 38.47],
                张家港: [120.555821, 31.875428],
                三门峡: [111.19, 34.76],
                锦州: [121.15, 41.13],
                南昌: [115.89, 28.68],
                柳州: [109.4, 24.33],
                三亚: [109.511909, 18.252847],
                自贡: [104.778442, 29.33903],
                吉林: [126.57, 43.87],
                阳江: [111.95, 21.85],
                泸州: [105.39, 28.91],
                西宁: [101.74, 36.56],
                宜宾: [104.56, 29.77],
                呼和浩特: [111.65, 40.82],
                成都: [104.06, 30.67],
                大同: [113.3, 40.12],
                镇江: [119.44, 32.2],
                桂林: [110.28, 25.29],
                张家界: [110.479191, 29.117096],
                宜兴: [119.82, 31.36],
                北海: [109.12, 21.49],
                西安: [108.95, 34.27],
                金坛: [119.56, 31.74],
                东营: [118.49, 37.46],
                牡丹江: [129.58, 44.6],
                遵义: [106.9, 27.7],
                绍兴: [120.58, 30.01],
                扬州: [119.42, 32.39],
                常州: [119.95, 31.79],
                潍坊: [119.1, 36.62],
                重庆: [106.54, 29.59],
                台州: [121.420757, 28.656386],
                南京: [118.78, 32.04],
                滨州: [118.03, 37.36],
                贵阳: [106.71, 26.57],
                无锡: [120.29, 31.59],
                本溪: [123.73, 41.3],
                克拉玛依: [84.77, 45.59],
                渭南: [109.5, 34.52],
                马鞍山: [118.48, 31.56],
                宝鸡: [107.15, 34.38],
                焦作: [113.21, 35.24],
                句容: [119.16, 31.95],
                北京: [116.46, 39.92],
                徐州: [117.2, 34.26],
                衡水: [115.72, 37.72],
                包头: [110, 40.58],
                绵阳: [104.73, 31.48],
                乌鲁木齐: [87.68, 43.77],
                枣庄: [117.57, 34.86],
                杭州: [120.19, 30.26],
                淄博: [118.05, 36.78],
                鞍山: [122.85, 41.12],
                溧阳: [119.48, 31.43],
                库尔勒: [86.06, 41.68],
                安阳: [114.35, 36.1],
                开封: [114.35, 34.79],
                济南: [117, 36.65],
                德阳: [104.37, 31.13],
                温州: [120.65, 28.01],
                九江: [115.97, 29.71],
                邯郸: [114.47, 36.6],
                临安: [119.72, 30.23],
                兰州: [103.73, 36.03],
                沧州: [116.83, 38.33],
                临沂: [118.35, 35.05],
                南充: [106.110698, 30.837793],
                天津: [117.2, 39.13],
                富阳: [119.95, 30.07],
                泰安: [117.13, 36.18],
                诸暨: [120.23, 29.71],
                郑州: [113.65, 34.76],
                哈尔滨: [126.63, 45.75],
                聊城: [115.97, 36.45],
                芜湖: [118.38, 31.33],
                唐山: [118.02, 39.63],
                平顶山: [113.29, 33.75],
                邢台: [114.48, 37.05],
                德州: [116.29, 37.45],
                济宁: [116.59, 35.38],
                荆州: [112.239741, 30.335165],
                宜昌: [111.3, 30.7],
                义乌: [120.06, 29.32],
                丽水: [119.92, 28.45],
                洛阳: [112.44, 34.7],
                秦皇岛: [119.57, 39.95],
                株洲: [113.16, 27.83],
                石家庄: [114.48, 38.03],
                莱芜: [117.67, 36.19],
                常德: [111.69, 29.05],
                保定: [115.48, 38.85],
                湘潭: [112.91, 27.87],
                金华: [119.64, 29.12],
                岳阳: [113.09, 29.37],
                长沙: [113, 28.21],
                衢州: [118.88, 28.97],
                廊坊: [116.7, 39.53],
                菏泽: [115.480656, 35.23375],
                合肥: [117.27, 31.86],
                武汉: [114.31, 30.52],
                大庆: [125.03, 46.58],
            },
        },
    },

    created() {},

    mounted() {
        console.log(
            "this.convertData(this.data)",
            this.convertData(
                this.data
                    .sort(function (a, b) {
                        return b.value - a.value;
                    })
                    .slice(0, 6)
            )
        );

        this.initChart();
    },

    methods: {
        async initChart() {
            let json = await import("./newData.json");
            console.log("json", json);
            this.json = json;
            this.nodes = [...json.nodes];
            this.links = [...json.links];

            let finalNodes = this.polymerizeNodes(this.nodes);
            console.log("finalNodes-->", finalNodes);
            this.finalNodes = finalNodes;

            let mapWrap = this.$refs["chart-wrap"];
            this.chart = echarts.init(mapWrap);

            let option = {
                title: {
                    text: "全国主要城市空气质量 - 百度地图",
                    subtext: "data from PM25.in",
                    sublink: "http://www.pm25.in",
                    left: "center",
                },
                tooltip: {
                    trigger: "item",
                },
                bmap: {
                    center: [104.114129, 37.550339],
                    zoom: 5,
                    roam: true,
                    mapStyle: {
                        styleJson: [
                            {
                                featureType: "water",
                                elementType: "all",
                                stylers: {
                                    color: "#d1d1d1",
                                },
                            },
                            {
                                featureType: "land",
                                elementType: "all",
                                stylers: {
                                    color: "#f3f3f3",
                                },
                            },
                            {
                                featureType: "railway",
                                elementType: "all",
                                stylers: {
                                    visibility: "off",
                                },
                            },
                            {
                                featureType: "highway",
                                elementType: "all",
                                stylers: {
                                    color: "#fdfdfd",
                                },
                            },
                            {
                                featureType: "highway",
                                elementType: "labels",
                                stylers: {
                                    visibility: "off",
                                },
                            },
                            {
                                featureType: "arterial",
                                elementType: "geometry",
                                stylers: {
                                    color: "#fefefe",
                                },
                            },
                            {
                                featureType: "arterial",
                                elementType: "geometry.fill",
                                stylers: {
                                    color: "#fefefe",
                                },
                            },
                            {
                                featureType: "poi",
                                elementType: "all",
                                stylers: {
                                    visibility: "off",
                                },
                            },
                            {
                                featureType: "green",
                                elementType: "all",
                                stylers: {
                                    visibility: "off",
                                },
                            },
                            {
                                featureType: "subway",
                                elementType: "all",
                                stylers: {
                                    visibility: "off",
                                },
                            },
                            {
                                featureType: "manmade",
                                elementType: "all",
                                stylers: {
                                    color: "#d1d1d1",
                                },
                            },
                            {
                                featureType: "local",
                                elementType: "all",
                                stylers: {
                                    color: "#d1d1d1",
                                },
                            },
                            {
                                featureType: "arterial",
                                elementType: "labels",
                                stylers: {
                                    visibility: "off",
                                },
                            },
                            {
                                featureType: "boundary",
                                elementType: "all",
                                stylers: {
                                    color: "#fefefe",
                                },
                            },
                            {
                                featureType: "building",
                                elementType: "all",
                                stylers: {
                                    color: "#d1d1d1",
                                },
                            },
                            {
                                featureType: "label",
                                elementType: "labels.text.fill",
                                stylers: {
                                    color: "#999999",
                                },
                            },
                        ],
                    },
                },
                // series: [
                //     {
                //         name: "pm2.5",
                //         type: "scatter",
                //         coordinateSystem: "bmap",
                //         data: this.convertData(this.data),
                //         symbolSize: function (val) {
                //             return val[2] / 10;
                //         },
                //         encode: {
                //             value: 2,
                //         },
                //         label: {
                //             formatter: "{b}",
                //             position: "right",
                //             show: false,
                //         },
                //         emphasis: {
                //             label: {
                //                 show: true,
                //             },
                //         },
                //     },

                //     // {
                //     //     name : "pm2.5",
                //     //     type : 'scatter',
                //     //     coordinateSystem : 'bmap',
                //     //     data : [
                //     //         {
                //     //             name : '合肥',
                //     //             value : [117.27, 31.86, 229]
                //     //         }
                //     //     ],
                //     //     symbolSize: function (val) {
                //     //         return 10;
                //     //     },
                //     //     encode: {
                //     //         value: 2,
                //     //     },
                //     //     label: {
                //     //         formatter: "{b}",
                //     //         position: "right",
                //     //         show: false,
                //     //     },
                //     //     emphasis: {
                //     //         label: {
                //     //             show: true,
                //     //         },
                //     //     },
                //     // }

                //     {
                //         name: "Top 5",
                //         type: "effectScatter",
                //         coordinateSystem: "bmap",
                //         data: this.convertData(
                //             this.data
                //                 .sort(function (a, b) {
                //                     return b.value - a.value;
                //                 })
                //                 .slice(0, 6)
                //         ),
                //         symbolSize: function (val) {
                //             return val[2] / 10;
                //         },
                //         encode: {
                //             value: 2,
                //         },
                //         showEffectOn: "render",
                //         rippleEffect: {
                //             brushType: "stroke",
                //         },
                //         label: {
                //             formatter: "{b}",
                //             position: "right",
                //             show: true,
                //         },
                //         itemStyle: {
                //             shadowBlur: 10,
                //             shadowColor: "#333",
                //         },
                //         emphasis: {
                //             scale: true,
                //         },
                //         zlevel: 1,
                //     },

                // ],

                series: [
                    // {
                    //     type: "custom",
                    //     coordinateSystem: "bmap",
                    //     // renderItem: renderItem,
                    //     // renderItem: function (params, api) {
                    //     //     return {
                    //     //         type: "circle",
                    //     //         shape: {
                    //     //             cx: 100, // x 位置永远为 100
                    //     //             cy: api.coord([0, api.value(0)])[1],
                    //     //             r: 30,
                    //     //         },
                    //     //         style: {
                    //     //             fill: "blue",
                    //     //         },
                    //     //     };
                    //     // },

                    //     renderItem: function (params, api) {
                    //         return {
                    //             type: "arc",
                    //             shape: {
                    //                 cx: 100, // x 位置永远为 100
                    //                 // cy: api.coord([0, api.value(0)])[1],
                    //                 cy: 200,
                    //                 startAngle: 30,
                    //                 endAngle: 30,
                    //             },
                    //             style: {
                    //                 fill: "blue",
                    //             },
                    //         };
                    //     },
                    //     itemStyle: {
                    //         opacity: 0.5,
                    //     },
                    //     animation: false,
                    //     silent: true,
                    //     // data: [0],
                    //     data: [
                    //         { value: 1048, name: "Search Engine" },
                    //         { value: 735, name: "Direct" },
                    //         { value: 580, name: "Email" },
                    //         { value: 484, name: "Union Ads" },
                    //         { value: 300, name: "Video Ads" },
                    //     ],
                    //     z: -10,
                    // },

                    // {
                    //     type: "lines",
                    //     coordinateSystem: "bmap",
                    //     polyline: true,
                    //     data: busLines,
                    //     lineStyle: {
                    //         normal: {
                    //             width: 5,
                    //         },
                    //     },
                    //     effect: {
                    //         constantSpeed: 50,
                    //         show: true,
                    //         trailLength: 0.5,
                    //         symbolSize: 2,
                    //     },
                    //     zlevel: 1,
                    // },

                    {
                        name: "Les Miserables",
                        type: "graph",
                        layout: "none",
                        coordinateSystem: "bmap",
                        // data: this.nodes,
                        data: finalNodes,
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
                        roam: true,
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
                ],
            };

            option && this.chart.setOption(option);
            let chart = this.chart;

            this.chart.on("mouseover", (params) => {
                // console.log(params);
                // let category = params.data.category;
                // console.log("category", category);
                // let links = json.links.reduce((preValue, item) => {
                //     if (item.target == category) {
                //         preValue.push(item);
                //     }
                //     return preValue;
                // }, []);
                // console.log("links", links);

                // let newLinks = links
                //     .concat(this.polyLinks)
                //     .concat(this.clusterLinks);

                // chart.setOption({
                //     series: [
                //         {
                //             name: "Les Miserables",
                //             links: newLinks,
                //             lineStyle: {
                //                 color: "source",
                //                 opacity: 1,
                //                 curveness: 0.3,
                //             },
                //         },
                //     ],
                // });

                this.setRelevance(params);
            });

            this.chart.on("mouseout", function (params) {
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

            this.chart.on("click", (params) => {
                console.log("params-->1", params);
                // let result = this.countCircle(60, params.value, 15)
                // console.log('result', result);

                this.addMoreDots(params);
            });

            this.chart.on("dbclick", function (params) {
                console.log("params", params);
                return false;
            });

            console.log("this.chart", this.chart);
            var bmap = this.chart.getModel().getComponent("bmap").getBMap();
            bmap.addControl(new BMap.MapTypeControl());
            console.log("bmap", bmap);
            this.createDots(bmap, this);

            // bmap.disableContinuousZoom();

            bmap.addEventListener("click", (params) => {
                // let bmap = chart.getModel().getComponent("bmap").getBMap();
                // bmap.disableDragging();
                // bmap.disableContinuousZoom();
                console.log("params-->2", params);

                this.hiddenDots = [];
                let newDots = this.currentDots.concat(this.hiddenDots);

                this.chart.setOption({
                    series: [
                        {
                            name: "Les Miserables",
                            data: newDots,
                        },
                    ],
                });
                return false;
            });

            // bmap.disableDragging();
            // bmap.disableScrollWheelZoom();

            bmap.addEventListener("dbclick", function (params) {
                // let bmap = chart.getModel().getComponent("bmap").getBMap();
                // bmap.disableDragging();
                // bmap.disableContinuousZoom();
                return false;
            });

            this.reDrawDots(this.markerClusterer);
            bmap.addEventListener("zoomend", (e) => {
                console.log("pp->", this.markerClusterer);
                this.reDrawDots(this.markerClusterer);
            });
        },

        reDrawDots(markerClusterer) {
            console.log("dataCache", this.dataCache);
            console.log("_clusters001", markerClusterer);
            let { _clusters } = markerClusterer;
            console.log("_clusters00", _clusters);
            let centerDots = [];
            let hideMarkers = [];

            _clusters.forEach((item, index) => {
                let latlng = [item._center.lng, item._center.lat];
                let id = "";
                if (item._markers.length > 1) {
                    console.log("hideMarkers-item", item);
                    hideMarkers = hideMarkers.concat(item._markers);
                    let marker = item._markers[0];
                    let rowData = this.finalNodes.find((item) => {
                        if (
                            item.value[0] === marker.point.lng &&
                            item.value[1] === marker.point.lat
                        ) {
                            return item;
                        }
                    });

                    console.log("rowData", rowData);
                    // id = rowData.id;
                    id = 0 - (index + 1);
                    id = id.toString();
                    let count = item._markers.length;

                    centerDots.push({
                        id,
                        latlng,
                        count,
                    });

                    item._id = id;
                }
            });

            this.clusters = _clusters;
            

            console.log("centerDots", centerDots);

            console.log("hideMarkers", hideMarkers);

            let centerDotsData = centerDots.map((item) => {
                return {
                    id: item.id,
                    name: item.count,
                    symbolSize: 25,
                    label: {
                        position: "inside",
                    },
                    x: -418.08344,
                    y: 446.8853,
                    value: item.latlng,
                    category: 0,
                };
            });

            this.clusterLinks = centerDots.map((item) => {
                return {
                    source: item.id,
                    target: "0",
                };
            });

            let remainMarker = [];
            this.finalNodes.forEach((item) => {
                if (
                    hideMarkers.find((marker) => {
                        if (
                            item.value[0] === marker.point.lng &&
                            item.value[1] === marker.point.lat
                        ) {
                            return marker;
                        }
                    }) === undefined
                ) {
                    remainMarker.push(item);
                }
            });

            console.log("remainMarker", remainMarker);
            console.log("centerDotsData", centerDotsData);

            let finalData = remainMarker.concat(centerDotsData);
            console.log("finalData", finalData);
            this.currentDots = finalData;

            let renderDots = finalData.concat(this.hiddenDots);

            setTimeout(() => {
                this.chart.setOption({
                    series: [
                        {
                            name: "Les Miserables",
                            data: renderDots,
                        },
                    ],
                });
            }, 100);
        },

        polymerizeNodes(originNodes) {
            let finalNodes = [];
            let lnglatCache = new Set();
            let dataCache = new Map();

            originNodes.forEach((item) => {
                let lnglat =
                    item.value[0].toFixed(2) + item.value[1].toFixed(2);

                if (!lnglatCache.has(lnglat)) {
                    dataCache.set(lnglat, [item]);
                    lnglatCache.add(lnglat);
                } else {
                    let cacheArr = dataCache.get(lnglat);
                    let newObj = {
                        id: item.id,
                        name: "The One",
                        symbolSize: 8,
                        hidden: true,
                        label: {
                            position: "inside",
                        },
                        value: item.value,
                        category: item.category,
                    };
                    cacheArr.push(newObj);
                    dataCache.set(lnglat, cacheArr);
                }
            });

            console.log("dataCache", dataCache);
            this.dataCache = dataCache;

            dataCache.forEach((value, key, map) => {
                console.log("dataCachevalue", value);
                if (value.length > 1) {
                    // let lastLink = this.links[this.links.length - 1];
                    // let lastNodes = this.nodes[this.nodes.length - 1];

                    // this.links.push({
                    //     source: "1",
                    //     target: "0",
                    // });

                    let firstItem = value[0];
                    for (let item of value) {
                        let newObj = {
                            id: item.id,
                            name: value.length,
                            symbolSize: 25,
                            label: {
                                position: "inside",
                            },
                            value: firstItem.value,
                            category: firstItem.category,
                            ifPoly: true,
                        };
                        console.log("newObj", newObj);
                        finalNodes = finalNodes.concat([newObj]);
                    }
                } else {
                    finalNodes = finalNodes.concat(value);
                }
            });

            console.log("finalNodes--->1", finalNodes);

            return finalNodes;
        },

        createDots(bmap, vue) {
            let cache = [
                [108.968311, 34.329368],
                [117.338938, 31.721347],
                [117.129669, 31.813201],
                [117.276272, 31.91379],

                [117.415977, 31.85345],
                // [117.415977, 31.85345],
                // [117.415977, 31.85345],
                // [117.415977, 31.85345],

                [117.415111, 31.85345],
                [117.415977, 31.85001],
                [117.415165, 31.85523],

                [117.414827, 31.762127],
                [117.175087, 31.903],
                [117.22108, 31.832346],
                [117.180261, 31.695297],
                [117.35676, 31.838236],
                [117.05263, 31.839708],
            ];

            cache = this.finalNodes.map((item) => {
                return item.value;
            });

            var markers = [];
            var pt = null;

            for (let item of cache) {
                pt = new BMap.Point(item[0], item[1]);
                markers.push(
                    new BMap.Marker(pt, {
                        enableClicking: false,
                    })
                );
            }
            //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
            var markerClusterer = new BMapLib.MarkerClusterer(bmap, {
                markers: markers,
                enableClicking: false,
            });

            vue.markerClusterer = markerClusterer;

            let _clusters = markerClusterer._clusters;
            console.log("_clusters", _clusters);
            let cluster = _clusters[0];

            let _clusterMarker = _clusters[0]._clusterMarker;
            console.log("_clusterMarker", _clusterMarker);
        },

        createRandomDots(bmap) {
            var MAX = 10;
            var markers = [];
            var pt = null;
            var i = 0;

            for (; i < MAX; i++) {
                pt = new BMap.Point(
                    Math.random() * 40 + 85,
                    Math.random() * 30 + 21
                );
                markers.push(new BMap.Marker(pt));
            }
            //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
            var markerClusterer = new BMapLib.MarkerClusterer(bmap, {
                markers: markers,
            });
        },

        addMoreDots(params) {
            this.hiddenDots = [];
            console.log("params==>", params);
            console.log('clusters', this.clusters);
            let lnglat =
                params.value[0].toFixed(2) + params.value[1].toFixed(2);

            let centerCluster = this.clusters.find(item => {
                let clusterLnglat = item._center.lng.toFixed(2) + item._center.lat.toFixed(2);
                if(clusterLnglat === lnglat){
                    return item;
                }
            })



            console.log('centerCluster', centerCluster)
            // centerCluster._clusterMarker._domElement.click()



            let dataCache = this.dataCache;
            let allDots = dataCache.get(lnglat);
            console.log("allDots", allDots);
            if (allDots.length < 2) {
                return;
            }
            let hiddenDots = [];
            let centerId = params.data.id;
            console.log("centerId", centerId);

            let dotsStore = this.countCircle(
                800,
                params.value,
                allDots.length
            );
            dotsStore = dotsStore[0];

            allDots.forEach((dot, index) => {
                if (dot.hidden) {
                } else {
                    console.log("remainDot", dot);
                }

                let newLng = dot.value[0];
                let newLat = dot.value[1] + 0.01 * (index + 1);

                let thedot = Object.assign({}, dot, {
                    value: [dotsStore[index][0], dotsStore[index][1]],
                });
                hiddenDots.push(thedot);
            });

            console.log("hiddenDots", hiddenDots);

            let centerClusterLnglat = centerCluster._center.lng.toFixed(2) + centerCluster._center.lat.toFixed(2);
            let cachedData = this.dataCache.get(centerClusterLnglat);
            console.log('params.name', typeof params.name);
            if(hiddenDots.length < Number(params.name)){
                centerCluster._clusterMarker._domElement.click()
            }
            


            let links = [];
            hiddenDots.forEach((item) => {
                let obj = {
                    source: item.id,
                    target: centerId,
                };
                links.push(obj);
            });

            let newDots = this.currentDots.concat(hiddenDots);
            this.polyLinks = links;
            console.log("polyLinks", links);

            setTimeout(() => {
                this.chart.setOption({
                    series: [
                        {
                            name: "Les Miserables",
                            data: newDots,
                            links: links,
                        },
                    ],
                });

                this.hiddenDots = hiddenDots;
            }, 100);
        },

        convertData(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = this.geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value),
                    });
                }
            }
            return res;
        },

        // t：半径
        // e：中心点经纬度坐标[110,40]
        // i： 圆上点的个数，默认15个，建议73个
        countCircle(t, e, i) {
            console.log("e", e);
            for (
                var r = t / 6378137,
                    n = [e[0], e[1]],
                    o = [this.numberToRadius(n[1]), this.numberToRadius(n[0])],
                    s = ((i = i || 15), []),
                    a = 0;
                a < i;
                a++
            ) {
                var u = (2 * Math.PI * a) / i;
                var h = Math.asin(
                    Math.sin(o[0]) * Math.cos(r) +
                        Math.cos(o[0]) * Math.sin(r) * Math.cos(u)
                );
                var c =
                    o[1] +
                    Math.atan2(
                        Math.sin(u) * Math.sin(r) * Math.cos(o[0]),
                        Math.cos(r) - Math.sin(o[0]) * Math.sin(h)
                    );
                s.push([this.numberToDegree(c), this.numberToDegree(h)]);
            }
            s.push(s[0]);
            return [s];
        },
        numberToRadius(t) {
            return (t * Math.PI) / 180;
        },
        numberToDegree(t) {
            return (180 * t) / Math.PI;
        },

        //设置关联关系
        setRelevance(params) {
            console.log("params2", params);

            let { id } = params.data;
            id = id.toString();
            console.log("id", typeof id);
            let combineLinks = this.links
                .concat(this.polyLinks)
                .concat(this.clusterLinks);

            let renderLinks = combineLinks.filter((item) => {
                let values = Object.values(item);
                console.log("values", values, id);

                if (values.includes(id)) {
                    return item;
                }
            });

            console.log("renderLinks", renderLinks);
            this.chart.setOption({
                series: [
                    {
                        name: "Les Miserables",
                        links: renderLinks,
                        lineStyle: {
                            color: "source",
                            opacity: 1,
                            curveness: 0.3,
                        },
                    },
                ],
            });
        },
    },
};
</script>

<style>
</style>

<style scoped>
.chart {
    width: 100%;
    /* height: 50rem; */
    height: 100%;
}
</style>