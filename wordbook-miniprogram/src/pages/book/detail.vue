<template>
    <div class="detail">
      <div class="detail-wrap">
        <div class="detail-top">
          <div class="top-img">
            <img :src="list.imgUrl" alt="">
          </div>
          <h4 class="title">{{list.WordBookName}}</h4>
          <div class="tag">
            <span v-for="tag in tags" :key="tag">{{tag}}</span>
          </div>
          <div class="progress">背诵进度： {{list.Progress}}%</div>
        </div>
        <div class="detail-content">
          <div class="content-title">内容介绍</div>
          <p class="content">{{list.wordBookDetail}}</p>
        </div>
      </div>
      <div class="remember-btn" @click="remember">强化记忆</div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'
    export default {
      name: 'detail',
      props: ['bookLists'],
      data () {
        return {
          list: {},
          tags: []
        }
      },
      computed: {
        ...mapState({
          userWordBookList: state => state.book.userWordBookList
        })
      },
      onLoad () {
        const item = JSON.parse(this.$route.query.item)
        this.tags = item['Tags'].split(',')
        this.list = item
      },
      methods: {
        remember: Vue.iBox.debounce(function () {
          this.$router.push({
            path: `/pages/task/index`,
            query: {
              userWordBookID: this.list.UserWordBookID
            }
          })
        })
      }
    }
</script>

<style lang="scss" scoped>
.detail {
  width: 100vw;
  height: 100vh;
  .detail-wrap {
    height: 90vh;
    overflow-y: scroll;
    .detail-top {
      height: 50vh;
      width: 94vw;
      margin: 0 3vw 32px;
      border-bottom: 2px #E4E4E4 solid;
      .top-img {
        width: 240px;
        height: 340px;
        margin: 40px auto;
        img {
          width: 240px;
          height: 340px;
        }
      }
      .title {
        text-align: center;
        font-size: 36px;
        color: #333333;
        letter-spacing: 0;
        height: 36px;
        font-weight: bold;
        line-height: 36px;
        margin-bottom: 30px;
      }
      .tag {
        text-align: center;
        margin-bottom: 30px;
        span {
          display: inline-block;
          padding: 8px 12px;
          height: 40px;
          margin-right: 16px;
          border: 1px solid #CCCCCC;
          border-radius: 6px;
          font-size: 24px;
          color: #999999;
          letter-spacing: 0;
          line-height: 40px;
        }
      }
      .progress {
        text-align: center;
        opacity: 0.8;
        font-size: 28px;
        color: #333333;
        letter-spacing: 0;
        line-height: 24px;

      }
    }
    .detail-content {
      width: 94vw;
      /*height: 50vh;*/
      margin: 0 3vw;
      /*overflow-y: scroll;*/
      .content-title {
        width: 172px;
        font-size: 36px;
        color: #333333;
        font-weight: bold;
        letter-spacing: 1.29px;
        text-align: center;
        line-height: 36px;
        position: relative;
        left: 15px;
        margin: 32px 0 24px;
        &:before {
          display: inline-block;
          position: absolute;
          left: -15px;
          content: '';
          width: 7px;
          height: 32px;
          line-height: 36px;
          background-image: linear-gradient(47deg, #FF9800 0%, #FFAA00 100%);
          border-radius: 100px;
        }
      }
      .content {
        /*height: 320px;*/
        /*overflow-y: scroll;*/
        font-size: 32px;
        color: #333333;
        letter-spacing: 0;
        line-height: 50px;
      }
    }
  }
  .remember-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 32px;
    padding: 34px 0;
    line-height: 32px;
    background: #FFFFFF;
    box-shadow: 0 -3px 8px 0 rgba(0,0,0,0.05);
    text-align: center;
    font-size: 32px;
    color: #FF8800;
    letter-spacing: 0;
  }
}
</style>
