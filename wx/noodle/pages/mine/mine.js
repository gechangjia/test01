var app = getApp();
var  index;
Page({
  data: {
    hidden_1:false,
    mode: ['我的消息',"我的收藏","建议反馈",'关于我们']
  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.setStorageSync("openid", app.globalData.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  onLoad: function () {
    var user=new Array();
    user=wx.getStorageSync("user")
    console.log(user[0])
    if(user){
      this.setData({
        avatarUrl_1: user[0],
        nickName_1: user[1],
        hidden_1: true
      })
    }else{
      hidden_1: false
    }
  },
  onGotUserInfo: function (e) {
    
    this.onGetOpenid()
    var that = this;
    var user=new Array();
    var avatarUrl =e.detail.userInfo.avatarUrl, nickName =e.detail.userInfo.nickName;
    user[0]=avatarUrl;
    user[1]=nickName;
    wx.setStorageSync("user",user)
            that.setData({
              avatarUrl_1: avatarUrl,
              nickName_1:nickName,
              hidden_1:true
            })
  },
  buttun_id:function(e){
    index = e.currentTarget.dataset.index;
    console.log('index为：'+index);
    var id = Number(index);
    switch(id){
      case 0:
      wx.navigateTo({
        url: '../../detail/xiaoxi/xiaoxi',
      })
      break;
      case 1:
        wx.navigateTo({
          url: '../../detail/shoucang/shoucang',
        })
      break;
      case 2:
        wx.navigateTo({
          url: '../../detail/kefu/kefu',
        })
      break;
      default:
        wx.navigateTo({
          url: '../../detail/our/our',
        })
    }
  }
})