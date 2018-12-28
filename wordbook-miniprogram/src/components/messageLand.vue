<template>
  <div>
    <form id="form" class="u-form" report-submit="true" @submit="formSubmit">
      <p></p>
      <div class = "u-input-wrap">
        <input name="phone" class="u-input-phone" maxlength="11" placeholder="11位中国大陆手机号" type="number" v-model.trim="phone" @input="phoneTextNext"/>
      </div>
      <div class = "u-input-wrap">
        <input name="imgCode" class="u-input-img" maxlength="12" placeholder="图形验证码" v-model.trim="imgCode" />
        <img class="u-img-btn"  @click="getCapImg()" :src="imgUrl">
      </div>
      <div class="u-input-wrap">
        <input name="smsCode" class="u-input-sms" maxlength="12" placeholder="短信验证码" v-model.trim="smsCode" @input="phoneTextNext"/>
        <div @click="send" class="u-sms-wrap" :class="{'disabled': sms.isDisabled}">
          <span v-show="!sms.isDisabled">{{sms.text}}</span>
          <span v-show="sms.isDisabled">重新发送 ({{sms.time}}s)</span>
        </div>
      </div>
      <div class="errBox">
        <div v-if="tip.isShow" class="u-msg-error">
          <span v-show="tip.showIcon" class="iconfont icon-tishi"></span>
          <span :class="{'u-success': !tip.showIcon}">{{tip.msg}}</span>
        </div>
      </div>
      <div class="btnNL" v-if="!btnShow">登陆</div>
      <div class="btn" @click="smsCodeTrue" v-if="btnShow">登陆</div>
    </form>
    <div class="checkpage" @click="checkPage">忘记密码</div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  // 引入md5加密文件
  import md5 from '@/plugins/md5/md5'
  const messageSendType = {
    'Login': 1,
    'Register': 2,
    'ResetPassword': 3,
    'BindCellPhone': 4
  }
  export default {
    data () {
      return {
        btnShow: false,
        messageSendType: messageSendType,
        phone: '',
        imgCode: '',
        smsCode: '',
        sms: {
          totalTime: 60,
          isDisabled: false,
          text: '发送验证码',
          time: 0
        },
        tip: {
          isShow: false,
          showIcon: true,
          msg: ''
        }, // 标记错误提示状态
        submitBtnStatus: true
      }
    },
    props: {
      wxLoginReturnval: {
        type: Object,
        require: true
      }
    },
    computed: {
      ...mapState({
        isShowLoginPopUp: state => state.login.isShowLoginPopUp,
        imgUrl: state => state.login.imgCode.imgUrl
      })
    },
    onLoad: function (options) {
      this.getCapImg()
    },
    mounted: function () {
    },
    methods: {
      ...mapActions('login', [
        'sendSmsCode',
        'getCaptcha',
        'endValidateCodeByCaptcha',
        'checkValidateCode',
        'loginByValidateCode',
        'checkUserInfoIntegrity'
      ]),
      // 监听输入内容达标后显示下一步按钮
      phoneTextNext (e) {
        let onetext = this.phone
        let smsText = this.smsCode
        if (onetext.length === 11 && smsText.length > 0) {
          this.btnShow = true
        } else {
          this.btnShow = false
        }
      },
      // 去忘记密码页面
      checkPage () {
        this.$router.push({
          path: '/pages/land/resetPassword',
          relaunch: true
        })
      },
      // 验证短信去更改密码
      async smsCodeTrue () {
        let canreaet = await this.loginByValidateCode({
          'CellPhone': this.phone,
          'ValidateCode': this.smsCode
        })
        if (canreaet.AccessToken) {
          wx.setStorageSync('AccessToken', canreaet.AccessToken)
          wx.setStorageSync('AccessTokenExpires', canreaet.AccessTokenExpires)
          wx.setStorageSync('UserID', canreaet.UserID)
          wx.setStorageSync('Login', true)
          await this.checkUserInfoIntegrity()
          this.$router.push({
            path: '/pages/home/index',
            relaunch: false
          })
        } else {
          this.getCapImg()
          this.sms.isDisabled = false
          clearInterval(this.sms.timer)
          this.sms.timer = null
          this.showStatus(canreaet.Message)
        }
      },
      async getCapImg () {
        let wxOpenID = wx.getStorageSync('OpenID')
        await this.getCaptcha({
          wxOpenID: wxOpenID
        })
      },
      toggleImgCode () {
        this.getCaptcha()
      },
      async send (e) {
        if (this.phone.length === 0) {
          this.showStatus('请输入11位中国大陆手机号')
          return
        }

        if (!this.phone.match(/^1\d{10}$/)) {
          this.showStatus('手机号输入错误')
          return
        }

        if (this.imgCode.length === 0) {
          this.showStatus('请输入图形验证码')
          return
        }
        // 获取短信验证码的参数
        let timeStamp = parseInt((new Date()).getTime() / 1000)
        let value = this.phone + messageSendType.ResetPassword + Vue.iBox.global.AppSecret + timeStamp
        let hash = md5(value)
        let openId = wx.getStorageSync('OpenID')
        // 发送验证码
        try {
          let sentMes = ''
          if (!this.sms.isDisabled) {
            sentMes = await this.endValidateCodeByCaptcha({
              Type: messageSendType.ResetPassword,
              WxOpenID: openId,
              CaptchaText: this.imgCode,
              CellPhone: this.phone,
              TimeStamp: timeStamp,
              Sign: hash
            })
          }
          if (sentMes.status !== undefined && sentMes.status === 461) {
            this.sms.isDisabled = false
            clearInterval(this.sms.timer)
            this.sms.timer = null
            this.showStatus(sentMes.Message)
            this.getCapImg()
            return
          }
          this.sms.isDisabled = true
          if (!this.sms.timer && this.sms.isDisabled) {
            const _this = this
            this.sms.time = this.sms.totalTime
            this.sms.timer = setInterval(function () {
              if (_this.sms.time > 0 && _this.sms.time <= _this.sms.totalTime) {
                _this.sms.time--
              } else {
                _this.sms.isDisabled = false
                clearInterval(_this.sms.timer)
                _this.sms.timer = null
                _this.sms.text = '重新发送验证码'
              }
            }, 1000)
            this.showStatus('发送成功', false)
          }
        } catch (e) {
          this.sms.isDisabled = false
          clearInterval(this.sms.timer)
          this.sms.timer = null
          this.showStatus(e.message)
        }
      },
      async formSubmit (e) {
        if (this.phone.length === 0) {
          this.showStatus('请输入11位中国大陆手机号')
          return
        }

        if (!this.phone.match(/^1\d{10}$/)) {
          this.showStatus('手机号输入错误')
          return
        }

        if (this.smsCode.length === 0) {
          this.showStatus('请输入短信验证码')
          return
        }

        try {
          this.submitBtnStatus = false

          if (!this.submitBtnStatus) {
            await this.bindCellPhone({
              CellPhone: this.phone,
              SmsCode: this.smsCode,
              EncryptedUserInfo: this.wxLoginReturnval.encryptedData,
              UserInfoIv: this.wxLoginReturnval.iv
            })

            const formId = e.mp.detail.formId
            if (formId) {
              try {
                await this.cacheFormId({FormID: formId.toString()})
              } catch (err) {
                console.log(err)
              }
            }
            this.submitBtnStatus = true
            // this.toggleLoginPopUpStatus()
            this.$emit('afterLogin')
          }
        } catch (e) {
          this.showStatus(e.message)
        }
      },
      showStatus: function (msg, showIcon = true) {
        const _this = this
        this.tip.isShow = true
        this.tip.showIcon = showIcon
        this.tip.msg = msg

        let timer = setTimeout(function () {
          _this.tip.isShow = false
          _this.tip.showIcon = true
          _this.tip.msg = ''
          clearTimeout(timer)
        }, 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .u-login-wrap {
    position: fixed;
    z-index: 8;
    width: 100%;
    height: 100vh;
    font-size: 32px;
  }
  .u-login-wrap .u-cover {
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,.65)
  }
  .u-form {
    width: 80vw;
    height: 636px;
    background-color: #fff;
    border-radius: 16px;
    box-sizing: border-box;
  }
  .u-form p {
    margin-bottom: 12px;
    color: #333;
    font-size: 40px;
    font-weight: bold;
    letter-spacing: 0;
    text-align: center;
    line-height: 56px;
  }
  .u-form .u-close {
    position: absolute;
    top: 24px;
    right: 24px;
    width: 30px;
    color: #999;
    font-size: 24px;
    text-align: center;
  }
  .u-form .u-input-wrap {
    width: 80vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 96px;
    margin: 0 auto;
    border-bottom: 1px solid #ccc;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .u-form .u-input-wrap input {
    height: 100%;
    /*line-height: 95px;*/
  }
  .u-form .u-input-wrap .u-input-sms {
    width: 200px;
  }
  .u-form .u-input-wrap input::-webkit-input-placeholder {
    color: #ccc;
  }
  .u-form .u-img-btn {
    display: inline-block;
    width: 140px;
    height: 60px;
    border: 1px solid #ccc;
  }
  .u-form .u-sms-wrap {
    height: 100%;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ee8523;
    font-size: 28px;
  }
  .u-form .u-sms-wrap.disabled {
    color: #ccc
  }
  .u-form .u-msg-error .u-success {
    color: #ee8523;
  }
  .u-form .u-msg-error .iconfont {
    margin-right: 10px;
    font-size: 28px;
  }
  .u-form .btn {
    width: 500px;
    height: 88px;
    margin: 0 auto;
    margin-top: 80px;
    color: #fff;
    font-size: 32px;
    line-height: 88px;
    letter-spacing: 0;
    text-align: center;
    background-image: linear-gradient(47deg, #ff9800 0%, #fa0 100%);
    box-shadow: 0 1px 16px 0 rgba(236,141,0,0.31);
    border-radius: 100px;
  }
  .u-form .btnNL {
    width: 500px;
    height: 88px;
    margin: 0 auto;
    margin-top: 80px;
    color: #fff;
    font-size: 32px;
    line-height: 88px;
    letter-spacing: 0;
    text-align: center;
    background-color: #d1d1d1;
    border-radius: 100px;
  }
  .errBox{
    width: 100vw;
    height: 30px;
    padding-top: 10px;
    line-height: 40px;
  }
  .u-form .u-msg-error {
    width: 80vw;
    /*position: absolute;*/
    /*bottom: 170px;*/
    height: 40px;
    margin: 0 auto;
    color: #ff5a5a;
    font-size: 28px;
    line-height: 40px;
    letter-spacing: 0;
  }
  .u-form .u-msg-error .u-success {
    color: #ee8523;
  }
  .checkpage{
    width: 100vw;
    height: 32px;
    margin-top: 26px;
    text-align: center;
    font-size: 32px;
  }
</style>

<!--<template>-->

<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--name: 'reset-password'-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
