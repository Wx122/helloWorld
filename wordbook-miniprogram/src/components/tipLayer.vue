<template>
  <div class="layer" v-if="tipState">
    <div class="layer-wrap">
      <div class="layer-content">
        <div class="layer-title">温馨提示</div>
        <div class="layer-container">您输入的手机号已绑定其他账户，如果继续绑定，该手机号及对应账户将与当前微信绑定，当前微信注册的账户需要重新设置账户名和密码 ，是否继续绑定？</div>
        <div class="layer-btn">
          <div class="layer-btn-cancel" @click="cancel">取消</div>
          <div class="layer-btn-bind" @click="continueBind">继续绑定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'tip-layer',
      props: {
        tipState: {
          type: Boolean,
          default: false
        }
      },
      methods: {
        cancel () {
          this.$emit('tipStateFn', 'cancel')
        },
        continueBind () {
          this.$emit('tipStateFn', 'continueBind')
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
        }
        .layer-btn {
          display: flex;
          height: 88px;
          margin-left: 40px;
          .layer-btn-cancel {
            width: 240px;
            background: #FFFFFF;
            border: 2px solid #FF7400;
            border-radius: 100px;
            font-size: 32px;
            color: #FF6900;
            text-align: center;
            line-height: 88px;
            margin-right: 20px;
          }
          .layer-btn-bind {
            width: 240px;
            background-image: linear-gradient(47deg, #FF9800 0%, #FFAA00 99%);
            border-radius: 100px;
            font-size: 32px;
            color: #FFFFFF;
            text-align: center;
            line-height: 88px;
          }
        }
      }
    }
  }
</style>
