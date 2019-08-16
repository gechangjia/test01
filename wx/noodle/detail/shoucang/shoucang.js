cloud://noodle-hw-8b234b.6e6f-noodle-hw-8b234b/images/guilin.jpgcloud://noodle-hw-8b234b.6e6f-noodle-hw-8b234b/images/guilin.jpgcloud://noodle-hw-8b234b.6e6f-noodle-hw-8b234b/images/guilin.jpgdsfdsf// detail/shoucang/shoucang.js
const app = getApp;
var data = require('data.js'),index;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden_1:false,
    openid1:'',
    collectionquery:''
  },
  //获取收藏数据
  query:function(){
    var openid = wx.getStorageSync("openid")
    console.log("sda"+openid)
    const db = wx.cloud.database();
    db.collection('Collection').where({
      _openid: openid,
    }).get().then(res => {
      // wx.setStorageSync('shoucang2', res);
      // var shoucangdata = wx.getStorageSync('shoucang2')
      if(res.data[0]){
      this.setData({
        Collection: res.data,
        hidden_1:true
      })
      }else{
        this.setData({
          hidden_1:false
        })
      }
      
    })
  },
  //返回详情页面
  soucang_detail:function(e){
    console.log(e)
    index = e.currentTarget.dataset.index;
    console.log('id:' +index );
    wx.navigateTo({
      url: '/detail/detail/detail?id=' + index,
    })
  },
  //删除收藏记录
  remove_sc:function(e){
    var mf_id = e.currentTarget.dataset.index
    console.log("删除_id:"+"   "+mf_id)
    const db = wx.cloud.database();
    db.collection('Collection').doc(mf_id).remove({
      success(res) {
        wx.showToast({
          title: '删除成功',
        })
        console.log(res.data)
        wx.navigateTo({
          url: '/detail/shoucang/shoucang?id=' + 1,
        })
      }
    })
    console.log("触发删除事件")
  },
  onLoad: function (e) {
    this.query();
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})