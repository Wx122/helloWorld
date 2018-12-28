<template>
  <div>
  <div class="wrap" v-if="step1&&isShow==1">
    <div class="newbie-guide-box-one" v-if="index==1">
      <img src="https://ssl-static.langlib.com/miniprogram/wordbook/newbieguide_01.png" alt="">
      <div class="newbie-guide-btn" @click="confirms">
        我知道了
      </div>
    </div>

    <div class="newbie-guide-box-two" v-if="index==2">
      <img src="https://ssl-static.langlib.com/miniprogram/wordbook/newbieguide_02.png" alt="">
      <div class="newbie-guide-btn" @click="confirms">
        我知道了
      </div>
    </div>

    <div class="newbie-guide-box-three" v-if="index==3">
      <img src="https://ssl-static.langlib.com/miniprogram/wordbook/newbieguide_03.png" alt="">
      <div class="newbie-guide-btn" @click="confirms">
        我知道了
      </div>
    </div>
  </div>
    <div class="wrap" v-if="step5&&isShow==2">
    <div class="newbie-guide-box-four">
      <img src="https://ssl-static.langlib.com/miniprogram/wordbook/newbieguide_04.png" alt="">
      <div class="newbie-guide-btn" @click="confirms">
        我知道了
      </div>
    </div>
    </div>

  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'newbieGuide',
    data () {
      return {
        index: 1,
        step1: wx.getStorageSync('userStatus').newUser.step1,
        step5: wx.getStorageSync('userStatus').newUser.step5
      }
    },
    props: ['isShow'],
    methods: {
      ...mapActions('book', [
        // 'getUserWordBookList',
        'setNewUserStep1ToOld',
        'setNewUserStep5ToOld'
      ]),
      confirms () {
        this.index++
        if (this.index === 4 && this.isShow === 1) {
          this.index = 1
          this.setNewUserStep1ToOld()
          this.step1 = false
        }
        if (this.isShow === 2) {
          this.setNewUserStep5ToOld()
          this.step5 = false
        }
      },
      urls () {
        this.$router.push('/pages/downloadApp/index')
      }
    },
    created () {
      // this.getUserWordBookList()
      // console.log(typeof this.isShow)
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.65);
    position: fixed;
    left: 0;
    top: 0;

    .newbie-guide-box-one,
    .newbie-guide-box-two,
    .newbie-guide-box-three,
    .newbie-guide-box-four{
      width:100vw;
      height: 100vh;
      display: flex;
      flex-direction:column;
      justify-content:space-between;
      align-items:center;
    }
    .newbie-guide-btn {
      width: 232px;
      height: 72px;
      background-color: rgba(65, 65, 65, 0.65);
      border: 4px solid rgba(255, 255, 255, 0.65);
      font-size: 32px;
      text-align: center;
      border-radius: 45px;
      color: #fff;
      line-height: 72px;
    }
    .newbie-guide-box-one{
      img{
        width: 80vw;
        height: 26vh;
        margin-top: 720px;
      }
      .newbie-guide-btn{
        margin-bottom: 42px;
      }
    }
    .newbie-guide-box-two {
      img {
        width: 80vw;
        height: 26vh;
        margin-top: 300px;
      }
      .newbie-guide-btn {
        margin-bottom: 396px;
      }
    }
    .newbie-guide-box-three {
      position: relative;
       img{
         width:100vw;
         height:99vh;
       }
       .newbie-guide-btn{
         position: absolute;
         top:60%;
         left:50%;
         transform: translateX(-50%);
       }
     }
    .newbie-guide-box-four {
      img {
        width:100vw;
        height:26vh;
        margin-top: 280px;
      }
      .newbie-guide-btn{
        margin-bottom: 500px;
      }
    }
  }
</style>
