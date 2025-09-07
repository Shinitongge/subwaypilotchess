// 广州地铁站点数据（包含线路编号和站点序号信息）
const GUANGZHOU_METRO = {
    lines: {
        1: {
            name: '1号线',
            color: '#F6D62A',
            stations: ['西朗', '坑口', '花地湾', '芳村', '黄沙', '长寿路', '陈家祠', '西门口', '公园前', '农讲所', '烈士陵园', '东山口', '杨箕', '体育西路', '体育中心', '广州东站']
        },
        2: {
            name: '2号线',
            color: '#00629B', 
            stations: ['嘉禾望岗', '黄边', '江夏', '萧岗', '白云文化广场', '白云公园', '飞翔公园', '三元里', '广州火车站', '越秀公园', '纪念堂', '公园前', '海珠广场', '市二宫', '江南西', '昌岗', '江泰路', '东晓南', '南洲', '洛溪', '南浦', '会江', '石壁', '广州南站']
        },
        3: {
            name: '3号线',
            color: '#ECA154',
            stations: ['机场南', '人和', '高增', '花东', '白云大道北', '永泰', '白云大道南', '嘉禾望岗', '龙归', '同和', '京溪南方医院', '梅花园', '广州东站', '燕塘', '体育西路', '珠江新城', '广州塔']
        },
        4: {
            name: '4号线',
            color: '#00843D',
            stations: ['黄村', '车陂', '车陂南', '万胜围', '官洲', '大学城北', '大学城南', '新造', '石碁', '海傍', '低涌', '东涌', '庆盛', '南沙客运港']
        },
        5: {
            name: '5号线',
            color: '#C5003E',
            stations: ['文冲', '大沙地', '大沙东', '萝岗', '香雪', '青年路', '坦尾', '夏园', '黄埔客运港', '鱼珠', '三溪']
        },
        6: {
            name: '6号线',
            color: '#7B0C43',
            stations: ['浔峰岗', '横沙', '沙贝', '河沙', '坦尾', '黄花岗', '区庄', '动物园南门', '团一大广场', '一德路', '海珠广场', '北京路', '东湖', '东山口', '天平架', '燕塘', '长湴', '植物园', '龙洞', '柯木塱', '高塘石', '香雪']
        },
        8: {
            name: '8号线',
            color: '#00B5A5',
            stations: ['滘心', '海傍', '石岗', '聚龙', '上步', '同德', '鹅掌坦', '西村', '陈家祠', '华林寺', '文化公园', '同福西', '凤凰新村', '沙园', '宝岗大道', '昌岗', '晓港', '中大', '鹭江', '客村', '赤岗', '磨碟沙', '新港东', '琶洲', '万胜围']
        },
        9: {
            name: '9号线',
            color: '#80C342',
            stations: ['高增', '清塘', '清布', '莲塘', '花都广场', '花城路', '花果山公园', '花东', '白云大道北', '马鞍山公园', '莲花', '清湖', '花都汽车城']
        },
        13: {
            name: '13号线',
            color: '#F8A6C8',
            stations: ['鱼珠', '裕丰围', '双岗', '南海神庙', '夏园', '马头岭', '南岗', '知识城', '旺村', '何棠下', '官湖', '象颈岭', '新塘']
        },
        14: {
            name: '14号线',
            color: '#81312F',
            stations: ['嘉禾望岗', '新和', '从化客运站', '东风', '神岗', '太平', '钟落潭', '竹料', '马沥', '红旗', '钟岗', '人和', '鸦岗', '新华', '白云东平']
        },
        21: {
            name: '21号线',
            color: '#0F5C8E',
            stations: ['员村', '天河公园', '棠东', '黄村', '大观南路', '天河智慧城', '长平', '金坑', '山田', '钟岗', '中新', '坑贝', '朱村', '增城广场']
        }
    },

    // 站点详细信息（包含线路编号和站点序号）
    stationDetails: {
        // 1号线站点 (01-16)
        '西朗': [{line: 1, lineNumber: '01', lineName: '1号线'}],
        '坑口': [{line: 1, lineNumber: '02', lineName: '1号线'}],
        '花地湾': [{line: 1, lineNumber: '03', lineName: '1号线'}],
        '芳村': [{line: 1, lineNumber: '04', lineName: '1号线'}],
        '黄沙': [{line: 1, lineNumber: '05', lineName: '1号线'}],
        '长寿路': [{line: 1, lineNumber: '06', lineName: '1号线'}],
        '陈家祠': [{line: 1, lineNumber: '07', lineName: '1号线'}, {line: 8, lineNumber: '09', lineName: '8号线'}],
        '西门口': [{line: 1, lineNumber: '08', lineName: '1号线'}],
        '公园前': [{line: 1, lineNumber: '09', lineName: '1号线'}, {line: 2, lineNumber: '12', lineName: '2号线'}],
        '农讲所': [{line: 1, lineNumber: '10', lineName: '1号线'}],
        '烈士陵园': [{line: 1, lineNumber: '11', lineName: '1号线'}],
        '东山口': [{line: 1, lineNumber: '12', lineName: '1号线'}, {line: 6, lineNumber: '14', lineName: '6号线'}],
        '杨箕': [{line: 1, lineNumber: '13', lineName: '1号线'}],
        '体育西路': [{line: 1, lineNumber: '14', lineName: '1号线'}, {line: 3, lineNumber: '15', lineName: '3号线'}],
        '体育中心': [{line: 1, lineNumber: '15', lineName: '1号线'}],
        '广州东站': [{line: 1, lineNumber: '16', lineName: '1号线'}, {line: 3, lineNumber: '13', lineName: '3号线'}],
        
        // 2号线站点 (01-24)
        '嘉禾望岗': [{line: 2, lineNumber: '01', lineName: '2号线'}, {line: 3, lineNumber: '08', lineName: '3号线'}, {line: 14, lineNumber: '01', lineName: '14号线'}],
        '黄边': [{line: 2, lineNumber: '02', lineName: '2号线'}],
        '江夏': [{line: 2, lineNumber: '03', lineName: '2号线'}],
        '萧岗': [{line: 2, lineNumber: '04', lineName: '2号线'}],
        '白云文化广场': [{line: 2, lineNumber: '05', lineName: '2号线'}],
        '白云公园': [{line: 2, lineNumber: '06', lineName: '2号线'}],
        '飞翔公园': [{line: 2, lineNumber: '07', lineName: '2号线'}],
        '三元里': [{line: 2, lineNumber: '08', lineName: '2号线'}],
        '广州火车站': [{line: 2, lineNumber: '09', lineName: '2号线'}],
        '越秀公园': [{line: 2, lineNumber: '10', lineName: '2号线'}],
        '纪念堂': [{line: 2, lineNumber: '11', lineName: '2号线'}],
        '海珠广场': [{line: 2, lineNumber: '13', lineName: '2号线'}, {line: 6, lineNumber: '11', lineName: '6号线'}],
        '市二宫': [{line: 2, lineNumber: '14', lineName: '2号线'}],
        '江南西': [{line: 2, lineNumber: '15', lineName: '2号线'}],
        '昌岗': [{line: 2, lineNumber: '16', lineName: '2号线'}, {line: 8, lineNumber: '16', lineName: '8号线'}],
        '江泰路': [{line: 2, lineNumber: '17', lineName: '2号线'}],
        '东晓南': [{line: 2, lineNumber: '18', lineName: '2号线'}],
        '南洲': [{line: 2, lineNumber: '19', lineName: '2号线'}],
        '洛溪': [{line: 2, lineNumber: '20', lineName: '2号线'}],
        '南浦': [{line: 2, lineNumber: '21', lineName: '2号线'}],
        '会江': [{line: 2, lineNumber: '22', lineName: '2号线'}],
        '石壁': [{line: 2, lineNumber: '23', lineName: '2号线'}],
        '广州南站': [{line: 2, lineNumber: '24', lineName: '2号线'}],
        
        // 3号线站点 (01-17)
        '机场南': [{line: 3, lineNumber: '01', lineName: '3号线'}],
        '人和': [{line: 3, lineNumber: '02', lineName: '3号线'}, {line: 14, lineNumber: '12', lineName: '14号线'}],
        '高增': [{line: 3, lineNumber: '03', lineName: '3号线'}, {line: 9, lineNumber: '01', lineName: '9号线'}],
        '花东': [{line: 3, lineNumber: '04', lineName: '3号线'}, {line: 9, lineNumber: '08', lineName: '9号线'}],
        '白云大道北': [{line: 3, lineNumber: '05', lineName: '3号线'}, {line: 9, lineNumber: '09', lineName: '9号线'}],
        '永泰': [{line: 3, lineNumber: '06', lineName: '3号线'}],
        '白云大道南': [{line: 3, lineNumber: '07', lineName: '3号线'}],
        '龙归': [{line: 3, lineNumber: '09', lineName: '3号线'}],
        '同和': [{line: 3, lineNumber: '10', lineName: '3号线'}],
        '京溪南方医院': [{line: 3, lineNumber: '11', lineName: '3号线'}],
        '梅花园': [{line: 3, lineNumber: '12', lineName: '3号线'}],
        '燕塘': [{line: 3, lineNumber: '14', lineName: '3号线'}, {line: 6, lineNumber: '16', lineName: '6号线'}],
        '珠江新城': [{line: 3, lineNumber: '16', lineName: '3号线'}],
        '广州塔': [{line: 3, lineNumber: '17', lineName: '3号线'}],

        // 4号线站点 (01-14)
        '黄村': [{line: 4, lineNumber: '01', lineName: '4号线'}, {line: 21, lineNumber: '04', lineName: '21号线'}],
        '车陂': [{line: 4, lineNumber: '02', lineName: '4号线'}],
        '车陂南': [{line: 4, lineNumber: '03', lineName: '4号线'}],
        '万胜围': [{line: 4, lineNumber: '04', lineName: '4号线'}, {line: 8, lineNumber: '25', lineName: '8号线'}],
        '官洲': [{line: 4, lineNumber: '05', lineName: '4号线'}],
        '大学城北': [{line: 4, lineNumber: '06', lineName: '4号线'}],
        '大学城南': [{line: 4, lineNumber: '07', lineName: '4号线'}],
        '新造': [{line: 4, lineNumber: '08', lineName: '4号线'}],
        '石碁': [{line: 4, lineNumber: '09', lineName: '4号线'}],
        '海傍': [{line: 4, lineNumber: '10', lineName: '4号线'}, {line: 8, lineNumber: '02', lineName: '8号线'}],
        '低涌': [{line: 4, lineNumber: '11', lineName: '4号线'}],
        '东涌': [{line: 4, lineNumber: '12', lineName: '4号线'}],
        '庆盛': [{line: 4, lineNumber: '13', lineName: '4号线'}],
        '南沙客运港': [{line: 4, lineNumber: '14', lineName: '4号线'}],

        // 5号线站点 (01-11)
        '文冲': [{line: 5, lineNumber: '01', lineName: '5号线'}],
        '大沙地': [{line: 5, lineNumber: '02', lineName: '5号线'}],
        '大沙东': [{line: 5, lineNumber: '03', lineName: '5号线'}],
        '萝岗': [{line: 5, lineNumber: '04', lineName: '5号线'}],
        '香雪': [{line: 5, lineNumber: '05', lineName: '5号线'}, {line: 6, lineNumber: '22', lineName: '6号线'}],
        '青年路': [{line: 5, lineNumber: '06', lineName: '5号线'}],
        '坦尾': [{line: 5, lineNumber: '07', lineName: '5号线'}, {line: 6, lineNumber: '05', lineName: '6号线'}],
        '夏园': [{line: 5, lineNumber: '08', lineName: '5号线'}, {line: 13, lineNumber: '05', lineName: '13号线'}],
        '黄埔客运港': [{line: 5, lineNumber: '09', lineName: '5号线'}],
        '鱼珠': [{line: 5, lineNumber: '10', lineName: '5号线'}, {line: 13, lineNumber: '01', lineName: '13号线'}],
        '三溪': [{line: 5, lineNumber: '11', lineName: '5号线'}],

        // 6号线站点 (01-22)
        '浔峰岗': [{line: 6, lineNumber: '01', lineName: '6号线'}],
        '横沙': [{line: 6, lineNumber: '02', lineName: '6号线'}],
        '沙贝': [{line: 6, lineNumber: '03', lineName: '6号线'}],
        '河沙': [{line: 6, lineNumber: '04', lineName: '6号线'}],
        '黄花岗': [{line: 6, lineNumber: '06', lineName: '6号线'}],
        '区庄': [{line: 6, lineNumber: '07', lineName: '6号线'}],
        '动物园南门': [{line: 6, lineNumber: '08', lineName: '6号线'}],
        '团一大广场': [{line: 6, lineNumber: '09', lineName: '6号线'}],
        '一德路': [{line: 6, lineNumber: '10', lineName: '6号线'}],
        '北京路': [{line: 6, lineNumber: '12', lineName: '6号线'}],
        '东湖': [{line: 6, lineNumber: '13', lineName: '6号线'}],
        '天平架': [{line: 6, lineNumber: '15', lineName: '6号线'}],
        '长湴': [{line: 6, lineNumber: '17', lineName: '6号线'}],
        '植物园': [{line: 6, lineNumber: '18', lineName: '6号线'}],
        '龙洞': [{line: 6, lineNumber: '19', lineName: '6号线'}],
        '柯木塱': [{line: 6, lineNumber: '20', lineName: '6号线'}],
        '高塘石': [{line: 6, lineNumber: '21', lineName: '6号线'}],

        // 8号线站点 (01-25)
        '滘心': [{line: 8, lineNumber: '01', lineName: '8号线'}],
        '石岗': [{line: 8, lineNumber: '03', lineName: '8号线'}],
        '聚龙': [{line: 8, lineNumber: '04', lineName: '8号线'}],
        '上步': [{line: 8, lineNumber: '05', lineName: '8号线'}],
        '同德': [{line: 8, lineNumber: '06', lineName: '8号线'}],
        '鹅掌坦': [{line: 8, lineNumber: '07', lineName: '8号线'}],
        '西村': [{line: 8, lineNumber: '08', lineName: '8号线'}],
        '华林寺': [{line: 8, lineNumber: '10', lineName: '8号线'}],
        '文化公园': [{line: 8, lineNumber: '11', lineName: '8号线'}],
        '同福西': [{line: 8, lineNumber: '12', lineName: '8号线'}],
        '凤凰新村': [{line: 8, lineNumber: '13', lineName: '8号线'}],
        '沙园': [{line: 8, lineNumber: '14', lineName: '8号线'}],
        '宝岗大道': [{line: 8, lineNumber: '15', lineName: '8号线'}],
        '晓港': [{line: 8, lineNumber: '17', lineName: '8号线'}],
        '中大': [{line: 8, lineNumber: '18', lineName: '8号线'}],
        '鹭江': [{line: 8, lineNumber: '19', lineName: '8号线'}],
        '客村': [{line: 8, lineNumber: '20', lineName: '8号线'}],
        '赤岗': [{line: 8, lineNumber: '21', lineName: '8号线'}],
        '磨碟沙': [{line: 8, lineNumber: '22', lineName: '8号线'}],
        '新港东': [{line: 8, lineNumber: '23', lineName: '8号线'}],
        '琶洲': [{line: 8, lineNumber: '24', lineName: '8号线'}],

        // 9号线站点 (01-13)
        '清塘': [{line: 9, lineNumber: '02', lineName: '9号线'}],
        '清布': [{line: 9, lineNumber: '03', lineName: '9号线'}],
        '莲塘': [{line: 9, lineNumber: '04', lineName: '9号线'}],
        '花都广场': [{line: 9, lineNumber: '05', lineName: '9号线'}],
        '花城路': [{line: 9, lineNumber: '06', lineName: '9号线'}],
        '花果山公园': [{line: 9, lineNumber: '07', lineName: '9号线'}],
        '马鞍山公园': [{line: 9, lineNumber: '10', lineName: '9号线'}],
        '莲花': [{line: 9, lineNumber: '11', lineName: '9号线'}],
        '清湖': [{line: 9, lineNumber: '12', lineName: '9号线'}],
        '花都汽车城': [{line: 9, lineNumber: '13', lineName: '9号线'}],

        // 13号线站点 (01-13)
        '裕丰围': [{line: 13, lineNumber: '02', lineName: '13号线'}],
        '双岗': [{line: 13, lineNumber: '03', lineName: '13号线'}],
        '南海神庙': [{line: 13, lineNumber: '04', lineName: '13号线'}],
        '马头岭': [{line: 13, lineNumber: '06', lineName: '13号线'}],
        '南岗': [{line: 13, lineNumber: '07', lineName: '13号线'}],
        '知识城': [{line: 13, lineNumber: '08', lineName: '13号线'}],
        '旺村': [{line: 13, lineNumber: '09', lineName: '13号线'}],
        '何棠下': [{line: 13, lineNumber: '10', lineName: '13号线'}],
        '官湖': [{line: 13, lineNumber: '11', lineName: '13号线'}],
        '象颈岭': [{line: 13, lineNumber: '12', lineName: '13号线'}],
        '新塘': [{line: 13, lineNumber: '13', lineName: '13号线'}],

        // 14号线站点 (01-15)
        '新和': [{line: 14, lineNumber: '02', lineName: '14号线'}],
        '从化客运站': [{line: 14, lineNumber: '03', lineName: '14号线'}],
        '东风': [{line: 14, lineNumber: '04', lineName: '14号线'}],
        '神岗': [{line: 14, lineNumber: '05', lineName: '14号线'}],
        '太平': [{line: 14, lineNumber: '06', lineName: '14号线'}],
        '钟落潭': [{line: 14, lineNumber: '07', lineName: '14号线'}],
        '竹料': [{line: 14, lineNumber: '08', lineName: '14号线'}],
        '马沥': [{line: 14, lineNumber: '09', lineName: '14号线'}],
        '红旗': [{line: 14, lineNumber: '10', lineName: '14号线'}],
        '钟岗': [{line: 14, lineNumber: '11', lineName: '14号线'}, {line: 21, lineNumber: '10', lineName: '21号线'}],
        '鸦岗': [{line: 14, lineNumber: '13', lineName: '14号线'}],
        '新华': [{line: 14, lineNumber: '14', lineName: '14号线'}],
        '白云东平': [{line: 14, lineNumber: '15', lineName: '14号线'}],

        // 21号线站点 (01-14)
        '员村': [{line: 21, lineNumber: '01', lineName: '21号线'}],
        '天河公园': [{line: 21, lineNumber: '02', lineName: '21号线'}],
        '棠东': [{line: 21, lineNumber: '03', lineName: '21号线'}],
        '大观南路': [{line: 21, lineNumber: '05', lineName: '21号线'}],
        '天河智慧城': [{line: 21, lineNumber: '06', lineName: '21号线'}],
        '长平': [{line: 21, lineNumber: '07', lineName: '21号线'}],
        '金坑': [{line: 21, lineNumber: '08', lineName: '21号线'}],
        '山田': [{line: 21, lineNumber: '09', lineName: '21号线'}],
        '中新': [{line: 21, lineNumber: '11', lineName: '21号线'}],
        '坑贝': [{line: 21, lineNumber: '12', lineName: '21号线'}],
        '朱村': [{line: 21, lineNumber: '13', lineName: '21号线'}],
        '增城广场': [{line: 21, lineNumber: '14', lineName: '21号线'}]
    },

    // 交汇站信息（根据实际情况修正）
    transferStations: {
        '公园前': [1, 2],
        '体育西路': [1, 3],
        '嘉禾望岗': [2, 3, 14],
        '客村': [8],
        '万胜围': [4, 8],
        '东山口': [1, 6],
        '昌岗': [2, 8],
        '陈家祠': [1, 8],
        '坦尾': [5, 6],
        '人和': [3, 14],
        '高增': [3, 9],
        '花东': [3, 9],
        '白云大道北': [3, 9],
        '黄村': [4, 21],
        '鱼珠': [5, 13],
        '夏园': [5, 13],
        '香雪': [5, 6],
        '燕塘': [3, 6],
        '钟岗': [14, 21],
        '海珠广场': [2, 6],
        '广州东站': [1, 3]
    },

    // 站点在地图中的坐标位置（60px标准间距，确保所有站点间距≥50px）
    stationPositions: {
        // 1号线 (主要水平线) - Y=400, X间距60px (修正后16个站点)
        '西朗': {x: 60, y: 400},
        '坑口': {x: 120, y: 400},
        '花地湾': {x: 180, y: 400},
        '芳村': {x: 240, y: 400},
        '黄沙': {x: 300, y: 400},
        '长寿路': {x: 360, y: 400},
        '陈家祠': {x: 420, y: 400},
        '西门口': {x: 480, y: 400},
        '公园前': {x: 540, y: 400},
        '农讲所': {x: 600, y: 400},
        '烈士陵园': {x: 660, y: 400},
        '东山口': {x: 720, y: 400},
        '杨箕': {x: 780, y: 400},
        '体育西路': {x: 840, y: 400},
        '体育中心': {x: 900, y: 400},
        '广州东站': {x: 960, y: 400},

        // 2号线 (主要垂直线) - X=540, Y间距60px, 支线X=480
        '嘉禾望岗': {x: 540, y: 60},
        '黄边': {x: 540, y: 120},
        '江夏': {x: 540, y: 180},
        '萧岗': {x: 540, y: 240},
        '白云文化广场': {x: 540, y: 300},
        '白云公园': {x: 480, y: 180},
        '飞翔公园': {x: 480, y: 240},
        '三元里': {x: 480, y: 300},
        '广州火车站': {x: 300, y: 120},
        '越秀公园': {x: 300, y: 180},
        '纪念堂': {x: 420, y: 300},
        '海珠广场': {x: 540, y: 460},
        '市二宫': {x: 540, y: 520},
        '江南西': {x: 540, y: 580},
        '昌岗': {x: 540, y: 640},
        '江泰路': {x: 540, y: 700},
        '东晓南': {x: 540, y: 760},
        '南洲': {x: 540, y: 820},
        '洛溪': {x: 540, y: 880},
        '南浦': {x: 540, y: 940},
        '会江': {x: 540, y: 1000},
        '石壁': {x: 540, y: 1060},
        '广州南站': {x: 540, y: 1120},

        // 3号线 (机场线+南段) - 间距60px
        '机场南': {x: 240, y: 60},
        '人和': {x: 300, y: 60},
        '高增': {x: 360, y: 60},
        '花东': {x: 420, y: 60},
        '白云大道北': {x: 420, y: 120},
        '永泰': {x: 420, y: 180},
        '白云大道南': {x: 420, y: 240},
        '龙归': {x: 600, y: 60},
        '同和': {x: 660, y: 60},
        '京溪南方医院': {x: 720, y: 60},
        '梅花园': {x: 780, y: 60},
        '燕塘': {x: 780, y: 120},
        '珠江新城': {x: 1020, y: 460},
        '广州塔': {x: 1020, y: 520},

        // 4号线 (东南方向) - 调整避开重叠
        '黄村': {x: 1200, y: 240},
        '车陂': {x: 1260, y: 240},
        '车陂南': {x: 1260, y: 300},
        '万胜围': {x: 1260, y: 360},
        '官洲': {x: 1200, y: 420},
        '大学城北': {x: 1140, y: 480},
        '大学城南': {x: 1080, y: 540},
        '新造': {x: 1080, y: 600},
        '石碁': {x: 1080, y: 660},
        '海傍': {x: 900, y: 720},
        '低涌': {x: 840, y: 780},
        '东涌': {x: 780, y: 840},
        '庆盛': {x: 720, y: 900},
        '南沙客运港': {x: 660, y: 960},

        // 5号线 (东西方向，北部) - Y=180, X间距60px
        '文冲': {x: 1320, y: 180},
        '大沙地': {x: 1260, y: 180},
        '大沙东': {x: 1200, y: 180},
        '萝岗': {x: 1140, y: 180},
        '香雪': {x: 1080, y: 180},
        '青年路': {x: 1020, y: 180},
        '坦尾': {x: 960, y: 180},
        '夏园': {x: 900, y: 180},
        '黄埔客运港': {x: 840, y: 180},
        '鱼珠': {x: 780, y: 180},
        '三溪': {x: 720, y: 180},

        // 6号线 (水平垂直连接优化) - 分为西段和东段
        '浔峰岗': {x: 60, y: 240},
        '横沙': {x: 120, y: 240},
        '沙贝': {x: 180, y: 240},
        '河沙': {x: 240, y: 240},
        '黄花岗': {x: 660, y: 280},
        '区庄': {x: 720, y: 280},
        '动物园南门': {x: 780, y: 280},
        '团一大广场': {x: 840, y: 280},
        '一德路': {x: 900, y: 280},
        '北京路': {x: 600, y: 340},
        '东湖': {x: 660, y: 340},
        '天平架': {x: 840, y: 340},
        '燕塘': {x: 780, y: 120},  // 与3号线交汇
        '长湴': {x: 900, y: 340},
        '植物园': {x: 960, y: 340},
        '龙洞': {x: 1020, y: 340},
        '柯木塱': {x: 1080, y: 340},
        '高塘石': {x: 1380, y: 280},

        // 8号线 (西向东分段) - Y=520-640区域
        '滘心': {x: 60, y: 520},
        '石岗': {x: 120, y: 520},
        '聚龙': {x: 180, y: 520},
        '上步': {x: 240, y: 520},
        '同德': {x: 300, y: 520},
        '鹅掌坦': {x: 360, y: 520},
        '西村': {x: 420, y: 520},
        '华林寺': {x: 420, y: 580},
        '文化公园': {x: 360, y: 580},
        '同福西': {x: 420, y: 640},
        '凤凰新村': {x: 360, y: 640},
        '沙园': {x: 420, y: 700},
        '宝岗大道': {x: 480, y: 640},
        '晓港': {x: 600, y: 640},
        '中大': {x: 660, y: 640},
        '鹭江': {x: 720, y: 640},
        '客村': {x: 780, y: 640},
        '赤岗': {x: 840, y: 640},
        '磨碟沙': {x: 900, y: 640},
        '新港东': {x: 960, y: 640},
        '琶洲': {x: 1020, y: 640},

        // 9号线 (水平垂直优化) - 花都方向主要水平连接
        '清塘': {x: 300, y: 60},
        '清布': {x: 240, y: 60},
        '莲塘': {x: 180, y: 60},
        '花都广场': {x: 120, y: 60},
        '花城路': {x: 60, y: 60},
        '花果山公园': {x: 60, y: 120},
        '马鞍山公园': {x: 300, y: 120},
        '莲花': {x: 240, y: 120},
        '清湖': {x: 180, y: 120},
        '花都汽车城': {x: 120, y: 120},

        // 13号线 (东部) - Y=120区域，X=840+
        '裕丰围': {x: 840, y: 120},
        '双岗': {x: 900, y: 120},
        '南海神庙': {x: 960, y: 120},
        '马头岭': {x: 960, y: 60},
        '南岗': {x: 1020, y: 60},
        '知识城': {x: 1020, y: 120},
        '旺村': {x: 1080, y: 120},
        '何棠下': {x: 1140, y: 120},
        '官湖': {x: 1200, y: 120},
        '象颈岭': {x: 1260, y: 120},
        '新塘': {x: 1320, y: 120},

        // 14号线 (水平主要连接优化) - 北延线，避开图例区域
        '新和': {x: 600, y: 60},
        '从化客运站': {x: 660, y: 60},
        '东风': {x: 720, y: 60},
        '神岗': {x: 780, y: 60},
        '太平': {x: 840, y: 60},
        '钟落潭': {x: 900, y: 60},
        '竹料': {x: 960, y: 60},
        '马沥': {x: 1020, y: 60},
        '红旗': {x: 1140, y: 60},
        '鸦岗': {x: 240, y: 60},
        '新华': {x: 180, y: 60},
        '白云东平': {x: 120, y: 60},

        // 21号线 (东部延伸优化) - 调整在容器范围内
        '员村': {x: 1200, y: 300},
        '天河公园': {x: 1260, y: 300},
        '棠东': {x: 1320, y: 240},
        '大观南路': {x: 1260, y: 240},
        '天河智慧城': {x: 1320, y: 240},
        '长平': {x: 1440, y: 240},
        '金坑': {x: 1440, y: 240},
        '山田': {x: 1500, y: 240},
        '钟岗': {x: 1200, y: 60},
        '中新': {x: 1140, y: 300},
        '坑贝': {x: 1200, y: 420},
        '朱村': {x: 1440, y: 300},
        '增城广场': {x: 1440, y: 360}
    },

    // 获取站点详细信息（包含线路编号和站点序号）
    getStationDetails(stationName) {
        return this.stationDetails[stationName] || [];
    },

    // 获取所有站点
    getAllStations() {
        const allStations = [];
        const addedStations = new Set();
        
        for (const lineId in this.lines) {
            const line = this.lines[lineId];
            line.stations.forEach((station, index) => {
                if (!addedStations.has(station)) {
                    const isTransfer = this.transferStations[station] ? true : false;
                    // 获取站点详细信息
                    const details = this.getStationDetails(station);
                    allStations.push({
                        name: station,
                        line: lineId,
                        lineColor: line.color,
                        isTransfer: isTransfer,
                        transferLines: this.transferStations[station] || [lineId],
                        details: details  // 添加详细信息
                    });
                    addedStations.add(station);
                }
            });
        }
        return allStations;
    },

    // 获取特定线路的所有站点
    getLineStations(lineId) {
        if (!this.lines[lineId]) return [];
        return this.lines[lineId].stations.map((station, index) => ({
            name: station,
            line: lineId,
            lineColor: this.lines[lineId].color,
            index: index,
            isTransfer: this.transferStations[station] ? true : false,
            transferLines: this.transferStations[station] || [lineId],
            details: this.getStationDetails(station)  // 添加详细信息
        }));
    },

    // 使用BFS算法计算最短路径
    findShortestPath(startStation, endStation) {
        if (startStation === endStation) return [];
        
        const visited = new Set();
        const queue = [{station: startStation, path: [startStation], transfers: 0}];
        
        while (queue.length > 0) {
            const {station, path, transfers} = queue.shift();
            
            if (station === endStation) {
                return path.map(stationName => {
                    const stationInfo = this.getStationInfo(stationName);
                    return stationInfo;
                });
            }
            
            if (visited.has(station)) continue;
            visited.add(station);
            
            // 获取相邻站点
            const neighbors = this.getNeighborStations(station);
            
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    queue.push({
                        station: neighbor,
                        path: [...path, neighbor],
                        transfers: transfers + (this.transferStations[neighbor] ? 1 : 0)
                    });
                }
            }
        }
        
        return []; // 找不到路径
    },

    // 获取相邻站点
    getNeighborStations(stationName) {
        const neighbors = [];
        
        for (const lineId in this.lines) {
            const stations = this.lines[lineId].stations;
            const index = stations.indexOf(stationName);
            
            if (index !== -1) {
                // 前一站
                if (index > 0) {
                    neighbors.push(stations[index - 1]);
                }
                // 后一站
                if (index < stations.length - 1) {
                    neighbors.push(stations[index + 1]);
                }
            }
        }
        
        return [...new Set(neighbors)];
    },

    // 获取站点信息
    getStationInfo(stationName) {
        for (const lineId in this.lines) {
            const stations = this.lines[lineId].stations;
            if (stations.includes(stationName)) {
                return {
                    name: stationName,
                    line: lineId,
                    lineColor: this.lines[lineId].color,
                    isTransfer: this.transferStations[stationName] ? true : false,
                    transferLines: this.transferStations[stationName] || [lineId],
                    details: this.getStationDetails(stationName)  // 添加详细信息
                };
            }
        }
        return null;
    },

    // 计算两个站点之间的距离
    getDistance(station1, station2) {
        const path = this.findShortestPath(station1, station2);
        return path.length > 0 ? path.length - 1 : 0;
    },

    // 获取站点路径
    getPath(startStation, endStation) {
        return this.findShortestPath(startStation, endStation);
    }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GUANGZHOU_METRO;
}