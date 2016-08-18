import $ from 'jquery';

class WXConfig {

  constructor() {
    this.times = 0;
  }

  getConfigData(url, cb) {
    $.ajax({
      type: 'GET',
      url: '/weixin/corpid/productid/getSignature?url=' + encodeURIComponent(url),
      success: data => {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: '', // 必填，公众号的唯一标识 
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名，见附录1
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'chooseImage',
            'onMenuShareQZone',
            'onMenuShareWeibo',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'scanQRCode',
            'chooseWXPay',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'onVoicePlayEnd',
            'uploadVoice',
            'downloadVoice',
            'translateVoice',
            'openLocation',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'closeWindow',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      }
    });
  }
  setConfig() {
    // const commonUrl = 'http://local.mc.corploft.com/';

    const commonUrl = (location.href.split('#')[0]);
    this.getConfigData(commonUrl);
    wx.error(err => {
      let changedUrl = window.localStorage.myUrl;
      this.getConfigData(changedUrl);
    });
  }
}

export default WXConfig;





