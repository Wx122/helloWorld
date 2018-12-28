<template>
  <div class="wrap"
       @touchstart="touchStart"
       @touchmove="touchMove"
       @touchend="touchEnd">
    <div class="card-wrap" @animationstart="animationstart" @animationend="animationend" :class="{'card-wrap-animation-left': isChangeCardLeft, 'card-wrap-animation-right': isChangeCardRight}">
      <div class="card-word">{{item.WP}}</div>
      <div class="card-notation">{{item.WS}}</div>
      <div class="card-example">
        <div class="choise-item"  v-for="(choise, i) in choises" :key="choise" @click="choiseFn(i)"
             :class="{'chose-item-active': (choise.answer == 1) && showAnswer, 'chose-item-error': (choise.answer == 0) && choise.selected}">
          <p>{{choise.value}}</p>
        </div>
      </div>
      <div class="card-rate">
        <rate :tempValue="item.F" :Id="item.Id"/>
      </div>
      <div class="card-timer">
        <p>{{showCountDownTime}}</p>
      </div>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import {mapState} from 'vuex'
    import rate from '@/components/rate'
    export default {
      components: {
        rate
      },
      props: ['item', 'autoplay', 'activeStepIndex', 'current', 'isCurrent'],
      data () {
        return {
          showAnswer: false,
          startX: 0,
          currentChangeWidth: 0,
          isChangeCardLeft: false,
          isChangeCardRight: false,
          timerAnnotation: null,
          timerCountDown: null,
          timerChangeCard: null,
          countDownTime: Vue.iBox.global.timeBox[this.activeStepIndex],
          changeCardState: false
        }
      },
      watch: {
        currentCardIndex (val) {
          if (this.current === val && this.isCurrent) {
            this.showAnswer = false
            if (this.timerAnnotation) {
              clearTimeout(this.timerAnnotation)
            }
            this.timerAnnotation = setTimeout(() => {
              this.showAnnotation = true
              clearTimeout(this.timerAnnotation)
            }, 2000)
            clearInterval(this.timerCountDown)
            this.countDownTime = Vue.iBox.global.timeBox[this.activeStepIndex]
            if (this.autoplay === true) {
              this.autoChangeCard()
            }
          } else {
            this.choises.forEach((item) => {
              item.selected = false
            })
            this.showAnswer = false
          }
        },
        autoplay (val) {
          if (val === true) {
            this.autoChangeCard()
          }
        }
      },
      async onLoad () {
        clearInterval(this.timerCountDown)
        this.countDownTime = Vue.iBox.global.timeBox[this.activeStepIndex]
        this.showAnnotation = false
      },
      computed: {
        ...mapState({
          currentCardIndex: state => state.card.currentCardIndex,
          operation: state => state.book.operation
        }),
        choises () {
          let choise = []
          for (let i = 0; i < 4; i++) {
            if (i === 0) {
              choise.push({answer: 1, value: this.item.C[i]})
            } else {
              choise.push({answer: 0, value: this.item.C[i]})
            }
          }
          choise = Vue.iBox.addIndeterminateChoice(Vue.iBox.addChoiceLetter(Vue.iBox.shuffle(choise)))
          // this.item.choise.forEach((item) => {
          //   result.push(Object.assign({}, item, {'selected': false}))
          // })
          return choise
        },
        showCountDownTime () {
          let changeCard = wx.getStorageSync('userStatus').changeCard
          // 倒计时显示控制
          if (changeCard === true) {
            if (this.countDownTime > 0 && !this.operation) {
              return `背诵倒计时: ${this.countDownTime} 秒`
            } else if (this.countDownTime > 0 && this.operation) {
              clearInterval(this.timerCountDown)
              if (this.autoplay === true) {
                this.autoChangeCard()
              }
              return '定时器暂停'
            }
          } else {
            clearInterval(this.timerCountDown)
            this.countDownTime = Vue.iBox.global.timeBox[this.activeStepIndex]
            return '定时器停止'
          }
        }
      },
      mounted () {
        if (this.current === 0 && this.isCurrent) {
          Vue.iBox.countTime(2, () => {
            this.showAnnotation = true
          })
        }
      },
      methods: {
        choiseFn (i) {
          if (this.showAnswer) {
            return
          }
          this.showAnswer = true
          this.choises[i].selected = true
        },
        touchStart (e) {
          if (this.timerCountDown) {
            clearInterval(this.timerCountDown)
          }
          if (this.timerChangeCard) {
            clearTimeout(this.timerChangeCard)
          }
          if (e.mp !== undefined) {
            this.startX = e.mp.touches[0].clientX
          } else {
            this.startX = e.touches[0].clientX
          }
        },
        touchMove (e) {
          let moveX = 0
          if (e.mp !== undefined) {
            moveX = e.mp.touches[0].clientX
          } else {
            moveX = e.touches[0].clientX
          }
          this.currentChangeWidth = moveX - this.startX
        },
        touchEnd (e) {
          if (!this.changeCardState) {
            if (Math.abs(this.currentChangeWidth) > Vue.iBox.global.moveChangeWith) {
              if (this.currentChangeWidth > 0) {
                this.isChangeCardRight = true
                this.changeCardState = true
                this.timerChangeCard = setTimeout(() => {
                  this.showAnnotation = false
                  clearTimeout(this.timerAnnotation)
                  this.$emit('changemove', -1)
                }, 80)
              } else if (this.currentChangeWidth < 0) {
                this.isChangeCardLeft = true
                this.changeCardState = true
                this.timerChangeCard = setTimeout(() => {
                  this.showAnnotation = false
                  clearTimeout(this.timerAnnotation)
                  this.$emit('changemove', 1)
                }, 80)
              }
              setTimeout(() => {
                this.changeCardState = false
                this.isChangeCardLeft = false
                this.isChangeCardRight = false
                if (this.autoplay === true) {
                  this.autoChangeCard()
                }
              }, 1500)
            } else {
              if (this.autoplay === true) {
                this.autoChangeCard()
              }
            }
          }
          this.startX = 0
          this.currentChangeWidth = 0
        },
        autoChangeCard () {
          // this.isChangeCardLeft = false
          // this.isChangeCardRight = false
          if (this.timerCountDown) {
            clearInterval(this.timerCountDown)
          }
          if (!this.changeCardState) {
            this.timerCountDown = setInterval(() => {
              this.countDownTime = this.countDownTime - 1
              if (this.countDownTime === 0) {
                this.isChangeCardLeft = true
                this.changeCardState = true
                this.timerChangeCard = setTimeout(() => {
                  this.showAnnotation = false
                  clearTimeout(this.timerAnnotation)
                  this.$emit('changemove', 1)
                  this.countDownTime = Vue.iBox.global.timeBox[this.activeStepIndex]
                }, 80)
                setTimeout(() => {
                  this.changeCardState = false
                  this.isChangeCardLeft = false
                  this.isChangeCardRight = false
                  if (this.autoplay === true) {
                    this.autoChangeCard()
                  }
                }, 1500)
                clearInterval(this.timerCountDown)
              }
            }, 1000)
          }
        },
        animationstart (e) {
          // this.changeCardState = true
        },
        animationend (e) {
          // this.changeCardState = false
          //
          // this.isChangeCardLeft = false
          // this.isChangeCardRight = false
          // if (this.autoplay === true) {
          //   this.autoChangeCard()
          // }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .card-title {
    color: #999;
    margin: 15px 0 0;
  }
  .wrap {
    box-sizing: border-box;
    width: 92vw;
    height: 90vh;
    margin: 32px 4vw 0;
    background-color: #fff;
    overflow-x: hidden;
    .card-wrap {
      transform: translateZ(0);
      -webkit-backface-visibility:hidden;
      backface-visibility: hidden;
      -webkit-perspective: 1000;
      perspective: 1000;
      padding: 0 32px;

      .card-word {
        font-size: 64px;
        color: #333333;
        line-height: 64px;
        height: 60px;
        text-align: center;
        font-weight: bold;
        margin: 0 auto;
        padding-top: 25px;
      }

      .card-notation {
        font-size: 32px;
        color: #9B9B9B;
        line-height: 28px;
        height: 40px;
        text-align: center;
        font-weight: normal;
        margin: 32px auto 0;
      }
      .card-example {
        margin-top: 30px;
        .choise-item {
          margin-top: 20px;
          height: 84px;
          background: #FFFFFF;
          border: 2px solid #CCCCCC;
          border-radius: 7px;
          line-height: 84px;
          p {
            font-size: 32px;
            color: #333333;
            margin-left: 30px;
          }
        }
        .chose-item-active {
          background: #FAFFFD;
          border: 2px solid #00C185;
          animation: choiseScale 0.5s linear;
        }
        .chose-item-error {
          background: #FFF9F8;
          border: 2px solid #FF2400;
        }
      }

      .card-rate {
        margin-top: 28px;
        margin-left: 50%;
        transform: translateX(-50%);
      }
      .card-timer {
        font-size: 28px;
        color: #999999;

        p {
          text-align: center;
        }
      }
    }
    .card-wrap-animation-left {
      animation: cardTranslateLeft 0.6s linear 1 forwards;
    }
    .card-wrap-animation-right {
      animation: cardTranslateRight 0.6s linear 1 forwards;
    }
  }
  @keyframes choiseScale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05, 1.02);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes cardTranslateLeft {
    0% {
      transform: translateX(0px);
      opacity: 1;
    }
    40% {
      transform: translateX(-100vw);
      opacity: 1;
    }
    41% {
      opacity: 0;
    }
    60% {
      opacity: 0;
      transform: translateX(100vw);
    }
    61% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: translateX(0vw);
    }
  }
  @keyframes cardTranslateRight {
    0% {
      transform: translateX(0px);
      opacity: 1;
    }
    40% {
      transform: translateX(100vw);
      opacity: 1;
    }
    41% {
      opacity: 0;
    }
    60% {
      opacity: 0;
      transform: translateX(-100vw);
    }
    61% {
      opacity: 1;
    }
    100% {
      transform: translateX(0vw);
      opacity: 1;
    }
  }
</style>
