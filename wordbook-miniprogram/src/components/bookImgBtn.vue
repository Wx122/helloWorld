<template>

  <div class="homBtn" >
    <form report-submit="true" @submit="saveFormId">
      <button  form-type="submit" open-type="getUserInfo" @getuserinfo="getUserInfo">
        <div class="bookImgList" :style="{background:wordBookImgName[id].imgName,backgroundSize:'25vw 35vw'}">
          <div class="joinNumber">已有{{jionPeoPleNum}}人报名</div>
        </div>
      </button>
    </form>
  </div>

</template>

<script>
  import Vue from 'vue'
  import {WordbookActivityImgName, AppID} from '@/utils/global.js'
  import { mapActions } from 'vuex'
  export default {
    name: 'bookImgBtn',
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
      jionPeoPleNum: {
        type: Number
      },
      wordBookId: {
        type: Number
      }
    },
    data () {
      return {
        // activityImgUrl: Global.activityImgUrl,
        // imgUrlArr: Global.homePageIcon,
        // homeImgStyle: Global.homePageIcon[1],
        textStyle: 'textClick',
        activImg: '',
        wordBookImg: '',
        SignIn: '',
        wordBookImgName: WordbookActivityImgName
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
            console.log(err)
          }
        }
      },
      // 点击按钮授权
      async getUserInfo (res) {
        const result = res.mp.detail
        let oldUser = wx.getStorageSync('Login')
        let token = wx.getStorageSync('AccessToken')
        if (!oldUser) {
          // 未关注过任何朗播账号的微信用户
          if (result.errMsg === Vue.iBox.global.okMsg.userInfo || token === '') {
            wx.setStorageSync('wxUserInfo', result.userInfo)
            this.getUserInforopenId(result)
          } else {
            console.log('未授权')
          }
        } else if (oldUser) {
          if (result.errMsg === Vue.iBox.global.okMsg.userInfo) {
            let hasCellPhone = wx.getStorageSync('HasCellPhone')
            if (!hasCellPhone) {
              // todo 弹窗
              this.$emit('tipStateFn')
            } else {
              wx.setStorageSync('wxUserInfo', result.userInfo)
              let userId = wx.getStorageSync('UserID')
              let openId = wx.getStorageSync('OpenID')
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
          } else {
          }
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
        let newUserToken = that.loginByWxEncryptedData({
          AppID: AppID,
          Iv: res.iv,
          EncryptedData: res.encryptedData,
          WxOpenID: openId
        })
        if (!newUserToken.HasCellPhone) {
          // todo 弹窗
          this.$emit('tipStateFn')
        } else {
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
            wx.setStorageSync('wxUserInfo', res.userInfo)
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
        } catch (e) {
        }

        this.recordUserBehavior({
          activityID: bookId,
          UserID: userId,
          BehaviorType: 1,
          WxOpenID: openId
        })
      }
    }
  }
</script>

<style scoped>
  .bookImgList{
    position: relative;
    width: 25vw;
    height: 35vw;
    border-radius: 10px;
    margin-bottom: 20px;
    background-color: #0bb20c;
  }
  .joinNumber{
    position: absolute;
    bottom: 0;
    width: 25vw;
    height: 39px;
    line-height: 39px;
    font-size: 20px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.15);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    color: #ffffff;
  }
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
    width: 25vw;
    height: 35vw;
    padding-top: 15px;
    margin-bottom: 20px;
    /*background-color: #eeeeee;*/
  }
  button{
    padding-left: 0;
    background: none;
  }

</style>


