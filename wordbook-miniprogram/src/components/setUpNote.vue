<template>
  <div class="wrap">
    <div class="set-up-note">
      <div class="set" @click="setfn">
        <img src="https://ssl-static.langlib.com/miniprogram/wordbook/icon_shezhi.png" />
      </div>
      <div class="play" @click="playfn">
        <img class="horn" :src="isPlay ? bofang : bofangbudong" />
      </div>
      <div class="note" @click="notefn">
        <img src="https://ssl-static.langlib.com/miniprogram/wordbook/icon_biji.png" />
      </div>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import bofang from '../../static/images/icon_bofang.gif'
    import bofangbudong from '../../static/images/icon_bofangbudong.png'
    import { mapState, mapActions } from 'vuex'
    export default {
      name: 'set-up-note',
      data () {
        return {
          isPlay: false,
          bofang,
          bofangbudong
        }
      },
      computed: {
        ...mapState({
          innerAudioContext: state => state.card.innerAudioContext
        })
      },
      mounted () {
        this.innerAudioContext.onStop(() => {
          this.isPlay = false
        })
        this.innerAudioContext.onEnded(() => {
          this.isPlay = false
        })
        this.innerAudioContext.onPlay(() => {
          this.isPlay = true
        })
      },
      methods: {
        ...mapActions('slide', [
          'isslide'
        ]),
        ...mapActions('card', [
          'playAudio'
        ]),
        ...mapActions('book', [
          'setOperation'
        ]),
        setfn () {
          this.isslide()
        },
        notefn: Vue.iBox.debounce(function () {
          this.setOperation(true)
          this.$router.push({
            path: `/pages/index/note`
          })
        }),
        playfn () {
          if (this.innerAudioContext.paused) {
            this.playAudio()
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .wrap {
    background-color: #eee;
    width: 100vw;
    height: 10vh;
    line-height: 10vh;
    position: fixed;
    left: 0;
    bottom: 0;

    .set-up-note {
      width: 94vw;
      height: 10vh;
      line-height: 10vh;
      margin: 0 3vw;
      position: relative;

      .set {
        width: 80px;
        height: 125px;
        position: absolute;
        left: 0;
        top: 10px;

        img {
          width: 48px;
          height: 38px;
          margin: 50%;
          transform: translate(-50%);
        }
      }

      .play {
        width: 110px;
        height: 110px;
        background-color: #F29D38;
        border-radius: 50%;
        position: absolute;
        top: -55px;
        left: 50%;
        transform: translateX(-50%);
        .horn {
          display: block;
          width: 63px;
          height: 55px;
          margin: 0 auto;
          padding-top: 28px;
        }
      }

      .note {
        width: 80px;
        height: 125px;
        position: absolute;
        right: 0;

        top: 0;

        img {
          width: 48px;
          height: 48px;
          margin: 50%;
          transform: translate(-50%);
        }
      }
    }
  }
</style>
