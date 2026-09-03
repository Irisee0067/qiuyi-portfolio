# 顾邱宜 · 个人作品集

React + Vite 单页作品集。深炭黑、暖白、橙色视觉主题，最大版心 1700px，支持电脑、平板和手机。

## 运行

安装 Node.js 20.19+ 或 22.12+。在此目录运行：

```sh
npm install
npm run dev
```

也可使用已保留锁文件的 pnpm：`pnpm install`、`pnpm dev`。

```sh
npm run build
npm run preview
```

开发地址通常为 http://127.0.0.1:5173/ 。`dist/` 为可部署的静态网站。

## 已完成

- 全屏 Hero：本地 MP4 背景、静态封面回退、静音循环、暂停/播放、尊重系统减少动态效果设置。
- 个人介绍：简历头像、教育背景、三段实习、真实 GPA 与米兰设计周获奖信息。
- 精选项目：大图卡片、分类筛选、可使用键盘操作的原生详情弹窗。
- 个人优势：视觉、品牌、动态影像、AI 探索四组能力。
- 整屏联系页：邮件、电话链接、邮箱复制和状态提示。
- 小屏导航、焦点提示、锚点跳转、自托管字体。

## 继续编辑

- `src/content.js`：项目说明、图片路径、经历与能力数据。
- `src/App.jsx`：页面结构、介绍和联系文案。
- `src/styles.css`：全部样式；主题颜色在 `:root`，版心在 `.container`。
- `public/assets/portrait.jpg`：简历中提取的头像。
- `public/assets/hero-sculpture.png` 与 `hero-loop.mp4`：首页封面与 12 秒无声视频。
- `public/assets/project-babao.png`、`project-village.png`：两张临时项目封面。
- `public/og.png`：社交预览图。部署后可在 `index.html` 配置使用实际域名的 Open Graph / X 图片绝对地址。

## 内容来源与待补充

经历、项目文字、奖项、联系方式、头像取自用户提供的《顾邱宜中文简历(1).docx》。2027 年毕业日期标注为预计。未编造客户数量、项目业绩或 AI 工具熟练程度。

原简历没有实际项目图或视频。八宝汤、美丽乡村封面由本次网站制作过程通过 AI 生成，仅用于布局预览；卡片和详情已标注“非项目原图 / 非项目实拍”。它们不能作为本人原项目设计成果。AI 形态实验为本次网站创建的概念视觉，后续可替换为本人案例。

首页 MP4 为基于 AI 雕塑图制作的缓慢镜头运动循环。图片与视频均已本地保存，网站不需要图像生成服务或 API 密钥。

替换作品原图时，在 `src/content.js` 更新 `image`、`imageAlt`、`imageNote`、`note` 以及项目角色和过程信息即可。增加项目后也应同步更新分类数量。

字体：Barlow Condensed、Manrope，采用 SIL Open Font License。授权文件保存在 `public/assets/fonts/`。
