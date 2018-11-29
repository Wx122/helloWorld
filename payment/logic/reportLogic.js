const moment = require('moment');

const TestTypeDefine = require('../../../lbConf/sharedApp/global/testTypeDefine');
const CmTestDefine = require('../../../lbConf/sharedApp/geinus/cmTestDefine');

const reportLogic = {
    getTotalGradeInterval: async (subTest, testType) => {
        const totalGrade = CmTestDefine.calTotalGrade(subTest);
        switch (testType) {
            case TestTypeDefine.TestType.TOEFL: {
                if (totalGrade >= 89 && totalGrade <= 100) {
                    return ' 112~116 分';
                } else if (totalGrade >= 84 && totalGrade < 89) {
                    return ' 106~110 分';
                } else if (totalGrade >= 79 && totalGrade < 84) {
                    return ' 101~105 分';
                } else if (totalGrade >= 74 && totalGrade < 79) {
                    return ' 96~100 分';
                } else if (totalGrade >= 69 && totalGrade < 74) {
                    return ' 91~95 分';
                } else if (totalGrade >= 64 && totalGrade < 69) {
                    return ' 86~91 分';
                } else if (totalGrade >= 59 && totalGrade < 64) {
                    return ' 81~84 分';
                } else if (totalGrade >= 49 && totalGrade < 59) {
                    return ' 73~77 分';
                }
                return ' 70 分以下';
            }
            case TestTypeDefine.TestType.IELTS: {
                if (totalGrade >= 85 && totalGrade <= 100) {
                    return ' 7.5~8.0 分';
                } else if (totalGrade >= 79 && totalGrade < 85) {
                    return ' 7.0~7.5 分';
                } else if (totalGrade >= 75 && totalGrade < 79) {
                    return ' 6.5~7.0 分';
                } else if (totalGrade >= 65 && totalGrade < 75) {
                    return ' 6.0~6.5 分';
                } else if (totalGrade >= 55 && totalGrade < 65) {
                    return ' 5.5~6.0 分';
                } else if (totalGrade >= 49 && totalGrade < 55) {
                    return ' 5.0~5.5 分';
                }

                return ' 5.0 分以下';
            }
            default:
                return '';
        }
    },

    getCompletionScore: async (listening, speaking, reading, writing) => {
        return parseInt(((listening + speaking + reading + writing) / 4).toFixed(2), 10);
    },

    getPlanDelayRatio: async (planDate, dstQuizDate, finishTime, taskRound) => {
        let delayRatio = 0;
        if (taskRound > 1) {
            const consumingDay = moment(finishTime).diff(moment(planDate), 'days') + 1;
            let totalDay = moment(dstQuizDate).diff(moment(planDate), 'days') + 1;
            if (totalDay < 0) {
                totalDay = 0;
            }
            if (totalDay > 0) {
                delayRatio = (consumingDay - (12 * (taskRound - 1))) * 100 / totalDay;
            }
            if (delayRatio < 0) {
                delayRatio = 0;
            } else if (delayRatio > 100) {
                delayRatio = 100;
            }
        }
        return parseInt(delayRatio.toFixed(2), 10);
    },

    getDelayIntroduction: async (delayRatio) => {
        if (delayRatio === 0) {
            return '没有延迟，非常好，下一轮请延续这样的勤奋态度。继续保持这种良好的学习状态，相信你一定会达到自己目标分数。';
        } else if (delayRatio <= 25) {
            return '轻度延迟，下一轮按照系统安排的学习计划练习，你会进步得更快。不要放松懈怠，按照系统安排的学习计划认真做题，你会进步得更快。';
        } else if (delayRatio <= 50) {
            return '中度延迟，下一轮要按照每天 1 个 Task 的进度做题，系统将继续跟踪你的练习情况。为了实现你的目标，要再多付出些努力，下一轮的训练计划要按照每天 1 个 Task 的进度认真做题，系统将继续跟踪你的练习情况。';
        }
        return '重度延迟，下一轮要增加练习强度，务必按照每天 1 个 Task 的进度做题。是时候做出改变，调整学习状态了，下一轮的训练计划要增加练习强度，务必按照每天 1 个 Task 的进度认真做题。';
    },

    getCompletionAnalysis: async (completionScore) => {
        if (completionScore < 60) {
            return '练习完成情况较差，是时候做出改变，调整学习状态了，下一轮要认真做题，练习得分在 85 分以上才有可能实现你的目标备考分数。';
        } else if (completionScore < 75) {
            return '练习完成情况一般，要再多付出些努力，练习得分在 85 分以上才有可能实现你的目标备考分数。';
        } else if (completionScore < 85) {
            return '练习完成情况较好，不要放松懈怠，继续认真做题，你还可以做得更好。';
        }

        return '练习完成情况很好，保持这样的学习状态，相信你一定会达到目标分数。';
    },
};

module.exports = reportLogic;
