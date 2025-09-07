const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// 存储游戏房间信息
const gameRooms = new Map();
// 存储客户端轮询信息
const pollingClients = new Map();

// 生成房间ID
function generateRoomId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// 生成玩家ID
function generatePlayerId() {
  return Math.floor(Math.random() * 1000000);
}

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  
  console.log(`Request: ${req.method} ${pathname}`);
  
  // 处理API请求
  if (pathname.startsWith('/api/')) {
    handleApiRequest(req, res, pathname, query);
    return;
  }
  
  // 处理静态文件
  let filePath = '.' + pathname;
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

// 处理API请求
function handleApiRequest(req, res, pathname, query) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // 解析POST数据
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        processApiRequest(req, res, pathname, query, data);
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    processApiRequest(req, res, pathname, query, null);
  }
}

// 处理具体的API请求
function processApiRequest(req, res, pathname, query, data) {
  try {
    switch (pathname) {
      case '/api/createRoom':
        createRoom(req, res, data);
        break;
      case '/api/joinRoom':
        joinRoom(req, res, data);
        break;
      case '/api/leaveRoom':
        leaveRoom(req, res, data);
        break;
      case '/api/startGame':
        startGame(req, res, data);
        break;
      case '/api/rollDice':
        rollDice(req, res, data);
        break;
      case '/api/sendMessage':
        sendMessage(req, res, data);
        break;
      case '/api/poll':
        pollMessages(req, res, data);
        break;
      case '/api/getRoomInfo':
        getRoomInfo(req, res, data);
        break;
      case '/api/toggleReady':
        toggleReady(req, res, data);
        break;
      default:
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'API endpoint not found' }));
    }
  } catch (error) {
    console.error('API Error:', error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
}

// 创建房间
function createRoom(req, res, data) {
  const roomId = generateRoomId();
  const playerId = generatePlayerId();
  
  // 确保玩家数量在1-4之间
  const playerCount = Math.max(1, Math.min(4, data.playerCount || 2));
  
  const room = {
    id: roomId,
    hostId: playerId,
    players: [{
      id: playerId,
      name: data.playerName || 'Player 1',
      color: '#e74c3c',
      ready: false,
      position: 0,
      finished: false,
      rank: null
    }],
    gameState: 'waiting', // waiting, playing, finished
    settings: {
      city: data.city || '广州',
      playerCount: playerCount,
      diceCount: data.diceCount || 2
    },
    currentPlayerIndex: 0,
    messages: [],
    lastMessageId: 0
  };
  
  gameRooms.set(roomId, room);
  
  // 发送响应
  res.writeHead(200);
  res.end(JSON.stringify({
    success: true,
    roomId: roomId,
    playerId: playerId,
    settings: room.settings
  }));
}

// 加入房间
function joinRoom(req, res, data) {
  const room = gameRooms.get(data.roomId);
  
  if (!room) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Room not found' }));
    return;
  }
  
  if (room.players.length >= room.settings.playerCount) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: 'Room is full' }));
    return;
  }
  
  // 分配玩家ID和颜色
  const playerId = generatePlayerId();
  const playerColors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12'];
  
  const player = {
    id: playerId,
    name: data.playerName || `Player ${room.players.length + 1}`,
    color: playerColors[room.players.length % 4], // 确保颜色在范围内
    ready: false,
    position: 0,
    finished: false,
    rank: null
  };
  
  room.players.push(player);
  
  // 通知其他玩家有新玩家加入
  const joinMessage = {
    id: ++room.lastMessageId,
    type: 'playerJoined',
    timestamp: Date.now(),
    data: { player }
  };
  room.messages.push(joinMessage);
  
  // 发送响应
  res.writeHead(200);
  res.end(JSON.stringify({
    success: true,
    roomId: room.id,
    playerId: playerId,
    settings: room.settings,
    players: room.players
  }));
}

// 离开房间
function leaveRoom(req, res, data) {
  const room = gameRooms.get(data.roomId);
  
  if (!room) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Room not found' }));
    return;
  }
  
  // 查找玩家
  const playerIndex = room.players.findIndex(p => p.id === data.playerId);
  if (playerIndex === -1) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Player not found' }));
    return;
  }
  
  const player = room.players[playerIndex];
  
  // 从房间中移除玩家
  room.players.splice(playerIndex, 1);
  
  // 如果房间为空，删除房间
  if (room.players.length === 0) {
    gameRooms.delete(room.id);
    res.writeHead(200);
    res.end(JSON.stringify({ success: true, message: 'Room deleted' }));
    return;
  }
  
  // 如果离开的是房主，转移房主权限
  if (room.hostId === player.id) {
    room.hostId = room.players[0].id;
  }
  
  // 通知其他玩家有玩家离开
  const leaveMessage = {
    id: ++room.lastMessageId,
    type: 'playerLeft',
    timestamp: Date.now(),
    data: { 
      playerId: player.id,
      playerName: player.name
    }
  };
  room.messages.push(leaveMessage);
  
  res.writeHead(200);
  res.end(JSON.stringify({ success: true }));
}

// 获取房间信息
function getRoomInfo(req, res, data) {
  const room = gameRooms.get(data.roomId);
  
  if (!room) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Room not found' }));
    return;
  }
  
  res.writeHead(200);
  res.end(JSON.stringify({
    success: true,
    room: {
      id: room.id,
      players: room.players,
      gameState: room.gameState,
      settings: room.settings,
      currentPlayerIndex: room.currentPlayerIndex
    }
  }));
}

// 切换准备状态
function toggleReady(req, res, data) {
  const room = gameRooms.get(data.roomId);
  
  if (!room) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Room not found' }));
    return;
  }
  
  // 查找玩家
  const player = room.players.find(p => p.id === data.playerId);
  if (!player) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Player not found' }));
    return;
  }
  
  // 切换准备状态
  player.ready = !player.ready;
  
  // 通知其他玩家准备状态变化
  const readyMessage = {
    id: ++room.lastMessageId,
    type: 'playerReady',
    timestamp: Date.now(),
    data: { 
      playerId: player.id,
      playerName: player.name,
      ready: player.ready
    }
  };
  room.messages.push(readyMessage);
  
  res.writeHead(200);
  res.end(JSON.stringify({ 
    success: true,
    ready: player.ready
  }));
}

// 开始游戏
function startGame(req, res, data) {
  const room = gameRooms.get(data.roomId);
  
  if (!room) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Room not found' }));
    return;
  }
  
  // 检查是否是房主
  if (room.hostId !== data.playerId) {
    res.writeHead(403);
    res.end(JSON.stringify({ error: 'Only the host can start the game' }));
    return;
  }
  
  // 检查玩家是否都已准备
  const allReady = room.players.every(player => player.ready);
  if (!allReady) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: 'Not all players are ready' }));
    return;
  }
  
  // 检查房间是否已满
  if (room.players.length < room.settings.playerCount) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: `Need ${room.settings.playerCount} players to start the game` }));
    return;
  }
  
  // 更新游戏状态
  room.gameState = 'playing';
  room.currentPlayerIndex = 0;
  
  // 通知所有玩家游戏开始
  const startMessage = {
    id: ++room.lastMessageId,
    type: 'gameStarted',
    timestamp: Date.now(),
    data: {
      settings: room.settings,
      players: room.players,
      currentPlayerIndex: room.currentPlayerIndex
    }
  };
  room.messages.push(startMessage);
  
  res.writeHead(200);
  res.end(JSON.stringify({ success: true }));
}

// 掷骰子
function rollDice(req, res, data) {
  const room = gameRooms.get(data.roomId);
  
  if (!room) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Room not found' }));
    return;
  }
  
  // 检查是否轮到该玩家
  const currentPlayer = room.players[room.currentPlayerIndex];
  if (currentPlayer.id !== data.playerId) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: 'Not your turn' }));
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
  const diceMessage = {
    id: ++room.lastMessageId,
    type: 'diceRolled',
    timestamp: Date.now(),
    data: {
      playerId: currentPlayer.id,
      playerName: currentPlayer.name,
      diceValues: diceValues,
      totalSteps: totalSteps
    }
  };
  room.messages.push(diceMessage);
  
  // 这里应该处理玩家移动逻辑
  // 移动玩家并更新位置
  currentPlayer.position += totalSteps;
  
  // 切换到下一个玩家
  room.currentPlayerIndex = (room.currentPlayerIndex + 1) % room.players.length;
  
  // 通知下一个玩家回合
  const nextTurnMessage = {
    id: ++room.lastMessageId,
    type: 'nextTurn',
    timestamp: Date.now(),
    data: {
      currentPlayerIndex: room.currentPlayerIndex
    }
  };
  room.messages.push(nextTurnMessage);
  
  res.writeHead(200);
  res.end(JSON.stringify({ success: true }));
}

// 发送消息
function sendMessage(req, res, data) {
  const room = gameRooms.get(data.roomId);
  
  if (!room) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Room not found' }));
    return;
  }
  
  // 查找玩家
  const player = room.players.find(p => p.id === data.playerId);
  if (!player) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Player not found' }));
    return;
  }
  
  // 添加消息到房间
  const message = {
    id: ++room.lastMessageId,
    type: 'chatMessage',
    timestamp: Date.now(),
    data: {
      playerId: player.id,
      playerName: player.name,
      message: data.message
    }
  };
  room.messages.push(message);
  
  res.writeHead(200);
  res.end(JSON.stringify({ success: true }));
}

// 轮询消息
function pollMessages(req, res, data) {
  const room = gameRooms.get(data.roomId);
  
  if (!room) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Room not found' }));
    return;
  }
  
  // 获取自lastMessageId以来的新消息
  const newMessages = room.messages.filter(msg => msg.id > (data.lastMessageId || 0));
  
  res.writeHead(200);
  res.end(JSON.stringify({ 
    success: true,
    messages: newMessages,
    lastMessageId: room.lastMessageId
  }));
}

// Vercel导出
module.exports = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  
  console.log(`Vercel Request: ${req.method} ${pathname}`);
  
  // 处理API请求
  if (pathname.startsWith('/api/')) {
    handleApiRequest(req, res, pathname, query);
    return;
  }
  
  // 处理静态文件
  let filePath = '.' + pathname;
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
};

// 仅在直接运行时启动服务器（非Vercel环境）
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`=======================================`);
    console.log(`🚇 地铁线路飞行棋服务器启动成功!`);
    console.log(`🚀 服务器运行在 http://localhost:${PORT}/`);
    console.log(`🎮 在浏览器中打开以上地址开始游戏`);
    console.log(`=======================================`);
  });
}