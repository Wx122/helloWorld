<template>
  <div class="wrap" v-if="isShow">
    <div class="slide" :animation="animationData2">
      <ul>
        <li>
          <div>自动播放单词发音</div>
          <switch class="switch" @change="switch1Change" color="#FF8800" :checked="isAutoPlay"/>
        </li>
        <li>
          <div>自动切换单词</div>
          <switch @change="switch2Change" color="#FF8800" :checked="isChangeCard"/>
        </li>
      </ul>
    </div>
    <div class="unslide" :animation="animationData3" @click="notslide"></div>
  </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
      name: 'side-drawer',
      props: {
      },
      data () {
        return {
          isShow: false,
          isAutoPlay: false,
          isChangeCard: false,
          animationData2: {},
          animationData3: {}
        }
      },
      computed: {
        ...mapState({
          isSlide: state => state.slide.isSlide,
          autoPlay: state => state.book.autoPlay,
          changeCard: state => state.book.changeCard,
          operation: state => state.book.operation
        })
      },
      watch: {
        isSlide (val) {
          val === true ? this.slide() : this.unslide()
        },
        operation (val) {
          // this.isAutoPlay = wx.getStorageSync('userStatus').autoPlay
          // this.isChangeCard = wx.getStorageSync('userStatus').changeCard
        }
      },
      onLoad () {
      },
      mounted () {
        this.isAutoPlay = wx.getStorageSync('userStatus').autoPlay
        this.isChangeCard = wx.getStorageSync('userStatus').changeCard
      },
      methods: {
        ...mapActions('slide', [
          'notslide'
        ]),
        ...mapActions('book', [
          'setUserStatusAutoPlay',
          'setUserStatusChangeCard',
          'setOperation'
        ]),
        switch1Change (e) {
          this.isAutoPlay = e.mp.detail.value
          this.setUserStatusAutoPlay(e.mp.detail.value)
        },
        switch2Change (e) {
          this.isChangeCard = e.mp.detail.value
          this.setUserStatusChangeCard(e.mp.detail.value)
        },
        unslide () {
          this.setOperation(false)
          // 动画二
          let animation2 = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease'
          })
          animation2.left(-100 + 'vw').step()
          this.animationData2 = animation2.export()
          // 动画三
          let animation3 = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease'
          })
          animation3.height(0 + 'vh').step()
          this.animationData3 = animation3.export()
          setTimeout(() => {
            this.isShow = false
          }, 300)
        },
        slide () {
          this.isShow = true
          this.setOperation(true)
          setTimeout(() => {
            // 动画二
            let animation2 = wx.createAnimation({
              duration: 500,
              timingFunction: 'ease'
            })
            animation2.left(0).step()
            this.animationData2 = animation2.export()
            // 动画三
            let animation3 = wx.createAnimation({
              duration: 500,
              timingFunction: 'ease'
            })
            animation3.height(100 + 'vh').step()
            this.animationData3 = animation3.export()
          }, 0)
        }
      }
    }
</script>

<style lang="scss" scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  /*background:transparent;*/
  color: #fff;
　background-color:rgba(0,0,0,0.65);
  z-index:1000;
  position:fixed;
  top:0;
  bottom:0;
  left:0;

  .slide {
    flex: 4;
    width: 80%;
    height: 100vh;
    /*background:transparent;*/
    /*color: #fff;*/
    background-color:rgba(255,255,255,1);
    /*background-color: #fff;*/
    color: #000;
    /*opacity: 1;*/
    z-index:1001;
    position:fixed;
    top:0;
    bottom:0;
    left:-100vw;

    ul {
      padding: 96px 40px 0;

      li {
        width: 96%;
        height: 88px;
        border-top: 2px solid #E5E5E5;
        border-bottom: 2px solid #E5E5E5;
        margin-top: -2px;
        /*margin: 20px 10px;*/
        display: flex;
        justify-content: space-between;
        div {
          margin-top: 20px;
          height: 32px;
          width: 320px;
          margin-left: 30px;
          font-size: 32px;
          color: #333333;
          line-height: 48px;
        }
        switch {
          margin-top: 13px;
          margin-right: 20px;
        }
      }
    }
  }

  .unslide {
    flex: 1;
    width: 20%;
    height: 100vh;
    z-index:1001;
    position:fixed;
    top:0;
    bottom:0;
    right:0;
  }

}

</style>
