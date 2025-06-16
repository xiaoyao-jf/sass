# AI爽文工坊 🚀

基于DeepSeek AI的智能爽文生成平台，释放无限创意想象力！

![AI爽文工坊](https://img.shields.io/badge/AI%E7%88%BD%E6%96%87%E5%B7%A5%E5%9D%8A-v1.0.0-blue)
![DeepSeek AI](https://img.shields.io/badge/DeepSeek-AI%20Powered-green)
![Next.js](https://img.shields.io/badge/Next.js-15-black)

## 🌟 简介

**AI爽文工坊**是一个革命性的智能创作平台，基于强大的DeepSeek AI模型，专为爽文创作者和娱乐爱好者打造。只需输入简单的角色名称和故事题目，AI即可在几秒钟内为您生成精彩纷呈的爽文内容。

### 🎯 产品定位

- 🤖 **AI驱动**: 基于DeepSeek先进AI模型，理解爽文创作规律
- ⚡ **极速生成**: 10秒生成千字高质量爽文内容
- 🎨 **多元题材**: 支持重生逆袭、霸道总裁、都市修仙等热门题材
- 📱 **全平台适配**: 完美支持手机、平板、桌面端使用

## 🎪 核心功能

### 📖 重生之老板是我小秘

我们的明星功能！输入老板姓名和爽文题目，AI为您量身定制专属的重生爽文故事：

- **智能角色设定**: AI根据输入自动构建丰富的角色背景
- **情节自动生成**: 符合爽文套路的精彩情节发展
- **风格一致性**: 保持爽文特有的节奏感和阅读快感
- **个性化内容**: 每次生成都是独一无二的原创内容

### 🎨 创作特色

- 💯 **高质量输出**
  - DeepSeek AI模型加持，中文创作能力卓越
  - 理解爽文特有的情节套路和节奏感
  - 自动优化语言表达，确保流畅度
  - 符合读者期待的剧情发展

- 🚀 **极速体验**
  - 平均生成时间：10-30秒
  - 一键生成800-1200字完整内容
  - 实时显示生成进度
  - 支持批量创作需求

- 🎯 **多样化题材**
  - 重生逆袭：回到过去改变命运
  - 霸道总裁：商界精英的浪漫故事
  - 都市修仙：现代都市中的修炼之路
  - 末世求生：危机中的生存与成长
  - 穿越古代：跨越时空的奇妙冒险
  - 系统流：游戏化人生的精彩演绎

## 🛠️ 技术架构

### 前端技术栈
- **Next.js 15**: 现代化全栈框架
- **TypeScript**: 类型安全的开发体验
- **Tailwind CSS**: 响应式UI设计
- **Shadcn/UI**: 优雅的组件库
- **Lucide React**: 精美的图标系统

### 后端技术栈
- **Supabase**: 用户认证和数据存储
- **DeepSeek API**: AI内容生成
- **Creem.io**: 支付和订阅管理
- **API Routes**: 服务端逻辑处理

### 核心特性
- 🔐 **安全认证**: 完整的用户登录注册系统
- 💳 **支付集成**: 支持订阅和积分购买
- 📊 **使用统计**: 详细的创作历史记录
- 🌙 **主题切换**: 深色/浅色模式支持
- 📱 **响应式设计**: 完美适配各种设备

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn
- DeepSeek API Key
- Supabase 项目
- Creem.io 账户

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/yourusername/ai-novel-workshop.git
   cd ai-novel-workshop
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **环境配置**
   ```bash
   cp .env.example .env.local
   ```
   
   配置必要的环境变量：
   ```env
   # DeepSeek AI 配置
   DEEPSEEK_API_KEY=your_deepseek_api_key
   
   # Supabase 配置
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # Creem 支付配置
   CREEM_API_KEY=your_creem_api_key
   CREEM_API_URL=https://api.creem.io/v1
   CREEM_WEBHOOK_SECRET=your_webhook_secret
   
   # 站点配置
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   CREEM_SUCCESS_URL=http://localhost:3000/dashboard
   ```

4. **数据库设置**
   - 在Supabase中执行数据库迁移文件
   - 设置必要的表结构和权限

5. **启动开发服务器**
   ```bash
   npm run dev
   ```

6. **访问应用**
   打开浏览器访问 `http://localhost:3000`

## 💰 商业模式

### 订阅套餐
- **免费体验**: 每月免费生成5篇
- **创作者版**: 无限生成，优先处理
- **专业版**: 高级功能，定制选项

### 积分系统
- **按需购买**: 灵活的积分包选择
- **高性价比**: 适合偶尔使用的用户
- **永不过期**: 购买的积分持久有效

## 🎨 使用指南

### 基础使用

1. **注册登录**
   - 访问主页，点击"开始创作"
   - 使用邮箱或Google账号快速注册
   - 完成邮箱验证（如需要）

2. **开始创作**
   - 在主页找到"重生之老板是我小秘"功能区
   - 输入老板姓名（例如：李总、王经理）
   - 输入故事题目（例如：职场逆袭、商界风云）
   - 点击"生成爽文"按钮

3. **查看结果**
   - AI将在10-30秒内完成生成
   - 生成的内容会显示在下方文本框中
   - 支持复制、保存或继续编辑

### 高级技巧

- **角色命名**: 使用具体的职位和姓名效果更佳
- **题材选择**: 结合当前热门话题增加吸引力
- **多次尝试**: 同样的输入可能产生不同的精彩内容
- **内容完善**: 可在AI生成基础上进行个性化修改

## 🔧 部署指南

### Vercel 部署（推荐）

1. **准备工作**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Vercel 配置**
   - 访问 [Vercel](https://vercel.com)
   - 导入 GitHub 仓库
   - 配置环境变量
   - 点击部署

3. **域名设置**
   - 更新 `NEXT_PUBLIC_SITE_URL`
   - 配置 Creem webhook URL
   - 更新 Supabase 回调地址

### 其他部署选项

- **Docker**: 提供 Dockerfile 配置
- **传统服务器**: 支持 PM2 部署
- **云平台**: 兼容 AWS、阿里云等

## 📈 功能规划

### 即将推出

- 🔥 **更多题材**: 玄幻、仙侠、科幻等
- 📚 **长篇创作**: 支持章节式连载小说
- 🎭 **角色管理**: 保存和复用角色设定
- 📖 **模板系统**: 预设情节模板选择
- 🔄 **内容优化**: AI辅助内容修改和润色

### 长期愿景

- 🌍 **多语言支持**: 英文、日文等语言版本
- 🤝 **协作创作**: 多人协同创作功能
- 📱 **移动应用**: 原生 App 版本
- 🎵 **多媒体**: 配音、配图等功能
- 📊 **数据分析**: 创作数据洞察

## 🤝 贡献指南

我们欢迎社区贡献！参与方式：

1. **反馈建议**: 提交 Issue 分享您的想法
2. **代码贡献**: Fork 项目并提交 Pull Request
3. **文档完善**: 帮助改进文档和教程
4. **测试反馈**: 报告 Bug 和使用体验

### 开发规范

- 遵循 TypeScript 严格模式
- 使用 ESLint 和 Prettier 代码格式化
- 编写必要的单元测试
- 遵循 Git 提交信息规范

## 📞 联系我们

- 📧 **邮箱**: support@ai-novel-workshop.com
- 💬 **微信群**: 扫码加入创作者交流群
- 🐛 **Bug 反馈**: GitHub Issues
- 💡 **功能建议**: GitHub Discussions

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情

---

<div align="center">

**🎉 开始您的AI创作之旅吧！**

[立即体验](https://ai-novel-workshop.com) | [查看文档](https://docs.ai-novel-workshop.com) | [加入社区](https://discord.gg/ai-novel)

</div>
