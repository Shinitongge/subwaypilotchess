# 广州地铁飞行棋 🚇

一个基于广州地铁线路的创新飞行棋游戏！

## 🎮 游戏特色

### 核心功能
- 🚇 以广州地铁各站点和线路为棋盘
- 🎯 **每个玩家可选择不同的起点站和终点站**
- 🎲 支持1-3颗骰子，增加策略性
- 👥 支持2-4名玩家同时游戏
- 🎨 每个玩家拥有不同颜色的棋子（红、蓝、绿、橙）

### 游戏体验
- 🔄 轮流摇骰子，公平竞争
- 🏆 实时排名显示，游戏结束时展示最终排名
- ✨ 流畅的棋子移动动画（100毫秒/步）
- 👀 逐格显示移动过程，清晰可见
- 🎆 棋子移动时的发光和缩放特效
- 🔄 骰子摇动时的旋转动画效果
- 🗺️ **按照广州地铁真实线路图布局，展示所有线路及交汇站**

### 界面设计
- 🗺️ **真实地铁线路图布局，所有线路在一张地图内展示**
- 🔗 **交汇站清晰可见，显示线路连接关系**
- 🎨 SVG线路连接，视觉效果更佳
- 📱 响应式设计，适配不同屏幕尺寸
- 🖥️ 支持Web端运行
- 🎯 智能的多棋子位置管理，避免重叠
- 🎮 直观的用户界面和操作体验
- ⭐ 交汇站特殊标识（金黄色高亮 + 换乘标识）
- 🛤️ 当前玩家路径实时高亮显示
- 📊 地铁线路图例，一目了然

## 🚀 如何开始游戏

1. **设置玩家参数**
   - 选择玩家数量（2-4人）
   - **为每个玩家单独设置起点站和终点站**
   - 选择骰子数量（1-3颗）

2. **开始游戏**
   - 点击"开始游戏"按钮
   - 系统自动计算每个玩家的最短路径
   - 轮流点击"摇骰子"按钮
   - 观看棋子沿着各自的地铁线路移动

3. **获胜条件**
   - 第一个到达自己终点站的玩家获胜
   - 游戏结束后显示完整排名

## 🏗️ 技术实现

- **前端**: HTML5 + CSS3 + JavaScript ES6
- **算法**: BFS最短路径算法
- **响应式设计**: 支持桌面端和移动端
- **动画效果**: CSS3 动画 + JavaScript 控制
- **数据**: 真实广州地铁线路数据

## 📋 广州地铁线路

游戏包含以下地铁线路的真实站点：
- **1号线** (20站) - 西朗 ↔ 广州火车站
- **2号线** (24站) - 嘉禾望岗 ↔ 广州南站
- **3号线** (17站) - 机场南 ↔ 广州塔
- **4号线** (14站) - 黄村 ↔ 南沙客运港
- **5号线** (11站) - 文冲 ↔ 三溪
- **6号线** (22站) - 浔峰岗 ↔ 香雪
- **7号线** (16站) - 广州南站 ↔ 世纪莲
- **8号线** (25站) - 滗心 ↔ 万胜围
- **9号线** (13站) - 高增 ↔ 花都汽车城
- **13号线** (13站) - 鱼珠 ↔ 新塘
- **14号线** (15站) - 嘉禾望岗 ↔ 白云东平
- **21号线** (14站) - 员村 ↔ 增城广场

### 🔗 主要交汇站
- **公园前** (1、2号线)
- **体育西路** (1、3号线) 
- **嘉禾望岗** (2、3、14号线)
- **客村** (3、8号线)
- **万胜围** (4、8号线)
- **区庄** (5、6号线)
- **东山口** (1、6号线)
- **昌岗** (2、8号线)
- **陈家祠** (1、8号线)
- **广州南站** (2、7号线)
- 等等...

## 🎯 游戏规则

1. **个性化路线**: 每个玩家可以设置不同的起点站和终点站
2. **智能路径**: 系统自动计算从起点到终点的最短地铁路径
3. **骰子机制**: 骰子数量1-3颗可选，点数总和决定移动步数
4. **轮流游戏**: 按顺序轮流摇骰子，公平竞争
5. **获胜条件**: 第一个到达自己终点站的玩家获胜

## 🌟 特殊功能

- **实时排名**: 根据玩家在各自路径上的进度实时更新排名
- **路径高亮**: 当前玩家的路径会用相应颜色高亮显示
- **交汇站识别**: 换乘站点用金黄色特殊标识
- **智能路径计算**: 使用BFS算法计算最短地铁路径
- **流畅动画**: 棋子移动采用逐格动画，清晰展示移动过程
- **视觉反馈**: 起点、终点、当前位置用不同颜色标识

## 🎨 视觉设计

- 线路图式布局，按线路分组显示站点
- 每条线路用官方颜色标识
- 渐变背景和毛玻璃效果
- 圆角设计和阴影效果
- 动态hover效果
- 响应式布局适配
- 交汇站特殊视觉效果

## 🚀 新功能亮点

### 1. 🗺️ 统一地铁线路图
所有地铁线路在一张地图内统一展示，而不是单独列出各条线路。每条线路使用SVG连接线显示站点之间的连接关系，让玩家清晰地看到自己应该走的路线。

### 2. 🔗 交汇站可视化
交汇站用金黄色特殊标识，并显示“换”字标记，让玩家一目了然地知道哪些站点可以换乘。鼠标悬停时显示详细的线路信息。

### 3. 🎮 智能路径导航
当前玩家的完整路径在地图上实时高亮显示：
- 🟢 起点站：绿色边框 + 发光效果
- 🔴 终点站：红色边框 + 发光效果
- ⭐ 当前位置：金色边框 + 脉冲动画
- 🔵 路径站点：玩家颜色边框

### 4. 📊 地铁线路图例
右上角显示完整的地铁线路图例，包含：
- 所有线路的官方颜色标识
- 交汇站、起点站、终点站的图例说明
- 当前位置的标识说明

享受您的广州地铁飞行棋之旅！🚇✨

# Subway Pilot Chess 🚇

An innovative board game based on real metro/subway lines! Players can travel from their chosen start station to their destination station, competing to see who can complete their journey first.

## 🎮 Game Features

### Core Functionality
- 🚇 Real metro stations and lines as the game board
- 🎯 **Each player can choose different start and end stations**
- 🎲 Support for 1-3 dice to increase strategy
- 👥 2-4 player multiplayer support
- 🎨 Each player has a unique colored piece (red, blue, green, orange)

### Game Experience
- 🔄 Turn-based dice rolling for fair play
- 🏆 Real-time ranking display with final ranking at game end
- ✨ Smooth piece movement animations (100ms per step)
- 👀 Step-by-step movement visualization
- 🎆 Glowing and scaling effects when pieces move
- 🔄 Dice rolling animation effects
- 🗺️ **Layout based on real metro line maps with all lines and transfer stations**

### UI Design
- 🗺️ **Authentic metro line layout with all lines on one map**
- 🔗 **Clear visualization of transfer stations and line connections**
- 🎨 SVG line connections for better visual effects
- 📱 Responsive design for different screen sizes
- 🖥️ Web-based support
- 🎯 Intelligent multi-piece positioning to avoid overlap
- 🎮 Intuitive user interface and experience
- ⭐ Special identification for transfer stations (golden highlight + transfer indicator)
- 🛤️ Real-time highlighting of current player's path
- 📊 Metro line legend for easy reference

## 🚀 How to Play

1. **Player Setup**
   - Choose number of players (2-4)
   - **Set individual start and end stations for each player**
   - Select number of dice (1-3)

2. **Start Game**
   - Click the "Start Game" button
   - System automatically calculates shortest path for each player
   - Take turns clicking the "Roll Dice" button
   - Watch your pieces move along the metro lines

3. **Winning Condition**
   - First player to reach their destination station wins
   - Full ranking displayed at game end

## 🛠 Technical Implementation

- **Frontend**: HTML5 + CSS3 + JavaScript ES6
- **Algorithm**: BFS shortest path algorithm
- **Responsive Design**: Support for desktop and mobile
- **Animations**: CSS3 animations + JavaScript control
- **Data**: Real metro line data

## 🌍 Supported Cities

- **Guangzhou** (12 lines, 241 stations)
- **Shenzhen** (8 lines)
- **Shanghai** (17 lines)

### Sample Lines (Guangzhou)
- **Line 1** (20 stations) - Xilang ↔ Guangzhou Railway Station
- **Line 2** (24 stations) - Jiahewanggang ↔ Guangzhou South Railway Station
- **Line 3** (17 stations) - Airport S. ↔ Canton Tower
- **Line 4** (14 stations) - Huangcun ↔ Nansha Passenger Port
- **Line 5** (11 stations) - Wenchong ↔ Sanxi
- **Line 6** (22 stations) - Xunfenggang ↔ Xiangxue
- **Line 8** (25 stations) - Jiaoxin ↔ Wanshengwei
- And more...

## 🎯 Game Rules

1. **Personalized Routes**: Each player can set different start and end stations
2. **Smart Pathfinding**: System automatically calculates shortest path from start to destination
3. **Dice Mechanics**: 1-3 dice can be selected, total determines movement steps
4. **Turn-based Play**: Players take turns rolling dice for fair competition
5. **Winning Condition**: First player to reach their destination station wins

## 🌟 Special Features

- **Real-time Ranking**: Rankings updated based on player progress along their routes
- **Path Highlighting**: Current player's path highlighted in their color
- **Transfer Station Identification**: Transfer stations specially marked with golden highlight

## ▶️ Quick Start

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Select number of players, city, and set start/end stations for each player
4. Click "Start Game" and enjoy!

## 🧪 Validation

To run validation scripts to check station positions and data consistency:
```bash
npm run validate
# or
node validate-stations.js
```

## 📦 Project Structure

```
subwaypilotchess/
├── index.html          # Main HTML file
├── game.js             # Main game logic
├── style.css           # Styling
├── start.js            # Local development server
├── package.json        # Project configuration
├── README.md           # This file
├── LICENSE             # License information
├── .gitignore          # Git ignore rules
├── guangzhou-metro-new.js  # Guangzhou metro data
├── shenzhen-metro.js       # Shenzhen metro data
├── shanghai-metro.js       # Shanghai metro data
├── metro-data-manager.js   # Metro data management
├── validate-stations.js    # Station data validation script
└── .github/
    └── workflows/
        └── validate.yml    # GitHub Actions workflow
```

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
