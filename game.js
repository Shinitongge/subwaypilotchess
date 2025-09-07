class SubwayPilotChess {
    constructor() {
        this.players = [];
        this.currentPlayerIndex = 0;
        this.gameBoard = new Map(); // 使用Map存储每个玩家的路径
        this.gameStarted = false;
        this.selectedCity = '广州'; // 默认选择广州
        this.allStations = METRO_DATA_MANAGER.getAllStations(this.selectedCity);
        this.finishedPlayers = [];
        
        // 玩家颜色
        this.playerColors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12'];
        this.playerNames = ['玩家1', '玩家2', '玩家3', '玩家4'];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updatePlayerList();
    }

    setupEventListeners() {
        document.getElementById('startGame').addEventListener('click', () => this.startGame());
        document.getElementById('resetGame').addEventListener('click', () => this.resetGame());
        document.getElementById('rollDice').addEventListener('click', () => this.rollDice());
        document.getElementById('playerCount').addEventListener('change', () => this.updatePlayerList());
        document.getElementById('citySelect').addEventListener('change', (e) => {
            this.selectedCity = e.target.value;
            this.allStations = METRO_DATA_MANAGER.getAllStations(this.selectedCity);
            this.updatePlayerList();
        });
        
        // 添加全局函数
        window.closeModal = () => {
            document.getElementById('gameOverModal').style.display = 'none';
            this.resetGame();
        };
    }

    setupPlayerSettings() {
        const playerCount = parseInt(document.getElementById('playerCount').value);
        const playerSettingsElement = document.getElementById('playerSettings');
        
        playerSettingsElement.innerHTML = '';
        
        for (let i = 0; i < playerCount; i++) {
            const playerSettingDiv = document.createElement('div');
            playerSettingDiv.className = 'player-setting';
            playerSettingDiv.style.cssText = `
                border: 2px solid ${this.playerColors[i]};
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
                background: rgba(255, 255, 255, 0.05);
            `;
            
            playerSettingDiv.innerHTML = `
                <h4 style="color: ${this.playerColors[i]}; margin-bottom: 10px;">${this.playerNames[i]}</h4>
                <div class="setting-group">
                    <label>起点站:</label>
                    <select id="startStation${i}" class="station-select">
                        ${this.allStations.map(station => 
                            `<option value="${station.name}">${station.name}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="setting-group">
                    <label>终点站:</label>
                    <select id="endStation${i}" class="station-select">
                        ${this.allStations.map(station => 
                            `<option value="${station.name}">${station.name}</option>`
                        ).join('')}
                    </select>
                </div>
            `;
            
            playerSettingsElement.appendChild(playerSettingDiv);
            
            // 设置默认值
            if (this.allStations.length > 0) {
                document.getElementById(`startStation${i}`).value = this.allStations[i * 10 % this.allStations.length].name;
                document.getElementById(`endStation${i}`).value = this.allStations[(i * 10 + 20) % this.allStations.length].name;
            }
        }
    }

    setupStationSelects() {
        // 这个方法现在由 setupPlayerSettings 替代
    }

    updatePlayerList() {
        const playerCount = parseInt(document.getElementById('playerCount').value);
        const playerListElement = document.getElementById('playerList');
        
        playerListElement.innerHTML = '';
        this.players = [];
        this.finishedPlayers = [];
        
        for (let i = 0; i < playerCount; i++) {
            const player = {
                id: i,
                name: this.playerNames[i],
                color: this.playerColors[i],
                position: 0,
                finished: false,
                rank: null,
                startStation: null,
                endStation: null,
                path: []
            };
            
            this.players.push(player);
            
            // 创建玩家显示元素
            const playerElement = document.createElement('div');
            playerElement.className = 'player-item';
            playerElement.style.borderLeftColor = player.color;
            playerElement.innerHTML = `
                <div class="player-piece" style="background-color: ${player.color}"></div>
                <div>${player.name}</div>
            `;
            
            playerListElement.appendChild(playerElement);
        }
        
        this.setupPlayerSettings();
        this.updateRanking();
    }

    startGame() {
        // 验证每个玩家的起点和终点
        let allPathsValid = true;
        const playerPaths = new Map();
        
        for (let i = 0; i < this.players.length; i++) {
            const startStation = document.getElementById(`startStation${i}`).value;
            const endStation = document.getElementById(`endStation${i}`).value;
            
            if (startStation === endStation) {
                alert(`${this.playerNames[i]}的起点站和终点站不能相同！`);
                allPathsValid = false;
                break;
            }
            
            // 获取路径
            const path = METRO_DATA_MANAGER.getPath(this.selectedCity, startStation, endStation);
            if (path.length === 0) {
                alert(`${this.playerNames[i]}的路径无效！请检查起点站和终点站是否在同一城市地铁网络中。`);
                allPathsValid = false;
                break;
            }
            
            this.players[i].startStation = startStation;
            this.players[i].endStation = endStation;
            this.players[i].path = path;
            playerPaths.set(i, path);
        }
        
        if (!allPathsValid) return;
        
        this.gameBoard = playerPaths;
        this.gameStarted = true;
        this.currentPlayerIndex = 0;
        this.finishedPlayers = [];
        
        // 重置玩家位置
        this.players.forEach(player => {
            player.position = 0;
            player.finished = false;
            player.rank = null;
        });
        
        this.createGameBoard();
        this.updateCurrentPlayer();
        this.updateRanking();
        
        document.getElementById('rollDice').disabled = false;
        alert(`游戏开始！当前城市：${this.selectedCity}，点击摇骰子开始游戏。`);
    }

    createGameBoard() {
        const boardElement = document.getElementById('gameBoard');
        boardElement.innerHTML = '';
        
        // 创建地铁线路图布局
        this.createMetroMap(boardElement);
        
        this.updatePiecesDisplay();
    }
    
    createMetroMap(container) {
        container.innerHTML = '';
        container.className = 'metro-map-container';
        
        // 创建 SVG 容器用于绘制线路
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '1800');
        svg.setAttribute('height', '1400');
        svg.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            pointer-events: none;
        `;
        
        // 绘制线路连接
        this.drawMetroLines(svg);
        
        // 添加到容器
        container.appendChild(svg);
        
        // 创建所有站点
        this.createAllStations(container);
        
        // 创建图例
        const legend = this.createMapLegend();
        container.appendChild(legend);
    }
    
    createMapLegend() {
        const legend = document.createElement('div');
        legend.className = 'metro-legend';
        legend.style.cssText = `
            position: absolute;
            top: 10px;
            right: 50px;
            background: rgba(255, 255, 255, 0.95);
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            max-width: 200px;
            z-index: 100;
            font-size: 12px;
        `;
        
        // 获取当前城市的地铁数据
        const metroData = METRO_DATA_MANAGER.getMetroData(this.selectedCity);
        
        let legendContent = `<h4 style="margin: 0 0 10px 0; color: #333;">🚇 ${this.selectedCity}地铁线路</h4>`;
        
        if (metroData && metroData.lines) {
            Object.keys(metroData.lines).forEach(lineId => {
                const line = metroData.lines[lineId];
                legendContent += `
                    <div style="display: flex; align-items: center; margin-bottom: 5px;">
                        <div style="width: 12px; height: 12px; background: ${line.color}; border-radius: 2px; margin-right: 8px;"></div>
                        <span style="font-size: 11px;">${line.name}</span>
                    </div>
                `;
            });
        }
        
        legendContent += `
            <hr style="margin: 10px 0; border: none; border-top: 1px solid #eee;">
            <div style="font-size: 10px; color: #666;">
                <div style="margin-bottom: 3px;">🟡 交汇站</div>
                <div style="margin-bottom: 3px;">🟢 起点站</div>
                <div style="margin-bottom: 3px;">🔴 终点站</div>
                <div>⭐ 当前位置</div>
            </div>
        `;
        
        legend.innerHTML = legendContent;
        return legend;
    }
    
    drawMetroLines(svg) {
        // 获取当前城市的地铁数据
        const metroData = METRO_DATA_MANAGER.getMetroData(this.selectedCity);
        if (!metroData || !metroData.lines) return;
        
        // 为每条线路绘制水平/垂直连接线
        Object.keys(metroData.lines).forEach(lineId => {
            const line = metroData.lines[lineId];
            const stations = line.stations;
            
            for (let i = 0; i < stations.length - 1; i++) {
                const currentStation = stations[i];
                const nextStation = stations[i + 1];
                
                // 获取站点坐标
                const positions = metroData.stationPositions || {};
                const currentPos = positions[currentStation];
                const nextPos = positions[nextStation];
                
                if (currentPos && nextPos) {
                    this.drawOrthogonalLine(svg, currentPos, nextPos, line.color, lineId);
                }
            }
        });
    }
    
    drawOrthogonalLine(svg, start, end, color, lineId) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        // 计算水平/垂直路径
        let pathData;
        const cornerRadius = 15; // 圆角半径
        
        if (Math.abs(start.x - end.x) > Math.abs(start.y - end.y)) {
            // 主要是水平移动
            if (start.y === end.y) {
                // 纯水平线
                pathData = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
            } else {
                // 水平+垂直，带圆角
                const midX = start.x + (end.x - start.x) * 0.7;
                const direction = end.y > start.y ? 1 : -1;
                
                pathData = `M ${start.x} ${start.y} 
                           L ${midX - cornerRadius} ${start.y} 
                           Q ${midX} ${start.y} ${midX} ${start.y + cornerRadius * direction}
                           L ${midX} ${end.y - cornerRadius * direction}
                           Q ${midX} ${end.y} ${midX + cornerRadius} ${end.y}
                           L ${end.x} ${end.y}`;
            }
        } else {
            // 主要是垂直移动
            if (start.x === end.x) {
                // 纯垂直线
                pathData = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
            } else {
                // 垂直+水平，带圆角
                const midY = start.y + (end.y - start.y) * 0.7;
                const direction = end.x > start.x ? 1 : -1;
                
                pathData = `M ${start.x} ${start.y} 
                           L ${start.x} ${midY - cornerRadius} 
                           Q ${start.x} ${midY} ${start.x + cornerRadius * direction} ${midY}
                           L ${end.x - cornerRadius * direction} ${midY}
                           Q ${end.x} ${midY} ${end.x} ${midY + cornerRadius}
                           L ${end.x} ${end.y}`;
            }
        }
        
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', '6');
        path.setAttribute('fill', 'none');
        path.setAttribute('opacity', '0.8');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.classList.add(`line-${lineId}`);
        
        svg.appendChild(path);
    }
    
    createAllStations(container) {
        const createdStations = new Set();
        
        // 获取当前城市的地铁数据
        const metroData = METRO_DATA_MANAGER.getMetroData(this.selectedCity);
        if (!metroData || !metroData.stationPositions) return;
        
        const positions = metroData.stationPositions;
        const transferStations = metroData.transferStations || {};
        
        // 遍历所有站点位置
        Object.keys(positions).forEach(stationName => {
            if (createdStations.has(stationName)) return;
            createdStations.add(stationName);
            
            const position = positions[stationName];
            const isTransfer = transferStations[stationName];
            
            // 获取站点所在的线路信息
            const stationLines = [];
            if (metroData.lines) {
                Object.keys(metroData.lines).forEach(lineId => {
                    if (metroData.lines[lineId].stations.includes(stationName)) {
                        stationLines.push({
                            id: lineId,
                            color: metroData.lines[lineId].color
                        });
                    }
                });
            }
            
            const mainLine = stationLines[0] || {id: '1', color: '#F6D62A'};
            
            // 创建站点元素
            const stationElement = document.createElement('div');
            stationElement.className = 'metro-station';
            stationElement.dataset.stationName = stationName;
            
            stationElement.style.cssText = `
                position: absolute;
                left: ${position.x - 20}px;
                top: ${position.y - 20}px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 8px;
                font-weight: bold;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
                z-index: 10;
                border: 3px solid ${mainLine.color};
                background: ${isTransfer ? 'linear-gradient(135deg, #ffd700, #ffed4e)' : '#ffffff'};
                color: ${isTransfer ? '#8b4513' : '#333'};
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
            `;
            
            // 站点名称和线路标识
            const stationContent = `
                <div style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                    <div class="station-name" style="font-size: 7px; line-height: 1; padding: 1px; word-break: break-all; text-align: center;">${stationName}</div>
                    ${isTransfer ? `
                        <div style="position: absolute; top: -8px; right: -8px; background: #ff4444; color: white; border-radius: 50%; width: 14px; height: 14px; font-size: 8px; display: flex; align-items: center; justify-content: center; border: 2px solid white;">换</div>
                    ` : ''}
                    <div class="pieces-container" id="pieces-${stationName}" style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); display: flex; gap: 1px; z-index: 15;"></div>
                </div>
            `;
            
            stationElement.innerHTML = stationContent;
            
            // 添加交互效果
            stationElement.addEventListener('mouseenter', () => {
                stationElement.style.transform = 'scale(1.2)';
                stationElement.style.zIndex = '20';
                
                // 显示站点详细信息
                const tooltip = document.createElement('div');
                tooltip.className = 'station-tooltip';
                tooltip.style.cssText = `
                    position: absolute;
                    bottom: 60px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    white-space: nowrap;
                    z-index: 1000;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                `;
                
                tooltip.innerHTML = `
                    <div style="font-weight: bold; margin-bottom: 4px;">${stationName}</div>
                    ${isTransfer ? '<div style="color: #ff0;">换乘站</div>' : ''}
                `;
                
                stationElement.appendChild(tooltip);
                
                // 3秒后自动移除tooltip
                setTimeout(() => {
                    if (tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 3000);
            });
            
            stationElement.addEventListener('mouseleave', () => {
                stationElement.style.transform = 'scale(1)';
                stationElement.style.zIndex = '10';
            });
            
            container.appendChild(stationElement);
        });
    }
    
    updatePiecesDisplay() {
        // 清除所有棋子
        document.querySelectorAll('.pieces-container').forEach(container => {
            container.innerHTML = '';
        });
        
        // 为每个玩家在当前位置显示棋子
        this.players.forEach(player => {
            if (player.path && player.path.length > 0) {
                const currentPosition = player.position;
                if (currentPosition < player.path.length) {
                    const stationName = player.path[currentPosition].name;
                    const piecesContainer = document.getElementById(`pieces-${stationName}`);
                    if (piecesContainer) {
                        const piece = document.createElement('div');
                        piece.className = 'piece';
                        piece.style.cssText = `
                            width: 16px;
                            height: 16px;
                            border-radius: 50%;
                            border: 2px solid #fff;
                            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
                            background-color: ${player.color};
                            transition: all 0.1s ease;
                        `;
                        piecesContainer.appendChild(piece);
                    }
                }
            }
        });
        
        // 高亮显示玩家路径
        this.highlightPlayerPaths();
    }
    
    highlightPlayerPaths() {
        // 移除之前的高亮
        document.querySelectorAll('.metro-station').forEach(station => {
            station.classList.remove('player-path', 'start-station', 'end-station', 'current-position');
        });
        
        // 为每个玩家高亮路径
        this.players.forEach(player => {
            if (player.path && player.path.length > 0) {
                // 高亮起点站
                const startStationElement = document.querySelector(`[data-station-name="${player.startStation}"]`);
                if (startStationElement) {
                    startStationElement.classList.add('start-station');
                }
                
                // 高亮终点站
                const endStationElement = document.querySelector(`[data-station-name="${player.endStation}"]`);
                if (endStationElement) {
                    endStationElement.classList.add('end-station');
                }
                
                // 高亮当前所在位置
                if (player.position < player.path.length) {
                    const currentStationName = player.path[player.position].name;
                    const currentStationElement = document.querySelector(`[data-station-name="${currentStationName}"]`);
                    if (currentStationElement) {
                        currentStationElement.classList.add('current-position');
                    }
                }
            }
        });
    }
    
    updateCurrentPlayer() {
        const currentPlayer = this.players[this.currentPlayerIndex];
        document.getElementById('currentPlayerName').textContent = currentPlayer.name;
        document.getElementById('currentPlayerName').style.color = currentPlayer.color;
    }
    
    updateRanking() {
        const rankingListElement = document.getElementById('rankingList');
        const finishedPlayers = this.players.filter(player => player.finished).sort((a, b) => a.rank - b.rank);
        const playingPlayers = this.players.filter(player => !player.finished);
        
        let rankingHTML = '';
        
        // 显示已完成的玩家
        finishedPlayers.forEach(player => {
            rankingHTML += `
                <div class="ranking-item" style="border-left: 4px solid ${player.color};">
                    <div>第${player.rank}名: ${player.name}</div>
                    <div style="font-size: 12px; color: #666;">
                        ${player.startStation} → ${player.endStation}
                    </div>
                </div>
            `;
        });
        
        // 显示正在进行的玩家
        playingPlayers.forEach(player => {
            const progress = player.path.length > 0 ? Math.round((player.position / (player.path.length - 1)) * 100) : 0;
            rankingHTML += `
                <div class="ranking-item" style="border-left: 4px solid ${player.color};">
                    <div>${player.name}</div>
                    <div style="font-size: 12px; color: #666;">
                        ${player.startStation} → ${player.endStation}
                    </div>
                    <div style="font-size: 11px; color: #888;">
                        进度: ${progress}%
                    </div>
                </div>
            `;
        });
        
        rankingListElement.innerHTML = rankingHTML;
    }
    
    rollDice() {
        if (!this.gameStarted) return;
        
        const diceCount = parseInt(document.getElementById('diceCount').value);
        const diceValues = [];
        let totalSteps = 0;
        
        // 模拟掷骰子动画
        const diceDisplay = document.getElementById('diceDisplay');
        diceDisplay.innerHTML = '';
        
        for (let i = 0; i < diceCount; i++) {
            const dice = document.createElement('div');
            dice.className = 'dice rolling';
            dice.textContent = '?';
            diceDisplay.appendChild(dice);
            
            // 稍后显示实际点数
            setTimeout(() => {
                const value = Math.floor(Math.random() * 6) + 1;
                dice.textContent = value;
                dice.classList.remove('rolling');
                diceValues.push(value);
                totalSteps += value;
                
                // 如果所有骰子都已显示结果，开始移动
                if (diceValues.length === diceCount) {
                    setTimeout(() => {
                        this.movePlayer(totalSteps);
                    }, 500);
                }
            }, 1000 + i * 200);
        }
    }
    
    movePlayer(steps) {
        const currentPlayer = this.players[this.currentPlayerIndex];
        
        // 移动玩家
        for (let i = 0; i < steps; i++) {
            if (currentPlayer.position < currentPlayer.path.length - 1) {
                currentPlayer.position++;
                
                // 更新显示
                this.updatePiecesDisplay();
                
                // 如果到达终点
                if (currentPlayer.position === currentPlayer.path.length - 1) {
                    currentPlayer.finished = true;
                    currentPlayer.rank = this.finishedPlayers.length + 1;
                    this.finishedPlayers.push(currentPlayer);
                    
                    // 检查游戏是否结束
                    if (this.finishedPlayers.length === this.players.length) {
                        this.endGame();
                        return;
                    }
                    
                    break;
                }
                
                // 添加移动动画延迟
                if (i < steps - 1) {
                    // 等待一小段时间再移动下一步
                    setTimeout(() => {}, 100);
                }
            }
        }
        
        // 更新排名和当前玩家
        this.updateRanking();
        
        // 切换到下一个玩家
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        while (this.players[this.currentPlayerIndex].finished && this.finishedPlayers.length < this.players.length) {
            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        }
        
        this.updateCurrentPlayer();
    }
    
    endGame() {
        this.gameStarted = false;
        document.getElementById('rollDice').disabled = true;
        
        // 显示游戏结束模态框
        const modal = document.getElementById('gameOverModal');
        const finalRanking = document.getElementById('finalRanking');
        
        let rankingHTML = '<h3>最终排名</h3>';
        this.finishedPlayers.forEach(player => {
            rankingHTML += `
                <div style="margin: 10px 0; padding: 10px; border-left: 4px solid ${player.color};">
                    <div style="font-size: 18px; font-weight: bold;">第${player.rank}名: ${player.name}</div>
                    <div style="font-size: 14px; color: #666;">
                        ${player.startStation} → ${player.endStation}
                    </div>
                </div>
            `;
        });
        
        finalRanking.innerHTML = rankingHTML;
        modal.style.display = 'block';
    }
    
    resetGame() {
        this.gameStarted = false;
        this.currentPlayerIndex = 0;
        this.finishedPlayers = [];
        
        // 重置玩家状态
        this.players.forEach(player => {
            player.position = 0;
            player.finished = false;
            player.rank = null;
        });
        
        // 重新创建游戏板
        this.createGameBoard();
        
        // 更新UI
        this.updateCurrentPlayer();
        this.updateRanking();
        
        document.getElementById('rollDice').disabled = true;
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    // 注册城市数据
    METRO_DATA_MANAGER.registerCity('深圳', SHENZHEN_METRO);
    METRO_DATA_MANAGER.registerCity('上海', SHANGHAI_METRO);
    
    // 创建游戏实例
    window.game = new SubwayPilotChess();
});