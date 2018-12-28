<template>
  <div :class="bigBox">
    <div class="goHomePage" @click="goToHome"></div>
    <div :class="computedClassStr" @click="openShareGuide">
      <button  open-type="share" :class="computedClassStr"></button>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  const peopleNum = {
    0: 'sharebtnNuml',
    1: 'sharebtnNumy'
  }
  export default {
    name: 'inviterBanner',
    props: {
      inviterNumber: {
        type: Number
      },
      navSouce: {
        type: Number
      }
    },
    computed: {
      computedClassStr () {
        return peopleNum[this.inviterNumber]
      }
    },
    onLoad () {
      this.iphoneSys()
      this.numImg = peopleNum[this.inviterNumber]
    },
    data () {
      return {
        bigBox: 'bigBox',
        peopleNumber: 1,
        numImg: 'url(https://ssl-static.langlib.com/miniprogram/wordbook/activity/btn_yaoqing0ren0.png）',
        peopleNum: peopleNum[this.inviterNumber]
      }
    },
    methods: {
      ...mapActions('activity', [
        'recordUserBehavior'
      ]),
      // 判断手机型号
      iphoneSys () {
        let phoneBran = wx.getSystemInfoSync()
        // model:"iPhone X"
        if (phoneBran.model.substr(0, 8) === 'iPhone X') {
          this.bigBox = 'bigBoxX'
        } else {
          this.bigBox = 'bigBox'
        }
      },
      // 分享
      async openShareGuide () {
        let openId = wx.getStorageSync('OpenID')
        let userId = wx.getStorageSync('UserID')
        let bookId = wx.getStorageSync('nowBook')
        await this.recordUserBehavior({
          activityID: bookId,
          UserID: userId,
          BehaviorType: 2,
          WxOpenID: openId
        })
      },
      // 返回首页
      goToHome () {
        wx.reLaunch({
          url: '/pages/home/index'
        })
      }
    }
  }
</script>

<style scoped>
  .bigBox{
    width: 94vw;
    height: 72px;
    padding: 13px 30px;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    border-top: 1px solid #b2b2b2; ;
  }
  .bigBoxX{
    width: 94vw;
    height: 142px;
    padding: 13px 30px;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    border-top: 1px solid #b2b2b2; ;
  }
  .goHomePage{
    width: 155px;
    height: 71px;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/btn_huodonghsouye.png");
    background-size: 155px 71px;
    float: left;
  }
  .sharebtnNuml{
    width: 519px;
    height: 71px;
    float: right;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/btn_yaoqing0ren0.png") no-repeat;
    background-size: 519px 71px;
  }
  .sharebtnNumy{
    width: 519px;
    height: 71px;
    float: right;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/btn_yaoqing1ren0.png") no-repeat;
    background-size: 519px 71px;
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
