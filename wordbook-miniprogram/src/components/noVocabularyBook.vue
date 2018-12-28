<template>
   <div class="vocabulary">
     <div class="vocabulary-img">
       <img src="https://ssl-static.langlib.com/miniprogram/wordbook/icon_wucihuishu.png" alt="">
     </div>
     <div class="vocabulary-title">暂无词汇书</div>
     <p class="vocabulary-content">参加活动可免费获得词汇书，立即去参加活动领取吧！</p>
     <div class="btn" @click="goJoin">去参加</div>
   </div>
</template>

<script>
    export default {
      data () {
        return {
        }
      },
      methods: {
        goJoin () {
          wx.reLaunch({
            url: '/pages/home/index'
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  .vocabulary {
    width: 100vw;
    .vocabulary-img {
      width: 323px;
      height: 303px;
      margin: 18vh auto 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .vocabulary-title {
      margin-top: 32px;
      font-size: 36px;
      color: #333333;
      letter-spacing: 0;
      text-align: center;
      line-height: 36px;
    }
    .vocabulary-content {
      width: 513px;
      margin: 29px auto 56px;
      font-size: 28px;
      color: #A8B0B2;
      letter-spacing: 0;
      text-align: center;
      line-height: 50px;
    }
    .btn {
      width: 240px;
      height: 80px;
      margin: 0 auto;
      line-height: 80px;
      text-align: center;
      background-image: linear-gradient(47deg, #FF9800 0%, #FFAA00 100%);
      border-radius: 162px;
      font-size: 32px;
      color: #FFFFFF;
      letter-spacing: 0;
    }
  }
</style>
