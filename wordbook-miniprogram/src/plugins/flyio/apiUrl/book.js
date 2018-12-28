const API = {
  'bookUrl.findAllBooks': '/wordBooks/findAllBooks', // 获取已购买和所有词书
  'bookUrl.findUserWordBooks': '/wordBooks/findUserWordBooks', // 用户词汇书列表
  'bookUrl.findTasks': '/wordBooks/{userWordBookID}/findTasks', // 词汇书任务列表
  'bookUrl.findP1Words': '/wordBooks/{userWordBookID}/findP1Words', // P1阶段单词列表
  'bookUrl.updateFamiliarity': '/wordBooks/{userWordBookID}/updateFamiliarity', // 更新单词熟练度
  'bookUrl.updateCurrentTask': '/wordBooks/{userWordBookID}/updateCurrentTask', // 设置当前任务
  'bookUrl.markTaskItemComplete': '/wordBooks/{userWordBookID}/markTaskItemComplete', // 标记List完成
  'bookUrl.updateNote': '/wordBooks/{userWordBookID}/updateNote', // 更新笔记
  'bookUrl.activateP2': '/wordBooks/{userWordBookID}/activateP2', // 激活P2查漏补缺阶段
  'bookUrl.taskStatus': '/wordBooks/{userWordBookID}/taskStatus' // 用户词汇书task的状态
}

export default API
