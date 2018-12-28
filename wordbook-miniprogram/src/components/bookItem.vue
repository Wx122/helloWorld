<template>
  <div>
    <div class="book-item" v-for="(item, index) in bookLists" :key="item" @click="detailed(item, index)">
      <div class="item-img">
        <img :src="item.imgUrl">
      </div>
      <div class="item-describe">
        <div class="describe-title">{{item.WordBookName}}</div>
        <div class="describe-word">单词量： {{item.TotalWords}}词</div>
        <div class="describe-progress">背诵进度： {{item.Progress}}%</div>
        <div class="describe-btn">
          <div class="describe-btn-left" @click.stop="remember(item, index)">强化记忆</div>
          <div class="describe-btn-right" :class="{'describe-btn-active': item.CurrStatus === 11}" @click.stop="leak(item, index)">查漏补缺</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    import Vue from 'vue'
    import {mapActions} from 'vuex'
    export default {
      name: 'book-item',
      props: ['bookLists'],
      data () {
        return {
        }
      },
      methods: {
        ...mapActions('book', [
          'sortUserWordBookList'
        ]),
        detailed: Vue.iBox.debounce(function (item, index) {
          wx.setStorageSync('userWordBookID', item.UserWordBookID)
          wx.setStorageSync('wordBookType', item.WordBookType)
          wx.setStorageSync('currStatus', item.CurrStatus)
          this.$router.push({
            path: `/pages/book/detail`,
            query: {
              item: JSON.stringify(item)
            }
          })
          this.sortUserWordBookList(index)
        }),
        remember: Vue.iBox.debounce(function (item, index) {
          wx.setStorageSync('userWordBookID', item.UserWordBookID)
          wx.setStorageSync('wordBookType', item.WordBookType)
          wx.setStorageSync('currStatus', item.CurrStatus)
          this.$router.push({
            path: `/pages/task/index`,
            query: {
              userWordBookID: item.UserWordBookID
            }
          })
          this.sortUserWordBookList(index)
        }),
        leak: Vue.iBox.debounce(function (item, index) {
          if (item.CurrStatus === 21) {
            this.$router.push({
              path: `/pages/downloadApp/index`
            })
            this.sortUserWordBookList(index)
          }
        })
      }
    }
</script>

<style lang="scss" scoped>
  .book-item {
    width: 100vw;
    margin: 30px;
    overflow-x: hidden;
    display: flex;
    border-bottom: 2px solid #E7E7E7;
    padding-bottom: 30px;
    .item-img {
      flex: 3;
      img {
        width: 170px;
        height: 240px;
        box-shadow:0 8px 10px #D9C7BE;
      }
    }
    .item-describe {
      flex: 7;
      .describe-title {
        height: 34px;
        font-size: 34px;
        color: #333333;
        letter-spacing: 0;
        line-height: 34px;
        margin: 10px 0 30px;
      }
      .describe-word, .describe-progress {
        opacity: 0.8;
        font-size: 28px;
        color: #999999;
        letter-spacing: 0;
        line-height: 28px;
        margin: 16px 0;
      }
      .describe-btn {
        margin: 30px 0;
        display: flex;
        .describe-btn-left, .describe-btn-right {
          width: 200px;
          height: 60px;
          line-height: 60px;
          border: 2px #E7E7E7 solid;
          border-radius: 100px;
          text-align: center;
          font-size: 24px;
          letter-spacing: 0;
          color: #333333;
          margin-right: 30px;
        }
        .describe-btn-active {
          color: #CCCCCC;
        }
      }
    }
  }
</style>
