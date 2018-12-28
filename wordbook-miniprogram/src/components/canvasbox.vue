<template>
  <div class="wrap" @click="hiddens">
    <canvas canvas-id="shareImg" style="width: 556rpx; height: 990rpx" @click.stop="canvasBtn"></canvas>
    <div v-if="btnOff" class="daysign-card-btn" @click.stop="save"></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'canvasbox',
    data () {
      return {
        canbe: '',
        btnOff: false,
        day: this.calDay(this.userdaylabel.CheckInDays)
      }
    },
    props: ['userInfo', 'userdaylabel'],
    onReady () {
      this.drawCanvas()
    },
    computed: {
      ...mapState({
        httpHost: state => state.punch.punchBackgroundUrl.httpHost,
        quotations: state => state.punch.quotations
      })
    },
    methods: {
      hiddens () { //  关闭窗口
        this.btnOff = false
        wx.hideLoading()
        this.$emit('canvasfn', false)
      },
      canvasBtn () { // 阻止点击canvas区域关闭当前弹窗

      },
      save () {
        let nextGet = new Date().getTime()
        if (!this.canbe || (nextGet - this.canbe) > 3000) {
          this.drawPicture()
        }
        this.canbe ? this.canbe = this.canbe : this.canbe = new Date().getTime()
      },
      rpx (w) { // 计算自适应rpx
        let width = 750 / wx.getSystemInfoSync().windowWidth
        return w / width
      },
      downloadImg (link) { // 封装下载远程图片
        return new Promise((resolve, reject) => {
          wx.downloadFile({
            url: link,
            success: res => {
              if (res.statusCode === 200) {
                resolve(res.tempFilePath)
              }
            }
          })
        })
      },
      binary (n) { //  计算绘图剧中
        return this.rpx(556) / 2 - this.rpx(n) / 2
      },
      drawCanvas () {
        const ctx = wx.createCanvasContext('shareImg')
        wx.showLoading({title: '正在生成截图'})
        let cvdata = this.userdaylabel
        let avatarurlWidth = this.rpx(73)
        let avatarurlHeigth = this.rpx(73)
        let bg = ''
        let titlePath = ''
        let avatarPath = ''
        let textImg = ''
        this.downloadImg(this.httpHost + 'img_rq_beijing.png')
          .then(path => {
            bg = path
            this.downloadImg(cvdata.titleUrl)
              .then(path => {
                titlePath = path
                this.downloadImg(this.userInfo.avatarUrl)
                  .then(path => {
                    avatarPath = path
                    this.downloadImg(this.httpHost + this.quotations[this.day])
                      .then(path => {
                        textImg = path
                        //  绘制背景
                        ctx.beginPath()
                        ctx.drawImage(bg, 0, 0, this.rpx(556), this.rpx(990))
                        ctx.save()
                        //   绘制头像
                        ctx.arc(avatarurlWidth / 2 + this.binary(73), avatarurlHeigth / 2 + this.rpx(215), avatarurlWidth / 2, 0, 2 * Math.PI)
                        ctx.clip()
                        ctx.drawImage(avatarPath, this.binary(73), this.rpx(215), avatarurlWidth, avatarurlHeigth)
                        ctx.restore()
                        //  绘制标题
                        ctx.drawImage(titlePath, this.binary(420), this.rpx(50), this.rpx(420), this.rpx(70))
                        //  绘制用户名
                        this.drawText(ctx, 'center', '#333333', 24, this.userInfo.nickName, this.rpx(556) / 2, this.rpx(332))
                        // 绘制打卡天数
                        this.drawText(ctx, 'center', '#333333', 75, cvdata.CheckInDays, this.rpx(170), this.rpx(495))
                        //  绘制累计背诵
                        this.drawText(ctx, 'center', '#333333', 75, cvdata.CurrTotalCount, this.rpx(360), this.rpx(495))
                        //  绘制每日提示语
                        ctx.drawImage(textImg, this.binary(488), this.rpx(593), this.rpx(488), this.rpx(168))
                        //  绘制打卡时间
                        this.drawText(ctx, 'center', '#f5c5a1', 21, this.dayTime(cvdata.CheckInTime), this.rpx(556) / 2, this.rpx(804))
                        ctx.draw(false, () => {
                          this.btnOff = true
                          this.canbe = ''
                          wx.hideLoading()
                        })
                      })
                  })
              })
          })
      },
      drawText (ctx, align, color, size, text, x, y) { //  文字绘制
        ctx.setTextAlign(align)
        ctx.setFillStyle(color)
        ctx.setFontSize(this.rpx(size))
        ctx.fillText(text, x, y)
      },
      drawPicture () {
        this.canbe = false
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: this.rpx(556),
          height: this.rpx(990),
          destWidth: 750,
          destHeight: 1334,
          canvasId: 'shareImg',
          fileType: 'png',
          success: res => {
            this.saveImageToPhotosAlbum(res.tempFilePath)
          }
        })
      },
      saveImageToPhotosAlbum (val) {
        if (val) {
          wx.saveImageToPhotosAlbum({
            filePath: val,
            success: res => {
              wx.showToast({
                title: '图片保存成功',
                icon: 'success',
                duration: 2000,
                complete: () => {
                  this.$emit('canvasfn', false)
                }
              })
            },
            fail: err => {
              console.log('失败', err)
              if (err.errMsg === 'saveImageToPhotosAlbum:fail:auth denied' || err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
                wx.openSetting({
                  success (settingdata) {
                    console.log(settingdata)
                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                      console.log('获取权限成功，再次点击图片保存到相册')
                    } else {
                      console.log('获取权限失败')
                    }
                  }
                })
              }
            }
          })
        }
      },
      calDay (day) { // 每日提示语轮换
        return day % 14 === 0 ? 14 : (day % 14)
      },
      dayTime (date) { // 时间转换
        // let newDates = date.split('T')[0].split('-')
        // return newDates.join('.')
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
    canvas{
      margin: 0 auto;
    }
    .daysign-card-btn{
      width: 289px;
      height: 73px;
      background: url("https://ssl-static.langlib.com/miniprogram/wordbook/btn_rq_baocun.png") no-repeat;
      background-size: cover;
      margin: 30px auto 0;
    }
  }
</style>
