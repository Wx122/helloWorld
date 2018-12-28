<template>
    <div class="wrap">
      <div class="content-list" v-if="isVocabularyBook === 1">
        <bookItem :bookLists="userWordBookList" />
      </div>
      <noVocabularyBook v-if="isVocabularyBook === 2"/>
      <navBanner :selectNumber="1" />
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import navBanner from '@/components/navBanner'
    import noVocabularyBook from '@/components/noVocabularyBook'
    import bookItem from '@/components/bookItem'
    export default {
      name: 'index',
      components: {
        bookItem,
        noVocabularyBook,
        navBanner
      },
      data () {
        return {
          isShowLoading: false
        }
      },
      computed: {
        ...mapState({
          userWordBookList: state => state.book.userWordBookList
        }),
        isVocabularyBook () {
          if (this.userWordBookList === null) {
            this.isShowLoading = true
            return 0
          } else if (this.userWordBookList.length > 0) {
            this.isShowLoading = false
            return 1
          } else if (this.userWordBookList.length === 0) {
            this.isShowLoading = false
            return 2
          }
        }
      },
      async onLoad () {
        // await this.getUserWordBookList()
      },
      mounted () {
        if (this.isShowLoading) {
          wx.showToast({
            title: '加载中',
            icon: 'loading'
          })
          setTimeout(() => {
            wx.hideToast()
          }, 4000)
        } else {
          wx.hideLoading()
        }
      },
      methods: {
        ...mapActions('book', [
          'getUserWordBookList'
        ])
      }
    }
</script>

<style lang="scss" scoped>
 .content-list {
   height: 90vh;
   width: 100vw;
   overflow-y: scroll;
   overflow-x: hidden;
   padding-bottom: 30px;
 }
</style>
