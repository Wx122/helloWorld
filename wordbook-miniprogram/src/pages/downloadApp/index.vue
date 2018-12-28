<template>

  <div class="wrap">
    <div class="download-app-text">恭喜您已进入查漏补缺阶段</div>
    <div class="download-app-log"></div>
    <div class="download-app-btn" @click="copy('https://itunes.apple.com/cn/app/id491843464')"></div>
    <div class="download-app-btn download-app-btn2" @click="copy('http://sj.qq.com/myapp/detail.htm?apkName=com.langlib.wordbook')"></div>
    <div class="download-app-text-small">
      复制链接到浏览器下载朗播词汇 APP <br/>
      开启查漏补缺之旅吧！
    </div>
  </div>

</template>

<script>
  export default {
    name: 'downloadApp',
    methods: {
      copy (data) {
        wx.setClipboardData({
          data: data,
          success: res => {
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 2000,
              mask: true
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

  .wrap{
    width:100vw;
    height:100vh;
    background:#fff;
    display: flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    overflow:hidden;


    .download-app-text{
      font-size: 44rpx;
      text-align: center;
      color:#FF8800;
      margin-top: 140rpx;
    }
    .download-app-log{
      margin-top: 49rpx;
      width: 628rpx;
      height: 392rpx;
      background:url("https://ssl-static.langlib.com/miniprogram/wordbook/icon_logo.png") no-repeat;
      background-size: cover;

    }
    .download-app-btn{
        margin-top: 60rpx;
        width: 590rpx;
        height: 88rpx;
        background: url("https://ssl-static.langlib.com/miniprogram/wordbook/btn_ios.png") no-repeat;
        background-size: cover;
        border-radius: 100rpx;
    }
    .download-app-btn2{
      margin-top: 40rpx;
      background: url("https://ssl-static.langlib.com/miniprogram/wordbook/btn_android.png") no-repeat;
      background-size: cover;
    }
    .download-app-text-small{
      margin-top: 50rpx;
      width: 532rpx;
      height: 100rpx;
      font-size: 32rpx;
      color: #333333;
      text-align: center;
      line-height: 50rpx;
    }
  }

</style>
