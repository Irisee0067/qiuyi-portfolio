# 顾邱宜 · 个人作品集

React + Vite 单页作品集。采用浅蓝与米白纸张色、黑色印刷线条、衬线与手写体混排的复古编辑设计，最大版心 1700px，支持电脑、平板和手机。

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

## GitHub Pages 部署

本仓库已包含 `.github/workflows/deploy-pages.yml`。上传到 GitHub 后，每次向 `main` 分支提交代码都会自动安装依赖、构建并发布网站。

首次使用时，在 GitHub 仓库中打开 **Settings → Pages**，将 **Build and deployment / Source** 设为 **GitHub Actions**。随后打开仓库的 **Actions** 页面，等待 `Deploy portfolio to GitHub Pages` 运行完成。公开网址通常为：

```text
https://你的GitHub用户名.github.io/仓库名/
```

课程提交时直接提交整个仓库即可。仓库包含 `src/`、`public/`、`package.json`、`pnpm-lock.yaml` 与部署工作流；`node_modules/` 和 `dist/` 会由 GitHub 自动生成，因此按行业惯例不上传。

此电脑已安装项目依赖。直接双击 `打开个人网站.cmd`，脚本会在后台启动本地网站并自动打开浏览器；重复双击不会创建多个服务。也可以在 PowerShell 运行 `./start-preview.ps1`，或使用 `./start-preview.ps1 -NoBrowser` 仅启动服务。

## 已完成

- 全屏 Hero：OGL WebGL 波纹形变主视觉，支持鼠标移动与点击交互，并在离开首屏或标签页隐藏时暂停渲染。
- 动效系统：GSAP opening animation、ScrollTrigger 分区标题推进、卡片 stagger、图片遮罩 reveal 与桌面端轻量视差；尊重系统减少动态效果设置。
- 个人介绍：简历头像、教育背景、三段实习、真实 GPA 与米兰设计周获奖信息。
- 精选项目：大图卡片、分类筛选、可使用键盘操作的原生详情弹窗。
- 《湖颖记》：书籍设计分类、实物封面、设计说明、书籍规格、四张完整展板与原图查看入口。
- 《浔羊记》：包装设计分类、异形盒实物封面、品牌与结构说明、三张完整展板与原图查看入口。
- 《字里藏误》：信息可视化设计分类、主题展板封面、内容与图表说明、三张完整展板与原图查看入口。
- 个人优势：视觉、品牌、动态影像、AI 探索四组能力。
- 整屏联系页：邮件、电话链接、邮箱复制和状态提示。
- 小屏导航、焦点提示、锚点跳转、自托管字体。

## 继续编辑

- `src/content.js`：项目说明、图片路径、经历与能力数据。
- `src/App.jsx`：页面结构、介绍和联系文案。
- `src/WorkSection.jsx`：作品卡片与自动生成的分类筛选。
- `src/ProjectDialog.jsx`：项目详情与多图展板画廊。
- `src/styles.css`：全部样式；主题颜色在 `:root`，版心在 `.container`。
- `public/assets/about-portrait.jpg`：用户补充的个人生活照，用于“关于我”模块；按 4:5 画框取景。旧 `portrait.jpg` 为简历头像，已不在页面使用。
- `public/assets/hero-sculpture.png` 与 `hero-loop.mp4`：首页封面与 12 秒无声视频。
- `public/assets/huyingji/01.jpg` 至 `04.jpg`：《湖颖记》用户原始展板；文件完整保留，首页仅通过 CSS 取景显示第四张中的实物照片。
- `public/assets/xunyangji/01.jpg` 至 `03.jpg`：《浔羊记》用户原始展板，文件完整保留。
- `public/assets/xunyangji/cover.jpg`：《浔羊记》包装合照原图（4000 × 6000），来自用户单独提供的微信图片；卡片与详情封面按完整比例显示。
- `public/assets/zilicangwu/01.jpg` 至 `03.jpg`：《字里藏误》用户原始展板；对应本次附件的第 2、3、4 张图，封面展示第一张展板上部的主题视觉，详情完整显示原图。
- 旧 `public/assets/project-babao.png` 与 `project-village.png` 已不在页面展示。
- `public/og.png`：社交预览图。当前 Open Graph / X 图片地址指向本地预览；获准上线后，在 `index.html` 改为实际部署域名的绝对地址。

## 内容来源与待补充

经历、奖项、联系方式取自用户提供的《顾邱宜中文简历(1).docx》，个人照片使用后续补充的生活照。2027 年毕业日期标注为预计。未编造客户数量、项目业绩或 AI 工具熟练程度。

《湖颖记》已使用用户补充的四张真实作品展板替换首张八宝汤示意卡片，设计介绍和规格整理自展板，未推断创作年份或获奖关联。项目详情完整展示四张原图，并支持在新标签页查看原始分辨率。

《浔羊记》已使用用户补充的三张真实作品展板替换第二张美丽乡村示意卡片，品牌视觉、异形盒结构与调料包装说明整理自展板，未推断创作年份、商业落地或获奖关联。

《字里藏误》已使用用户指定的第 2、3、4 张图替换第三张 AI 形态实验示意卡片。介绍仅概括展板的主题、内容结构和视觉设计，没有将图中的统计数字另行用作网站成果或已核验研究结论。本次第 1 张包装实拍未纳入该项目。

精选项目现为《湖颖记》《浔羊记》《字里藏误》三份用户作品，共 10 张完整展板，示意项目已全部替换。未推断作品创作年份或获奖关联。

首页 MP4 为基于 AI 雕塑图制作的缓慢镜头运动循环。图片与视频均已本地保存，网站不需要图像生成服务或 API 密钥。

替换作品原图时，在 `src/content.js` 更新 `image`、`imageAlt`、`imageNote`、`note` 以及项目角色和过程信息即可。多图作品可添加 `gallery` 数组（图片路径、标题、介绍与原始宽高）；自定义项目信息使用 `facts` 数组。分类和数量会自动计算。

字体：Barlow Condensed、Manrope，采用 SIL Open Font License。授权文件保存在 `public/assets/fonts/`。
