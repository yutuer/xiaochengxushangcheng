//使用前请在云函数index.js文件中填写appId、appSecret

function showToast(title) {
  wx.showToast({
    title: title,
    icon: 'none',
    duration: 2000
  })
}

// 发送短信
function send(phoneNum) {
  var templateParams = ['1111', '5分钟'];
  wx.cloud.callFunction({
    name: 'zhenzisms',
    data: {
      $url: 'send',
      apiUrl: 'https://sms_developer.zhenzikj.com',
      number: phoneNum,
      templateId: '998',
      templateParams: templateParams
    }
  }).then((res) => {
    console.log(res.result);
  }).catch((e) => {
    //console.log(e);
  });
}

// 发送短信验证码
function sendCode() {
  var that = this;
  var number = '18511111111';
  wx.cloud.callFunction({
    name: 'zhenzisms',
    data: {
      $url: 'createCode',
      number: number,
      seconds: 5 * 60,
      length: 4,
      intervalTime: 10 * 1000 //两条短信间隔时间(毫秒)，<=0 时无间隔
    }
  }).then((res) => {
    if (res.result.code != 'success') {
      that.showToast(res.result.data);
      return;
    }
    that.showToast('验证码:' + res.result.data);
    var captcha = res.result.data;
    var templateParams = [captcha, '5分钟'];
    wx.cloud.callFunction({
      name: 'zhenzisms',
      data: {
        $url: 'send',
        apiUrl: 'https://sms_developer.zhenzikj.com',
        number: number,
        templateId: '13',
        templateParams: templateParams
      }
    }).then((res) => {
      console.log(res.result);
      if (res.result.code == 0)
        that.showToast('发送成功');
    })
  }).catch((e) => {
    console.log(e);
  });
}

// 核对短信验证码
function validateCode() {
  var that = this;
  wx.cloud.callFunction({
    name: 'zhenzisms',
    data: {
      $url: 'validateCode',
      number: '18511111111',
      code: '6523'
    }
  }).then((res) => {
    that.showToast(res.result.code + ' ' + res.result.data);
    console.log(res.result.code + ' ' + res.result.data);
  }).catch((e) => {
    console.log(e);
  });
}

// 查询余额
function balance() {
  var that = this;
  wx.cloud.callFunction({
    name: 'zhenzisms',
    data: {
      $url: 'balance',
      apiUrl: 'https://sms_developer.zhenzikj.com'
    }
  }).then((res) => {
    that.showToast(res.result.data + '');
  }).catch((e) => {
    //console.log(e);
  });
}

// 查询单条信息
function findSmsByMessageId() {
  var that = this;
  wx.cloud.callFunction({
    name: 'zhenzisms',
    data: {
      $url: 'findSmsByMessageId',
      apiUrl: 'https://sms_developer.zhenzikj.com',
      messageId: 'adfdfdf'
    }
  }).then((res) => {
    console.log(res.result.data);
  }).catch((e) => {
    //console.log(e);
  });
}

module.exports = {
  showToast: showToast,
}