<template>
  <div class="topic">
      <div>
        <h4>{{datas[count].topic_name}}</h4>
        <ul >
          <li v-for="(items,inx) in datas[count].topic_answer" @click="choosed(inx,items.is_standard_answer)">{{items.answer_name}}</li>
        </ul>
      </div>
  </div>
</template>

<script>
  import list from '@/data'
  import result from '@/util/result.js'
  export default {
      data(){
        return{
          count: 0,
          itemId: null, //题目ID
          choosedNum: null, //选中答案索引
          choosedId:null, //选中答案id
          datas:  list.topic
        }
      },
    created() {
      if(parseInt(sessionStorage.getItem("count"),10) === 5){
        this.count = 5;
      }
    },
    methods: {
      //选中的答案信息
      choosed(id,type){
        ++ this.count;
        this.choosedNum = type;
        this.$rule.setOption(type);
        if(this.count === 6) {
          sessionStorage.setItem("result",JSON.stringify(this.$rule.getResult(result)));
          sessionStorage.setItem("count",5);
          this.$router.push('/Answer');
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .topic {
    width: 100%;
    height: 100%;
    background: url("https://ssl-public.langlib.com/activity/brand/images/exercise_bg.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    font-family: 'Helvetica Neue', 'Microsoft Sans Serif', sans-serif;
  }
  .topic div {
    width: 4.6rem;
    position: absolute;
    left: 50%;
    top: 2.8rem;
    transform: translate(-50%);
  }
  .topic div h4{
    width: 4.6rem;
    line-height: 23px;
    word-break: break-all;
    text-align: left;
    font-size: 16px;
    font-weight: bolder;
    color: #12fafb;
    font-family: 'Helvetica Neue', 'Microsoft Sans Serif', sans-serif;
  }
  .topic div ul {
    margin-top:20px;
  }
  .topic ul li {
    width: 4.4rem;
    height: .96rem;
    text-align: left;
    padding-left: .3rem;
    line-height: .96rem;
    color: #0b0f96;
    font-size: 12px;
    font-weight: 500;
    /* margin-top: 0px; */
    background: url("https://ssl-public.langlib.com/activity/brand/images/exercise_btn.png") no-repeat center;
    background-size: 100% 100%;
    margin-top: 10px;
    font-family: 'Helvetica Neue', 'Microsoft Sans Serif', sans-serif;
  }
  /*浏览器 荣耀8 9*/
  @media screen and (min-height:400px) and (max-height:520px){
    .topic {
      width: 100%;
      height: 100%;
      background: url("https://ssl-public.langlib.com/activity/brand/images/rongyao_bg.png") no-repeat center;
      background-size: 100% 100%;
      position: relative;
    }
    .topic div {
      width: 4.6rem;
      position: absolute;
      left: 50%;
      top: 20%;
      transform: translate(-50%);
    }
  }
  /*安卓 vivo X oppoR5*/
  @media screen and (min-device-height :656px) and (min-device-height :686px) and (min-device-width :360px) {
    .topic {
      width: 100%;
      height: 100%;
      background: url("https://ssl-public.langlib.com/activity/brand/images/vivo_bg.png") no-repeat center;
      background-size: 100% 100%;
      position: relative;

    }
    .topic div {
      width: 4.6rem;
      position: absolute;
      left: 50%;
      top: 20%;
      transform: translate(-50%);
    }
  }
  /*iphoneX*/
  @media only screen and (min-device-width : 375px) and (min-device-height : 812px) and (-webkit-device-pixel-ratio : 3) {
    .topic h4 {
      width: 5.6rem;
      line-height: 23px;
      word-break: break-all;
      text-align: left;
      font-size: 18px;
      font-weight: bolder;
      color: #12fafb;
    }

  }

</style>
