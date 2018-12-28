const API = {
  // 'loginApi.findUserAccesstoken': '/accounts/getWxInfo', // 用code换取服务器数据
  // 'loginApi.loginByWxUnionID': '/accounts/loginByWxUnionID', // 用户微信UnionID登录
  'loginApi.getUserInfo': '/users/getUserInfo', // 获取登陆用户信息。（验证token是否过期）
  // 'loginApi.decryptMinipUserInfo': '/accounts/decryptMinipUserInfo', // 未关联郭的账号换取UnionID
  'loginApi.sendValidateCode': '/messages/sendValidateCode', // 获取短信验证码接口
  'loginApi.captcha': '/captchas',
  'loginApi.endValidateCodeByCaptcha': '/messages/sendValidateCodeByCaptcha', // 通过图形验证码发送短信
  'loginApi.checkValidateCode': '/messages/checkValidateCode', // 注册验证验证码
  'loginApi.resetPassword': '/accounts/resetPassword', // 修改密码
  'loginApi.loginByValidateCode': '/users/switchAccountByMobile', // 用户手机号、验证码登录
  'loginApi.loginByAccount': '/users/switchAccount', // 用户账号密码登陆
  'loginApi.loginByCode': '/accounts/loginByCode', // 根据微信小程序code登录用户
  'loginApi.loginByEncryptedData': '/accounts/loginByEncryptedData', // 根据微信小程序用户加密数据登录用户

  'loginApi.bindCellWithEncryptedData': '/accounts/bindCellWithEncryptedData', // 根据微信小程序用户加密数据登录用户(包活是否需要图形验证码 )
  'loginApi.loginByWxCode': '/accounts/loginByWxCode', // 根据微信小程序code登录用户
  'loginApi.loginByWxEncryptedData': '/accounts/loginByWxEncryptedData', // 根据微信小程序用户加密数据登录用户
  'loginApi.rebindUserWxInfo': '/accounts/rebindUserWxInfo', // 重新绑定用户
  'loginApi.checkUserInfoIntegrity': '/accounts/checkUserInfoIntegrity', // 检查用户信息完成性（目前仅检查是否绑定了手机号）
  'loginApi.sendSmsCode': '/messages/sendSmsCode', // 获取短信验证码接口 (去掉type)
  'loginApi.sendSmsCodeByCaptcha': '/messages/sendSmsCodeByCaptcha' // 通过图形验证码发送短信 （去掉type）

}
export default API
