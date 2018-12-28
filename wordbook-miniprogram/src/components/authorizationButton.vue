<template>
  <div class="homBtn">
    <button :class="[iconName,colorClass]"  open-type="getUserInfo" @getuserinfo="getUserInfo" class="iconfont btnWIdth">
      <div class="btnText">{{buttonTitle}}</div>
    </button>
  </div>
</template>

<script>
  // import Vue from 'vue'
  import {AppID} from '@/utils/global'
  import { mapActions } from 'vuex'
  export default {
    name: 'navBanner',
    props: {
      navTourl: {
        type: String
      },
      buttonTitle: {
        type: String
      },
      colorClass: {
        type: String,
        default: 'clickBtn'
      },
      iconName: {
        type: String
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
        'wordBookActivities'
      ]),
      ...mapActions('login', [
        'loginByEncryptedData',
        'loginByWxEncryptedData'
      ]),
      // 点击按钮授权
      getUserInfo (res) {
        let result = res.mp.detail
        let oldUser = wx.getStorageSync('Login')
        let token = wx.getStorageSync('AccessToken')
        if (!oldUser) {
          // 未关注过任何朗播账号的微信用户
          if ((result.errMsg === 'getUserInfo:ok') || token === '') {
            wx.setStorageSync('wxUserInfo', result.userInfo)
            this.getUserInforopenId(result)
          } else {}
        } else if (oldUser) {
          if (result.errMsg === 'getUserInfo:ok') {
            let hasCellPhone = wx.getStorageSync('HasCellPhone')
            if (!hasCellPhone) {
              // todo 弹窗
              this.$emit('tipStateFn')
            } else {
              wx.setStorageSync('wxUserInfo', result.userInfo)
              let openId = wx.getStorageSync('OpenID')
              let rootUrl = this.navTourl + '?OpenID=' + openId
              wx.hideToast()
              if (this.colorClass === 'clickBtn') {
              } else if (this.colorClass === 'jionBtn') {
                wx.reLaunch({
                  url: rootUrl
                })
              }
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
          mask: true,
          duration: 2000
        })
        // wx.showLoading({title: '加载中'})
        let openId = wx.getStorageSync('OpenID')

        wx.setStorageSync('wxUserInfo', res.userInfo)
        this.loginByWxEncryptedData({
          AppID: AppID,
          Iv: res.iv,
          EncryptedData: res.encryptedData,
          WxOpenID: openId
        }).then(login => {
          // todo 通过HasCellPhone 弹出绑定手机号
          if (!login.HasCellPhone) {
            // todo 弹窗
            this.$emit('tipStateFn')
          } else {
            if (login.status !== undefined) {
              wx.showToast({
                title: login.Message,
                icon: 'loading',
                mask: true,
                duration: 2000
              })
            }
            if (login.AccessToken !== '') {
              this.loginSuccess(res, login)
              wx.hideLoading()
            }
          }
        })
      },
      loginSuccess (data, newUserToken) { //  登陆成功
        wx.setStorageSync('AccessToken', newUserToken.AccessToken)
        wx.setStorageSync('Login', true)
        wx.setStorageSync('wxUserInfo', data.userInfo)
        let openId = wx.getStorageSync('OpenID')
        let rootUrl = this.navTourl + '?OpenID=' + openId
        if (wx.getStorageSync('AccessToken') !== undefined && wx.getStorageSync('AccessToken') !== '') {
          wx.hideToast()
          if (this.colorClass === 'clickBtn') {
          } else if (this.colorClass === 'jionBtn') {
            wx.reLaunch({
              url: rootUrl
            })
          }
        } else {
          if (this.colorClass === 'clickBtn') {
          } else if (this.colorClass === 'jionBtn') {
            wx.reLaunch({
              url: rootUrl
            })
          }
        }
      }
    }
  }
</script>

<style scoped>
  .btnText{
    margin-top: -35px;
  }
  .btnWIdth{
    width:150px;
    font-size: 50px;
    margin-top: -20px;
    height: 50px;
    background: none;
  }
  button{
    background: none;
    padding-top: -10px;
    width:100px;
    height: 150px;
  }
  .icon-home {
    /*position: relative;*/
  }
  .icon-home:before{
    position: relative;
    /*bottom: -15px;*/
    font-size: 44px;
    width: 30px;
    /*height: 100px;*/
  }
  .icon-dibudaohangICON-:before{
    position: relative;
    /*bottom: -15px;*/
    font-size: 44px;
    width: 30px;
    /*height: 100px;*/
  }
  .icon-daqia:before{
    position: relative;
    /*padding-top: -5px;*/
    /*line-height: 70px;*/
    /*bottom: -15px;*/
    font-size: 52px;
    width: 30px;
    line-height: 110px;
    /*height: 100px;*/
  }
  .jionBtn{
    width:150px;
    font-size: 20px;
    color: #666666;
    /*background-color: #ffffff;*/
  }
  .clickBtn{
    width:150px;
    color: #FF8800;
    font-size: 20px;
    /*background-color: #ffffff;*/
  }
  /*删除button默认的边框*/
  button::after{ border: none; }
  .homBtn{
    width:150px;
    /*height: 83px;*/
    /*padding-top: 15px;*/
    /*background-color: #eeeeee;*/
    /*border:1px solid #000;*/
    text-align: center;
  }
  .home{
    width: 150px;
    height:40px;
    background-color: #1aad19;
  }
</style>

