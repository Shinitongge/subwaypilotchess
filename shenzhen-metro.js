// 深圳地铁站点数据
const SHENZHEN_METRO = {
    lines: {
        1: {
            name: '1号线',
            color: '#009943',
            stations: ['机场东', '后瑞', '固戍', '宝安中心', '坪洲', '西乡', '桃园', '大新', '鲤鱼门', '前海湾', '新安', '宝安', '洪浪北', '灵芝', '创业路', '南山书城', '深大', '高新园', '白石洲', '世界之窗', '侨城东', '竹子林', '车公庙', '香蜜湖', '香梅北', '景田', '莲花村', '华强路', '岗厦', '会展中心', '购物公园', '科学馆', '华强北', '燕南', '大剧院', '国贸', '老街', '东门', '罗湖']
        },
        2: {
            name: '2号线',
            color: '#FF0000',
            stations: ['赤湾', '蛇口港', '海上世界', '水湾', '东角头', '湾厦', '海月', '登良', '后海', '科苑', '红树湾', '世界之窗', '燕南', '大剧院', '湖贝', '黄贝岭', '新秀', '莲塘口岸', '仙湖路', '莲塘', '梧桐山南', '沙头角', '海山', '盐田港西', '深外高中', '盐田路']
        },
        3: {
            name: '3号线',
            color: '#0077C2',
            stations: ['福保', '双龙', '南联', '龙城广场', '吉祥', '爱联', '荷坳', '永湖', '横岗', '塘坑', '大芬', '丹竹头', '六约', '塘朗', '景田', '莲花村', '华强北', '红岭', '老街', '晒布', '翠竹', '田贝', '水贝', '草埔', '布吉', '木棉湾', '大芬', '益田']
        },
        4: {
            name: '4号线',
            color: '#FFD700',
            stations: ['牛湖', '观澜湖', '松元厦', '清湖', '龙华清', '龙胜', '上塘', '红山', '深圳北站', '白石龙', '上梅林', '莲花北', '少年宫', '福田', '市民中心', '会展中心', '岗厦北', '福民', '皇岗口岸', '福田口岸']
        },
        5: {
            name: '5号线',
            color: '#996600',
            stations: ['赤湾', '荔湾', '铁路公园', '妈湾', '前湾公园', '前湾', '桂湾', '深圳北站', '民治', '五和', '坂田', '杨美', '上水径', '下水径', '长龙', '布心', '太安', '怡景', '黄贝岭', '深外高中', '莲塘', '仙湖路', '弘福寺', '园岭', '华强路', '八卦岭', '红岭北', '银湖', '翻身', '灵芝', '洪浪北', '兴东', '留仙洞', '西丽', '大学城', '塘朗']
        },
        6: {
            name: '6号线',
            color: '#800080',
            stations: ['科学馆', '八卦岭', '银湖', '翰岭', '梅林关', '深圳北站', '羊台山东', '官田', '上屋', '长圳', '凤凰城', '光明大街', '光明', '科学城东', '科学城', '中山大学', '深理工']
        },
        7: {
            name: '7号线',
            color: '#FF9900',
            stations: ['西丽湖', '西丽', '茶光', '珠光', '龙井', '桃源村', '深云', '安托山', '侨香', '农林', '车公庙', '上沙', '沙尾', '石厦', '皇岗村', '福民', '皇岗口岸', '赤尾', '华强南', '华强北', '华强路', '笋岗', '洪湖', '田贝', '太安']
        },
        8: {
            name: '8号线',
            color: '#0066CC',
            stations: ['莲塘', '仙湖路', '弘福寺', '梧桐山南', '沙头角', '海山', '盐田港西', '深外高中', '盐田路']
        },
        9: {
            name: '9号线',
            color: '#808000',
            stations: ['文锦', '向西村', '人民南', '鹿丹村', '红岭', '红岭南', '鹿丹村', '人民南', '向西村', '文锦', '上梅林', '孖岭', '银湖', '泥岗', '红岭北', '园岭', '红岭', '笔架山', '莲花村', '梅景', '下梅林', '车公庙', '香梅北', '景田', '莲花西', '上梅林', '孖岭', '银湖']
        },
        10: {
            name: '10号线',
            color: '#00FF00',
            stations: ['双拥街', '平湖', '禾花', '华南城', '木古', '上李朗', '甘坑', '凉帽山', '雪象', '岗头', '华为', '贝尔路', '坂田北', '五和', '光雅园', '南坑', '雅宝', '孖岭', '冬瓜岭', '莲花村', '岗厦北', '福民', '岗厦', '华强路', '华强北', '华强南', '赤尾', '岗厦北']
        },
        11: {
            name: '11号线',
            color: '#660066',
            stations: ['岗厦北', '福田', '车公庙', '红树湾南', '后海', '南山', '前海湾', '宝安', '碧海湾', '机场', '机场北', '福永', '桥头', '塘尾', '马安山', '沙井', '后亭', '松岗', '碧头']
        },
        12: {
            name: '12号线',
            color: '#993300',
            stations: ['左炮台东', '太子湾', '花果山', '南油', '南山', '桃园', '灵芝', '新安', '宝安', '平峦山', '西乡公园', '凤岗', '深圳机场站', '钟屋南', '黄田', '兴围', '机场东', '福永', '怀德', '桥头', '福海西', '和平', '国展北', '国展', '国展南', '海上田园东']
        },
        14: {
            name: '14号线',
            color: '#009999',
            stations: ['岗厦北', '黄木岗', '罗湖北', '石芽岭', '六约北', '四联', '坳背', '大运', '嶂背', '南约', '坪山围', '坪山中心', '坑梓', '沙田']
        },
        16: {
            name: '16号线',
            color: '#FF6600',
            stations: ['大运', '龙园', '龙东', '宝龙', '坪山', '坪山围', '双龙', '新塘围', '龙东', '宝龙', '坪山', '坪山围']
        }
    },

    // 交汇站信息
    transferStations: {
        '世界之窗': [1, 2],
        '大剧院': [1, 2],
        '景田': [2, 5, 9],
        '莲花村': [2, 3, 9, 10],
        '华强路': [1, 2, 7],
        '华强北': [2, 3, 7],
        '老街': [1, 3],
        '黄贝岭': [2, 5],
        '莲塘': [2, 8],
        '深圳北站': [4, 5, 6],
        '车公庙': [1, 7, 9, 11],
        '福民': [4, 7, 10],
        '岗厦北': [10, 11, 14],
        '福田': [4, 11],
        '红岭': [3, 9],
        '田贝': [3, 7],
        '太安': [3, 7],
        '五和': [5, 10],
        '孖岭': [9, 10],
        '宝安': [1, 5, 11],
        '前海湾': [1, 5, 11],
        '南山': [11, 12],
        '机场': [11],
        '沙田': [14, 16],
        '大运': [14, 16],
        '坪山': [14, 16]
    },

    // 站点在地图中的坐标位置（示例坐标）
    stationPositions: {
        // 1号线 (东西向主干线)
        '机场东': {x: 60, y: 400},
        '后瑞': {x: 120, y: 400},
        '固戍': {x: 180, y: 400},
        '宝安中心': {x: 240, y: 400},
        '坪洲': {x: 300, y: 400},
        '西乡': {x: 360, y: 400},
        '桃园': {x: 420, y: 400},
        '大新': {x: 480, y: 400},
        '鲤鱼门': {x: 540, y: 400},
        '前海湾': {x: 600, y: 400},
        '新安': {x: 660, y: 400},
        '宝安': {x: 720, y: 400},
        '洪浪北': {x: 780, y: 400},
        '灵芝': {x: 840, y: 400},
        '创业路': {x: 900, y: 400},
        '南山书城': {x: 960, y: 400},
        '深大': {x: 1020, y: 400},
        '高新园': {x: 1080, y: 400},
        '白石洲': {x: 1140, y: 400},
        '世界之窗': {x: 1200, y: 400},
        '侨城东': {x: 1260, y: 400},
        '竹子林': {x: 1320, y: 400},
        '车公庙': {x: 1380, y: 400},
        '香蜜湖': {x: 1440, y: 400},
        '香梅北': {x: 1500, y: 400},
        '景田': {x: 1560, y: 400},
        '莲花村': {x: 1620, y: 400},
        '华强路': {x: 1680, y: 400},
        '岗厦': {x: 1740, y: 400},
        '会展中心': {x: 1800, y: 400},
        '购物公园': {x: 1860, y: 400},
        '科学馆': {x: 1920, y: 400},
        '华强北': {x: 1980, y: 400},
        '燕南': {x: 2040, y: 400},
        '大剧院': {x: 2100, y: 400},
        '国贸': {x: 2160, y: 400},
        '老街': {x: 2220, y: 400},
        '东门': {x: 2280, y: 400},
        '罗湖': {x: 2340, y: 400},

        // 2号线 (南北向主干线)
        '赤湾': {x: 1200, y: 60},
        '蛇口港': {x: 1200, y: 120},
        '海上世界': {x: 1200, y: 180},
        '水湾': {x: 1200, y: 240},
        '东角头': {x: 1200, y: 300},
        '湾厦': {x: 1200, y: 360},
        '海月': {x: 1200, y: 420},
        '登良': {x: 1200, y: 480},
        '后海': {x: 1200, y: 540},
        '科苑': {x: 1200, y: 600},
        '红树湾': {x: 1200, y: 660},
        '湖贝': {x: 2100, y: 460},
        '黄贝岭': {x: 2100, y: 520},
        '新秀': {x: 2100, y: 580},
        '莲塘口岸': {x: 2100, y: 640},
        '仙湖路': {x: 2100, y: 700},
        '莲塘': {x: 2100, y: 760},
        '梧桐山南': {x: 2100, y: 820},
        '沙头角': {x: 2100, y: 880},
        '海山': {x: 2100, y: 940},
        '盐田港西': {x: 2100, y: 1000},
        '深外高中': {x: 2100, y: 1060},
        '盐田路': {x: 2100, y: 1120},

        // 3号线 (东北-西南向)
        '双龙': {x: 2280, y: 60},
        '南联': {x: 2220, y: 120},
        '龙城广场': {x: 2160, y: 180},
        '吉祥': {x: 2100, y: 240},
        '爱联': {x: 2040, y: 300},
        '荷坳': {x: 1980, y: 360},
        '永湖': {x: 1920, y: 420},
        '横岗': {x: 1860, y: 480},
        '塘坑': {x: 1800, y: 540},
        '大芬': {x: 1740, y: 600},
        '丹竹头': {x: 1680, y: 660},
        '六约': {x: 1620, y: 720},
        '塘朗': {x: 1560, y: 780},
        '红岭': {x: 1500, y: 840},
        '晒布': {x: 1440, y: 900},
        '翠竹': {x: 1380, y: 960},
        '田贝': {x: 1320, y: 1020},
        '水贝': {x: 1260, y: 1080},
        '草埔': {x: 1200, y: 1140},
        '布吉': {x: 1140, y: 1200},
        '木棉湾': {x: 1080, y: 1260},
        '益田': {x: 1020, y: 1320},

        // 4号线 (南北向)
        '牛湖': {x: 1380, y: 60},
        '观澜湖': {x: 1380, y: 120},
        '松元厦': {x: 1380, y: 180},
        '清湖': {x: 1380, y: 240},
        '龙华清': {x: 1380, y: 300},
        '龙胜': {x: 1380, y: 360},
        '上塘': {x: 1380, y: 420},
        '红山': {x: 1380, y: 480},
        '深圳北站': {x: 1380, y: 540},
        '白石龙': {x: 1380, y: 600},
        '上梅林': {x: 1380, y: 660},
        '莲花北': {x: 1380, y: 720},
        '少年宫': {x: 1380, y: 780},
        '福田': {x: 1380, y: 840},
        '市民中心': {x: 1380, y: 900},
        '岗厦北': {x: 1380, y: 960},
        '福民': {x: 1380, y: 1020},
        '皇岗口岸': {x: 1380, y: 1080},
        '福田口岸': {x: 1380, y: 1140},

        // 5号线 (环线)
        '桂湾': {x: 600, y: 600},
        '前湾': {x: 660, y: 600},
        '前湾公园': {x: 720, y: 600},
        '妈湾': {x: 780, y: 600},
        '铁路公园': {x: 840, y: 600},
        '荔湾': {x: 900, y: 600},
        '赤湾': {x: 960, y: 600},
        '妈湾': {x: 1020, y: 600},
        '前湾': {x: 1080, y: 600},
        '桂湾': {x: 1140, y: 600}
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
                    allStations.push({
                        name: station,
                        line: lineId,
                        lineColor: line.color,
                        isTransfer: isTransfer,
                        transferLines: this.transferStations[station] || [lineId]
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
            transferLines: this.transferStations[station] || [lineId]
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
                    transferLines: this.transferStations[stationName] || [lineId]
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
    module.exports = SHENZHEN_METRO;
}