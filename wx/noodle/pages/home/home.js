const app=getApp;
var data = require('../../common/data.js'), index;
Page({
  data: {
    text_1: '米粉种类',
    imgUrls: [
      'cloud://noodle-hw-8b234b.6e6f-noodle-hw-8b234b/images/scroll.jpg',
      'https://6e6f-noodle-hw-8b234b-1257177712.tcb.qcloud.la/images/scroll1.jpeg?sign=9e1f17226968291c306ec7ce6cce213f&t=1542410591 ',
      'cloud://noodle-hw-8b234b.6e6f-noodle-hw-8b234b/images/guilin.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  onLoad:function(){
    this.query()
  },
  //查询米粉
  query: function () {
    wx.cloud.callFunction({
      name: 'find2',
      success: res => {
        console.log(res)
        this.setData({
          mifen: res.result.data
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
      }
    })
  },
  mifenDetail: function (e) {
    console.log(e)
    index= e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/detail/detail/detail?id='+index,
    })
  }
})