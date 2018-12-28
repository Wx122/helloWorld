<template>
<div class="land">
  <div class="checkbox">
    <div class="account" @click="totleLand(true)">账号登录</div>
    <div class="message" @click="totleLand(false)">短信快捷登录</div>
  </div>
  <div class="checkbox">
    <div class="accountBottom" :class="computedClassStr" ></div>
    <div class="messageBottom" :class="computedTClassStr" ></div>
  </div>
  <switchAccount v-if="isAccount" ></switchAccount>
  <messageLand v-if="!isAccount" ></messageLand>
  <div class="checkBoxborder"></div>

</div>
</template>

<script>
  import messageLand from '@/components/messageLand'
  import switchAccount from '@/components/switchAccount'
  export default {
    name: 'index',
    components: {
      messageLand,
      switchAccount
    },
    computed: {
      computedClassStr () {
        return this.isAccount ? 'bgcool' : ''
      },
      computedTClassStr () {
        return this.isAccount ? '' : 'bgcool'
      }
    },
    data () {
      return {
        isAccount: true
      }
    },
    methods: {
      totleLand (string) {
        this.isAccount = string
      }
    }
  }
</script>

<style scoped>
  .land{
    width: 100vw;
    padding-top: 87px;

  }
  .checkbox{
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  .account{
    width: 140px;
    height: 32px;
    font-size: 32px;
  }
  .message{
    width: 200px;
    height: 32px;
    font-size: 32px;
  }
  .accountBottom{
    width: 128px;
    height: 6px;
    border-radius: 3px;
  }
  .bgcool{
    background-image: linear-gradient(47deg, #ff9800 0%, #fa0 100%);
  }
  .messageBottom{
    width: 192px;
    height: 6px;
    border-radius: 3px;
  }

</style>
