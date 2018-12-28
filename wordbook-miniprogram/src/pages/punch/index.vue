<template>
  <div class="wrap">
    <div class="punch-user-box">
      <div class="punch-user-avatar" @click="userUrl">
        <img :src="userInfo.avatarUrl" alt="">
      </div>
      <div class="punch-user-name">
        {{userInfo.nickName}}
      </div>
    </div>
    <div v-if="checkInRecords!== null">
      <div class="punch-book-yes" v-if="checkInRecords.length !== 0">
        <div class="punch-book-box">
          <swiper :duration="200" :next-margin="nextmargin" @change="sliderChange">
            <div v-for="item in checkInRecords" :key="item.WordBookID">
              <swiper-item>
                <div class="punch-swiper-box">
                  <div class="punch-swiper-top-text">完成打卡</div>
                  <image :src="punchBackgroundUrl.httpHost+punchBackgroundUrl.imgUrl[item.WordBookID].background" class="slide-image"></image>
                  <div class="punch-swiper-center-text"><span>{{item.CompletedCheckInTaskAmount}}</span><span class="punch-swiper-center-text-c">次</span></div>
                  <div class="punch-swiper-bottom-text">{{item.WordBookName}}</div>
                </div>
              </swiper-item>
            </div>
          </swiper>
        </div>
        <div class="punch-calendar-box">
          <div class="title">Task 列表</div>
          <div class="task-punch" >
            <div v-for="item in checkInRecords[taskList].TaskStatus" :key="item.TaskNumber" class="task-punch-btn-box">
              <!--未完成未打卡状态-->
              <div v-if="item.CheckInStatus==2&&item.TaskCompletedStatus==2" class="task-punch-btn">
                {{item.TaskNumber}}
              </div>
              <!--已完成未打卡状态-->
              <div v-if="item.CheckInStatus==2&&item.TaskCompletedStatus==1"
                   class="task-punch-btn task-punch-btn-kong"
                   @click="getUserDayLabel(checkInRecords[taskList].UserWordBookID, item.TaskNumber, checkInRecords[taskList].WordBookID, 2)">
                {{item.TaskNumber}}
              </div>
              <!--已完成已打卡状态-->
              <div v-if="item.CheckInStatus==1&&item.TaskCompletedStatus==1" class="task-punch-btn task-punch-btn-wancheng"
                   @click="getUserDayLabel(checkInRecords[taskList].UserWordBookID, item.TaskNumber, checkInRecords[taskList].WordBookID, 1)">
                {{item.TaskNumber}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="punch-book-no" v-if="checkInRecords.length === 0">
        <div class="punch-book-no-img">
          <img src="https://ssl-static.langlib.com/miniprogram/wordbook/bg_dk_quesheng.png" alt="">
        </div>
        <div class="punch-book-no-text">
          <p class="punch-book-no-text-title">暂无打卡记录</p>
          <p class="punch-book-no-text-message">参加活动完成打卡任务可获得纸质词汇书奖励，立即去参加吧</p>
        </div>
        <div class="punch-book-no-btn" @click="punchNoBtn">去参加</div>
      </div>
    </div>
    <daysign @punch="punch"
             @getcheckInRecords="getcheckInRecords"
             @getUserDayLabel="getUserDayLabel"
             :userInfo="userInfo"
             :userdaylabel="userdaylabel"
             v-if="isShow" />
    <canvasbox v-if="isCanvas"
               @canvasfn="canvasfn"
               :userInfo="userInfo"
               :userdaylabel="userdaylabel" />
    <navBanner :selectNumber="2" />
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import daysign from '../../components/daysign'
  import navBanner from '@/components/navBanner'
  import canvasbox from '@/components/canvasbox'
  export default {
    name: 'punch',
    data () {
      return {
        nextmargin: '65px',
        taskList: 0,
        isShow: false,
        isCanvas: false,
        userInfo: '',
        userdaylabel: ''

      }
    },
    components: {
      daysign,
      navBanner,
      canvasbox
    },
    computed: {
      ...mapState({
        checkInRecords: state => state.punch.checkInRecords,
        punchBackgroundUrl: state => state.punch.punchBackgroundUrl
      })
    },
    methods: {
      ...mapActions('punch', ['getcheckInRecords', 'userDayLabel']),
      sliderChange (e) {
        this.taskList = e.mp.detail.current
      },
      punchNoBtn () {
        wx.reLaunch({
          url: '/pages/home/index'
        })
      },
      punch (s) {
        this.isShow = s
      },
      canvasfn (s) {
        this.isCanvas = s
      },
      userUrl () {
        this.$router.push('/pages/land/user')
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
      },
      userHead () {
        // let userInfo = wx.getStorageSync('wxUserInfo')
        if (this.userInfo.avatarUrl !== undefined && this.userInfo.avatarUrl !== '') {
          this.userInfo.avatarUrl = this.userInfo.avatarUrl
        } else {
          this.userInfo.avatarUrl = 'https://ssl-static.langlib.com/miniprogram/wordbook/bg-headDefault.png'
        }
      },
      loadUserInfor () {
        this.userInfo = wx.getStorageSync('wxUserInfo')
        this.userName = wx.getStorageSync('UserID')
        this.userHead()
      }
    },
    onLoad () {
      this.getcheckInRecords()
      this.userInfo = wx.getStorageSync('wxUserInfo')
      this.loadUserInfor()
    }
  }
</script>

<style lang="scss" scoped>
  .wrap{
    width: 100vw;
    height: calc(100vh - 122px);
    padding-bottom: 122px;
    overflow-x:hidden;
    overflow-y: scroll;
    .punch-user-box{
      width: 100vw;

      .punch-user-avatar{
        width: 180rpx;
        height: 180rpx;
        margin: 0 auto;
        text-align: center;
        background: url("https://ssl-static.langlib.com/miniprogram/wordbook/icon_dk_touxianghui.png") no-repeat;
        background-size: cover;
        img{
          width: 112rpx;
          height: 112rpx;
          border-radius: 50%;
          margin-top:90rpx;
          transform: translateY(-50%);
        }
      }
      .punch-user-name{
        width: 100vw;
        font-size: 32rpx;
        letter-spacing: 0;
        text-align: center;
        line-height: 32px;
      }
    }
    .punch-book-box{
      margin-top: 29rpx;
      width: 100vw;
      padding-left: 70rpx;
      swiper{
        width: 100vw;
        height: 352rpx;
        .punch-swiper-box{
          .punch-swiper-top-text{
            width: 608rpx;
            position: absolute;
            top:43rpx;
            left:0;
            font-size: 28rpx;
            color: #FFFFFF;
            letter-spacing: 0;
            line-height: 28rpx;
            text-align: center;
          }
          .punch-swiper-center-text{
            width: 608rpx;
            position: absolute;
            top:80rpx;
            left:0;
            font-size: 140rpx;
            color: #FFFFFF;
            line-height: 140rpx;
            text-align: center;

            .punch-swiper-center-text-c{
              font-size: 28rpx;
              color: #FFFFFF;
              line-height: 28rpx;
            }
          }
          .punch-swiper-bottom-text{
            width: 608rpx;
            position: absolute;
            left:0;
            bottom:49rpx;
            text-align: center;
            font-size: 32rpx;
            color: #333333;
            line-height: 28rpx;
          }
          image{
            width: 608rpx;
            height: 352rpx;
          }
        }
      }
    }

    .punch-calendar-box{
      width: 100vw;
      margin-top: 25rpx;

      .title{
        font-size: 32rpx;
        color: #333333;
        letter-spacing: 0;
        padding-left: 90rpx;
      }
      .task-punch{
        padding: 0 73rpx;
        display: flex;
        flex-direction:row;
        flex-wrap:wrap;
        justify-content:flex-start;
        .task-punch-btn-box{
          margin-left: 25rpx;
          margin-top: 32rpx;
          .task-punch-btn{
            width: 74rpx;
            height: 41rpx;
            background: url("https://ssl-static.langlib.com/miniprogram/wordbook/icon_dk_bukedian.png") no-repeat;
            background-size: cover;
            font-size: 28.8rpx;
            color: #CCCCCC;
            letter-spacing: 0;
            text-align: center;
            line-height: 28.8rpx;
            padding-top: 46rpx;
          }
          .task-punch-btn-kong{
            background: url("https://ssl-static.langlib.com/miniprogram/wordbook/icon_dk_kong.png") no-repeat;
            color: #FF8800;
            background-size: cover;
          }

          .task-punch-btn-wancheng{
            background: url("https://ssl-static.langlib.com/miniprogram/wordbook/icon_dk_wancheng.png") no-repeat;
            color: #FF8800;
            background-size: cover;
          }
        }
      }
    }
    .punch-book-no{
      width:100vw;
      margin-top: 66rpx;
      .punch-book-no-img{
        width: 100vw;
        text-align: center;
        img{
          width: 354rpx;
          height: 352rpx;
        }
      }
      .punch-book-no-text{
        .punch-book-no-text-title{
          font-size: 36rpx;
          color: #333333;
          letter-spacing: 0;
          text-align: center;
          line-height: 36rpx;
          padding-top: 20rpx;
        }
        .punch-book-no-text-message{
          width: 513rpx;
          margin: 29rpx auto 0;
          font-size: 28rpx;
          color: #A8B0B2;
          letter-spacing: 0;
          text-align: center;
          line-height: 50rpx;
        }
      }
      .punch-book-no-btn{
        width: 240rpx;
        height: 80rpx;
        background-image: linear-gradient(-47deg, #FF9800 0%, #FFAA00 100%);
        border-radius: 162rpx;
        font-size: 32rpx;
        color: #FFFFFF;
        text-align: center;
        line-height: 80rpx;
        margin: 56rpx auto 0;
      }
    }
  }
</style>
