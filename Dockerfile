# 使用官方Node.js运行时作为基础镜像
FROM node:14-alpine

# 设置工作目录
WORKDIR /usr/src/app

# 将package.json和package-lock.json复制到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 将应用源代码复制到工作目录
COPY . .

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV NODE_ENV=production

# 启动应用
CMD [ "node", "server.js" ]