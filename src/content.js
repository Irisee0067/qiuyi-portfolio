import { assetUrl } from './assetUrl.js';

// 履历来自用户简历；三个精选项目来自用户提供的原始作品展板。
export const profile = {
  name: '顾邱宜', englishName: 'QIUYI GU',
  email: 'qiuyi.067@outlook.com', phone: '+86 198 1815 9967',
  location: '中国 · 浙江 · 湖州',
};

export const experiences = [
  { date: '2026.07 — 2026.08', company: '宁波银拓国际贸易有限公司', role: '平面设计助理', description: '参与外贸产品图片处理、企业宣传短视频制作与公众号视觉排版，将品牌信息转化为清晰、有序的传播内容。', skills: '图像处理 / 视觉排版 / 视频剪辑' },
  { date: '2026.01 — 2026.02', company: '南浔区融媒体中心', role: '新闻中心记者 · 实习', description: '参与图片后期、短视频剪辑、公众号排版与新闻稿整理，在真实传播场景中打磨视觉判断与协作能力。', skills: '新媒体视觉 / 图文编辑 / 内容协作' },
  { date: '2025.07 — 2025.08', company: '南浔区融媒体中心', role: '新闻中心记者 · 实习', description: '参与“美丽乡村”宣传片、八宝汤产品推广视频及活动回顾影像的拍摄与后期制作，完成剪辑、字幕、调色、音效及基础动态包装。', skills: '实地拍摄 / 影像叙事 / 动态包装' },
];

export const projects = [
  {
    id: 'huyingji', number: '01', title: '《湖颖记》', english: 'HU YING JI', category: '书籍设计', discipline: 'BOOK DESIGN',
    image: assetUrl('assets/huyingji/cover.webp'), imageAlt: '《湖颖记》书籍内页与分册实物细节', imageNote: '书籍装帧 · 四折页设计',
    tags: ['书籍设计', '湖笔非遗', '蝴蝶精装'], className: 'project-featured project-huyingji', coverClassName: 'huyingji-photo-cover', showCoverTitle: false,
    subtitle: '湖笔技艺的全景人文志。',
    description: '以湖笔非遗文化为核心，关注传统手工艺的存续，让湖笔的匠心与文脉以鲜活的方式被看见、被感知、被传承。作品采用四折叠开合装帧结构，以四大篇章串联湖笔的历史、材料、技艺与使用，在翻阅中连接传统工艺与现代阅读。',
    role: '书籍设计', scope: '装帧结构、封面设计、内页编排与整体视觉系统',
    facts: [
      { label: '设计方向', value: '书籍装帧 / 非遗文化' },
      { label: '书籍规格', value: '110 × 230 mm · 90 页' },
      { label: '装帧方式', value: '四折叠开合 · 蝴蝶精装' },
      { label: '视觉语言', value: '绿色与粉色 · 网点纹理 · 图文编排' },
    ],
    gallery: [
      { src: assetUrl('assets/huyingji/01.webp'), title: '设计理念与封面', description: '设计说明、书籍信息与整体装帧展示', width: 1900, height: 2688 },
      { src: assetUrl('assets/huyingji/02.webp'), title: '内页设计 · 壹', description: '湖笔文化、材料与图文编排', width: 1900, height: 2686 },
      { src: assetUrl('assets/huyingji/03.webp'), title: '内页设计 · 贰', description: '制笔工序、书法文化与阅读节奏', width: 1900, height: 2686 },
      { src: assetUrl('assets/huyingji/04.webp'), title: '装帧细节与亮点', description: '四折页结构、分册设计与便携收藏', width: 1900, height: 2686 },
    ],
  },
  {
    id: 'xunyangji', number: '02', title: '《浔羊记》', english: 'XUN YANG JI', category: '包装设计', discipline: 'PACKAGING DESIGN',
    image: assetUrl('assets/xunyangji/cover.webp'), imageAlt: '《浔羊记》包装合照，展示鲜羊排、鲜羊腿异形盒及三款调料包装', imageNote: '品牌包装 · 仿生异形盒',
    tags: ['包装设计', '品牌视觉', '地域文化'], className: 'project-xunyangji', coverClassName: 'xunyangji-cover', showCoverTitle: false,
    subtitle: '寻一口鲜香，品一口湖羊。',
    description: '围绕南浔湖羊肉的地域特色，构建具有江南烟火气的品牌包装。标志结合棱角木刻宋体与传统回纹，搭配拓印质感插画、米色底与红色主视觉，表达“浔乡本味、烟火匠心、江南鲜羊”的品牌核心。以羊排、羊腿的原生肉型设计仿生异形天地盖纸盒，配合趣味谐音文案和分色调料包装，让品牌识别、包装结构与产品风味相互呼应。',
    role: '包装设计', scope: '品牌定位、标志与辅助图形、包装结构、刀版设计及实物呈现',
    facts: [
      { label: '设计方向', value: '南浔湖羊肉品牌包装' },
      { label: '包装结构', value: '仿生异形天地盖纸盒 · 调料三角折盒' },
      { label: '视觉语言', value: '木刻字体 · 拓印插画 · 风味分色' },
      { label: '系列内容', value: '鲜羊排、鲜羊腿包装及三款风味调料包装' },
    ],
    gallery: [
      { src: assetUrl('assets/xunyangji/01.webp'), title: '品牌建设与视觉系统', description: '品牌定位、故事、标志、设计配色与辅助图形', width: 1900, height: 2688 },
      { src: assetUrl('assets/xunyangji/02.webp'), title: '包装结构与刀版设计', description: '鲜羊排、鲜羊腿及三款调料包装的刀版与效果展示', width: 1900, height: 2686 },
      { src: assetUrl('assets/xunyangji/03.webp'), title: '实物呈现与设计细节', description: '仿生异形盒、趣味文案、配套小卡与调料折盒', width: 1900, height: 2686 },
    ],
  },
  {
    id: 'zilicangwu', number: '03', title: '《字里藏误》', english: 'ERRORS IN THE CHARACTERS', category: '信息可视化设计', discipline: 'INFORMATION DESIGN',
    image: assetUrl('assets/zilicangwu/cover.webp'), imageAlt: '《字里藏误》主题展板，包含404标题、错别字类型与音近错误图表', imageNote: '信息可视化 · 汉字书写',
    tags: ['信息可视化', '图表设计', '汉字文化'], className: 'project-zilicangwu', coverClassName: 'zilicangwu-cover', showCoverTitle: false,
    subtitle: '看见日常书写中，被忽略的错误。',
    description: '聚焦日常汉字书写与数字输入中的错别字现象，以音近错误、形近错误和结构错误为三条叙事线索，组织错误分类、人群分布、主要原因与发生场景。通过流向图、条形图、饼图等图表建立信息之间的关系，结合“404”像素字、黑灰红配色与荧光绿强调，让容易被忽视的书写细节成为可阅读、可比较的视觉信息。',
    role: '信息可视化设计', scope: '信息分类、图表设计、视觉层级与系列展板编排',
    facts: [
      { label: '设计主题', value: '日常书写与数字输入中的错别字' },
      { label: '内容结构', value: '音近错误 · 形近错误 · 结构错误' },
      { label: '呈现方式', value: '流向图、条形图、饼图与信息分类图' },
      { label: '视觉语言', value: '404 像素字 · 黑灰红 · 荧光绿强调' },
    ],
    gallery: [
      { src: assetUrl('assets/zilicangwu/01.webp'), title: '主题概览与音近错误', description: '主题视觉、主要错误类型、音近错误的分类、人群与原因', width: 1900, height: 2688 },
      { src: assetUrl('assets/zilicangwu/02.webp'), title: '形近错误', description: '数字输入与传统书写中的形近字混淆、人群分布与发生场景', width: 1900, height: 2686 },
      { src: assetUrl('assets/zilicangwu/03.webp'), title: '结构错误', description: '笔画、部件与整体结构的错误分类，以及人群、场景与原因分析', width: 1900, height: 2686 },
    ],
  },
];

export const capabilities = [
  { id: '01', icon: 'layout', title: '视觉系统', english: 'VISUAL DESIGN', description: '用网格、字体与色彩建立清晰的视觉层级，让信息有秩序，也有表现力。', tags: ['版式设计', '图像合成', '信息层级'] },
  { id: '02', icon: 'brand', title: '品牌表达', english: 'BRAND IDENTITY', description: '从图形符号到 VI 与包装应用，保持视觉语言的一致性，塑造可识别的品牌性格。', tags: ['Logo / VI', '包装设计', '品牌色彩'] },
  { id: '03', icon: 'film', title: '动态叙事', english: 'MOTION & FILM', description: '结合实地拍摄、剪辑与基础动效，让画面在时间中展开，让故事有自己的节奏。', tags: ['Premiere Pro', 'After Effects', 'Final Cut Pro'] },
  { id: '04', icon: 'ai', title: 'AI 创意探索', english: 'AI EXPLORATION', description: '以设计判断引导新的创作方式，探索 AI 在概念构思、视觉发散与风格实验中的可能。', tags: ['概念探索', '视觉实验', '持续学习'] },
];
