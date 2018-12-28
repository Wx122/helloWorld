// AppId
const AppID = 'wx316f452dd0549fed'
// const AppID = 'wxb8d95ab92af08314'

// http请求Host
const baseUrl = {
  development: {
    // 测试
    'baseApi': 'https://appwb.langb.cn',
    'loginApi': 'https://proxy.langb.cn'

    // 'baseApi': 'http://192.168.80.170:55244',
    // 'loginApi': 'http://192.168.80.170:55246'
    // 开发
    // 'baseApi': 'https://appwb-dev.langb.cn',
    // 'loginApi': 'https://proxy-dev.langb.cn'
  },
  production: {
    // 生产
    'baseApi': 'https://appwb.langlib.com',
    'loginApi': 'https://proxy.langlib.com'

    // 测试
    // 'baseApi': 'https://appwb.langb.cn',
    // 'loginApi': 'https://proxy.langb.cn'
  }
}

// 加密用的AppSecret
// const AppSecret = 'BF714043-3E66-485B-B1C9-1C3365A60464'
const AppSecret = 'ED4A90AA-78BB-4076-8D0E-2C6D5967C6E8'

// 发送短信类型
const messageSendType = {
  'Login': 1,
  'Register': 2,
  'ResetPassword': 3,
  'BindCellPhone': 4
}

// 用户进入活动详情的来源
const UserSource = {
  1: '自己'
}

// 控制滑动切换轮次的滑动距离
const moveChangeWith = 60
/* 活动Id对应的大师号
* 活动ID：大师号
* */
const qrNumber = {
  1: 1,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 4,
  7: 5,
  8: 6,
  9: 6,
  10: 4,
  11: 5
}
const stepTitle = {
  0: '第一轮：初步印象',
  1: '第二轮：快速背诵',
  2: '第三轮：记忆强化',
  3: '第四轮：用法理解',
  4: '第五轮：浏览复习',
  5: '第六轮：测试成果'
}

const stepTitleP2 = {
  0: '列表背诵',
  1: '选择背诵',
  2: '逐个背诵'
}

const stepTip = {
  0: {
    title: '第一轮 初步印象',
    content: '15 分钟快速浏览，逐一标注单词熟练度',
    isComplete: false
  },
  1: {
    title: '第二轮 快速背诵',
    content: '10 分钟完成重复记忆，本轮只显示 1、2 星单词',
    isComplete: false
  },
  2: {
    title: '第三轮 记忆强化',
    content: '5 分钟完成中文释义选择，本轮只显示 1、 2 星单词',
    isComplete: false
  },
  3: {
    title: '第四轮 用法理解',
    content: '25 分钟完成用法理解，熟悉每个单词的运用',
    isComplete: false
  },
  4: {
    title: '第五轮 浏览复习',
    content: '5 分钟完成全部单词浏览，再次巩固记忆',
    isComplete: false
  },
  5: {
    title: '第六轮 测试成果',
    content: '5 分钟完成中文释义选择，本轮只显示 1、2 星单词',
    isComplete: false
  }
}

const userStatus = {
  newUser: { // 是否新用户  以安装第一次使用为基准
    step1: true, // step1 是否为新手引导 默认是新用户 true
    step5: true // step5 是否为新手引导 默认是新用户 true
  },
  autoPlay: true, // 是否自动播放发音   默认 是自动发音 true
  changeCard: false // 是否自动切换卡片、显示倒计时  默认 不自动切换、显示倒计时 false
}

const phase = { 0: 1, 11: 1, 21: 2 }

const timeBox = {
  0: 9,
  1: 6,
  2: 5,
  3: 15,
  5: 5
}

const timerStatus = {
  stop: 0,
  pause: 1,
  run: 2
}
// 微信号登陆时返回的状态
const okMsg = {
  userInfo: 'getUserInfo:ok'
}
// 活动相关的图片前缀
const activityImgUrl = 'https://ssl-static.langlib.com/miniprogram/wordbook/activity/'
// 活动相关的图片名
const activityImgName = {
  'homePageBgc': 'url(' + activityImgUrl + 'bg_quanpingbeijing.png)', // 活动首页背景图
  // 'jionBtn': `${activityImgUrl}btn_normal.png`// 首页免费参加活动按钮图片
  'jionBtn': 'url(https://ssl-static.langlib.com/miniprogram/wordbook/activity/btn_normal.png)' // 首页免费参加活动按钮图片activityImgName.jionBtn
}
const activityDetailsImg = {
  0: 'url(' + activityImgUrl + 'bg_ac_toutu.png)',
  1: 'url(' + activityImgUrl + 'bg_ac_ditu.png)',
  2: 'url(' + activityImgUrl + 'bg_ac_huodongjiangpin_head.png)',
  3: 'url(' + activityImgUrl + 'bg_ac_nihuihuode_head.png)',
  4: 'url(' + activityImgUrl + 'bg_ac_wangqixueyuan_foot.png)',
  5: 'url(' + activityImgUrl + 'bg_ac_wangqixueyuan_head.png)',
  6: 'url(' + activityImgUrl + 'bg_ac_xunlianneirong_head.png)',
  7: 'url(' + activityImgUrl + 'icon_ac_name1.png)',
  8: 'url(' + activityImgUrl + 'icon_ac_name2.png)',
  9: 'url(' + activityImgUrl + 'icon_ac_name3.png)',
  10: 'url(' + activityImgUrl + 'icon_ac_name4.png)',
  11: 'url(' + activityImgUrl + 'img_ac_cihuishu.png)',
  12: 'url(' + activityImgUrl + 'img_ac_fangfake.png)',
  13: 'url(' + activityImgUrl + 'img_ac_shujutu.png)',
  14: 'url(' + activityImgUrl + 'img_ac_zhenrenjiandu.png)',
  15: 'url(' + activityImgUrl + 'img_ac_zhizhicihuishu.png)',
  16: 'url(' + activityImgUrl + 'bg_ac_baisekuai.png)'
}
// 词汇书Id对应的相应词汇书的图片名
const wordBookImgName = {
  23: {
    'imgName': 'url(' + activityImgUrl + 'bg_siji.png)',
    'bookName': '四级',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_siji.png)',
    'Img': activityImgUrl + 'bg_ac_siji.png'
  },
  25: {
    'imgName': 'url(' + activityImgUrl + 'bg_liuji.png)',
    'bookName': '六级',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_liuji.png)',
    'Img': activityImgUrl + 'bg_ac_liuji.png'
  },
  17: {
    'imgName': 'url(' + activityImgUrl + 'bg_tuofu.png)',
    'bookName': '托福',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_tuofu.png)',
    'Img': activityImgUrl + 'bg_ac_tuofu.png'
  },
  18: {
    'imgName': 'url(' + activityImgUrl + 'bg_yasi.png)',
    'bookName': '雅思',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_yasi.png)',
    'Img': activityImgUrl + 'bg_ac_yasi.png'
  },
  12: {
    'imgName': 'url(' + activityImgUrl + 'bg_gre.png)',
    'bookName': 'GRE',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_gre.png)',
    'Img': activityImgUrl + 'bg_ac_gre.png'
  },
  21: {
    'imgName': 'url(' + activityImgUrl + 'bg_gmat.png)',
    'bookName': 'GMAT',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_gmat.png)',
    'Img': activityImgUrl + 'bg_ac_gmat.png'
  },
  19: {
    'imgName': 'url(' + activityImgUrl + 'bg_sat.png)',
    'bookName': 'SAT',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_sat.png)',
    'Img': activityImgUrl + 'bg_ac_sat.png'
  },
  24: {
    'imgName': 'url(' + activityImgUrl + 'bg_act.png)',
    'bookName': 'ACT',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_act.png)',
    'Img': activityImgUrl + 'bg_ac_act.png'
  },
  28: {
    'imgName': 'url(' + activityImgUrl + 'bg_gaokao.png)',
    'bookName': '高考',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_gaokao.png)',
    'Img': activityImgUrl + 'bg_ac_gaokao.png'
  },
  20: {
    'imgName': 'url(' + activityImgUrl + 'bg_shiyongyingyu.png)',
    'bookName': '实用英语',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_shiyongyingyu.png)',
    'Img': activityImgUrl + 'bg_ac_shiyongyingyu.png'
  }
}
const WordbookActivityImgName = {
  1: {
    'imgName': 'url(' + activityImgUrl + 'bg_siji.png)',
    'bookName': '四级',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_siji.png)',
    'Img': activityImgUrl + 'bg_ac_siji.png'
  },
  2: {
    'imgName': 'url(' + activityImgUrl + 'bg_liuji.png)',
    'bookName': '六级',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_liuji.png)',
    'Img': activityImgUrl + 'bg_ac_liuji.png'
  },
  3: {
    'imgName': 'url(' + activityImgUrl + 'bg_tuofu.png)',
    'bookName': '托福',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_tuofu.png)',
    'Img': activityImgUrl + 'bg_ac_tuofu.png'
  },
  4: {
    'imgName': 'url(' + activityImgUrl + 'bg_yasi.png)',
    'bookName': '雅思',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_yasi.png)',
    'Img': activityImgUrl + 'bg_ac_yasi.png'
  },
  9: {
    'imgName': 'url(' + activityImgUrl + 'bg_gre.png)',
    'bookName': 'GRE',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_gre.png)',
    'Img': activityImgUrl + 'bg_ac_gre.png'
  },
  8: {
    'imgName': 'url(' + activityImgUrl + 'bg_gmat.png)',
    'bookName': 'GMAT',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_gmat.png)',
    'Img': activityImgUrl + 'bg_ac_gmat.png'
  },
  6: {
    'imgName': 'url(' + activityImgUrl + 'bg_sat.png)',
    'bookName': 'SAT',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_sat.png)',
    'Img': activityImgUrl + 'bg_ac_sat.png'
  },
  10: {
    'imgName': 'url(' + activityImgUrl + 'bg_gaokao.png)',
    'bookName': '高考',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_gaokao.png)',
    'Img': activityImgUrl + 'bg_ac_gaokao.png'
  },
  11: {
    'imgName': 'url(' + activityImgUrl + 'bg_tuofu_secondary.png)',
    'bookName': '托福（中学生）',
    'headImg': 'url(' + activityImgUrl + 'bg_ac_shiyongyingyu.png)',
    'Img': activityImgUrl + 'bg_ac_shiyongyingyu.png'
  }
}
// 活动详情页的文案部分
const activityCont = [
  {
    'title': '用朗播定制词汇书背诵，并打卡14天',
    // 'cont': '报名成功后，你会得到朗播定制微信词汇书，并进入打卡群，在真人监督下，坚持打卡即可拿到大奖！',
    'advertising': {
      0: '报名成功后，你会得到朗播定制微信词汇书，并进入打卡群，在真人监督下，坚持打卡即可拿到大奖！',
      1: '往期报名学员，坚持 14 天打卡的学员占到90%以上，词汇量平均涨 1000+。'
    },
    'imgArr': [
      {
        name: '词汇量变化',
        imgName: 'img_ac_shujutu.png'
      }
    ]
  },
  {
    'title': {
      0: '微信定制词汇书',
      1: '1节 《如何背单词方法课》 方法课',
      2: '抱团打卡&真人监督'
    },
    // 'cont': '报名成功后，你会得到朗播定制微信词汇书，并进入打卡群，在真人监督下，坚持打卡即可拿到大奖！',
    'advertising': {
      0: '微信词汇书基于修正后的艾宾浩斯遗忘曲线设计，让你彻底记住每一个单词',
      1: '此节课由朗播 CEO 杜昶旭讲解，深入阐述背单词的正确方法',
      2: '同学互相激励，老师监督打卡，彻底击溃懒惰'
    },
    'imgArr': [
      {
        name: '词汇量变化',
        imgName: 'img_ac_shujutu.png'
      }
    ]
  },
  {
    'title': {
      0: '价值 200 元的纸质定制词汇书'
    },
    // 'cont': '报名成功后，你会得到朗播定制微信词汇书，并进入打卡群，在真人监督下，坚持打卡即可拿到大奖！',
    'advertising': {
      0: '只要坚持打卡14天，即可得到价值 200 元的《玩命背单词》词汇书，词汇书利用大数据挖掘，筛选出了在四六级、托福、雅思、GRE、SAT、ACT词库中，必考的 2000 单词，是现在市面上最好的词汇书籍。'
    },
    'imgArr': [
      {
        name: '词汇量变化',
        imgName: 'img_ac_shujutu.png'
      }
    ]
  },
  {
    0: {
      'name': '其实没有多大事',
      'headImg': 'url(' + activityImgUrl + 'icon_ac_name1.png）',
      'Img': activityImgUrl + 'icon_ac_name1.png',
      'text': '习惯了每天刷单词的感觉，积累下来看阅读的时候，或许我不会写，但是意思却可以猜出来了。每天刷一个小时的词汇，坚持下来真的不错。同学们可以试试，挑战自己。'
    },
    1: {
      'name': 'laboer',
      'headImg': 'url(' + activityImgUrl + 'icon_ac_name2.png）',
      'Img': activityImgUrl + 'icon_ac_name2.png',
      'text': '14 天里，无论怎么忙，都坚持在 11 点之前打卡，单词的安排从一开始觉得有点多到最后慢慢背熟，朗播给了我不一样的背单词方式，感谢朗播老师和同学们的陪伴，接下来我会继续努力。'
    },
    2: {
      'name': '慧暨',
      'headImg': 'url(' + activityImgUrl + 'icon_ac_name3.png）',
      'Img': activityImgUrl + 'icon_ac_name3.png',
      'text': '"如果梦想有捷径的话，那么这条路的名字一定叫做坚持"，第一次接触到朗播，坚持了 14 天，14 天不长不短，带给我更多的是一种坚持的习惯，为了自己的目标，fighting！！'
    },
    3: {
      'name': 'iealous',
      'Img': activityImgUrl + 'icon_ac_name4.png',
      'headImg': 'url(' + activityImgUrl + 'icon_ac_name4.png）',
      'text': '很感谢朗播这个平台，这 14天里，收获了太多，我很庆幸自己坚持下来了，内心的成就感无与伦比，用 14 天养成习惯，用 14 天改变自己，朗播对我的承诺，说到做到了。'
    }
  },
  {
    // 'cont': '报名成功后，你会得到朗播定制微信词汇书，并进入打卡群，在真人监督下，坚持打卡即可拿到大奖！',
    'advertising': {
      0: '习惯了每天刷单词的感觉，积累下来看阅读的时候，或许我不会写，但是意思却可以猜出来了。每天刷一个小时的词汇，坚持下来真的不错。同学们可以试试，挑战自己。',
      1: '14 天里，无论怎么忙，都坚持在 11 点之前打卡，单词的安排从一开始觉得有点多到最后慢慢背熟，朗播给了我不一样的背单词方式，感谢朗播老师和同学们的陪伴，接下来我会继续努力。',
      2: '"如果梦想有捷径的话，那么这条路的名字一定叫做坚持"，第一次接触到朗播，坚持了 14 天，14 天不长不短，带给我更多的是一种坚持的习惯，为了自己的目标，fighting！！',
      3: '很感谢朗播这个平台，这 14 天里，收获了太多，我很庆幸自己坚持下来了，内心的成就感无与伦比，用 14 天养成习惯，用14天改变自己，朗播对我的承诺，说到做到了。'
    },
    'imgArr': [
      {
        name: '词汇量变化',
        imgName: 'url(' + activityImgUrl + 'img_ac_shujutu.png）'
      },
      {}
    ]
  }
]
// 导航图标
const homePageIcon = {
  1: 'icon_huodong_normal.png',
  2: 'icon_huodong_selected.png',
  3: 'icon_cihuishu_normal.png',
  4: 'icon_cihuishu_selected.png',
  5: 'icon_daka_normal.png',
  46: 'icon_daka_selected.png'
}
const booksInfos = {
  '1': {
    wordBookName: '英语六级',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_yxliuji.png',
    wordBookDetail:
      '本书专为备考英语六级的考生编写，完整收录了六级核心大纲词汇，按照单词在历年真题考试中出现的频次从高到低排序，提供与真题难度相当的例句及高质量中文翻译，帮助考生把握重点，加深对单词的理解和记忆。同时在艾宾浩斯记忆曲线基础上优化升级，合理安排新背及复习单元，达到事半功倍的效果。'
  },
  '2': {
    wordBookName: '高考英语',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_gaokao.png',
    wordBookDetail:
      '本书科学收录了高考英语大纲词汇，精选大量实用的经典例句及精确的中文翻译，帮助考生在语境中强化对单词的记忆，深入学习单词。对于高考考生来说，本书有很强的实用性和很高的使用价值。'
  },
  '6': {
    wordBookName: 'IELTS 词汇(旧)',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_lelts.png',
    wordBookDetail:
      '本书全面统计 3150 个雅思考试高频词汇，照频次从高到低进行排序。根据每个单词在考试中出现的词性和意思，给出精准中英文释义、真题原味例句和精准中文翻译，帮助考生把握重点，加深对单词的理解和记忆。全书由易到难循序渐进，充分利用碎片化时间，提高学习效率。'
  },
  '8': {
    wordBookName: 'GMAT 词汇(旧)',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_gmat.png',
    wordBookDetail:
      '本书基于 GMAT 考试，全面收录GMAT考试的 2437 个常考词汇，提供精准的单词释义，并配以大量经典例句，结合语境加深考生对单词的记忆。提供大量真题例句及难度相当的例句，帮助考生记忆单词，熟悉考试难度。'
  },
  '9': {
    wordBookName: 'SAT 词汇(旧)',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_sat.png',
    wordBookDetail:
      '本书以 《官方指南》 为指导，精析历年真题，并结合一线教师丰富的授课和教研经验编写而成。精选 6206 高频核心词汇，帮助考生打下坚实的词汇基础。修正了传统词汇教学中一些错误、有歧义或词不达意的中文释义，帮助考生尽可能减少词义理解偏差。事无巨细地收录了SAT考试考查的重点词义，帮助考生攻克熟词僻义的难关。大量典型例句和丰富的英文释义帮助考生全面掌握、灵活应用单词。'
  },
  '10': {
    wordBookName: 'GRE（句子填空）',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_xingre.png',
    wordBookDetail:
      '本书从将近 20 年的 GRE 句子填空真题中科学统计出2999个高频词汇，按其在考试中出现的频次从高到低排序。本书单词提供中英文释义和例句，其中英文释义均来自《美国传统词典》和GRE官方指定的《韦氏大学词典》，例句均选自历年 GRE 句子填空真题，为考生提供高度仿真语境，并配以高质量的中文翻译，帮助考生更好地理解、学习。'
  },
  '11': {
    wordBookName: 'GRE（阅读理解）',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_xingreyuedulijie.png',
    wordBookDetail:
      '科学统计 20 年 GRE 阅读理解真题词汇，去除了入学英语四级考试大纲中收录的单词，帮助考生避免重复背诵，提高学习效率，提供单词在 GRE 考试中考到的中、英文释义，按照单词在考试中出现的频次从高到低排序，提供与真题难度相当的例句及高质量中文翻译。'
  },
  '12': {
    wordBookName: 'GRE 互联网+',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_gre2.png',
    wordBookDetail:
      '本书中所有单词都选自 GRE 考题，提供中英文释义，并按照单词在考试中出现的频率进行编排，并且提供了与真题难度相当的例句以及高质量的中文翻译，为考生提供与 GRE 考试同等难度的语境，以提高考生复习效率，以便顺利通过 GRE 考试。'
  },
  '13': {
    wordBookName: '英语四级',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_yxsiji.png',
    wordBookDetail:
      '本书专为备考英语四级的考生编写，完整收录了四级核心大纲词汇，按照单词在历年真题考试中出现的频次从高到低排序，提供与真题难度相当的例句及高质量中文翻译，帮助考生把握重点，加深对单词的理解和记忆。同时在艾宾浩斯记忆曲线基础上优化升级，合理安排新背及复习单元，达到事半功倍的效果。'
  },
  '7': {
    wordBookName: '商务英语',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_shangwu.png',
    wordBookDetail:
      '本书以实用、高效、提高学习者词汇量为原则精心编写，旨在为读者提供全面的商务英语词汇储备，提高外贸实战技能。本书对商务高频词汇一一举例，并配以相关的实用例句，为读者提供正确的常用语表述范例，帮助扩大读者的词汇量和知识面。'
  },
  '15': {
    wordBookName: '考研英语',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_laoyan.png',
    wordBookDetail:
      '本书科学收录了考研英语大纲词汇，精选大量实用的经典例句及精确的中文翻译，帮助考生在语境中强化对单词的记忆，深入学习单词。对于考研考生来说，本书有很强的实用性和很高的使用价值。'
  },
  '16': {
    wordBookName: 'TOEFL 互联网+',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_toefl2.png',
    wordBookDetail:
      '《TOEFL互联网+》所有词汇选自托福考试真题，提供其在考试中出现的中英文释义，并按照词汇在考试中出现的频率进行编排，凡是在考试中作为主词出现的单词，书中都提供了与真题难度相当的例句以及高质量的中文翻译，为考生提供与TOFEL考试同等难度的语境，帮助考生提高备考针对性。'
  },
  '17': {
    wordBookName: 'TOEFL词汇',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_toefl.png',
    wordBookDetail:
      '本书科学地统计了托福实际考试中出现的单词，照频次从高到低进行排序。根据每个单词在考试中出现的词性和意思，给出精准中英文释义、真题原味例句和精准中文翻译，帮助考生把握重点，加深对单词的理解和记忆。全书词汇分为 54 个 Task，由易到难循序渐进，充分利用碎片化时间，提高学习效率。'
  },
  '18': {
    wordBookName: 'IELTS词汇',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_lelts.png',
    wordBookDetail:
      '本书全面统计 4500 个雅思考试高频词汇，照频次从高到低进行排序。根据每个单词在考试中出现的词性和意思，给出精准中英文释义、真题原味例句和精准中文翻译，帮助考生把握重点，加深对单词的理解和记忆。全书词汇分为 43 个 Task，由易到难循序渐进，充分利用碎片化时间，提高学习效率。'
  },
  '19': {
    wordBookName: 'SAT词汇',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_sat.png',
    wordBookDetail:
      '本书以《官方指南》为指导，精析历年真题，并结合一线教师丰富的授课和教研经验编写而成。精选 8000 高频核心词汇，帮助考生打下坚实的词汇基础。修正了传统词汇教学中一些错误、有歧义或词不达意的中文释义，帮助考生尽可能减少词义理解偏差。事无巨细地收录了SAT考试考查的重点词义，帮助考生攻克熟词僻义的难关。大量典型例句和丰富的英文释义帮助考生全面掌握、灵活应用单词。'
  },

  '20': {
    wordBookName: '暴走团 1500 词',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_baozoutuan.png',
    wordBookDetail:
      '一本定制词汇书，通过数据挖掘在四六级、考研、托福、雅思、GRE、SAT 词库中，筛选出 1500 个适合所有考试的高频词汇。同时整个词汇书设计在艾宾浩斯记忆曲线记忆算法基础上优化升级，拟合结果简单高效，更适合中国学生记忆单词。'
  },
  '21': {
    wordBookName: 'GMAT 词汇',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_gmat.png',
    wordBookDetail:
      '本书基于 GMAT 考试，全面收录GMAT考试的 3500 个常考词汇，提供精准的单词释义，并配以大量经典例句，结合语境加深考生对单词的记忆。提供大量真题例句及难度相当的例句，帮助考生记忆单词，熟悉考试难度。'
  },
  '24': {
    wordBookName: 'ACT 词汇',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_act.png',
    wordBookDetail:
      '本书根据ACT考试真题、官网指南及官方在线练习，科学收录了ACT考试涉及的6000个重点词汇，精选大量实用的经典例句及精确的中文翻译，帮助考生在语境中强化对单词的记忆，深入学习单词。对于ACT考生来说，本书有很强的实用性和很高的使用价值。'
  },
  '22': {
    wordBookName: 'TOEFL 基础词汇',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_tuoelfjichu.png',
    wordBookDetail:
      '词汇作为语言的“基石”，是进行听、说、读、写等能力训练与提升的基础。因此，解决词汇问题是备考托福重要的任务之一。本书科学收录托福考试会涉及的常用 8000 基础词汇，配以丰富易懂的例句，纯正的美式发音，帮助考生快速拓展词汇量、夯实基础，适用于想要备考托福但词汇基础较薄弱的考生。'
  },
  '23': {
    wordBookName: '四级词汇',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_siji.png',
    wordBookDetail:
      '本书专为备考英语四级的考生编写，完整收录了四级核心大纲词汇，按照单词在历年真题考试中出现的频次从高到低排序，提供与真题难度相当的例句及高质量中文翻译，帮助考生把握重点，加深对单词的理解和记忆。同时在艾宾浩斯记忆曲线基础上优化升级，合理安排新背及复习单元，达到事半功倍的效果。'
  },
  '25': {
    wordBookName: '六级词汇',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_liuji.png',
    wordBookDetail:
      '本书专为备考英语六级的考生编写，完整收录了六级核心大纲词汇，按照单词在历年真题考试中出现的频次从高到低排序，提供与真题难度相当的例句及高质量中文翻译，帮助考生把握重点，加深对单词的理解和记忆。同时在艾宾浩斯记忆曲线基础上优化升级，合理安排新背及复习单元，达到事半功倍的效果。'
  },
  '26': {
    wordBookName: '四级高频 2000 词',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_siji2000.png',
    wordBookDetail:
      '本书专为备考英语四级的考生编写，完整收录了四级核心大纲词汇，按照单词在历年真题考试中出现的频次从高到低排序，提供与真题难度相当的例句及高质量中文翻译，帮助考生把握重点，加深对单词的理解和记忆。同时在艾宾浩斯记忆曲线基础上优化升级，合理安排新背及复习单元，达到事半功倍的效果。'
  },
  '27': {
    wordBookName: '六级高频 2000 词',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_liuji2000.png',
    wordBookDetail:
      '本书专为备考英语六级的考生编写，完整收录了六级核心大纲词汇，按照单词在历年真题考试中出现的频次从高到低排序，提供与真题难度相当的例句及高质量中文翻译，帮助考生把握重点，加深对单词的理解和记忆。同时在艾宾浩斯记忆曲线基础上优化升级，合理安排新背及复习单元，达到事半功倍的效果。'
  },
  '28': {
    wordBookName: '高考 3500 词',
    imgUrl: 'https://ssl-static.langlib.com/miniprogram/wordbook/bg_gaokao.png',
    wordBookDetail:
      '本书科学收录了高考英语大纲词汇，精选大量实用的经典例句及精确的中文翻译，帮助考生在语境中强化对单词的记忆，深入学习单词。对于高考考生来说，本书有很强的实用性和很高的使用价值。'
  }
}

module.exports = {
  AppID,
  AppSecret,
  messageSendType,
  baseUrl,
  UserSource,
  stepTitle,
  stepTitleP2,
  stepTip,
  userStatus,
  phase,
  timeBox,
  timerStatus,
  okMsg,
  activityImgUrl,
  activityImgName,
  wordBookImgName,
  homePageIcon,
  activityDetailsImg,
  activityCont,
  booksInfos,
  qrNumber,
  moveChangeWith,
  WordbookActivityImgName
}
