<script>
  import Vue from 'vue'
  import { mapActions } from 'vuex'
export default {
    mpType: 'app',
    async onLaunch () {
      // 检查用户网络情况
      wx.getNetworkType({
        success: function (res) {
          if (res.networkType === 'none') {
            wx.showToast({
              title: '网络异常，请检查您的网络情况',
              icon: 'none',
              duration: 3000
            })
          }
        }
      })
      wx.checkSession({
        success: () => {
          console.log('success')
          this.inspectAccessToken()
        },
        fail: () => {
          console.log('fail')
          this.getopenIdTap()
        }
      })
    },
    methods: {
      ...mapActions('login', [
        'getUserInfo',
        'loginByCode',
        'checkUserInfoIntegrity',
        'loginByWxCode'
      ]),
      // 1检验AccessToken
      async inspectAccessToken () {
        let token = wx.getStorageSync('AccessToken')
        if (token) {
          console.log('有token', token)
          // 检查token的有效性
          this.tokenOverdue()
        } else {
          console.log('没有token')
          this.getopenIdTap()
        }
      },
      // 3拿小程序的登陆code
      async getopenIdTap () {
        let that = this
        wx.login({
          success: async (res) => {
            that.getCodeAccessToken(res.code)
          }
        })
      },
      // 4拿code换取登陆的AccessToken
      async getCodeAccessToken (code) {
        try {
          await this.loginByWxCode({
            AppID: Vue.iBox.global.AppID,
            Code: code
          })
          console.log('code code')
        } catch (e) {
          console.log(e)
        }
      },
      // 2检查token是否过期
      async tokenOverdue () {
        let result = await this.checkUserInfoIntegrity()
        if (!result.UserID) {
          this.getopenIdTap()
        }
      }
    }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200px 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
