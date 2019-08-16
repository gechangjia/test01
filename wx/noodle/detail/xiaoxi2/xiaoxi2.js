// detail/xiaoxi2/xiaoxi2.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  del:function(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除该评论',
      success(res) {
        if (res.confirm) {
          db.collection('comments').doc(that.data.id).remove({
            success(res) {
              wx.navigateBack({
                delta: 2
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  query:function(e){
    console.log(e)
    var id=e.id
    this.setData({
      id:id
    })
    db.collection('comments').doc(id).get().then(res => {
      this.setData({
      text:res.data.comments_text,
      date:res.data.date2
      })
    })
  },

  onLoad: function (e) {
    this.query(e)
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