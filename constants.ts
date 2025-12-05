
import { ArcOption, QuizQuestion, StatType } from './types';

export const STATS_LIST: StatType[] = [
  '专注', '共情', '气场', 
  '欺瞒', '主动', '专业', 
  '活力', '坚毅', '诡秘'
];

export const ANOMALIES: ArcOption[] = [
  { id: 'whisper', name: '低语', type: 'Anomaly', description: '在故事被讲述的同时对其进行编辑的大师。', details: ['能力: 再说一遍？', '能力: 话到嘴边', '能力: 静默'] },
  { id: 'catalog', name: '目录', type: 'Anomaly', description: '精准创造你所需之物，分毫不差。', details: ['能力: 那边是什么？', '能力: 你或许也喜欢...', '能力: 最好的自己'] },
  { id: 'drain', name: '汲取', type: 'Anomaly', description: '以欲望、衰败和逐渐的丧失为食。', details: ['能力: 你还想要更多吗？', '能力: 借用', '能力: 万能受体'] },
  { id: 'clock', name: '时计', type: 'Anomaly', description: '设定着世界的日程，却从不费心使用日历。', details: ['能力: 我们有的是时间', '能力: 超频', '能力: 记否当时'] },
  { id: 'growth', name: '生长', type: 'Anomaly', description: '突变着血肉，以改变未来。', details: ['能力: 我掩护你！', '能力: 肢体', '能力: 眼睛'] },
  { id: 'gun', name: '枪械', type: 'Anomaly', description: '万物的终结。就在此刻。', details: ['能力: 抹除', '能力: 快速拔枪', '能力: 公开携带'] },
  { id: 'dream', name: '梦境', type: 'Anomaly', description: '决定你是否想醒来，然后选择你是否能醒来。', details: ['能力: 噩梦', '能力: 午睡时间', '能力: 实地考察'] },
  { id: 'manifold', name: '流形', type: 'Anomaly', description: '视空间为一种建议，而物理学则是空间那些无聊朋友中的一个。', details: ['能力: 我知道一条近路！', '能力: 继续走...', '能力: 旋转云台'] },
  { id: 'absence', name: '缺位', type: 'Anomaly', description: '凡虚无之处存有之物。', details: ['能力: 没打中！', '能力: 底片', '能力: 无拘'] },
];

export const REALITIES: ArcOption[] = [
  { id: 'caretaker', name: '看护者', type: 'Reality', description: '与一位同行的受照料者之间有着深厚的羁绊。', defaultTrigger: '需要关爱', defaultRelief: '这是你的最爱！' },
  { id: 'overworked', name: '日程过载', type: 'Reality', description: '在凡俗世界中还保留着另一份工作。', defaultTrigger: '工作手机', defaultRelief: '穿针引线' },
  { id: 'stalked', name: '受追猎者', type: 'Reality', description: '正在躲避自己的过去。', defaultTrigger: '踪迹暴露', defaultRelief: '不是我' },
  { id: 'star', name: '明星', type: 'Reality', description: '正在崛起……暂时。', defaultTrigger: '你的头号粉丝', defaultRelief: '尽情享受' },
  { id: 'struggling', name: '挣扎求生', type: 'Reality', description: '进退维谷，四面楚歌。', defaultTrigger: '捉襟见肘', defaultRelief: '一分不多' },
  { id: 'newborn', name: '新生儿', type: 'Reality', description: '初来乍到，对现代生活感到陌生。', defaultTrigger: '仍在学习', defaultRelief: '就像在家一样' },
  { id: 'romantic', name: '浪漫主义', type: 'Reality', description: '尽量让他们一直讨厌这场游戏。', defaultTrigger: '糟糕，对方真迷人', defaultRelief: '没错，我就是这么有魅力' },
  { id: 'pillar', name: '支柱', type: 'Reality', description: '掌管着一个由数名忠诚成员组成的组织。', defaultTrigger: '无尽的责任', defaultRelief: '这是我的名片' },
  { id: 'outlier', name: '异类', type: 'Reality', description: '你们好啊，人类同胞们？', defaultTrigger: '是的，就现在', defaultRelief: '天衣无缝' },
];

export const COMPETENCIES: ArcOption[] = [
  { 
    id: 'pr', name: '公关', type: 'Competency', description: '请勿再发展任何私人关系。', details: ['初始申领物: 新闻稿印刷机'],
    primeDirective: '行事须光明磊落。每撒谎一次，记1次申诫。',
    authorizedActivities: ['制造干扰', '给出一个绝佳的借口', '确保他们再也不会提及此事']
  },
  { 
    id: 'rd', name: '研发', type: 'Competency', description: '给人们他们想要的。', details: ['初始申领物: 橡皮鸭'],
    primeDirective: '推陈出新。每当你重复做同一件事时，记1次申诫。',
    authorizedActivities: ['揭示某人真正的需求', '重新发明轮子', '改变某人的人生。永久地']
  },
  { 
    id: 'barista', name: '咖啡师', type: 'Competency', description: '上菜了！', details: ['初始申领物: 三倍浓缩杯'],
    primeDirective: '保持气氛新鲜。每当你正确地说出某人的名字时，记1次申诫。',
    authorizedActivities: ['让某人感到宾至如归', '炫耀你的专业知识', '让血液流动起来']
  },
  { 
    id: 'ceo', name: '首席执行官', type: 'Competency', description: '大权在握的感觉真好。', details: ['初始申领物: 报销账户'],
    primeDirective: '维持等级制度。每当你接受命令时，记1次申诫。',
    authorizedActivities: ['让某人按你的意愿行事', '享受生活中的一件雅事', '做出必要的牺牲']
  },
  { 
    id: 'intern', name: '实习生', type: 'Competency', description: '薪水被高估了。', details: ['初始申领物: 继承来的名牌'],
    primeDirective: '要不是事情重要，他们也不会来找我。每当你拒绝一项请求时，记1次申诫。',
    authorizedActivities: ['自信地失败', '为他人利益而让自己出糗', '让某事戛然而止']
  },
  { 
    id: 'gravedigger', name: '掘墓人', type: 'Competency', description: '总得有人来做。', details: ['初始申领物: 德古拉的棺材'],
    primeDirective: '别弄脏无辜的双手。每当你触碰活物时，记1次申诫。',
    authorizedActivities: ['掘地揭秘', '收拾烂摊子', '埋葬一个问题']
  },
  { 
    id: 'reception', name: '接待处', type: 'Competency', description: '这边请。', details: ['初始申领物: 莫比乌斯环路电视'],
    primeDirective: '时刻保持警惕。每当你坐下(或留下未回答的问题)时，记1次申诫。',
    authorizedActivities: ['审问某人', '征用财物', '永远地关上一扇门']
  },
  { 
    id: 'hotline', name: '热线', type: 'Competency', description: '另一端的声音。', details: ['初始申领物: 等候音乐，第一辑'],
    primeDirective: '绝不说“不幸的是”。每当你传达坏消息时，记1次申诫。',
    authorizedActivities: ['帮助某人倾诉心声', '为你未做之事承担罪责', '将某人引向一个意想不到的命运']
  },
  { 
    id: 'clown', name: '小丑', type: 'Competency', description: '叭！', details: ['初始申领物: 愚人帽'],
    primeDirective: '逗他们笑。每当你谈论感受时，记1次申诫。',
    authorizedActivities: ['上演一出好戏', '揭露一个令人难堪的真相', '强求一个微笑']
  },
];

export const COMPETENCY_QUIZZES: Record<string, QuizQuestion[]> = {
  'pr': [
    {
      question: "当同事在公共场合出糗时，我……",
      options: [
        { text: "大声说“多么先锋啊！”", bonusStat: '气场', bonusAmount: 3 },
        { text: "重复他们的行为，直到看起来正常为止。", bonusStat: '坚毅', bonusAmount: 3 }
      ]
    },
    {
      question: "当我们的某款产品造成严重悲剧时，我的宣传口径……",
      options: [
        { text: "传达我们的悔意。", bonusStat: '欺瞒', bonusAmount: 3 },
        { text: "解释这也同样伤害了我们。", bonusStat: '共情', bonusAmount: 3 }
      ]
    },
    {
      question: "一位同事被谋杀了！我是……",
      options: [
        { text: "凶手。", bonusStat: '主动', bonusAmount: 3 },
        { text: "该升职了。", bonusStat: '诡秘', bonusAmount: 3 }
      ]
    }
  ],
  'rd': [
    {
      question: "如果一开始没成功……",
      options: [
        { text: "绝不让他们看见你哭。", bonusStat: '专业', bonusAmount: 3 },
        { text: "试了又试，试了又试，试了又试。", bonusStat: '坚毅', bonusAmount: 3 }
      ]
    },
    {
      question: "当我解方程时，如果结论看起来不可能，我会……",
      options: [
        { text: "提醒自己犯错是人之常情。", bonusStat: '共情', bonusAmount: 3 },
        { text: "排除所有其他可能性。", bonusStat: '活力', bonusAmount: 3 }
      ]
    },
    {
      question: "我被陷害了！我通过……来为自己辩护。",
      options: [
        { text: "销毁所有罪证。", bonusStat: '诡秘', bonusAmount: 3 },
        { text: "找一个更像样的嫌疑人当替罪羊。", bonusStat: '专注', bonusAmount: 3 }
      ]
    }
  ],
  'barista': [
    {
      question: "一位同事因为分手请求我代班。我……",
      options: [
        { text: "帮他们代班。", bonusStat: '共情', bonusAmount: 3 },
        { text: "让他们复合。", bonusStat: '专业', bonusAmount: 3 }
      ]
    },
    {
      question: "一个陌生人偷了别人的饮料！我通过……来处理。",
      options: [
        { text: "假装我没注意到。", bonusStat: '欺瞒', bonusAmount: 3 },
        { text: "提前把每种饮料都做两份。", bonusStat: '主动', bonusAmount: 3 }
      ]
    },
    {
      question: "一位顾客投诉了我的服务。我更可能会……",
      options: [
        { text: "往特调里加点料。", bonusStat: '诡秘', bonusAmount: 3 },
        { text: "把他也加进特调里。", bonusStat: '活力', bonusAmount: 3 }
      ]
    }
  ],
  'ceo': [
    {
      question: "我的管理风格最好被描述为……",
      options: [
        { text: "亲力亲为。", bonusStat: '活力', bonusAmount: 3 },
        { text: "把员工当家人对待。", bonusStat: '欺瞒', bonusAmount: 3 }
      ]
    },
    {
      question: "我用我的……来激励团队。",
      options: [
        { text: "油画肖像。", bonusStat: '气场', bonusAmount: 3 },
        { text: "自动的“外出办公”回复。", bonusStat: '专业', bonusAmount: 3 }
      ]
    },
    {
      question: "当裁员不可避免时，我会解雇那个……的员工。",
      options: [
        { text: "最常迟到的。", bonusStat: '专注', bonusAmount: 3 },
        { text: "今天迟到的。", bonusStat: '主动', bonusAmount: 3 }
      ]
    }
  ],
  'intern': [
    {
      question: "学习新技能时，我是……",
      options: [
        { text: "视觉型学习者。", bonusStat: '专注', bonusAmount: 3 },
        { text: "吃一堑长一智型学习者。", bonusStat: '坚毅', bonusAmount: 3 }
      ]
    },
    {
      question: "我突然继承了一大笔遗产。我一定会……",
      options: [
        { text: "为了共同利益，将其投资给机构。", bonusStat: '主动', bonusAmount: 3 },
        { text: "将其捐给有需要的机构分部。", bonusStat: '共情', bonusAmount: 3 }
      ]
    },
    {
      question: "我的直属上司一直在秘密犯下重罪！我……",
      options: [
        { text: "修改他们的日程表来制造有力的不在场证明。", bonusStat: '诡秘', bonusAmount: 3 },
        { text: "为他们的罪行自首。", bonusStat: '气场', bonusAmount: 3 }
      ]
    }
  ],
  'gravedigger': [
    {
      question: "在培训我所在领域的新员工时，我强调……",
      options: [
        { text: "铲子技术。", bonusStat: '专注', bonusAmount: 3 },
        { text: "创造需求。", bonusStat: '主动', bonusAmount: 3 }
      ]
    },
    {
      question: "我负责季度收益报告。为确保给股东留下好印象，我……",
      options: [
        { text: "重复演示，直到得到我期望的回应。", bonusStat: '坚毅', bonusAmount: 3 },
        { text: "用积极的能量掩盖糟糕的数字。", bonusStat: '气场', bonusAmount: 3 }
      ]
    },
    {
      question: "我通过……来处理我对人类无尽痛苦的超常认知。",
      options: [
        { text: "享受茶香和其他微小的乐趣。", bonusStat: '诡秘', bonusAmount: 3 },
        { text: "培养对人类无尽欢乐的超常认知来与之匹配。", bonusStat: '专业', bonusAmount: 3 }
      ]
    }
  ],
  'reception': [
    {
      question: "一位共事四年的同事从未记住我的名字。我……",
      options: [
        { text: "清晰而大声地自我介绍，直到他们明白为止。", bonusStat: '气场', bonusAmount: 3 },
        { text: "忘了他们的名字。", bonusStat: '欺瞒', bonusAmount: 3 }
      ]
    },
    {
      question: "有人并非其声称的身份。我通过……来核实其身份。",
      options: [
        { text: "审问他们。", bonusStat: '坚毅', bonusAmount: 3 },
        { text: "审问他们。(物理)", bonusStat: '活力', bonusAmount: 3 }
      ]
    },
    {
      question: "一名罪犯正在闯入我所在的、因火灾而疏散的大楼。我……",
      options: [
        { text: "确保火灾不被打断。", bonusStat: '专业', bonusAmount: 3 },
        { text: "将他们视为急救人员并放行。", bonusStat: '专注', bonusAmount: 3 }
      ]
    }
  ],
  'hotline': [
    {
      question: "一位顾客遇到了一个我在自己生活中也无法解决的问题。我……",
      options: [
        { text: "分享那些失败了的方法，以节省他们的时间。", bonusStat: '共情', bonusAmount: 3 },
        { text: "向他们保证我们能一起找到解决方案。", bonusStat: '欺瞒', bonusAmount: 3 }
      ]
    },
    {
      question: "一位顾客有一个坏掉的产品和一个令人信服的故事。我……",
      options: [
        { text: "动用一切必要关系来为他们退款。", bonusStat: '坚毅', bonusAmount: 3 },
        { text: "明确表示，售出概不退换。", bonusStat: '活力', bonusAmount: 3 }
      ]
    },
    {
      question: "一位顾客的电话断线了。我……",
      options: [
        { text: "给他们回电，并向信息技术部提交一份错误报告。", bonusStat: '专业', bonusAmount: 3 },
        { text: "在他们不在的情况下完成通话。", bonusStat: '气场', bonusAmount: 3 }
      ]
    }
  ],
  'clown': [
    {
      question: "当我抓到一个偷我气球动物的小偷时，我……",
      options: [
        { text: "教他们自己做。", bonusStat: '共情', bonusAmount: 3 },
        { text: "让他们知道，我能打结成新奇形状的可不只有气球。", bonusStat: '活力', bonusAmount: 3 }
      ]
    },
    {
      question: "我的车能坐……",
      options: [
        { text: "正常数量的人。", bonusStat: '欺瞒', bonusAmount: 3 },
        { text: "所有需要搭车的人。", bonusStat: '坚毅', bonusAmount: 3 }
      ]
    },
    {
      question: "完成这个句子：“但是医生……”",
      options: [
        { text: "我就是医生！", bonusStat: '气场', bonusAmount: 3 },
        { text: "我见过丑角帕格里亚奇的下场。那混沌。那屠杀。我希望能得到更有效的医疗处方。", bonusStat: '专业', bonusAmount: 3 }
      ]
    }
  ],
  'default': [
    {
        question: "默认问题 1",
        options: [{text: "选项 A", bonusStat: "专注", bonusAmount: 3}, {text: "选项 B", bonusStat: "活力", bonusAmount: 3}]
    },
    {
        question: "默认问题 2",
        options: [{text: "选项 A", bonusStat: "共情", bonusAmount: 3}, {text: "选项 B", bonusStat: "坚毅", bonusAmount: 3}]
    },
    {
        question: "默认问题 3",
        options: [{text: "选项 A", bonusStat: "气场", bonusAmount: 3}, {text: "选项 B", bonusStat: "诡秘", bonusAmount: 3}]
    }
  ]
};
