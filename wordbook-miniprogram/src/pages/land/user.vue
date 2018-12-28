<template>
    <div class="userCenter">
      <div class="userInformation">
        <div class="headPortrait flexBtBox">
          <div class="userText">头像</div>
          <div class="userHeaderImg">
            <img :src="userInfo.avatarUrl" alt="">
          </div>
        </div>
        <div class="nickName flexBtBox headPortrait">
          <div class="userText">昵称</div>
          <div class="userInforText">{{userInfo.nickName}}</div>
        </div>
        <div class="userNumber flexBtBox headPortrait">
          <div class="userText">账号</div>
          <div class="userInforText">{{userName}}</div>
        </div>
      </div>
      <div class="switchUser" @click="checkUser">
        <div class="textBtn">切换账号</div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'user',
      data () {
        return {
          userName: '',
          userInfo: ''
        }
      },
      methods: {
        checkUser () {
          this.$router.push({
            path: '/pages/land/index'
          })
        },
        userHead () {
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
        this.loadUserInfor()
      }
    }
</script>

<style scoped>
  .userCenter{
    padding-top: 22px;
    height: 99vh;
    background-color: #f3f3f3;
  }
  .userInformation{
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 60px;
    background-color: #fff;
  }
  .headPortrait{
    height: 110px;
    line-height: 101px;
  }
  .userText{
    font-size: 32px;
    color: #333;
  }
  .userHeaderImg{
    width: 101px;
    height: 101px;
    border-radius: 50%;
    background-color: #D8D8D8 ;
  }
  .userHeaderImg img{
    width: 101px;
    height: 101px;
    border-radius: 50%;
    background-color: #D8D8D8 ;
  }
  .userInforText{
    font-size: 32px;
    color: #AEAEAE;
  }
  .flexBtBox{
    display: flex;
    justify-content:space-between
  }
  .switchUser{

    height: 45px;
    margin: 22px auto 0;
    font-size: 32px;
    text-align: center;
    line-height: 45px;
    color: #333;
  }
  .textBtn{
    width: 100vw;
    height: 97px;
    font-size: 32px;
    line-height: 97px;
    text-align: center;
    background-color: #fff;
  }
</style>
