// 真实履历来自用户提供的中文简历。作品原图补充后，替换 image 和 imageNote 即可。
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
    id: 'babao', number: '01', title: '八宝汤 · 让产品被看见', english: 'A TASTE OF EVERYDAY', category: '品牌传播', year: '2025',
    image: '/assets/project-babao.png', imageAlt: '八宝汤项目的 AI 包装概念示意封面，非实际项目作品', imageNote: 'AI 概念封面 · 非项目原图',
    tags: ['品牌传播', '产品视频'], className: 'project-featured',
    subtitle: '以影像传递产品的日常温度。',
    description: '在南浔区融媒体中心实习期间参与八宝汤产品推广视频制作。将产品信息转化为可被感知的画面，通过镜头组织、剪辑节奏与视听包装完成内容表达。',
    role: '拍摄与后期制作', scope: '素材整理、剪辑、转场、字幕、调色及音效',
    note: '项目经历来自个人简历。当前包装图为本网站制作的 AI 概念封面，不代表原项目包装设计或最终成果；项目原片与过程资料待补充。',
  },
  {
    id: 'village', number: '02', title: '美丽乡村 · 看见在地日常', english: 'STORIES OF A PLACE', category: '动态影像', year: '2025',
    image: '/assets/project-village.png', imageAlt: '江南水乡清晨的 AI 场景示意图，非项目实拍画面', imageNote: 'AI 场景示意 · 非项目实拍',
    tags: ['宣传影像', '影像叙事'], className: '',
    subtitle: '把真实的地方，讲成动人的故事。',
    description: '在南浔区融媒体中心实习期间参与“美丽乡村”宣传片的实地拍摄与后期制作。围绕在地场景组织镜头，以剪辑、调色和声音塑造完整的叙事节奏。',
    role: '实地拍摄与后期制作', scope: '素材粗剪、转场、字幕、调色、音效及 AE 包装',
    note: '项目经历来自个人简历。当前水乡画面为本网站制作的 AI 场景示意，不是本人实拍素材；完整影片与过程资料待补充。',
  },
  {
    id: 'form', number: '03', title: '形态之间 · AI 视觉探索', english: 'FORM, IN MOTION', category: 'AI 探索', year: '2026',
    image: '/assets/hero-sculpture.png', imageAlt: '橙色流动雕塑环的 AI 视觉实验', imageNote: '网站视觉实验 · AI 生成',
    tags: ['AI 视觉', '形态实验'], className: 'project-ai',
    subtitle: '在材质、光线与想象之间寻找可能。',
    description: '为本次个人网站搭建制作的视觉方向实验，以橙红色流动形态、近黑背景与电影感光线探索科技与感性的交集，同时作为首页动态视觉的基础素材。',
    role: '网站概念视觉展示', scope: 'AI 图像生成、视觉方向探索、动态背景呈现',
    note: '此项为搭建网站时生成的展示素材，不作为既有客户项目或本人过往获奖作品。后续可替换为个人 AI 创作案例。',
  },
];

export const capabilities = [
  { id: '01', icon: 'layout', title: '视觉系统', english: 'VISUAL DESIGN', description: '用网格、字体与色彩建立清晰的视觉层级，让信息有秩序，也有表现力。', tags: ['版式设计', '图像合成', '信息层级'] },
  { id: '02', icon: 'brand', title: '品牌表达', english: 'BRAND IDENTITY', description: '从图形符号到 VI 与包装应用，保持视觉语言的一致性，塑造可识别的品牌性格。', tags: ['Logo / VI', '包装设计', '品牌色彩'] },
  { id: '03', icon: 'film', title: '动态叙事', english: 'MOTION & FILM', description: '结合实地拍摄、剪辑与基础动效，让画面在时间中展开，让故事有自己的节奏。', tags: ['Premiere Pro', 'After Effects', 'Final Cut Pro'] },
  { id: '04', icon: 'ai', title: 'AI 创意探索', english: 'AI EXPLORATION', description: '以设计判断引导新的创作方式，探索 AI 在概念构思、视觉发散与风格实验中的可能。', tags: ['概念探索', '视觉实验', '持续学习'] },
];
