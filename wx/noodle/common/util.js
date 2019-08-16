function onAdd(e) {
  console.log('form发生了submit事件，携带数据为：', e.detail.value.comments_text)
  var user = wx.getStorageSync("user")
  var comments = e.detail.value.comments_text
  const db = wx.cloud.database()
  db.collection('comments').add({
    data: {
      comments_text: comments,
      username: user[0],
      userimage: user[1]
    },
    success: res => {
      // 在返回结果中会包含新创建的记录的 _id
      this.setData({
        comments_text: 1,
        username: 1,
        user_image: 1,
        counterId: res._id,
        count: 1
      })
      wx.showToast({
        title: '发表成功',
      })
      console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '发表失败'
      })
      console.error('[数据库] [新增记录] 失败：', err)
    }
  })
}
module.exports = {
  onAdd: onAdd
}