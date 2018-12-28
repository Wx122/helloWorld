<template>
  <div class="layer" v-if="tipState">
    <div class="layer-wrap">
      <div class="layer-close iconfont icon-cancel" @click="cancel"></div>
      <div class="layer-content">
        <div class="layer-title">绑定手机号</div>
        <div class="layer-container">
          <div class="input-wrap">
            <input type="number" v-model.trim="phone" :maxlength="11" placeholder="11位中国大陆手机号" placeholder-style="color: #ccc;font-size: 32rpx;line-height: 44px;">
          </div>
          <div class="input-wrap" v-if="isShowImgCode">
            <input type="text" v-model.trim="imgCode" :maxlength="5" class="input-img-code" placeholder="图形验证码" placeholder-style="color: #ccc;font-size: 32rpx;line-height: 32px;">
            <img class="img-btn" :src="imgUrl" @click="getCaptchaCode">
          </div>
          <div class="input-wrap">
            <input type="number" v-model.trim="smsCode" :maxlength="6" class="input-phone-code" placeholder="手机验证码" placeholder-style="color: #ccc;font-size: 32rpx;line-height: 32px;">
            <div class="sms-btn" :class="{'disabled': sms.isDisabled}" @click="sendPhoneMsg">
              <span v-if="!sms.isDisabled">{{sms.text}}</span>
              <span v-else="sms.isDisabled">重新发送 ({{sms.time}}s)</span>
            </div>
          </div>
          <div v-if="tip.isShow" class="msg-error">
            <span v-show="tip.showIcon" class="iconfont icon-tishi"></span>
            <span :class="{'success': !tip.showIcon}">{{tip.msg}}</span>
          </div>
        </div>
        <div class="layer-btn">
          <div class="layer-btn-cancel" @click="cancel">取消</div>
          <button class="layer-btn-bind" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">绑定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import md5 from '@/plugins/md5/md5'
    import { mapState, mapActions } from 'vuex'
    export default {
      name: 'tip-login',
      props: {
        tipState: {
          type: Boolean,
          default: false
        }
      },
      data () {
        return {
          phone: '',
          imgCode: '',
          isShowImgCode: false,
          smsCode: '',
          sms: {
            totalTime: 60,
            isDisabled: false,
            text: '获取验证码',
            time: 0,
            timer: null
          },
          tip: {// 标记错误提示状态
            isShow: false,
            showIcon: true,
            msg: '两次密码输入不一致'
          }
        }
      },
      watch: {
        phone (val) {
          if (!val) {
            this.tip.isShow = true
            this.tip.msg = `手机号不能为空`
            return ''
          } else if (!/^[0-9]*$/g.test(val)) {
            this.tip.isShow = true
            this.tip.msg = `手机号格式错误,请输入合法有效的手机号`
            return ''
          } else {
            this.tip.msg = ''
            this.tip.isShow = false
          }
        }
      },
      computed: {
        ...mapState({
          imgUrl: state => state.login.imgCode.imgUrl
        })
      },
      async mounted () {
        if (this.isShowImgCode) {
          this.getCaptchaCode()
        }
      },
      methods: {
        ...mapActions('login', [
          'getCaptcha',
          'sendSmsCode',
          'sendSmsCodeNoType',
          'sendSmsCodeByCaptcha',
          'bindCellWithEncryptedData'
        ]),
        sendPhoneMsg: Vue.iBox.debounce(async function () {
          if (!this.sms.isDisabled) {
            if (!this.isShowImgCode) { // 不带图形验证码
              this.validate(this.phone, 'phoneNumber')
            } else { // 带图形验证码
              this.validate(this.phone, 'phoneNumber')
              if (!this.tip.isShow) { // 手机验证通过后再验证图形验证码
                this.validate(this.imgCode, 'imgCode')
              }
            }
            if (this.tip.isShow) {
              console.log('不能继续')
            } else {
              this.phoneMsg()
            }
          }
        }),
        getCaptchaCode: Vue.iBox.debounce(async function () {
          await this.getCaptcha({
            wxOpenID: wx.getStorageSync('OpenID')
          })
        }),
        /**
         * 发送短信验证码接口
         */
        async phoneMsg () {
          let timeStamp = parseInt((new Date()).getTime() / 1000)
          let wxOpenID = wx.getStorageSync('OpenID')
          let value = this.phone + Vue.iBox.global.AppSecret + timeStamp
          let sign = md5(value)
          let result
          if (this.isShowImgCode) {
            result = await this.sendSmsCodeByCaptcha({
              WxOpenID: wxOpenID,
              CaptchaText: this.imgCode,
              CellPhone: this.phone,
              TimeStamp: timeStamp,
              Sign: sign
            })
          } else {
            result = await this.sendSmsCodeNoType({
              CellPhone: this.phone,
              TimeStamp: timeStamp,
              Sign: sign
            })
          }
          console.log(result)
          if (result.status === 461) {
            this.tip.isShow = true
            this.tip.msg = result.Message
            return ''
          }
          if (!this.sms.timer) {
            this.sms.time = this.sms.totalTime
            this.sms.isDisabled = true
            this.sms.timer = setInterval(() => {
              if (this.sms.time > 0 && this.sms.time <= this.sms.totalTime) {
                this.sms.time--
              } else {
                this.sms.isDisabled = false
                clearInterval(this.sms.timer)
                this.sms.timer = null
              }
            }, 1000)
          }
        },
        /**
         * 授权成功之后调用绑定
         * @returns {Promise<void>}
         */
        async bindSent () {
          if (!this.isShowImgCode) { // 不带图形验证码
            this.validate(this.phone, 'phoneNumber')
            if (!this.tip.isShow) { // 手机验证通过后再验证图形验证码
              this.validate(this.smsCode, 'msgCode')
            }
          } else { // 带图形验证码
            this.validate(this.phone, 'phoneNumber')
            if (!this.tip.isShow) { // 手机验证通过后再验证图形验证码
              this.validate(this.imgCode, 'imgCode')
              if (!this.tip.isShow) { // 图形验证码通过后再验证手机验证码
                this.validate(this.smsCode, 'msgCode')
              }
            }
          }
          if (this.tip.isShow) {
            console.log('不能继续')
          } else {
            // 根据微信小程序用户加密数据登录用户时的参数
            let openId = wx.getStorageSync('OpenID')
            let Iv = wx.getStorageSync('Iv')
            let EncryptedData = wx.getStorageSync('EncryptedData')

            // 根据 appid， IV， encryptedData，wxopenid，cellphone，snscode
            const result = await this.bindCellWithEncryptedData({
              AppID: Vue.iBox.global.AppID,
              Iv,
              EncryptedData,
              WxOpenID: openId,
              CellPhone: this.phone,
              SmsCode: this.smsCode
            })
            console.log(result)
            if (result.status === 461) {
              this.tip.isShow = true
              this.tip.msg = result.Message
              // 如果返回数据提示超过三次错误需要展示图形验证码
              // 如果需要展示图形验证码
              if (result.Data.NeedCaptcha) {
                this.isShowImgCode = true
              }
              if (this.isShowImgCode) {
                this.getCaptchaCode()
              }
              return ''
            }
            if (result.HasCellPhone) {
              this.cancel()
              wx.showToast({
                title: '登陆成功',
                icon: 'success'
              })
            } else {
              if (result.BindToken) {
                this.$emit('tipStateFn', 'bindSent')
                this.sms.isDisabled = false
                clearInterval(this.sms.timer)
                this.sms.timer = null
                this.smsCode = ''
                this.phone = ''
                this.imgCode = ''
                this.tip.msg = ''
                this.tip.isShow = false
              }
            }
          }
        },
        /**
         * 授权getuserinfo，拿到 Iv 和 EncryptedData
         * @param res 授权信息
         */
        bindGetUserInfo: Vue.iBox.debounce(function (res) {
          console.log(res)
          if (res.mp.detail.errMsg === 'getUserInfo:fail auth deny') {
            console.log('拒绝了授权')
          } else if (res.mp.detail.errMsg === 'getUserInfo:ok') {
            console.log('授权成功')

            // 授权成功后本地存储 Iv 和 EncryptedData
            wx.setStorageSync('Iv', res.mp.detail.iv)
            wx.setStorageSync('EncryptedData', res.mp.detail.encryptedData)

            this.bindSent()
          }
        }),
        cancel () {
          this.$emit('tipStateFn', 'cancel')
          // 清空状态
          this.sms.isDisabled = false
          clearInterval(this.sms.timer)
          this.sms.timer = null
          this.smsCode = ''
          this.phone = ''
          this.imgCode = ''
          this.tip.msg = ''
          this.tip.isShow = false
        },
        /**
         * 验证手机号和图形验证码
         * @param val 需要检验的值
         * @param type 校验类型
         * @returns {string}
         */
        validate (val, type) {
          if (type === 'phoneNumber') {
            if (!val) {
              this.tip.isShow = true
              this.tip.msg = `手机号不能为空`
              return ''
            } else if (!/^1\d{10}$/.test(val)) {
              this.tip.isShow = true
              this.tip.msg = `手机号格式错误,请输入合法有效的手机号`
              return ''
            } else if (val.length !== 11) {
              this.tip.isShow = true
              this.tip.msg = `手机号格式错误,请输入合法有效的手机号`
              return ''
            } else {
              this.tip.msg = ''
              this.tip.isShow = false
            }
          }
          if (type === 'imgCode') {
            if (!val) {
              this.tip.isShow = true
              this.tip.msg = `图形验证码不能为空`
              return ''
            } else if (val.length !== 5) {
              this.tip.isShow = true
              this.tip.msg = `图形验证码错误`
              return ''
            } else {
              this.tip.msg = ''
              this.tip.isShow = false
            }
          }
          if (type === 'msgCode') {
            if (!val) {
              this.tip.isShow = true
              this.tip.msg = `短信验证码不能为空`
              return ''
            } else if (val.length !== 6) {
              this.tip.isShow = true
              this.tip.msg = `短信验证码错误`
              return ''
            } else {
              this.tip.msg = ''
              this.tip.isShow = false
            }
          }
        }
      }
    }
</script>

<style lang="scss" scoped>

  .layer {
    position: fixed;
    background: rgba(0, 0, 0, 0.65);
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1500;

    .layer-wrap {
      width: 580px;
      border-radius: 16px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .layer-close {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 50px;
        color: #999;
        font-size: 24px;
        text-align: center;
        height: 50px;
        line-height: 50px;
      }
      .layer-content {
        padding: 50px 0;
        .layer-title {
          font-weight: bold;
          text-align: center;
          color: #333333;
          line-height: 36px;
          font-size: 40px;
        }
        .layer-container {
          margin-top: 30px;
          margin-bottom: 40px;
          width: 482px;
          margin-left: 49px;
          font-size: 32px;
          color: #333333;
          line-height: 44px;
          letter-spacing: -0.53px;
          .input-wrap {
            position: relative;
            height: 56px;
            line-height: 96px;
            width: 482px;
            border-bottom: 1px solid #CCCCCC;
            input {
              margin-top: 40px;
            }
            .input-img-code {
              width: 320px;
            }
            .input-phone-code {
              width: 320px;
            }
            .img-btn {
              position: absolute;
              top: -22px;
              right: 0;
              display: inline-block;
              width: 140px;
              height: 60px;
              border: 1px solid #ccc;
            }
            .sms-btn {
              position: absolute;
              top: 0;
              right: 0;
              display: inline-block;
              height: 60px;
              width: auto;
              font-size: 28px;
              color: #FF8800;
              line-height: 28px;
              &.disabled {
                color: #ccc;
              }
            }
          }
          .msg-error {
            font-size: 28px;
            line-height: 40px;
            letter-spacing: 0;
            margin-top: 20px;
            color: #FF4752;
            .icon-tishi {
              font-size: 25px;
              margin-right: 10px;
            }
            .success {
              color: #008000;
            }
          }
        }
        .layer-btn {
          display: flex;
          height: 88px;
          margin-left: 40px;
          .layer-btn-cancel {
            width: 240px;
            background: #FFFFFF;
            border: 2px solid #FF7400;
            border-radius: 100px;
            font-size: 32px;
            color: #FF6900;
            text-align: center;
            line-height: 88px;
            margin-right: 20px;
          }
          .layer-btn-bind {
            width: 240px;
            background-image: linear-gradient(47deg, #FF9800 0%, #FFAA00 99%);
            border-radius: 100px;
            font-size: 32px;
            color: #FFFFFF;
            text-align: center;
            line-height: 88px;
          }
        }
      }
    }
  }
</style>
