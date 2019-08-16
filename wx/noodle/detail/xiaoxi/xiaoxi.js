// detail/miaoxi/xiaoxi.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query2:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  query:function(){
    var openid = wx.getStorageSync("openid")
    db.collection('comments').where({ _openid: openid }).orderBy('date', 'desc').get().then(res => {
      if(res.data[0]){
      this.setData({
        query1:true,
        query2: res.data,
      })
      }else{
        this.setData({
          query1:false
        })
      }
    })
  },
  onLoad: function (options) {
    this.query()
  },
  xiaoxi_2:function(e){
    console.log(e)
    var id=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/detail/xiaoxi2/xiaoxi2?id='+id,
    })
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