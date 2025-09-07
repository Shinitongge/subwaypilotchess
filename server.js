const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  console.log(`Request: ${req.url}`);
  
  let filePath = '.' + req.url;
  if (filePath === './' || filePath === './index.html') {
    filePath = './index.html';
  } else if (filePath === './online') {
    filePath = './online.html';
  }
  
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
  };
  
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // 对于单页应用，如果找不到文件，返回index.html
        fs.readFile('./index.html', (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// 存储WebSocket服务器引用
let wss;

// 初始化WebSocket服务器的函数
function initializeWebSocket(server) {
  // 创建WebSocket服务器
  wss = new WebSocket.Server({ server });

  // 存储游戏房间信息
  const gameRooms = new Map();

  // WebSocket连接处理
  wss.on('connection', (ws, req) => {
    // 设置客户端IP地址
    const clientIP = req.headers['x-forwarded-for'] || 
                    req.connection.remoteAddress || 
                    req.socket.remoteAddress ||
                    (req.connection.socket ? req.connection.socket.remoteAddress : null);
    
    console.log('New client connected from IP:', clientIP);
    
    // 发送欢迎消息
    ws.send(JSON.stringify({
      type: 'welcome',
      message: 'Welcome to Subway Pilot Chess Online!'
    }));
    
    // 处理客户端消息
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        handleClientMessage(ws, data);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });
    
    // 处理客户端断开连接
    ws.on('close', () => {
      console.log('Client disconnected from IP:', clientIP);
      handleClientDisconnect(ws);
    });
  });

  // 处理客户端消息
  function handleClientMessage(ws, data) {
    switch (data.type) {
      case 'createRoom':
        createGameRoom(ws, data);
        break;
      case 'joinRoom':
        joinGameRoom(ws, data);
        break;
      case 'leaveRoom':
        leaveGameRoom(ws, data);
        break;
      case 'startGame':
        startGame(ws, data);
        break;
      case 'rollDice':
        rollDice(ws, data);
        break;
      case 'chatMessage':
        broadcastChatMessage(ws, data);
        break;
      default:
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Unknown message type'
        }));
    }
  }

  // 创建游戏房间
  function createGameRoom(ws, data) {
    const roomId = generateRoomId();
    const room = {
      id: roomId,
      host: ws,
      players: new Map([[ws, {
        id: 1,
        name: data.playerName || 'Player 1',
        color: '#e74c3c',
        ready: false
      }]]),
      gameState: 'waiting', // waiting, playing, finished
      settings: {
        city: data.city || '广州',
        playerCount: data.playerCount || 2,
        diceCount: data.diceCount || 2
      },
      currentPlayerIndex: 0,
      playersData: []
    };
    
    gameRooms.set(roomId, room);
    
    // 关联房间和WebSocket连接
    ws.roomId = roomId;
    ws.playerId = 1;
    
    // 发送房间创建成功的消息
    ws.send(JSON.stringify({
      type: 'roomCreated',
      roomId: roomId,
      playerId: 1,
      settings: room.settings
    }));
    
    console.log(`Room ${roomId} created by ${data.playerName || 'Player 1'}`);
  }

  // 加入游戏房间
  function joinGameRoom(ws, data) {
    const room = gameRooms.get(data.roomId);
    
    if (!room) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Room not found'
      }));
      return;
    }
    
    if (room.players.size >= room.settings.playerCount) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Room is full'
      }));
      return;
    }
    
    // 分配玩家ID和颜色
    const playerId = room.players.size + 1;
    const playerColors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12'];
    
    const player = {
      id: playerId,
      name: data.playerName || `Player ${playerId}`,
      color: playerColors[playerId - 1],
      ready: false
    };
    
    room.players.set(ws, player);
    ws.roomId = data.roomId;
    ws.playerId = playerId;
    
    // 通知所有玩家有新玩家加入
    broadcastToRoom(room, {
      type: 'playerJoined',
      player: player
    });
    
    // 发送房间信息给新加入的玩家
    ws.send(JSON.stringify({
      type: 'roomJoined',
      roomId: room.id,
      playerId: playerId,
      settings: room.settings,
      players: Array.from(room.players.values())
    }));
    
    console.log(`Player ${player.name} joined room ${data.roomId}`);
  }

  // 离开游戏房间
  function leaveGameRoom(ws, data) {
    const room = gameRooms.get(ws.roomId);
    
    if (!room) return;
    
    const player = room.players.get(ws);
    if (!player) return;
    
    // 从房间中移除玩家
    room.players.delete(ws);
    
    // 如果房间为空，删除房间
    if (room.players.size === 0) {
      gameRooms.delete(room.id);
      console.log(`Room ${room.id} deleted`);
      return;
    }
    
    // 如果离开的是房主，转移房主权限
    if (room.host === ws) {
      const newHost = Array.from(room.players.keys())[0];
      room.host = newHost;
      
      // 通知新房主
      newHost.send(JSON.stringify({
        type: 'promotedToHost'
      }));
    }
    
    // 通知其他玩家有玩家离开
    broadcastToRoom(room, {
      type: 'playerLeft',
      playerId: player.id,
      playerName: player.name
    });
    
    console.log(`Player ${player.name} left room ${ws.roomId}`);
  }

  // 开始游戏
  function startGame(ws, data) {
    const room = gameRooms.get(ws.roomId);
    
    if (!room) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Room not found'
      }));
      return;
    }
    
    // 检查是否是房主
    if (room.host !== ws) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Only the host can start the game'
      }));
      return;
    }
    
    // 检查玩家是否都已准备
    let allReady = true;
    for (const player of room.players.values()) {
      if (!player.ready) {
        allReady = false;
        break;
      }
    }
    
    if (!allReady && room.players.size < room.settings.playerCount) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Not enough players or not all players are ready'
      }));
      return;
    }
    
    // 更新游戏状态
    room.gameState = 'playing';
    room.currentPlayerIndex = 0;
    
    // 初始化玩家数据
    room.playersData = [];
    let index = 0;
    for (const player of room.players.values()) {
      room.playersData.push({
        id: player.id,
        name: player.name,
        color: player.color,
        position: 0,
        finished: false,
        rank: null,
        startStation: data.playersSettings[index].startStation,
        endStation: data.playersSettings[index].endStation,
        path: [] // 这里应该调用路径计算函数
      });
      index++;
    }
    
    // 通知所有玩家游戏开始
    broadcastToRoom(room, {
      type: 'gameStarted',
      settings: room.settings,
      players: room.playersData,
      currentPlayerIndex: room.currentPlayerIndex
    });
    
    console.log(`Game started in room ${room.id}`);
  }

  // 掷骰子
  function rollDice(ws, data) {
    const room = gameRooms.get(ws.roomId);
    
    if (!room) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Room not found'
      }));
      return;
    }
    
    // 检查是否轮到该玩家
    const currentPlayer = Array.from(room.players.keys())[room.currentPlayerIndex];
    if (currentPlayer !== ws) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Not your turn'
      }));
      return;
    }
    
    // 生成随机骰子点数
    const diceCount = room.settings.diceCount || 2;
    const diceValues = [];
    let totalSteps = 0;
    
    for (let i = 0; i < diceCount; i++) {
      const value = Math.floor(Math.random() * 6) + 1;
      diceValues.push(value);
      totalSteps += value;
    }
    
    // 通知所有玩家骰子结果
    broadcastToRoom(room, {
      type: 'diceRolled',
      playerId: room.players.get(ws).id,
      diceValues: diceValues,
      totalSteps: totalSteps
    });
    
    // 这里应该处理玩家移动逻辑
    // 移动玩家并更新位置
    
    // 切换到下一个玩家
    room.currentPlayerIndex = (room.currentPlayerIndex + 1) % room.players.size;
    
    // 通知下一个玩家回合
    broadcastToRoom(room, {
      type: 'nextTurn',
      currentPlayerIndex: room.currentPlayerIndex
    });
  }

  // 广播聊天消息
  function broadcastChatMessage(ws, data) {
    const room = gameRooms.get(ws.roomId);
    
    if (!room) return;
    
    const player = room.players.get(ws);
    if (!player) return;
    
    // 广播消息给房间内所有玩家
    broadcastToRoom(room, {
      type: 'chatMessage',
      playerId: player.id,
      playerName: player.name,
      message: data.message,
      timestamp: new Date().toISOString()
    });
  }

  // 处理客户端断开连接
  function handleClientDisconnect(ws) {
    if (ws.roomId) {
      const room = gameRooms.get(ws.roomId);
      if (room) {
        const player = room.players.get(ws);
        if (player) {
          // 从房间中移除玩家
          room.players.delete(ws);
          
          // 如果房间为空，删除房间
          if (room.players.size === 0) {
            gameRooms.delete(room.id);
            console.log(`Room ${room.id} deleted`);
            return;
          }
          
          // 如果离开的是房主，转移房主权限
          if (room.host === ws) {
            const newHost = Array.from(room.players.keys())[0];
            room.host = newHost;
            
            // 通知新房主
            newHost.send(JSON.stringify({
              type: 'promotedToHost'
            }));
          }
          
          // 通知其他玩家有玩家离开
          broadcastToRoom(room, {
            type: 'playerLeft',
            playerId: player.id,
            playerName: player.name
          });
          
          console.log(`Player ${player.name} left room ${ws.roomId}`);
        }
      }
    }
  }

  // 向房间内所有玩家广播消息
  function broadcastToRoom(room, message) {
    for (const client of room.players.keys()) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    }
  }

  // 生成房间ID
  function generateRoomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  
  console.log('WebSocket server initialized');
}

// 如果直接运行此文件（而不是作为模块导入），则启动服务器
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  
  // 启动HTTP服务器
  server.listen(PORT, () => {
    console.log(`=======================================`);
    console.log(`🚇 地铁线路飞行棋服务器启动成功!`);
    console.log(`🚀 服务器运行在 http://localhost:${PORT}/`);
    console.log(`🎮 在浏览器中打开以上地址开始游戏`);
    console.log(`=======================================`);
  });
  
  // 初始化WebSocket服务器
  initializeWebSocket(server);
}

// 导出服务器和初始化函数以供Vercel使用
module.exports = server;
module.exports.initializeWebSocket = initializeWebSocket;