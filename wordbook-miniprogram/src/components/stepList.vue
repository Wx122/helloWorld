<template>
   <div class="step">
     <div class="step-title">
       <div class="step-current" @click.stop="showTip">
         <p class="picker-p">{{activeTitle}}<i class="iconfont icon-Triangle"></i></p>
       </div>
       <div class="step-total" v-if="activeStepIndex != 4">{{showCurrentIndex}}/{{totalItem}}</div>
     </div>
     <div class="mark" @click="closeTip(false)" v-if="isShow" :class="{'animate-mark-out': isCloseTip, 'animate-mark-in': isShowTip}">
       <div class="mark-content" @click.stop="stopClose" :class="{'animate-mark-content-out': isCloseTip, 'animate-mark-content-in': isShowTip}">
         <div class="list-wrap">
           <div class="list-item" v-for="(item, index) in stepTip" :key="item" @click="changeStep(item, index)">
             <p class="item-text" :class="[{'step-active-f80': index == activeStepIndex }]"> {{item.title}} <i class="iconfont" :class="[item.isComplete ? 'icon-duigou' : 'icon-plannav-next']"></i></p>
           </div>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import {stepTip} from '@/utils/global'
    export default {
      name: 'step-list',
      props: {
        activeStepIndex: {
          type: Number,
          default: 0
        },
        totalItem: {
          type: Number,
          default: 100
        },
        currentIndex: {
          type: Number,
          default: 1
        },
        tipOverSkip: {
          type: Boolean,
          default: false
        }
      },
      computed: {
        showCurrentIndex () {
          return this.tipOverSkip ? this.currentIndex : (this.currentIndex + 1)
        }
      },
      data () {
        return {
          stepTip,
          isShow: false,
          isCloseTip: false,
          isShowTip: false,
          activeTitle: '第一轮 初步印象'
        }
      },
      watch: {
        activeStepIndex () {
          this.activeTitle = this.stepTip[this.activeStepIndex].title
          for (let i in this.stepTip) {
            this.stepTip[i].isComplete = i < this.activeStepIndex
          }
        }
      },
      mounted () {
        this.activeTitle = this.stepTip[this.activeStepIndex].title
        for (let i in this.stepTip) {
          this.stepTip[i].isComplete = i < this.activeStepIndex
        }
      },
      methods: {
        ...mapActions('book', [
          'setOperation'
        ]),
        closeTip (par) {
          this.isCloseTip = true
          this.isShowTip = false
          setTimeout(() => {
            this.isShow = false
            this.setOperation(par)
          }, 200)
        },
        showTip () {
          this.isShow = true
          this.setOperation(true)
          this.isShowTip = true
          this.isCloseTip = false
        },
        stopClose () {},
        changeStep (item, index) {
          this.closeTip(true)
          this.$emit('currentStep', index)
          this.activeTitle = this.stepTip[index].title
          for (let i in this.stepTip) {
            this.stepTip[i].isComplete = i < index
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .step {
    .step-title {
      box-sizing: border-box;
      background-color: #ffffff;
      padding: 12px 0;
      .step-current {
        .picker-p {
          text-align: center;
          font-size: 36px;
          height: 50px;
          color: #333333;
          line-height: 50px;
          .icon-Triangle {
            display: inline-block;
            width: 22px;
            height: 18px;
            line-height: 50px;
            position: relative;
            top: -4px;
            left: 20px;
          }
        }
      }
      .step-total {
        position: absolute;
        right: 5vw;
        top: 12px;
        font-size: 32px;
        height: 32px;
        line-height: 48px;
        color: #999999;
      }
    }

    .mark {
      background: rgba(0, 0, 0, 0.35);
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1001;
      .mark-content {
        width: 100%;
        height: 92vh;
        margin: 8vh 0 0;
        background: #FFFFFF;
        position: absolute;
        transform-origin: 50% 0;
        z-index: 1002;
        &:before {
          content: '';
          border-left: 10px solid transparent;
          border-bottom: 16px solid #ffffff;
          border-right: 10px solid transparent;
          position: absolute;
          top: -14px;
          left: 50%;
          margin-left: -4px;
        }
        .list-wrap {
          margin: 40px 0;
          .list-item {
            width: 94%;
            height: 88px;
            line-height: 88px;
            margin: 0 3%;
            background: #FFFFFF;
            border-bottom: 2px solid #E5E5E5;
            position: relative;
            .item-text {
              font-size: 32px;
              color: #333333;
              text-align: left;
              margin-left: 21px;
              .icon-duigou {
                width: 0;
                height: 0;
                font-size: 28px;
                display: inline-block;
                &:before {
                  position: absolute;
                  width: 34px;
                  height: 24px;
                  right: 40px;
                  top: -4px;
                }
              }
              .icon-plannav-next {
                width: 0;
                height: 0;
                font-size: 28px;
                display: inline-block;
                &:before {
                  position: absolute;
                  width: 17px;
                  height: 30px;
                  right: 40px;
                  top: -4px;
                }
              }
            }
            .step-active-f80 {
              color: #FF8800;
            }
          }

        }
      }
    }
  }
  .animate-mark-content-out {
    animation: out 0.3s linear forwards;
  }
  .animate-mark-content-in {
    animation: in 0.3s linear forwards;
  }
  .animate-mark-out {
    animation: opacityOut 0.3s 0.3s linear forwards;
  }
  .animate-mark-in {
    animation: opacityIn 0.3s linear forwards;
  }
  @keyframes opacityOut {
    0% {
      background: rgba(0, 0, 0, 0.35);
    }
    100% {
      opacity: 0;
      height: 0;
    }
  }
  @keyframes opacityIn {
    0% {
      opacity: 0;
    }
    100% {
      background: rgba(0, 0, 0, 0.35);
      height: 100%;
    }
  }
  @keyframes out{
    0%   {
      transform: scale(1)
    }
    10% {
      transform: scale(0.9)
    }
    15% {
      transform: scale(0.85)
    }
    20% {
      transform: scale(0.8)
    }
    25%  {
      transform: scale(0.75)
    }
    30% {
      transform: scale(0.7)
    }
    35% {
      transform: scale(0.65)
    }
    40% {
      transform: scale(0.6)
    }
    45% {
      transform: scale(0.55)
    }
    50%  {
      transform: scale(0.5)
    }
    55% {
      transform: scale(0.45)
    }
    60% {
      transform: scale(0.4)
    }
    65% {
      transform: scale(0.35)
    }
    70% {
      transform: scale(0.3)
    }
    75%  {
      transform: scale(0.25)
    }
    80% {
      transform: scale(0.2)
    }
    85% {
      transform: scale(0.15)
    }
    90% {
      transform: scale(0.1)
    }
    95% {
      transform: scale(0.05)
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes in {
    0% {
      transform: scale(0);
    }
    10% {
      transform: scale(0.05)
    }
    15% {
      transform: scale(0.1)
    }
    20% {
      transform: scale(0.15)
    }
    25% {
      transform: scale(0.2)
    }
    30% {
      transform: scale(0.25)
    }
    35% {
      transform: scale(0.3)
    }
    40% {
      transform: scale(0.35)
    }
    45% {
      transform: scale(0.4)
    }
    50% {
      transform: scale(0.45)
    }
    55% {
      transform: scale(0.5)
    }
    60% {
      transform: scale(0.55)
    }
    65% {
      transform: scale(0.6)
    }
    70% {
      transform: scale(0.65)
    }
    75% {
      transform: scale(0.7)
    }
    80% {
      transform: scale(0.75)
    }
    85% {
      transform: scale(0.8)
    }
    90% {
      transform: scale(0.85)
    }
    95% {
      transform: scale(0.9)
    }
    100% {
      transform: scale(1)
    }
  }
</style>
