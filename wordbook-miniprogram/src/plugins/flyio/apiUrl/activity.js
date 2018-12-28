const API = {
  'activity.wordBookActivities': '/wordBookActivity/wordBookActivities', // 首页词汇书列表
  'activity.helpFriendBoost': '/wordBookActivity/{activityID}/helpFriendBoost', // 邀请接口
  'activity.userWordBookActivityDetail': '/wordBookActivity/userWordBookActivityDetail', // 获取词汇书活动详情
  'activity.joinActivity': '/wordBookActivity/{activityID}/joinActivity', // 参加活动接口
  'activity.recordUserBehavior': '/wordBookActivity/{activityID}/recordUserBehavior', // 参加活动行为日志接口
  'activity.recordWxFormID': '/wordBookActivity/recordWxFormID' // 记录formID
}

export default API
