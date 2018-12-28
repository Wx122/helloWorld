<template>
  <div class="inputWindow">
    <form id="form" class="u-form" report-submit="true" @submit="formSubmit">
      <div class="u-input-img">
        <input name="phone" class="u-input-phone" maxlength="30" placeholder="用户名/邮箱/手机号"  v-model.trim="UserCredential" @input="bindKeyInput"  :value="userText"/>
       <div class="closeBox">
         <div class="icon-search iconfont icon-guanbit"  @click="userClear" v-if="firstClose">
           <div class="clear iconfont icon-guanbi"></div>
         </div>
       </div>
      </div>
      <div class="u-input-img" >
        <div class="inputBox">
          <input :password="ispass"  maxlength="30" placeholder="6-12位密码" v-model.trim="passWord" @input="bindPassInput"/>
        </div>
        <div class="icon-search"  @click="passwordShow">
          <div class="unSee iconfont icon-biyan" v-if="ispass"></div>
          <div class="seen iconfont icon-xianshimima" v-if="!ispass"></div>
        </div>
      </div>
      <div class="errMs">{{errorMessage}}</div>
      <div class="blackBtn" v-if="btnstyle" >登录</div>
      <div class="btn" @click="smsCodeTrue" v-if="!btnstyle">登录</div>
    </form>
    <div class="checkpage" @click="checkPage">忘记密码</div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    data () {
      return {
        userText: '',
        firstClose: false,
        phone: '',
        inputPassword: '',
        ispass: true,
        btnstyle: true,
        errorMessage: ''
      }
    },
    onShow () {
      this.userClear()
      this.errorMessage = ''
      this.UserCredential = ''
      this.passWord = ''
    },
    methods: {
      ...mapActions('login', [
        'loginByAccount',
        'checkUserInfoIntegrity'
      ]),
      // 去忘记密码页面
      checkPage () {
        this.$router.push({
          path: '/pages/land/resetPassword',
          relaunch: true
        })
      },
      // 清除用户账号的数据
      userClear () {
        this.userText = ''
        this.firstClose = false
        this.btnstyle = true
      },
      // 用户名输入框
      bindKeyInput: function (e) {
        this.userText = e.mp.detail.value
        let accountNumber = e.mp.detail.value.length
        if (accountNumber > 0) {
          this.firstClose = true
        } else {
          this.firstClose = false
        }
        if (accountNumber > 0 && this.passWord !== undefined && this.passWord.length > 5) {
          this.btnstyle = false
        } else {
          this.btnstyle = true
        }
      },
      // 密码输入框
      bindPassInput (e) {
        let accountNumber = e.mp.detail.value.length
        if (accountNumber > 5 && this.userText !== undefined && this.userText.length > 0) {
          // ('密码可以点击登陆')
          this.btnstyle = false
        } else {
          this.btnstyle = true
          // ('密码不足')
        }
      },
      async smsCodeTrue () {
        let canreaet = await this.loginByAccount({
          'UserCredential': this.UserCredential,
          'Password': this.passWord
        })
        if (canreaet.AccessToken !== undefined) {
          wx.setStorageSync('AccessToken', canreaet.AccessToken)
          wx.setStorageSync('AccessTokenExpires', canreaet.AccessTokenExpires)
          wx.setStorageSync('UserID', canreaet.UserID)
          wx.setStorageSync('Login', true)
          await this.checkUserInfoIntegrity()
          wx.reLaunch({
            url: '/pages/home/index'
          })
        } else if (canreaet.status !== undefined && canreaet.status === 461) {
          this.errorMessage = canreaet.Message
        }
      },
      // 密码可见
      passwordShow () {
        let isPass = this.ispass
        this.ispass = !isPass
      }
    }
  }
</script>

<style scoped>
  .u-input-img{
    width: 80vw;
    height: 100px;
    line-height: 100px;
    margin:0 auto ;
    border-bottom: 1px solid #cccccc;
    display: flex;
    justify-content: space-between;
  }
  .clear{
    width: 50px;
    height:100px;

    border-radius: 50%;
    color: rgba(0, 0, 0, 0.5);
    /*background-color: rgba(0, 0, 0, 0.5);*/
  }
  .closeBox{
    width: 10vw;
    height: 100px;
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
  .inputWindow{
    width: 100vw;
    height: 50vh;
    margin-top: 98px;
  }
  .u-input-phone{
    width: 70vw;
    height: 100px;
    line-height: 100px;
    margin:0 auto ;
    border-bottom: 1px solid #cccccc;
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
  .icon-search{
    width: 10vw;
    /*background: #e64340;*/
  }
  .u-input-img input{
    width: 70vw;
    height: 100px;
    line-height: 100px;
    margin:0 auto ;
    border-bottom: 1px solid #cccccc;
  }
  .errMs{
    width: 80vw;
    height: 40px;
    font-size: 28px;
    line-height: 40px;
    color: #ff5a5a;
    text-align: left;
    margin: 0 auto;
    margin-top: 28px;
  }
  .blackBtn{
    width: 500px;
    height: 88px;
    margin: 0 auto;
    margin-top: 32px;
    color: #fff;
    font-size: 32px;
    line-height: 88px;
    letter-spacing: 0;
    text-align: center;
    background-color: #ddd;
    border-radius: 100px;
  }
  .unSee{
    width: 10vw;
    height: 100px;
    /*background-color: #0bb20c;*/
  }
  .seen{
    width: 10vw;
    height: 100px;
    /*background-color: #e64340;*/
  }
  .icon-biyan:before {
    font-size: 20px;
    color: #d1d1d1;
    text-align: center;
  }
  .icon-xianshimima:before {
    font-size: 38px;
    color: #d1d1d1;
    text-align: center;
  }
  .btn {
    width: 500px;
    height: 88px;
    margin: 0 auto;
    margin-top: 32px;
    color: #fff;
    font-size: 32px;
    line-height: 88px;
    letter-spacing: 0;
    text-align: center;
    background-image: linear-gradient(47deg, #ff9800 0%, #fa0 100%);
    box-shadow: 0 1px 16px 0 rgba(236,141,0,0.31);
    border-radius: 100px;
  }
  .checkpage{
    width: 100vw;
    height: 32px;
    margin-top: 26px;
    text-align: center;
    font-size: 32px;
  }

</style>
