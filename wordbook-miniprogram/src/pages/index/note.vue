<template>
    <div class="note">
      <div class="write">
        <textarea class="write-content" maxlength="-1" @blur="blur" placeholder-class="placeholder-class"  placeholder="请输入你要创建的笔记" v-model.lazy.trim="answer"></textarea>
      </div>
      <div class="btn" :class="{'btn-action': saveAction}" @click="saveNote">保存</div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapState, mapActions} from 'vuex'
    export default {
      data () {
        return {
          list: [],
          answer: '',
          saveAction: false
        }
      },
      computed: {
        ...mapState({
          currentCardIndex: state => state.card.currentCardIndex
        })
      },
      onLoad () {
        this.list = JSON.parse(wx.getStorageSync('list'))
        this.setOperation(true)
      },
      mounted () {
        this.answer = this.list.item[this.currentCardIndex].N
      },
      methods: {
        ...mapActions('card', [
          'updateNote'
        ]),
        ...mapActions('book', [
          'setOperation'
        ]),
        blur () {
          this.saveAction = this.answer.length > 0
        },
        saveNote: Vue.iBox.debounce(async function () {
          await this.updateNote({
            userWordBookID: wx.getStorageSync('userWordBookID'),
            SysWordID: this.list.item[this.currentCardIndex].Id,
            Phase: 1,
            Note: this.answer
          })
          this.setOperation(false)
          wx.navigateBack({
            delta: 1
          })
          this.answer = ''
          this.saveAction = false
        })
      }
    }
</script>

<style scoped>
  .note {
    width: 100vw;
    border-top: 1px solid #CCCCCC;
  }
  .write {
    background: #FFFFFF;
    padding: 40px 30px;
    font-size: 32px;
    line-height: 32px;
  }
  .write-content {
    width: 100%;
    height: 460px;
    font-size: 32px;
    color: #333;
    line-height: 40px;
  }
  .placeholder-class {
    color: #999999;
    line-height: 48px;
  }
  .btn {
    width: 78%;
    height: 88px;
    line-height: 88px;
    margin-left: 11%;
    background: #DDDDDD;
    border-radius: 100px;
    font-size: 32px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
  }
  .btn-action {
    background-image: linear-gradient(47deg, #FF9800 0%, #FFAA00 100%);
    box-shadow: 0 1px 16px 0 rgba(236,141,0,0.31);
  }
</style>
