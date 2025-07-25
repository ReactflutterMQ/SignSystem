# SignSystem
This is a check-in and check-out system

这是一套打卡考勤系统
分为管理员端和用户端

# 项目技术栈
前端：Vue.js 3.0 + TypeScript 4 + Webpack + ElementPlus + Axios
后端: Node.js + Express + MySQL

# 项目功能
1. 管理员端：用户管理、打卡记录管理、打卡规则管理、打卡统计
2. 用户端：打卡签到、打卡签退、打卡记录查询

# 项目运行
1. 克隆项目到本地: `git clone 仓库地址`
2. 安装依赖：`npm install`
3. 启动项目：`npm run serve`
4. 访问：http://localhost:8080

# 项目结构
```
SignSystem
│   ├── src
│   │   ├── assets  // 静态资源
│   │   ├── components  // 组件
│   │   ├── router  // 路由
│   │   ├── store  // 状态管理
│   │   ├── utils  // 工具函数
│   │   ├── views  // 视图
│   │   ├── App.vue  // 根组件
│   │   ├── main.ts  // 入口文件
│   ├── public  // 静态资源
│   ├── package.json  // 项目配置
│   ├── tsconfig.json  // TypeScript 配置
│   ├── vue.config.js  // Vue 配置

