    // 显示通知
    showNotification(message) {
        // 创建通知元素
        const notificationElement = document.createElement('div');
        notificationElement.className = 'notification';
        notificationElement.innerHTML = `
            <div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); 
                        background: #3498db; color: white; padding: 15px; border-radius: 5px; 
                        z-index: 10000; box-shadow: 0 4px 8px rgba(0,0,0,0.2); max-width: 90%;">
                <div style="display: flex; align-items: center;">
                    <span style="font-size: 18px; margin-right: 10px;">ℹ️</span>
                    <span>${message}</span>
                    <button onclick="this.parentElement.parentElement.remove()" 
                            style="margin-left: 15px; background: rgba(255,255,255,0.2); border: none; 
                                   color: white; border-radius: 3px; cursor: pointer; padding: 3px 8px;">×</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(notificationElement);
        
        // 3秒后自动移除通知
        setTimeout(() => {
            if (notificationElement.parentElement) {
                notificationElement.parentElement.removeChild(notificationElement);
            }
        }, 3000);
    }
// 基于HTTP轮询的在线游戏客户端逻辑
class PollingSubwayPilotChess {
    constructor() {
        this.roomId = null;
        this.playerId = null;
        this.gameState = 'menu'; // menu, lobby, playing
        this.roomData = null;
        this.pollingInterval = null;
        this.lastMessageId = 0;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.showMenu();
        this.updateConnectionStatus('connected'); // 基于HTTP轮询，始终认为已连接
    }

    // 更新连接状态显示
    updateConnectionStatus(status) {
        const statusElement = document.getElementById('connectionStatus');
        if (statusElement) {
            if (status === 'connected') {
                statusElement.textContent = '已连接';
                statusElement.className = 'connection-status status-connected';
            } else {
                statusElement.textContent = '未连接';
                statusElement.className = 'connection-status status-disconnected';
            }
        }
    }
    
    setupEventListeners() {
        // 菜单页面事件
        document.getElementById('createRoomBtn')?.addEventListener('click', () => this.createRoom());
        document.getElementById('joinRoomBtn')?.addEventListener('click', () => this.joinRoom());
        
        // 房间页面事件
        document.getElementById('startGameBtn')?.addEventListener('click', () => this.startGame());
        document.getElementById('leaveRoomBtn')?.addEventListener('click', () => this.leaveRoom());
        document.getElementById('readyBtn')?.addEventListener('click', () => this.toggleReady());
        document.getElementById('sendChatBtn')?.addEventListener('click', () => this.sendChatMessage());
        
        // 聊天输入框回车事件
        document.getElementById('chatInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendChatMessage();
            }
        });
    }
    
    // 发送API请求
    async apiRequest(endpoint, data = null) {
        const url = `/api${endpoint}`;
        const options = {
            method: data ? 'POST' : 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        if (data) {
            options.body = JSON.stringify(data);
        }
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'API request failed');
            }
            
            return result;
        } catch (error) {
            console.error('API request failed:', error);
            this.showError(error.message);
            throw error;
        }
    }
    
    // 显示菜单页面
    showMenu() {
        this.gameState = 'menu';
        document.getElementById('menuPage').style.display = 'block';
        document.getElementById('lobbyPage').style.display = 'none';
        document.getElementById('gamePage').style.display = 'none';
        
        this.stopPolling();
    }
    
    // 创建房间
    async createRoom() {
        const playerName = document.getElementById('playerNameInput').value || 'Player';
        const city = document.getElementById('citySelect').value || '广州';
        const playerCount = Math.max(1, Math.min(4, parseInt(document.getElementById('playerCountSelect').value) || 2)); // 限制在1-4之间
        const diceCount = parseInt(document.getElementById('diceCountSelect').value) || 2;
        
        try {
            const result = await this.apiRequest('/createRoom', {
                playerName: playerName,
                city: city,
                playerCount: playerCount,
                diceCount: diceCount
            });
            
            this.roomId = result.roomId;
            this.playerId = result.playerId;
            
            // 显示房间页面
            this.showLobby({
                settings: result.settings,
                players: [{
                    id: this.playerId,
                    name: playerName,
                    color: '#e74c3c',
                    ready: false
                }]
            });
        } catch (error) {
            this.showError('创建房间失败: ' + error.message);
        }
    }
    
    // 加入房间
    async joinRoom() {
        const roomId = document.getElementById('roomIdInput').value.toUpperCase();
        const playerName = document.getElementById('joinPlayerNameInput').value || 'Player';
        
        if (!roomId) {
            this.showError('请输入房间号');
            return;
        }
        
        try {
            const result = await this.apiRequest('/joinRoom', {
                roomId: roomId,
                playerName: playerName
            });
            
            this.roomId = result.roomId;
            this.playerId = result.playerId;
            
            // 显示房间页面
            this.showLobby(result);
        } catch (error) {
            this.showError('加入房间失败: ' + error.message);
        }
    }
    
    // 显示房间大厅
    showLobby(data) {
        this.gameState = 'lobby';
        this.roomData = data;
        
        document.getElementById('menuPage').style.display = 'none';
        document.getElementById('lobbyPage').style.display = 'block';
        document.getElementById('gamePage').style.display = 'none';
        
        // 更新房间信息
        document.getElementById('roomIdDisplay').textContent = this.roomId;
        document.getElementById('roomCityDisplay').textContent = data.settings.city;
        document.getElementById('roomPlayerCountDisplay').textContent = data.settings.playerCount;
        document.getElementById('roomDiceCountDisplay').textContent = data.settings.diceCount;
        
        // 更新玩家列表
        this.updatePlayerList(data.players);
        
        // 开始轮询消息
        this.startPolling();
    }
    
    // 更新玩家列表
    updatePlayerList(players) {
        const playerListElement = document.getElementById('playerList');
        playerListElement.innerHTML = '';
        
        players.forEach(player => {
            const playerElement = document.createElement('div');
            playerElement.className = 'player-item';
            playerElement.style.borderLeftColor = player.color;
            playerElement.innerHTML = `
                <div class="player-piece" style="background-color: ${player.color}"></div>
                <div>${player.name} ${player.id === this.roomData?.players[0]?.id ? '(房主)' : ''}</div>
                <div class="player-status">${player.ready ? '已准备' : '未准备'}</div>
            `;
            
            playerListElement.appendChild(playerElement);
        });
    }
    
    // 离开房间
    async leaveRoom() {
        if (this.roomId && this.playerId) {
            try {
                await this.apiRequest('/leaveRoom', {
                    roomId: this.roomId,
                    playerId: this.playerId
                });
            } catch (error) {
                console.error('离开房间时出错:', error);
            }
        }
        
        // 停止轮询
        this.stopPolling();
        
        // 返回菜单页面
        this.showMenu();
    }
    
    // 切换准备状态
    async toggleReady() {
        if (!this.roomId || !this.playerId) return;
        
        try {
            const response = await this.apiRequest('/toggleReady', {
                roomId: this.roomId,
                playerId: this.playerId
            });
            
            // 使用更语义化的类名和按钮文本
            const readyBtn = document.getElementById('readyBtn');
            if (response.ready) {
                readyBtn.textContent = '取消准备';
                readyBtn.classList.remove('btn-primary');
                readyBtn.classList.add('btn-secondary');
            } else {
                readyBtn.textContent = '准备';
                readyBtn.classList.remove('btn-secondary');
                readyBtn.classList.add('btn-primary');
            }
            
            // 添加准备状态切换成功的提示信息
            this.showNotification(response.message || '准备状态已更新');
            
            return response;
        } catch (error) {
            this.showError('切换准备状态失败: ' + error.message);
            throw error;
        }
    }
    
    // 开始游戏
    async startGame() {
        if (!this.roomId || !this.playerId) return;
        
        try {
            await this.apiRequest('/startGame', {
                roomId: this.roomId,
                playerId: this.playerId
            });
        } catch (error) {
            this.showError('开始游戏失败: ' + error.message);
        }
    }
    
    // 掷骰子
    async rollDice() {
        if (!this.roomId || !this.playerId) return;
        
        try {
            await this.apiRequest('/rollDice', {
                roomId: this.roomId,
                playerId: this.playerId
            });
        } catch (error) {
            this.showError('掷骰子失败: ' + error.message);
        }
    }
    
    // 发送聊天消息
    async sendChatMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (!message || !this.roomId || !this.playerId) return;
        
        try {
            await this.apiRequest('/sendMessage', {
                roomId: this.roomId,
                playerId: this.playerId,
                message: message
            });
            
            chatInput.value = '';
        } catch (error) {
            this.showError('发送消息失败: ' + error.message);
        }
    }
    
    // 开始轮询消息
    startPolling() {
        this.stopPolling(); // 确保没有重复的轮询
        
        this.pollingInterval = setInterval(async () => {
            if (this.roomId) {
                try {
                    const result = await this.apiRequest('/poll', {
                        roomId: this.roomId,
                        lastMessageId: this.lastMessageId
                    });
                    
                    if (result.success && result.messages.length > 0) {
                        result.messages.forEach(message => {
                            this.handleServerMessage(message);
                        });
                        
                        this.lastMessageId = result.lastMessageId;
                    }
                    
                    // 更新连接状态为已连接
                    this.updateConnectionStatus('connected');
                } catch (error) {
                    console.error('轮询消息失败:', error);
                    // 如果轮询失败，更新连接状态为未连接
                    this.updateConnectionStatus('disconnected');
                }
            }
        }, 1000); // 每秒轮询一次
    }
    
    // 停止轮询消息
    stopPolling() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
        }
        
        // 停止轮询时更新连接状态为未连接
        this.updateConnectionStatus('disconnected');
    }
    
    // 处理服务器消息
    handleServerMessage(message) {
        switch (message.type) {
            case 'playerJoined':
                this.handlePlayerJoined(message.data);
                break;
            case 'playerLeft':
                this.handlePlayerLeft(message.data);
                break;
            case 'playerReady':
                this.handlePlayerReady(message.data);
                break;
            case 'gameStarted':
                this.handleGameStarted(message.data);
                break;
            case 'diceRolled':
                this.handleDiceRolled(message.data);
                break;
            case 'nextTurn':
                this.handleNextTurn(message.data);
                break;
            case 'chatMessage':
                this.handleChatMessage(message.data);
                break;
            default:
                console.log('Unknown message type:', message.type);
        }
    }
    
    // 处理玩家加入
    handlePlayerJoined(data) {
        console.log('Player joined:', data.player);
        
        // 验证数据
        if (!data || !data.player) {
            console.error('Invalid player join data');
            return;
        }
        
        // 更新玩家列表
        if (this.roomData && this.roomData.players) {
            // 检查玩家是否已存在
            const existingPlayer = this.roomData.players.find(p => p.id === data.player.id);
            if (!existingPlayer) {
                this.roomData.players.push(data.player);
                this.updatePlayerList(this.roomData.players);
                console.log(`Player ${data.player.name} added to the room`);
            } else {
                console.warn(`Player ${data.player.name} is already in the room`);
            }
        } else {
            console.warn('Cannot add player to undefined room players list');
        }
    }
    
    // 处理玩家离开
    handlePlayerLeft(data) {
        console.log('Player left:', data.playerName);
        
        // 验证数据完整性
        if (!data || !data.playerId) {
            console.error('Invalid player left data');
            return;
        }
        
        // 更新玩家列表
        if (this.roomData && this.roomData.players) {
            // 使用filter创建新数组
            this.roomData.players = this.roomData.players.filter(player => player.id !== data.playerId);
            
            // 更新界面
            this.updatePlayerList(this.roomData.players);
            
            // 显示离开提示
            this.showNotification(`${data.playerName} 离开了房间`);
        } else {
            console.warn('Cannot remove player from undefined room players list');
        }
    }
    
    // 处理玩家准备状态变化
    handlePlayerReady(data) {
        console.log('Player ready status changed:', data);
        
        // 验证数据完整性
        if (!data || !data.playerId) {
            console.error('Invalid player ready data');
            return;
        }
        
        // 更新玩家列表
        if (this.roomData && this.roomData.players) {
            const player = this.roomData.players.find(p => p.id === data.playerId);
            if (player) {
                // 添加状态变更提示
                if (data.ready) {
                    this.showNotification(`${player.name} 已准备`);
                } else {
                    this.showNotification(`${player.name} 取消了准备`);
                }
                
                player.ready = data.ready;
                this.updatePlayerList(this.roomData.players);
            }
        }
    }
    
    // 处理游戏开始
    handleGameStarted(data) {
        this.gameState = 'playing';
        
        document.getElementById('menuPage').style.display = 'none';
        document.getElementById('lobbyPage').style.display = 'none';
        document.getElementById('gamePage').style.display = 'block';
        
        // 初始化游戏界面
        this.initGameBoard(data);
    }
    
    // 初始化游戏棋盘
    initGameBoard(data) {
        console.log('Game started with settings:', data.settings);
        // 这里应该初始化游戏棋盘界面
    }
    
    // 处理骰子结果
    handleDiceRolled(data) {
        // 显示骰子动画和结果
        console.log(`Player ${data.playerName} rolled:`, data.diceValues);
    }
    
    // 处理下一个回合
    handleNextTurn(data) {
        console.log('Next turn, current player index:', data.currentPlayerIndex);
    }
    
    // 处理聊天消息
    handleChatMessage(data) {
        const chatMessages = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `
            <span class="chat-player">${data.playerName}:</span>
            <span class="chat-text">${data.message}</span>
            <span class="chat-time">${new Date(data.timestamp).toLocaleTimeString()}</span>
        `;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // 显示错误信息
    showError(message) {
        // 创建错误提示元素
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerHTML = `
            <div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); 
                        background: #e74c3c; color: white; padding: 15px; border-radius: 5px; 
                        z-index: 10000; box-shadow: 0 4px 8px rgba(0,0,0,0.2); max-width: 90%;">
                <div style="display: flex; align-items: center;">
                    <span style="font-size: 18px; margin-right: 10px;">⚠️</span>
                    <span>${message}</span>
                    <button onclick="this.parentElement.parentElement.remove()" 
                            style="margin-left: 15px; background: rgba(255,255,255,0.2); border: none; 
                                   color: white; border-radius: 3px; cursor: pointer; padding: 3px 8px;">×</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(errorElement);
        
        // 3秒后自动移除错误提示
        setTimeout(() => {
            if (errorElement.parentElement) {
                errorElement.parentElement.removeChild(errorElement);
            }
        }, 3000);
        
        console.error('Game error:', message);
    }
}

// 页面加载完成后初始化在线游戏
document.addEventListener('DOMContentLoaded', () => {
    // 只在有在线游戏元素时初始化
    if (document.getElementById('menuPage')) {
        window.pollingGame = new PollingSubwayPilotChess();
    }
});