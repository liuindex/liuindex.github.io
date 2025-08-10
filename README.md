# 图像处理编辑器

一个简单易用的在线头像编辑工具，可以为头像添加国旗边框。

## 功能特点

- 响应式设计，适配移动端和桌面端
- 支持上传头像图片
- 提供多种国旗边框选择
- 可自定义边框宽度和颜色
- 支持导出为PNG和JPG格式
- 支持GitHub Pages自动部署

## 技术栈

- [Next.js](https://nextjs.org) - React框架
- [Shadcn UI](https://ui.shadcn.com) - 组件库
- [Tailwind CSS](https://tailwindcss.com) - 样式框架
- [React Dropzone](https://react-dropzone.js.org) - 文件上传
- [html-to-image](https://github.com/bubkoo/html-to-image) - 图像导出
- [React Colorful](https://github.com/omgovich/react-colorful) - 颜色选择器

## 本地开发

1. 克隆仓库

```bash
git clone https://github.com/yourusername/avatar-editor.git
cd avatar-editor
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm run dev
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 部署

项目配置了GitHub Actions工作流，可以自动部署到GitHub Pages。

1. Fork这个仓库
2. 在仓库设置中启用GitHub Pages，选择GitHub Actions作为部署源
3. 推送代码到main分支，或手动触发工作流

## 自动更新

项目配置了定时任务，每天自动构建并部署最新版本。

## 许可证

MIT


## 部署到github pages操作流程
npm run build
out文件夹下的 .nojekyll 文件
npm run deploy