const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sub_menu_cur:0,
    list: [],
    listFs:[],
    listPl:[],
    listBs:[],
    dataStep:20,
    isEnd:false,
    urlApi: app.globalData.zhuboApi.dianzanApi
  },

getUrlApi:function(id){
  var dataUrlList = [app.globalData.zhuboApi.dianzanApi,
                      app.globalData.zhuboApi.fensi, 
                      app.globalData.zhuboApi.pinglun, 
                      app.globalData.zhuboApi.biaosheng]
  return dataUrlList[id];
},

  menuFunc:function(e){
    console.log(e.target.dataset.id);
    let getUrl = this.getUrlApi(e.target.dataset.id);
    this.setData({
      sub_menu_cur:e.target.dataset.id,
      urlApi:getUrl,
      list:[],
      isEnd:false
    });
    let params = {
      from: 1,
      to: this.data.dataStep
    }
    util.doRequest(this.data.urlApi, params, this.zanList)
  },

  //点赞列表 
  zanList:function(res){
    console.log(this.data.list)
    this.setData({
      list: this.data.list.concat(res.data.data)
    });
    if(res.data.data.length == 0){
      this.setData({
        isEnd: true
      });
    }
  },
  
  gotoZozhuDetail:function (e){
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "bozhu/detail?id="+id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    let params = {
      from:1,
      to: this.data.dataStep
    }
    util.doRequest(this.data.urlApi, params, this.zanList)
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
    let params = {
      from: this.data.list.length + 1,
      to: this.data.list.length + this.data.dataStep
    }
    if (this.data.isEnd !== true){
      util.doRequest(this.data.urlApi, params, this.zanList)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})