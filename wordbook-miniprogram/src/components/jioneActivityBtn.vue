<template>

  <div class="homBtn" >
    <form report-submit="true" @submit="saveFormId">
    <button :class="colorClass" form-type="submit" open-type="getUserInfo" @getuserinfo="getUserInfo"></button>
    </form>
  </div>

</template>

<script>
  import Vue from 'vue'
  import {AppID} from '@/utils/global.js'
  import { mapActions } from 'vuex'
  export default {
    name: 'jioneActivityBtn',
    props: {
      navTourl: {
        type: String
      },
      buttonTitle: {
        type: String
      },
      colorClass: {
        type: String
      },
      id: {
        type: Number
      },
      wordBookId: {
        type: Number
      }
    },
    data () {
      return {
        textStyle: 'textClick',
        activImg: '',
        wordBookImg: '',
        SignIn: ''
      }
    },
    methods: {
      ...mapActions('activity', [
        'wordBookActivities',
        'joinActivity',
        'recordUserBehavior',
        'cacheFormId'
      ]),
      ...mapActions('login', [
        'loginByEncryptedData',
        'loginByWxEncryptedData'
      ]),
      // 记录参加活动的formId
      async saveFormId (e) {
        let openId = wx.getStorageSync('OpenID')
        const formId = e.mp.detail.formId
        let newFormId = formId.toString()
        if (formId && formId !== 'the formId is a mock one') {
          try {
            await this.cacheFormId({
              'WxOpenID': openId,
              'WxFormID': newFormId,
              'ActivityID': this.id
            })
          } catch (err) {
          }
        }
      },
      // 点击按钮授权
      async getUserInfo (res) {
        const result = res.mp.detail
        let oldUser = wx.getStorageSync('Login')
        let token = wx.getStorageSync('AccessToken')
        if (result.errMsg === Vue.iBox.global.okMsg.userInfo) {
          if (!oldUser || token === '') {
            wx.setStorageSync('wxUserInfo', result.userInfo)
            this.getUserInforopenId(result)
          } else if (oldUser) {
            wx.setStorageSync('wxUserInfo', result.userInfo)
            let userId = wx.getStorageSync('UserID')
            let openId = wx.getStorageSync('OpenID')
            let hasCellPhone = wx.getStorageSync('HasCellPhone')
            if (!hasCellPhone) {
              // todo 弹窗
              this.$emit('tipStateFn')
            } else {
              wx.setStorageSync('nowBook', this.id)
              wx.setStorageSync('bookNumber', this.wordBookId)
              // let bookId = wx.getStorageSync('nowBook')
              let rootUrl = this.navTourl + '?OpenID=' + openId + '&userId=' + userId + '&bookId=' + this.id + '&bookNumber=' + this.wordBookId
              wx.hideToast()
              this.$router.push({
                path: rootUrl
              })
              this.jionLog()
            }
          }
        } else {
          console.log('拒绝授权')
        }
      },
      // 登陆相关的方法
      // 没有token的客户授权后拿小程序的登陆code换token
      async getUserInforopenId (res) {
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          mask: true
        })
        let openId = wx.getStorageSync('OpenID')
        let that = this

        wx.setStorageSync('wxUserInfo', res.userInfo)

        let newUserToken = await that.loginByWxEncryptedData({
          AppID: AppID,
          Iv: res.iv,
          EncryptedData: res.encryptedData,
          WxOpenID: openId
        })
        console.log(newUserToken)
        // todo 通过HasCellPhone 弹出绑定手机号
        if (!newUserToken.HasCellPhone) {
          // todo 弹窗
          this.$emit('tipStateFn')
        } else {
          // todo 正常逻辑
          if (newUserToken.status !== undefined) {
            wx.showToast({
              title: newUserToken.Message,
              icon: 'none',
              duration: 2000,
              mask: true
            })
          } else if (newUserToken.AccessToken !== '') {
            wx.setStorageSync('AccessToken', newUserToken.AccessToken)
            wx.setStorageSync('Login', true)
            let userId = wx.getStorageSync('UserID')
            let openId = wx.getStorageSync('OpenID')
            wx.setStorageSync('nowBook', that.id)
            wx.setStorageSync('bookNumber', that.wordBookId)
            let rootUrl = that.navTourl + '?OpenID=' + openId + '&userId=' + userId + '&bookId=' + that.id + '&bookNumber=' + that.wordBookId
            // 隐藏loading
            wx.hideToast()
            if (wx.getStorageSync('AccessToken') !== undefined && wx.getStorageSync('AccessToken') !== '') {
              this.$router.push({
                path: rootUrl
              })
              that.jionLog()
            } else {
              setTimeout(function () {
                that.$router.push({
                  path: rootUrl
                })
                that.jionLog()
              }, 1000)
            }
          }
        }
      },
      // 记录活动和参与活动行为的方法
      jionLog () {
        let openId = wx.getStorageSync('OpenID')
        let userId = wx.getStorageSync('UserID')
        let bookId = wx.getStorageSync('nowBook')
        try {
          this.joinActivity({
            activityID: bookId,
            userID: userId
          })
          this.recordUserBehavior({
            activityID: bookId,
            UserID: userId,
            BehaviorType: 1,
            WxOpenID: openId
          })
        } catch (e) {
        }
      }
    }
  }
</script>

<style scoped>
  .jionBtn{
    width:150px;
    height: 83px;
    padding-top: 15px;
    font-size: 20px;
    color: #666666;
    background-color: #ffffff;
  }
  .clickBtn{
    width:150px;
    height: 83px;
    padding-top: 15px;
    color: #FF8800;
    font-size: 20px;
    background-color: #ffffff;
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
  .jionBtn{
    width: 25vw;
    height: 8vw;
    background:url(https://ssl-static.langlib.com/miniprogram/wordbook/activity/btn_mianfeicanjia.png) no-repeat;
    background-size: 25vw 8vw;
  }
  .homBtn{
    width:150px;
    height: 83px;
    padding-top: 15px;
    /*background-color: #eeeeee;*/
  }

</style>

