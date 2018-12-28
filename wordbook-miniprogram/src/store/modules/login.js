import Vue from 'vue'
const state = {
  OpenID: '',
  UnionID: '',
  AccessToken: '',
  AccessTokenExpires: '',
  UserID: '',
  imgCode: {
    imgUrl: ''
  }
}
const mutations = {
  CAPTCHA (state, data) {
    state.imgCode.imgUrl = `data:image/svg+xml;utf8,${Vue.iBox.decodeBase64(data)}`
  },
  refreshLoginByWxUnionID: (state, data) => {
    if (data.AccessToken !== undefined) {
      wx.setStorageSync({
        'AccessToken': data.AccessToken,
        'AccessTokenExpires': data.AccessTokenExpires,
        'UserID': data.UserID,
        'Login': true
      })
    } else {
      console.log('短信登陆接口验证不成功', data)
    }
  },
  byCodeLogin: (state, data) => {
    if (data.AccessToken === '') {
      wx.setStorageSync('OpenID', data.WxOpenID)
      wx.setStorageSync('Login', false)
    } else if (data.AccessToken !== '') {
      wx.setStorageSync('Login', true)
      wx.setStorageSync('OpenID', data.WxOpenID)
      wx.setStorageSync('AccessToken', data.AccessToken)
      wx.setStorageSync('AccessTokenExpires', data.AccessTokenExpires)
      wx.setStorageSync('UserID', data.UserID)
    }
  },
  codeTokenLogin: (state, data) => {
    if (data.AccessToken !== undefined && data.AccessToken !== '') {
      // 成功登陆的情况
      wx.setStorageSync('Login', true)
    } else if (data.status !== undefined) {
      wx.setStorageSync('Login', false)
    }
  }
}
const actions = {
  // 新用户用加密code换token 不用->loginByWxEncryptedData
  async loginByEncryptedData ({commit}, params = {}) {
    const result = await Vue.iBox.http('loginApi.loginByEncryptedData', {...params})({method: 'post'})
    wx.setStorageSync('OpenID', result.WxOpenID)
    wx.setStorageSync('AccessToken', result.AccessToken)
    wx.setStorageSync('AccessTokenExpires', result.AccessTokenExpires)
    wx.setStorageSync('UserID', result.UserID)
    commit('codeTokenLogin', result)
    return result
  },
  // 通过code登陆获取AccessToken  不用-->loginByWxCode
  async loginByCode ({commit}, params = {}) {
    const result = await Vue.iBox.http('loginApi.loginByCode', {...params})({method: 'post'})
    commit('byCodeLogin', result)
    return result
  },
  // 校验token有效性3  不用 -> checkUserInfoIntegrity
  async getUserInfo ({commit}, params = {}) {
    const result = await Vue.iBox.http('loginApi.getUserInfo', {...params})({method: 'get'})
    return result
  },
  // 获取短信验证码 不带图形验证码
  async sendSmsCode ({commit}, params = {}) {
    let result = await Vue.iBox.http('loginApi.sendValidateCode', {...params})({}, {errorAction: true})
    return result
  },
  // 图形验证码
  async getCaptcha ({commit}, params = {}) {
    const result = await Vue.iBox.http('loginApi.captcha', {...params})({method: 'get'}, {errorAction: true})
    commit('CAPTCHA', result.Captcha)
  },
  // 图形验证码发送短信
  async endValidateCodeByCaptcha ({commit}, params = {}) {
    const result = await Vue.iBox.http('loginApi.endValidateCodeByCaptcha', {...params})({method: 'post'}, {errorAction: true})
    return result
  },
  // 验证手机短信验证码
  async checkValidateCode ({commit}, params = {}) {
    const result = await Vue.iBox.http('loginApi.checkValidateCode', {...params})({method: 'post'}, {errorAction: true})
    return result
  },
  // 修改密码
  async resetPassword ({commit}, params = {}) {
    const result = await Vue.iBox.http('loginApi.resetPassword', {...params})({method: 'post'}, {errorAction: true})
    return result
  },
  // 短信登陆
  async loginByValidateCode ({commit}, params = {}) {
    const result = await Vue.iBox.http('loginApi.loginByValidateCode', {...params})({method: 'post'}, {errorAction: true})
    commit('refreshLoginByWxUnionID', result)
    return result
  },
  // 账号密码登陆
  async loginByAccount ({commit}, params = {}) {
    const result = await Vue.iBox.http('loginApi.loginByAccount', {...params})({method: 'post'}, {errorAction: true})
    commit('refreshLoginByWxUnionID', result)
    return result
  },

  // 根据微信小程序用户加密数据登录用户
  async bindCellWithEncryptedData ({commit}, params = {}) {
    const result = await Vue.iBox.http('loginApi.bindCellWithEncryptedData', {...params})({method: 'post'}, {errorAction: true})
    // todo accesstoken ,过期时间， 用户ID，用户微信openId，是否绑定手机号，绑定token（用于后续设置用户名和密码时使用），是否需要图形验证码
    if (!result.status) {
      wx.setStorageSync('AccessToken', result.AccessToken)
      wx.setStorageSync('AccessTokenExpires', result.AccessTokenExpires)
      wx.setStorageSync('UserID', result.UserID)
      wx.setStorageSync('HasCellPhone', result.HasCellPhone)
      wx.setStorageSync('BindToken', result.BindToken)
    }
    return result
  },
  // 根据微信小程序code登录用户
  async loginByWxCode ({commit}, params = {}) {
    const result = await Vue.iBox.http('loginApi.loginByWxCode', {...params})({method: 'post'}, {errorAction: true})
    // todo accesstoken ,过期时间， 用户ID，用户微信openId，是否绑定手机号
    if (result.AccessToken === '') {
      wx.setStorageSync('OpenID', result.WxOpenID)
      wx.setStorageSync('Login', false)
    } else if (result.AccessToken !== '') {
      wx.setStorageSync('Login', true)
      wx.setStorageSync('OpenID', result.WxOpenID)
      wx.setStorageSync('AccessToken', result.AccessToken)
      wx.setStorageSync('AccessTokenExpires', result.AccessTokenExpires)
      wx.setStorageSync('UserID', result.UserID)
      wx.setStorageSync('HasCellPhone', result.HasCellPhone)
    }
    return result
  },
  // 根据微信小程序用户加密数据登录用户
  async loginByWxEncryptedData ({commit}, params = {}) {
    const result = await Vue.iBox.http('loginApi.loginByWxEncryptedData', {...params})({method: 'post'}, {errorAction: true})
    // todo accesstoken ,过期时间， 用户ID，用户微信openId，是否绑定手机号
    if (!result.status) {
      wx.setStorageSync('OpenID', result.WxOpenID)
      wx.setStorageSync('AccessToken', result.AccessToken)
      wx.setStorageSync('AccessTokenExpires', result.AccessTokenExpires)
      wx.setStorageSync('UserID', result.UserID)
      wx.setStorageSync('HasCellPhone', result.HasCellPhone)
      commit('codeTokenLogin', result)
    }
    return result
  },
  // 重新绑定用户
  async rebindUserWxInfo ({commit}, params = {}) {
    const result = await Vue.iBox.http('loginApi.rebindUserWxInfo', {...params})({method: 'post'}, {errorAction: true})
    // todo accesstoken ,过期时间， 用户ID，用户微信openId，是否绑定手机号
    if (!result.status) {
      wx.setStorageSync('Login', true)
      wx.setStorageSync('AccessToken', result.AccessToken)
      wx.setStorageSync('AccessTokenExpires', result.AccessTokenExpires)
      wx.setStorageSync('UserID', result.UserID)
      wx.setStorageSync('HasCellPhone', result.HasCellPhone)
    }
    return result
  },
  // 检查用户信息完成性（目前仅检查是否绑定了手机号）
  async checkUserInfoIntegrity ({commit}, params = {}) {
    const result = await Vue.iBox.http('loginApi.checkUserInfoIntegrity', {...params})({method: 'get'}, {errorAction: true})
    // todo 用户ID，是否绑定手机号
    if (!result.status && result.UserID) {
      wx.setStorageSync('Login', true)
      wx.setStorageSync('UserID', result.UserID)
      wx.setStorageSync('HasCellPhone', result.HasCellPhone)
    } else {
      // token过期重新获取token(
      wx.setStorageSync('Login', false)
    }
    return result
  },
  // 获取短信验证码 不带图形验证码
  async sendSmsCodeNoType ({commit}, params = {}) {
    let result = await Vue.iBox.http('loginApi.sendSmsCode', {...params})({}, {errorAction: true})
    return result
  },
  // 图形验证码发送短信
  async sendSmsCodeByCaptcha ({commit}, params = {}) {
    const result = await Vue.iBox.http('loginApi.sendSmsCodeByCaptcha', {...params})({method: 'post'}, {errorAction: true})
    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
