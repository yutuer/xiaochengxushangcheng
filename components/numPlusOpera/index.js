// components/numOpera/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgSrc: {
      type: String
    },
    isPlus: {
      type: Number,
      value: 1,
    },
    width: {
      type: Number,
      value: 40,
    },
    height: {
      type: Number,
      value: 40,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    operaClick: function (e) {
      console.log(e)
    }
  }
})