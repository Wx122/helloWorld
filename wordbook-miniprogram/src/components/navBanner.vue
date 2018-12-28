<template>
    <div :class="navBanner">
      <div class="btn1">
        <aut-Button :buttonTitle="buttonArry[0]" :navTourl="navArry[0]" :colorClass="clockArry[0]" @click="checkClass(0)" :iconName="iconArry[0]" @tipStateFn="$emit('tipStateFn')"/>
      </div>
      <div>
        <aut-Button :buttonTitle="buttonArry[1]" :navTourl="navArry[1]" :colorClass="clockArry[1]" @click="checkClass(1)" :iconName="iconArry[1]" @tipStateFn="$emit('tipStateFn')"/>
      </div>
      <div>
        <aut-Button :buttonTitle="buttonArry[2]" :navTourl="navArry[2]" :colorClass="clockArry[2]" @click="checkClass(2)" :iconName="iconArry[2]" @tipStateFn="$emit('tipStateFn')"/>
      </div>

    </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import autButton from '@/components/authorizationButton'
  export default {
    name: 'navBanner',
    data () {
      return {
        navBanner: 'navBanner',
        buttonArry: ['活动', '词汇书', '打卡'],
        navArry: [
          '/pages/home/index',
          '/pages/book/index',
          '/pages/punch/index'
        ],
        clockArry: [
          'clickBtn',
          'jionBtn',
          'jionBtn'
        ],
        iconArry: [
          'icon-home',
          'icon-dibudaohangICON-',
          'icon-daqia'
        ]
      }
    },
    props: {
      selectNumber: {
        type: Number
      }
    },
    components: {
      autButton
    },
    onLoad () {
      this.iphoneSys()
      this.selectBtn()
    },
    methods: {
      ...mapActions('book', [
        'getUserWordBookList'
      ]),
      // iphoneX的兼容处理
      iphoneSys () {
        let phoneBran = wx.getSystemInfoSync()
        // model:"iPhone X"
        if (phoneBran.model.substr(0, 8) === 'iPhone X') {
          this.navBanner = 'navBannerX'
        } else {
          this.navBanner = 'navBanner'
        }
      },
      // 选中的按钮
      async selectBtn () {
        if (parseInt(this.selectNumber, 10) === 1) {
          await this.getUserWordBookList()
        }
        for (let i = 0; i < this.clockArry.length; i++) {
          if (i === this.selectNumber) {
            this.clockArry[i] = 'clickBtn'
          } else {
            this.clockArry[i] = 'jionBtn'
          }
        }
      },
      // 选中状态的按钮
      checkClass (number) {
        for (let i = 0; i < this.clockArry.length; i++) {
          if (i === number) {
            this.clockArry[i] = 'clickBtn'
          } else {
            this.clockArry[i] = 'jionBtn'
          }
        }
      }
    }
  }
</script>

<style scoped>
  .navBanner{
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 98px;
    background-color: #fff;
    border-top: 1px solid #b2b2b2;
    display: flex;
    justify-content: space-around;
  }
  .navBannerX{
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 168px;
    background-color: #fff;
    border-top: 1px solid #b2b2b2;
    display: flex;
    justify-content: space-around;
  }
</style>

