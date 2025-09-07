// 引入地铁数据
const fs = require('fs');
const path = require('path');

// 读取地铁数据文件
const metroDataPath = path.join(__dirname, 'guangzhou-metro-new.js');
const metroData = fs.readFileSync(metroDataPath, 'utf8');

// 在Node.js环境中执行地铁数据
let GUANGZHOU_METRO;
eval(metroData.replace('if (typeof module !== \'undefined\' && module.exports)', 'if (true)'));

// 获取导出的数据
if (typeof module !== 'undefined' && module.exports) {
    try {
        delete require.cache[metroDataPath];
        GUANGZHOU_METRO = require('./guangzhou-metro-new.js');
    } catch (e) {
        // 如果require失败，使用eval的结果
        console.log('使用备用数据加载方式');
    }
}

// 站点间距验证脚本
function validateStationDistances() {
    const positions = GUANGZHOU_METRO.stationPositions;
    const stationNames = Object.keys(positions);
    const issues = [];
    
    console.log('开始验证站点间距（最小要求50px）...\n');
    
    for (let i = 0; i < stationNames.length; i++) {
        const station1 = stationNames[i];
        const pos1 = positions[station1];
        
        for (let j = i + 1; j < stationNames.length; j++) {
            const station2 = stationNames[j];
            const pos2 = positions[station2];
            
            // 计算距离
            const dx = Math.abs(pos1.x - pos2.x);
            const dy = Math.abs(pos1.y - pos2.y);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // 检查是否小于50px
            if (distance < 50 && distance > 0) {
                issues.push({
                    station1: station1,
                    station2: station2,
                    distance: Math.round(distance * 10) / 10,
                    pos1: pos1,
                    pos2: pos2
                });
            }
        }
    }
    
    if (issues.length === 0) {
        console.log('✅ 所有站点间距都符合要求（≥50px）');
        return true;
    } else {
        console.log(`❌ 发现${issues.length}个间距问题：`);
        issues.forEach(issue => {
            console.log(`  ${issue.station1} ↔ ${issue.station2}: ${issue.distance}px`);
            console.log(`    位置: (${issue.pos1.x},${issue.pos1.y}) ↔ (${issue.pos2.x},${issue.pos2.y})`);
        });
        return false;
    }
}

// 检查交汇站坐标是否正确
function validateTransferStations() {
    const transfers = GUANGZHOU_METRO.transferStations;
    const positions = GUANGZHOU_METRO.stationPositions;
    const lines = GUANGZHOU_METRO.lines;
    
    console.log('\n验证交汇站信息...\n');
    
    Object.keys(transfers).forEach(stationName => {
        const lineIds = transfers[stationName];
        
        // 检查站点是否在对应线路中
        lineIds.forEach(lineId => {
            if (!lines[lineId] || !lines[lineId].stations.includes(stationName)) {
                console.log(`❌ 交汇站错误: ${stationName} 不在${lineId}号线中`);
            }
        });
        
        // 检查坐标是否存在
        if (!positions[stationName]) {
            console.log(`❌ 缺少坐标: 交汇站 ${stationName} 没有坐标信息`);
        }
    });
    
    console.log('✅ 交汇站验证完成');
}

// 统计站点分布
function analyzeStationDistribution() {
    const positions = GUANGZHOU_METRO.stationPositions;
    const xValues = [];
    const yValues = [];
    
    Object.values(positions).forEach(pos => {
        xValues.push(pos.x);
        yValues.push(pos.y);
    });
    
    const xRange = Math.max(...xValues) - Math.min(...xValues);
    const yRange = Math.max(...yValues) - Math.min(...yValues);
    
    console.log('\n📊 站点分布统计:');
    console.log(`  X轴范围: ${Math.min(...xValues)} - ${Math.max(...xValues)} (${xRange}px)`);
    console.log(`  Y轴范围: ${Math.min(...yValues)} - ${Math.max(...yValues)} (${yRange}px)`);
    console.log(`  总站点数: ${Object.keys(positions).length}`);
}

// 执行所有验证
function runAllValidations() {
    validateStationDistances();
    validateTransferStations();
    analyzeStationDistribution();
    
    console.log('\n验证完成！请在浏览器控制台中查看结果。');
}

// 在Node.js环境中运行验证
if (typeof window === 'undefined') {
    runAllValidations();
}