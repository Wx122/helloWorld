<template>
<div class="redBox">
  <div class="congratulateImg">
    <div class="jionBtn" @click="joinTeacher"></div>
    <div class="popMoon" v-if="isShow">
      <div class="pop">
        <div class="popIcon"></div>
        <div class="popText">下个页面回复暗号"{{teacherNum}}" 获取大师二维码</div>
        <div ><button open-type="contact" class="popButton" :session-from="activeId"></button></div>
      </div>
      <div class="close" @click="closePop"></div>
    </div>
  </div>
</div>
</template>

<script>
  import { mapActions } from 'vuex'
  import {qrNumber} from '@/utils/global'
  export default {
    name: 'friend',
    components: {
    },
    onLoad: function (options) {
      console.log(options, '助力成功页面的弹窗链接数据')
      let bookNumCall = options.activeId
      this.teacherNum = qrNumber[bookNumCall]
      this.activeId = options.activeId
    },
    onShow () {
      this.isShow = false
    },
    data () {
      return {
        isShow: false,
        teacherNumber: 1,
        activeId: '',
        teacherNum: ''
      }
    },
    methods: {
      ...mapActions('activity', [
        'recordUserBehavior'
      ]),
      async joinTeacher () {
        this.isShow = true
        let openId = wx.getStorageSync('OpenID')
        let userId = wx.getStorageSync('UserID')
        await this.recordUserBehavior({
          activityID: this.activeId,
          UserID: userId,
          BehaviorType: 3,
          WxOpenID: openId
        })
      },
      closePop () {
        this.isShow = false
      }

    }
  }
</script>

<style scoped>
  .redBox{
    width: 100vw;
    height: 100vh;
    background-color: #f34719;
  }
.congratulateImg{
  width: 100vw;
  height: 12vw;
  padding-top: 128vw;
  background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/img_ruqunbeijing.png") no-repeat;
  background-size: 100vw 140vw;
}
  .jionBtn{
    width: 494px;
    height: 80px;
    margin: 0 auto;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/btn_wyaoruqun.png");
    background-size: 494px 80px;
  }
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
  height: 231px;
  margin: 0 auto;
  padding-top: 173px;
  background-color: #fff;
  border-color: #fff;
  border-radius: 16px;
  position: relative;
}
.popText{
  width: 352px;
  height: 79px;
  line-height: 32px;
  margin: 0 auto;
  font-size: 32px;
  text-align: center;
}
.popIcon{
  width: 369px;
  height: 323px;
  margin: 0 auto;
  margin-top: -130px;
  background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/icon_tc_ruqun.png");
  background-size: 369px 323px;
  position: absolute;
  top: -60px;
  left: 105px;
}
.popButton{
  width: 187px;
  height: 73px;
  border-radius: 20px;
  margin: 0 auto;
  margin-top: 51px;
  background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/btn_zhidaole.png");
  background-size: 187px 73px;
}
.close{
  width: 110px;
  height: 110px;
  margin: 170px auto 0;
  background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/btn_tc_guanbi.png");
  background-size: 110px 110px;
}
</style>
