# 部署指南

本文档详细说明了如何将地铁线路飞行棋游戏部署到不同的平台，让全世界的人都能玩这个游戏。

## 目录

1. [GitHub Pages (最简单)](#github-pages)
2. [Vercel (推荐)](#vercel)
3. [Heroku](#heroku)
4. [Docker](#docker)
5. [传统服务器部署](#传统服务器部署)
6. [功能限制说明](#功能限制说明)

## GitHub Pages

GitHub Pages是最简单的部署方式，适合静态网站托管，但有一些功能限制。

### 部署步骤

1. 确保你的项目已经在GitHub仓库中
2. 进入仓库的Settings页面
3. 向下滚动到"Pages"部分
4. 在"Source"下拉菜单中选择"GitHub Actions"
5. 提交更改

### 限制

- 不支持WebSocket连接，因此在线多人游戏功能不可用
- 只能玩单人游戏模式

## Vercel

Vercel是一个现代化的云平台，支持Node.js应用部署，非常适合WebSocket应用。

### 部署步骤

1. 注册[Vercel账户](https://vercel.com/signup)
2. 安装Vercel CLI: `npm install -g vercel`
3. 在项目根目录运行: `vercel`
4. 按照提示完成部署

### 优势

- 自动HTTPS
- 全球CDN
- 自动扩展
- 支持WebSocket

## Heroku

Heroku是一个流行的云平台即服务(PaaS)，支持多种编程语言。

### 部署步骤

1. 注册[Heroku账户](https://signup.heroku.com/)
2. 安装[Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
3. 在项目根目录登录: `heroku login`
4. 创建应用: `heroku create your-app-name`
5. 部署应用: `git push heroku main`
6. 打开应用: `heroku open`

### 环境变量设置

如果需要设置环境变量:
```bash
heroku config:set NODE_ENV=production
```

## Docker

Docker容器化部署适合在任何支持Docker的环境中运行。

### 构建和运行

1. 构建Docker镜像:
   ```bash
   docker build -t subwaypilotchess .
   ```

2. 运行容器:
   ```bash
   docker run -p 3000:3000 subwaypilotchess
   ```

3. 访问应用: http://localhost:3000

### Docker Compose

创建`docker-compose.yml`文件:
```yaml
version: '3'
services:
  subwaypilotchess:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

运行:
```bash
docker-compose up
```

## 传统服务器部署

在传统服务器上部署需要以下步骤:

### 环境要求

- Node.js 14.x 或更高版本
- npm 或 yarn 包管理器

### 部署步骤

1. 克隆或上传代码到服务器
2. 安装依赖:
   ```bash
   npm install
   ```

3. 启动应用:
   ```bash
   npm start
   ```

4. 使用PM2等进程管理器保持应用运行:
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 startup
   pm2 save
   ```

### 反向代理配置 (Nginx)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 功能限制说明

不同的部署平台对功能的支持有所不同:

| 部署平台 | 单人游戏 | 在线多人游戏 | WebSocket支持 | 免费额度 |
|---------|---------|------------|--------------|---------|
| GitHub Pages | ✅ | ❌ | ❌ | 有 |
| Vercel | ✅ | ✅ | ✅ | 有 |
| Heroku | ✅ | ✅ | ✅ | 有 |
| Docker | ✅ | ✅ | ✅ | 无 |
| 传统服务器 | ✅ | ✅ | ✅ | 无 |

## 性能优化建议

1. **使用CDN**: 对于静态资源（图片、CSS、JS文件）使用CDN加速
2. **启用Gzip压缩**: 减少传输数据大小
3. **设置缓存策略**: 合理设置HTTP缓存头
4. **数据库优化**: 如果添加持久化存储，需要优化数据库查询
5. **负载均衡**: 对于高流量应用，使用负载均衡器分发请求

## 监控和日志

1. **应用日志**: 使用Winston等日志库记录应用日志
2. **错误监控**: 集成Sentry等错误监控服务
3. **性能监控**: 使用New Relic或Datadog等APM工具
4. **访问日志**: 配置Nginx或Apache访问日志

## 安全考虑

1. **HTTPS**: 始终使用HTTPS加密传输
2. **输入验证**: 对所有用户输入进行验证和清理
3. **速率限制**: 实施API速率限制防止滥用
4. **安全头**: 设置适当的安全HTTP头
5. **依赖更新**: 定期更新依赖包以修复安全漏洞

## 故障排除

### 常见问题

1. **应用无法启动**:
   - 检查端口是否被占用
   - 确认所有依赖已正确安装
   - 查看日志文件获取错误信息

2. **WebSocket连接失败**:
   - 检查防火墙设置
   - 确认反向代理正确配置了WebSocket支持
   - 验证SSL证书配置

3. **性能问题**:
   - 检查服务器资源使用情况
   - 优化代码和数据库查询
   - 考虑水平扩展

### 联系支持

如果遇到无法解决的问题，可以通过以下方式寻求帮助:

1. 查看项目GitHub Issues
2. 提交新的Issue描述问题
3. 联系项目维护者

通过以上任何一种部署方式，你都可以让全世界的人都能访问和玩你的地铁线路飞行棋游戏！