<template>
  <div class="wrap"
       @touchstart="touchStart"
       @touchmove="touchMove"
       @touchend="touchEnd">
    <div class="card-wrap" @animationstart="animationstart" @animationend="animationend" :class="{'card-wrap-animation-left': isChangeCardLeft, 'card-wrap-animation-right': isChangeCardRight}">
      <div class="card-word">{{item.WP}}</div>
      <div class="card-notation">{{item.WS}}</div>
      <div class="card-word-annotation"><span  v-if="showAnnotation">{{item.CM}}</span></div>
      <div class="example-rate-timer">
        <div class="card-example" v-if="!!(item.ENs.length) || !!(item.Sens.length) || !!(item.N)">
          <div class="card-Interpretation" v-if="!!(item.ENs.length)">
            <div class="card-title">英释</div>
            <div v-for="(ENs, index2) in item.ENs" :key="index2">
              <p>{{!!(item.ENs) ? ENs.EM : ''}}</p>
            </div>
          </div>
          <div class="card-exampleSentence" v-if="!!(item.Sens.length)">
            <div class="card-title">例句</div>
            <div v-for="(sen, index3) in item.Sens" :key="index3">
              <p>{{!!(item.Sens) ? sen.ES : ''}}</p>
              <p>{{!!(item.Sens) ? sen.CS : ''}}</p>
            </div>
          </div>
          <div class="card-note" v-if="!!(item.N)">
            <div class="card-title">笔记</div>
            <p>{{item.N}}</p>
          </div>
        </div>
        <div class="card-rate-timer">
          <div class="card-rate">
            <rate :tempValue="item.F" :Id="item.Id"/>
          </div>
          <div class="card-timer">
            <p>{{showCountDownTime}}</p>
          </div>
        </div>
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
          showAnnotation: false,
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
    font-size: 28px;
    color: #999999;
    line-height: 28px;
    margin: 20px 0 12px;
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
      position: relative;
      .card-word {
        font-size: 64px;
        color: #333333;
        line-height: 64px;
        height: 60px;
        text-align: center;
        font-weight: bold;
        margin: 0 auto;
        padding-top: 30px;
      }

      .card-notation {
        font-size: 32px;
        color: #9B9B9B;
        line-height: 28px;
        height: 40px;
        text-align: center;
        font-weight: normal;
        margin: 20px auto 0;
      }

      .card-word-annotation {
        margin-top: 32px;
        font-size: 32px;
        color: #333333;
        line-height: 32px;
        text-align: center;
        span {
          display: inline-block;
          margin: 0 auto;
          text-align: justify;
        }

      }
      .example-rate-timer {
        position: absolute;
        top: 280px;
        left: 50%;
        transform: translateX(-50%);
        width: 92vw;
        .card-example {
          margin: 0 4vw;
          border-top: 1px dashed #CCCCCC;
          height: 430px;
          overflow-y: scroll;

          p {
            font-size: 32px;
            color: #333333;
            line-height: 50px;
          }
        }

        .card-rate-timer {
          position: absolute;
          top: 430px;
          left: 50%;
          transform: translateX(-50%);
          .card-rate {
            margin-top: 35px;
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
      }
    }
    .card-wrap-animation-left {
      animation: cardTranslateLeft 0.6s linear 1 forwards;
    }
    .card-wrap-animation-right {
      animation: cardTranslateRight 0.6s linear 1 forwards;
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
