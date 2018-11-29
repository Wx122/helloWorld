<template>
  <div class="result" >
    <div class="mark" v-if="show" @touchstart="toggleShow">
      <img src="../assets/images/alert.png"/>
    </div>
    <img :src="url" alt="">
  </div>
</template>

<script>
  import list from '@/data'
  export default {
    data(){
      return{
        show:true,
        url: this.$route.params.img,
      }
    },
    created(){
      if(sessionStorage.getItem('resultImage')){
        this.url = sessionStorage.getItem('resultImage');
      } else {
        sessionStorage.setItem('resultImage',this.$route.params.img);
      }
    },
    methods: {
      toggleShow(e){
          this.show = false
        }
    }
  }
</script>
<style scoped>
  .result {
    width: 100%;
    height: 100%;
  }
  .mark {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    z-index: 999;

  }
  .mark>img{
    display: inline-block;
    width: 3rem;
    height: 1.8rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

  }
  .result>img {
    width: 100%;
    height: 100%;
  }

</style>
