<template>
  <div class="wrap">
    <div class="list-wrap">
      <div class="list-item" v-for="(item, index) in list" :key="item" @click="review(item, index)" :class="{'current-item-active': (index == currentIndex) && isScale}">
        <div class="item-left">
          <div class="item-word">{{item.WP}}</div>
          <div class="item-annotation">{{item.CM}}</div>
        </div>
        <div class="item-star">
          <img :src="'https://ssl-static.langlib.com/miniprogram/wordbook/icon_xing' +item.F +'.png'">
        </div>
      </div>
    </div>
    <div class="list-tum">
      <p class="tum-left" @click="previous">上一轮</p>
      <p class="tum-right" @click="next">下一轮</p>
    </div>
  </div>
</template>

<script>
    // import xing from '../../static'
    import {mapState, mapActions} from 'vuex'
    export default {
      name: 'step5',
      props: ['list', 'isCurrent'],
      data () {
        return {
          currentIndex: 0,
          isScale: false
        }
      },
      computed: {
        ...mapState({
          innerAudioContext: state => state.card.innerAudioContext
        })
      },
      methods: {
        ...mapActions('card', [
          'changeCurrent',
          'playAudio',
          'stopPlay'
        ]),
        review (item, index) {
          this.currentIndex = index
          this.changeCurrent(this.currentIndex)
          this.isScale = false
          setTimeout(() => {
            this.isScale = true
          })
          this.playAudio()
          // if (this.innerAudioContext.paused) {
          //   this.playAudio()
          // } else {
          //   this.stopPlay()
          //   setTimeout(() => {
          //     this.playAudio()
          //   }, 0)
          // }
        },
        previous () {
          this.$emit('changeStep', -1)
        },
        next () {
          this.$emit('changeStep', 1)
        }
      }
    }
</script>

<style lang="scss" scoped>
  .wrap {
    width: 100vw;
    background-color: #ffffff;
    box-sizing: border-box;
    .list-wrap {
      height: 87vh;
      overflow-y: scroll;
      .list-item {
        width: 92%;
        height: 150px;
        /*line-height: 150px;*/
        margin: 0 4%;
        background: #FFFFFF;
        border-bottom: 1px solid #E6E6E6;
        padding-left: 10px;
        position: relative;
        display: flex;
        justify-content: space-between;
        .item-left {
          margin: 30px 0;
          .item-word {
            height: 36px;
            line-height: 36px;
            font-size: 36px;
            color: #333333;
            margin-bottom: 22px;
          }
          .item-annotation {
            height: 40px;
            font-size: 32px;
            color: #999999;
            line-height: 48px;
            width: 593px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .item-star {
          width: 50px;
          height: 50px;
          line-height: 150px;
          img {
            width: 50px;
            height: 50px;
          }
        }
      }
      .current-item-active {
        animation: choiseScale 0.5s linear;
      }
    }
    .list-tum {
      box-sizing: border-box;
      height: 98px;
      line-height: 98px;
      width: 100vw;
      padding: 0 30px;
      position: fixed;
      bottom: 0;
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      p {
        flex: 1;
        font-size: 32px;
        color: #FF8800;
      }
      .tum-right {
        text-align: right;
      }
    }
  }
  @keyframes choiseScale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05, 1.02);
    }
    100% {
      transform: scale(1);
    }
  }

</style>
