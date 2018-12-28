<template>
  <div class="layer" v-if="tipState">
    <div class="layer-wrap">
      <!--<div class="layer-close iconfont icon-cancel" @click="close"></div>-->
      <div class="layer-content">
        <div class="layer-title">设置</div>
        <div class="layer-container">
          <div class="input-wrap">
            <input type="text" v-model.trim="userName" :maxlength="11"  placeholder="用户名" placeholder-style="color: #CCC;font-size: 32rpx;line-height: 32px;">
          </div>
          <div class="input-wrap">
            <input type="password" v-model.trim="password" :maxlength="11" placeholder="设置密码" placeholder-style="color: #CCC;font-size: 32rpx;line-height: 32px;">
          </div>
          <div class="input-wrap">
            <input type="password" v-model.trim="confirmedPassword" :maxlength="11"  placeholder="确定密码 " placeholder-style="color: #CCC;font-size: 32rpx;line-height: 32px;">
          </div>
          <div v-if="tip.isShow" class="msg-error">
            <span v-show="tip.showIcon" class="iconfont icon-tishi"></span>
            <span :class="{'success': !tip.showIcon}">{{tip.msg}}</span>
          </div>
        </div>
        <div class="layer-btn">
          <div class="layer-btn-set" @click="complete">完成设置</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions } from 'vuex'
    export default {
      name: 'tip-set',
      props: {
        tipState: {
          type: Boolean,
          default: false
        }
      },
      data () {
        return {
          userName: '',
          password: '',
          confirmedPassword: '',
          tip: {// 标记错误提示状态
            isShow: false,
            showIcon: true,
            msg: ''
          }
        }
      },
      watch: {
        userName (val) { // 验证输入有效性
          this.validate(val, '用户名')
        },
        password (val) {
          this.validate(val, '密码')
        },
        confirmedPassword (val) {
          this.validate(val, '确认密码')
        }
      },
      methods: {
        ...mapActions('login', [
          'rebindUserWxInfo'
        ]),
        complete: Vue.iBox.debounce(async function () {
          // 数据格式验证
          this.completeValidate()
          if (this.tip.isShow) {
            console.log('不能提交')
            return false
          } else {
            // todo
            let bindToken = wx.getStorageSync('BindToken')
            let result = await this.rebindUserWxInfo({
              BindToken: bindToken,
              UserName: this.userName,
              Password: this.password,
              ConfirmedPassword: this.confirmedPassword
            })
            if (result.status === 461) {
              this.tip.isShow = true
              this.tip.msg = result.Message
              return ''
            }
            if (!result.status) {
              // todo 根据rebindUserWxInfo结果关闭弹窗
              this.$emit('tipStateFn')
              wx.showToast({
                title: '设置成功',
                icon: 'success'
              })
            } else {
              console.log('rebindUserWxInfo fail')
            }
          }
        }),
        completeValidate () {
          this.validate(this.userName, '用户名')
          if (!this.tip.isShow) {
            this.validate(this.password, '密码')
            if (!this.tip.isShow) {
              this.validate(this.confirmedPassword, ' 确认密码')
            }
          }
          if (!this.tip.isShow) {
            if (this.password !== this.confirmedPassword) {
              this.tip.isShow = true
              this.tip.msg = `两次密码输入不一致`
            } else {
              this.tip.isShow = false
              this.tip.msg = ''
            }
          }
        },
        validate (val, type) {
          if (!val) {
            this.tip.isShow = true
            this.tip.msg = `${type}不能为空`
            return ''
          } else if (!/^[a-zA-Z0-9]*$/g.test(val)) {
            this.tip.isShow = true
            this.tip.msg = `${type}请输入数字、字母或者数字和字母的组合，长度不超过11位`
            return ''
          } else {
            this.tip.isShow = false
            this.tip.msg = ''
          }
        }
      }
    }
</script>

<style lang="scss" scoped>

  .layer {
    position: fixed;
    background: rgba(0, 0, 0, 0.65);
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1500;

    .layer-wrap {
      width: 580px;
      border-radius: 16px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .layer-close {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 50px;
        color: #999;
        font-size: 24px;
        text-align: center;
        height: 50px;
        line-height: 50px;
      }
      .layer-content {
        padding: 50px 0;
        .layer-title {
          font-weight: bold;
          text-align: center;
          color: #333333;
          line-height: 36px;
          font-size: 40px;
        }
        .layer-container {
          margin-top: 30px;
          margin-bottom: 40px;
          width: 482px;
          margin-left: 49px;
          font-size: 32px;
          color: #333333;
          line-height: 44px;
          letter-spacing: -0.53px;
          .input-wrap {
            position: relative;
            height: 56px;
            line-height: 96px;
            width: 482px;
            border-bottom: 1px solid #CCCCCC;
            input {
              margin-top: 40px;
            }
            .img-btn {
              position: absolute;
              top: -22px;
              right: 0;
              display: inline-block;
              width: 140px;
              height: 60px;
              border: 1px solid #ccc;
            }
            .sms-btn {
              position: absolute;
              top: 0;
              right: 0;
              display: inline-block;
              height: 60px;
              width: auto;
              font-size: 28px;
              color: #FF8800;
              line-height: 28px;
              &.disabled {
                color: #ccc;
              }
            }
          }
          .msg-error {
            font-size: 28px;
            line-height: 40px;
            letter-spacing: 0;
            margin-top: 20px;
            color: #FF4752;
            .icon-tishi {
              font-size: 25px;
              margin-right: 10px;
            }
            .success {
              color: #008000;
            }
          }
        }
        .layer-btn {
          display: flex;
          height: 88px;
          margin-left: 40px;

          .layer-btn-set {
            width: 500px;
            font-size: 32px;
            color: #FFFFFF;
            text-align: center;
            line-height: 88px;
            background-image: linear-gradient(47deg, #FF9800 0%, #FFAA00 100%);
            box-shadow: 0 1px 16px 0 rgba(236,141,0,0.31);
            border-radius: 100px;
          }
        }
      }
    }
  }
</style>
