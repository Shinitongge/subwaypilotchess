// 在线游戏客户端逻辑
class OnlineSubwayPilotChess {
    constructor() {
        this.ws = null;
        this.roomId = null;
        this.playerId = null;
        this.gameState = 'menu'; // menu, lobby, playing
        this.roomData = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.showMenu();
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
    
    // 连接到WebSocket服务器
    connect() {
        // 检查是否在HTTPS环境中
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.host;
        
        // 对于GitHub Pages等静态托管环境，WebSocket可能需要特殊处理
        let wsUrl;
        if (host.includes('github.io')) {
            // GitHub Pages不支持WebSocket，需要使用其他解决方案
            // 这里可以添加备用方案，如轮询或使用第三方WebSocket服务
            console.warn('GitHub Pages does not support WebSocket connections');
            this.showWebSocketWarning();
            return;
        } else {
            // 本地开发或自托管环境
            wsUrl = `${protocol}//${host}`;
        }
        
        try {
            this.ws = new WebSocket(wsUrl);
            
            this.ws.onopen = () => {
                console.log('Connected to server');
                this.updateConnectionStatus('connected');
            };
            
            this.ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.handleServerMessage(data);
            };
            
            this.ws.onclose = () => {
                console.log('Disconnected from server');
                this.updateConnectionStatus('disconnected');
            };
            
            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.showError('连接服务器失败，请检查网络连接');
            };
        } catch (error) {
            console.error('Failed to create WebSocket connection:', error);
            this.showError('无法建立连接，请检查网络设置');
        }
    }
    
    // 显示WebSocket警告
    showWebSocketWarning() {
        const warningElement = document.createElement('div');
        warningElement.className = 'websocket-warning';
        warningElement.innerHTML = `
            <div style="background: #f39c12; color: white; padding: 15px; border-radius: 5px; margin: 10px 0;">
                <h3>⚠️ WebSocket连接限制</h3>
                <p>GitHub Pages不支持WebSocket连接，因此在线多人游戏功能在此环境中不可用。</p>
                <p>要体验完整的在线多人游戏功能，请：</p>
                <ol>
                    <li>克隆项目并在本地运行</li>
                    <li>或部署到支持WebSocket的服务器</li>
                </ol>
                <p>您仍然可以体验单人游戏模式。</p>
                <button onclick="this.parentElement.style.display='none'" style="background: white; color: #f39c12; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">关闭</button>
            </div>
        `;
        
        const container = document.querySelector('.menu-container') || document.body;
        container.insertBefore(warningElement, container.firstChild);
    }
    
    // 处理服务器消息
    handleServerMessage(data) {
        switch (data.type) {
            case 'welcome':
                console.log(data.message);
                break;
            case 'roomCreated':
                this.handleRoomCreated(data);
                break;
            case 'roomJoined':
                this.handleRoomJoined(data);
                break;
            case 'playerJoined':
                this.handlePlayerJoined(data);
                break;
            case 'playerLeft':
                this.handlePlayerLeft(data);
                break;
            case 'gameStarted':
                this.handleGameStarted(data);
                break;
            case 'diceRolled':
                this.handleDiceRolled(data);
                break;
            case 'nextTurn':
                this.handleNextTurn(data);
                break;
            case 'chatMessage':
                this.handleChatMessage(data);
                break;
            case 'error':
                this.showError(data.message);
                break;
            default:
                console.log('Unknown message type:', data.type);
        }
    }
    
    // 显示菜单页面
    showMenu() {
        this.gameState = 'menu';
        document.getElementById('menuPage').style.display = 'block';
        document.getElementById('lobbyPage').style.display = 'none';
        document.getElementById('gamePage').style.display = 'none';
        
        this.connect();
    }
    
    // 创建房间
    createRoom() {
        const playerName = document.getElementById('playerNameInput').value || 'Player';
        const city = document.getElementById('citySelect').value || '广州';
        const playerCount = parseInt(document.getElementById('playerCountSelect').value) || 2;
        const diceCount = parseInt(document.getElementById('diceCountSelect').value) || 2;
        
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: 'createRoom',
                playerName: playerName,
                city: city,
                playerCount: playerCount,
                diceCount: diceCount
            }));
        } else {
            this.showError('未连接到服务器，请刷新页面重试');
        }
    }
    
    // 处理房间创建成功
    handleRoomCreated(data) {
        this.roomId = data.roomId;
        this.playerId = data.playerId;
        
        // 显示房间页面
        this.showLobby(data);
    }
    
    // 加入房间
    joinRoom() {
        const roomId = document.getElementById('roomIdInput').value.toUpperCase();
        const playerName = document.getElementById('joinPlayerNameInput').value || 'Player';
        
        if (!roomId) {
            this.showError('请输入房间号');
            return;
        }
        
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: 'joinRoom',
                roomId: roomId,
                playerName: playerName
            }));
        } else {
            this.showError('未连接到服务器，请刷新页面重试');
        }
    }
    
    // 处理加入房间成功
    handleRoomJoined(data) {
        this.roomId = data.roomId;
        this.playerId = data.playerId;
        
        // 显示房间页面
        this.showLobby(data);
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
                <div>${player.name} ${player.id === 1 ? '(房主)' : ''}</div>
                <div class="player-status">${player.ready ? '已准备' : '未准备'}</div>
            `;
            
            playerListElement.appendChild(playerElement);
        });
    }
    
    // 处理玩家加入
    handlePlayerJoined(data) {
        // 这里应该更新玩家列表
        console.log('Player joined:', data.player);
    }
    
    // 处理玩家离开
    handlePlayerLeft(data) {
        console.log('Player left:', data.playerName);
        // 这里应该更新玩家列表
    }
    
    // 切换准备状态
    toggleReady() {
        // 这里应该发送切换准备状态的消息
        const readyBtn = document.getElementById('readyBtn');
        if (readyBtn.textContent === '准备') {
            readyBtn.textContent = '取消准备';
            readyBtn.className = 'btn btn-secondary';
        } else {
            readyBtn.textContent = '准备';
            readyBtn.className = 'btn btn-primary';
        }
    }
    
    // 开始游戏
    startGame() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            // 收集玩家设置
            const playersSettings = [];
            // 这里应该收集每个玩家的起点和终点设置
            
            this.ws.send(JSON.stringify({
                type: 'startGame',
                playersSettings: playersSettings
            }));
        } else {
            this.showError('未连接到服务器，请刷新页面重试');
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
        // 这里应该初始化游戏棋盘界面
        console.log('Game started with settings:', data.settings);
    }
    
    // 离开房间
    leaveRoom() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: 'leaveRoom'
            }));
        }
        
        // 返回菜单页面
        this.showMenu();
    }
    
    // 掷骰子
    rollDice() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: 'rollDice'
            }));
        } else {
            this.showError('未连接到服务器，请刷新页面重试');
        }
    }
    
    // 处理骰子结果
    handleDiceRolled(data) {
        // 显示骰子动画和结果
        console.log(`Player ${data.playerId} rolled:`, data.diceValues);
    }
    
    // 处理下一个回合
    handleNextTurn(data) {
        console.log('Next turn, current player index:', data.currentPlayerIndex);
    }
    
    // 发送聊天消息
    sendChatMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (message && this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: 'chatMessage',
                message: message
            }));
            
            chatInput.value = '';
        }
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
    
    // 更新连接状态
    updateConnectionStatus(status) {
        const statusElement = document.getElementById('connectionStatus');
        if (statusElement) {
            statusElement.textContent = status === 'connected' ? '已连接' : '未连接';
            statusElement.className = status === 'connected' ? 'status-connected' : 'status-disconnected';
        }
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
        window.onlineGame = new OnlineSubwayPilotChess();
    }
});