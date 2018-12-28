<template>
    <div class="popMoon" v-if="popShow">
      <div class="pop">
        <div :class="bgcImg"></div>
        <div class="popText">{{helpMessage}}</div>
        <div class="popButton" @click="goHomepage"></div>
      </div>
      <div class="close" @click="closePop" v-if="helePeople"></div>
      <div class="close" @click="goHomepage" v-if="!helePeople"></div>
    </div>
</template>

<script>
  export default {
    name: 'helpPop',
    props: {
      helePeople: {
        type: String
      },
      helpMessage: {
        type: String
      },
      bgcImg: {
        type: String
      }
    },
    data () {
      return {
        popShow: true
      }
    },
    methods: {
      closePop () {
        this.popShow = false
      },
      goHomepage () {
        wx.reLaunch({
          url: '/pages/home/index'
        })
      }
    }
  }
</script>

<style scoped>
.popMoon{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 400px;
  background-color: rgba(0, 0, 0, 0.5);
}
.pop{
    width: 580px;
    height: 195px;
    margin: 0 auto;
    padding-top: 173px;
    background-color: #fff;
    border-color: #fff;
    border-radius: 16px;
    position: relative;
  }
.popText{
  width: 580px;
  height: 32px;
  font-size: 32px;
  text-align: center;
}
.isHelp{
  width: 369px;
  height: 323px;
  margin: 0 auto;
  margin-top: -130px;
  background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/icon_tc_chenggong.png") no-repeat;
  background-size: 369px 323px;
  position: absolute;
  top: -60px;
  left: 105px;
}
.noHelp{
  width: 369px;
  height: 323px;
  margin: 0 auto;
  margin-top: -130px;
  background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/icon_hp_yizhuli.png") no-repeat;
  background-size: 369px 323px;
  position: absolute;
  top: -60px;
  left: 105px;
}
  .popButton{
    width: 289px;
    height: 73px;
    border-radius: 20px;
    margin: 0 auto;
    margin-top: 51px;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/btn_mianfeiling.png") no-repeat;
    background-size: 289px 73px;
  }
  .close{
    width: 110px;
    height: 110px;
    margin: 170px auto 0;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/btn_tc_guanbi.png") no-repeat;
    background-size: 110px 110px;
  }
/*删除button默认的边框*/
button::after{ border: none; }
.iconfont{
  font-family:"iconfont" !important;
  font-size:30px;
  font-style:normal;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  float:right;
  margin-right:24px;
  color: #0bb20c;
}
</style>
