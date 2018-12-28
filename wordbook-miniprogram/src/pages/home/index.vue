<template>
  <div class="homeBgpage">
    <div class="activityHeader"></div>
    <div class="bookList">
      <div class="activityBook" v-for="(item,index) in bookList" :key="index">
        <div>
          <bookImgBgc :jionPeoPleNum="item.ParticipateCount" :buttonTitle="btnInfo.title" :navTourl="btnInfo.navTourl" :id="item.Id" :wordBookId="item.WordBookID" :colorClass="btnInfo.colorClass" @tipStateFn="tipStateBtn"></bookImgBgc>
        </div>
        <div>
        <jioneBtn :buttonTitle="btnInfo.title" :navTourl="btnInfo.navTourl" :id="item.Id" :wordBookId="item.WordBookID" :colorClass="btnInfo.colorClass" @tipStateFn="tipStateBtn"></jioneBtn>
        </div>
      </div>
    </div>
    <div>
      <nav-Banner :selectNumber="0" @tipStateFn="tipStateBtn"></nav-Banner>
    </div>
    <div>
      <tipLogin :tipState="tipState.login" @tipStateFn="tipStateLogin"/>
    </div>
    <div>
      <tipLayer :tipState="tipState.layer" @tipStateFn="tipStateLayer"/>
    </div>
    <div>
      <tipSet :tipState="tipState.set" @tipStateFn="tipStateSet"/>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapActions } from 'vuex'
  import navBanner from '@/components/navBanner'
  import jioneBtn from '@/components/jioneActivityBtn'
  import bookImgBgc from '@/components/bookImgBtn'
  import tipLayer from '@/components/tipLayer'
  import tipLogin from '@/components/tipLogin'
  import tipSet from '@/components/tipSet'

  export default {
    name: 'index.vue',
    components: {
      navBanner,
      jioneBtn,
      bookImgBgc,
      tipLayer,
      tipLogin,
      tipSet
    },
    computed: {
    },
    data () {
      return {
        tipState: {
          login: false,
          layer: false,
          set: false
        },
        bookList: [],
        btnInfo: {
          'title': 'mianfei',
          'colorClass': 'jionBtn',
          'navTourl': '/pages/activityDetails/master'
        },
        shareImg: 'https://ssl-static.langlib.com/miniprogram/wordbook/activity/img_fenxiang_toutu.png'
      }
    },
    onShareAppMessage (res) {
      let shareText = '可能是最好的背单词软件，分享给你~'
      return {
        title: shareText,
        path: this.shareUrl,
        imageUrl: this.shareImg
      }
    },
    onLoad: function (options) {
      if (options.isLand === 'nologin') {
        this.inspectAccessToken()
        wx.showToast({
          title: '登录过期请重新登录！',
          icon: 'none',
          mask: true,
          duration: 2000
        })
      }
      if (options.pageId !== undefined && options.pageId === '2') {
        let jumpPage = '/pages/activityDetails/friend?activeId=' + options.activeId
        this.$router.push({
          path: jumpPage,
          relaunch: true
        })
      }
      this.isLogin()
    },
    methods: {
      ...mapActions('login', [
        'getUserInfo',
        'loginByCode',
        'checkUserInfoIntegrity',
        'loginByWxCode'
      ]),
      ...mapActions('activity', [
        'wordBookActivities'
      ]),
      // 判断是否登陆成功的用户如何展示页面
      isLogin () {
        this.getBookList()
      },
      // 书的ID
      bookNumber (nowBook, bookNumber) {
        wx.setStorageSync('nowBook', nowBook)
        wx.setStorageSync('bookNumber', bookNumber)
      },
      // 活动词汇书列表
      async getBookList () {
        let bookArry = await this.wordBookActivities()
        this.bookList = bookArry
      },
      // 1检验AccessToken
      async inspectAccessToken () {
        let token = wx.getStorageSync('AccessToken')
        if (token) {
          // 检查token的有效性
          this.tokenOverdue()
        } else {
          this.getopenIdTap()
        }
      },
      // 3拿小程序的登陆code
      async getopenIdTap () {
        let that = this
        wx.login({
          success: function (res) {
            that.getCodeAccessToken(res.code)
          }
        })
      },
      // 4拿code换取登陆的AccessToken
      async getCodeAccessToken (code) {
        // 因tost必须成对出现，这个位置删除
        wx.hideToast()
        // this.loginByCode({
        //   'Code': code,
        //   'AppID': AppID
        // })
        const result = await this.loginByWxCode({
          Appid: Vue.$iBox.global.AppID,
          Code: code
        })
        wx.setStorageSync('AccessToken', result.AccessToken)
        wx.setStorageSync('AccessTokenExpires', result.AccessTokenExpires)
        wx.setStorageSync('UserID', result.UserID)
        wx.setStorageSync('OpenID', result.OpenID)
        wx.setStorageSync('HasCellPhone', result.HasCellPhone)
      },
      // 2检查token是否过期
      async tokenOverdue () {
        // let res = await this.getUserInfo()
        // if (res.UserName !== undefined) {
        //   wx.setStorageSync('Login', true)
        // } else if (res.status !== undefined && res.status === 460) {
        //   // token过期重新获取token(
        //   wx.setStorageSync('Login', false)
        //   this.getopenIdTap()
        // } else if (res.status !== undefined && res.status === 401) {
        //   // token过期重新获取token(
        //   wx.setStorageSync('Login', false)
        //   this.getopenIdTap()
        // }
        let result = await this.checkUserInfoIntegrity()
        if (result.UserID) {
          wx.setStorageSync('Login', true)
          wx.setStorageSync('UserID', result.UserID)
          wx.setStorageSync('HasCellPhone', result.HasCellPhone)
        } else {
          // token过期重新获取token
          wx.setStorageSync('Login', false)
          this.getopenIdTap()
        }
      },
      tipStateLogin (type) {
        console.log(type)
        if (type === 'cancel') {
          this.tipState.login = false
          this.tipState.layer = false
          this.tipState.set = false
        } else if (type === 'bindSent') {
          this.tipState.login = false
          this.tipState.layer = true
          this.tipState.set = false
        }
      },
      tipStateLayer (type) {
        if (type === 'cancel') {
          this.tipState.login = true
          this.tipState.layer = false
          this.tipState.set = false
        } else if (type === 'continueBind') {
          this.tipState.login = false
          this.tipState.layer = false
          this.tipState.set = true
        }
      },
      tipStateSet () {
        this.tipState.login = false
        this.tipState.layer = false
        this.tipState.set = false
      },
      // 授权确认没有绑定手机号
      tipStateBtn () {
        this.tipState.login = true
        this.tipState.layer = false
        this.tipState.set = false
      }
    }
  }
</script>

<style scoped>
  .homeBgpage{
    width: 100vw;
    height: 90vh;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-bottom: 100px;
    background: url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/bg_quanpingbeijing.png") ;
    background-size:100vw 93vh;
  }
  .activityHeader{
    width: 100vw;
    height: 43vw;
    background: url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/bg_toumingtoutu.png");
    background-size:100vw 40vw ;
    margin-top: -10px;
  }
  .bookList{
    width: 94vw;
    margin: 0 auto;
    padding-top: 30px;
    /*padding-bottom: 48px;*/
    border-radius: 8px;
    display: flex;
    justify-content:space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    background-color: #fff;

  }
  .activityBook{
    width: 25vw;
    margin-bottom: 30px;
  }
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
    width: 25vw;
    height: 8vw;
  }
  button::after{ border: none; }

</style>
