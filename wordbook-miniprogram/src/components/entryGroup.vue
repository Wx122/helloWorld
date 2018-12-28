<template>
  <div class="popMoon" v-if="popShow">
    <div class="pop">
      <div class="popIcon"></div>
      <div class="popText">下个页面回复暗号"{{activeId}}" 获取大师二维码</div>
      <div ><button open-type="contact" class="popButton" :session-from="activeId"></button></div>
    </div>
    <div class="close" @click="closePop"></div>
  </div>
</template>

<script>
  export default {
    name: 'helpPop',
    onLoad: function (options) {
      console.log(this.activeId, '他的activeId')
    },
    props: {
      teacherNumber: {
        type: Number
      },
      activeId: {
        type: Number
      }
    },
    data () {
      return {
        popShow: true
        // activeId: 1
      }
    },
    methods: {
      closePop () {
        this.popShow = false
      }
    }
  }
</script>

<style scoped>
  .popMoon{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    padding-top: 400px;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .pop{
    width: 580px;
    height: 231px;
    margin: 0 auto;
    padding-top: 173px;
    background-color: #fff;
    border-color: #fff;
    border-radius: 16px;
    position: relative;
  }
  .popText{
    width: 352px;
    height: 79px;
    line-height: 32px;
    margin: 0 auto;
    font-size: 32px;
    text-align: center;
  }
  .popIcon{
    width: 369px;
    height: 323px;
    margin: 0 auto;
    margin-top: -130px;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/icon_tc_yizhuli.png");
    background-size: 369px 323px;
    position: absolute;
    top: -60px;
    left: 105px;
  }
  .popButton{
    width: 187px;
    height: 73px;
    border-radius: 20px;
    margin: 0 auto;
    margin-top: 51px;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/btn_tc_zhidaole.png");
    background-size: 187px 73px;
  }
  .close{
    width: 110px;
    height: 110px;
    margin: 170px auto 0;
    background:url("https://ssl-static.langlib.com/miniprogram/wordbook/activity/btn_tc_guanbi.png");
    background-size: 110px 110px;
  }
</style>

<!--<template>-->
    <!---->
<!--</template>-->

<!--<script>-->
  <!--export default {-->
    <!--name: "entryGroup"-->
  <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
