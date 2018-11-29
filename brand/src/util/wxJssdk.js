const wx = require('weixin-js-sdk');
const axios = require('axios');

export default {
  methods: {
    wechatShare(info) {

      // 访问后台接口获取微信参数
      axios.get('/brand/weixin/getWxCongfig',{params: {
            url:location.href.split('#')[0]
          }
        }
      ).then(res => {

        wx.config({
          debug: false,
          appId: res.data.AppID, // 必填，公众号的唯一标识
          timestamp: parseInt(res.data.TimeStamp,10), // 必填，生成签名的时间戳
          nonceStr: res.data.NonceStr, // 必填，生成签名的随机串
          signature: res.data.Signature, // 必填，签名，见附录1
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ] // 必填，需要使用的 JS 接口列表，所有JS接口列表见附录2
        })
      })
        .catch(err => {
          console.log(err)

        });
      wx.ready(() => {

        const share_title = info.title

        const share_desc = info.desc

        const share_link = info.link

        const share_img = info.img

        wx.showOptionMenu()

        wx.onMenuShareTimeline({

          title: share_title, // 分享标题

          desc: share_desc,

          link: share_link, // 分享链接

          imgUrl: share_img, // 分享图标

          success: function() {

            Toast('已成功分享到朋友圈')

          },

          cancel: function() {

            Toast('已取消分享')

          }

        })

        wx.onMenuShareAppMessage({

          title: share_title, // 分享标题

          desc: share_desc, // 分享描述

          link: share_link, // 分享链接

          imgUrl: share_img, // 分享图标

          success: function() {

            Toast('已成功分享给您的朋友')

          },
          cancel: function() {
            Toast('已取消分享')

          }

        })

      })

    }

  }
}

