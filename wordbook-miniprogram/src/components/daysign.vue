<template>
  <div class="wrap">
    <div class="wrap-box">
      <div class="daysign-card-box">
        <div class="daysign-card-box-close" @click="close"></div>
        <div class="daysign-card-title">
          <img :src="userdaylabel.titleUrl" alt="">
        </div>
        <div class="daysign-card-avatar">
          <img :src="userInfo.avatarUrl" alt="">
        </div>
        <div class="daysign-card-username">
          {{userInfo.nickName}}
        </div>
        <div class="daysign-card-number">
          <div class="left">
            <div class="top-title">打卡天数</div>
            <div class="number">
              {{userdaylabel.CheckInDays}}
            </div>
            <div class="text">Days</div>
          </div>
          <div class="right">
            <div class="top-title">累计背诵</div>
            <div class="number">
              {{userdaylabel.CurrTotalCount}}
            </div>
            <div class="text">Words</div>
          </div>
        </div>
        <div class="daysign-card-quotations">
          <img :src="httpHost + quotations[day]" alt="">
        </div>
        <div class="daysign-card-time">
          {{time}}
        </div>
      </div>
      <div class="daysign-card-btn" @click="save"></div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'daysign',
    data () {
      return {
        time: this.dayTime(this.userdaylabel.CheckInTime),
        day: this.calDay(this.userdaylabel.CheckInDays)
      }
    },
    props: ['userInfo', 'userdaylabel'],
    computed: {
      ...mapState({
        httpHost: state => state.punch.punchBackgroundUrl.httpHost,
        quotations: state => state.punch.quotations
      })
    },
    methods: {
      ...mapActions('punch', ['userWordBookID']),
      close () { //  关闭窗口
        this.$emit('punch', false)
      },
      save () {
        this.userWordBookID({
          userWordBookID: this.userdaylabel.userWordBookID,
          TaskNumber: this.userdaylabel.taskNumber
        }).then(res => {
          console.log(res)
          if (res.Message === 'success') {
            wx.showToast({
              title: '打卡成功',
              icon: 'success',
              duration: 1000,
              complete: () => {
                this.$emit('getcheckInRecords')
                this.$emit('punch', false)
                this.$emit('getUserDayLabel',
                  this.userdaylabel.userWordBookID,
                  this.userdaylabel.taskNumber,
                  this.userdaylabel.booId, 1)
              }
            })
          } else {
            wx.showToast({
              title: '打卡失败！请尝试重新点击打卡',
              icon: 'none',
              duration: 1000
            })
          }
        })
      },
      calDay (day) { // 每日提示语轮换
        if (day) {
          return day % 14 === 0 ? 14 : (day % 14)
        } else {
          return ''
        }
      },
      dayTime (date) { // 事件转换
        if (date) {
          const checkInDate = new Date(date)
          // let newDates = date.split('T')[0].split('-')
          let y = checkInDate.getFullYear()
          let m = checkInDate.getMonth() + 1
          m = m < 10 ? '0' + m : m
          let d = checkInDate.getDate()
          d = d < 10 ? ('0' + d) : d
          return `${y}.${m}.${d}`
        } else {
          return ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap{
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.65);
    position: absolute;
    left: 0;
    top:0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    .daysign-card-box{
      width: 556rpx;
      height: 990rpx;
      background: url("https://ssl-static.langlib.com/miniprogram/wordbook/bg_rq_siji2.png") no-repeat;
      background-size: cover;
      border-radius: 15px;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items:center;

      .daysign-card-box-close{
        width: 70rpx;
        height: 70rpx;
        background: url("https://ssl-static.langlib.com/miniprogram/wordbook/btn_rq_close.png") no-repeat;
        background-size: cover;
        position: absolute;
        top:0;
        right: 0;
      }
      .daysign-card-title{
        width: 420rpx;
        height: 70rpx;
        margin-top:50rpx;
        img{
          width: 420rpx;
          height: 70rpx;
        }
      }
      .daysign-card-avatar{
        width: 68rpx;
        height: 68rpx;
        border-radius: 50%;
        margin: 96rpx auto 0;
        border:5rpx solid #fff;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .daysign-card-username{
        font-size: 24rpx;
        font-weight: normal;
        color: #333333;
        margin-top: 12rpx;
        height: 40rpx;
        line-height: 40px;

      }
      .daysign-card-number{
        display: flex;
        flex-direction: row;
        justify-content: center;
        text-align: center;
        margin-top: 60rpx;
        height: 140rpx;
        color: #333333;
        .left,.right{
          width: 220rpx;
          .top-title{
            font-size: 24rpx;
          }
          .number{
            font-size: 75rpx;
            line-height: 1;
          }
          .text{
            font-size: 21rpx;
            color:#f4c09a;
          }
        }
      }
      .daysign-card-quotations{
        color:#333;
        width:488rpx;
        height: 168rpx;
        margin-top: 53rpx;
        img{
          width:488rpx;
          height: 168rpx;
        }
      }
      .daysign-card-time{
        font-size: 21rpx;
        color: #f5c5a1;
        margin-top: 17rpx;
      }
    }
    .daysign-card-btn{
      width: 290rpx;
      height: 72rpx;
      background: url("https://ssl-static.langlib.com/miniprogram/wordbook/btn_rq_daka.png") no-repeat;
      background-size: cover;
      margin: 30rpx auto 0;
    }
  }
</style>
