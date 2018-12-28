<template>
  <div class="wrap">
    <stepList @currentStep="currentStep" :tipOverSkip="tipOverSkip.count" :currentIndex="currentIndex" :totalItem="parseInt(list.totalItem, 10)" :activeStepIndex="activeStepIndex"/>

      <step1 v-if="activeStepIndex == 0" @changemove="changeMove" :autoplay="autoplay" :activeStepIndex="activeStepIndex" :current="currentIndex" :item="listItem" :showCountDownTime="showCountDownTime" :isCurrent="activeStepIndex == 0"/>


      <step2 v-if="activeStepIndex == 1" @changemove="changeMove" :autoplay="autoplay" :activeStepIndex="activeStepIndex" :current="currentIndex" :item="listItem" :showCountDownTime="showCountDownTime" :isCurrent="activeStepIndex == 1"/>


      <step3 v-if="activeStepIndex == 2" @changemove="changeMove" :autoplay="autoplay" :activeStepIndex="activeStepIndex" :current="currentIndex" :item="listItem" :showCountDownTime="showCountDownTime" :isCurrent="activeStepIndex == 2"/>

      <step4 v-if="activeStepIndex == 3" @changemove="changeMove" :autoplay="autoplay" :activeStepIndex="activeStepIndex" :current="currentIndex" :item="listItem" :showCountDownTime="showCountDownTime" :isCurrent="activeStepIndex == 3"/>

      <step6 v-if="activeStepIndex == 5" @changemove="changeMove" :autoplay="autoplay" :activeStepIndex="activeStepIndex" :current="currentIndex" :item="listItem" :showCountDownTime="showCountDownTime" :totalItem="list.totalItem" :isCurrent="activeStepIndex == 5"/>


    <step5 v-if="activeStepIndex == 4" @changeStep="changeStep" :list="list.item" :isCurrent="activeStepIndex == 4"/>

    <set-up-note  v-if="activeStepIndex != 4"/>
    <side-drawer v-if="activeStepIndex != 4"/>
    <newbieGuide :isShow="isShowNewUser"/>
    <div class="layer" v-if="tipStart" @click="start">
      <div class="layer-wrap">
        <div class="layer-content" @click.stop="stopCancel">
          <img src="https://ssl-static.langlib.com/miniprogram/wordbook/icon_lunci.png" alt="">
          <div class="layer-title">{{currentStepTip.title}}</div>
          <div class="layer-cont">{{currentStepTip.content}}</div>
          <div class="layer-btn-start" @click.stop="start">开始学习</div>
        </div>
      </div>
    </div>
    <div class="layer" v-if="tipFinish">
      <div class="layer-wrap">
        <div class="layer-content" @click.stop="stopCancel">
          <img src="https://ssl-static.langlib.com/miniprogram/wordbook/icon_gongxi.png" alt="">
          <div class="layer-title">恭喜你</div>
          <div class="layer-cont-finish">已完成 List {{currentList}} 全部六轮背诵</div>
          <div class="layer-btn-start" @click.stop="back">返回列表</div>
        </div>
      </div>
    </div>
    <div class="layer" v-if="tipOverSkip.state">
      <div class="layer-wrap">
        <div class="layer-content" @click.stop="stopCancel">
          <img src="https://ssl-static.langlib.com/miniprogram/wordbook/icon_lunci.png" alt="">
          <div class="layer-title">提示</div>
          <div class="layer-cont">已消灭所有三星以下单词，将为你跳到第四轮</div>
          <div class="layer-btn-start" @click.stop="overSkip">跳过</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import sideDrawer from '@/components/sideDrawer'
  import setUpNote from '@/components/setUpNote'
  import stepList from '@/components/stepList'
  import step1 from '@/components/step1Card'
  import step2 from '@/components/step2Card'
  import step3 from '@/components/step3Card'
  import step4 from '@/components/step4Card'
  import step5 from '@/components/step5'
  import step6 from '@/components/step6Card'
  import newbieGuide from '@/components/newbieGuide'
  import {mapState, mapActions} from 'vuex'
  import { stepTip } from '@/utils/global'
  export default {
    data () {
      return {
        list: {},
        autoplay: false,
        activeStepIndex: 0,
        currentIndex: 0,
        firstCardAnimate: 0,
        currentStepTip: {
          title: '第一轮 初步印象',
          content: '15 分钟快速浏览，逐一标注单词熟练度',
          isComplete: false
        },
        tipStart: true,
        tipFinish: false,
        tipOverSkip: {
          state: false,
          count: false
        },
        currentList: 1,
        isAutoPlayAudio: true,
        cardChangeTimer: null,
        isShowNewUser: 0,
        timerPlayAudio: null
      }
    },
    components: {
      sideDrawer,
      setUpNote,
      stepList,
      step1,
      step2,
      step3,
      step4,
      step5,
      step6,
      newbieGuide
    },
    computed: {
      ...mapState({
        innerAudioContext: state => state.card.innerAudioContext,
        operation: state => state.book.operation
      }),
      listItem () {
        return this.list.item[this.currentIndex]
      }
    },
    watch: {
      operation (val) {
        // 自动切换卡片控制
        let changeCard = wx.getStorageSync('userStatus').changeCard
        val === false && changeCard === true ? this.autoplay = true : this.autoplay = false
        // 自动播放控制
        let autoPlay = wx.getStorageSync('userStatus').autoPlay
        val === false && autoPlay === true ? this.isAutoPlayAudio = true : this.isAutoPlayAudio = false
      }
    },
    async onLoad () {
      this.setOperation(true)
      this.currentIndex = 0
      this.changeCurrent(this.currentIndex)
      this.tipStart = true
      const list = JSON.parse(this.$route.query.list)
      this.currentList = list
      await this.getP1Words({
        userWordBookID: JSON.parse(this.$route.query.userWordBookID),
        unitIdx: this.currentList
      })
      this.list = JSON.parse(wx.getStorageSync('list'))
      this.currentStepTip = stepTip[0]
      this.activeStepIndex = 0
    },
    onShow () {
      if (!this.tipStart) {
        this.setOperation(false)
        this.list = JSON.parse(wx.getStorageSync('list'))
      }
    },
    onHide () {
      this.setOperation(true)
      this.notslide()
    },
    mounted () {
      let changeCard = wx.getStorageSync('userStatus').changeCard
      this.operation === false && changeCard === true ? this.autoplay = true : this.autoplay = false
    },
    methods: {
      ...mapActions('slide', [
        'notslide'
      ]),
      ...mapActions('card', [
        'getP1Words',
        'changeCurrent',
        'changeCurrentStep',
        'playAudio',
        'markTaskItemComplete'
      ]),
      ...mapActions('book', [
        'setOperation'
      ]),
      ...mapActions('task', [
        'taskStatus',
        'markupCompletionList'
      ]),
      changeMove (state) {
        if (this.timerPlayAudio) {
          clearTimeout(this.timerPlayAudio)
        }
        let _currentIndex = this.list.totalItem - 1
        if (parseInt(this.activeStepIndex, 10) === 0) {
          if (this.currentIndex === _currentIndex) {
            if (state === 1) {
              this.changeStep(1)
              return
            } else if (state === -1) {
              this.currentIndex = this.currentIndex - 1
            }
          } else if (this.currentIndex === 0) {
            if (state === -1) {
              this.firstCardAnimate += 1
            } else if (state === 1) {
              this.currentIndex = this.currentIndex + 1
            }
          } else {
            if (state === -1) {
              this.currentIndex = this.currentIndex - 1
            } else if (state === 1) {
              this.currentIndex = this.currentIndex + 1
            }
          }
        } else if (parseInt(this.activeStepIndex, 10) === 5) {
          if (this.currentIndex === _currentIndex) {
            if (state === 1) {
              this.tipFinish = true
              return
            } else if (state === -1) {
              if (this.currentIndex === 0) {
                this.changeStep(-1)
                return
              }
              this.currentIndex = this.currentIndex - 1
            }
          } else if (this.currentIndex === 0) {
            if (state === -1) {
              this.changeStep(-1)
              return
            } else if (state === 1) {
              this.currentIndex = this.currentIndex + 1
            }
          } else {
            if (state === -1) {
              this.currentIndex = this.currentIndex - 1
            } else if (state === 1) {
              this.currentIndex = this.currentIndex + 1
            }
          }
        } else {
          if (this.currentIndex === _currentIndex) {
            if (state === 1) {
              this.changeStep(1)
              return
            } else if (state === -1) {
              if (this.currentIndex === 0) {
                this.changeStep(-1)
                return
              }
              this.currentIndex = this.currentIndex - 1
            }
          } else if (this.currentIndex === 0) {
            if (state === -1) {
              this.changeStep(-1)
              return
            } else if (state === 1) {
              this.currentIndex = this.currentIndex + 1
            }
          } else {
            if (state === -1) {
              this.currentIndex = this.currentIndex - 1
            } else if (state === 1) {
              this.currentIndex = this.currentIndex + 1
            }
          }
        }
        this.changeCurrent(this.currentIndex)
        if (this.isAutoPlayAudio) {
          this.timerPlayAudio = setTimeout(() => {
            this.playAudio()
          }, 800)
        }
        this.list = JSON.parse(wx.getStorageSync('list'))
      },
      currentStep (index) {
        this.setOperation(true)
        this.changeCurrentStep(index)
        this.activeStepIndex = index
        this.list = JSON.parse(wx.getStorageSync('list'))
        if ((parseInt(this.activeStepIndex, 10) === 1 || parseInt(this.activeStepIndex, 10) === 2) && this.list.totalItem === 0) {
          this.tipOverSkip.state = true
          this.tipOverSkip.count = true
          this.currentIndex = 0
          this.list.item[0] = {
            Id: 0,
            WP: '',
            T: 16,
            A: 160,
            WS: '',
            CM: '',
            ENs: [],
            Sens: [],
            C: [],
            F: 0,
            N: ''
          }
        } else if (parseInt(this.activeStepIndex, 10) === 5 && this.list.totalItem === 0) {
          this.tipFinish = true
          this.tipOverSkip.count = true
          this.currentIndex = 0
          this.list.item[0] = {
            Id: 0,
            WP: '',
            T: 16,
            A: 160,
            WS: '',
            CM: '',
            ENs: [],
            Sens: [],
            C: [],
            F: 0,
            N: ''
          }
        } else {
          this.tipStart = true
          this.currentIndex = 0
          this.changeCurrent(this.currentIndex)
          this.currentStepTip = stepTip[this.activeStepIndex]
        }
        if (parseInt(this.activeStepIndex, 10) === 4) {
          this.autoplay = false
        }
      },
      changeStep (state) {
        this.setOperation(true)
        if (state === -1) {
          this.activeStepIndex -= 1
        } else if (state === 1) {
          this.activeStepIndex = parseInt(this.activeStepIndex) + 1
        }
        this.changeCurrentStep(this.activeStepIndex)
        this.list = JSON.parse(wx.getStorageSync('list'))
        if (parseInt(this.activeStepIndex, 10) === 4) {
          this.autoplay = false
        }
        if ((parseInt(this.activeStepIndex, 10) === 1 || parseInt(this.activeStepIndex, 10) === 2) && this.list.totalItem === 0) {
          this.tipOverSkip.state = true
          this.tipOverSkip.count = true
          this.currentIndex = 0
          this.list.item[0] = {
            Id: 0,
            WP: '',
            T: 16,
            A: 160,
            WS: '',
            CM: '',
            ENs: [],
            Sens: [],
            C: [],
            F: 0,
            N: ''
          }
        } else if (parseInt(this.activeStepIndex, 10) === 5 && this.list.totalItem === 0) {
          this.tipFinish = true
          this.tipOverSkip.count = true
          this.currentIndex = 0
          this.list.item[0] = {
            Id: 0,
            WP: '',
            T: 16,
            A: 160,
            WS: '',
            CM: '',
            ENs: [],
            Sens: [],
            C: [],
            F: 0,
            N: ''
          }
        } else {
          this.tipStart = true
          this.currentIndex = 0
          this.changeCurrent(this.currentIndex)
          this.currentStepTip = stepTip[this.activeStepIndex]
        }
      },
      overSkip () {
        this.tipOverSkip.state = false
        this.tipOverSkip.count = false
        this.currentIndex = 0
        this.activeStepIndex = 3
        this.changeCurrent(this.currentIndex)
        this.changeCurrentStep(this.activeStepIndex)
        this.list = JSON.parse(wx.getStorageSync('list'))
        this.currentStepTip = stepTip[this.activeStepIndex]
        this.tipStart = true
      },
      stopCancel () {
      },
      start () {
        this.tipStart = false
        this.setOperation(false)
        let autoPlay = wx.getStorageSync('userStatus').autoPlay
        this.operation === false && autoPlay === true ? this.isAutoPlayAudio = true : this.isAutoPlayAudio = false
        if (this.isAutoPlayAudio && parseInt(this.activeStepIndex, 10) !== 4) {
          this.timerPlayAudio = setTimeout(() => {
            this.playAudio()
          }, 800)
        }
        if (parseInt(this.activeStepIndex, 10) === 0) {
          this.isShowNewUser = 1
        } else if (parseInt(this.activeStepIndex, 10) === 4) {
          this.isShowNewUser = 2
        }
      },
      async back () {
        let currInfo = JSON.parse(wx.getStorageSync('currInfo'))
        if (!currInfo.isComplete) {
          // 标记 list 完成
          await this.markTaskItemComplete({
            userWordBookID: currInfo.userWordBookID,
            UnitIdx: currInfo.currentList,
            RoutineIdx: currInfo.routineIdx
          })
        }
        // 用户词汇书 task 状态
        await this.taskStatus({
          userWordBookID: currInfo.userWordBookID,
          taskNumber: currInfo.taskIdx
        })
        this.markupCompletionList(currInfo.currentList)
        wx.navigateBack({
          delta: 1
        })
        this.tipFinish = false
        this.tipOverSkip.count = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    background-color: #eeeeee;
    /*padding-top: 5vw;*/
  }
  .layer {
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: rgba(0, 0, 0, 0.65);
    left: 0;
    top: 0;
    z-index: 1500;
    .layer-wrap {
      width: 580px;
      /*height: 544px;*/
      margin: 30vh auto 0;
      .layer-content {
        background-color: #fff;
        padding-bottom: 58px;
        /*height: 544px;*/
        /*padding: 40px 20px;*/
        img {
          width: 250px;
          height: 223px;
          margin-top: -95px;
          margin-left: 50%;
          transform: translateX(-50%);
        }
        .layer-title {
          font-weight: bold;
          text-align: center;
          margin: 32px auto 40px;
          font-size: 36px;
          color: #333333;
          line-height: 36px;
        }
        .layer-cont {
          height: 88px;
          width: 482px;
          margin-left: 49px;
          font-size: 32px;
          /*text-align: center;*/
          color: #333333;
          line-height: 44px;
        }
        .layer-cont-finish {
          height: 88px;
          width: 482px;
          margin-left: 49px;
          font-size: 32px;
          text-align: center;
          color: #333333;
          line-height: 44px;
        }
        .layer-btn-start {
          width: 520px;
          height: 88px;
          margin: 74px 30px 0;
          font-size: 32px;
          line-height: 88px;
          background-image: linear-gradient(47deg, #FF9800 0%, #FFAA00 99%);
          box-shadow: 0 1px 16px 0 rgba(236, 141, 0, 0.31);
          border-radius: 100px;
          text-align: center;
          color: #FFFFFF;
        }
      }
    }
  }
</style>
