<template>
  <div class="task">
    <div class="task-item">
      <picker mode='selector' class="weui-btn" @change="pickerChange" @cancel="pickerCancel" :value="indexPicker" :range="taskArr.items">
        <p class="picker-p">{{currentTaskText}}/{{taskArr.totalTask}} <i class="iconfont icon-Triangle"></i></p>
      </picker>
    </div>
    <div class="task-list">
      <div class="task-list-new">
        <taskList title="新背单元" :userWordBookID="userWordBookID" :items="currentList.newList"/>
      </div>
      <div class="task-list-review">
        <taskList title="复习单元" :userWordBookID="userWordBookID" :items="currentList.reviewList"/>
      </div>
    </div>
    <div class="mark" @click="cancel" v-if="showTip">
      <div class="mark-content" @click.stop="stopGo">
        <p class="title">是否继续背诵？</p>
        <p class="content">上次背诵到 Task{{currentTask.TaskIdx}} - List{{currentTask.UnitIdx}} 列表背诵</p>
        <div class="mark-btn" @click.stop="go">继续背诵</div>
      </div>
    </div>

    <daysign @punch="punch"
             @getUserDayLabel="getUserDayLabel"
             :userInfo="userInfo"
             :userdaylabel="userdaylabel"
             v-if="isShow" />
    <canvasbox v-if="isCanvas"
               @canvasfn="canvasfn"
               :userInfo="userInfo"
               :userdaylabel="userdaylabel" />
  </div>
</template>

<script>
    import Vue from 'vue'
    import taskList from '@/components/taskList'
    import daysign from '../../components/daysign'
    import canvasbox from '@/components/canvasbox'
    import { mapState, mapActions } from 'vuex'
    import newbieGuide from '@/components/newbieGuide'
    export default {
      name: 'task',
      components: {
        taskList,
        newbieGuide,
        daysign,
        canvasbox
      },
      data () {
        return {
          indexPicker: 0,
          showTip: false,
          userWordBookID: '',
          isShow: false,
          isCanvas: false,
          userInfo: '',
          userdaylabel: ''
        }
      },
      computed: {
        ...mapState({
          currentTask: state => state.task.currentTask,
          taskArr: state => state.task.taskArr,
          currentList: state => state.task.currentList,
          taskStatus: state => state.task.taskStatus,
          punchBackgroundUrl: state => state.punch.punchBackgroundUrl
        }),
        currentTaskText () {
          return this.taskArr.items[this.indexPicker]
        }
      },
      async onLoad () {
        const userWordBookID = this.$route.query.userWordBookID
        this.userWordBookID = userWordBookID
        let isNewWordBookArr = wx.getStorageSync('isNewWordBookArr')
        isNewWordBookArr.forEach((item) => {
          console.log(item)
          console.log(item.userWordBookID === userWordBookID)
          if (item.userWordBookID === userWordBookID && !item.isNewWordBook) {
            this.showTip = true
          }
        })
        await this.getTasks({userWordBookID})
        this.indexPicker = this.currentTask.TaskIdx - 1
        this.getList(this.currentTask.TaskIdx - 1)
        this.isCanvas = false
        this.isShow = false
      },
      onShow () {
        this.setOperation(true)
        if (!this.showTip) {
          if (this.taskStatus.CurrentTask.CheckInStatus === 2) {
            if (this.taskStatus.CurrentTask.FinishStatus === 1) {
              const currInfo = JSON.parse(wx.getStorageSync('currInfo'))
              this.userInfo = wx.getStorageSync('wxUserInfo')
              this.getUserDayLabel(currInfo.userWordBookID, currInfo.taskIdx, 10, currInfo.wordBookType, 2)
              wx.setStorageSync('oneBookId', currInfo.wordBookType)
              if (this.taskStatus.AllTaskStatus === 1) {
                const currStatus = wx.getStorageSync('currStatus')
                if (parseInt(currStatus, 10) === 11) {
                  console.log(`激活词汇书成功: ${JSON.stringify(currInfo)}`)
                  this.activateP2({
                    userWordBookID: currInfo.userWordBookID
                  }).then(() => {
                    this.activeP2WordBook({
                      userWordBookID: currInfo.userWordBookID,
                      wordBookType: currInfo.wordBookType
                    })
                  })
                }
              }
            }
          }
        }
      },
      onHide () {
        this.initTaskStatus()
      },
      methods: {
        ...mapActions('card', [
          'getP1Words',
          'activateP2'
        ]),
        ...mapActions('task', [
          'getTasks',
          'getList',
          'initTaskStatus'
        ]),
        ...mapActions('book', [
          'setOperation',
          'activeP2WordBook'
        ]),
        ...mapActions('punch', [
          'userDayLabel'
        ]),
        pickerChange (e) {
          this.indexPicker = e.mp.detail.value
          this.getList(this.indexPicker)
        },
        cancel () {
          this.showTip = false
        },
        stopGo () {
        },
        go: Vue.iBox.debounce(async function () {
          wx.showToast({
            title: '玩命加载中...',
            icon: 'loading',
            mask: true,
            duration: 2000
          })
          await this.getP1Words({
            userWordBookID: this.userWordBookID,
            unitIdx: this.currentTask.UnitIdx
          })
          let currInfo = {
            userWordBookID: wx.getStorageSync('userWordBookID'),
            wordBookType: wx.getStorageSync('wordBookType'),
            taskIdx: this.currentTask.TaskIdx,
            currentList: this.currentTask.UnitIdx,
            routineIdx: this.currentTask.RoutineIdx,
            isComplete: false
          }
          wx.setStorageSync('currInfo', JSON.stringify(currInfo))
          this.$router.push({
            path: `/pages/index/index`,
            query: {
              list: this.currentTask.UnitIdx,
              userWordBookID: this.userWordBookID
            }
          })
          this.showTip = false
        }),
        punch (s) {
          this.isShow = s
        },
        canvasfn (s) {
          this.isCanvas = s
        },
        getUserDayLabel (ID, Number, bookId, status) {
          let img = this.punchBackgroundUrl.httpHost + this.punchBackgroundUrl.imgUrl[bookId].title
          this.userDayLabel({userWordBookID: ID, taskNumber: Number}).then(res => {
            this.userdaylabel = {
              titleUrl: img,
              taskNumber: Number,
              userWordBookID: ID,
              booId: bookId,
              ...res.UserDayLabel
            }
            status === 1 ? this.isCanvas = true : this.isShow = true
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
.task{
  background-color: #F3F3F3;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
}
.task-item {
  margin-top: 60px;
}
.picker-p {
  text-align: center;
  font-size: 36px;
  height: 50px;
  color: #333333;
  line-height: 50px;
}
.icon-Triangle {
  display: inline-block;
  width: 22px;
  height: 18px;
  line-height: 50px;
  position: relative;
  top: -4px;
  left: 20px;
}

.mark {
  background: rgba(0, 0, 0, .65);
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  z-index:1000;
  .mark-content {
    width: 77%;
    height: 326px;
    margin: 0 11%;
    background: #FFFFFF;
    border-radius: 16px;
    position: absolute;
    z-index: 1001;
    top: 35%;
    p {
      width: 100%;
      height: 36px;
      line-height: 36px;
      text-align: center;
    }
    .title {
      font-size: 36px;
      color: #333333;
      height: 36px;
      font-weight: bold;
      line-height: 36px;
      margin-top: 50px;
    }
    .content {
      font-size: 32px;
      color: #333333;
      text-align: center;
      line-height: 32px;
      margin: 26px auto 40px;
    }
    .mark-btn {
      background-image: linear-gradient(47deg, #FF9800 0%, #FFAA00 99%);
      box-shadow: 0 1px 16px 0 rgba(236,141,0,0.31);
      border-radius: 100px;
      height: 88px;
      width: 90%;
      line-height: 88px;
      text-align: center;
      font-size: 32px;
      color: #FFFFFF;
      margin: 40px 5% 50px;
    }
  }
}

</style>
