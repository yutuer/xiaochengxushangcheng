// components/numOpera/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 文本宽度
    textWidth: {
      type: Number,
      width: 100
    },
    // 图片宽度
    imgWidth: {
      type: Number,
      value: 40,
    },
    //图片高度
    imgHeight: {
      type: Number,
      value: 40,
    },
    cargoId: {
      type: Number,
      value: 0
    },

    // 减号符是否显示
    subImgShow: {
      type: Boolean,
      value: false
    },
    // 数字符号是否显示
    numShow: {
      type: Boolean,
      value: false
    },
    // 显示数字
    showNum: {
      type: Number,
      value: 0
    }
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
    addClick: function (e) {
      console.log(e)

      this.triggerEvent("plusOnClickEvent", {
        cargoId: this.properties.cargoId
      }, {})
    },

    subClick: function (e) {
      console.log(e)

      this.triggerEvent("reduceOnClickEvent", {
        cargoId: this.properties.cargoId
      }, {})
    },

  }
})