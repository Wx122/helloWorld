<template>
  <movable-area class="waiceng">
        <movable-view class="masterBox" direction="vertical"  :inertia="inertia">
          <div class="headerImgBox">
            <img :src="headPage" alt="">
          </div>
          <div class="bottomContentBox">
            <div class="box"></div>
            <!--宣传语1-->
            <div class="contentBox">
              <div class="title">
                <div class="point"></div>
                <div class="titleText">{{activityCont[0].title}}</div>
              </div>
              <div class="Advertising">{{activityCont[0].advertising[0]}}</div>
              <div class="chatImg">
                <div class="showText">{{activityCont[0].imgArr[0].name}}</div>
                <div class="chatImgBox"></div>
              </div>
              <div class="Advertising">{{activityCont[0].advertising[1]}}</div>
            </div>
            <div class="box1"></div>
            <!--宣传语2-->
            <div class="contentBox">
              <div class="title">
                <div class="point"></div>
                <div class="titleText">1本【{{bookName}}】{{activityCont[1].title[0]}}</div>
              </div>
              <div class="Advertising">{{bookName}}{{activityCont[1].advertising[0]}}</div>
              <div class="chatImg">
                <div class="chatImgBox_1 boxCord"></div>
              </div>
              <div class="title">
                <div class="point"></div>
                <div class="titleText">{{activityCont[1].title[1]}}</div>
              </div>
              <div class="Advertising">{{activityCont[1].advertising[1]}}</div>
              <div class="chatImg">
                <div class="chatImgBox_2"></div>
              </div>
              <div class="title">
                <div class="point"></div>
                <div class="titleText">{{activityCont[1].title[2]}}</div>
              </div>
              <div class="Advertising">{{activityCont[1].advertising[2]}}</div>
              <div class="chatImg">
                <div class="chatImgBox_3"></div>
              </div>
            </div>
            <div class="box2" ></div>
            <!--宣传语3-->
            <div class="contentBox">
              <div class="title">
                <div class="point"></div>
                <div class="titleText">{{activityCont[2].title[0]}}</div>
              </div>
              <div class="Advertising">{{activityCont[2].advertising[0]}}</div>
              <div class="chatImg">
                <div class="chatImgBox_1 boxPage"></div>
              </div>
            </div>
            <div class="box3"></div>
            <!--宣传语4-->
            <div class="contentBox">
              <div class="userSpack">
                <div class="user" v-for="(item,index) in activityCont[3]" :key="index">
                  <div class="userTitle delPadTop">
                    <div class="headerpoint">
                      <img :src="item.Img" alt="">
                    </div>
                    <div class="titleText">{{item.name}}</div>
                  </div>
                  <div class="Advertising">{{item.text}}</div>
                </div>
              </div>
            </div>
            <div class="box4"></div>
          </div>
        </movable-view>
    <div>
      <nav-Banner :inviterNumber="peopleNumber" :navSouce="navSouce"></nav-Banner>
    </div>
    <div v-if="showTost">
      <help-pop :helpMessage="showTostTesx" :bgcImg="helpImg" :helePeople="isHelp"></help-pop>
    </div>
  </movable-area>
</template>

<script>
  import { mapActions } from 'vuex'
  import {activityCont, wordBookImgName, AppID} from '@/utils/global.js'
  import navBanner from '@/components/inviterBanner'
  import helpPop from '@/components/helpPop'

  const BoostAmount = 1
  const peopleNum = {
    0: 'url(https://ssl-static.langlib.com/miniprogram/wordbook/activity/btn_yaoqing0ren1.png）',
    1: 'url(https://ssl-static.langlib.com/miniprogram/wordbook/activity/btn_yaoqing1ren2.png）'
  }
  export default {
    name: 'master',
    components: {
      navBanner,
      helpPop
    },
    onLoad: function (options) {
      // options.master=2代表是助力链接进来的 为1的时候代表是从页面点击按钮参见活动进入的
      this.activityDetails(options)
      this.navSouce = options
      this.getHeadImg(options)
      this.isOpenId()
    },
    onShareAppMessage (res) {
      let shareText = '加入单词训练营，抱团打卡14天，词汇量暴涨'
      return {
        title: shareText,
        path: this.shareUrl,
        // path: '/pages/home/index',
        imageUrl: this.shareImg
      }
    },
    data () {
      return {
        activityCont: activityCont,
        bookName: '',
        bookHeadImg: '',
        peopleNumber: 0,
        // 是否是助力情况
        showTost: false,
        showTostTesx: '',
        // 助力状态图片
        helpImg: '',
        navSouce: {},
        // 已经有的助力人数
        boostAmount: BoostAmount,
        // 分享功能带的图片
        shareImg: 'https://ssl-static.langlib.com/miniprogram/wordbook/activity/img_fenxiang_toutu.png',
        // 分享的返回地址
        shareUrl: '',
        peopleNum: peopleNum,
        wordBookImgName: wordBookImgName,
        headPage: '',
        inertia: true,
        isHelp: true
      }
    },
    onHide () {
      this.showTost = false
    },
    methods: {
      ...mapActions('login', [
        'loginByCode',
        'loginByWxCode'
      ]),
      ...mapActions('activity', [
        'helpFriendBoost',
        'userWordBookActivityDetail'
      ]),
      // 拿小程序的登陆code
      getopenIdTap () {
        wx.login({
          success: (res) => {
            this.getCodeAccessToken(res.code)
          }
        })
      },
      // 判断是否有openID
      isOpenId () {
        let openId = wx.getStorageSync('OpenID')
        if (openId) {
          this.pageSource(this.navSouce, openId)
        } else {
          this.getopenIdTap()
        }
      },
      // 拿code换取登陆的AccessToken
      async getCodeAccessToken (code) {
        this.loginByWxCode({
          'Code': code,
          'AppID': AppID
        }).then((res) => {
          this.pageSource(this.navSouce, res.WxOpenID)
        })
      },
      // 加载页面的图片
      getHeadImg (options) {
        this.bookName = this.wordBookImgName[options.bookNumber].bookName
        this.bookHeadImg = this.wordBookImgName[options.bookNumber].headImg
        this.headPage = this.wordBookImgName[options.bookNumber].Img
      },
      // 判断页面来源
      async pageSource (options, WxOpenID) {
        let activityID = options.bookId
        let nowUserOpenId = WxOpenID
        if (options.OpenID === nowUserOpenId) {
          console.log(options.OpenID, 'options.OpenID自己给自己助力')
          this.isHelp = true
          // 分享的链接计算
          let openId = wx.getStorageSync('OpenID')
          let userId = wx.getStorageSync('UserID')
          let bookId = wx.getStorageSync('nowBook')
          let bookNumber = wx.getStorageSync('bookNumber')
          let url = '/pages/activityDetails/master?master=2&OpenID=' + openId + '&userId=' + userId + '&bookId=' + bookId + '&bookNumber=' + bookNumber
          this.shareUrl = url
          //
          this.showTost = false
        } else if (options.OpenID !== nowUserOpenId && nowUserOpenId !== '') {
          console.log('是来助力返回首页')
          this.isHelp = false
          this.showTost = true
          let message = await this.helpFriendBoost({
            activityID: activityID,
            'InvitedUserWxOpenID': nowUserOpenId,
            'InviteUserID': options.userId
          })
          if (message.status === undefined && message.Message !== undefined) {
            this.showTostTesx = message.Message
            this.helpImg = 'isHelp'
          } else if (message.status !== undefined && message.status === 409) {
            this.showTostTesx = message.Message
            this.helpImg = 'noHelp'
          } else {
            this.showTostTesx = '错误：' + message.Message
            this.helpImg = 'noHelp'
          }
        } else {
          // 助力页面加载不成功
          wx.showToast({
            title: '网络慢，请重试',
            icon: 'loading',
            mask: true,
            duration: 2000
          })
          console.log('不能助力')
        }
      },
      // 加载页面的活动详情
      async activityDetails (options) {
        let isLogin = wx.getStorageSync('Login')
        if (!isLogin && options.master === 2) {
          console.log('未登录的助力人来助力了')
          this.isHelp = false
          // 未登陆是助力进来的接口
          this.peopleNumber = 0
        } else if (isLogin) {
          console.log('已登陆看详情')
          this.isHelp = true
          // 已经登陆的用户
          let source = await this.userWordBookActivityDetail({
            userId: options.userId,
            activityID: options.bookId
          })
          console.log('source', source)
          this.peopleNumber = source.BoostAmount
          if (source.BoostAmount === this.boostAmount) {
            // 助力已经达标
            let rootUrl = '/pages/activityDetails/friend?activeId=' + options.bookId
            this.$router.push({
              path: rootUrl,
              relaunch: true
            })
          } else if (source.BoostAmount < this.boostAmount) {
            // 助力未完成
          }
          this.peopleNumber = source.BoostAmount
        }
      }
    }
  }
</script>

<style scoped>
  .waiceng{
    width: 100vw;
    height: 100vh;
  }
  .swiperBox{
    width: 100vw;
    height: 300vh;
  }
  .masterBox{
    width: 100vw;
    height: 6102px;
  }
  .headerImgBox{
    width: 100vw;
    height: 59vw;
  }
  .headerImgBox img{
    width: 100vw;
    height: 59vw;
  }
  .bottomContentBox{
    width: 100vw;
    padding-bottom: 200px;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/bg_ac_ditu.png") no-repeat;
    background-size: 100vw 100%
  }
  .box{
    width: 100vw;
    height: 24vw;
    margin-left: -1px;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/bg_ac_xunlianneirong_head.png") no-repeat;
    background-size: 100vw 24vw
  }
  .contentBox{
    width: 100vw;
    padding-top: 30px;
    padding-bottom: 10px;
    margin: 0 auto;
    margin-left: -0.1px;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/bg_ac_baisekuai.png") no-repeat;
    background-size: 100% 100%
  }
  .title{
    display: flex;
    justify-content: flex-start;
    width: 80vw;
    height: 32px;
    line-height: 32px;
    margin: 0 auto;
    margin-bottom: 32px;
    font-size: 32px;
    font-weight: 600;
    color: #e36d2f;
  }
  .point{
    width: 28px;
    height: 28px;
    margin-top: 2px;
    border-radius: 50%;
    margin-right: 16px;
    background-color: #e36d2f;
  }
  .Advertising{
    width: 75vw;
    line-height: 48px;
    margin: 0 auto;
    font-size: 28px;
    color: #333;
  }
  .chatImg{
    margin: 0 auto;
  }
  .chatImgBox{
    width: 539px;
    margin: 0 auto;
    height: 300px;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/img_ac_shujutu.png") no-repeat;
    background-size: 100% 100%

  }
  .chatImgBox_1{
    width: 561px;
    height: 366px;
    margin: 0 auto;
    margin-top: 38px;
    margin-bottom: 60px;
  }
  .boxCord{
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/img_ac_cihuishu.png") no-repeat;
    background-size: 100% 100%
  }
  .boxPage{
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/img_ac_zhizhicihuishu.png") no-repeat;
    background-size: 100% 100%;
    margin-bottom: 0;
    height: 432px;
  }
  .chatImgBox_2{
    width: 561px;
    height: 302px;
    margin: 0 auto;
    margin-bottom: 60px;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/img_ac_fangfake.png") no-repeat;
    background-size: 100% 100%
  }
  .chatImgBox_3{
    width: 602px;
    height: 438px;
    margin: 0 auto;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/img_ac_zhenrenjiandu.png") no-repeat;
    background-size: 100% 100%
  }
  .box1{
    width: 100vw;
    height: 35vw;
    margin-left: -1px;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/bg_ac_nihuihuode_head.png") no-repeat;
    background-size: 100vw 35vw
  }
  .box2{
    width: 100vw;
    height: 32vw;
    margin-left: -1px;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/bg_ac_huodongjiangpin_head.png") no-repeat;
    background-size: 100vw 33vw
  }
  .box3{
    width: 100vw;
    height: 32vw;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/bg_ac_wangqixueyuan_head.png") no-repeat;
    background-size: 100vw 32vw;
    margin-left: -1px;
  }
  .box4{
    width: 100vw;
    height: 7vw;
    margin-left: -0.5px;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/bg_ac_wangqixueyuan_foot.png") no-repeat;
    background-size: 100vw 7vw
  }
  .showText{
    width: 300px;
    text-align: center;
    margin: 0 auto;
  }
  .headerpoint{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 28px;
  }
  .headerpoint img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 28px;
  }
  .userNameText{
    height: 32px;
    line-height: 32px;
    font-size: 32px;
    color: #333;
  }
  .userTitle{
    display: flex;
    justify-content: flex-start;
    width: 75vw;
    margin: 0 auto;
    margin-bottom: 19px;
    margin-top: 38px;
    font-size: 32px;
    font-weight: 600;
  }
  .userSpack{
    margin-top: -30px;
  }
</style>
