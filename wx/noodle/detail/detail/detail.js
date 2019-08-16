const app = getApp()
const db = wx.cloud.database();
var _id = null
var data = require('../../common/data.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dianZanGet:true,
    id:"",
    color1:" rgb(228, 224, 224)",
    openid:'',
    ellipsis: true,
    comments_number:'',
    username:'',
    user_image:'',
    comments_text:'',
    image:'',
    mf_title:'',
    text_detail:'',
  },
  
  /**
   * 收起/展开按钮点击事件
   */
  ellipsis:function() {
    var value = !this.data.ellipsis;
    this.setData({
      ellipsis: value
    })
  },

  dianzan:function(e){
    var that=this;
    console.log(e.currentTarget.dataset.dianzan)
    var id = e.currentTarget.dataset.dianzan
    db.collection('comments').doc(id).get().then(res => {
      if(res.data.pdian)
      {
      this.setData({
        number: res.data.number-1,
        pdian:!res.data.pdian
      })
      }else
      {
        this.setData({
          number: res.data.number + 1,
          pdian: !res.data.pdian
        })
      }
    })
    db.collection('comments').doc(id).update({
      data: {
        number: that.data.number,
        pdian:that.data.pdian,
      },
      success: res => {
        that.onQuery()
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },
  //最赞
  zuiZan:function(){
    db.collection('comments').where({ mifenname: this.data.mf_title }).orderBy('number', 'desc').get().then(res => {
      this.setData({
        comments_number: res.data.length,
        comments_query: res.data,
        color2: "rgb(228, 224, 224)",
        color1:"#ffffff"
      })

    })
  },
  //用户发表
  onAdd: function (e) {
    var paduan=new Object;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour=date.getHours();
    var fen=date.getMinutes();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var myDate = year + "-" + month + "-" + day+"  "+hour+":"+fen;
    var user = wx.getStorageSync("user")
    var comments = e.detail.value.comments_text
    var title1=wx.getStorageSync('title')
    db.collection('comments').add({
      data: {
        comments_text:comments,
        username: user[1],
        userimage: user[0],
        date:date,
        mifenname:this.data.mf_title,
        date2:myDate,
        number:0,
        pdian:false,
      },
     
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          comments_text:comments,
          username:user[1],
          user_image:user[0],
        })
        wx.showToast({
          title: '发表成功',
        })
        this.onQuery()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '发表失败'
        })
      }
    })
  },
  mifenQuery:function(option){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var myDate = year + "-" + month + "-" + day;
    var postId = option.id;
    var Collection = new Array();
    this.data.currentPostId = postId;
    const db = wx.cloud.database();
    db.collection('mifen').where({_id:postId}).get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      this.setData({
        image: res.data[0].image,
        image2: res.data[0].image2,
        image3: res.data[0].image3,
        image4: res.data[0].image4,
        mf_title:res.data[0].mf_title,
        text_detail:res.data[0].text
      })
      this.onQuery()
      Collection[0] = res.data[0].image,
      Collection[1] = res.data[0].mf_title,
      Collection[2] = myDate,
      Collection[3] = res.data[0]._id
      wx.setStorageSync("collection", Collection)
    })
  },
  //查询收藏
  collectionQuery:function(){
    var openid = wx.getStorageSync("openid")
    console.log("openid:" + openid)
    const db = wx.cloud.database();
    db.collection('Collection').where({ title: this.data.mf_title, _openid: openid}).get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      if(res){
        console.log("执行查询收藏" + res.data[0])
      var collection_id=res.data[0]
        wx.setStorageSync('collection_id', collection_id)
        this.onRemove()
      }else{
        _id=null
      }
    })
  },
  //查询评论
  onQuery: function () {
    var comments_query;
    // 查询当前用户所有的 counters
    db.collection('comments').where({ mifenname: this.data.mf_title}).orderBy('date', 'desc').get().then(res => {
      this.setData({
        comments_number:res.data.length,
        comments_query: res.data,
        color1:"rgb(228, 224, 224)",
        color2:"#ffffff"
      })
       
    })

  },
  onCounterInc: function () {
    const db = wx.cloud.database()
    const newCount = this.data.count + 1
    db.collection('counters').doc(this.data.counterId).update({
      data: {
        count: newCount
      },
      success: res => {
        this.setData({
          count: newCount
        })
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },

  onCounterDec: function () {
    const db = wx.cloud.database()
    const newCount = this.data.count - 1
    db.collection('counters').doc(this.data.counterId).update({
      data: {
        count: newCount
      },
      success: res => {
        this.setData({
          count: newCount
        })
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },

  onRemove: function () {
    var collection_id=wx.getStorageSync('collection_id')
    if (collection_id){
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('Collection').doc(collection_id._id).remove({
        success: res => {
          wx.showToast({
            title: '取消收藏',
          })
          
        },
    
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '取消失败',
          })
          console.error('[数据库] [删除记录] 失败：', err)
        }
      })
    }
    
    
  },

  nextStep: function () {
    // 在第一步，需检查是否有 openid，如无需获取
    if (this.data.step === 1 && !this.data.openid) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid
          this.setData({
            step: 2,
            openid: res.result.openid
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '获取 openid 失败，请检查是否有部署 login 云函数',
          })
          console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
        }
      })
    } else {
      const callback = this.data.step !== 6 ? function () { } : function () {
        console.group('数据库文档')
        console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html')
        console.groupEnd()
      }

      this.setData({
        step: this.data.step + 1
      }, callback)
    }
  },

  prevStep: function () {
    this.setData({
      step: this.data.step - 1
    })
  },

  goHome: function () {
    const pages = getCurrentPages()
    if (pages.length === 2) {
      wx.navigateBack()
    } else if (pages.length === 1) {
      wx.redirectTo({
        url: '../index/index',
      })
    } else {
      wx.reLaunch({
        url: '../index/index',
      })
    }
  },
  formSubmit:function(e){
    var openid=wx.getStorageSync("openid")
    if(openid){
      if (e.detail.value.comments_text==""){
        wx.showToast({
          title: '不能为空',
          image:"../../images/error.png",
          duration:1000
        })
      }else{
    this.onAdd(e)
      }
    }else{
      wx.showToast({
        title: '未授权',
        image:'../../images/error.png',
        duration:1000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var panduan
    var openid=wx.getStorageSync("openid")
    this.mifenQuery(option);
    var postId = option.id;
    console.log("接收到的参数是id=" + postId);
    this.setData({
      id:postId,
      openid:openid
    })
    const db = wx.cloud.database()
    db.collection('Collection').where({ _openid: openid,mf_id:postId}).get().then(res => {
      console.log(res.data)
      if (res.data[0]){
      this.setData({
        collected:res.data[0].panduan
      })
      }
    })
  },
  onCollectionTap:function(e){
    var openid=wx.getStorageSync("openid")
    if(openid){

   
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var myDate = year + "-" + month + "-" + day;
    console.log("this.data._openid:"+this.data.currentPostId)
    var collection1=wx.getStorageSync('collection')
    if (!this.data.collected){
    const db = wx.cloud.database()
    db.collection('Collection').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        image:collection1[0],
        title: collection1[1],
        date: collection1[2],
        mf_id:collection1[3],
        panduan:true
      }    
    })
      
      .then(res => {
        wx.showToast({
          title: "收藏成功",
          duration: 1000,
          icon: 'success',
        })
        this.setData({
          collected:true
        })
      })
    }else{
      this.collectionQuery()
      this.setData({
        collected: false
      })  
    }
    }else{
      wx.showToast({
        title: "未授权",
        duration: 1000,
        image: '../../images/error.png',
      })
    }    
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
    
  },
})