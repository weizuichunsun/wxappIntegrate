
const util = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectActive: 1,
    clickdisabled: true,
    hiddenBody: false,
    select: [
      {
        value: 0,
        active: false,
        content: "粤"
      },
      {
        value: 1,
        active: false,
        content: ""
      },
      {
        value: 2,
        active: false,
        content: ""
      },
      {
        value: 3,
        active: false,
        content: ""
      },
      {
        value: 4,
        active: false,
        content: ""
      },
      {
        value: 5,
        active: false,
        content: ""
      },
      {
        value: 6,
        active: false,
        content: ""
      },
      {
        value: 7,
        active: false,
        content: ""
      }
    ],
    province: ['京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '桂', '琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁', '新', '台', '军'],

    city: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "", "Z", "X", "C", "V", "B", "N", "M"],
    numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "", "Z", "X", "C", "V", "B", "N", "M", '港', '澳', '学', '领', '警', '挂'],
    licenceHistory: [

    ],
    cssTextKeyB: "width:33.5px",
    access_token: "11_8NSCUHtMtiFc8BFlgpUF98arH43Od4U6qT_rq7d1wtBEaAY…eJgcAKQvvVM1J9NglggniI4qIaSqfbpxmQi5HdODXRcAAALFZ",
    compid: "",
    AuthorizationLink: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;

    console.log("输入车牌 options=>", options);


    let carNum = "粤" || "粤B12345";  //初始化车牌，不传为空


    self.initTemplate();
    self.setPlateNumber(carNum);
    self.getSelectValue();


    


  },
 
  officialLoad: function (e) {
    var self = this;

    console.log("officialLoad e=>", e);
  },
  officialError: function (e) {
    var self = this;

    console.log("officialError e=>", e);
  },

  setPlateNumber: function (str) {
    var self = this;

    str = str || '粤';
    let arr = str.split("");
    let select = self.data.select;
    var selectActive = self.data.selectActive;
    arr.forEach((it, index, array) => {
      for (var i = 0; i < select.length; i++) {
        if (index == i) {
          console.log("it=>", it);
          console.log("index=>", index)
          select[i].content = it;

          if (i == arr.length - 1) {

            if (select[i + 1]) {
              selectActive = i + 1;
              select[i + 1].active = true;
            }
            else {

              select[i].active = true;
              selectActive = i;
            }
          }
          else {
            select[i].active = false;
          }

          break;
        }
      }
    });

    self.setData({
      select: select,
      selectActive: selectActive
    });


  },
  initTemplate: function () {
    var self = this;

    var sysSize = wx.getSystemInfoSync();
    console.log("获取屏幕信息 车牌 sysSize.model", sysSize);



    var gNumber = 10;
    var gMagrin = 3;
    // if (sysSize.windowWidth < 330) {
    //   gNumber = 5;
    // }
    // if (sysSize.windowWidth > 400) {
    //   gNumber = 7;
    // }

    let width = (sysSize.screenWidth - gMagrin * gNumber) / gNumber;


    let cssTextKeyB = "width:" + width + "px";

    console.log("cssTextKeyB=>", cssTextKeyB)



    console.log("self.data.province.length%7=>", self.data.province.length % gNumber)
    console.log("self.data.city.length%7=>", self.data.city.length % gNumber)
    console.log("self.data.number.length%7=>", self.data.numbers.length % gNumber)

    var provinceT = gNumber - (self.data.province.length % gNumber + 1);
    for (var i = 0; i < provinceT; i++) {
      self.data.province.push("");
    }
    var cityT = gNumber - (self.data.city.length % gNumber + 1);
    for (var i = 0; i < cityT; i++) {
      self.data.city.push("");
    }

    var numberT = gNumber - (self.data.numbers.length % gNumber + 1);
    for (var i = 0; i < numberT; i++) {
      self.data.numbers.push("");
    }

    self.setData({
      cssTextKeyB: cssTextKeyB,
      province: self.data.province,
      city: self.data.city,
      numbers: self.data.numbers
    });


  },
  hiddenLicenceBody: function (e) {
    var self = this;
    console.log('hiddenLicenceBody e=>', e);

    self.setData({
      hiddenBody: true
    })

  },
  licenceTap: function (e) {
    var self = this;

    console.log('licenceTap e=>', e);
  },
  changeActive: function (e) {
    var self = this;
    console.log("changeActive e=>", e);
    let idx = e.currentTarget.dataset.idx;
    let selectActive = self.data.selectActive;
    let select = self.data.select;

    select[selectActive].active = false;
    select[idx].active = true;

    self.setData({
      select: self.data.select,
      selectActive: idx,
      hiddenBody: false
    })
  },
  changeValue: function (e) {
    // console.log("changevalue e=>",e);
    var self = this;

    let value = e.currentTarget.dataset.value;
    // console.log("value.length=>", value.length)
    if (value == "" || value.length == 0) {
      return false;
    }

    let selectActive = self.data.selectActive;
    // let selectChild=self.data.select[selectActive];
    let nextSelectActive = selectActive + 1;
    let selectLength = self.data.select.length;

    // console.log("nextSelectActive1=>", nextSelectActive)
    // console.log("selectLength=>", selectLength)

    self.data.select[selectActive].content = value;
    self.data.select[selectActive].active = false;

    if (nextSelectActive >= selectLength) {
      nextSelectActive = selectLength - 1;
    }
    // console.log("nextSelectActive2=>", nextSelectActive)
    // let nextSelectChild = self.data.select[nextSelectActive];
    self.data.select[nextSelectActive].active = true;

    // nextSelectChild.active=true;  

    self.setData({
      select: self.data.select,
      selectActive: nextSelectActive
    });

    self.getSelectValue();
  },
  getSelectValue: function () {
    var self = this;
    let newArr = [];
    let arr = self.data.select;

    arr.find((it, index, array) => {
      // console.log("getSelectValue it=>",it);
      let content = it.content;
      if (content != "") {
        newArr.push(content);
      }
    })
    // let str="";
    // str=newArr.join("");
    // console.log("str",str);
    // console.log("newArr.length=>",newArr.length)
    // console.log("arr[2]=>", arr[2])
    console.log("arr==>", arr);
    let isClick = (arr[0].content != "") && (arr[1].content != "") && (arr[2].content != "") && (arr[3].content != "") && (arr[4].content != "") && (arr[5].content != "") && (arr[6].content != "");
    // console.log("isClick====>", isClick);
    if (newArr.length >= 7 && isClick) {
      self.setData({
        clickdisabled: false
      });
    } else {
      self.setData({
        clickdisabled: true
      })
    }


    return newArr;

  },
  changeDel: function (e) {
    // console.log("changeDel e=>",e);
    var self = this;
    let selectActive = self.data.selectActive;
    let selectChild = self.data.select[selectActive];

    selectChild.content = "";
    if (selectActive != 0) {
      selectChild.active = false;
    }

    let prevSelectActive = selectActive - 1;
    if (prevSelectActive < 0) {
      prevSelectActive = 0;
    }
    // let prevSelectChild = self.data.select[prevSelectActive];

    // prevSelectChild.active=true;
    self.data.select[prevSelectActive].active = true;

    self.setData({
      select: self.data.select,
      selectActive: prevSelectActive
    });
    self.getSelectValue();
  },


  bindingLicenseplate: function (e) {
    // console.log("bindingLicenseplate e=>",e);
    var self = this;


    let formId = e.detail.formId;
    console.log("formSubmit formId=>", formId);

    let arr = self.getSelectValue();
    let plateNum = arr.join("");

    console.log("用户输入的车牌号 plateNum=>", plateNum);


    wx.showToast({
      title: plateNum,
      icon:"none",
    })
  


    self.setData({
      hiddenBody: true
    });


    // setTimeout(()=>{
    //   self.changeHistory(plateNum);
    // },2000)

    // wx.navigateTo({
    //   url: '../parkingPayment/parkingPayment?plateNum=' + plateNum,
    // }); 
  },
  changeHistory: function (plateNum) {
    var self = this;
    console.log("changeHistory plateNum=>", plateNum);

    // 粤BBBBBBB
    let licenceHistory = self.data.licenceHistory;
    var k = 1;
    licenceHistory.find((it, index, array) => {
      if (it == plateNum) {
        k = 0;
        return true;
      }
    });

    if (k) {
      licenceHistory.unshift(plateNum);
      licenceHistory = licenceHistory.slice(0, 3);
      self.setData({
        licenceHistory: licenceHistory
      });
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
    var self = this;





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