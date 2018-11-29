<template>
  <div class="home">
    <div class="home_bg">
    <div class="list">
      <img v-for="(item, idx) in contentArr" v-show="num === idx" :key="idx" :src="item.src" />
    </div>
    <button class="u-btn" @click="btnClick"></button>
  </div>
</div>
</template>
<script>
import list from '@/data'
export default {
  data(){
    return{
      contentArr: list.images,
      num: 0
    }
  },
  created: function () {
    this.scroll()
  },
  methods: {
    btnClick (){
      clearTimeout(this.timout);
      sessionStorage.clear()
      this.$router.push({path: '/Topic'})
    },
    scroll(){
      this.num ++;
      if(this.num === list["images"].length){
        this.num = 0;
      }
      clearTimeout(this.timout)
      this.timout =  setTimeout(()=>{
        this.scroll();
      },2000)
    },

  }
}
</script>
<style scoped>
  .home {
    width: 100%;
    height: 100%;
    font-family: 'Helvetica Neue', 'Microsoft Sans Serif', sans-serif;
  }
  .home_bg {
    width: 100%;
    height: 100%;
    background: url("https://ssl-public.langlib.com/activity/brand/images/home_bg.png") no-repeat center top;
    background-size: 100% 100%;
    position: relative;
  }
  .list {
    width: 0.9rem;
    height: 0.9rem;
    position: absolute;
    left: 50%;
    top:52%;
    transform: translate(-50%);
    overflow: hidden;
  }
  .list img {
    width: 100%;
    height: 100%;
  }
  .u-btn {
    width: 3.8rem;
    height: 0.75rem;
    background: url("https://ssl-public.langlib.com/activity/brand/images/home_btn.png") no-repeat;
    background-size: 100% 100%;
    border: none;
    outline: none;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 21%;
  }
  /*浏览器 荣耀8 9*/
  @media screen and (min-height:400px) and (max-height:520px){
    .home_bg {
      width: 100%;
      height: 100%;
      background: url("https://ssl-public.langlib.com/activity/brand/images/rongyao_homebg.png") no-repeat center top;
      background-size: 100% 100%;
      position: relative;
    }
    .list {
      width: 0.9rem;
      height: 0.9rem;
      position: absolute;
      left: 50%;
      top: 50.8%;
      -webkit-transform: translate(-50%);
      transform: translate(-50%);
      overflow: hidden;
    }
    .u-btn{
      width: 3.8rem;
      height: 0.75rem;
      background: url("https://ssl-public.langlib.com/activity/brand/images/home_btn.png") no-repeat;
      background-size: 100% 100%;
      border: none;
      outline: none;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      bottom: 20%;
    }
  }
  /*浏览器 iphone 7p 8p vivo X21A*/
  @media screen and (min-height:580px) and (max-height:625px){
    .list {
      width: 0.9rem;
      height: 0.9rem;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%);
      transform: translate(-50%);
      overflow: hidden;
    }
  }
  /*安卓 oppoR15*/
  @media screen and (min-device-height :528px) and (min-device-height :686px) {
    .home_bg {
      width: 100%;
      height: 100%;
      background: url("https://ssl-public.langlib.com/activity/brand/images/oppo_homebg.png") no-repeat center top;
      background-size: 100% 100%;
      position: relative;
    }
    .list {
      width: 0.9rem;
      height: 0.9rem;
      position: absolute;
      left: 50%;
      top: 51%;
      -webkit-transform: translate(-50%);
      transform: translate(-50%);
      overflow: hidden;
    }
  }
  /*安卓 vivo X oppoR5*/
  @media screen and (min-device-height :656px) and (min-device-height :686px) and (min-device-width :360px) {
    .home_bg {
    width: 100%;
    height: 100%;
    background: url("https://ssl-public.langlib.com/activity/brand/images/vivo_homebg.png") no-repeat center top;
    background-size: 100% 100%;
    position: relative;
    }
    .list{
      width: 0.9rem;
      height: 0.9rem;
      position: absolute;
      left: 50%;
      top: 51%;
      -webkit-transform: translate(-50%);
      transform: translate(-50%);
      overflow: hidden;
    }
    .u-btn{
      width: 3.8rem;
      height: 0.75rem;
      background: url("https://ssl-public.langlib.com/activity/brand/images/home_btn.png") no-repeat;
      background-size: 100% 100%;
      border: none;
      outline: none;
      position: absolute;
      left: 50%;
      -webkit-transform: translate(-50%);
      transform: translate(-50%);
      bottom: 24%;
    }
  }
  /*@media only screen and (min-device-width : 375px) and (min-device-height : 812px) and (-webkit-device-pixel-ratio : 3) {*/
  /*iphoneX*/
  @media only screen and (min-device-width : 375px) and (min-device-height : 812px) {
    .home_bg {
      width: 100%;
      height: 100%;
      background: url("https://ssl-public.langlib.com/activity/brand/images/X.png") no-repeat center top;
      background-size: 100% 100%;
      position: relative;
    }
    .list {
      width: 1.2rem;
      height: .9rem;
      position: absolute;
      left: 50%;
      top: 49.8%;
      transform: translate(-50%);
      overflow: hidden;
    }
    .u-btn {
      width: 3.8rem;
      height: .75rem;
      background: url("https://ssl-public.langlib.com/activity/brand/images/home_btn.png") no-repeat;
      background-size: 100% 100%;
      border: none;
      outline: none;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      bottom: 26%;
    }
  }

</style>

