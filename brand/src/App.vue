<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  import wxShare from '@/util/wxJssdk.js'
export default {
  name: 'App',
  data() {
    return {

    }
  },
  mixins: [wxShare],
  methods: {
    setShare() {
      const shareInfo = {
        title: `原来我的心里一直住着个小妖精！`,
        desc: `测一测你是哪种动物？`,
        link: window.location.href,
        img: 'https://ssl-public.langlib.com/activity/brand/images/share_wx.jpg'
      }
      this.wechatShare(shareInfo)
    },
  },

  created(){
    this.setShare()
  }
}
</script>

<style>
html,body,#app {
  width: 100%;
  height: 100%;
  background: #1c1c9e;
  font-family: 'Helvetica Neue', 'Microsoft Sans Serif', sans-serif;
}
</style>
