<template>
  <div>
    <div class="titleText"></div>
    <form id="form" class="u-form" report-submit="true" @submit="formSubmit">
      <div class="u-input-img" >
        <div class="inputBox">
          <input password type="number" maxlength="12" placeholder="6-12位密码" placeholder-class="input-placeholder" v-model.trim="fistInputPassword" @input="fistPassword" :value="inputTxt"/>
        </div>
        <div class="icon-search iconfont icon-guanbit"  @click="passwordShow" v-if="firstClose">
          <div class="clear iconfont icon-guanbi"></div>
        </div>
      </div>
      <div class="u-input-img" >
        <div class="inputBox">
          <input password type="number" maxlength="12" placeholder="请确认新密码" v-model.trim="inputPassword" @input="secondPassword" :value="secondInputTxt"/>
        </div>
        <div class="icon-search"  @click="password" v-if="secondClose">
          <div class="clear iconfont icon-guanbi"></div>
        </div>
      </div>
      <div class="erroMs">{{erroMess}}</div>
      <div class="btnNo" v-if="!isOk">确定</div>
      <div class="btn" @click="smsCodeTrue" v-if="isOk">确定</div>
    </form>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'inputPassword',
    data () {
      return {
        phone: '',
        inputPassword: '',
        inputTxt: '',
        isOk: false,
        firstClose: false,
        secondClose: false,
        erroMess: '',
        secondInputTxt: ''
      }
    },
    onload () {
      this.inputTextDell()
    },
    onShow () {
      this.inputTextDell()
      this.passwordShow()
      this.password()
    },
    onHide () {
      this.inputTextDell()
    },
    methods: {
      ...mapActions('login', [
        'resetPassword'
      ]),
      // 页面show或者hide的时候清空数据
      inputTextDell () {
        this.inputTxt = ''
        this.secondInputTxt = ''
        this.isOk = false
      },
      passwordShow () {
        this.inputTxt = ''
        this.erroMess = ''
        this.firstClose = false
        this.isOk = false
      },
      password () {
        this.secondInputTxt = ''
        this.erroMess = ''
        this.secondClose = false
        this.isOk = false
      },
      // 第一次输入密码
      fistPassword (e) {
        this.isOk = false
        let inputPassword = this.secondInputTxt
        this.inputTxt = e.mp.detail.value
        let firstLength = e.mp.detail.value.length
        if (firstLength === 0) {
          this.firstClose = false
          this.erroMess = ''
        } else
        if (firstLength > 0) {
          this.firstClose = true
        }
        if (firstLength > 5 && e.mp.detail.value === inputPassword) {
          this.isOk = true
          this.erroMess = ''
        } else {
        }
      },
      // 第二次输入的密码
      secondPassword (e) {
        this.isOk = false
        this.secondInputTxt = e.mp.detail.value
        if (e.mp.detail.value.length === 0) {
          this.secondClose = false
          this.erroMess = ''
        } else
        if (e.mp.detail.value.length > 0) {
          this.secondClose = true
        }
        let firstword = this.inputTxt
        if (firstword !== undefined) {
          let differenceNumber = firstword.substring(0, e.mp.detail.value.length)
          if (e.mp.detail.value.length > 5 && e.mp.detail.value === firstword) {
            this.erroMess = ''
            // 密码相同，可以显示确定按钮
            this.isOk = true
          } else if (e.mp.detail.value.length < firstword.length) {
            if (e.mp.detail.value !== differenceNumber) {
              this.erroMess = '密码不一致，请重新输入'
            }
          } else if (e.mp.detail.value.length > firstword.length) {
            this.erroMess = '密码不一致，请重新输入'
            this.isOk = false
          }
        } else if (firstword === undefined) {
          this.erroMess = '密码不一致，请重新输入'
          this.isOk = false
        }
      },
      // 用户名输入框
      bindKeyInput: function (e) {
        let accountNumber = e.mp.detail.value.length
        if (accountNumber > 0 && this.passWord !== undefined && this.passWord.length > 5) {
          // 满足登陆条件
          this.btnstyle = false
        } else {
          // 不满足登陆条件
        }
      },
      // 密码输入框
      bindPassInput (e) {
        this.inputTxt = e.mp.detail.value
      },
      async smsCodeTrue () {
        let validateToken = wx.getStorageSync('ValidateToken')
        let canreaet = await this.resetPassword({
          'ValidateToken': validateToken,
          'UserPwd': this.inputPassword
        })
        if (canreaet.Message === 'success') {
          wx.showToast({
            title: '重置密码成功',
            icon: 'success',
            mask: true,
            duration: 2000,
            success: function (res) {
              // 重置成功后返回两层
              wx.navigateBack({
                delta: 2
              })
            }
          })
        } else {
          this.erroMess = canreaet.Message
        }
      }
    }
  }
</script>

<style scoped>

  .titleText{
    width: 238px;
    height: 34px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 179px;
    text-align: center;
    font-size: 34px;
    color: #2c3640;
  }
  .u-input-img{
    width: 80vw;
    height: 100px;
    line-height: 100px;
    margin:0 auto ;
    border-bottom: 1px solid #cccccc;
    display: flex;
    justify-content: space-between;
  }
  .inputBox{
    width: 70vw;
  }
  .clear{
    width: 50px;
    height:100px;

    border-radius: 50%;
    color: rgba(0, 0, 0, 0.5);
    /*background-color: rgba(0, 0, 0, 0.5);*/
  }
  .icon-search{
    width: 32px;
    height: 100px;
    /*background: #e64340;*/
  }
  .icon-guanbi:before {
    font-size: 32px;
    line-height: 100px;
  }
  .u-input-img input{
    width: 70vw;
    height: 100px;
    line-height: 100px;
    margin:0 auto ;
    border-bottom: 1px solid #cccccc;
  }
  /*.u-input-img .inputBox .input-placeholder{*/
    /*font-size: 100px;*/
    /*line-height: 45px;*/
    /*color: #cccccc;*/
  /*}*/
  .erroMs{
    width: 80vw;
    height: 80px;
    margin: 0 auto;
    margin-bottom: 20px;
    line-height: 80px;
    text-align: left;
    font-size: 28px;
    color: #ff5a5a;
  }
  .btnNo{
    width: 500px;
    height: 88px;
    /*margin-top: 80px;*/
    margin: 0 auto;
    color: #fff;
    font-size: 32px;
    line-height: 88px;
    letter-spacing: 0;
    text-align: center;
    background-color: #dddddd;
    border-radius: 100px;
  }
  .btn {
    width: 500px;
    height: 88px;
    /*margin-top: 80px;*/
    margin: 0 auto;
    color: #fff;
    font-size: 32px;
    line-height: 88px;
    letter-spacing: 0;
    text-align: center;
    background-image: linear-gradient(47deg, #ff9800 0%, #fa0 100%);
    box-shadow: 0 1px 16px 0 rgba(236,141,0,0.31);
    border-radius: 100px;
  }

</style>
