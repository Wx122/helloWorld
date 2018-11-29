<template>
  <div class="answer">
    <div class="answer_bg">
      <!--分享英文-->
      <div v-if="show" class="box_bg">
        <div class="box_img" >
          <img :src="resImg.enUrl" alt="">
        </div>
        <div class="enBottom bottom">
          <button class="btn_share" @click="btnClick('rsEnUrl')"></button>
          <button class="btn_result" @click="chackCn"></button>
        </div>
      </div>
      <!--分享中文-->
      <div v-else class="box_bg" >
        <div class="box_img_cn" >
          <img :src="resImg.cnUrl" alt="">
        </div>
        <div class="cnBottom bottom">
          <button class="btn_shareCn" @click="agin()"></button>
          <button class="btn_share" @click="btnClick('rsCnUrl')"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import list from '@/data'
  export default {
    data(){
      return{
        show:true,
        data: '',
        resImg:{
          ...JSON.parse(sessionStorage.getItem("result"))
        }
      }
    },
    methods: {
      btnClick (type){
        this.$router.push({
          name: 'Result',
          params: {
            img:this.resImg[type]
          }
        })
      },
      chackCn(){
        this.show = false
      },
      agin(){
        sessionStorage.clear(this.resImg)
        window.location.href = "#/"
      }
    }
  }
</script>
<style scoped>
  .answer {
    width: 100%;
    height: 100%;
    font-family: 'Helvetica Neue', 'Microsoft Sans Serif', sans-serif;
  }
  .answer_bg {
    width: 100%;
    height: 100%;
    background: url("https://ssl-public.langlib.com/activity/brand/images/exercise_bg.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
  }
  .box_bg {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .box_img {
    width: 4rem;
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%);
  }
  .box_img_cn {
    width: 4rem;
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%);
  }
  .box_img_cn>img {
    display: inline-block;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .box_img>img {
    display: inline-block;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .bottom {
    width: 4.5rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    bottom: 1.4rem;
    transform: translate(-50%,0);
    display: flex;
    justify-content: space-around;
  }
  button {
    width: 2rem;
    height: .75rem;
    border:none;
    outline: none;
  }
  .btn_share {
    background: url("https://ssl-public.langlib.com/activity/brand/images/answer_share.png") no-repeat center;
    background-size: 100%;
  }
  .btn_result {
    background: url("https://ssl-public.langlib.com/activity/brand/images/answer_result.png") no-repeat center;
    background-size: 100%;
  }
  .btn_shareCn {
    background: url("https://ssl-public.langlib.com/activity/brand/images/answer_agin.png") no-repeat center;
    background-size: 100%;
  }
  /*浏览器 荣耀8 9*/
  @media screen and (min-height:400px) and (max-height:520px){
    .answer_bg {
      width: 100%;
      height: 100%;
      background: url("https://ssl-public.langlib.com/activity/brand/images/rongyao_bg.png") no-repeat center;
      background-size: 100% 100%;
      position: relative;
    }
    .box_img,.box_img_cn {
      width: 4rem;
      position: absolute;
      left: 50%;
      top: 20%;
      transform: translate(-50%);
    }
    .bottom {
      width: 4.5rem;
      height: 1rem;
      position: absolute;
      left: 50%;
      bottom: 12%;
      transform: translate(-50%);
      display: -ms-flexbox;
      display: flex;
      justify-content: space-around;
    }
  }
  /*安卓 vivo X oppoR5*/
  @media screen and (min-device-height :656px) and (min-device-height :686px) and (min-device-width :360px) {
    .answer_bg {
      width: 100%;
      height: 100%;
      background: url("https://ssl-public.langlib.com/activity/brand/images/vivo_bg.png") no-repeat center;
      background-size: 100% 100%;
      position: relative;
    }
    .box_img,.box_img_cn {
    width: 4rem;
    position: absolute;
    left: 50%;
    top: 22%;
    transform: translate(-50%);
    }
    .bottom {
    width: 4.5rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    bottom: 20%;
    transform: translate(-50%);
    display: -ms-flexbox;
    display: flex;
    justify-content: space-around;
    }
  }
  /*iphoneX*/
  @media only screen and (min-device-width : 375px) and (min-device-height : 812px) and (-webkit-device-pixel-ratio : 3) {
    .box_img, .box_img_cn {
      width: 4rem;
      position: absolute;
      left: 50%;
      top: 22%;
      transform: translate(-50%);
    }
    .bottom {
      width: 4.5rem;
      height: 1rem;
      position: absolute;
      left: 50%;
      bottom: 15%;
      transform: translate(-50%);
      display: -ms-flexbox;
      display: flex;
      justify-content: space-around;
    }
  }
  /*iphone6 7 plush*/
  @media only screen and (device-width : 414px) and (device-height : 736px) and (-webkit-device-pixel-ratio : 3) {
    .box_img .box_img_cn {
      width: 4rem;
      position: absolute;
      left: 50%;
      top: 22%;
      transform: translate(-50%);
    }
    .bottom {
      width: 4.5rem;
      height: 1rem;
      position: absolute;
      left: 50%;
      bottom: 12%;
      transform: translate(-50%);
      display: -ms-flexbox;
      display: flex;
      justify-content: space-around;
    }
  }
</style>
